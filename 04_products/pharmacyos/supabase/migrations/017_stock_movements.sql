-- ── Migration 017 — Stock Movements Ledger ───────────────────────────────────
-- Creates stock_movements table and updates decrement_product_stock() to write
-- an audit row on every sale. Existing POS call signature (2 params) unchanged —
-- new params (actor_id, actor_name, reference_id, reference_type) are optional.
-- Runs AFTER migration 016.

-- ── Enum ─────────────────────────────────────────────────────────────────────

CREATE TYPE stock_movement_type AS ENUM (
  'SALE', 'RECEIVE', 'ADJUST', 'RETURN', 'WRITE_OFF'
);

-- ── Table ─────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS stock_movements (
  id              uuid                 PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      uuid                 NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type   stock_movement_type  NOT NULL,
  quantity_delta  integer              NOT NULL,  -- negative for outflows (SALE, WRITE_OFF, ADJUST-)
  quantity_after  integer              NOT NULL,
  actor_id        uuid,                           -- staff_profiles.id, nullable for legacy rows
  actor_name      text,
  reference_id    uuid,                           -- retail_transaction.id, purchase_orders.id, etc.
  reference_type  text,                           -- 'RETAIL_TRANSACTION' | 'PURCHASE_ORDER' | 'MANUAL'
  notes           text,
  created_at      timestamptz          NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stock_movements_product ON stock_movements (product_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stock_movements_type    ON stock_movements (movement_type);
CREATE INDEX IF NOT EXISTS idx_stock_movements_created ON stock_movements (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stock_movements_actor   ON stock_movements (actor_id);

ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- ADMIN and MANAGER see all movements; others see none
CREATE POLICY "stock_movements_select" ON stock_movements
  FOR SELECT TO authenticated
  USING (get_my_role() IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN'));

CREATE POLICY "stock_movements_insert" ON stock_movements
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- ── Updated decrement_product_stock ──────────────────────────────────────────
-- Backward-compatible: existing 2-param RPC calls from PosTerminal continue to
-- work. New params default to NULL. Attribution data is stored when provided.

CREATE OR REPLACE FUNCTION public.decrement_product_stock(
  p_product_id    uuid,
  p_qty           integer,
  p_actor_id      uuid    DEFAULT NULL,
  p_actor_name    text    DEFAULT NULL,
  p_reference_id  uuid    DEFAULT NULL,
  p_reference_type text   DEFAULT 'RETAIL_TRANSACTION'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_qty_after integer;
BEGIN
  UPDATE public.products
  SET    stock_qty  = stock_qty - p_qty,
         updated_at = now()
  WHERE  id = p_product_id
  RETURNING stock_qty INTO v_qty_after;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product % not found', p_product_id;
  END IF;

  INSERT INTO public.stock_movements (
    product_id, movement_type, quantity_delta, quantity_after,
    actor_id, actor_name, reference_id, reference_type
  ) VALUES (
    p_product_id, 'SALE', -p_qty, v_qty_after,
    p_actor_id, p_actor_name, p_reference_id, p_reference_type
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.decrement_product_stock TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_product_stock TO anon;
