-- Migration 034 — Add missing foreign key indexes
-- Addresses Supabase linter lint 0001 (unindexed_foreign_keys).
-- All 5 FKs lack a covering index, which causes sequential scans on
-- JOIN operations and cascade deletes against these columns.
--
-- NOTE: 35 unused_index (lint 0005) findings were reviewed and intentionally
-- retained. The database has minimal real query traffic pre-production; all
-- flagged indexes have clear production query patterns (patient name/phone
-- search, product barcode/category lookup, audit log actor/table filtering,
-- void pending detection, etc.). Dropping them would hurt production
-- performance. Re-evaluate after 30 days of real usage.

-- extraction_queue: FK to purchase_orders (fk_extraction_purchase)
-- Needed for lookups joining extraction entries to their source PO.
CREATE INDEX IF NOT EXISTS idx_extraction_queue_purchase
  ON public.extraction_queue (purchase_order_id)
  WHERE purchase_order_id IS NOT NULL;

-- prescriptions: FK to extraction_queue (prescriptions_extraction_queue_id_fkey)
-- Needed when looking up which prescription was produced from a given queue entry.
CREATE INDEX IF NOT EXISTS idx_prescriptions_extraction_queue
  ON public.prescriptions (extraction_queue_id)
  WHERE extraction_queue_id IS NOT NULL;

-- products: FK to retail_suppliers (products_supplier_id_fkey)
-- Needed for "all products from this supplier" queries and supplier cascade ops.
CREATE INDEX IF NOT EXISTS idx_products_supplier
  ON public.products (supplier_id)
  WHERE supplier_id IS NOT NULL;

-- retail_transactions: FK on void_requested_by (auth.users)
-- Needed when filtering or joining on who requested the void.
CREATE INDEX IF NOT EXISTS idx_retail_txn_void_requested_by
  ON public.retail_transactions (void_requested_by)
  WHERE void_requested_by IS NOT NULL;

-- retail_transactions: FK on void_denied_by (auth.users)
-- Needed when filtering or joining on who denied the void.
CREATE INDEX IF NOT EXISTS idx_retail_txn_void_denied_by
  ON public.retail_transactions (void_denied_by)
  WHERE void_denied_by IS NOT NULL;
