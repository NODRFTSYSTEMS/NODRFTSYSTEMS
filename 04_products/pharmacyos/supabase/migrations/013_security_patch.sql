-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 013 — Security Patch (SCA Review Findings)
-- ─────────────────────────────────────────────────────────────────────────────
-- Resolves all CRITICAL and HIGH findings from SCA (Omari) review 2026-05-13.
-- Must run AFTER 001–012. Safe to re-run (idempotent where possible).
--
-- Findings addressed:
--   CRITICAL-00  Dev policy name mismatch — all 14 dev-permissive policies survive 010
--   010-01 (CRITICAL) Role self-escalation via staff_profiles UPDATE
--   010-02 (HIGH)     audit_log INSERT allows fabricated actor_id
--   010-03 (HIGH)     staff_profiles SELECT exposes all PII to every role
--   011-01 (HIGH)     notifications INSERT open to any authenticated user
--   011-02 (HIGH)     notifications UPDATE WITH CHECK (true) allows row hijacking
--   012-01 (MEDIUM)   JDPA consent column has no audit trail
--   011-03 (MEDIUM)   No notification DELETE; no role_target validation
-- ─────────────────────────────────────────────────────────────────────────────


-- ═════════════════════════════════════════════════════════════════════════════
-- CRITICAL-00 — Drop all dev-permissive policies by their CORRECT names
-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 010 used wrong policy names in its DROP POLICY statements.
-- All dev policies created in migrations 001–008 survived, leaving every table
-- open to any authenticated user despite the production policies in 010.
-- ═════════════════════════════════════════════════════════════════════════════

-- From migration 001
DROP POLICY IF EXISTS "dev_allow_authenticated_retail_txn"   ON public.retail_transactions;
DROP POLICY IF EXISTS "dev_allow_authenticated_retail_items" ON public.retail_transaction_items;
DROP POLICY IF EXISTS "dev_allow_authenticated_rx_txn"       ON public.rx_transactions;
DROP POLICY IF EXISTS "dev_allow_authenticated_eod"          ON public.eod_closeouts;
DROP POLICY IF EXISTS "dev_allow_authenticated_extraction"   ON public.extraction_queue;

-- From migration 002
DROP POLICY IF EXISTS "dev_suppliers_all" ON public.retail_suppliers;

-- From migration 003
DROP POLICY IF EXISTS "dev_products_all"      ON public.products;
DROP POLICY IF EXISTS "dev_patients_all"      ON public.patients;
DROP POLICY IF EXISTS "dev_prescriptions_all" ON public.prescriptions;
DROP POLICY IF EXISTS "dev_staff_all"         ON public.staff_profiles;
DROP POLICY IF EXISTS "dev_settings_all"      ON public.pharmacy_settings;
DROP POLICY IF EXISTS "dev_loyalty_all"       ON public.loyalty_customers;
DROP POLICY IF EXISTS "dev_audit_all"         ON public.audit_log;

-- From migration 008
DROP POLICY IF EXISTS "dev_sdl_all" ON public.schedule_drug_log;


-- ═════════════════════════════════════════════════════════════════════════════
-- 010-01 (CRITICAL) — Prevent role self-escalation via staff_profiles UPDATE
-- ─────────────────────────────────────────────────────────────────────────────
-- The existing rls_staff_update policy allows any user to update their own row
-- including the `role` column. A CASHIER can issue:
--   UPDATE staff_profiles SET role = 'ADMIN' WHERE id = auth.uid()
-- and the original policy passes. This migration replaces that policy with one
-- that locks `role` for self-updates to its current value.
-- ═════════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "rls_staff_update" ON public.staff_profiles;

CREATE POLICY "rls_staff_update" ON public.staff_profiles
  FOR UPDATE TO authenticated
  USING (
    get_my_role() = 'ADMIN'
    OR id = auth.uid()
  )
  WITH CHECK (
    -- ADMIN may change any column including role
    get_my_role() = 'ADMIN'
    -- Non-admin may update their own profile but MUST NOT change their role
    OR (
      id = auth.uid()
      AND role = (SELECT s.role FROM public.staff_profiles s WHERE s.id = auth.uid())
    )
  );


-- ═════════════════════════════════════════════════════════════════════════════
-- 010-02 (HIGH) — Restrict audit_log INSERT to own actor_id
-- ─────────────────────────────────────────────────────────────────────────────
-- The existing WITH CHECK (true) allows any user to insert audit records
-- attributed to any actor_id. An attacker can fabricate compliance records
-- attributing actions to other users. Replace with actor_id scoping.
-- ═════════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "rls_audit_insert" ON public.audit_log;

CREATE POLICY "rls_audit_insert" ON public.audit_log
  FOR INSERT TO authenticated
  WITH CHECK (
    actor_id = auth.uid()::text   -- can only write records attributed to yourself
    OR actor_id IS NULL           -- system/trigger writes with no explicit actor
  );

-- Note: trigger-based inserts (migration 009) use SECURITY DEFINER and bypass
-- RLS entirely, so they are not affected by this policy change.


-- ═════════════════════════════════════════════════════════════════════════════
-- 010-03 (HIGH) — Restrict staff_profiles SELECT to own row or admin/manager
-- ─────────────────────────────────────────────────────────────────────────────
-- The existing USING (true) allows any authenticated user to read all staff
-- profiles including roles, names, and contact info. Replace with scoped access.
-- ═════════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "rls_staff_select" ON public.staff_profiles;

CREATE POLICY "rls_staff_select" ON public.staff_profiles
  FOR SELECT TO authenticated
  USING (
    id = auth.uid()                              -- any user reads their own profile
    OR get_my_role() IN ('ADMIN', 'MANAGER')     -- admins and managers read all
  );

-- Note: get_my_role() is SECURITY DEFINER — it reads staff_profiles via the
-- function owner's privileges, bypassing this RLS policy. The initial lookup
-- for a newly authenticated user still works.


-- ═════════════════════════════════════════════════════════════════════════════
-- 011-01 (HIGH) — Restrict notifications INSERT (user_id and role_target scoping)
-- ═════════════════════════════════════════════════════════════════════════════

-- Add role_target validation constraint
-- PG14-safe: IF NOT EXISTS is not valid for ADD CONSTRAINT in PG14; use DO block instead.
-- PG15+ also supports the DO-block path, so this is safe on both versions.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname    = 'notifications_role_target_valid'
      AND conrelid   = 'public.notifications'::regclass
  ) THEN
    ALTER TABLE public.notifications
      ADD CONSTRAINT notifications_role_target_valid
      CHECK (
        role_target IS NULL
        OR role_target IN ('ADMIN','MANAGER','PHARMACIST','CASHIER','TECHNICIAN')
      );
  END IF;
END$$;

DROP POLICY IF EXISTS "notifications_insert"            ON public.notifications;
DROP POLICY IF EXISTS "notifications_insert_own"        ON public.notifications;
DROP POLICY IF EXISTS "notifications_insert_broadcast"  ON public.notifications;

-- Personal notifications: any authenticated user, own user_id only
CREATE POLICY "notifications_insert_own" ON public.notifications
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND role_target IS NULL
  );

-- Role-broadcast notifications: clinical and supervisory roles only
-- (CASHIER cannot broadcast to roles — would allow a cashier to spam ADMINs)
CREATE POLICY "notifications_insert_broadcast" ON public.notifications
  FOR INSERT TO authenticated
  WITH CHECK (
    role_target IS NOT NULL
    AND user_id IS NULL
    AND get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','TECHNICIAN')
  );


-- ═════════════════════════════════════════════════════════════════════════════
-- 011-02 (HIGH) — Restrict notifications UPDATE to is_read toggle only
-- ─────────────────────────────────────────────────────────────────────────────
-- The existing WITH CHECK (true) allows recipients to modify any column
-- on notifications addressed to them — including user_id, href, role_target.
-- An attacker with a role-broadcast notification visible to them could change
-- the href to a phishing URL affecting all ADMIN-role recipients.
-- Replace the policy with a trigger that enforces column immutability.
-- ═════════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "notifications_update_own"  ON public.notifications;
DROP POLICY IF EXISTS "notifications_update_read" ON public.notifications;

CREATE POLICY "notifications_update_read" ON public.notifications
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid()
    OR role_target = get_my_role()
  )
  WITH CHECK (is_read = true);

-- Trigger enforces that only is_read may change — all other columns are frozen
CREATE OR REPLACE FUNCTION public.enforce_notification_readonly_cols()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.user_id      IS DISTINCT FROM OLD.user_id      OR
     NEW.role_target  IS DISTINCT FROM OLD.role_target  OR
     NEW.type         IS DISTINCT FROM OLD.type         OR
     NEW.href         IS DISTINCT FROM OLD.href         OR
     NEW.title        IS DISTINCT FROM OLD.title        OR
     NEW.body         IS DISTINCT FROM OLD.body         OR
     NEW.created_at   IS DISTINCT FROM OLD.created_at
  THEN
    RAISE EXCEPTION
      'notifications: only is_read may be updated (attempted change to immutable column)';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notification_readonly_cols ON public.notifications;

CREATE TRIGGER trg_notification_readonly_cols
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW EXECUTE FUNCTION public.enforce_notification_readonly_cols();


-- ═════════════════════════════════════════════════════════════════════════════
-- 011-03 (MEDIUM) — Allow users to delete their own notifications
-- ═════════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "notifications_delete_own" ON public.notifications;

CREATE POLICY "notifications_delete_own" ON public.notifications
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Role-broadcast notifications can only be deleted by ADMIN/MANAGER
-- (a PHARMACIST should not be able to delete a broadcast sent to their role)
DROP POLICY IF EXISTS "notifications_delete_broadcast" ON public.notifications;

CREATE POLICY "notifications_delete_broadcast" ON public.notifications
  FOR DELETE TO authenticated
  USING (
    role_target IS NOT NULL
    AND get_my_role() IN ('ADMIN','MANAGER')
  );


-- ═════════════════════════════════════════════════════════════════════════════
-- 012-01 (MEDIUM) — Audit trigger for JDPA consent field changes
-- ─────────────────────────────────────────────────────────────────────────────
-- jdpa_consent_at changes (including nullification) must be permanently traced
-- in the audit log per JDPA 2020. Without this trigger, a user with UPDATE
-- access to patients could clear or backdate the consent timestamp with no
-- audit record.
-- ═════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.log_patient_consent_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only fire when jdpa_consent_at actually changes
  IF NEW.jdpa_consent_at IS DISTINCT FROM OLD.jdpa_consent_at THEN
    INSERT INTO public.audit_log (
      actor_id,
      actor_name,
      action,
      table_name,
      record_id,
      details
    ) VALUES (
      auth.uid()::text,
      COALESCE(
        (SELECT full_name FROM public.staff_profiles WHERE id = auth.uid()),
        'system'
      ),
      'patient_jdpa_consent',
      'patients',
      NEW.id,
      jsonb_build_object(
        'op',            'UPDATE',
        'before_consent', OLD.jdpa_consent_at,
        'after_consent',  NEW.jdpa_consent_at,
        'patient_id',     NEW.id
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_patients_consent_audit ON public.patients;

CREATE TRIGGER trg_patients_consent_audit
  AFTER UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION public.log_patient_consent_change();

COMMENT ON TRIGGER trg_patients_consent_audit ON public.patients IS
  'Records every change to jdpa_consent_at in audit_log. '
  'Required for JDPA 2020 compliance — consent records must be immutably traceable. '
  'Fires only when jdpa_consent_at IS DISTINCT FROM its prior value.';


-- ═════════════════════════════════════════════════════════════════════════════
-- 009-01 (LOW) — Correction note for migration 009 trigger type
-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 009 comment states "BEFORE trigger" but the trigger was created as
-- AFTER. AFTER is the correct choice for audit (records committed state only).
-- This comment replaces the misleading trigger description in the catalog.
-- ═════════════════════════════════════════════════════════════════════════════

COMMENT ON TRIGGER trg_schedule_drug_audit ON public.schedule_drug_log IS
  'AFTER trigger — writes an audit_log entry for every INSERT, UPDATE, and DELETE '
  'on the controlled drug register after the DML commits. '
  'AFTER (not BEFORE) ensures only successful operations are logged. '
  'Required for Jamaica Dangerous Drugs Act compliance.';


-- ═════════════════════════════════════════════════════════════════════════════
-- DEFERRED FINDINGS (logged — not implemented in this migration)
-- ─────────────────────────────────────────────────────────────────────────────
--
-- 009-02 (LOW): TRUNCATE on schedule_drug_log produces no audit event.
--   Fix: Add statement-level AFTER TRUNCATE trigger. Deferred pending
--   ARE/Founder decision on whether TRUNCATE should be permitted at all
--   for clinical tables. Revoke TRUNCATE privilege may be preferable.
--
-- 009-03 (LOW): to_jsonb(NEW)/to_jsonb(OLD) serializes all columns.
--   Fix: Replace with explicit jsonb_build_object for schedule_drug_log.
--   Deferred — requires confirming the full column list with the data model.
--
-- 010-07 (MEDIUM): TECHNICIAN SELECT on patients — design confirmation needed.
--   Current: TECHNICIAN can read patient PII. If unintentional, remove
--   TECHNICIAN from rls_patients_select in a follow-up migration after
--   Founder/ARE confirmation.
--
-- CROSS-01 (MEDIUM): get_my_role() subquery fires on every policy evaluation.
--   Fix: Cache role in JWT app_metadata via Supabase auth hook. Requires SAA
--   architecture review. Deferred to post-pilot performance sprint.
--
-- ─────────────────────────────────────────────────────────────────────────────
-- SCA (Omari) re-review required on CRITICAL-00, 010-01, 010-02, 010-03,
-- 011-01, and 011-02 before running on the production Supabase instance.
-- ─────────────────────────────────────────────────────────────────────────────
