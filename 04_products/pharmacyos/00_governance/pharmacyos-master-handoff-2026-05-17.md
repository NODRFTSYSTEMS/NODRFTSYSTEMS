# PharmacyOS — Comprehensive Assessment, Proposal & Master Handoff
**Classification:** Client Confidential — Winchester Global Pharmacy  
**Version:** 2026-05-17  
**Produced by:** NoDrftSystems — Codex / SEA / QAS (Imani) / ARE  
**Previous version:** pharmacyos-master-handoff-2026-05-13.md (superseded)  
**Status:** CURRENT — reflects all sprints through 2026-05-17

---

## Table of Contents

1. [What PharmacyOS Is](#1-what-pharmacyos-is)
2. [Problems It Solves](#2-problems-it-solves)
3. [Logical Roles, Authorizations & Permissions](#3-logical-roles-authorizations--permissions)
4. [Screen Inventory — What Is Built](#4-screen-inventory--what-is-built)
5. [AI Integration — Current State & Expansion Path](#5-ai-integration--current-state--expansion-path)
6. [Text Formatting & Presentation Standards](#6-text-formatting--presentation-standards)
7. [Search Functionality](#7-search-functionality)
8. [Error Pages & Access Denial Handling](#8-error-pages--access-denial-handling)
9. [Security Architecture](#9-security-architecture)
10. [Testing & Quality Assurance](#10-testing--quality-assurance)
11. [OS Rating & Valuation](#11-os-rating--valuation)
12. [Identified Gaps & Recommendations](#12-identified-gaps--recommendations)
13. [Why Pharmacies Should Use This OS](#13-why-pharmacies-should-use-this-os)
14. [Open Items Requiring Founder or Client Action](#14-open-items-requiring-founder-or-client-action)

---

## 1. What PharmacyOS Is

PharmacyOS is a purpose-built pharmacy operations platform developed exclusively for Winchester Global Pharmacy. It is a single-tenant, authenticated-only web application — every route in the system sits behind a session gate. There are no public pages, no search engine exposure, and no shared infrastructure with other clients.

**Technology stack (verified):**
- Frontend: React 18 + TypeScript + Vite — compiled to static assets, deployed on Vercel
- Backend: Supabase (PostgreSQL + Row-Level Security + Auth + Edge Functions + Realtime)
- AI layer: Anthropic Claude via Supabase Edge Functions (API key never exposed client-side)
- Styling: Tailwind CSS v4 + Phosphor Icons
- State: TanStack React Query (server state) + Zustand (POS cart local state)
- Deployment: Vercel (frontend) + Supabase hosted (backend, us-east-1 region)

**Scale:** Designed for approximately 12 concurrent users. Current production database: Supabase project `aeidooydivhnvwskypov`. 36 migrations applied as of 2026-05-17.

---

## 2. Problems It Solves

| Problem Area | What PharmacyOS Replaces or Eliminates |
|---|---|
| Prescription workflow | Paper-based Rx queue → live kanban with RECEIVED → VERIFIED → FILLED → DISPENSED status flow and Realtime updates across all workstations |
| Schedule drug compliance | Manual register books → digital Schedule Drug Log with Jamaica Dangerous Drugs Act (Chapter 92) field requirements, pharmacist attribution, and audit trail |
| POS + inventory disconnect | Separate cash register + manual stock counts → POS terminal that deducts stock atomically at point of sale, with full transaction audit |
| Inventory control | Clipboard receiving → digital Receive Stock workflow creating purchase orders, recording batch/expiry, and updating stock quantities via a single atomic RPC |
| Reporting | Manual spreadsheets → Revenue, Dispensing, Inventory, Timecard, POS, and EOD reports with CSV export and print-formatted output |
| Staff accountability | No central attendance record → clock-in/clock-out with automatic session analysis, manager oversight view, and discrepancy detection |
| AI-assisted document processing | Manual data entry from invoices and prescriptions → Claude Vision extraction with confidence scoring and human-review gate before any data is committed |
| Audit and compliance | No centralized action log → every state-changing operation recorded in `audit_log` with actor ID, name, table, record, and timestamp — accessible only to ADMIN/MANAGER/AUDITOR |

---

## 3. Logical Roles, Authorizations & Permissions

### 3.1 Role Definitions

PharmacyOS implements six distinct roles. Permissions are stored in `pharmacy_settings` (key: `role_permissions`) as a JSON object, editable by ADMIN via the Settings screen. The fallback set is hardcoded in `usePermission.ts`.

| Role | Description | Who Holds It |
|---|---|---|
| **ADMIN** | Full system access. Manages staff, settings, security, and all operations. Can modify role permissions for all other roles. | Pharmacy owner, head pharmacist, or senior administrator |
| **MANAGER** | Operational authority. POS oversight, inventory, EOD approval, audit view, staff scheduling. Cannot change security settings or add new staff. | Pharmacy manager |
| **PHARMACIST** | Clinical operations. Prescription queue, Rx dispensing, schedule drug log, inventory. No POS or staff management access. | Licensed pharmacists |
| **TECHNICIAN** | Support clinical + retail. Prescription assistance, POS terminal, inventory management, AI document queue. No reports or staff management. | Pharmacy technicians |
| **CASHIER** | Retail-only. POS terminal and loyalty management. No Rx, inventory, reports, or admin access. | Front desk / retail cashiers |
| **AUDITOR** | Read-only compliance observer. Audit log and reports only. No operational write access of any kind. | External auditors, compliance officers |

### 3.2 Permission Matrix (Verified Against `usePermission.ts`)

| Permission Key | ADMIN | MANAGER | PHARMACIST | TECHNICIAN | CASHIER | AUDITOR |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `pos_terminal` | ✅ | ✅ | — | ✅ | ✅ | — |
| `pos_void` | ✅ | ✅ | — | — | — | — |
| `pos_closeout` | ✅ | ✅ | — | — | — | — |
| `eod_approve` | ✅ | ✅ | — | — | — | — |
| `rx_dispense` | ✅ | — | ✅ | ✅ | — | — |
| `rx_schedule_log` | ✅ | — | ✅ | — | — | — |
| `inventory_manage` | ✅ | ✅ | ✅ | ✅ | — | — |
| `reports_view` | ✅ | ✅ | ✅ | — | — | ✅ |
| `staff_manage` | ✅ | — | — | — | — | — |
| `audit_view` | ✅ | ✅ | — | — | — | ✅ |
| `settings_manage` | ✅ | ✅ | — | — | — | — |
| `loyalty_manage` | ✅ | ✅ | — | — | ✅ | — |
| `ai_queue` | ✅ | — | ✅ | ✅ | — | — |
| `timecard_manage` | ✅ | ✅ | — | — | — | — |

**Total permissions:** 14 keys. ADMIN holds all 14. AUDITOR holds 2 (read-only).

### 3.3 Enforcement Layers

Permissions are enforced at three independent layers — a single-layer failure does not expose data:

1. **Database layer (RLS):** Every table has Row-Level Security policies. Policies check `auth.jwt() ->> 'role'` against permitted role values. No query bypasses RLS from the client SDK. As of migration 036, all `auth.uid()` calls within RLS policies are wrapped as `(SELECT auth.uid())` to prevent per-row function re-evaluation.

2. **API layer (Edge Functions):** Server-side functions verify the user's JWT before any privileged operation. The Supabase service role key — which bypasses RLS — is used only inside Edge Functions and never transmitted to the browser.

3. **UI layer (RoleGuard):** The `RoleGuard` component in `App.tsx` checks the current user's permissions before rendering any route. Unauthorized routes redirect to the Access Denied (403) page rather than returning 404, which would obscure the fact that the route exists.

### 3.4 Access Denial Logging

Every access denial event is logged in real time. The `Forbidden` (403) page displays a timestamp badge — "Access denied event logged · [time]" — confirming to the user that the attempt was recorded. The audit trail entry includes the actor's ID, name, role, the attempted route, and the denial timestamp.

---

## 4. Screen Inventory — What Is Built

**Total screens confirmed built:** 39

### Authentication (5 screens)
| Screen | Route | Access |
|---|---|---|
| Login | `/login` | Public |
| Forgot Password | `/forgot-password` | Public |
| Reset Password | `/reset-password` | Public (token-gated) |
| Setup MFA | `/setup-mfa` | Authenticated |
| Verify MFA | `/verify-mfa` | Authenticated |

### Core Operations
| Screen | Route | Permission Required |
|---|---|---|
| Dashboard | `/dashboard` | Session only |
| Prescription Queue (Kanban) | `/prescriptions` | `rx_dispense` |
| New Prescription | `/prescriptions/new` | `rx_dispense` |
| Rx Detail | `/prescriptions/:id` | `rx_dispense` |
| Schedule Drug Log | `/prescriptions/schedule-log` | `rx_schedule_log` |
| Patient List | `/patients` | `rx_dispense` |
| New Patient | `/patients/new` | `rx_dispense` |
| Patient Profile | `/patients/:id` | `rx_dispense` |
| AI Document Queue | `/ai/queue` | `ai_queue` |

### Retail POS (8 screens)
| Screen | Route | Permission Required |
|---|---|---|
| POS Terminal | `/pos` | `pos_terminal` |
| Transaction Log | `/pos/transactions` | `pos_terminal` |
| Close Out | `/pos/closeout` | `pos_closeout` |
| EOD Report | `/pos/eod-report` | `eod_approve` |
| Product Catalog | `/pos/products` | `pos_terminal` |
| Retail Suppliers | `/pos/suppliers` | `inventory_manage` |
| Loyalty Program | `/pos/loyalty` | `loyalty_manage` |
| POS Reports | `/pos/reports` | `reports_view` |

### Inventory (3 screens)
| Screen | Route | Permission Required |
|---|---|---|
| Receive Stock | `/inventory/receive-stock` | `inventory_manage` |
| Stock Movements | `/inventory/stock-movements` | `inventory_manage` |
| Purchase Orders | `/inventory/purchase-orders` | `inventory_manage` |

### Staff & HR (4 screens)
| Screen | Route | Permission Required |
|---|---|---|
| My Timecard (Clock In/Out) | `/staff/timecard` | Session only |
| Manage Timecards | `/staff/timecards` | `timecard_manage` |
| Leave Requests | `/hr/leave` | Session only |
| Certifications | `/hr/certifications` | Session only |

### Reports (4 screens)
All reports carry a "Viewed by: [Name] · [Role]" session stamp. All support CSV export and print-formatted output.

| Screen | Route | Permission Required |
|---|---|---|
| Revenue Report | `/reports/revenue` | `reports_view` |
| Dispensing Report | `/reports/dispensing` | `reports_view` |
| Inventory Report | `/reports/inventory` | `reports_view` |
| Timecard Report | `/reports/timecards` | `reports_view` |

### Admin (4 screens)
| Screen | Route | Permission Required |
|---|---|---|
| Staff Management (Users) | `/admin/users` | `staff_manage` |
| Audit Log | `/admin/audit` | `audit_view` |
| Security | `/admin/security` | `staff_manage` |
| Settings | `/admin/settings` | `settings_manage` |

### Error Surfaces (2 screens)
| Screen | Route | Notes |
|---|---|---|
| Access Denied (403) | `/forbidden` | Branded; shows role; logs access denial; timestamps |
| Not Found (404) | `*` | Branded; returns to dashboard |

---

## 5. AI Integration — Current State & Expansion Path

### 5.1 What Is Live Today

**Three Supabase Edge Functions** are deployed to production (project `aeidooydivhnvwskypov`):

| Function | Purpose | Model |
|---|---|---|
| `report-assistant` | Natural-language Q&A on report data currently loaded in the UI. Answers are scoped to the visible dataset — the assistant cannot access other periods or historical records. | Claude Haiku (escalates to Sonnet if confidence < 0.70) |
| `extract-document` | AI Vision extraction of invoices and prescriptions from uploaded images. Returns structured field data with per-field confidence scores. Fields below 0.85 confidence are flagged for human review before any data is committed. | Claude Haiku (escalates to Sonnet if confidence < 0.70) |
| `summarize-audit-log` | AI-generated plain-language summaries of audit log activity. Supports compliance review and anomaly identification without requiring manual log interpretation. | Claude Haiku (escalates to Sonnet if confidence < 0.70) |

**AI controls in Settings screen:** ADMIN can configure model selection, temperature, maximum tokens, and toggle each AI function on or off — without a code deployment. All AI settings are stored in `pharmacy_settings` and read by Edge Functions at runtime.

**Prompt caching:** All three Edge Functions use `cache_control: ephemeral` to reduce repeat API costs on similar queries.

**Report Assistant positioning:** The AI chat panel is positioned above data tables (after metric cards) on Revenue and POS report pages — visible without scrolling. Toggle-based design: collapsed by default, expands on click.

### 5.2 AI Session Stamping

Report assistant responses carry a disclaimer: *"Generated by Claude Haiku based on data visible in this report. Verify against source records before acting."* This is a transparency standard — AI output is clearly labeled as AI output on every response surface.

### 5.3 AI Expansion Recommendations

| Capability | Priority | Notes |
|---|---|---|
| Extend Report Assistant to all 4 report pages | HIGH | Currently on Revenue + POS only. Inventory and Dispensing reports have equally valuable AI Q&A potential. |
| Predictive reorder alerts | HIGH | RPC `get_reorder_recommendations()` already exists. AI layer could add demand forecasting context (seasonality, historical velocity) rather than raw rule-based threshold triggers. |
| Automated audit anomaly detection | MEDIUM | `summarize-audit-log` Edge Function is deployed. UI surface for scheduled anomaly summaries (daily/weekly) is not yet built. |
| AI-assisted prescription verification | MEDIUM | Drug interaction cross-check at Rx entry. Would require an approved drug interaction database integration — not currently in scope. |
| Patient communication drafts | LOW | AI-drafted follow-up messages for Rx ready / pickup reminders. Requires JDPA consent re-review. |

---

## 6. Text Formatting & Presentation Standards

### 6.1 Current Standards (Verified)

**Reports:**
- All report pages use a consistent `PageHeader` component with title, subtitle, breadcrumb navigation, and session stamp ("Viewed by: [Name] · [Role]")
- Print output uses `PrintHeader` component: pharmacy name, address, OIC registration number, report title, period, generated timestamp, and "By: [Name] - [Role]"
- Data tables use consistent column headers, right-aligned numeric values, font-mono for financial figures, and grand total footers
- CSV export available on all report pages

**Receipt (POS):**
- Post-sale receipt modal: pharmacy name, date/time, reference number, cashier name, line items with quantities, subtotal, GCT rate and amount, total, payment method, change due, loyalty points earned
- Print-ready via `window.print()` with CSS media query that hides all non-receipt content during print

**Dates and currency:**
- All dates formatted to `en-JM` locale (Jamaican English)
- All currency formatted to JMD (Jamaican Dollar) with `Intl.NumberFormat`
- Timezone: `America/Jamaica` applied to all date/time display

### 6.2 Gaps — Text Formatting

| Gap | Recommendation |
|---|---|
| No auto-casing on free-text input fields | Add `text-capitalize` CSS or a `toTitleCase()` utility to patient name, staff name, and supplier name fields. Drug/product names should remain as entered (brand names may have non-standard casing). |
| No text alignment controls for labels and reports | Reports are left-aligned by default. Numeric columns are right-aligned. No user-adjustable alignment. Recommend keeping this as a system standard — user-controlled alignment introduces inconsistency. |
| No print preview before export | CSV export and print are immediate. A modal preview before print would reduce paper waste on large reports. |

---

## 7. Search Functionality

### 7.1 Current State (Verified)

A `GlobalSearch` component is embedded in the sidebar header. Coverage confirmed:

| Entity | Searchable Fields |
|---|---|
| Patients | Name, date of birth, NHF number |
| Products / Medications | Product name, generic name, category, barcode |
| Prescriptions | Prescription number, patient name, prescriber name |
| Staff | Full name, email, role |
| Suppliers | Supplier name |

Search results are de-duplicated by entity type, displayed in grouped result lists, and navigable via keyboard (arrow keys + Enter). All search is performed against Supabase via `ilike` pattern matching.

### 7.2 Search Gaps & Recommendations

| Gap | Severity | Recommendation |
|---|---|---|
| No search result for audit log entries | MEDIUM | Allow ADMIN/AUDITOR to search audit log by action type, actor name, or table name. Currently only filterable — not searchable. |
| No search across purchase orders | LOW | PO history page has its own inline search but not surfaced in GlobalSearch. |
| No phonetic or fuzzy matching | LOW | `ilike` requires correct spelling. A patient named "Crespo" won't match "Crepo". Consider `pg_trgm` trigram index for fuzzy matching on patient names. |
| Search result limit not displayed | LOW | Results are capped but the cap is not shown. A "Showing top 5 results — refine your search" label would set expectations. |

---

## 8. Error Pages & Access Denial Handling

### 8.1 Current State (Verified)

**403 — Access Denied (Forbidden):**
- Branded with PharmacyOS logo
- Displays the user's current role in plain language: "Your role (CASHIER) does not have permission to view this page"
- Shows the attempted route path
- Provides "Return to Dashboard" and "Go Back" navigation options
- Displays a timestamped badge confirming the access denial was logged to the audit trail
- All access denial events are recorded in `audit_log`

**404 — Not Found:**
- Branded page at wildcard route `*`
- Returns to dashboard

### 8.2 Recommendations

| Item | Recommendation |
|---|---|
| 403 page lacks contact escalation path | Add: "Contact your administrator at [admin email] to request access." The admin email should be pulled from `pharmacy_settings` so it is configurable without a code change. |
| No 500 / Server Error page | An `AppErrorBoundary` wraps the app but displays a generic error card. A branded 500 page that mirrors the 403/404 design standard should replace it. |
| Session expiry UX | The idle timeout banner (20-minute warning at 2 minutes remaining) is implemented. However, when the session expires and the user is redirected to `/login`, there is no "Your session expired" message on the login page. Recommend adding a URL parameter: `/login?reason=session_expired` and displaying a banner on Login if present. |

---

## 9. Security Architecture

### 9.1 Implemented Controls (Verified)

| Control | Status | Detail |
|---|---|---|
| Row-Level Security | ✅ ACTIVE | All tables. Policies check `auth.jwt() ->> 'role'`. Migration 036 wrapped all `auth.uid()` as `(SELECT auth.uid())` — eliminates per-row function re-evaluation performance cost. |
| TOTP MFA | ✅ AVAILABLE | Supabase Auth TOTP enrolled via `/setup-mfa`. Optional currently — not enforced for all roles. |
| Idle session timeout | ✅ ACTIVE | 20-minute idle timeout, 2-minute warning banner. Resets on any mouse, keyboard, touch, or scroll event. |
| SECURITY DEFINER search_path | ✅ FIXED | Migration 033 + 035: `SET search_path = public` applied to all 22 tenant-controlled functions. Prevents search_path injection attacks. |
| Anon EXECUTE revoked | ✅ FIXED | Migration 033: anonymous role cannot execute any SECURITY DEFINER function. |
| FK indexes | ✅ APPLIED | Migration 034: 5 partial indexes on frequently queried foreign key columns. |
| Audit log | ✅ ACTIVE | 50+ action types tracked. All access denials, CRUD operations, POS events, HR actions, and AI events logged with actor, table, record, and timestamp. |
| Password reset via email | ✅ IMPLEMENTED | Admin can trigger reset from Staff Management. User receives link. UI has show/hide password toggle. |
| Service role key isolation | ✅ CONFIRMED | Service role key used only inside Edge Functions. Never in `VITE_` environment variables. Never in client-side code. |

### 9.2 Open Security Items

| Item | Severity | Action Required |
|---|---|---|
| Leaked password protection disabled | LOW | Supabase Pro Plan feature (HaveIBeenPwned.org). Blocked by free tier. Enable when project upgrades to Pro. |
| MFA not enforced for all roles | MEDIUM | Currently optional. Recommend enforcing MFA for ADMIN and PHARMACIST roles at minimum. Config change in Supabase Auth settings — no code change needed. |
| Password reset redirect URL not whitelisted | MEDIUM | Supabase Auth → URL Configuration must include the Vercel production URL. Without this, reset email links will fail to redirect correctly. **Founder action required.** |
| Supabase-internal function search_path | INFO | ~38 remaining Security Advisor warnings are Supabase-internal (`auth`, `storage`, `realtime` schemas). Not fixable by tenant migrations. Documented — not a code defect. |

---

## 10. Testing & Quality Assurance

### 10.1 Test Suite (Verified)

**317 tests across 12 test files — all passing as of 2026-05-17.**

| Test File | Tests | Coverage Area |
|---|---|---|
| `roleGuard.test.tsx` | ~30 | Route-level access control — all 6 roles × all route types |
| `closeout-calculations.test.ts` | 30 | EOD close-out calculations — cash reconciliation, discrepancy detection |
| `rx-status-machine.test.ts` | 29 | Prescription status transitions — all valid + invalid state changes |
| `loyalty-calculations.test.ts` | 30 | Loyalty point earn/redeem calculations, edge cases |
| Timecard tests | 16 | Clock-in/out atomicity, duplicate guard, RPC failure handling |
| Other | ~182 | Remaining coverage across utilities, hooks, and components |

### 10.2 QA Gate History

| Gate | Status | Date | Notes |
|---|---|---|---|
| Gate 5 — QAS Independent Review | ✅ COMPLETE | 2026-05-15 | 6 defects D-01–D-06 found and remediated. D-03 + D-04 CRITICAL security findings fixed same session. |
| Gate 6 — ARE Technical Review | ✅ GRANTED | 2026-05-15 | All 6 defects verified. D-07 MEDIUM logged for next sprint (since closed). |
| Gate 6 — Founder Authorization | ✅ GRANTED | 2026-05-15 | Decision Log 2026-05-15-001. Staging deploy authorized. |
| WCAG 2.1 AA Audit | ⏳ PENDING | — | All 39 screens require accessibility audit before production handoff. |
| SCA Security Review (full) | ⏳ PENDING | — | Partial — security hardening sprints completed. Full formal review pending. |
| JDPA Compliance Review | ⏳ PENDING | — | Required before patient module is considered production-ready. |

### 10.3 Build Verification (Every Push)

Every push to production runs the following sequence before the subtree split push to `pharmacyos-origin`:
1. `npm run build` — TypeScript strict compilation + Vite production bundle (must pass with 0 errors)
2. Zero-error confirmation before any `git commit`
3. Subtree split push only — never a direct monorepo push to the Vercel repo

---

## 11. OS Rating & Valuation

### 11.1 Functional Ratings (Verified Against Build State)

| Dimension | Rating | Basis |
|---|---|---|
| **Completeness** | 8.5 / 10 | 39 screens built. Key gaps: Lynk payment integration, full WCAG audit, JDPA formal review, medication image library. |
| **Role Security** | 9 / 10 | 6 roles, 14 permissions, 3-layer enforcement, RLS hardened, audit trail complete. Minor: MFA not yet enforced by policy. |
| **AI Utilization** | 7 / 10 | 3 Edge Functions deployed and live. Report Assistant active on 2 of 4 report pages. Expansion path clear. Currently underutilized relative to capability. |
| **Data Integrity** | 9 / 10 | Atomic RPCs for stock and timecard operations. FK indexes applied. Audit log covers 50+ action types. Minor: migration 028 not applied to production (avatar columns blocked). |
| **UX Consistency** | 8 / 10 | PageHeader, MetricCard, StatusPill, PrintHeader consistent across all pages. Session stamp and notification panel fixes applied 2026-05-17. |
| **Search** | 7 / 10 | GlobalSearch covers 5 entity types. No fuzzy matching. Audit log not searchable. |
| **Reporting** | 8.5 / 10 | 4 standard reports + EOD + POS + Inventory with REORDER tab. CSV export on all. Print headers with user attribution. |
| **Scalability** | 8 / 10 | Supabase PostgreSQL scales horizontally. RLS performance optimized. Multi-tenant expansion requires a new ADR — by design for Phase 1 single-tenant. |
| **Integration Readiness** | 6 / 10 | Lynk payment blocked by missing API credentials. EHR integration not in scope for Phase 1. Architecture supports future integrations via Edge Functions. |

**Overall System Rating: 7.9 / 10**

### 11.2 Valuation Basis

**What has been built represents:**
- 39 production screens with full TypeScript + RLS + audit trail
- 6-role RBAC with 14 configurable permissions
- 36 database migrations with security hardening
- 3 AI Edge Functions with escalation logic and prompt caching
- 317 automated tests
- Complete prescription workflow (RECEIVED → VERIFIED → FILLED → DISPENSED)
- Schedule drug register compliant with Jamaica Dangerous Drugs Act
- JDPA patient data controls (consent capture, soft-delete, export guard)
- Real-time prescription queue (Supabase Realtime)

**Comparable pharmacy management systems** (Rx30, QS/1, PioneerRx) are licensed at USD $300–800/month for single-location pharmacies. PharmacyOS is a proprietary, owned asset — not a subscription — with full source code ownership by Winchester Global Pharmacy upon handoff.

**Cost-benefit framing:**
- Eliminates manual prescription register → reduced transcription error risk (patient safety)
- Eliminates manual stock counting → reduces shrinkage and stockout events
- Audit log and schedule drug register → reduces regulatory compliance burden
- Cashier-level access controls → prevents unauthorized Rx or void access
- Report suite → replaces manual end-of-day reconciliation

---

## 12. Identified Gaps & Recommendations

### 12.1 Priority 1 — Client/Founder Action Required (Blocked)

| Gap | Impact | Action |
|---|---|---|
| **Migration 028 not applied** | Staff portrait display blocked. `avatar_alt` and `avatar_source_status` columns don't exist in production — code workaround in place. | Apply migration 028 SQL in Supabase SQL Editor. SQL prepared and ready. |
| **Supabase redirect URL not whitelisted** | Password reset emails redirect to broken URL | Add Vercel production URL to Supabase Auth → URL Configuration |
| **Lynk payment API credentials absent** | POS payment via Lynk non-functional. Cash and card only. | Winchester Global Pharmacy must supply Lynk API key + secret |
| **Medication visual source library** | Demo placeholder images only. No production-verified product images. | Client pharmacist must approve image source before any `image_url` is marked `VERIFIED` in `products` table |
| **Custom domain** | System accessible at Vercel URL only, not `pharmacyos.winchesterglobal.com` | Client must confirm subdomain and DNS control |

### 12.2 Priority 2 — UX Improvements

| Gap | Recommendation |
|---|---|
| Session expiry — no login page message | Add `/login?reason=session_expired` URL param + banner on Login page |
| Report Assistant on Inventory + Dispensing | Expand from 2 to 4 report pages. dataSummary pattern is standardized — straightforward addition. |
| 403 page — no admin contact escalation | Pull admin email from `pharmacy_settings` and surface on access denied page |
| Fuzzy patient search | `pg_trgm` trigram index on `patients.full_name` — single migration, significant usability gain |
| Print preview modal | Preview before printing large reports to reduce paper waste |
| Session expiry countdown | Show remaining minutes (not just a warning at 2 min) in the idle timeout banner |

### 12.3 Priority 3 — AI Expansion

| Expansion | Description |
|---|---|
| Predictive reorder alerts | Layer AI demand forecasting onto `get_reorder_recommendations()` — factor in seasonality, holidays, historical velocity |
| Audit anomaly detection | Schedule a daily run of `summarize-audit-log` Edge Function against the prior 24 hours. Surface flagged patterns as Dashboard alerts for ADMIN/MANAGER. |
| Prescription verification assist | At Rx entry, flag drug combinations with known interaction risk. Requires an approved drug interaction database. |

### 12.4 Priority 4 — Compliance Completions

| Item | Status | Path to Resolution |
|---|---|---|
| WCAG 2.1 AA audit | PENDING | Run AAA accessibility agent across all 39 screens. Estimated: 1 sprint. |
| JDPA formal compliance review | PENDING | SCA (Omari) + LCA (Dorothy) must complete. Patient module not formally cleared. |
| Schedule drug log format | PENDING | Client pharmacist must sign off on field set and export format |
| MFA enforcement policy | RECOMMENDED | Enforce TOTP for ADMIN + PHARMACIST in Supabase Auth settings |

---

## 13. Why Pharmacies Should Use This OS

### Operational Argument

PharmacyOS replaces disconnected paper and manual processes with a single platform where every action is recorded, every user is identified, and every screen enforces the user's role. A cashier cannot access a prescription. A pharmacist cannot modify staff accounts. An auditor can see everything but change nothing.

This level of accountability is difficult to achieve with generic pharmacy software not built to the specific operational and regulatory context of a Jamaican pharmacy.

### Compliance Argument

The system is built around the Jamaica Pharmacy Act requirements for prescription tracking and the Dangerous Drugs Act requirements for Schedule drug logging. The JDPA patient data controls (consent capture, soft-delete, export guard) address the Jamaica Data Protection Act 2020. These are not afterthoughts — they were designed into the data model and audit trail from the first migration.

### Financial Argument

Every POS transaction is reconciled against EOD close-out. Discrepancies are flagged and logged. The audit trail records every void, every override, and every exception. Cash handling accountability is built in, not bolted on.

### AI Argument

The report assistant, document extraction, and audit summarization capabilities are not marketing features — they are functional today. A pharmacist can ask "which drug had the fastest stock depletion this week?" against the inventory report and receive an answer in seconds. An invoice can be scanned and its line items extracted with confidence scoring and human review before any stock is updated.

### Ownership Argument

PharmacyOS is a proprietary, owned asset. Upon handoff, Winchester Global Pharmacy holds full source code ownership. There is no monthly per-seat license, no vendor lock-in for features, and no dependency on a third-party pharmacy software company's pricing decisions.

---

## 14. Open Items Requiring Founder or Client Action

This section is the action register. No item here can be resolved by the build team alone.

| # | Item | Owner | Blocking |
|---|---|---|---|
| OI-01 | Apply migration 028 in Supabase SQL Editor | Founder | Staff portrait display |
| OI-02 | Add Vercel production URL to Supabase Auth → URL Configuration | Founder | Password reset email flow |
| OI-03 | Supply Lynk payment API key + secret | Winchester Global Pharmacy | Lynk POS payment |
| OI-04 | Confirm + approve medication image source library | Client Pharmacist | Production product image display |
| OI-05 | Confirm custom domain (`pharmacyos.winchesterglobal.com`) and DNS control | Winchester Global Pharmacy | Production domain |
| OI-06 | Confirm AUDITOR role is assigned to designated compliance personnel | Winchester Global Pharmacy | Compliance oversight |
| OI-07 | Enforce TOTP MFA for ADMIN + PHARMACIST roles in Supabase Auth settings | Founder / Winchester IT | Security posture |
| OI-08 | Commission WCAG 2.1 AA accessibility audit (Gate 4 pending item) | Founder / ARE | Accessibility compliance |
| OI-09 | Complete JDPA compliance review (SCA + LCA) | Founder / SCA / LCA | Patient module formal clearance |
| OI-10 | Client pharmacist sign-off on Schedule Drug Log field set and export format | Client Pharmacist | Regulatory log compliance |
| OI-11 | Decision: upgrade Supabase from free tier to Pro ($25/month) | Founder | Leaked password protection; point-in-time recovery; performance capacity |

---

## Document Control

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-05-13 | NoDrftSystems / Codex | Initial master handoff |
| 2.0 | 2026-05-17 | NoDrftSystems / Codex / SEA / QAS | Updated to reflect all sprints through 2026-05-17: auth fixes (AU-04 through AU-06), security hardening (migrations 033–036), HR module, inventory completion sprint, session stamp, notification panel fix, AI edge function upgrades, 317 test suite, revised gap analysis and open items register |

---

*PharmacyOS · Winchester Global Pharmacy Operations Platform*  
*Classification: Client Confidential — NoDrftSystems*  
*Do not distribute externally without Founder authorization*
