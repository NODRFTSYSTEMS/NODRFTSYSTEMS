-- ============================================================
-- Migration 008 — Schedule Drug Log
-- Controlled document under Dangerous Drugs Act (Jamaica)
-- SCA + LCA review required before production deployment
-- ============================================================

CREATE TABLE IF NOT EXISTS schedule_drug_log (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_date       date        NOT NULL DEFAULT CURRENT_DATE,
  drug_name        text        NOT NULL,
  strength         text,
  quantity_in      integer     NOT NULL DEFAULT 0,
  quantity_out     integer     NOT NULL DEFAULT 0,
  balance          integer     NOT NULL DEFAULT 0,
  patient_name     text,
  prescriber_name  text,
  prescriber_reg   text,
  rx_ref           text,
  pharmacist_id    text,
  pharmacist_name  text,
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sdl_entry_date ON schedule_drug_log (entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_sdl_drug       ON schedule_drug_log (drug_name);

ALTER TABLE schedule_drug_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dev_sdl_all" ON schedule_drug_log FOR ALL USING (true) WITH CHECK (true);
