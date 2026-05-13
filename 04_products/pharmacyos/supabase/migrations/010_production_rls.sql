-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 010: Production Row Level Security Policies
-- Replaces ALL dev-permissive placeholder policies with role-scoped policies.
--
-- IMPORTANT: This migration must be reviewed by SCA (Omari) before running
-- in any environment with real patient or transaction data.
--
-- Role mapping (from staff_profiles.role):
--   ADMIN      — full access to all tables
--   MANAGER    — POS, inventory, reports, loyalty, audit view
--   PHARMACIST — Rx, patients, inventory, schedule drug log, AI queue, reports
--   CASHIER    — POS terminal, loyalty only
--   TECHNICIAN — POS terminal, inventory, AI queue, Rx dispense
--
-- Helper: get_my_role() reads the current user's role from staff_profiles.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Helper function ───────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::TEXT
  FROM public.staff_profiles
  WHERE id = auth.uid()
  LIMIT 1;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- retail_transactions
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_retail_transactions" ON public.retail_transactions;

CREATE POLICY "rls_retail_transactions_select" ON public.retail_transactions
  FOR SELECT TO authenticated
  USING (
    get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','CASHIER','TECHNICIAN')
  );

CREATE POLICY "rls_retail_transactions_insert" ON public.retail_transactions
  FOR INSERT TO authenticated
  WITH CHECK (
    get_my_role() IN ('ADMIN','MANAGER','CASHIER','TECHNICIAN')
  );

CREATE POLICY "rls_retail_transactions_update" ON public.retail_transactions
  FOR UPDATE TO authenticated
  USING (
    get_my_role() IN ('ADMIN','MANAGER')
  )
  WITH CHECK (
    get_my_role() IN ('ADMIN','MANAGER')
  );

-- Deletes are blocked for all roles — use voided=true instead.
-- No DELETE policy created for retail_transactions.

-- ─────────────────────────────────────────────────────────────────────────────
-- retail_transaction_items
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_retail_transaction_items" ON public.retail_transaction_items;

CREATE POLICY "rls_tx_items_select" ON public.retail_transaction_items
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','CASHIER','TECHNICIAN'));

CREATE POLICY "rls_tx_items_insert" ON public.retail_transaction_items
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER','CASHIER','TECHNICIAN'));

-- ─────────────────────────────────────────────────────────────────────────────
-- rx_transactions
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_rx_transactions" ON public.rx_transactions;

CREATE POLICY "rls_rx_transactions_select" ON public.rx_transactions
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','TECHNICIAN'));

CREATE POLICY "rls_rx_transactions_insert" ON public.rx_transactions
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'));

-- No UPDATE or DELETE — Rx transactions are immutable records.

-- ─────────────────────────────────────────────────────────────────────────────
-- eod_closeouts
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_eod_closeouts" ON public.eod_closeouts;

CREATE POLICY "rls_eod_select" ON public.eod_closeouts
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','CASHIER'));

CREATE POLICY "rls_eod_insert" ON public.eod_closeouts
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER','CASHIER'));

-- Only MANAGER and ADMIN can update (approve/discrepancy status)
CREATE POLICY "rls_eod_update" ON public.eod_closeouts
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER'))
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER'));

-- ─────────────────────────────────────────────────────────────────────────────
-- extraction_queue (AI document queue — JDPA-sensitive)
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_extraction_queue" ON public.extraction_queue;

CREATE POLICY "rls_extraction_select" ON public.extraction_queue
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','TECHNICIAN'));

CREATE POLICY "rls_extraction_insert" ON public.extraction_queue
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'));

CREATE POLICY "rls_extraction_update" ON public.extraction_queue
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'))
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'));

-- ─────────────────────────────────────────────────────────────────────────────
-- products
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_products" ON public.products;

CREATE POLICY "rls_products_select" ON public.products
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','CASHIER','TECHNICIAN'));

CREATE POLICY "rls_products_insert" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER','TECHNICIAN'));

CREATE POLICY "rls_products_update" ON public.products
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','TECHNICIAN'))
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','TECHNICIAN'));

-- ─────────────────────────────────────────────────────────────────────────────
-- patients (JDPA 2020 — highest sensitivity)
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_patients" ON public.patients;

-- Only clinical roles may access patient health records
CREATE POLICY "rls_patients_select" ON public.patients
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'));

CREATE POLICY "rls_patients_insert" ON public.patients
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST'));

CREATE POLICY "rls_patients_update" ON public.patients
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','PHARMACIST'))
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST'));

-- Deletes require ADMIN only (JDPA deletion requests)
CREATE POLICY "rls_patients_delete" ON public.patients
  FOR DELETE TO authenticated
  USING (get_my_role() = 'ADMIN');

-- ─────────────────────────────────────────────────────────────────────────────
-- prescriptions
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_prescriptions" ON public.prescriptions;

CREATE POLICY "rls_prescriptions_select" ON public.prescriptions
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','PHARMACIST','TECHNICIAN'));

CREATE POLICY "rls_prescriptions_insert" ON public.prescriptions
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'));

CREATE POLICY "rls_prescriptions_update" ON public.prescriptions
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'))
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST','TECHNICIAN'));

-- ─────────────────────────────────────────────────────────────────────────────
-- staff_profiles
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_staff_profiles" ON public.staff_profiles;

-- All authenticated users may read staff_profiles (needed for useCurrentUser lookup)
CREATE POLICY "rls_staff_select" ON public.staff_profiles
  FOR SELECT TO authenticated
  USING (true);

-- Only ADMIN and MANAGER may create or update staff accounts
CREATE POLICY "rls_staff_insert" ON public.staff_profiles
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER'));

CREATE POLICY "rls_staff_update" ON public.staff_profiles
  FOR UPDATE TO authenticated
  USING (
    -- ADMIN can update any profile; staff can update their own profile only
    get_my_role() = 'ADMIN'
    OR id = auth.uid()
  )
  WITH CHECK (
    get_my_role() = 'ADMIN'
    OR id = auth.uid()
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- pharmacy_settings
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_pharmacy_settings" ON public.pharmacy_settings;

-- All authenticated users may read settings (pharmacy name, currency, etc.)
CREATE POLICY "rls_settings_select" ON public.pharmacy_settings
  FOR SELECT TO authenticated
  USING (true);

-- Only ADMIN and MANAGER may change settings
CREATE POLICY "rls_settings_insert" ON public.pharmacy_settings
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER'));

CREATE POLICY "rls_settings_update" ON public.pharmacy_settings
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER'))
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER'));

-- ─────────────────────────────────────────────────────────────────────────────
-- loyalty_customers
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_loyalty_customers" ON public.loyalty_customers;

CREATE POLICY "rls_loyalty_select" ON public.loyalty_customers
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','CASHIER','TECHNICIAN'));

CREATE POLICY "rls_loyalty_insert" ON public.loyalty_customers
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER','CASHIER'));

CREATE POLICY "rls_loyalty_update" ON public.loyalty_customers
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','CASHIER','TECHNICIAN'))
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER','CASHIER','TECHNICIAN'));

-- ─────────────────────────────────────────────────────────────────────────────
-- retail_suppliers
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_retail_suppliers" ON public.retail_suppliers;

CREATE POLICY "rls_suppliers_select" ON public.retail_suppliers
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER','TECHNICIAN'));

CREATE POLICY "rls_suppliers_insert" ON public.retail_suppliers
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER'));

CREATE POLICY "rls_suppliers_update" ON public.retail_suppliers
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER'))
  WITH CHECK (get_my_role() IN ('ADMIN','MANAGER'));

-- ─────────────────────────────────────────────────────────────────────────────
-- audit_log (append-only — no UPDATE, no DELETE for any role)
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_audit_log" ON public.audit_log;

-- ADMIN and MANAGER can read; PHARMACIST and MANAGER if they have audit_view permission
-- For simplicity at the RLS layer: all clinical and admin roles can read
CREATE POLICY "rls_audit_select" ON public.audit_log
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','MANAGER'));

-- Any authenticated user may INSERT (audit writes happen throughout the app)
CREATE POLICY "rls_audit_insert" ON public.audit_log
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- No UPDATE or DELETE policies — audit_log is append-only.
-- Attempts to UPDATE or DELETE will be denied by default (no permissive policy).

-- ─────────────────────────────────────────────────────────────────────────────
-- schedule_drug_log (Jamaica Dangerous Drugs Act — restricted)
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "dev_allow_authenticated_schedule_drug_log" ON public.schedule_drug_log;

-- Only pharmacists and admin may access the controlled drug register
CREATE POLICY "rls_schedule_drug_select" ON public.schedule_drug_log
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN','PHARMACIST'));

CREATE POLICY "rls_schedule_drug_insert" ON public.schedule_drug_log
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN','PHARMACIST'));

-- Updates require ADMIN only — controlled drug entries should be corrected
-- via a superseding entry, not edited in place. ADMIN override for genuine errors.
CREATE POLICY "rls_schedule_drug_update" ON public.schedule_drug_log
  FOR UPDATE TO authenticated
  USING (get_my_role() = 'ADMIN')
  WITH CHECK (get_my_role() = 'ADMIN');

-- Deletes require ADMIN only and will be captured by the audit trigger (migration 009)
CREATE POLICY "rls_schedule_drug_delete" ON public.schedule_drug_log
  FOR DELETE TO authenticated
  USING (get_my_role() = 'ADMIN');

-- ─────────────────────────────────────────────────────────────────────────────
-- SCA (Omari) review required before running in any environment
-- with real patient data, Rx records, or controlled drug entries.
-- ─────────────────────────────────────────────────────────────────────────────
