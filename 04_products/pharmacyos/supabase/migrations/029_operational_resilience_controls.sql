-- ============================================================
-- Migration 029 - Operational resilience controls
-- Dashboard updates, AI role settings, internal error events,
-- and daily inconsistency report records.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.dashboard_updates (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text        NOT NULL,
  body            text        NOT NULL,
  category        text        NOT NULL DEFAULT 'UPDATE'
    CHECK (category IN ('NEWS', 'MESSAGE', 'UPDATE', 'ALERT')),
  audience_role   text,
  priority        integer     NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  is_active       boolean     NOT NULL DEFAULT true,
  starts_at       timestamptz NOT NULL DEFAULT now(),
  ends_at         timestamptz,
  created_by      uuid,
  created_by_name text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dashboard_updates_active
  ON public.dashboard_updates (is_active, starts_at DESC, priority);

CREATE INDEX IF NOT EXISTS idx_dashboard_updates_audience
  ON public.dashboard_updates (audience_role);

ALTER TABLE public.dashboard_updates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "dashboard_updates_select" ON public.dashboard_updates;
CREATE POLICY "dashboard_updates_select" ON public.dashboard_updates
  FOR SELECT TO authenticated
  USING (
    is_active = true
    AND starts_at <= now()
    AND (ends_at IS NULL OR ends_at > now())
    AND (audience_role IS NULL OR audience_role = get_my_role())
  );

DROP POLICY IF EXISTS "dashboard_updates_admin_select" ON public.dashboard_updates;
CREATE POLICY "dashboard_updates_admin_select" ON public.dashboard_updates
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER'));

DROP POLICY IF EXISTS "dashboard_updates_admin_insert" ON public.dashboard_updates;
CREATE POLICY "dashboard_updates_admin_insert" ON public.dashboard_updates
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN', 'MANAGER'));

DROP POLICY IF EXISTS "dashboard_updates_admin_update" ON public.dashboard_updates;
CREATE POLICY "dashboard_updates_admin_update" ON public.dashboard_updates
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER'))
  WITH CHECK (get_my_role() IN ('ADMIN', 'MANAGER'));

CREATE TABLE IF NOT EXISTS public.ai_role_settings (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  role_key            text        UNIQUE NOT NULL,
  display_name        text        NOT NULL,
  description         text,
  enabled             boolean     NOT NULL DEFAULT true,
  provider            text        NOT NULL DEFAULT 'anthropic',
  model               text        NOT NULL,
  temperature         numeric(3,2) NOT NULL DEFAULT 0.20 CHECK (temperature >= 0 AND temperature <= 1),
  max_tokens          integer     NOT NULL DEFAULT 512 CHECK (max_tokens BETWEEN 1 AND 8192),
  system_prompt       text        NOT NULL,
  escalation_role     text,
  safety_notes        text,
  last_reviewed_at    timestamptz,
  last_reviewed_by    text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_role_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_role_settings_select_governed" ON public.ai_role_settings;
CREATE POLICY "ai_role_settings_select_governed" ON public.ai_role_settings
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'AUDITOR'));

DROP POLICY IF EXISTS "ai_role_settings_admin_write" ON public.ai_role_settings;
CREATE POLICY "ai_role_settings_admin_write" ON public.ai_role_settings
  FOR ALL TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER'))
  WITH CHECK (get_my_role() IN ('ADMIN', 'MANAGER'));

INSERT INTO public.ai_role_settings (
  role_key, display_name, description, provider, model, temperature, max_tokens,
  system_prompt, escalation_role, safety_notes
) VALUES
  (
    'document_extraction',
    'Document Extraction Agent',
    'Extracts structured fields from prescription and invoice documents for pharmacist review.',
    'anthropic',
    'claude-haiku-4-5',
    0.10,
    2048,
    'Extract only what is visible. Do not infer missing fields. Route uncertain results to pharmacist review.',
    'PHARMACIST',
    'Never auto-create prescriptions without pharmacist approval.'
  ),
  (
    'report_assistant',
    'Report Assistant',
    'Answers questions about report data using only the supplied report summary.',
    'anthropic',
    'claude-haiku-4-5-20251001',
    0.20,
    512,
    'Answer strictly from the provided report data. If data is insufficient, say so clearly.',
    'MANAGER',
    'Do not recommend clinical or financial decisions without human review.'
  ),
  (
    'audit_summarizer',
    'Audit Log Summarizer',
    'Summarizes audit events and highlights access, void, and after-hours anomalies.',
    'anthropic',
    'claude-haiku-4-5-20251001',
    0.20,
    512,
    'Summarize audit events factually and highlight anomalies without inventing context.',
    'AUDITOR',
    'Audit summaries are decision support only.'
  ),
  (
    'daily_inconsistency_reviewer',
    'Daily Inconsistency Reviewer',
    'Generates close-of-business inconsistency summaries for managers and auditors.',
    'system',
    'sql-rpc',
    0.00,
    512,
    'Aggregate operational inconsistencies from verified database records only.',
    'MANAGER',
    'Requires scheduled invocation in production; manual generation is available from settings.'
  )
ON CONFLICT (role_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.system_error_events (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  severity       text        NOT NULL DEFAULT 'ERROR'
    CHECK (severity IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL')),
  source         text        NOT NULL,
  message        text        NOT NULL,
  stack          text,
  route          text,
  user_agent     text,
  actor_id       uuid,
  actor_email    text,
  metadata       jsonb       NOT NULL DEFAULT '{}'::jsonb,
  resolved_at    timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_system_error_events_created
  ON public.system_error_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_system_error_events_unresolved
  ON public.system_error_events (resolved_at, severity, created_at DESC);

ALTER TABLE public.system_error_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "system_error_events_insert" ON public.system_error_events;
CREATE POLICY "system_error_events_insert" ON public.system_error_events
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "system_error_events_select_admin" ON public.system_error_events;
CREATE POLICY "system_error_events_select_admin" ON public.system_error_events
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER', 'AUDITOR'));

DROP POLICY IF EXISTS "system_error_events_update_admin" ON public.system_error_events;
CREATE POLICY "system_error_events_update_admin" ON public.system_error_events
  FOR UPDATE TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER'))
  WITH CHECK (get_my_role() IN ('ADMIN', 'MANAGER'));

CREATE TABLE IF NOT EXISTS public.daily_inconsistency_reports (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  report_date         date        NOT NULL,
  scheduled_for       time        NOT NULL DEFAULT '18:00',
  generated_at        timestamptz NOT NULL DEFAULT now(),
  status              text        NOT NULL DEFAULT 'GENERATED'
    CHECK (status IN ('GENERATED', 'DELIVERED', 'FAILED')),
  total_findings      integer     NOT NULL DEFAULT 0,
  findings            jsonb       NOT NULL DEFAULT '{}'::jsonb,
  delivery_roles      text[]      NOT NULL DEFAULT ARRAY['MANAGER', 'ADMIN', 'AUDITOR'],
  delivery_status     text        NOT NULL DEFAULT 'NOTIFIED',
  created_at          timestamptz NOT NULL DEFAULT now(),
  UNIQUE (report_date)
);

ALTER TABLE public.daily_inconsistency_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "daily_inconsistency_reports_select" ON public.daily_inconsistency_reports;
CREATE POLICY "daily_inconsistency_reports_select" ON public.daily_inconsistency_reports
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER', 'AUDITOR'));

DROP POLICY IF EXISTS "daily_inconsistency_reports_insert" ON public.daily_inconsistency_reports;
CREATE POLICY "daily_inconsistency_reports_insert" ON public.daily_inconsistency_reports
  FOR INSERT TO authenticated
  WITH CHECK (get_my_role() IN ('ADMIN', 'MANAGER'));

CREATE OR REPLACE FUNCTION public.generate_daily_inconsistency_report(
  p_report_date date DEFAULT CURRENT_DATE
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_report_id uuid;
  v_open_eod integer;
  v_discrepant_eod integer;
  v_flagged_timecards integer;
  v_low_stock integer;
  v_pending_ai integer;
  v_access_denials integer;
  v_findings jsonb;
  v_total integer;
BEGIN
  SELECT COUNT(*) INTO v_open_eod
  FROM public.eod_closeouts
  WHERE closeout_date = p_report_date
    AND status IN ('OPEN', 'SUBMITTED', 'DISCREPANCY');

  SELECT COUNT(*) INTO v_discrepant_eod
  FROM public.eod_closeouts
  WHERE closeout_date = p_report_date
    AND (cash_variance IS NOT NULL AND cash_variance <> 0);

  SELECT COUNT(*) INTO v_flagged_timecards
  FROM public.timecards
  WHERE timezone('America/Jamaica', clocked_in_at)::date = p_report_date
    AND (status = 'FLAGGED' OR ai_flag_overtime OR ai_flag_short_shift OR ai_flag_anomaly);

  SELECT COUNT(*) INTO v_low_stock
  FROM public.products
  WHERE is_active = true
    AND stock_qty <= reorder_level;

  SELECT COUNT(*) INTO v_pending_ai
  FROM public.extraction_queue
  WHERE extraction_status IN ('PENDING', 'PROCESSING', 'REVIEW_REQUIRED');

  SELECT COUNT(*) INTO v_access_denials
  FROM public.audit_log
  WHERE action = 'access_denied'
    AND timezone('America/Jamaica', created_at)::date = p_report_date;

  v_findings := jsonb_build_object(
    'open_or_unresolved_eod_closeouts', v_open_eod,
    'cash_variance_closeouts', v_discrepant_eod,
    'flagged_timecards', v_flagged_timecards,
    'low_stock_products', v_low_stock,
    'pending_ai_review_items', v_pending_ai,
    'access_denials', v_access_denials
  );

  v_total := v_open_eod + v_discrepant_eod + v_flagged_timecards + v_low_stock + v_pending_ai + v_access_denials;

  INSERT INTO public.daily_inconsistency_reports (
    report_date, total_findings, findings, status, delivery_status
  )
  VALUES (
    p_report_date, v_total, v_findings, 'DELIVERED', 'NOTIFIED'
  )
  ON CONFLICT (report_date)
  DO UPDATE SET
    generated_at = now(),
    total_findings = EXCLUDED.total_findings,
    findings = EXCLUDED.findings,
    status = EXCLUDED.status,
    delivery_status = EXCLUDED.delivery_status
  RETURNING id INTO v_report_id;

  INSERT INTO public.notifications (role_target, type, title, body, href, expires_at)
  VALUES
    ('MANAGER', 'system', 'Daily inconsistency report ready',
      v_total || ' finding(s) recorded for ' || p_report_date::text,
      '/dashboard', now() + INTERVAL '7 days'),
    ('ADMIN', 'system', 'Daily inconsistency report ready',
      v_total || ' finding(s) recorded for ' || p_report_date::text,
      '/dashboard', now() + INTERVAL '7 days'),
    ('AUDITOR', 'system', 'Daily inconsistency report ready',
      v_total || ' finding(s) recorded for ' || p_report_date::text,
      '/dashboard', now() + INTERVAL '7 days');

  RETURN v_report_id;
END;
$$;

INSERT INTO public.pharmacy_settings (key, value)
VALUES
  ('dashboard_theme_default', 'light'),
  ('daily_inconsistency_report_enabled', 'true'),
  ('daily_inconsistency_report_time', '18:00'),
  ('daily_inconsistency_report_timezone', 'America/Jamaica')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.dashboard_updates (title, body, category, audience_role, priority, created_by_name)
VALUES
  (
    'Daily close-out review enabled',
    'Managers can review daily inconsistency summaries from the dashboard after close of business.',
    'UPDATE',
    'MANAGER',
    2,
    'System'
  ),
  (
    'AI review remains pharmacist-gated',
    'AI extraction and report assistance are decision-support tools. Pharmacist approval remains required before clinical use.',
    'MESSAGE',
    'PHARMACIST',
    1,
    'System'
  )
ON CONFLICT DO NOTHING;
