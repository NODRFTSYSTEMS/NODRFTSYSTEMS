-- ============================================================
-- Migration 025 - Medication Visual References
-- Purpose: demo and verified visual reference metadata for pharmacist checks.
-- Safety rule: demo placeholders must be replaced before launch.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.medication_visual_references (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_key             text        NOT NULL UNIQUE,
  display_name         text        NOT NULL,
  generic_name         text,
  strength             text,
  dosage_form          text,
  manufacturer         text,
  image_url            text,
  image_alt            text,
  source_name          text,
  source_url           text,
  imprint              text,
  color                text,
  shape                text,
  verification_status  text        NOT NULL DEFAULT 'DEMO_ONLY'
    CHECK (verification_status IN ('VERIFIED', 'DEMO_ONLY', 'NEEDS_VERIFICATION', 'RETIRED')),
  verification_notes   text,
  verified_by          uuid,
  verified_by_name     text,
  verified_at          timestamptz,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT medication_visual_references_verified_requires_source
    CHECK (
      verification_status <> 'VERIFIED'
      OR (
        image_url IS NOT NULL
        AND source_name IS NOT NULL
        AND source_url IS NOT NULL
        AND verified_at IS NOT NULL
      )
    )
);

COMMENT ON TABLE public.medication_visual_references IS
  'Demo and verified medication visual references for pharmacist support. Demo placeholders are for workflow layout only. Launch images must come from a named source and are not a substitute for imprint, strength, barcode, or stock verification.';

COMMENT ON COLUMN public.medication_visual_references.drug_key IS
  'Normalized lookup key generated from the drug display name used by prescriptions or products.';

CREATE INDEX IF NOT EXISTS idx_mvr_status
  ON public.medication_visual_references (verification_status);

CREATE TRIGGER medication_visual_references_updated_at
  BEFORE UPDATE ON public.medication_visual_references
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

ALTER TABLE public.medication_visual_references ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "rls_mvr_select" ON public.medication_visual_references;
CREATE POLICY "rls_mvr_select" ON public.medication_visual_references
  FOR SELECT TO authenticated
  USING (
    get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN')
  );

DROP POLICY IF EXISTS "rls_mvr_insert" ON public.medication_visual_references;
CREATE POLICY "rls_mvr_insert" ON public.medication_visual_references
  FOR INSERT TO authenticated
  WITH CHECK (
    get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST')
  );

DROP POLICY IF EXISTS "rls_mvr_update" ON public.medication_visual_references;
CREATE POLICY "rls_mvr_update" ON public.medication_visual_references
  FOR UPDATE TO authenticated
  USING (
    get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST')
  )
  WITH CHECK (
    get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST')
  );

DROP POLICY IF EXISTS "rls_mvr_delete" ON public.medication_visual_references;
CREATE POLICY "rls_mvr_delete" ON public.medication_visual_references
  FOR DELETE TO authenticated
  USING (
    get_my_role() = 'ADMIN'
  );

INSERT INTO public.medication_visual_references (
  drug_key,
  display_name,
  generic_name,
  strength,
  dosage_form,
  color,
  shape,
  verification_status,
  verification_notes
) VALUES
  ('amlodipine-5mg', 'Amlodipine 5mg', 'Amlodipine', '5mg', 'Tablet', 'white', 'round', 'DEMO_ONLY', 'Demo placeholder for workflow layout. Replace with verified stocked-product image before launch.'),
  ('metformin-500mg', 'Metformin 500mg', 'Metformin', '500mg', 'Tablet', 'white', 'oval', 'DEMO_ONLY', 'Demo placeholder for workflow layout. Replace with verified stocked-product image before launch.'),
  ('atorvastatin-20mg', 'Atorvastatin 20mg', 'Atorvastatin', '20mg', 'Tablet', 'white', 'oval', 'DEMO_ONLY', 'Demo placeholder for workflow layout. Replace with verified stocked-product image before launch.'),
  ('amoxicillin-500mg', 'Amoxicillin 500mg', 'Amoxicillin', '500mg', 'Capsule', 'orange', 'capsule', 'DEMO_ONLY', 'Demo placeholder for workflow layout. Replace with verified stocked-product image before launch.'),
  ('lisinopril-10mg', 'Lisinopril 10mg', 'Lisinopril', '10mg', 'Tablet', 'pink', 'round', 'DEMO_ONLY', 'Demo placeholder for workflow layout. Replace with verified stocked-product image before launch.'),
  ('salbutamol-inhaler', 'Salbutamol Inhaler', 'Salbutamol', NULL, 'Inhaler', 'blue', 'inhaler', 'DEMO_ONLY', 'Demo placeholder for workflow layout. Replace with verified stocked-product image before launch.'),
  ('paracetamol-500mg-tabs-24', 'Paracetamol 500mg Tabs x24', 'Paracetamol', '500mg', 'Tablet', 'white', 'round', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('ibuprofen-400mg-tabs-24', 'Ibuprofen 400mg Tabs x24', 'Ibuprofen', '400mg', 'Tablet', 'brown', 'round', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('cetirizine-10mg-tabs-10', 'Cetirizine 10mg Tabs x10', 'Cetirizine', '10mg', 'Tablet', 'white', 'oval', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('loratadine-10mg-tabs-10', 'Loratadine 10mg Tabs x10', 'Loratadine', '10mg', 'Tablet', 'white', 'round', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('omeprazole-20mg-caps-14', 'Omeprazole 20mg Caps x14', 'Omeprazole', '20mg', 'Capsule', 'purple', 'capsule', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('antacid-chewable-tabs-30', 'Antacid Chewable Tabs x30', NULL, NULL, 'Chewable tablet', 'pink', 'round', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('cough-syrup-dm-100ml', 'Cough Syrup DM 100ml', NULL, NULL, 'Syrup', 'red', 'bottle', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('nasal-decongestant-spray-15ml', 'Nasal Decongestant Spray 15ml', NULL, NULL, 'Spray', 'blue', 'bottle', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('antifungal-cream-30g', 'Antifungal Cream 30g', NULL, NULL, 'Cream', 'green', 'tube', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('calamine-lotion-100ml', 'Calamine Lotion 100ml', 'Calamine', NULL, 'Lotion', 'pink', 'bottle', 'DEMO_ONLY', 'Retail demo placeholder. Replace with source image from stocked product or supplier catalog.'),
  ('vitamin-c-1000mg-30', 'Vitamin C 1000mg x30', 'Ascorbic acid', '1000mg', 'Tablet', 'orange', 'round', 'DEMO_ONLY', 'Supplement demo placeholder. Replace with stocked-item image before launch.'),
  ('multivitamin-adults-30', 'Multivitamin Adults x30', NULL, NULL, 'Tablet', 'yellow', 'oval', 'DEMO_ONLY', 'Supplement demo placeholder. Replace with stocked-item image before launch.'),
  ('vitamin-d3-1000iu-60', 'Vitamin D3 1000IU x60', 'Cholecalciferol', '1000IU', 'Tablet', 'yellow', 'round', 'DEMO_ONLY', 'Supplement demo placeholder. Replace with stocked-item image before launch.'),
  ('calcium-d3-tabs-60', 'Calcium + D3 Tabs x60', 'Calcium + cholecalciferol', NULL, 'Tablet', 'white', 'oval', 'DEMO_ONLY', 'Supplement demo placeholder. Replace with stocked-item image before launch.'),
  ('iron-65mg-tabs-30', 'Iron 65mg Tabs x30', 'Iron', '65mg', 'Tablet', 'red', 'round', 'DEMO_ONLY', 'Supplement demo placeholder. Replace with stocked-item image before launch.'),
  ('zinc-50mg-tabs-30', 'Zinc 50mg Tabs x30', 'Zinc', '50mg', 'Tablet', 'white', 'round', 'DEMO_ONLY', 'Supplement demo placeholder. Replace with stocked-item image before launch.'),
  ('fish-oil-1000mg-30', 'Fish Oil 1000mg x30', 'Fish oil', '1000mg', 'Softgel', 'yellow', 'oval', 'DEMO_ONLY', 'Supplement demo placeholder. Replace with stocked-item image before launch.'),
  ('infant-paracetamol-syrup-60ml', 'Infant Paracetamol Syrup 60ml', 'Paracetamol', NULL, 'Syrup', 'pink', 'bottle', 'DEMO_ONLY', 'Baby care demo placeholder. Replace with stocked-item image before launch.'),
  ('gripe-water-150ml', 'Gripe Water 150ml', NULL, NULL, 'Liquid', 'blue', 'bottle', 'DEMO_ONLY', 'Baby care demo placeholder. Replace with stocked-item image before launch.')
ON CONFLICT (drug_key) DO NOTHING;
