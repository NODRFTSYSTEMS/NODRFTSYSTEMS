# Evidence Ledger — PharmacyOS
Classification: Internal — Client Confidential
Product: PharmacyOS — Winchester Global Pharmacy Operations Platform
Created: 2026-05-07
Protocol: mandatory-build-activation-protocol-2026-04-26.md

---

## Purpose

This ledger records every piece of verification evidence produced during the PharmacyOS build. No artifact advances to Gate 5 without its corresponding evidence entry logged here.

---

## Evidence Log

| Date | Gate | Evidence Type | Result | Produced by | Notes |
|---|---|---|---|---|---|
| 2026-05-07 | Gate 0 | Build Activation Packet | Created | PMA / Codex | Initial packet — awaiting SAA architecture decision |
| 2026-05-07 | Gate 0A | Agent Assessment & Routing | Documented in BAP | MOA / PMA | 6 capability gaps identified — must close before Gate 2 clears |
| 2026-05-07 | Gate 1A | SAA Architecture Record | PRODUCED — AWAITING ARE + FOUNDER | SAA (Samara) | React 18 + Vite + Tailwind v4 + shadcn/ui + Supabase + Edge Functions. See architecture-decision-record.md |
| — | Gate 1A | DSS Schema Approval | PENDING | DSS | 15+ tables; RLS; migrations |
| — | Gate 2 | SCA Auth + JDPA Review | PENDING | SCA (Omari) | Required before any patient data schema finalized |
| — | Gate 2 | legal-compliance skill run | PENDING | LCA (Dorothy) | JDPA consent flow + Jamaica Data Protection Act 2020 |
| — | Gate 4 | TypeScript check | PENDING | TVA (Leandra) | 0 errors required |
| — | Gate 4 | Production build | PENDING | TVA (Leandra) | Must pass |
| — | Gate 4 | Test suite | PENDING | TVA (Leandra) | Coverage target TBD at SAA stage |
| — | Gate 4 | WCAG 2.1 AA audit | PENDING | AAA (Rochelle) | All 43 screens; automated + manual |
| — | Gate 4 | SCA security review | PENDING | SCA (Omari) | Auth, RLS, PII, Lynk, AI upload |
| — | Gate 4 | Claude Vision integration test | PENDING | IDS / TVA | Extraction accuracy, confidence scoring, error handling |
| — | Gate 4 | Lynk payment integration test | PENDING | IDS / TVA | Awaiting client API credentials |
| — | Gate 4 | Schedule drug log format approval | PENDING | Client pharmacist | Required before logging UI is built |
| — | Gate 5 | QAS independent review | PENDING | QAS (Imani) | Scope, evidence, drift check |
| — | Gate 6 | ARE technical review | PENDING | ARE | Required before production deployment |
| 2026-05-15 | Gate 5 | QAS independent review | COMPLETE — 6 defects D-01–D-06, all remediated | QAS (Imani) | D-03 and D-04 CRITICAL security findings; all fixed same session |
| 2026-05-15 | Gate 6 | ARE technical review | GRANTED | ARE | All 6 defects verified; D-07 MEDIUM logged for next sprint; npm audit dev-only CVEs noted |
| 2026-05-15 | Gate 6 | Founder authorization | GRANTED — Decision Log 2026-05-15-001 | Founder | Staging deploy authorized; production is separate gate |
| 2026-05-15 | Deploy | Migrations 022 + 023 applied | COMPLETE | Founder (supabase db push) | Applied to project aeidooydivhnvwskypov |
| 2026-05-15 | Deploy | GitHub Pages staging deploy | COMPLETE | Founder | Sprint build pushed to gh-pages branch — NODRFTSYSTEMS/pharmacyos |
| 2026-05-15 | Deploy | main branch merge | COMPLETE | Founder | claude/strange-varahamihira-f9d312 merged + pushed to origin/main |
| 2026-05-16 | Gate 3 | Medication/product visual workflow | COMPLETE - demo visual scaffolding + product image slots + Rx/catalog/POS/stock UI placements | Codex / FIS + BLS surface | Added migrations 025-026, prescription visual-reference UI, and product-owned `image_url`/`image_alt` support. Demo placeholders are active for workflow layout; launch images remain blocked pending pharmacist/source validation. |
| 2026-05-16 | Gate 4 | TypeScript check | PASS | TVA / Codex | `npm run typecheck` passed. |
| 2026-05-16 | Gate 4 | Production build | PASS | TVA / Codex | `npm run build` passed after `npm install` restored missing declared `@vitejs/plugin-legacy`; sandbox required escalation for Vite/esbuild config access. |
| 2026-05-16 | Gate 4 | Unit test suite | PASS - 57 tests | TVA / Codex | `npm run test:run` passed; sandbox required escalation for Vitest/esbuild config access. |
| 2026-05-16 | Gate 4 | Local route smoke check | PASS | TVA / Codex | Vite dev server returned HTTP 200 for `/prescriptions`, `/pos/products`, `/pos/terminal`, and `/inventory/movements`; rendered browser automation unavailable in current tool surface. |
| 2026-05-16 | Gate 3 | Staff demo portrait workflow | COMPLETE - generated fictional staff portraits + staff avatar fields + shell/admin/security placements | Codex / FIS + BLS surface | Added five demo-only generated portraits for seeded staff, migration 028 staff avatar metadata, and UI rendering in staff identity surfaces. Launch use requires client-approved or verified replacement images before any portrait is marked VERIFIED. |

---

## Tracked Defects — Next Sprint

| ID | Severity | File | Description | Owner |
|----|----------|------|-------------|-------|
| D-07 | MEDIUM | `app/src/pages/admin/Users.tsx` | AUDITOR role absent from Add/Edit Staff drawer `<select>`. Role exists in TypeScript types and permissions matrix but cannot be assigned via UI — requires direct database entry. Add `<option value="AUDITOR">Auditor</option>` to the role selector. | QAS (Imani) / next sprint |

---

## Dependency Maintenance Backlog (TMA — Tobias)

| Date Logged | Severity | Advisory | Affected Packages | Fix | Status |
|-------------|----------|----------|-------------------|-----|--------|
| 2026-05-15 | Moderate (×6) | GHSA-67mh-4wv8-2f99 | esbuild, vite, vitest, vite-node | Upgrade vitest to 4.x (breaking change) | OPEN — dev toolchain only, not in production build artifact; address at next maintenance window |

---

## Prototype Reference Record

| Item | Status | Location |
|---|---|---|
| PharmacyOS Prototype.html | Reference only — not production | prototype/ |
| app.jsx | Reference only — hash-router vanilla React | prototype/ |
| screens-1.jsx | Reference only | prototype/ |
| screens-2.jsx | Reference only | prototype/ |
| screens-3.jsx | Reference only | prototype/ |
| shell.jsx | Reference only | prototype/ |
| icons.jsx | Reference only | prototype/ |
| styles.css | Reference only — design token source | prototype/ |
| Design handoff (Claude Design) | Canonical specification for production build | 00_governance/ |

Prototype is for design validation and stakeholder review only. Production implementation in `app/` follows the design handoff spec, not the prototype code structure.

---

## Open Capability Gaps (Gate 0A)

| # | Gap | Owner | Status |
|---|---|---|---|
| G1 | SAA architecture decision | SAA (Samara) | CLOSED — ADR produced 2026-05-07; awaiting ARE + Founder approval |
| G2 | Supabase project not provisioned | PIS + Founder | OPEN — cost authorization required |
| G3 | Claude Vision API access not confirmed | Founder / Codex | OPEN |
| G4 | Lynk payment API credentials absent | Client | OPEN |
| G5 | JDPA compliance review not started | SCA + LCA | OPEN |
| G6 | Schedule drug log format not pharmacist-approved | Client pharmacist | OPEN |
| G10 | Launch-verified medication visual source library absent | Client pharmacist + Founder | OPEN - migration 025 creates DEMO_ONLY visual placeholders for route/layout readiness. Image URLs must come from verified stock photos, supplier/manufacturer references, or another approved source before any record is marked VERIFIED |

---

## Build Evidence - Operational Resilience Enhancements

| Date | Gate | Evidence | Status | Owner | Notes |
|---|---|---|---|---|---|
| 2026-05-16 | Gate 3 | Connection status, dashboard updates, theme toggle, AI role settings, internal error capture, and daily inconsistency report controls added to PharmacyOS | IN REVIEW | Codex / PMA + SEA + FIS | Migration 029 installs persistence and report RPC. Edge Function `daily-inconsistency-report` exposes scheduler/manual invocation. Production scheduler binding remains a deployment dependency. |
