-- Migration 037: fuzzy patient name search via pg_trgm
-- Adds trigram indexes and a fuzzy_search_patients() RPC to replace ilike-only
-- patient matching in GlobalSearch.
-- Typo tolerance: "Crepo" now matches "Crespo" (similarity threshold: 0.15).
-- pg_trgm is available on all Supabase PostgreSQL instances (bundled extension).

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN trigram indexes on patient name columns
-- GIN (not GIST) — better read performance for text similarity workloads
CREATE INDEX IF NOT EXISTS patients_first_name_trgm_idx
  ON patients USING GIN (first_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS patients_last_name_trgm_idx
  ON patients USING GIN (last_name gin_trgm_ops);

-- Expression index on full concatenated name — matches "John Doe" as a unit
CREATE INDEX IF NOT EXISTS patients_full_name_expr_trgm_idx
  ON patients USING GIN ((first_name || ' ' || last_name) gin_trgm_ops);

-- Set similarity threshold for % operator (pg_trgm default is 0.30 — too strict for names)
-- 0.15 catches single-character transpositions (Crepo → Crespo) and common misspellings
SELECT set_limit(0.15);

-- ── RPC: fuzzy_search_patients ──────────────────────────────────────────────
-- Returns patients matching query via trigram similarity OR ilike fallback.
-- Short queries (< 3 chars) fall through to ilike only — trigram needs min length.
-- Results ordered by similarity score descending (best match first).
-- SECURITY INVOKER: inherits RLS from calling session — no privilege escalation.

CREATE OR REPLACE FUNCTION fuzzy_search_patients(query text)
RETURNS TABLE (
  id         uuid,
  first_name text,
  last_name  text,
  phone      text
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT id, first_name, last_name, phone
  FROM patients
  WHERE
    (first_name || ' ' || last_name) %  query
    OR first_name %  query
    OR last_name  %  query
    OR first_name ILIKE '%' || query || '%'
    OR last_name  ILIKE '%' || query || '%'
  ORDER BY
    similarity(first_name || ' ' || last_name, query) DESC
  LIMIT 8;
$$;

-- Permissions: authenticated users only — patients is PII; anon must not search
REVOKE EXECUTE ON FUNCTION fuzzy_search_patients(text) FROM anon;
GRANT  EXECUTE ON FUNCTION fuzzy_search_patients(text) TO authenticated;
