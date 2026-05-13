-- ============================================================
-- Migration 006 — Security Fixes
-- Identified by ARE review (2026-05-11): CRITICAL
-- Authorisation: ARE + Founder required before applying to production
-- ============================================================

-- ── Fix 1: Revoke anon EXECUTE on decrement_product_stock ────────────────────
-- The anon (unauthenticated) role must never be able to manipulate inventory.
-- Migration 004 incorrectly granted EXECUTE to both authenticated AND anon.
-- This migration revokes the anon grant and rebuilds the function with a
-- stock-floor guard to prevent negative stock quantities.

REVOKE EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer) FROM anon;

-- Rebuild with stock floor: stock never goes below 0
-- If a sale causes an apparent over-decrement, stock is floored at 0 and a
-- WARNING is raised so any monitoring layer (audit triggers, logs) can detect it.
CREATE OR REPLACE FUNCTION public.decrement_product_stock(p_product_id uuid, p_qty integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_stock integer;
BEGIN
  SELECT stock_qty INTO v_current_stock
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product % not found', p_product_id;
  END IF;

  IF v_current_stock < p_qty THEN
    RAISE WARNING 'Stock floor applied: product % has % units but % were requested. Setting stock to 0.',
      p_product_id, v_current_stock, p_qty;
  END IF;

  UPDATE public.products
  SET    stock_qty  = GREATEST(0, stock_qty - p_qty),
         updated_at = now()
  WHERE  id = p_product_id;
END;
$$;

-- Only authenticated users may call this function
GRANT EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer) TO authenticated;
-- anon is intentionally NOT granted EXECUTE
