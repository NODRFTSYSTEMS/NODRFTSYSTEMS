-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 015 — Auto staff_profiles on auth signup + bootstrap admin
-- ─────────────────────────────────────────────────────────────────────────────
-- Problem: staff_profiles used hardcoded UUIDs that never match auth.uid().
-- This caused two failures:
--   1. get_my_role() (id-based lookup) always returned NULL → RLS denied everything
--   2. Any auth user whose email wasn't in seed data fell back to CASHIER role
--
-- Fix:
--   A. Trigger: when a new auth user is created, either claim an existing
--      staff_profiles row (by email match, updating its id to auth.uid())
--      or insert a new CASHIER profile. Profile id always equals auth.uid().
--   B. Backfill: repair any existing auth users who signed up before this
--      migration — give them a profile or fix their profile id.
--   C. bootstrap_admin(email): convenience function to promote any user to
--      ADMIN by email. Run once from SQL editor to set the first operator.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── A. Trigger function ───────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If a seeded profile with this email already exists, claim it by
  -- setting its id to the new auth user's id (so get_my_role() works).
  UPDATE public.staff_profiles
  SET id = NEW.id
  WHERE email = NEW.email
    AND id <> NEW.id;

  -- Insert a default profile only if one does not exist yet for this id.
  INSERT INTO public.staff_profiles (id, email, full_name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      split_part(NEW.raw_user_meta_data->>'full_name', ' ', 1),
      split_part(NEW.email, '@', 1)
    ),
    'CASHIER',
    true
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop the trigger if it already exists so this migration is re-runnable.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- ── B. Backfill existing auth users ──────────────────────────────────────────

-- Step 1: for auth users whose email matches a seeded profile, update the
-- profile id to match auth.uid() so get_my_role() resolves correctly.
UPDATE public.staff_profiles sp
SET id = u.id
FROM auth.users u
WHERE sp.email = u.email
  AND sp.id <> u.id;

-- Step 2: for any auth user who has no profile at all, insert a CASHIER profile.
INSERT INTO public.staff_profiles (id, email, full_name, role, is_active)
SELECT
  u.id,
  u.email,
  COALESCE(split_part(u.email, '@', 1), 'Staff'),
  'CASHIER',
  true
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.staff_profiles sp WHERE sp.id = u.id
)
ON CONFLICT (id) DO NOTHING;

-- ── C. Bootstrap admin helper ─────────────────────────────────────────────────
-- Usage (run from SQL editor):
--   SELECT bootstrap_admin('your-email@domain.com');

CREATE OR REPLACE FUNCTION public.bootstrap_admin(target_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rows_updated int;
BEGIN
  UPDATE public.staff_profiles
  SET role = 'ADMIN', is_active = true
  WHERE email = target_email;

  GET DIAGNOSTICS rows_updated = ROW_COUNT;

  IF rows_updated = 0 THEN
    RETURN 'No profile found for ' || target_email || '. Ensure the user has signed in at least once.';
  END IF;

  RETURN 'OK — ' || target_email || ' is now ADMIN.';
END;
$$;

-- Grant execute to authenticated users is intentionally NOT given.
-- bootstrap_admin() must only be called from the SQL editor (postgres role).
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin(text) FROM authenticated;
