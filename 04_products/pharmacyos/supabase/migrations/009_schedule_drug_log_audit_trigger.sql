-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 009: Audit trigger for schedule_drug_log
-- Rationale: The controlled drug register must have an immutable audit trail
-- for every INSERT, UPDATE, and DELETE per Jamaica Dangerous Drugs Act.
-- Editing or deleting a controlled substance entry without an audit record
-- is a regulatory and criminal liability.
-- ─────────────────────────────────────────────────────────────────────────────

-- Function: Writes an audit_log entry before any DML on schedule_drug_log.
-- Uses BEFORE trigger so we can capture the full OLD and NEW row values.
CREATE OR REPLACE FUNCTION log_schedule_drug_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_action  TEXT;
  v_details JSONB;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_action  := 'schedule_drug_entry';
    v_details := jsonb_build_object(
      'op',    'INSERT',
      'after', to_jsonb(NEW)
    );

  ELSIF TG_OP = 'UPDATE' THEN
    v_action  := 'schedule_drug_update';
    v_details := jsonb_build_object(
      'op',     'UPDATE',
      'before', to_jsonb(OLD),
      'after',  to_jsonb(NEW)
    );

  ELSIF TG_OP = 'DELETE' THEN
    v_action  := 'schedule_drug_delete';
    v_details := jsonb_build_object(
      'op',     'DELETE',
      'before', to_jsonb(OLD)
    );
  END IF;

  INSERT INTO public.audit_log (
    actor_id,
    actor_name,
    action,
    table_name,
    record_id,
    details
  ) VALUES (
    auth.uid(),
    COALESCE(
      (SELECT full_name FROM public.staff_profiles WHERE id = auth.uid()),
      'system'
    ),
    v_action,
    'schedule_drug_log',
    CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END,
    v_details
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

-- Drop and recreate the trigger (idempotent)
DROP TRIGGER IF EXISTS trg_schedule_drug_audit ON public.schedule_drug_log;

CREATE TRIGGER trg_schedule_drug_audit
  AFTER INSERT OR UPDATE OR DELETE
  ON public.schedule_drug_log
  FOR EACH ROW
  EXECUTE FUNCTION log_schedule_drug_change();

-- Comment for documentation
COMMENT ON TRIGGER trg_schedule_drug_audit ON public.schedule_drug_log IS
  'Writes an audit_log entry for every INSERT, UPDATE, and DELETE on the '
  'controlled drug register. Required for Jamaica Dangerous Drugs Act compliance.';
