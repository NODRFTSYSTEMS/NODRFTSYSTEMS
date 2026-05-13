-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 014 — Storage Bucket: documents
-- ─────────────────────────────────────────────────────────────────────────────
-- Creates the private 'documents' bucket used by the AI Queue upload flow
-- (Edge Function: extract-document) and sets RLS policies for authenticated access.
--
-- Bucket policy:
--   INSERT: any authenticated user (pharmacists, technicians upload Rx / invoices)
--   SELECT: any authenticated user (pharmacist review drawer loads signed URL)
--   UPDATE: not permitted (objects are immutable once uploaded)
--   DELETE: ADMIN role only (audit evidence preservation)
--
-- File constraints (enforced at bucket level + application level):
--   Max size:  10 MB
--   MIME types: image/jpeg, image/jpg, image/png, image/gif, image/webp, application/pdf
-- ─────────────────────────────────────────────────────────────────────────────


-- ═════════════════════════════════════════════════════════════════════════════
-- 1 — Create the documents bucket (idempotent via ON CONFLICT DO NOTHING)
-- ═════════════════════════════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false,          -- private: no public URL; access via signed URLs only
  10485760,       -- 10 MB limit per file
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO NOTHING;


-- ═════════════════════════════════════════════════════════════════════════════
-- 2 — RLS policies on storage.objects for the documents bucket
-- ═════════════════════════════════════════════════════════════════════════════
-- Note: Supabase hosted projects have RLS enabled on storage.objects by default.
-- These policies apply only to objects in the 'documents' bucket.

-- 2a — INSERT: any authenticated user may upload
DROP POLICY IF EXISTS "documents_insert" ON storage.objects;

CREATE POLICY "documents_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents');


-- 2b — SELECT: any authenticated user may read (review drawer + signed URL generation)
DROP POLICY IF EXISTS "documents_select" ON storage.objects;

CREATE POLICY "documents_select" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'documents');


-- 2c — DELETE: ADMIN role only
--   Objects represent uploaded clinical/financial documents.
--   Only ADMIN may remove — preserves audit evidence for pharmacist-reviewed records.
DROP POLICY IF EXISTS "documents_delete" ON storage.objects;

CREATE POLICY "documents_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'documents'
    AND EXISTS (
      SELECT 1 FROM public.staff_profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );


-- ═════════════════════════════════════════════════════════════════════════════
-- DEPLOYMENT NOTES
-- ─────────────────────────────────────────────────────────────────────────────
-- After running this migration:
--
-- 1. Deploy the Edge Function:
--      supabase functions deploy extract-document --project-ref <YOUR_PROJECT_REF>
--
-- 2. Set the Anthropic API key secret (dashboard or CLI):
--      supabase secrets set ANTHROPIC_API_KEY=<key> --project-ref <YOUR_PROJECT_REF>
--    The Edge Function reads:  Deno.env.get('ANTHROPIC_API_KEY')
--    Supabase injects:         SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY automatically.
--
-- 3. Enable MFA (TOTP) in Supabase Dashboard:
--      Authentication → Sign In / Up → Multi-Factor Authentication → Enable TOTP
--    Without this toggle, the VerifyMFA and SetupMFA pages have no effect.
--
-- 4. Verify PostgreSQL version ≥ 15 before running migration 013.
--    Dashboard → Project Settings → Infrastructure → PostgreSQL version.
--    (Migration 013's constraint fix uses a DO block — safe on PG 14 + 15.)
-- ═════════════════════════════════════════════════════════════════════════════
