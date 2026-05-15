-- ── Migration 016 — Product Expiry Date + Batch/Lot Number ──────────────────
-- Adds expiry_date and batch_number to products table.
-- Required for: expiry tracking, EXPIRING_SOON filter in InventoryReport,
-- expiry alerts in Dashboard, and batch traceability for supplier receives.
-- Runs AFTER migration 015.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS expiry_date  date,
  ADD COLUMN IF NOT EXISTS batch_number text;

-- Partial index — only active products with expiry dates are queried for alerts
CREATE INDEX IF NOT EXISTS idx_products_expiry
  ON public.products (expiry_date)
  WHERE expiry_date IS NOT NULL AND is_active = true;
