-- ============================================================
-- Migration 039 — Atomic POS Retail Sale RPC
-- Wraps the full POS checkout into a single database transaction:
--   1. Insert retail_transactions header
--   2. Insert retail_transaction_items (all line items)
--   3. Decrement stock + record stock_movements for catalog items
--   4. Write audit_log entry
--
-- Problem solved: The previous client-side flow inserted the transaction
-- header before decrementing stock. If stock decrement failed (network error,
-- product deleted mid-sale), the transaction was committed with inconsistent
-- stock counts. This RPC prevents that split-brain state.
--
-- Cart items are passed as JSONB. Custom items (is_custom = true) skip
-- stock decrement. Catalog items (is_custom = false) require a valid
-- product_id and decrement stock with a SALE movement record.
--
-- Returns: JSONB { "transaction_id": uuid, "ref_number": text,
--                  "stock_failures": text[] }
-- stock_failures lists product names where stock could not be decremented
-- (product missing from catalog at sale time). The sale commits even if
-- stock fails — failures are surfaced to the caller for operator resolution.
-- ============================================================

CREATE OR REPLACE FUNCTION public.process_retail_sale(
  p_ref_number              text,
  p_cashier_id              uuid,
  p_cashier_name            text,
  p_payment_method          text,          -- 'CASH' | 'CARD' | 'LYNK'
  p_subtotal                numeric(12,2),
  p_tax                     numeric(12,2),
  p_total                   numeric(12,2),
  p_cash_tendered           numeric(12,2)  DEFAULT NULL,
  p_change_given            numeric(12,2)  DEFAULT NULL,
  p_loyalty_customer_id     uuid           DEFAULT NULL,
  p_loyalty_points_earned   integer        DEFAULT 0,
  p_cart_items              jsonb          DEFAULT '[]'::jsonb
  -- cart_items element schema:
  --   { "product_id": uuid|null, "product_name": text, "barcode": text|null,
  --     "quantity": int, "unit_price": numeric, "line_total": numeric,
  --     "is_custom": bool }
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_txn_id        uuid;
  v_item          jsonb;
  v_product_id    uuid;
  v_qty           integer;
  v_qty_after     integer;
  v_stock_failures text[] := '{}';
BEGIN
  -- ── 1. Insert transaction header ─────────────────────────────────────────────
  INSERT INTO public.retail_transactions (
    ref_number,
    transaction_type,
    payment_method,
    cashier_id,
    subtotal,
    tax,
    discount,
    total,
    cash_tendered,
    change_given,
    loyalty_customer_id,
    loyalty_points_earned,
    loyalty_points_redeemed,
    voided
  )
  VALUES (
    p_ref_number,
    'RETAIL',
    p_payment_method::payment_method,
    p_cashier_id,
    p_subtotal,
    p_tax,
    0,
    p_total,
    p_cash_tendered,
    p_change_given,
    p_loyalty_customer_id,
    p_loyalty_points_earned,
    0,
    false
  )
  RETURNING id INTO v_txn_id;

  -- ── 2. Insert line items ──────────────────────────────────────────────────────
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_cart_items)
  LOOP
    INSERT INTO public.retail_transaction_items (
      transaction_id,
      product_id,
      product_name,
      barcode,
      quantity,
      unit_price,
      line_total
    )
    VALUES (
      v_txn_id,
      CASE WHEN (v_item->>'is_custom')::boolean THEN NULL
           ELSE (v_item->>'product_id')::uuid
      END,
      v_item->>'product_name',
      v_item->>'barcode',
      (v_item->>'quantity')::integer,
      (v_item->>'unit_price')::numeric,
      (v_item->>'line_total')::numeric
    );
  END LOOP;

  -- ── 3. Decrement stock for catalog items ─────────────────────────────────────
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_cart_items)
               WHERE NOT (value->>'is_custom')::boolean
  LOOP
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty        := (v_item->>'quantity')::integer;

    -- Decrement with row-level lock; floor at 0 to prevent negative inventory
    UPDATE public.products
    SET    stock_qty  = GREATEST(0, stock_qty - v_qty),
           updated_at = now()
    WHERE  id = v_product_id
    RETURNING stock_qty INTO v_qty_after;

    IF NOT FOUND THEN
      -- Product disappeared between cart load and sale commit
      v_stock_failures := array_append(v_stock_failures, v_item->>'product_name');
      CONTINUE;
    END IF;

    -- Record SALE movement in ledger
    INSERT INTO public.stock_movements (
      product_id, movement_type, quantity_delta, quantity_after,
      actor_id, actor_name, reference_id, reference_type
    )
    VALUES (
      v_product_id,
      'SALE',
      -v_qty,
      v_qty_after,
      p_cashier_id,
      p_cashier_name,
      v_txn_id,
      'RETAIL_TRANSACTION'
    );
  END LOOP;

  -- ── 4. Audit log entry ───────────────────────────────────────────────────────
  INSERT INTO public.audit_log (
    actor_id, actor_name, action, table_name, record_id, details
  )
  VALUES (
    p_cashier_id,
    COALESCE(p_cashier_name, 'Unknown'),
    'transaction_create',
    'retail_transactions',
    v_txn_id,
    jsonb_build_object(
      'ref_number',      p_ref_number,
      'total',           p_total,
      'payment_method',  p_payment_method,
      'item_count',      jsonb_array_length(p_cart_items),
      'stock_failures',  v_stock_failures
    )
  );

  -- ── Return result ─────────────────────────────────────────────────────────────
  RETURN jsonb_build_object(
    'transaction_id',  v_txn_id,
    'ref_number',      p_ref_number,
    'stock_failures',  v_stock_failures
  );

EXCEPTION
  WHEN OTHERS THEN
    -- Any unhandled error rolls back the entire transaction automatically.
    -- Re-raise with context so the caller receives a clear message.
    RAISE EXCEPTION 'process_retail_sale failed: % (ref: %)', SQLERRM, p_ref_number;
END;
$$;

-- Only authenticated staff may process sales; anon is excluded.
REVOKE EXECUTE ON FUNCTION public.process_retail_sale(
  text, uuid, text, text, numeric, numeric, numeric,
  numeric, numeric, uuid, integer, jsonb
) FROM anon;

GRANT EXECUTE ON FUNCTION public.process_retail_sale(
  text, uuid, text, text, numeric, numeric, numeric,
  numeric, numeric, uuid, integer, jsonb
) TO authenticated;
