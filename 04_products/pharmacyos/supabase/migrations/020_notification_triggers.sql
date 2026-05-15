-- ── Migration 020 — Notification Triggers ────────────────────────────────────
-- Adds DB-level AFTER triggers that INSERT rows into the notifications table.
-- NotificationBell.tsx polls with refetchInterval: 30_000 — no frontend changes needed.
-- Four triggers:
--   trg_notify_low_stock    — products.stock_qty drops to reorder_level
--   trg_notify_expiry       — products.expiry_date set within 30 days
--   trg_notify_ai_review    — extraction_queue.extraction_status → REVIEW_REQUIRED
--   trg_notify_eod_pending  — eod_closeouts INSERT/UPDATE with status SUBMITTED
-- Runs AFTER migration 019.

-- ── Extend notifications.type CHECK to include expiry_alert ──────────────────
-- The inline CHECK constraint in migration 011 auto-generates name: notifications_type_check

ALTER TABLE public.notifications
  DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE public.notifications
  ADD CONSTRAINT notifications_type_check
  CHECK (type IN (
    'low_stock', 'ai_review_needed', 'eod_pending',
    'rx_ready', 'rx_received', 'system', 'expiry_alert'
  ));

-- ── Trigger 1: Low stock alert ────────────────────────────────────────────────
-- Fires when stock_qty crosses reorder_level downward (not on every update).
-- Notifies MANAGER and ADMIN roles.

CREATE OR REPLACE FUNCTION public.fn_notify_low_stock()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- Only fire when crossing the threshold downward (avoids repeated alerts)
  IF NEW.stock_qty <= NEW.reorder_level AND OLD.stock_qty > OLD.reorder_level THEN
    INSERT INTO public.notifications (role_target, type, title, body, href)
    VALUES
      ('MANAGER', 'low_stock',
       'Low stock: ' || NEW.name,
       NEW.name || ' is at ' || NEW.stock_qty || ' units (reorder level: ' || NEW.reorder_level || ')',
       '/inventory/stock-movements'),
      ('ADMIN', 'low_stock',
       'Low stock: ' || NEW.name,
       NEW.name || ' is at ' || NEW.stock_qty || ' units (reorder level: ' || NEW.reorder_level || ')',
       '/inventory/stock-movements');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_low_stock ON public.products;
CREATE TRIGGER trg_notify_low_stock
  AFTER UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_low_stock();

-- ── Trigger 2: Expiry alert ───────────────────────────────────────────────────
-- Fires when expiry_date is set or changed to within 30 days of today.
-- Notifies MANAGER and PHARMACIST roles.

CREATE OR REPLACE FUNCTION public.fn_notify_expiry()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.expiry_date IS NOT NULL
     AND NEW.expiry_date <= CURRENT_DATE + INTERVAL '30 days'
     AND (OLD.expiry_date IS DISTINCT FROM NEW.expiry_date)
  THEN
    INSERT INTO public.notifications (role_target, type, title, body, href)
    VALUES
      ('MANAGER', 'expiry_alert',
       'Expiry alert: ' || NEW.name,
       NEW.name || ' expires ' || TO_CHAR(NEW.expiry_date, 'DD Mon YYYY') ||
         CASE WHEN NEW.expiry_date < CURRENT_DATE THEN ' — EXPIRED' ELSE '' END,
       '/reports/inventory'),
      ('PHARMACIST', 'expiry_alert',
       'Expiry alert: ' || NEW.name,
       NEW.name || ' expires ' || TO_CHAR(NEW.expiry_date, 'DD Mon YYYY') ||
         CASE WHEN NEW.expiry_date < CURRENT_DATE THEN ' — EXPIRED' ELSE '' END,
       '/reports/inventory');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_expiry ON public.products;
CREATE TRIGGER trg_notify_expiry
  AFTER UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_expiry();

-- ── Trigger 3: AI review needed ───────────────────────────────────────────────
-- Fires when extraction_status transitions to REVIEW_REQUIRED.
-- Notifies PHARMACIST role (extraction review is a pharmacist responsibility).

CREATE OR REPLACE FUNCTION public.fn_notify_ai_review()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.extraction_status = 'REVIEW_REQUIRED'
     AND OLD.extraction_status <> 'REVIEW_REQUIRED'
  THEN
    INSERT INTO public.notifications (role_target, type, title, body, href)
    VALUES (
      'PHARMACIST', 'ai_review_needed',
      'AI extraction needs review',
      COALESCE(NEW.file_name, 'Document') || ' (' || NEW.document_type || ') is ready for pharmacist review',
      '/ai/queue'
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_ai_review ON public.extraction_queue;
CREATE TRIGGER trg_notify_ai_review
  AFTER UPDATE ON public.extraction_queue
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_ai_review();

-- ── Trigger 4: EOD pending approval ──────────────────────────────────────────
-- Fires on INSERT or UPDATE when status = SUBMITTED (cashier submitted EOD).
-- Notifies MANAGER role to approve.

CREATE OR REPLACE FUNCTION public.fn_notify_eod_pending()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.status = 'SUBMITTED' AND (TG_OP = 'INSERT' OR OLD.status <> 'SUBMITTED') THEN
    INSERT INTO public.notifications (role_target, type, title, body, href)
    VALUES (
      'MANAGER', 'eod_pending',
      'EOD close-out awaiting approval',
      'Close-out for ' || TO_CHAR(NEW.closeout_date, 'DD Mon YYYY') ||
        ' (' || NEW.shift || ' shift) has been submitted for approval',
      '/pos/eod-report'
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_eod_pending ON public.eod_closeouts;
CREATE TRIGGER trg_notify_eod_pending
  AFTER INSERT OR UPDATE ON public.eod_closeouts
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_eod_pending();
