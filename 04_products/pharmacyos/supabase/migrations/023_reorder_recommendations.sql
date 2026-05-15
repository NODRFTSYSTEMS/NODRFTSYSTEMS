-- ── Migration 023 — Reorder Recommendations Function ─────────────────────────
-- Creates get_reorder_recommendations() — a SECURITY DEFINER RPC that returns
-- products requiring reorder, ranked by urgency.
--
-- Logic:
--   1. Role gate at entry: only ADMIN, MANAGER, PHARMACIST, TECHNICIAN may call.
--      CASHIER and AUDITOR are denied with an exception before any data is read.
--   2. Compute avg daily units sold per product over the last 30 days from
--      stock_movements (movement_type = 'SALE', quantity_delta is negative).
--   3. Compute days_to_stockout = stock_qty / avg_daily_sales (NULL if no sales).
--   4. Return products where:
--        a) stock_qty <= reorder_level  (below or at reorder threshold), OR
--        b) avg_daily_sales > 0 AND days_to_stockout <= 14 (2 weeks runway)
--   5. Sort: out-of-stock first, then days_to_stockout ascending, then name.
--
-- Callers: Dashboard.tsx (widget), InventoryReport.tsx (Reorder tab).
-- Permission guard mirrors inventory_manage roles in usePermission.ts.
-- Runs AFTER migrations 017 (stock_movements) and 022 (get_my_role is_active fix).

CREATE OR REPLACE FUNCTION public.get_reorder_recommendations()
RETURNS TABLE (
  product_id        uuid,
  product_name      text,
  category          text,
  stock_qty         integer,
  reorder_level     integer,
  avg_daily_sales   numeric,   -- units/day over last 30 days; 0 if no sales
  days_to_stockout  numeric,   -- NULL if avg_daily_sales = 0
  urgency           text       -- 'OUT_OF_STOCK' | 'CRITICAL' | 'LOW'
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  v_role text;
BEGIN
  -- Role gate: mirror inventory_manage permission (ADMIN, MANAGER, PHARMACIST, TECHNICIAN)
  v_role := get_my_role();
  IF v_role IS NULL OR v_role NOT IN ('ADMIN', 'MANAGER', 'PHARMACIST', 'TECHNICIAN') THEN
    RAISE EXCEPTION 'permission denied: inventory_manage required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  RETURN QUERY
  WITH sales_30d AS (
    SELECT
      sm.product_id,
      -- quantity_delta is negative for sales; take absolute value
      SUM(ABS(sm.quantity_delta))::numeric AS total_sold_30d
    FROM stock_movements sm
    WHERE sm.movement_type = 'SALE'
      AND sm.created_at >= now() - INTERVAL '30 days'
    GROUP BY sm.product_id
  )
  SELECT
    p.id                                        AS product_id,
    p.name                                      AS product_name,
    p.category                                  AS category,
    p.stock_qty                                 AS stock_qty,
    p.reorder_level                             AS reorder_level,
    COALESCE(s.total_sold_30d / 30.0, 0)       AS avg_daily_sales,
    CASE
      WHEN COALESCE(s.total_sold_30d, 0) = 0 THEN NULL
      ELSE ROUND(p.stock_qty::numeric / (s.total_sold_30d / 30.0), 1)
    END                                         AS days_to_stockout,
    CASE
      WHEN p.stock_qty = 0                                           THEN 'OUT_OF_STOCK'
      WHEN COALESCE(s.total_sold_30d, 0) > 0
       AND ROUND(p.stock_qty::numeric / (s.total_sold_30d / 30.0), 1) <= 3  THEN 'CRITICAL'
      ELSE 'LOW'
    END                                         AS urgency
  FROM products p
  LEFT JOIN sales_30d s ON s.product_id = p.id
  WHERE p.is_active = true
    AND (
      p.stock_qty <= p.reorder_level
      OR (
        COALESCE(s.total_sold_30d, 0) > 0
        AND p.stock_qty::numeric / (s.total_sold_30d / 30.0) <= 14
      )
    )
  ORDER BY
    CASE WHEN p.stock_qty = 0 THEN 0 ELSE 1 END,
    CASE
      WHEN COALESCE(s.total_sold_30d, 0) > 0
      THEN p.stock_qty::numeric / (s.total_sold_30d / 30.0)
      ELSE 9999
    END,
    p.name;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_reorder_recommendations() TO authenticated;
