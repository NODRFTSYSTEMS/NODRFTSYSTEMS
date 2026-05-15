-- ── Migration 021 — Timecard Permission Seed ─────────────────────────────────
-- If pharmacy_settings already has a role_permissions JSON entry (customized by
-- admin), adds timecard_manage to ADMIN and MANAGER arrays.
-- If no entry exists, the DEFAULT_PERMS fallback in usePermission.ts handles it
-- (timecard_manage will be added to DEFAULT_PERMS in the same sprint).
-- Runs AFTER migration 019.

DO $$
DECLARE
  v_perms     jsonb;
  v_admin_arr jsonb;
  v_mgr_arr   jsonb;
BEGIN
  SELECT value::jsonb INTO v_perms
  FROM   public.pharmacy_settings
  WHERE  key = 'role_permissions';

  IF NOT FOUND OR v_perms IS NULL THEN
    RETURN;  -- DEFAULT_PERMS in usePermission.ts is the source of truth
  END IF;

  -- Add timecard_manage to ADMIN array if not already present
  v_admin_arr := COALESCE(v_perms->'ADMIN', '[]'::jsonb);
  IF NOT (v_admin_arr @> '["timecard_manage"]'::jsonb) THEN
    v_perms := jsonb_set(v_perms, '{ADMIN}', v_admin_arr || '["timecard_manage"]'::jsonb);
  END IF;

  -- Add timecard_manage to MANAGER array if not already present
  v_mgr_arr := COALESCE(v_perms->'MANAGER', '[]'::jsonb);
  IF NOT (v_mgr_arr @> '["timecard_manage"]'::jsonb) THEN
    v_perms := jsonb_set(v_perms, '{MANAGER}', v_mgr_arr || '["timecard_manage"]'::jsonb);
  END IF;

  UPDATE public.pharmacy_settings
  SET    value      = v_perms::text,
         updated_at = now()
  WHERE  key = 'role_permissions';
END;
$$;
