-- Migration 033 — Security Hardening
-- Addresses all findings from Supabase database linter security scan:
--   lint 0011: function_search_path_mutable   (18 functions)
--   lint 0024: rls_policy_always_true          (purchase_orders, purchase_order_items dev policies)
--   lint 0028: anon_security_definer_function_executable  (all SECURITY DEFINER functions)
--   lint 0029: authenticated_security_definer_function_executable (trigger-only + bootstrap functions)
-- Note: auth_leaked_password_protection is a Supabase dashboard setting — enable at:
--   Authentication → Providers → Email → Leaked Password Protection

-- ── 1. Fix mutable search_path on all public functions ────────────────────────
-- Using SET search_path = public (not '') to avoid breaking unqualified table
-- references inside function bodies. Fixes the mutable-path injection vector.

ALTER FUNCTION public.fn_notify_eod_pending()                                                                                     SET search_path = public;
ALTER FUNCTION public.generate_ref_number()                                                                                       SET search_path = public;
ALTER FUNCTION public.touch_updated_at()                                                                                          SET search_path = public;
ALTER FUNCTION public.enforce_notification_readonly_cols()                                                                        SET search_path = public;
ALTER FUNCTION public.get_my_role()                                                                                               SET search_path = public;
ALTER FUNCTION public.receive_stock_items(uuid, uuid, text)                                                                       SET search_path = public;
ALTER FUNCTION public.analyze_timecard(uuid)                                                                                      SET search_path = public;
ALTER FUNCTION public.fn_notify_low_stock()                                                                                       SET search_path = public;
ALTER FUNCTION public.fn_notify_expiry()                                                                                          SET search_path = public;
ALTER FUNCTION public.fn_notify_ai_review()                                                                                       SET search_path = public;
ALTER FUNCTION public.get_reorder_recommendations()                                                                               SET search_path = public;
ALTER FUNCTION public.request_void_transaction(uuid, text, text)                                                                  SET search_path = public;
ALTER FUNCTION public.approve_void_transaction(uuid)                                                                              SET search_path = public;
ALTER FUNCTION public.deny_void_transaction(uuid, text)                                                                           SET search_path = public;
ALTER FUNCTION public.adjust_product_stock(uuid, integer, public.stock_movement_type, uuid, text, text)                          SET search_path = public;
ALTER FUNCTION public.earn_loyalty_points(uuid, integer, uuid)                                                                    SET search_path = public;
ALTER FUNCTION public.decrement_product_stock(uuid, integer, uuid, text, uuid, text)                                             SET search_path = public;
ALTER FUNCTION public.generate_daily_inconsistency_report(date)                                                                   SET search_path = public;
ALTER FUNCTION public.bootstrap_admin(text)                                                                                       SET search_path = public;
ALTER FUNCTION public.handle_new_auth_user()                                                                                      SET search_path = public;
ALTER FUNCTION public.log_patient_consent_change()                                                                                SET search_path = public;
ALTER FUNCTION public.log_schedule_drug_change()                                                                                  SET search_path = public;

-- ── 2. Replace dev-mode open policies on purchase tables ──────────────────────
-- Migration 018 created USING(true)/WITH CHECK(true) policies as dev scaffolding.
-- Replacing with role-gated policies matching the inventory_manage permission set.

DROP POLICY IF EXISTS "dev_purchase_orders_all"  ON public.purchase_orders;
DROP POLICY IF EXISTS "dev_po_items_all"          ON public.purchase_order_items;

-- purchase_orders: inventory staff can read/write; auditors read-only
CREATE POLICY "purchase_orders_select" ON public.purchase_orders
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN', 'AUDITOR'));

CREATE POLICY "purchase_orders_write" ON public.purchase_orders
  FOR ALL TO authenticated
  USING     (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN'))
  WITH CHECK (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN'));

-- purchase_order_items: same access pattern as purchase_orders
CREATE POLICY "purchase_order_items_select" ON public.purchase_order_items
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN', 'AUDITOR'));

CREATE POLICY "purchase_order_items_write" ON public.purchase_order_items
  FOR ALL TO authenticated
  USING     (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN'))
  WITH CHECK (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN'));

-- ── 3. Revoke anon EXECUTE from all SECURITY DEFINER functions ─────────────────
-- No function should be callable by unauthenticated requests via /rest/v1/rpc/.
-- The anon role has default PUBLIC EXECUTE inherited from function creation.

REVOKE EXECUTE ON FUNCTION public.fn_notify_eod_pending()                                                                        FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_ref_number()                                                                          FROM anon;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at()                                                                             FROM anon;
REVOKE EXECUTE ON FUNCTION public.enforce_notification_readonly_cols()                                                           FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_my_role()                                                                                  FROM anon;
REVOKE EXECUTE ON FUNCTION public.receive_stock_items(uuid, uuid, text)                                                          FROM anon;
REVOKE EXECUTE ON FUNCTION public.analyze_timecard(uuid)                                                                         FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_notify_low_stock()                                                                          FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_notify_expiry()                                                                             FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_notify_ai_review()                                                                          FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_reorder_recommendations()                                                                  FROM anon;
REVOKE EXECUTE ON FUNCTION public.request_void_transaction(uuid, text, text)                                                     FROM anon;
REVOKE EXECUTE ON FUNCTION public.approve_void_transaction(uuid)                                                                 FROM anon;
REVOKE EXECUTE ON FUNCTION public.deny_void_transaction(uuid, text)                                                              FROM anon;
REVOKE EXECUTE ON FUNCTION public.adjust_product_stock(uuid, integer, public.stock_movement_type, uuid, text, text)             FROM anon;
REVOKE EXECUTE ON FUNCTION public.earn_loyalty_points(uuid, integer, uuid)                                                       FROM anon;
REVOKE EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer, uuid, text, uuid, text)                                FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_daily_inconsistency_report(date)                                                      FROM anon;
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin(text)                                                                          FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_auth_user()                                                                         FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_patient_consent_change()                                                                   FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_schedule_drug_change()                                                                     FROM anon;

-- ── 4. Revoke authenticated EXECUTE from trigger-only and bootstrap functions ──
-- These are invoked exclusively by the trigger system (as table owner) or were
-- one-time setup functions. No authenticated user should call them via REST.

REVOKE EXECUTE ON FUNCTION public.touch_updated_at()                   FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_notification_readonly_cols() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.fn_notify_eod_pending()              FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.fn_notify_low_stock()                FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.fn_notify_expiry()                   FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.fn_notify_ai_review()                FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_auth_user()               FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.log_patient_consent_change()         FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.log_schedule_drug_change()           FROM authenticated;
-- bootstrap_admin: one-time setup function, must not be callable post-deployment
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin(text)                FROM authenticated;
