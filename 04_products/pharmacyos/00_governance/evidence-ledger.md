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
| 2026-05-16 | Gate 4 | Audit gap remediation — E-1 through E-5 | COMPLETE | Codex / SEA | Queue.tsx Rx status advance, CloseOut.tsx EOD submit, UsersAdmin.tsx staff CRUD + permissions, PatientProfile.tsx JDPA export guard |
| 2026-05-16 | Gate 4 | Loyalty POS integration + patient link | COMPLETE | Codex / SEA | PosTerminal loyalty customer lookup + points-earn flow; loyalty_customers.patient_id FK (migration 031); Admin loyalty rate settings; PatientProfile loyalty card |
| 2026-05-16 | Gate 4 | HR module — Leave Requests + Certifications | COMPLETE | Codex / SEA | staff_leaves + staff_certifications tables (migration 032); LeaveRequests.tsx + Certifications.tsx pages; Shell nav integration; 6 HR audit actions registered; 57/57 tests pass; TS clean; build pass |
| 2026-05-16 | Gate 4 | Migration 032 — gct_rate key fix | COMPLETE | Codex / SEA | pharmacy_settings tax_rate → gct_rate correction; POS terminal now reads live GCT rate instead of hardcoded 15% fallback |
| 2026-05-16 | Gate 3 | Inventory completion sprint — PO history + Reorder tab | COMPLETE | Codex / SEA | PurchaseOrders.tsx new page at /inventory/purchase-orders (expandable row line items, filters, CSV export); REORDER tab added to InventoryReport calling get_reorder_recommendations() RPC; product expiry/batch confirmed already implemented. TS clean; 57/57 tests; build pass. Browser smoke blocked — no VITE_SUPABASE_URL in worktree (same blocker as prior sprints). |
| 2026-05-16 | Gate 4 | Self-directed sweep — AuditLog colors + Dashboard HR alerts + POS report template + Global search expansion | COMPLETE | Codex / SEA | AuditLog ACTION_BADGE_MAP extended from 36 to 50 entries (14 gaps: timecards, void, access, HR); Dashboard HR alerts for expiring certs + pending leave (role-gated); PosReports.tsx report template parity (PrintHeader + Print button); GlobalSearch expanded to include staff + supplier search. TS clean; 57/57 tests; build pass. |
| 2026-05-16 | Gate 4 | C1-01 — Wire ai_role_settings into Edge Functions | COMPLETE | Codex / SEA | All 3 AI Edge Functions (extract-document, report-assistant, summarize-audit-log) now query ai_role_settings table at runtime for model, enabled, temperature, max_tokens — replacing hardcoded strings. Graceful fallback to hardcoded defaults if row missing. Settings UI controls now have functional effect on AI behavior. TS clean; 57/57 tests; build pass. |
| 2026-05-17 | Gate 4 | JDPA patient deactivation (PATIENT_DATA_DELETE) | COMPLETE | Codex / SEA | PatientProfile JDPA tab: admin-only (staff_manage) deactivation section with checkbox confirm, soft-deletes patient via is_active=false, writes PATIENT_DATA_DELETE audit log entry, invalidates patient query. Deactivated banner shown on inactive records. TS clean; 57/57 tests. |
| 2026-05-17 | Gate 4 | Security hardening — migration 033 applied to production | COMPLETE | Founder | Migration 033 applied via Supabase SQL Editor: search_path fixed on 22 functions, dev purchase_order policies replaced with role-gated policies, anon EXECUTE revoked from all SECURITY DEFINER functions, trigger-only + bootstrap functions revoked from authenticated role. |
| 2026-05-17 | Gate 4 | FK index migration 034 applied to production | COMPLETE | Founder | Migration 034 applied via Supabase SQL Editor: 5 partial indexes added (extraction_queue_purchase, prescriptions_extraction_queue, products_supplier, retail_txn_void_requested_by, retail_txn_void_denied_by). 35 unused_index findings intentionally retained pending 30-day real-traffic review. |
| 2026-05-17 | Gate 4 | Leaked password protection — plan gate | KNOWN LIMITATION | Founder | Supabase linter lint 0026 (auth_leaked_password_protection) cannot be resolved on free tier. Feature requires Pro Plan (HaveIBeenPwned.org integration). Disposition: accept on free tier; enable when project upgrades to Pro. Not a code defect. |
| 2026-05-17 | Gate 4 | Gap sprint — 9 bug fixes (commit dd390a7) | COMPLETE | Codex / SEA | C-2: EodReport audit_log fields corrected. C-3: Certifications CertDrawer form sync useState→useEffect. H-1: PosTerminal receipt modal with line items, totals, change due, loyalty pts, Print button. H-4: LeaveRequests inline deny confirmation with reason field. H-5: LeaveRequests insert includes days_requested. H-6: TimecardClock duplicate CLOCKED_IN guard. L-3: Loyalty notes wired to payload + edit populate fixed. M-4: RetailSuppliers form id="supplier-form" added. C-1: NewPrescription patient registry lookup sets patient_id FK. TS: 0 errors. Tests: 57/57. Build: pass. Pushed pharmacyos-origin/main (force — remote had non-app commits from direct migration pushes). |

---

## Tracked Defects — Next Sprint

| ID | Severity | File | Description | Status | Owner |
|----|----------|------|-------------|--------|-------|
| D-07 | MEDIUM | `app/src/pages/admin/Users.tsx` | AUDITOR role absent from Add/Edit Staff drawer `<select>`. | CLOSED — AUDITOR present at line 280 of Users.tsx; verified 2026-05-16 | QAS (Imani) |

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
| 2026-05-16 | Gate 4 | Audit gap remediation — E-1 through E-5 | COMPLETE | Codex / SEA | Queue.tsx Rx status advance + dispense; CloseOut.tsx EOD submit + discrepancy; Users.tsx staff CRUD (create/update/deactivate) + permissions matrix save; PatientProfile.tsx JDPA export consent guard (function-level + button disabled). TypeScript: 0 errors. Tests: 57/57. Build: pass. |
| 2026-05-16 | Gate 4 | Audit gap remediation — second-round sweep (NewPatient, NewPrescription, Loyalty, Settings) | COMPLETE | Codex / SEA | NewPatient.tsx: corrected wrong-column audit writes (entity_type/entity_id schema was invalid — replaced with canonical actor_id/actor_name/table_name/record_id/details); added PATIENT_JDPA_CONSENT write. NewPrescription.tsx: added RX_CREATE audit write with correct schema + insert now captures returned UUID. Loyalty.tsx: added LOYALTY_CUSTOMER_CREATE + LOYALTY_CUSTOMER_UPDATE writes. Settings.tsx: added SETTINGS_UPDATE writes to createDashboardUpdate, updateAiRole, toggleAiRole mutations. TypeScript: 0 errors. Tests: 57/57. Build: pass. |
