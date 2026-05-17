-- Migration 036 — Auth RLS Initialization Plan Fix
-- Resolves Supabase Performance Advisor lint 0028: "Auth RLS Initialization Plan"
--
-- Problem: bare auth.uid() calls in RLS USING / WITH CHECK clauses force PostgreSQL
-- to re-initialize the auth.uid() function on EVERY ROW evaluated. Wrapping the
-- call as (SELECT auth.uid()) allows the planner to hoist it out of the row loop
-- and evaluate it ONCE per query — materially faster on large tables.
--
-- Affected tables (from Performance Advisor screenshot — 20 warnings total):
--   public.timecards           (3 policies)
--   public.notifications       (4 policies)
--   public.staff_profiles      (2 policies)
--   public.audit_log           (1 policy)
--
-- Strategy: DROP the affected policies and recreate them with (SELECT auth.uid()).
-- All other policy conditions are preserved exactly.

-- ═════════════════════════════════════════════════════════════════════════════
-- 1. timecards
-- ─────────────────────────────────────────────────────────────────────────────
-- Original policies from migration 019; bare auth.uid() in all three.

DROP POLICY IF EXISTS "timecards_select" ON public.timecards;
CREATE POLICY "timecards_select" ON public.timecards
  FOR SELECT TO authenticated
  USING (
    staff_id = (SELECT auth.uid())
    OR get_my_role() IN ('ADMIN', 'MANAGER')
  );

DROP POLICY IF EXISTS "timecards_insert" ON public.timecards;
CREATE POLICY "timecards_insert" ON public.timecards
  FOR INSERT TO authenticated
  WITH CHECK (staff_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "timecards_update" ON public.timecards;
CREATE POLICY "timecards_update" ON public.timecards
  FOR UPDATE TO authenticated
  USING (
    staff_id = (SELECT auth.uid())
    OR get_my_role() IN ('ADMIN', 'MANAGER')
  )
  WITH CHECK (true);


-- ═════════════════════════════════════════════════════════════════════════════
-- 2. notifications
-- ─────────────────────────────────────────────────────────────────────────────
-- Original policies from migrations 011 and 013.

DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT TO authenticated
  USING (
    user_id = (SELECT auth.uid())
    OR role_target = get_my_role()
  );

DROP POLICY IF EXISTS "notifications_insert_own" ON public.notifications;
CREATE POLICY "notifications_insert_own" ON public.notifications
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND role_target IS NULL
  );

-- Role-broadcast policy has no auth.uid() — unchanged.
-- notifications_insert_broadcast is fine as-is.

DROP POLICY IF EXISTS "notifications_update_read" ON public.notifications;
CREATE POLICY "notifications_update_read" ON public.notifications
  FOR UPDATE TO authenticated
  USING (
    user_id = (SELECT auth.uid())
    OR role_target = get_my_role()
  )
  WITH CHECK (is_read = true);

DROP POLICY IF EXISTS "notifications_delete_own" ON public.notifications;
CREATE POLICY "notifications_delete_own" ON public.notifications
  FOR DELETE TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- notifications_delete_broadcast has no auth.uid() — unchanged.


-- ═════════════════════════════════════════════════════════════════════════════
-- 3. staff_profiles
-- ─────────────────────────────────────────────────────────────────────────────
-- rls_staff_select: from migration 013; id = auth.uid() in USING
-- rls_staff_update: from migration 013; id = auth.uid() in both USING and WITH CHECK

DROP POLICY IF EXISTS "rls_staff_select" ON public.staff_profiles;
CREATE POLICY "rls_staff_select" ON public.staff_profiles
  FOR SELECT TO authenticated
  USING (
    id = (SELECT auth.uid())
    OR get_my_role() IN ('ADMIN', 'MANAGER')
  );

DROP POLICY IF EXISTS "rls_staff_update" ON public.staff_profiles;
CREATE POLICY "rls_staff_update" ON public.staff_profiles
  FOR UPDATE TO authenticated
  USING (
    get_my_role() = 'ADMIN'
    OR id = (SELECT auth.uid())
  )
  WITH CHECK (
    -- ADMIN may change any column including role
    get_my_role() = 'ADMIN'
    -- Non-admin may update their own profile but MUST NOT change their role
    OR (
      id = (SELECT auth.uid())
      AND role = (
        SELECT s.role FROM public.staff_profiles s
        WHERE s.id = (SELECT auth.uid())
      )
    )
  );


-- ═════════════════════════════════════════════════════════════════════════════
-- 4. audit_log
-- ─────────────────────────────────────────────────────────────────────────────
-- rls_audit_insert: from migration 013; actor_id = auth.uid()::text in WITH CHECK

DROP POLICY IF EXISTS "rls_audit_insert" ON public.audit_log;
CREATE POLICY "rls_audit_insert" ON public.audit_log
  FOR INSERT TO authenticated
  WITH CHECK (
    actor_id = (SELECT auth.uid())::text
    OR actor_id IS NULL
  );


-- ═════════════════════════════════════════════════════════════════════════════
-- Verification
-- ─────────────────────────────────────────────────────────────────────────────
-- After running, confirm policies are updated by querying pg_policies:
--
--   SELECT tablename, policyname, qual, with_check
--   FROM pg_policies
--   WHERE schemaname = 'public'
--     AND tablename IN ('timecards', 'notifications', 'staff_profiles', 'audit_log')
--   ORDER BY tablename, policyname;
--
-- Each policy should reference '(SELECT auth.uid())' rather than bare 'auth.uid()'.
-- The Performance Advisor may take a short time to re-analyze after the change.
