-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 012 — JDPA Consent Timestamp (I-13)
-- ─────────────────────────────────────────────────────────────────────────────
-- Jamaica Data Protection Act 2020 requires that explicit consent be obtained
-- before collecting and processing personal health data. This column records
-- the timestamp at which the registering staff member confirmed that the
-- patient was informed and consented.
--
-- NULL = consent not yet recorded (legacy records pre-migration, or records
--        created before this column existed).
-- NOT NULL = consent confirmed at the recorded timestamp by the staff member
--            who performed registration.
--
-- ⚠️  LCA (Dorothy) legal review gate is open. This implementation captures
--     the staff-confirmed consent timestamp only. A future enhancement may
--     add patient-facing digital consent (digital signature, consent form PDF).
--
-- SCA (Omari) review required before running on production.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS jdpa_consent_at timestamptz;

-- Partial index: fast lookup of patients missing consent (JDPA audit query)
CREATE INDEX IF NOT EXISTS idx_patients_jdpa_no_consent
  ON patients (id)
  WHERE jdpa_consent_at IS NULL AND is_active = true;

COMMENT ON COLUMN patients.jdpa_consent_at IS
  'Timestamp at which JDPA 2020 consent was recorded by the registering staff member. '
  'NULL indicates consent not yet captured (legacy or incomplete registration). '
  'NOT NULL indicates staff confirmed patient was informed and consented.';
