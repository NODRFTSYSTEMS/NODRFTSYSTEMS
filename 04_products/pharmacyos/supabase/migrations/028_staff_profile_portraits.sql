-- ============================================================
-- Migration 028 - Staff profile portrait fields
-- Demo-only staff portraits for seeded PharmacyOS users.
-- Launch replacements must use client-approved or verified staff images.
-- ============================================================

ALTER TABLE public.staff_profiles
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS avatar_alt text,
  ADD COLUMN IF NOT EXISTS avatar_source_status text NOT NULL DEFAULT 'NEEDS_REPLACEMENT';

ALTER TABLE public.staff_profiles
  DROP CONSTRAINT IF EXISTS staff_profiles_avatar_source_status_check;

ALTER TABLE public.staff_profiles
  ADD CONSTRAINT staff_profiles_avatar_source_status_check
  CHECK (avatar_source_status IN ('DEMO_ONLY', 'VERIFIED', 'NEEDS_REPLACEMENT'));

COMMENT ON COLUMN public.staff_profiles.avatar_url IS
  'Profile image URL for staff identity UI. Demo seed values are fictional generated portraits and must be replaced before launch.';

COMMENT ON COLUMN public.staff_profiles.avatar_alt IS
  'Accessible alt text for the staff profile image.';

COMMENT ON COLUMN public.staff_profiles.avatar_source_status IS
  'Image source status: DEMO_ONLY, VERIFIED, or NEEDS_REPLACEMENT.';

UPDATE public.staff_profiles
SET
  avatar_url = '/demo/staff/grace-bennett.jpg',
  avatar_alt = 'Demo portrait for Grace Bennett',
  avatar_source_status = 'DEMO_ONLY',
  updated_at = now()
WHERE email = 'grace.bennett@winchesterglobal.com';

UPDATE public.staff_profiles
SET
  avatar_url = '/demo/staff/marcus-thompson.jpg',
  avatar_alt = 'Demo portrait for Marcus Thompson',
  avatar_source_status = 'DEMO_ONLY',
  updated_at = now()
WHERE email = 'marcus.thompson@winchesterglobal.com';

UPDATE public.staff_profiles
SET
  avatar_url = '/demo/staff/jasmine-clarke.jpg',
  avatar_alt = 'Demo portrait for Jasmine Clarke',
  avatar_source_status = 'DEMO_ONLY',
  updated_at = now()
WHERE email = 'jasmine.clarke@winchesterglobal.com';

UPDATE public.staff_profiles
SET
  avatar_url = '/demo/staff/devon-reid.jpg',
  avatar_alt = 'Demo portrait for Devon Reid',
  avatar_source_status = 'DEMO_ONLY',
  updated_at = now()
WHERE email = 'devon.reid@winchesterglobal.com';

UPDATE public.staff_profiles
SET
  avatar_url = '/demo/staff/simone-henry.jpg',
  avatar_alt = 'Demo portrait for Simone Henry',
  avatar_source_status = 'DEMO_ONLY',
  updated_at = now()
WHERE email = 'simone.henry@winchesterglobal.com';
