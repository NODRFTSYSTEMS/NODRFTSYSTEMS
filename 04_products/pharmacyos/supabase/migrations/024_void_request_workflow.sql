-- ── Migration 024 — Void Request Workflow ────────────────────────────────────
-- Adds cashier-initiated void requests with manager approval/denial.
-- Schema: 8 new columns on retail_transactions.
-- RPCs: request_void_transaction, approve_void_transaction, deny_void_transaction.
-- Notifications: extends type CHECK to include void_request and void_decision.
-- Runs AFTER migration 023.

-- ── Extend notifications type CHECK ──────────────────────────────────────────
-- Follow the same drop/re-add pattern established in migration 020.

ALTER TABLE public.notifications
  DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE public.notifications
  ADD CONSTRAINT notifications_type_check
  CHECK (type IN (
    'low_stock', 'ai_review_needed', 'eod_pending',
    'rx_ready', 'rx_received', 'system', 'expiry_alert',
    'void_request', 'void_decision'
  ));

-- ── New columns on retail_transactions ───────────────────────────────────────
-- void_requested_* : set by request_void_transaction (any authenticated user)
-- void_denied_*    : set by deny_void_transaction (MANAGER / ADMIN only)
-- voided_by + voided_at (existing) serve as the approval record.

ALTER TABLE public.retail_transactions
  ADD COLUMN IF NOT EXISTS void_reason             text,
  ADD COLUMN IF NOT EXISTS void_requested_by       uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS void_requested_by_name  text,
  ADD COLUMN IF NOT EXISTS void_requested_at       timestamptz,
  ADD COLUMN IF NOT EXISTS void_denied_by          uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS void_denied_by_name     text,
  ADD COLUMN IF NOT EXISTS void_denied_at          timestamptz,
  ADD COLUMN IF NOT EXISTS void_denied_note        text;

CREATE INDEX IF NOT EXISTS idx_retail_txn_void_pending
  ON public.retail_transactions (void_requested_at)
  WHERE void_requested_at IS NOT NULL AND voided = false;

-- ── RPC 1: request_void_transaction ──────────────────────────────────────────
-- Any authenticated user may call (cashier uses this).
-- SECURITY DEFINER bypasses the ADMIN/MANAGER-only UPDATE RLS on retail_transactions.
-- Sets void_requested_* fields and notifies MANAGER + ADMIN roles.
-- Re-request is allowed after a denial (clears prior denial, creates fresh request).

CREATE OR REPLACE FUNCTION public.request_void_transaction(
  p_tx_id  uuid,
  p_reason text,
  p_note   text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_id   uuid;
  v_actor_name text;
  v_tx         public.retail_transactions%ROWTYPE;
  v_reason_lbl text;
BEGIN
  v_actor_id := auth.uid();
  IF v_actor_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated' USING ERRCODE = 'insufficient_privilege';
  END IF;

  SELECT full_name INTO v_actor_name
  FROM public.staff_profiles WHERE id = v_actor_id;
  v_actor_name := COALESCE(v_actor_name, 'Unknown User');

  SELECT * INTO v_tx FROM public.retail_transactions WHERE id = p_tx_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Transaction not found';
  END IF;
  IF v_tx.voided THEN
    RAISE EXCEPTION 'Transaction is already voided';
  END IF;
  -- Block duplicate pending request; allow re-request after denial
  IF v_tx.void_requested_at IS NOT NULL AND v_tx.void_denied_at IS NULL THEN
    RAISE EXCEPTION 'A void request for this transaction is already pending manager approval';
  END IF;

  IF p_reason NOT IN (
    'WRONG_ITEM','WRONG_QUANTITY','WRONG_PRICE',
    'PAYMENT_ERROR','CUSTOMER_RETURN','DUPLICATE','OTHER'
  ) THEN
    RAISE EXCEPTION 'Invalid void reason: %', p_reason;
  END IF;
  IF p_reason = 'OTHER' AND (p_note IS NULL OR trim(p_note) = '') THEN
    RAISE EXCEPTION 'A description is required when reason is OTHER';
  END IF;

  v_reason_lbl := CASE p_reason
    WHEN 'WRONG_ITEM'      THEN 'Wrong item scanned'
    WHEN 'WRONG_QUANTITY'  THEN 'Wrong quantity entered'
    WHEN 'WRONG_PRICE'     THEN 'Price override error'
    WHEN 'PAYMENT_ERROR'   THEN 'Wrong payment method'
    WHEN 'CUSTOMER_RETURN' THEN 'Customer return'
    WHEN 'DUPLICATE'       THEN 'Duplicate transaction'
    ELSE COALESCE(p_note, 'Other')
  END;

  UPDATE public.retail_transactions
  SET
    void_reason            = p_reason,
    void_requested_by      = v_actor_id,
    void_requested_by_name = v_actor_name,
    void_requested_at      = now(),
    void_denied_by         = NULL,
    void_denied_by_name    = NULL,
    void_denied_at         = NULL,
    void_denied_note       = NULL
  WHERE id = p_tx_id;

  INSERT INTO public.notifications (role_target, type, title, body, href)
  VALUES
    ('MANAGER', 'void_request',
     'Void request: ' || v_tx.ref_number,
     v_actor_name || ' — ' || v_reason_lbl,
     '/pos/transactions'),
    ('ADMIN', 'void_request',
     'Void request: ' || v_tx.ref_number,
     v_actor_name || ' — ' || v_reason_lbl,
     '/pos/transactions');

  INSERT INTO public.audit_log (actor_id, actor_name, action, table_name, record_id, details)
  VALUES (
    v_actor_id::text, v_actor_name, 'void_request',
    'retail_transactions', p_tx_id::text,
    jsonb_build_object(
      'transaction_ref', v_tx.ref_number,
      'total', v_tx.total,
      'void_reason', p_reason,
      'note', p_note
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.request_void_transaction(uuid, text, text) TO authenticated;

-- ── RPC 2: approve_void_transaction ──────────────────────────────────────────
-- MANAGER / ADMIN only.
-- Restores stock via stock_movements RETURN entries, marks transaction voided,
-- notifies the requesting cashier.

CREATE OR REPLACE FUNCTION public.approve_void_transaction(p_tx_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_role        text;
  v_actor_id    uuid;
  v_actor_name  text;
  v_tx          public.retail_transactions%ROWTYPE;
  v_movement    RECORD;
  v_qty_after   integer;
  v_stock_lines integer := 0;
BEGIN
  v_role := get_my_role();
  IF v_role NOT IN ('ADMIN', 'MANAGER') THEN
    RAISE EXCEPTION 'permission denied: pos_void required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  v_actor_id := auth.uid();
  SELECT full_name INTO v_actor_name
  FROM public.staff_profiles WHERE id = v_actor_id;
  v_actor_name := COALESCE(v_actor_name, 'Unknown User');

  SELECT * INTO v_tx FROM public.retail_transactions WHERE id = p_tx_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Transaction not found';
  END IF;
  IF v_tx.voided THEN
    RAISE EXCEPTION 'Transaction is already voided';
  END IF;
  IF v_tx.void_requested_at IS NULL THEN
    RAISE EXCEPTION 'No pending void request for this transaction';
  END IF;

  -- Restore stock for every SALE movement linked to this transaction
  FOR v_movement IN
    SELECT sm.product_id, sm.quantity_delta
    FROM public.stock_movements sm
    WHERE sm.reference_id = p_tx_id
      AND sm.movement_type = 'SALE'
  LOOP
    UPDATE public.products
    SET stock_qty  = stock_qty + ABS(v_movement.quantity_delta),
        updated_at = now()
    WHERE id = v_movement.product_id
    RETURNING stock_qty INTO v_qty_after;

    INSERT INTO public.stock_movements (
      product_id, movement_type, quantity_delta, quantity_after,
      actor_id, actor_name, reference_id, reference_type, notes
    ) VALUES (
      v_movement.product_id, 'RETURN', ABS(v_movement.quantity_delta), v_qty_after,
      v_actor_id, v_actor_name, p_tx_id, 'VOID',
      'Stock restored — void of ' || v_tx.ref_number
    );

    v_stock_lines := v_stock_lines + 1;
  END LOOP;

  UPDATE public.retail_transactions
  SET voided    = true,
      voided_by = v_actor_id,
      voided_at = now()
  WHERE id = p_tx_id;

  -- Notify the cashier who requested the void
  IF v_tx.void_requested_by IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, body, href)
    VALUES (
      v_tx.void_requested_by,
      'void_decision',
      'Void approved: ' || v_tx.ref_number,
      'Approved by ' || v_actor_name || '. ' ||
        CASE WHEN v_stock_lines > 0
          THEN 'Stock has been restored.'
          ELSE 'No stock movements found to reverse.'
        END,
      '/pos/transactions'
    );
  END IF;

  INSERT INTO public.audit_log (actor_id, actor_name, action, table_name, record_id, details)
  VALUES (
    v_actor_id::text, v_actor_name, 'void_approved',
    'retail_transactions', p_tx_id::text,
    jsonb_build_object(
      'transaction_ref',      v_tx.ref_number,
      'total',                v_tx.total,
      'void_reason',          v_tx.void_reason,
      'requested_by_id',      v_tx.void_requested_by,
      'requested_by_name',    v_tx.void_requested_by_name,
      'requested_at',         v_tx.void_requested_at,
      'approved_by_name',     v_actor_name,
      'stock_lines_restored', v_stock_lines
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.approve_void_transaction(uuid) TO authenticated;

-- ── RPC 3: deny_void_transaction ─────────────────────────────────────────────
-- MANAGER / ADMIN only.
-- Records denial with optional note; preserves void_requested_* for audit trail.
-- Transaction is NOT voided. Cashier is notified and may re-request if needed.

CREATE OR REPLACE FUNCTION public.deny_void_transaction(
  p_tx_id uuid,
  p_note  text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_role       text;
  v_actor_id   uuid;
  v_actor_name text;
  v_tx         public.retail_transactions%ROWTYPE;
BEGIN
  v_role := get_my_role();
  IF v_role NOT IN ('ADMIN', 'MANAGER') THEN
    RAISE EXCEPTION 'permission denied: pos_void required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  v_actor_id := auth.uid();
  SELECT full_name INTO v_actor_name
  FROM public.staff_profiles WHERE id = v_actor_id;
  v_actor_name := COALESCE(v_actor_name, 'Unknown User');

  SELECT * INTO v_tx FROM public.retail_transactions WHERE id = p_tx_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Transaction not found';
  END IF;
  IF v_tx.voided THEN
    RAISE EXCEPTION 'Transaction is already voided';
  END IF;
  IF v_tx.void_requested_at IS NULL THEN
    RAISE EXCEPTION 'No pending void request for this transaction';
  END IF;

  UPDATE public.retail_transactions
  SET void_denied_by       = v_actor_id,
      void_denied_by_name  = v_actor_name,
      void_denied_at       = now(),
      void_denied_note     = p_note
  WHERE id = p_tx_id;

  IF v_tx.void_requested_by IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, body, href)
    VALUES (
      v_tx.void_requested_by,
      'void_decision',
      'Void denied: ' || v_tx.ref_number,
      'Denied by ' || v_actor_name ||
        CASE
          WHEN p_note IS NOT NULL AND trim(p_note) <> ''
          THEN '. Reason: ' || trim(p_note)
          ELSE '.'
        END,
      '/pos/transactions'
    );
  END IF;

  INSERT INTO public.audit_log (actor_id, actor_name, action, table_name, record_id, details)
  VALUES (
    v_actor_id::text, v_actor_name, 'void_denied',
    'retail_transactions', p_tx_id::text,
    jsonb_build_object(
      'transaction_ref',    v_tx.ref_number,
      'void_reason',        v_tx.void_reason,
      'requested_by_name',  v_tx.void_requested_by_name,
      'denied_by_name',     v_actor_name,
      'denial_note',        p_note
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.deny_void_transaction(uuid, text) TO authenticated;
