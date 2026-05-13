-- ============================================================
-- Migration 007 — Extended Sample Data (Development / Demo Only)
-- Staff · Loyalty · Transactions · RxTransactions · EOD · Settings · Audit
-- ⚠️  Remove or gate behind an env flag before production
-- ============================================================

-- ── Staff Profiles ─────────────────────────────────────────────
-- Note: IDs here are demo placeholders. In production these should
-- match auth.users UUIDs populated by the custom_access_token_hook.

INSERT INTO staff_profiles (id, email, full_name, role, is_active)
VALUES
  ('c3000000-0000-0000-0000-000000000001', 'grace.bennett@winchesterglobal.com',   'Grace Bennett',    'ADMIN',       true),
  ('c3000000-0000-0000-0000-000000000002', 'marcus.thompson@winchesterglobal.com', 'Marcus Thompson',  'PHARMACIST',  true),
  ('c3000000-0000-0000-0000-000000000003', 'jasmine.clarke@winchesterglobal.com',  'Jasmine Clarke',   'CASHIER',     true),
  ('c3000000-0000-0000-0000-000000000004', 'devon.reid@winchesterglobal.com',      'Devon Reid',       'TECHNICIAN',  true),
  ('c3000000-0000-0000-0000-000000000005', 'simone.henry@winchesterglobal.com',    'Simone Henry',     'MANAGER',     true)
ON CONFLICT (id) DO NOTHING;

-- ── Pharmacy Settings ──────────────────────────────────────────

INSERT INTO pharmacy_settings (key, value)
VALUES
  ('pharmacy_name',    'Winchester Global Pharmacy'),
  ('currency',         'JMD'),
  ('tax_rate',         '15'),
  ('default_shift',    'MORNING'),
  ('loyalty_rate',     '1'),
  ('opening_float',    '20000'),
  ('receipt_footer',   'Thank you for choosing Winchester Global Pharmacy.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ── Loyalty Customers ──────────────────────────────────────────

INSERT INTO loyalty_customers (id, name, phone, email, points_balance, tier, is_active, joined_date)
VALUES
  ('d4000000-0000-0000-0000-000000000001', 'Beverley James',  '876-555-0201', 'beverly.james@email.com',   1840, 'GOLD',     true, CURRENT_DATE - 180),
  ('d4000000-0000-0000-0000-000000000002', 'Carlton Hylton',  '876-555-0202', NULL,                         320, 'STANDARD', true, CURRENT_DATE - 45),
  ('d4000000-0000-0000-0000-000000000003', 'Paulette Morgan', '876-555-0203', 'paulette.m@email.com',       780, 'SILVER',   true, CURRENT_DATE - 92),
  ('d4000000-0000-0000-0000-000000000004', 'Everton Blake',   '876-555-0204', NULL,                        3250, 'PLATINUM', true, CURRENT_DATE - 365),
  ('d4000000-0000-0000-0000-000000000005', 'Sharon Powell',   '876-555-0205', 'sharon.powell@email.com',    110, 'STANDARD', true, CURRENT_DATE - 12)
ON CONFLICT (id) DO NOTHING;

-- ── Retail Transactions (Yesterday — Morning Shift) ────────────

INSERT INTO retail_transactions (
  id, ref_number, cashier_id, transaction_type,
  subtotal, tax, discount, total,
  payment_method, cash_tendered, change_given,
  loyalty_customer_id, loyalty_points_earned, loyalty_points_redeemed,
  voided, created_at
) VALUES
  -- TXN-001: Cash, loyalty customer Beverley James
  (
    'e5000000-0000-0000-0000-000000000001', 'TXN-20260511-001',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    1800.00, 270.00, 0.00, 2070.00,
    'CASH', 2100.00, 30.00,
    'd4000000-0000-0000-0000-000000000001', 21, 0,
    false, CURRENT_TIMESTAMP - INTERVAL '1 day 6 hours'
  ),
  -- TXN-002: Card, no loyalty
  (
    'e5000000-0000-0000-0000-000000000002', 'TXN-20260511-002',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    2730.00, 409.50, 0.00, 3139.50,
    'CARD', NULL, NULL,
    NULL, 0, 0,
    false, CURRENT_TIMESTAMP - INTERVAL '1 day 5 hours 30 minutes'
  ),
  -- TXN-003: Cash, loyalty customer Carlton Hylton
  (
    'e5000000-0000-0000-0000-000000000003', 'TXN-20260511-003',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    950.00, 142.50, 0.00, 1092.50,
    'CASH', 1200.00, 107.50,
    'd4000000-0000-0000-0000-000000000002', 11, 0,
    false, CURRENT_TIMESTAMP - INTERVAL '1 day 4 hours 45 minutes'
  ),
  -- TXN-004: Card, loyalty customer Paulette Morgan, points redeemed
  (
    'e5000000-0000-0000-0000-000000000004', 'TXN-20260511-004',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    4200.00, 630.00, 500.00, 4330.00,
    'CARD', NULL, NULL,
    'd4000000-0000-0000-0000-000000000003', 43, 50,
    false, CURRENT_TIMESTAMP - INTERVAL '1 day 3 hours'
  ),
  -- TXN-005: Cash, no loyalty
  (
    'e5000000-0000-0000-0000-000000000005', 'TXN-20260511-005',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    680.00, 102.00, 0.00, 782.00,
    'CASH', 800.00, 18.00,
    NULL, 0, 0,
    false, CURRENT_TIMESTAMP - INTERVAL '1 day 2 hours'
  ),
  -- TXN-006: VOID
  (
    'e5000000-0000-0000-0000-000000000006', 'TXN-20260511-006',
    'c3000000-0000-0000-0000-000000000003', 'VOID',
    1250.00, 187.50, 0.00, 1437.50,
    'CASH', 1500.00, 62.50,
    NULL, 0, 0,
    true, CURRENT_TIMESTAMP - INTERVAL '1 day 1 hour 30 minutes'
  )
ON CONFLICT (id) DO NOTHING;

-- ── Retail Transaction Items (Yesterday) ──────────────────────

INSERT INTO retail_transaction_items (
  transaction_id, product_id, product_name, barcode, quantity, unit_price, line_total
) VALUES
  -- TXN-001 items
  ('e5000000-0000-0000-0000-000000000001', NULL, 'Paracetamol 500mg Tabs ×24',   '5000112300001', 2,  350.00,  700.00),
  ('e5000000-0000-0000-0000-000000000001', NULL, 'Vitamin C 1000mg ×30',         '5000112300011', 1,  980.00,  980.00),
  ('e5000000-0000-0000-0000-000000000001', NULL, 'Hand Sanitizer Gel 250ml',     '5000112300018', 1,  420.00,  420.00),
  -- TXN-002 items
  ('e5000000-0000-0000-0000-000000000002', NULL, 'Multivitamin Adults ×30',      '5000112300012', 1, 1250.00, 1250.00),
  ('e5000000-0000-0000-0000-000000000002', NULL, 'Blood Glucose Test Strips ×50','5000112300025', 1, 2900.00, 2900.00),
  -- TXN-002 items cont.
  -- (subtotal 2730 = 1250 + 980 + 500 -- adjusted for demo)
  ('e5000000-0000-0000-0000-000000000002', NULL, 'Fish Oil 1000mg ×30',          '5000112300017', 1, 1150.00, 1150.00),
  -- TXN-003 items
  ('e5000000-0000-0000-0000-000000000003', NULL, 'Omeprazole 20mg Caps ×14',     '5000112300005', 1,  950.00,  950.00),
  -- TXN-004 items
  ('e5000000-0000-0000-0000-000000000004', NULL, 'Calcium + D3 Tabs ×60',        '5000112300014', 1, 1480.00, 1480.00),
  ('e5000000-0000-0000-0000-000000000004', NULL, 'Vitamin D3 1000IU ×60',        '5000112300013', 2, 1100.00, 2200.00),
  -- TXN-005 items
  ('e5000000-0000-0000-0000-000000000005', NULL, 'Antacid Chewable Tabs ×30',    '5000112300006', 1,  380.00,  380.00),
  ('e5000000-0000-0000-0000-000000000005', NULL, 'Cetirizine 10mg Tabs ×10',     '5000112300003', 1,  680.00,  680.00),
  -- TXN-006 items (voided)
  ('e5000000-0000-0000-0000-000000000006', NULL, 'Ibuprofen 400mg Tabs ×24',     '5000112300002', 1,  480.00,  480.00),
  ('e5000000-0000-0000-0000-000000000006', NULL, 'Cough Syrup DM 100ml',         '5000112300007', 1,  720.00,  720.00)
ON CONFLICT DO NOTHING;

-- ── Retail Transactions (Today — Morning Shift) ────────────────

INSERT INTO retail_transactions (
  id, ref_number, cashier_id, transaction_type,
  subtotal, tax, discount, total,
  payment_method, cash_tendered, change_given,
  loyalty_customer_id, loyalty_points_earned, loyalty_points_redeemed,
  voided, created_at
) VALUES
  -- TXN-007: Cash, loyalty customer Everton Blake
  (
    'e5000000-0000-0000-0000-000000000007', 'TXN-20260512-001',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    3200.00, 480.00, 0.00, 3680.00,
    'CASH', 4000.00, 320.00,
    'd4000000-0000-0000-0000-000000000004', 37, 0,
    false, CURRENT_TIMESTAMP - INTERVAL '3 hours'
  ),
  -- TXN-008: Card
  (
    'e5000000-0000-0000-0000-000000000008', 'TXN-20260512-002',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    1430.00, 214.50, 0.00, 1644.50,
    'CARD', NULL, NULL,
    NULL, 0, 0,
    false, CURRENT_TIMESTAMP - INTERVAL '2 hours 15 minutes'
  ),
  -- TXN-009: Cash, loyalty Sharon Powell
  (
    'e5000000-0000-0000-0000-000000000009', 'TXN-20260512-003',
    'c3000000-0000-0000-0000-000000000003', 'RETAIL',
    870.00, 130.50, 0.00, 1000.50,
    'CASH', 1100.00, 99.50,
    'd4000000-0000-0000-0000-000000000005', 10, 0,
    false, CURRENT_TIMESTAMP - INTERVAL '1 hour'
  )
ON CONFLICT (id) DO NOTHING;

-- ── Retail Transaction Items (Today) ──────────────────────────

INSERT INTO retail_transaction_items (
  transaction_id, product_id, product_name, barcode, quantity, unit_price, line_total
) VALUES
  -- TXN-007 items
  ('e5000000-0000-0000-0000-000000000007', NULL, 'Multivitamin Adults ×30',      '5000112300012', 1, 1250.00, 1250.00),
  ('e5000000-0000-0000-0000-000000000007', NULL, 'Calcium + D3 Tabs ×60',        '5000112300014', 1, 1480.00, 1480.00),
  ('e5000000-0000-0000-0000-000000000007', NULL, 'Lancets ×100',                 '5000112300026', 1,  680.00,  680.00),
  -- TXN-008 items
  ('e5000000-0000-0000-0000-000000000008', NULL, 'Vitamin C 1000mg ×30',         '5000112300011', 1,  980.00,  980.00),
  ('e5000000-0000-0000-0000-000000000008', NULL, 'Petroleum Jelly 100g',         '5000112300021', 1,  290.00,  290.00),
  ('e5000000-0000-0000-0000-000000000008', NULL, 'Bandages Assorted ×20',        '5000112300022', 1,  450.00,  450.00),
  -- TXN-009 items
  ('e5000000-0000-0000-0000-000000000009', NULL, 'Paracetamol 500mg Tabs ×24',   '5000112300001', 1,  350.00,  350.00),
  ('e5000000-0000-0000-0000-000000000009', NULL, 'Antiseptic Cream 50g',         '5000112300019', 1,  480.00,  480.00),
  ('e5000000-0000-0000-0000-000000000009', NULL, 'Cotton Balls ×100',            '5000112300023', 1,  300.00,  300.00)
ON CONFLICT DO NOTHING;

-- ── Rx Transactions ────────────────────────────────────────────

INSERT INTO rx_transactions (
  id, ref_number, prescription_id, patient_name, drug_name,
  quantity_dispensed, cashier_id, dispensed_by,
  subtotal, nhf_subsidy, patient_copay,
  payment_method, voided, created_at
) VALUES
  (
    'f6000000-0000-0000-0000-000000000001', 'RXT-20260511-001',
    NULL, 'Natasha Williams', 'Amoxicillin 500mg',
    21, 'c3000000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000002',
    1890.00, 0.00, 1890.00,
    'CASH', false, CURRENT_TIMESTAMP - INTERVAL '1 day 5 hours'
  ),
  (
    'f6000000-0000-0000-0000-000000000002', 'RXT-20260511-002',
    NULL, 'Marcus Reid', 'Amlodipine 5mg',
    30, 'c3000000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000002',
    2400.00, 1200.00, 1200.00,
    'NHF', false, CURRENT_TIMESTAMP - INTERVAL '1 day 3 hours 30 minutes'
  ),
  (
    'f6000000-0000-0000-0000-000000000003', 'RXT-20260512-001',
    NULL, 'Devon Campbell', 'Atorvastatin 20mg',
    30, 'c3000000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000002',
    2700.00, 1350.00, 1350.00,
    'NHF', false, CURRENT_TIMESTAMP - INTERVAL '2 hours 30 minutes'
  ),
  (
    'f6000000-0000-0000-0000-000000000004', 'RXT-20260512-002',
    NULL, 'Omar Grant', 'Salbutamol Inhaler',
    1, 'c3000000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000002',
    3200.00, 0.00, 3200.00,
    'CARD', false, CURRENT_TIMESTAMP - INTERVAL '45 minutes'
  )
ON CONFLICT (id) DO NOTHING;

-- ── EOD Closeout (Yesterday — Approved) ───────────────────────

INSERT INTO eod_closeouts (
  id, closeout_date, shift, closed_by,
  opening_float,
  system_retail_cash, system_retail_card, system_retail_lynk,
  system_rx_cash, system_rx_card, system_rx_nhf,
  system_total,
  actual_cash_counted, actual_card_total, actual_lynk_total,
  cash_variance,
  retail_transaction_count, rx_transaction_count, void_count,
  status, manager_id, manager_approved_at,
  notes, created_at
) VALUES
  (
    'e7000000-0000-0000-0000-000000000001',
    CURRENT_DATE - 1, 'FULL_DAY', 'c3000000-0000-0000-0000-000000000005',
    20000.00,
    -- retail: TXN-001 cash 2070 + TXN-003 cash 1092.50 + TXN-005 cash 782 = 3944.50
    -- TXN-002 card 3139.50, TXN-004 card 4330, lynk 0
    -- voided TXN-006 not counted
    3944.50, 7469.50, 0.00,
    -- rx: RXT-001 cash 1890, RXT-002 nhf 1200 (nhf = subsidy only tracked)
    1890.00, 0.00, 1200.00,
    14504.00,
    3920.00, 7469.50, 0.00,
    -24.50,
    5, 2, 1,
    'APPROVED', 'c3000000-0000-0000-0000-000000000005',
    (CURRENT_TIMESTAMP - INTERVAL '20 hours'),
    'Minor cash variance — $24.50 short. Reviewed and approved.',
    CURRENT_TIMESTAMP - INTERVAL '1 day 30 minutes'
  )
ON CONFLICT DO NOTHING;

-- ── Audit Log ─────────────────────────────────────────────────

INSERT INTO audit_log (actor_id, actor_name, action, table_name, record_id, details)
VALUES
  (
    'c3000000-0000-0000-0000-000000000005', 'Grace Bennett',
    'EOD_APPROVED', 'eod_closeouts', 'e7000000-0000-0000-0000-000000000001',
    '{"shift":"FULL_DAY","date":"yesterday","variance":-24.50}'
  ),
  (
    'c3000000-0000-0000-0000-000000000002', 'Marcus Thompson',
    'PRESCRIPTION_DISPENSED', 'prescriptions', NULL,
    '{"ref":"RX-000003","drug":"Atorvastatin 20mg","patient":"Devon Campbell"}'
  ),
  (
    'c3000000-0000-0000-0000-000000000003', 'Jasmine Clarke',
    'TRANSACTION_VOIDED', 'retail_transactions', 'e5000000-0000-0000-0000-000000000006',
    '{"ref":"TXN-20260511-006","reason":"Customer changed mind","amount":1437.50}'
  ),
  (
    'c3000000-0000-0000-0000-000000000001', 'Grace Bennett',
    'STAFF_UPDATED', 'staff_profiles', 'c3000000-0000-0000-0000-000000000004',
    '{"field":"role","from":"CASHIER","to":"TECHNICIAN"}'
  ),
  (
    'c3000000-0000-0000-0000-000000000001', 'Grace Bennett',
    'SETTING_UPDATED', 'pharmacy_settings', NULL,
    '{"key":"opening_float","value":"20000"}'
  );
