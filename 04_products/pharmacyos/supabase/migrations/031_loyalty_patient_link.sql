-- ============================================================
-- Migration 031 — Loyalty ↔ Patient link + redemption rate
-- Adds patient_id FK to loyalty_customers for phone-based
-- cross-reference, seeds loyalty_redemption_value setting,
-- and adds sample loyalty members linked to existing patients.
-- ============================================================

-- ── 1. Add patient_id FK to loyalty_customers ──────────────
ALTER TABLE loyalty_customers
  ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_loyalty_customers_patient_id
  ON loyalty_customers(patient_id);

CREATE INDEX IF NOT EXISTS idx_loyalty_customers_phone
  ON loyalty_customers(phone);

-- ── 2. Loyalty redemption rate setting ────────────────────
-- Value = J$ credited per 1 point redeemed (e.g. 0.01 = 1¢/pt)
INSERT INTO pharmacy_settings (key, value)
VALUES ('loyalty_redemption_value', '0.01')
ON CONFLICT (key) DO NOTHING;

-- ── 3. Link existing loyalty customers to patients ────────
-- Beverley James has no patient record — no update needed.
-- Add 3 new loyalty members that are also registered patients.

INSERT INTO loyalty_customers
  (id, name, phone, email, points_balance, tier, is_active, joined_date, patient_id)
VALUES
  (
    'd4000000-0000-0000-0000-000000000006',
    'Marcus Reid',
    '876-555-0101',
    NULL,
    520,
    'SILVER',
    true,
    CURRENT_DATE - 60,
    'b2000000-0000-0000-0000-000000000001'
  ),
  (
    'd4000000-0000-0000-0000-000000000007',
    'Simone Brown',
    '876-555-0102',
    NULL,
    150,
    'STANDARD',
    true,
    CURRENT_DATE - 25,
    'b2000000-0000-0000-0000-000000000002'
  ),
  (
    'd4000000-0000-0000-0000-000000000008',
    'Devon Campbell',
    '876-555-0103',
    NULL,
    1200,
    'GOLD',
    true,
    CURRENT_DATE - 120,
    'b2000000-0000-0000-0000-000000000003'
  )
ON CONFLICT (id) DO NOTHING;
