-- ── Migration 018 — Purchase Orders ──────────────────────────────────────────
-- Creates purchase_orders and purchase_order_items tables.
-- Adds receive_stock_items() RPC: atomically marks PO received, increments
-- product stock_qty, updates expiry/batch on product, and writes RECEIVE rows
-- to stock_movements.
-- Also wires the extraction_queue.linked_purchase_id FK that was previously orphaned.
-- Runs AFTER migration 017.

-- ── Enum ─────────────────────────────────────────────────────────────────────

CREATE TYPE po_status AS ENUM ('DRAFT', 'SUBMITTED', 'RECEIVED', 'CANCELLED');

-- ── purchase_orders ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS purchase_orders (
  id               uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number       text          UNIQUE NOT NULL DEFAULT generate_ref_number('PO'),
  supplier_id      uuid          REFERENCES public.retail_suppliers(id) ON DELETE SET NULL,
  supplier_name    text          NOT NULL,
  status           po_status     NOT NULL DEFAULT 'DRAFT',
  total_cost       numeric(12,2) NOT NULL DEFAULT 0,
  notes            text,
  created_by       uuid,
  created_by_name  text,
  received_by      uuid,
  received_by_name text,
  received_at      timestamptz,
  created_at       timestamptz   NOT NULL DEFAULT now(),
  updated_at       timestamptz   NOT NULL DEFAULT now()
);

CREATE TRIGGER purchase_orders_updated_at
  BEFORE UPDATE ON purchase_orders
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE INDEX IF NOT EXISTS idx_purchase_orders_status   ON purchase_orders (status);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier ON purchase_orders (supplier_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_created  ON purchase_orders (created_at DESC);

ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dev_purchase_orders_all" ON purchase_orders
  FOR ALL USING (true) WITH CHECK (true);

-- ── purchase_order_items ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS purchase_order_items (
  id                uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid          NOT NULL REFERENCES public.purchase_orders(id) ON DELETE CASCADE,
  product_id        uuid          REFERENCES public.products(id) ON DELETE SET NULL,
  product_name      text          NOT NULL,
  quantity_ordered  integer       NOT NULL CHECK (quantity_ordered > 0),
  quantity_received integer       NOT NULL DEFAULT 0,
  unit_cost         numeric(12,2) NOT NULL DEFAULT 0,
  line_total        numeric(12,2) NOT NULL DEFAULT 0,
  expiry_date       date,
  batch_number      text,
  created_at        timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_po_items_po      ON purchase_order_items (purchase_order_id);
CREATE INDEX IF NOT EXISTS idx_po_items_product ON purchase_order_items (product_id);

ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dev_po_items_all" ON purchase_order_items
  FOR ALL USING (true) WITH CHECK (true);

-- ── Wire orphaned FK on extraction_queue ─────────────────────────────────────
-- linked_purchase_id was a plain UUID in migration 001 with no FK constraint.
-- Now that purchase_orders exists, add the constraint.

ALTER TABLE public.extraction_queue
  ADD CONSTRAINT fk_extraction_purchase
  FOREIGN KEY (linked_purchase_id)
  REFERENCES public.purchase_orders(id)
  ON DELETE SET NULL;

-- ── receive_stock_items ───────────────────────────────────────────────────────
-- Atomically: marks each line item received, increments product.stock_qty,
-- updates product.expiry_date / batch_number if provided on the line item,
-- writes a RECEIVE row to stock_movements, then marks the PO RECEIVED.
-- Called from ReceiveStock.tsx on form submission.

CREATE OR REPLACE FUNCTION public.receive_stock_items(
  p_po_id      uuid,
  p_actor_id   uuid,
  p_actor_name text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_item      record;
  v_qty_after integer;
BEGIN
  FOR v_item IN
    SELECT id, product_id, quantity_ordered, expiry_date, batch_number
    FROM   public.purchase_order_items
    WHERE  purchase_order_id = p_po_id
      AND  product_id IS NOT NULL
  LOOP
    UPDATE public.products
    SET    stock_qty    = stock_qty + v_item.quantity_ordered,
           expiry_date  = COALESCE(v_item.expiry_date,  expiry_date),
           batch_number = COALESCE(v_item.batch_number, batch_number),
           updated_at   = now()
    WHERE  id = v_item.product_id
    RETURNING stock_qty INTO v_qty_after;

    INSERT INTO public.stock_movements (
      product_id, movement_type, quantity_delta, quantity_after,
      actor_id, actor_name, reference_id, reference_type
    ) VALUES (
      v_item.product_id, 'RECEIVE', v_item.quantity_ordered, v_qty_after,
      p_actor_id, p_actor_name, p_po_id, 'PURCHASE_ORDER'
    );

    UPDATE public.purchase_order_items
    SET    quantity_received = quantity_ordered
    WHERE  id = v_item.id;
  END LOOP;

  UPDATE public.purchase_orders
  SET    status           = 'RECEIVED',
         received_by      = p_actor_id,
         received_by_name = p_actor_name,
         received_at      = now()
  WHERE  id = p_po_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.receive_stock_items TO authenticated;
