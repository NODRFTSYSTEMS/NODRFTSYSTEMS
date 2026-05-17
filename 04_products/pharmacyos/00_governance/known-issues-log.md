# PharmacyOS — Known Issues & Fix Log
Classification: Internal — Client Confidential
Product: PharmacyOS — Winchester Global Pharmacy Operations Platform
Maintainer: Codex / SEA — updated every sprint
Purpose: Prevent recurring defects. Every fix logged here. Before touching a bug, read this file first.

---

## How to Use This Log

1. **Before starting a fix** — search this file for the symptom. If it was fixed before, read the root cause and the fix. Do not re-diagnose from scratch.
2. **After fixing anything** — add a row to the relevant section. Include date, symptom, root cause (not the symptom), exact fix, and verification method.
3. **If a fix reappears** — add a "Recurrence" note to the original row. Escalate to a systemic solution if it recurs twice.

---

## Section 1 — Build & Toolchain Issues

| # | Date | Symptom | Root Cause | Fix Applied | Verification | Recurrence |
|---|------|---------|------------|-------------|--------------|------------|
| BT-01 | 2026-05-16 | `npm run build` failed — `Cannot find package '@vitejs/plugin-legacy'` | `@vitejs/plugin-legacy` was in `vite.config.ts` but not in `package.json` `devDependencies` | `npm install @vitejs/plugin-legacy --save-dev` in the `app/` directory | `npm run build` passed | — |
| BT-02 | 2026-05-17 | `vitest` tests fail: `useLocation() may be used only in the context of a <Router> component` (6 failures) | vitest 4.x stricter module isolation: `react-router` and `react-router-dom` are treated as **separate module instances** with separate React contexts. `RoleGuard.tsx` imports `useLocation` from `react-router`; the test imported `MemoryRouter` from `react-router-dom`. The context from one package doesn't satisfy hooks from the other. | Changed test import from `react-router-dom` to `react-router`: `import { MemoryRouter, Route, Routes } from 'react-router'` | 317/317 tests pass | — |
| BT-03 | 2026-05-17 | `git add app/package.json` failed: `fatal: pathspec 'app/package.json' did not match any files` | git commands run from the worktree root (`agitated-galileo-2231c0`). Paths must be prefixed with `04_products/pharmacyos/app/` | Use full paths: `git add 04_products/pharmacyos/app/package.json` | `git status` showed file staged | — |
| BT-04 | 2026-05-17 | GHSA-67mh-4wv8-2f99 moderate severity in vitest/esbuild ≤0.24.2 | vitest 2.1.9 bundles esbuild 0.24.x which has the server-side request forgery advisory | `npm audit fix --force` upgraded vitest to 4.1.6 inside `app/` directory | `npm audit` reports 0 vulnerabilities; 317/317 tests pass | — |

---

## Section 2 — Database / Migration Issues

| # | Date | Symptom | Root Cause | Fix Applied | Verification | Recurrence |
|---|------|---------|------------|-------------|--------------|------------|
| DB-01 | 2026-05-17 | Migration 033 `ALTER FUNCTION generate_ref_number()` silently failed | Wrong signature: migration 033 used `generate_ref_number()` (no args). Actual function is `generate_ref_number(text)` — defined in migration 001 with `prefix TEXT` parameter | Migration 035: `ALTER FUNCTION public.generate_ref_number(text) SET search_path = public;` | `SELECT proconfig FROM pg_proc WHERE proname = 'generate_ref_number'` shows `search_path=public` | — |
| DB-02 | 2026-05-17 | `ERROR: 42883: function public.adjust_product_stock(uuid, integer, text, uuid, text, text) does not exist` when running migration 035 | The 3rd parameter of `adjust_product_stock` is the enum `stock_movement_type`, NOT `text`. Migration 033 used the wrong type. The correct signature from pg_proc is `(uuid, integer, stock_movement_type, uuid, text, text)` | Migration 035 corrected to use enum type. Verified signature via: `SELECT proname, pg_get_function_identity_arguments(oid) AS args FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = 'adjust_product_stock'` | Signature confirmed in pg_proc before writing the ALTER statement | — |
| DB-03 | 2026-05-17 | Supabase Performance Advisor: 20 warnings for "Auth RLS Initialization Plan" — bare `auth.uid()` forces re-evaluation per row | PostgreSQL cannot hoist bare `auth.uid()` out of the row loop. Every row scanned calls the function. On large tables (timecards, notifications, audit_log) this is a significant performance cost | Migration 036: wrapped all `auth.uid()` calls as `(SELECT auth.uid())` across 9 policies on 4 tables | Performance Advisor warnings cleared; `pg_policies` shows `(SELECT auth.uid())` in USING/WITH CHECK clauses | — |
| DB-04 | 2026-05-17 | Supabase linter lint 0026: auth_leaked_password_protection cannot be resolved | Feature requires Pro Plan (HaveIBeenPwned.org integration) — not available on free tier | Accepted as known limitation. Enable when project upgrades to Pro Plan. Not a code defect | Documented in evidence ledger — not a code defect | — |
| DB-05 | 2026-05-17 | `UPDATE timecards SET status='CLOCKED_OUT' WHERE status='CLOCKED_IN' AND clocked_out_at IS NOT NULL` — 0 rows affected | No stale records in production at time of check | No fix required — clean slate. Run again after any future clock-out atomicity incidents | 0 rows = clean | — |

---

## Section 3 — Deployment & Environment Issues

| # | Date | Symptom | Root Cause | Fix Applied | Verification | Recurrence |
|---|------|---------|------------|-------------|--------------|------------|
| DE-01 | 2026-05-15 | GitHub Pages blank after push — Vite SPA routing broken | GitHub Pages doesn't handle SPA client-side routing by default; needs a `404.html` fallback or sub-path base setting | Migrated from GitHub Pages to Vercel. `vercel.json` with SPA rewrite rule: `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]` | Vercel deployment live | — |
| DE-02 | 2026-05-17 | **BLANK SCREEN / Build failure** — Vercel deployment | Vitest upgrade push was made as a direct `git push pharmacyos-origin HEAD:main` (or equivalent) WITHOUT the subtree split. Vercel received the full NoDrftSystems monorepo at the repo root. `package.json` is at `04_products/pharmacyos/app/package.json` in the monorepo — Vercel looks for it at `/vercel/path0/package.json` (repo root) → ENOENT → build exit 254. App never served. | Run subtree split push: `$SPLIT = git subtree split --prefix=04_products/pharmacyos/app HEAD; git push pharmacyos-origin "${SPLIT}:main" --force` | Vercel Deployments tab shows "Ready" for new build; app loads at production URL | RESOLVED 2026-05-17 |
| DE-03 | 2026-05-17 | Supabase redirect URLs not whitelisted for password reset emails | Vercel deployment URL not added to Supabase Auth → URL Configuration | OPEN ITEM: Add `https://pharmacyos-10aput2pu-nodrftsystems-projects.vercel.app/**` to Supabase Auth allowed redirect URLs | Verify in Supabase Auth settings | OPEN |

---

## Section 3A — DE-02 Blank Screen Diagnosis Checklist

**Symptom**: After successful login, blank screen appears instead of dashboard.

**Not the cause (already verified)**:
- `vercel.json` SPA rewrite is correct (`/(.*) → /index.html`)
- `ProtectedRoute.tsx` has try/catch guarding `getSession()` — auth failure redirects to /login, not blank
- `AppErrorBoundary` in `main.tsx` catches React render errors — shows error card, not blank
- `supabase.ts` never throws at module level — shows `MissingConfigScreen` if env vars missing, not blank

**Likely causes (check in order)**:

1. **Vercel build doesn't have the env vars** — Vercel bakes `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` at BUILD time. If env vars were added after the current live deployment was built, the live build still has placeholder values. `supabaseConfigured = false` → `MissingConfigScreen` renders (yellow warning card, not blank). HOWEVER: if user can see the login form, this means env vars ARE in the build.

2. **Vercel deployment failed after last push** — If the vitest upgrade push (`a4082ac`) triggered a build that failed, Vercel may have rolled back to the previous deployment which predates the env var addition. Check: Vercel Dashboard → Deployments tab → check if the latest deployment status is "Ready" or "Error".

3. **CSS not loading** — If `index.css` fails to load, the app renders with no styles. The `MissingConfigScreen` uses inline styles and would still show. The main app would show unstyled but visible content. This is unlikely to cause a fully blank screen.

4. **JavaScript crash before React mounts** — Syntax error or import that throws at module load. Build passed locally, so this is low probability. Would show as blank with console errors.

**Required from user to continue diagnosis**:
```
1. Open the Vercel deployment URL in browser
2. Press F12 → Console tab
3. Refresh the page (Ctrl+R)
4. Copy ALL red errors from the console
5. Check Vercel Dashboard → Deployments → confirm latest deployment status
```

---

## Section 4 — Auth & Session Issues

| # | Date | Symptom | Root Cause | Fix Applied | Verification | Recurrence |
|---|------|---------|------------|-------------|--------------|------------|
| AU-01 | 2026-05-17 | Logout hangs — `signOut()` waits for server round-trip that never resolves | Default Supabase `signOut()` scope is `global` — contacts server to invalidate token. If server is slow or unreachable, call hangs. | Changed `Shell.tsx` to `supabase.auth.signOut({ scope: 'local' })` — clears local session only, no server round-trip | Logout is immediate; no hang | — |
| AU-02 | 2026-05-17 | TimecardClock: staff stay CLOCKED_IN after clock-out when `analyze_timecard` RPC fails | `status='CLOCKED_OUT'` was only set inside the RPC. If RPC failed, the update never ran. | Set `status='CLOCKED_OUT'` in the same `UPDATE` payload as `clocked_out_at`. RPC is now best-effort only. | 16 timecard unit tests pass; SQL cleanup run: 0 stale records | — |
| AU-03 | 2026-05-17 | Staff with `admin@nodrfsystems.com` (typo — missing 't') could not recover account | Typo in email address — password reset would go to wrong address | Account deactivated via `is_active = false` in Supabase Auth → Users. Correct admin account `admin@nodrftsystems.com` remains active | Confirmed deactivated in Supabase dashboard | — |
| AU-04 | 2026-05-17 | **ProtectedRoute spinner stuck indefinitely after login** — blank screen | supabase-js v2.105.x uses an internal async lock for all auth operations. `autoRefreshToken: true` causes the client to acquire this lock on page load to refresh the session. `mfa.getAuthenticatorAssuranceLevel()` (called twice in ProtectedRoute — in `resolveAuthState()` and `onAuthStateChange` handler) waits for the same lock with no timeout → deadlocks forever → spinner never resolves → blank/frozen screen. | `ProtectedRoute.tsx`: wrapped both `mfa.getAuthenticatorAssuranceLevel()` calls in `getAalWithTimeout()` — a `Promise.race` that resolves to `{currentLevel:'aal1',nextLevel:'aal1'}` after 3 s. Safe because Login.tsx already enforces MFA before any redirect to /dashboard. Commit fa8a34d. 317/317 tests pass. | Preview browser: dashboard loads after login. Spinner no longer freezes. | — |
| AU-05 | 2026-05-17 | **Dashboard shows "Unknown User / CASHIER"** for authenticated users even when `staff_profiles` record is correct | `useCurrentUser.ts` called `supabase.auth.getUser()` to get user identity. `getUser()` makes a network call AND contends for the same supabase-js internal auth lock held by `autoRefreshToken` on page load. When the lock is held, `getUser()` either returns null (causing early return) or waits long enough that React Query returns stale null data — so the `staff_profiles` query never executes and the fallback values `'Unknown User'` / `'CASHIER'` render. DB data (e.g. `full_name: "Grace Bennett"`, `role: "ADMIN"`) was correct throughout. | `useCurrentUser.ts`: replaced `supabase.auth.getUser()` with `supabase.auth.getSession()`. `getSession()` reads directly from localStorage — no network call, no lock contention, instant. `session.user` provides the same `id` and `email` fields needed for the `staff_profiles` query. Safe because `ProtectedRoute` already validates the session before this hook runs. Commit d29e7fa. 317/317 tests pass. | Preview browser: dashboard shows "Grace Bennett / ADMIN" immediately after login. | — |

---

## Section 5 — Security Issues

| # | Date | Symptom | Root Cause | Fix Applied | Verification | Recurrence |
|---|------|---------|------------|-------------|--------------|------------|
| SC-01 | 2026-05-17 | Supabase Security Advisor: functions with mutable `search_path` | SECURITY DEFINER functions without fixed `search_path` can be hijacked via search_path injection. 22 functions affected | Migration 033: `ALTER FUNCTION ... SET search_path = public;` for 22 functions | Security Advisor warnings cleared for all public-schema functions we control. ~38 remaining warnings are Supabase-internal (auth/storage/realtime) — not tenant-fixable | — |
| SC-02 | 2026-05-17 | Supabase Security Advisor: anon role had EXECUTE on SECURITY DEFINER functions | Anonymous users should not execute functions that run with elevated privileges | Migration 033: `REVOKE EXECUTE ON FUNCTION ... FROM anon;` for all SECURITY DEFINER functions | Verified via Supabase Security Advisor | — |
| SC-03 | 2026-05-15 | D-03 CRITICAL: RLS bypass — `purchase_orders` policies used `authenticated` role without role-gating | Dev-era policies allowed any authenticated user to read/write purchase orders regardless of role | Migration 033: replaced permissive policies with role-gated ones (ADMIN/MANAGER only for write, ADMIN/MANAGER/PHARMACIST/TECHNICIAN for read) | QAS Imani verified; ARE signed off 2026-05-15 | — |
| SC-04 | 2026-05-15 | D-04 CRITICAL: Sensitive `pharmacy_settings` table had no RLS | Settings table (GCT rate, AI keys, dashboard config) was fully open to any authenticated user | Migration 033: RLS enabled; ADMIN-only read/write policies applied | QAS Imani verified; ARE signed off 2026-05-15 | — |

---

## Section 6 — UI / Logic Bugs Fixed

| # | Date | Symptom | Root Cause | Fix Applied | Verification | Recurrence |
|---|------|---------|------------|-------------|--------------|------------|
| UI-01 | 2026-05-17 | EOD Report: `audit_log` fields incorrect (wrong column names) | `entity_type`/`entity_id` used instead of canonical `table_name`/`record_id` schema | C-2 fix: corrected column names to match `audit_log` schema | TypeScript check: 0 errors | — |
| UI-02 | 2026-05-17 | CertDrawer form fields don't populate when editing existing certification | `useState` for form fields didn't react to prop changes — editing a different cert showed stale data from the previous render | C-3 fix: replaced `useState` with `useEffect` that syncs form state when cert prop changes | Manual re-test path: open cert drawer, switch certs — fields update correctly | — |
| UI-03 | 2026-05-17 | POS Terminal: no receipt modal after completing a transaction | Receipt rendering was not implemented — transaction completed but no visual confirmation | H-1 fix: receipt modal with line items, totals, change due, loyalty points, Print button | 317 tests pass | — |
| UI-04 | 2026-05-17 | LeaveRequests: deny action had no reason field or confirmation | Deny was a one-click action with no confirmation — accidental denial risk | H-4 fix: inline deny confirmation with reason text field required before submitting | Tests pass | — |
| UI-05 | 2026-05-17 | LeaveRequests: insert did not include `days_requested` column | `days_requested` was missing from the insert payload | H-5 fix: added `days_requested` to insert | Tests pass | — |
| UI-06 | 2026-05-17 | TimecardClock: duplicate CLOCKED_IN entries possible on rapid double-click | No guard against submitting clock-in twice — RLS INSERT policy allowed duplicate CLOCKED_IN entries | H-6 fix: check existing CLOCKED_IN record before inserting new one | Tests pass | — |
| UI-07 | 2026-05-17 | Loyalty: notes field not wired to payload; edit drawer doesn't populate existing notes | `notes` omitted from INSERT/UPDATE payload; edit mode didn't load existing record values | L-3 fix: notes wired to payload; edit populate fixed | Tests pass | — |
| UI-08 | 2026-05-17 | RetailSuppliers: form missing `id` attribute — drawer submit button didn't work | `<form>` element lacked `id="supplier-form"`. The submit button used `form="supplier-form"` to link to the form outside the button's DOM subtree | M-4 fix: added `id="supplier-form"` to the form element | Tests pass | — |
| UI-09 | 2026-05-17 | NewPrescription: patient_id FK not set when selecting from patient registry | Patient registry lookup set the display name but did not capture the `patient_id` UUID | C-1 fix: patient registry selection now sets `patient_id` FK correctly | Tests pass | — |

---

## Section 7 — Recurring Mistake Registry

Mistakes that have happened more than once in this project. Check this before writing any migration or git command.

| # | Mistake | How to Avoid |
|---|---------|-------------|
| R-01 | Writing `ALTER FUNCTION` with wrong parameter type signature | **Always verify signatures before ALTER.** Run: `SELECT proname, pg_get_function_identity_arguments(oid) FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND proname = 'your_function_name';` Never assume from source file — source may use different types (e.g. `text` in code, `stock_movement_type` enum in DB) |
| R-02 | `git add` with paths relative to `app/` when running from worktree root | Git always runs from worktree root: `agitated-galileo-2231c0`. All app paths must be: `04_products/pharmacyos/app/[filepath]` |
| R-03 | Importing React Router utilities from `react-router-dom` in tests when component uses `react-router` | In React Router v7 + vitest 4.x: test imports must match the component's exact package. If component imports from `react-router`, test must also use `react-router` for `MemoryRouter`, `Route`, `Routes`. Vitest 4.x enforces strict module isolation. |
| R-04 | Claiming a deployment is working without checking browser console | Never claim blank screen / deployment is fixed without browser DevTools confirmation. `vercel.json` correct ≠ app renders. Env vars added ≠ build has them. Always request browser console output before closing a deployment issue. |
| R-05 | Assuming env vars added to Vercel are in the current live build | Vite bakes `VITE_*` vars at BUILD TIME. Adding vars to Vercel dashboard does NOT update the current live deployment. A new push or manual redeploy is required. Always confirm: Vercel Deployments tab → latest deployment → "Ready" status → built AFTER env vars were added. |
| R-06 | Pushing to `pharmacyos-origin` without the subtree split | **NEVER** run `git push pharmacyos-origin HEAD:main` or `git push pharmacyos-origin main`. This pushes the full NoDrftSystems monorepo to the Vercel deployment repo. Vercel looks for `package.json` at the repo root and gets ENOENT → build exit 254 → blank screen. **ALWAYS** use the subtree split: `$SPLIT = git subtree split --prefix=04_products/pharmacyos/app HEAD; git push pharmacyos-origin "${SPLIT}:main"`. Force flag required when remote has monorepo commits. |

---

*Last updated: 2026-05-17 — Codex / SEA*
