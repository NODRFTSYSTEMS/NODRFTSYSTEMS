-- Product-owned visual fields for demo catalog and launch-ready image replacement.
-- These fields intentionally store references only; image sourcing/verification remains operational.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS image_alt text;

COMMENT ON COLUMN public.products.image_url IS
  'Optional product image URL for demo visuals or verified launch imagery.';

COMMENT ON COLUMN public.products.image_alt IS
  'Accessible description for the product image.';

UPDATE public.products
SET image_alt = name
WHERE image_url IS NOT NULL
  AND image_alt IS NULL;
