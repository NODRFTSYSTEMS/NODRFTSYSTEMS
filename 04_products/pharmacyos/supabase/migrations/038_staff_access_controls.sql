-- Migration 038: Staff Access Controls
-- Implements pharmacy hours gating and POS clock-in requirement
-- Adds optional reason field to audit_log for admin override tracking

-- ── Add reason column to audit_log ────────────────────────────────────────────
-- Allows admin to provide context when overriding after-hours or POS restrictions
-- Optional field; only populated for SYSTEM_* action types

ALTER TABLE audit_log
ADD COLUMN reason TEXT;

-- ── Create comment documenting new audit action types ──────────────────────────
-- These action types are inserted by the application when:
-- - SYSTEM_AFTER_HOURS_ACCESS: ADMIN or MANAGER logs in when pharmacy marked closed
-- - SYSTEM_POS_OVERRIDE: ADMIN overrides clock-in requirement to use POS
--
-- Example audit_log entry:
-- {
--   "action": "SYSTEM_AFTER_HOURS_ACCESS",
--   "actor_id": "uuid",
--   "actor_name": "John Doe",
--   "reason": "Inventory count",
--   "created_at": "2026-05-18T22:30:00Z"
-- }

COMMENT ON COLUMN audit_log.reason IS 'Optional context for admin overrides: after-hours access or POS clock-in bypass. Populated for SYSTEM_* actions.';

-- ── Index for audit_log filtering by reason (for compliance reports) ──────────
CREATE INDEX IF NOT EXISTS idx_audit_log_reason ON audit_log (reason) WHERE reason IS NOT NULL;
