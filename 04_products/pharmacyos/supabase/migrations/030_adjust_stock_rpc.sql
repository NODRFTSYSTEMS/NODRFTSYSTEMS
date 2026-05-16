-- ============================================================
-- Migration 030 - Manual stock adjustment RPC
-- Enables ADMIN/MANAGER/PHARMACIST to record ADJUST, RETURN,
-- and WRITE_OFF movements via a SECURITY DEFINER function.
-- SALE and RECEIVE movements use their own dedicated paths.
-- ============================================================

CREATE OR REPLACE FUNCTION public.adjust_product_stock(
  p_product_id    uuid,
  p_delta         integer,          -- positive = add stock, negative = remove stock
  p_movement_type text,             -- 'ADJUST' | 'RETURN' | 'WRITE_OFF'
  p_actor_id      uuid    DEFAULT NULL,
  p_actor_name    text    DEFAULT NULL,
  p_notes         text    DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_movement_id  uuid;
  v_qty_before   integer;
  v_qty_after    integer;
BEGIN
  -- Validate movement type — only manual movement types are allowed here.
  IF p_movement_type NOT IN ('ADJUST', 'RETURN', 'WRITE_OFF') THEN
    RAISE EXCEPTION 'Invalid movement type: %. Must be ADJUST, RETURN, or WRITE_OFF.', p_movement_type;
  END IF;

  -- Read current stock with lock to prevent concurrent drift.
  SELECT stock_qty INTO v_qty_before
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product % not found.', p_product_id;
  END IF;

  -- Apply delta; floor at 0 to prevent negative inventory.
  v_qty_after := GREATEST(0, v_qty_before + p_delta);

  -- Update product stock.
  UPDATE public.products
  SET stock_qty  = v_qty_after,
      updated_at = now()
  WHERE id = p_product_id;

  -- Record the movement in the ledger.
  INSERT INTO public.stock_movements (
    product_id, movement_type, quantity_delta, quantity_after,
    actor_id, actor_name, reference_type, notes
  )
  VALUES (
    p_product_id,
    p_movement_type::stock_movement_type,
    p_delta,
    v_qty_after,
    p_actor_id,
    p_actor_name,
    'MANUAL',
    p_notes
  )
  RETURNING id INTO v_movement_id;

  -- Write audit trail.
  INSERT INTO public.audit_log (
    actor_id, actor_name, action, table_name, record_id, details
  )
  VALUES (
    p_actor_id,
    COALESCE(p_actor_name, 'System'),
    'stock_adjust',
    'products',
    p_product_id,
    jsonb_build_object(
      'movement_type', p_movement_type,
      'delta',         p_delta,
      'qty_before',    v_qty_before,
      'qty_after',     v_qty_after,
      'movement_id',   v_movement_id,
      'notes',         p_notes
    )
  );

  RETURN v_movement_id;
END;
$$;

-- Only authenticated staff with appropriate roles should call this.
-- The SECURITY DEFINER function already validates movement_type.
-- Grant EXECUTE to authenticated role; anon is excluded.
REVOKE EXECUTE ON FUNCTION public.adjust_product_stock(uuid, integer, text, uuid, text, text)
  FROM anon;

GRANT EXECUTE ON FUNCTION public.adjust_product_stock(uuid, integer, text, uuid, text, text)
  TO authenticated;
