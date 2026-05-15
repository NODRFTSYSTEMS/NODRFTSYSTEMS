-- ── Migration 019 — Timecard System ──────────────────────────────────────────
-- Creates timecards table and analyze_timecard() PostgreSQL function.
-- analyze_timecard() runs on every clock-out and evaluates three configurable
-- heuristic rules stored in pharmacy_settings:
--   • Overtime:  total_minutes > timecard_overtime_minutes  (default 480 = 8h)
--   • Short shift: total_minutes < timecard_min_shift_minutes (default 120 = 2h)
--   • Attendance gap: gap from last clock-out > timecard_anomaly_gap_days (default 2d)
-- No external API — all logic is pure PostgreSQL arithmetic.
-- Runs AFTER migration 018.

-- ── Enum ─────────────────────────────────────────────────────────────────────

CREATE TYPE timecard_status AS ENUM (
  'CLOCKED_IN', 'CLOCKED_OUT', 'FLAGGED', 'APPROVED'
);

-- ── Table ─────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS timecards (
  id                  uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id            uuid            REFERENCES public.staff_profiles(id) ON DELETE SET NULL,
  staff_name          text            NOT NULL,
  staff_role          staff_role      NOT NULL,
  clocked_in_at       timestamptz     NOT NULL DEFAULT now(),
  clocked_out_at      timestamptz,
  total_minutes       integer,
  status              timecard_status NOT NULL DEFAULT 'CLOCKED_IN',
  ai_flag_overtime    boolean         NOT NULL DEFAULT false,
  ai_flag_short_shift boolean         NOT NULL DEFAULT false,
  ai_flag_anomaly     boolean         NOT NULL DEFAULT false,
  ai_flag_reason      text,
  approved_by         uuid,
  approved_by_name    text,
  approved_at         timestamptz,
  notes               text,
  created_at          timestamptz     NOT NULL DEFAULT now(),
  updated_at          timestamptz     NOT NULL DEFAULT now()
);

CREATE TRIGGER timecards_updated_at
  BEFORE UPDATE ON timecards
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE INDEX IF NOT EXISTS idx_timecards_staff      ON timecards (staff_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_timecards_status     ON timecards (status);
CREATE INDEX IF NOT EXISTS idx_timecards_clocked_in ON timecards (clocked_in_at DESC);

ALTER TABLE timecards ENABLE ROW LEVEL SECURITY;

-- Staff sees own timecards; ADMIN and MANAGER see all
CREATE POLICY "timecards_select" ON timecards
  FOR SELECT TO authenticated
  USING (
    staff_id = auth.uid()
    OR get_my_role() IN ('ADMIN', 'MANAGER')
  );

-- Any authenticated user can clock themselves in (staff_id must match caller)
CREATE POLICY "timecards_insert" ON timecards
  FOR INSERT TO authenticated
  WITH CHECK (staff_id = auth.uid());

-- Staff can update own active clock-in; ADMIN/MANAGER can update any
CREATE POLICY "timecards_update" ON timecards
  FOR UPDATE TO authenticated
  USING (
    staff_id = auth.uid()
    OR get_my_role() IN ('ADMIN', 'MANAGER')
  )
  WITH CHECK (true);

-- ── Threshold settings ────────────────────────────────────────────────────────

INSERT INTO public.pharmacy_settings (key, value)
VALUES
  ('timecard_overtime_minutes',  '480'),
  ('timecard_min_shift_minutes', '120'),
  ('timecard_anomaly_gap_days',  '2')
ON CONFLICT (key) DO NOTHING;

-- ── analyze_timecard ──────────────────────────────────────────────────────────
-- Called from the clock-out RPC (frontend sets clocked_out_at + total_minutes,
-- then calls analyze_timecard with the timecard id).
-- Sets ai_flag_* booleans, ai_flag_reason (plain English), and status.

CREATE OR REPLACE FUNCTION public.analyze_timecard(p_timecard_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_tc               record;
  v_overtime_min     integer;
  v_min_shift_min    integer;
  v_anomaly_days     integer;
  v_last_clocked_out timestamptz;
  v_gap_hours        numeric;
  v_flag_overtime    boolean   := false;
  v_flag_short       boolean   := false;
  v_flag_anomaly     boolean   := false;
  v_reasons          text[]    := '{}';
  v_status           timecard_status;
BEGIN
  SELECT * INTO v_tc FROM public.timecards WHERE id = p_timecard_id;
  IF NOT FOUND OR v_tc.total_minutes IS NULL THEN RETURN; END IF;

  -- Load thresholds with defaults if settings are missing
  SELECT COALESCE(
    (SELECT value::integer FROM public.pharmacy_settings WHERE key = 'timecard_overtime_minutes'),
    480
  ) INTO v_overtime_min;

  SELECT COALESCE(
    (SELECT value::integer FROM public.pharmacy_settings WHERE key = 'timecard_min_shift_minutes'),
    120
  ) INTO v_min_shift_min;

  SELECT COALESCE(
    (SELECT value::integer FROM public.pharmacy_settings WHERE key = 'timecard_anomaly_gap_days'),
    2
  ) INTO v_anomaly_days;

  -- Rule 1: Overtime
  IF v_tc.total_minutes > v_overtime_min THEN
    v_flag_overtime := true;
    v_reasons := v_reasons || format(
      'Overtime: %s min worked (threshold %s min)', v_tc.total_minutes, v_overtime_min
    );
  END IF;

  -- Rule 2: Short shift
  IF v_tc.total_minutes < v_min_shift_min THEN
    v_flag_short := true;
    v_reasons := v_reasons || format(
      'Short shift: %s min worked (minimum %s min)', v_tc.total_minutes, v_min_shift_min
    );
  END IF;

  -- Rule 3: Attendance gap from last clock-out of same staff member
  SELECT clocked_out_at INTO v_last_clocked_out
  FROM   public.timecards
  WHERE  staff_id = v_tc.staff_id
    AND  id <> p_timecard_id
    AND  clocked_out_at IS NOT NULL
  ORDER  BY clocked_out_at DESC
  LIMIT  1;

  IF v_last_clocked_out IS NOT NULL THEN
    v_gap_hours := EXTRACT(EPOCH FROM (v_tc.clocked_in_at - v_last_clocked_out)) / 3600.0;
    IF v_gap_hours > (v_anomaly_days * 24.0) THEN
      v_flag_anomaly := true;
      v_reasons := v_reasons || format(
        'Attendance gap: %.1f hours since last shift (threshold %s days)',
        v_gap_hours, v_anomaly_days
      );
    END IF;
  END IF;

  v_status := CASE
    WHEN v_flag_overtime OR v_flag_short OR v_flag_anomaly THEN 'FLAGGED'::timecard_status
    ELSE 'CLOCKED_OUT'::timecard_status
  END;

  UPDATE public.timecards SET
    ai_flag_overtime    = v_flag_overtime,
    ai_flag_short_shift = v_flag_short,
    ai_flag_anomaly     = v_flag_anomaly,
    ai_flag_reason      = CASE
      WHEN cardinality(v_reasons) > 0 THEN array_to_string(v_reasons, '; ')
      ELSE NULL
    END,
    status              = v_status
  WHERE id = p_timecard_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.analyze_timecard TO authenticated;
