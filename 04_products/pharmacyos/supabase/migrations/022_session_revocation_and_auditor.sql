-- ── Migration 022: Session Revocation + AUDITOR Role ──────────────────────────
-- 1. get_my_role() now returns NULL for inactive staff, blocking all RLS access
--    without requiring a separate Supabase Auth session invalidation call.
-- 2. Adds AUDITOR to staff_role enum — read-only compliance observer role.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Update get_my_role() to enforce is_active ──────────────────────────────
-- SECURITY DEFINER: reads staff_profiles bypassing RLS.
-- Returns NULL if is_active = false — all downstream policies deny access.
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role::TEXT
  FROM   staff_profiles
  WHERE  email      = auth.email()
    AND  is_active  = true
  LIMIT  1;
$$;

-- ── 2. Add AUDITOR to staff_role enum ────────────────────────────────────────
-- Idempotent: check before adding to avoid duplicate enum value error.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE  enumlabel = 'AUDITOR'
    AND    enumtypid = (
      SELECT oid FROM pg_type WHERE typname = 'staff_role'
    )
  ) THEN
    ALTER TYPE staff_role ADD VALUE 'AUDITOR';
  END IF;
END
$$;

-- ── 3. RLS additions for AUDITOR role ────────────────────────────────────────

-- audit_log: AUDITOR can SELECT (read-only compliance view)
DROP POLICY IF EXISTS "auditor_select_audit_log" ON audit_log;
CREATE POLICY "auditor_select_audit_log"
  ON audit_log FOR SELECT
  USING (get_my_role() = 'AUDITOR');

-- retail_transactions: AUDITOR can SELECT (revenue audit)
DROP POLICY IF EXISTS "auditor_select_retail_transactions" ON retail_transactions;
CREATE POLICY "auditor_select_retail_transactions"
  ON retail_transactions FOR SELECT
  USING (get_my_role() = 'AUDITOR');

-- rx_transactions: AUDITOR can SELECT (dispensing audit)
DROP POLICY IF EXISTS "auditor_select_rx_transactions" ON rx_transactions;
CREATE POLICY "auditor_select_rx_transactions"
  ON rx_transactions FOR SELECT
  USING (get_my_role() = 'AUDITOR');

-- eod_closeouts: AUDITOR can SELECT (financial period review)
DROP POLICY IF EXISTS "auditor_select_eod_closeouts" ON eod_closeouts;
CREATE POLICY "auditor_select_eod_closeouts"
  ON eod_closeouts FOR SELECT
  USING (get_my_role() = 'AUDITOR');

-- schedule_drug_log: AUDITOR can SELECT (controlled substance register)
DROP POLICY IF EXISTS "auditor_select_schedule_drug_log" ON schedule_drug_log;
CREATE POLICY "auditor_select_schedule_drug_log"
  ON schedule_drug_log FOR SELECT
  USING (get_my_role() = 'AUDITOR');

-- pharmacy_settings: AUDITOR can SELECT (configuration review)
DROP POLICY IF EXISTS "auditor_select_pharmacy_settings" ON pharmacy_settings;
CREATE POLICY "auditor_select_pharmacy_settings"
  ON pharmacy_settings FOR SELECT
  USING (get_my_role() = 'AUDITOR');

-- staff_profiles: AUDITOR can SELECT own row only (same as non-admin staff)
-- Already covered by existing "staff_own_row" policy — no additional policy needed.

-- NOTE: AUDITOR has no INSERT, UPDATE, or DELETE permissions on any table.
-- NOTE: AUDITOR cannot view patients table (patient PII is restricted).
