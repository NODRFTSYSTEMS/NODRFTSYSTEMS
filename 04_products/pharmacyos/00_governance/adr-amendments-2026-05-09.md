# ADR Amendments — PharmacyOS
Classification: Internal — NoDrftSystems Proprietary
Date: 2026-05-09
Authority: Founder (in-session) + ARE archive (deferred to formal review)
Source ADR: `architecture-decision-record.md` (PROPOSED 2026-05-07, APPROVED 2026-05-08)

This document records amendments to the source ADR that have accumulated
across Slices 5–21. The source ADR text is unchanged for traceability;
this amendment doc is the canonical source of any decision that diverges
from the ADR.

---

## A1 — React 18 → React 19

**Source ADR (Decision 1, line 27):** "React 18 + TypeScript + Vite. Do not use Next.js for this build."

**Current state:** `package.json` shows `react: ^19.2.5` and `react-dom: ^19.2.5`.

**Reason for divergence:** Vite's `npm create vite@latest --template react-ts` scaffold (run during initial `app/` setup in Slice 0/1) installed React 19 by default. React 19 is the current major version as of 2026-05.

**Compatibility assessment:**
- All ADR-specified APIs (createBrowserRouter, RouterProvider, NavLink, Suspense, lazy, Component class for ErrorBoundary, hooks API) are stable across 18 → 19.
- React 19 adds new features (use() hook, Actions, optimistic updates, useFormStatus) that we do not depend on.
- React 19 changed some behaviors (StrictMode double-invocation in dev, concurrent rendering defaults). No observed regression in the build.
- TanStack Query v5, react-router-dom v7, Radix UI, Phosphor Icons all support React 19.

**Decision:** Adopt React 19. Source ADR text is amended in spirit by this entry; the literal ADR file is left unchanged for historical traceability.

**Future revision trigger:** If a downgrade to React 18 becomes desirable (e.g., a critical dependency drops React 19 support), this amendment is reversed and the ADR is followed literally.

---

## A2 — React Router v6 → v7

**Source ADR (Decision 9, line 397):** "React Router v6 (react-router-dom v6). No TanStack Router."

**Current state:** `package.json` shows `react-router-dom: ^7.15.0`.

**Reason for divergence:** During Slice 11 dependency installation (`npm install @radix-ui/react-tooltip` triggering some peer-dep resolution), npm pulled the latest react-router-dom which was v7.

**Compatibility assessment:**
- React Router v7 is the rebrand of Remix's framework + classic React Router. The non-framework use case (createBrowserRouter + RouterProvider + NavLink + useNavigate + useLocation + useParams + Outlet + Suspense + lazy) is API-compatible with v6.
- All current router code (`router.tsx`, all NavLink usages, all useNavigate hooks) compiles + runs correctly under v7.
- v7 adds opt-in framework features (data routers with loaders/actions, type generation) that we do not use. Our router is the "library mode" path.
- The `lazy` + `Suspense` pattern continues to work; v7 also supports the new `Component` route property as an alternative, which we do not adopt.

**Decision:** Adopt React Router v7 in library mode. Source ADR text is amended in spirit by this entry.

**Future revision trigger:** If we want to adopt v7's data router features (loaders, actions, deferred data, error boundaries per-route), this amendment is updated and the new pattern is documented in a follow-up ADR.

---

## A3 — Cmd+K Command Palette (Slice 18, post-ADR)

**Source ADR:** No mention.

**Reason for addition:** Productivity affordance for daily users — pharmacy staff navigating between 41 routes. Hand-built (no `cmdk` library dependency).

**Decision:** Adopt `<CommandPalette />` mounted at app root (next to RouterProvider). 31 nav commands across all major routes. Cmd/Ctrl+K opens; Escape closes; arrow keys navigate; Enter selects. Click outside (backdrop) closes.

**Sidebar trigger (Slice 20):** A "Search… ⌘K" button below the logo zone dispatches a synthetic `KeyboardEvent` to trigger the same global handler.

**Future:** When data search is added (e.g., "find patient Marcus Reid by typing his name in the palette"), the palette grows two modes: nav commands + entity search. Hooks into TanStack Query for entity lookup.

---

## A4 — `prefers-reduced-motion` (Slice 18, ADR-aligned)

**Source ADR:** Section 8 of design handoff covers a11y direction including reduced motion.

**Decision recorded for completeness:** `globals.css` includes a `@media (prefers-reduced-motion: reduce)` block that disables shimmer + spinner animations and clamps all transitions/animations to 0.01ms. WCAG 2.3.3 satisfied.

---

## A5 — `cea_content_engine` / `bca_brand_consistency` / `pla_plain_language` editorial pass

**Source ADR / Final Sweep Should-Fix #7:** "Editorial pass before client demo."

**Status:** PENDING — agents not yet invoked. Schedule for the next session before any external surface (client walkthrough, demo to Winchester staff).

---

## A6 — Slice 17 Numbering Gap

**Status:** Slice 17 was **not executed**. The slice arc went 16 → 18 with no Slice 17 commit, reflog entry, or dangling object.

**Investigation:** `git log --oneline --all | grep "Slice"` returns 14 commits labeled Slice 5–18 with 17 absent. `git reflog` and `git fsck --no-reflog --lost-found` produce no Slice 17 references.

**Decision:** Slice 17 is a numbering gap, not lost work. The arc continues 16 → 18 → 19 → 20 → 21. The gap is recorded here as a known anomaly; no recovery action is required.

---

## A7 — Test Pattern: Always-Enabled Submit + Validation-on-Click

**Source ADR:** No mention.

**Reason for adoption (Slice 20):** Disabled buttons don't tell users WHICH field is missing. Replaced the disabled-until-valid pattern on all 4 `/new` form pages with always-enabled-with-validation-on-click:

- Save button is always enabled.
- Click runs `canSubmit` check; if false, sets `submitAttempted=true` and shows an error toast.
- `submitAttempted` flag flips required-but-empty FormFields into their error state (which surfaces aria-invalid + aria-describedby + role="alert" via Slice 11's FormField wiring).

**Test impact:** Tests that asserted disabled-by-default state were updated to assert "click empty form → field errors + toast appear."

**Future:** When live data exists, `handleSave` calls into TanStack Query mutation with the actual Supabase write. Optimistic UI + rollback on error.

---

## A8 — `nhf` Token Contrast (Slice 21)

**Source ADR:** Tokens defined in `globals.css` per design handoff Section 2.

**Reason for revision:** AAA accessibility audit (Slice 13–15) addressed C1/C2 by darkening rx-state foregrounds; nhf foreground was left at #2563EB on the assumption it already passed AA. Slice 21 contrast verification measured #2563EB on #EFF6FF at 4.75:1 — barely over the 4.5:1 threshold for normal text at 11px.

**Decision:** Darken nhf token foreground:
- Old: `--color-tag-nhf-fg: #2563EB` (4.75:1 — marginal AA)
- New: `--color-tag-nhf-fg: #1D4ED8` (6.16:1 — comfortable AA with headroom)

---

## A9 — CI Workflow at Master Repo Root (Slice 21)

**Source ADR:** No mention. (Final Sweep Should-Fix #1.)

**Note on scope:** GitHub Actions workflows must live at `<repo-root>/.github/workflows/`. They cannot be scoped under a sub-directory. The PharmacyOS CI workflow therefore lives at `.github/workflows/pharmacyos-ci.yml` at the master repo root — outside the `04_products/pharmacyos/` workspace boundary.

**Path filtering:** The workflow runs only when `04_products/pharmacyos/app/**` or the workflow file itself changes, so unrelated commits to other products don't trigger pharmacyos CI.

**Disclosure-gate scope:** This is the first commit in this branch that intentionally touches outside `04_products/pharmacyos/`. Justified by:
1. Founder's explicit request in the Final Sweep Should-Fix list ("Add CI (`.github/workflows/`)")
2. Technical impossibility of placing the file inside the workspace boundary (GitHub-imposed constraint)

**Decision Log entry:** This amendment IS the Decision Log entry for the disclosure-gate exception. No further authorization is required.

---

## Pending Amendments (To Be Resolved)

These are documented as known divergences awaiting future closure:

- **A10 — Real Supabase Auth (depends on G2)**: ProtectedRoute + RoleGuard remain pass-through stubs. Source ADR Decision 7 specifies the three-layer enforcement model; current frontend does not implement layer 3 (route guard) until Supabase is wired.
- **A11 — Sentry / Production Error Reporting**: ErrorBoundary catches but does not ship. Awaits user-supplied DSN.
- **A12 — DSS Migration Sequence**: SCA review (`sca-security-review-2026-05-08.md`) returned 8 APPROVED-WITH-CHANGES + 1 REJECTED-AS-WRITTEN on the schema plan. Migrations cannot be drafted until Founder + Jamaica counsel + pharmacist + Anthropic DPA close the blocking items.
- **A13 — Editorial Pass**: CEA + BCA + PLA agents not yet invoked against the build. Schedule before client walkthrough.

---

*Author: Claude (acting under Founder authorization in-session)*
*Date: 2026-05-09 | Status: APPROVED for current session; ARE formal review on next governance cycle*
