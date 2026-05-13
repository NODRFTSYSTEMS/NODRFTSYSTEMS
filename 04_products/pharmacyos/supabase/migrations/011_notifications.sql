-- ── Migration 011 — Notifications Table ────────────────────────────────────
-- I-16: In-app notification surface for low-stock alerts, pending AI extractions,
-- EOD approval requests, and Rx ready signals.
--
-- Note: get_my_role() is defined in migration 010 (production_rls.sql).
-- This migration must run AFTER 010.

-- ── Table ─────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notifications (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
  role_target   text,
  -- type values: 'low_stock' | 'ai_review_needed' | 'eod_pending' | 'rx_ready' | 'rx_received' | 'system'
  type          text        NOT NULL CHECK (type IN (
    'low_stock', 'ai_review_needed', 'eod_pending', 'rx_ready', 'rx_received', 'system'
  )),
  title         text        NOT NULL,
  body          text,
  href          text,         -- deep link to the relevant page (e.g. '/ai/queue', '/pos/closeout')
  is_read       boolean     DEFAULT false NOT NULL,
  created_at    timestamptz DEFAULT now() NOT NULL,
  expires_at    timestamptz               -- null = never expires
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS notifications_user_id_idx     ON notifications (user_id);
CREATE INDEX IF NOT EXISTS notifications_role_target_idx ON notifications (role_target);
CREATE INDEX IF NOT EXISTS notifications_is_read_idx     ON notifications (is_read, created_at DESC);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- SELECT: a user sees notifications addressed to them directly OR to their role
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR role_target = get_my_role()
  );

-- INSERT: any authenticated user can create a notification (business logic controls who does)
CREATE POLICY "notifications_insert" ON notifications
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- UPDATE: a user can only mark notifications as read if they are the target recipient
CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid()
    OR role_target = get_my_role()
  )
  WITH CHECK (true);

-- DELETE: not permitted — notifications are soft-dismissed via is_read or expiry
-- (No DELETE policy = no delete allowed for authenticated users)
