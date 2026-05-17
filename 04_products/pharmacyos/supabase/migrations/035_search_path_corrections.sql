-- Migration 035 — Search Path Corrections
-- Fixes two incorrect function signatures in migration 033 that caused
-- those ALTER FUNCTION statements to silently fail.
--
-- Root cause: migration 033 used wrong parameter type signatures for:
--   1. generate_ref_number() — actual signature takes (text), 033 used ()
--   2. adjust_product_stock(...) — 033 used public.stock_movement_type for arg 3,
--      but migration 030 defines the arg as plain text
--
-- After this migration, all public schema functions we control will have
-- SET search_path = public. The Supabase Security Advisor may still show
-- warnings for Supabase-internal functions in extensions/auth/storage schemas —
-- those are not in the public schema and cannot be altered by tenant migrations.

-- ── 1. generate_ref_number(text) ─────────────────────────────────────────────
-- Defined in migration 001 with signature generate_ref_number(prefix TEXT).
-- Migration 033 incorrectly used generate_ref_number() with no args — ALTER failed.

ALTER FUNCTION public.generate_ref_number(text) SET search_path = public;

-- ── 2. adjust_product_stock(uuid, integer, text, uuid, text, text) ────────────
-- Defined in migration 030 with the 3rd parameter as plain TEXT (not the enum).
-- Migration 033 incorrectly used public.stock_movement_type for arg 3 — ALTER failed.

ALTER FUNCTION public.adjust_product_stock(uuid, integer, text, uuid, text, text) SET search_path = public;

-- ── Verification ──────────────────────────────────────────────────────────────
-- After running, confirm both functions now have a fixed search_path:
--
--   SELECT proname, proargtypes::text, proconfig
--   FROM pg_proc
--   WHERE pronamespace = 'public'::regnamespace
--     AND proname IN ('generate_ref_number', 'adjust_product_stock')
--     AND proconfig IS NOT NULL
--   ORDER BY proname;
--
-- Expected: both rows show proconfig containing 'search_path=public'
