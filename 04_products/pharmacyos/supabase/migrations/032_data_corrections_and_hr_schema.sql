-- ============================================================
-- Migration 032 — Data corrections + HR schema
-- Fixes:
--   1. tax_rate → gct_rate key correction in pharmacy_settings
--   2. Sample timecard records for demo
--   3. AUDITOR sample staff member
--   4. Sample timecard data in pharmacy_settings
-- New:
--   HR module — staff_leaves + staff_certifications tables
--   leave_manage / leave_approve permissions (additive to existing matrix)
--   HR sample data
-- ============================================================

-- ── 1. Fix tax_rate → gct_rate key mismatch ──────────────────
-- The application reads 'gct_rate'; migration 007 seeded 'tax_rate'.
-- Rename the key so the live value is read correctly.

UPDATE pharmacy_settings SET key = 'gct_rate' WHERE key = 'tax_rate';

-- ── 2. Timecard settings (idempotent) ────────────────────────
-- Already inserted by 019 but may need gct_rate alongside them.
-- Ensure pharmacy_name and gct_rate coexist cleanly.

-- ── 3. AUDITOR sample staff member ───────────────────────────
INSERT INTO staff_profiles (id, email, full_name, role, is_active)
VALUES (
  'c3000000-0000-0000-0000-000000000006',
  'auditor@winchesterglobal.com',
  'Andrea Thompson',
  'AUDITOR',
  true
)
ON CONFLICT (id) DO NOTHING;

-- ── 4. Sample timecard records ────────────────────────────────
-- Five completed shifts across the demo staff members.
-- Statuses: 2 APPROVED, 2 CLOCKED_OUT (pending review), 1 FLAGGED (overtime).

INSERT INTO timecards
  (id, staff_id, staff_name, staff_role, clocked_in_at, clocked_out_at,
   total_minutes, status, ai_flag_overtime, ai_flag_reason, approved_by_name, approved_at)
VALUES
  (
    'e5000000-0000-0000-0000-000000000001',
    'c3000000-0000-0000-0000-000000000002',
    'Marcus Thompson', 'PHARMACIST',
    NOW() - INTERVAL '2 days' + INTERVAL '8 hours',
    NOW() - INTERVAL '2 days' + INTERVAL '16 hours',
    480, 'APPROVED', false, NULL, 'Simone Henry', NOW() - INTERVAL '1 day'
  ),
  (
    'e5000000-0000-0000-0000-000000000002',
    'c3000000-0000-0000-0000-000000000003',
    'Jasmine Clarke', 'CASHIER',
    NOW() - INTERVAL '2 days' + INTERVAL '9 hours',
    NOW() - INTERVAL '2 days' + INTERVAL '17 hours 30 minutes',
    510, 'APPROVED', false, NULL, 'Simone Henry', NOW() - INTERVAL '1 day'
  ),
  (
    'e5000000-0000-0000-0000-000000000003',
    'c3000000-0000-0000-0000-000000000004',
    'Devon Reid', 'TECHNICIAN',
    NOW() - INTERVAL '1 day' + INTERVAL '8 hours',
    NOW() - INTERVAL '1 day' + INTERVAL '17 hours',
    540, 'CLOCKED_OUT', false, NULL, NULL, NULL
  ),
  (
    'e5000000-0000-0000-0000-000000000004',
    'c3000000-0000-0000-0000-000000000002',
    'Marcus Thompson', 'PHARMACIST',
    NOW() - INTERVAL '1 day' + INTERVAL '8 hours',
    NOW() - INTERVAL '1 day' + INTERVAL '19 hours 15 minutes',
    675, 'FLAGGED', true,
    'Shift duration 11h 15m exceeds overtime threshold of 8h (675 min > 480 min).', NULL, NULL
  ),
  (
    'e5000000-0000-0000-0000-000000000005',
    'c3000000-0000-0000-0000-000000000003',
    'Jasmine Clarke', 'CASHIER',
    NOW() - INTERVAL '3 hours',
    NULL,
    NULL, 'CLOCKED_IN', false, NULL, NULL, NULL
  )
ON CONFLICT (id) DO NOTHING;

-- ── 5. HR schema — staff_certifications ──────────────────────
-- Tracks professional licences and certifications for pharmacy staff.
-- Critical for pharmacist licence renewal compliance (Pharmacy Council of Jamaica).

CREATE TABLE IF NOT EXISTS staff_certifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  staff_name      TEXT NOT NULL,
  cert_type       TEXT NOT NULL,        -- e.g. 'Pharmacist Licence', 'CPD Certificate'
  cert_number     TEXT,                 -- licence / registration number
  issued_by       TEXT,                 -- issuing authority
  issued_date     DATE,
  expiry_date     DATE NOT NULL,        -- triggers alert when approaching
  alert_days      INTEGER NOT NULL DEFAULT 60,  -- days before expiry to alert
  status          TEXT NOT NULL DEFAULT 'VALID'
                  CHECK (status IN ('VALID', 'EXPIRING_SOON', 'EXPIRED', 'RENEWED')),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_staff_certifications_staff
  ON staff_certifications(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_certifications_expiry
  ON staff_certifications(expiry_date);

-- ── 6. HR schema — staff_leaves ──────────────────────────────
-- Leave requests submitted by staff, approved/denied by managers.
-- Covers annual leave, sick leave, bereavement, and study leave.

CREATE TYPE IF NOT EXISTS leave_type AS ENUM (
  'ANNUAL', 'SICK', 'BEREAVEMENT', 'STUDY', 'MATERNITY', 'PATERNITY', 'OTHER'
);

CREATE TYPE IF NOT EXISTS leave_status AS ENUM (
  'PENDING', 'APPROVED', 'DENIED', 'CANCELLED'
);

CREATE TABLE IF NOT EXISTS staff_leaves (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  staff_name      TEXT NOT NULL,
  staff_role      TEXT NOT NULL,
  leave_type      leave_type NOT NULL,
  start_date      DATE NOT NULL,
  end_date        DATE NOT NULL,
  days_requested  INTEGER NOT NULL GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
  reason          TEXT,
  status          leave_status NOT NULL DEFAULT 'PENDING',
  reviewed_by     UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  reviewed_by_name TEXT,
  reviewed_at     TIMESTAMPTZ,
  review_note     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT leave_dates_valid CHECK (end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS idx_staff_leaves_staff
  ON staff_leaves(staff_id, start_date DESC);
CREATE INDEX IF NOT EXISTS idx_staff_leaves_status
  ON staff_leaves(status);
CREATE INDEX IF NOT EXISTS idx_staff_leaves_dates
  ON staff_leaves(start_date, end_date);

-- ── 7. RLS for HR tables ──────────────────────────────────────

ALTER TABLE staff_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_leaves ENABLE ROW LEVEL SECURITY;

-- Certifications: staff sees own; ADMIN/MANAGER see all
CREATE POLICY cert_select ON staff_certifications FOR SELECT TO authenticated
  USING (
    staff_id = (SELECT id FROM staff_profiles WHERE id = auth.uid() LIMIT 1)
    OR EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER')
    )
  );

CREATE POLICY cert_insert ON staff_certifications FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER')
    )
  );

CREATE POLICY cert_update ON staff_certifications FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER')
    )
  );

-- Leaves: staff sees own; ADMIN/MANAGER see all
CREATE POLICY leave_select ON staff_leaves FOR SELECT TO authenticated
  USING (
    staff_id = (SELECT id FROM staff_profiles WHERE id = auth.uid() LIMIT 1)
    OR EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER')
    )
  );

CREATE POLICY leave_insert ON staff_leaves FOR INSERT TO authenticated
  WITH CHECK (
    -- Staff can only submit leave for themselves
    staff_id = (SELECT id FROM staff_profiles WHERE id = auth.uid() LIMIT 1)
    OR EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER')
    )
  );

CREATE POLICY leave_update ON staff_leaves FOR UPDATE TO authenticated
  USING (
    -- Staff can cancel own pending leave; ADMIN/MANAGER can approve/deny any
    (staff_id = (SELECT id FROM staff_profiles WHERE id = auth.uid() LIMIT 1) AND status = 'PENDING')
    OR EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER')
    )
  );

-- ── 8. HR sample data — staff_certifications ─────────────────
-- Pharmacist Council of Jamaica licence numbers (fictional).

INSERT INTO staff_certifications
  (id, staff_id, staff_name, cert_type, cert_number, issued_by, issued_date, expiry_date, alert_days, status)
VALUES
  (
    'f6000000-0000-0000-0000-000000000001',
    'c3000000-0000-0000-0000-000000000002',
    'Marcus Thompson',
    'Pharmacist Licence',
    'PCJ-2021-04421',
    'Pharmacy Council of Jamaica',
    '2021-06-01',
    CURRENT_DATE + INTERVAL '45 days',  -- expiring soon — demo alert
    60,
    'EXPIRING_SOON'
  ),
  (
    'f6000000-0000-0000-0000-000000000002',
    'c3000000-0000-0000-0000-000000000002',
    'Marcus Thompson',
    'CPD Certificate',
    NULL,
    'Pharmacy Council of Jamaica',
    CURRENT_DATE - INTERVAL '30 days',
    CURRENT_DATE + INTERVAL '335 days',
    60,
    'VALID'
  ),
  (
    'f6000000-0000-0000-0000-000000000004',
    'c3000000-0000-0000-0000-000000000004',
    'Devon Reid',
    'Pharmacy Technician Registration',
    'PTR-2022-08817',
    'Pharmacy Council of Jamaica',
    '2022-03-15',
    CURRENT_DATE + INTERVAL '290 days',
    60,
    'VALID'
  ),
  (
    'f6000000-0000-0000-0000-000000000003',
    'c3000000-0000-0000-0000-000000000001',
    'Grace Bennett',
    'Pharmacist Licence',
    'PCJ-2019-00312',
    'Pharmacy Council of Jamaica',
    '2019-09-01',
    CURRENT_DATE - INTERVAL '15 days',  -- EXPIRED — demo critical alert
    60,
    'EXPIRED'
  )
ON CONFLICT (id) DO NOTHING;

-- ── 9. HR sample data — staff_leaves ─────────────────────────

INSERT INTO staff_leaves
  (id, staff_id, staff_name, staff_role, leave_type, start_date, end_date,
   reason, status, reviewed_by, reviewed_by_name, reviewed_at)
VALUES
  (
    'f7000000-0000-0000-0000-000000000001',
    'c3000000-0000-0000-0000-000000000003',
    'Jasmine Clarke', 'CASHIER',
    'ANNUAL',
    CURRENT_DATE + INTERVAL '14 days',
    CURRENT_DATE + INTERVAL '21 days',
    'Family vacation',
    'APPROVED',
    'c3000000-0000-0000-0000-000000000005',
    'Simone Henry',
    NOW() - INTERVAL '2 days'
  ),
  (
    'f7000000-0000-0000-0000-000000000002',
    'c3000000-0000-0000-0000-000000000004',
    'Devon Reid', 'TECHNICIAN',
    'SICK',
    CURRENT_DATE - INTERVAL '3 days',
    CURRENT_DATE - INTERVAL '1 day',
    NULL,
    'APPROVED',
    'c3000000-0000-0000-0000-000000000005',
    'Simone Henry',
    NOW() - INTERVAL '3 days'
  ),
  (
    'f7000000-0000-0000-0000-000000000003',
    'c3000000-0000-0000-0000-000000000002',
    'Marcus Thompson', 'PHARMACIST',
    'STUDY',
    CURRENT_DATE + INTERVAL '30 days',
    CURRENT_DATE + INTERVAL '32 days',
    'CPD seminar — Pharmacy Council annual conference',
    'PENDING',
    NULL, NULL, NULL
  ),
  (
    'f7000000-0000-0000-0000-000000000004',
    'c3000000-0000-0000-0000-000000000003',
    'Jasmine Clarke', 'CASHIER',
    'SICK',
    CURRENT_DATE - INTERVAL '10 days',
    CURRENT_DATE - INTERVAL '10 days',
    NULL,
    'APPROVED',
    'c3000000-0000-0000-0000-000000000005',
    'Simone Henry',
    NOW() - INTERVAL '10 days'
  )
ON CONFLICT (id) DO NOTHING;
