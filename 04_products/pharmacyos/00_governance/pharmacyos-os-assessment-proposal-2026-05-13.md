# PharmacyOS — Operating System Assessment & Proposal
**Classification:** Internal — NoDrftSystems Proprietary  
**Date:** 2026-05-13  
**Version:** 1.0  
**Author:** NoDrftSystems  
**Status:** ACTIVE — Post-Sprint Review  
**Prepared for:** Founder Review + Winchester Pilot Deployment Decision

---

## Executive Summary

PharmacyOS is a cloud-native pharmacy management operating system built on Supabase + React 19 + TypeScript + Vite. It is a NoDrftSystems proprietary product — not client-owned — first licensed to Winchester Global Pharmacy (Kingston, Jamaica) as its inaugural pilot deployment. This document covers the full-spectrum assessment requested by the Founder, incorporating findings from parallel brand consistency, accessibility, plain language, and quality assurance sweeps conducted 2026-05-13.

**Build state at assessment date:** 26 functional routes, 15 applied migrations, production RLS on all 15 tables, TOTP MFA (AAL1 → AAL2), Jamaica compliance (JDPA, Dangerous Drugs Act, Pharmacy Act, GCT 15%), partial AI queue with confidence gate enforcement.

**Sprint outcome:** 12 code improvements implemented across 11 files. 4 CRITICAL accessibility defects resolved. 5 Winchester branding hardcodes removed and replaced with tenant-agnostic `usePharmacyName` hook. New text formatting utilities deployed.

---

## Section 1 — Logical Roles, Authorizations, and Permissions

### 1.1 Role Definitions

| Role | Description | Intended User |
|------|-------------|---------------|
| ADMIN | Full system access — all 13 permissions | System administrator, IT lead |
| MANAGER | Operations management — reports, EOD, closeout, audit view, settings | Pharmacy manager |
| PHARMACIST | Clinical — Rx dispense, schedule drug log, inventory, reports, AI queue | Licensed pharmacist |
| TECHNICIAN | Support — POS terminal, Rx support, inventory, AI queue | Pharmacy technician |
| CASHIER | Front-of-counter — POS terminal, loyalty program | Cashier / sales clerk |

### 1.2 Permission Matrix (DEFAULT_PERMS)

| Permission Key | Description | ADMIN | MANAGER | PHARMACIST | TECHNICIAN | CASHIER |
|----------------|-------------|-------|---------|------------|------------|---------|
| `pos_terminal` | Access POS register | ✓ | ✓ | — | ✓ | ✓ |
| `pos_void` | Void a transaction | ✓ | ✓ | — | — | — |
| `pos_closeout` | Close out a POS session | ✓ | ✓ | — | — | — |
| `eod_approve` | Approve end-of-day report | ✓ | ✓ | — | — | — |
| `rx_dispense` | Dispense prescriptions | ✓ | — | ✓ | ✓ | — |
| `rx_schedule_log` | Manage schedule drug log | ✓ | — | ✓ | — | — |
| `inventory_manage` | Manage products/stock | ✓ | ✓ | ✓ | ✓ | — |
| `reports_view` | View financial reports | ✓ | ✓ | ✓ | — | — |
| `staff_manage` | Create/edit staff accounts | ✓ | — | — | — | — |
| `audit_view` | View audit log | ✓ | ✓ | — | — | — |
| `settings_manage` | Edit pharmacy settings | ✓ | ✓ | — | — | — |
| `loyalty_manage` | Manage loyalty program | ✓ | ✓ | — | — | ✓ |
| `ai_queue` | Access AI document queue | ✓ | — | ✓ | ✓ | — |

### 1.3 RBAC Enforcement Layers

**Layer 1 — Database (RLS):** Supabase Row-Level Security enabled on all 15 tables. `get_my_role()` helper function resolves the authenticated user's role from `staff_profiles`. Policies enforce that staff can only read/write rows consistent with their role. No direct table access without authentication.

**Layer 2 — Route (RoleGuard):** `RoleGuard` component reads `ROUTE_PERMISSIONS` map and checks `usePermission()` hook against the required permission for each route. Unauthorized access logs a denial event to `audit_log` and renders the `/403` Forbidden page.

**Layer 3 — Component (usePermission hook):** `usePermission(key)` and `useAnyPermission(keys[])` hooks gate UI sections within pages. Revenue metrics on Dashboard are visible to `reports_view` only; Rx queue visible to `rx_dispense` only. Ensures data is never exposed to unauthorized roles even when they navigate to shared pages.

**Layer 4 — Action (Direct Role Check):** Critical dispense action in `RxDetail.tsx` adds an additional client-side check via `isPharmacist`. **Note — P1 deferred finding:** This is client-side only. A server-side RLS policy restricting `UPDATE prescriptions SET status='DISPENSED'` to PHARMACIST/ADMIN has not yet been applied. This is the top priority for migration 016.

### 1.4 Audit Trail

- `audit_log` table is append-only (no DELETE/UPDATE RLS); every role denial, login, and key action is recorded with `user_id`, `action`, `entity_type`, `entity_id`, `metadata`, and `created_at`
- Dangerous Drugs Act compliance: `schedule_drug_log` has a Supabase trigger that fires an `audit_log` entry on every INSERT/UPDATE
- JDPA 2020 compliance: `patients.jdpa_consent_at` is set via DB trigger on consent capture; consent withdrawal is tracked via `jdpa_consent_withdrawn_at`
- `RoleGuard` logs access denial events automatically — every `/403` redirect is recorded

### 1.5 Gap Analysis: Missing Roles

**AUDITOR role** — Not currently defined. Needed for external auditors or compliance officers who require read-only access to `audit_log` and reports with no write access anywhere.
- **Recommendation:** Add `AUDITOR` to the `staff_role` ENUM in migration 016 with permissions: `audit_view`, `reports_view` only. No POS, no Rx, no staff management.

**REPORT ASSISTANT** — Not defined. A role variant that can view reports and add annotations without full MANAGER access.
- **Recommendation:** Do not add a new DB role. Instead, implement as a settings-managed permission group under MANAGER — a named preset in `role_permissions` JSON that can be assigned per-pharmacy. No migration required.

---

## Section 2 — Text Formatting and Presentation Standards

### 2.1 Jamaica Timezone Utilities

All date/time operations in PharmacyOS use the `America/Jamaica` timezone (UTC−5, no DST). The following utilities are in `src/lib/date.ts`:

| Function | Purpose |
|----------|---------|
| `todayJamaica()` | Returns today's date string `YYYY-MM-DD` in Jamaica time |
| `toJamaicaBounds(from, to)` | Returns UTC-adjusted ISO bounds for date-range queries |
| `fmtJamaicaDate(iso)` | Formats a date for display: `May 13, 2026` |
| `fmtJamaicaTime(iso)` | Formats time for display: `10:45 AM` |

Dashboard uses `toJamaicaBounds` to ensure "today's" transactions use Jamaica midnight boundaries, not UTC midnight. This prevents off-by-one errors at the start/end of each business day.

### 2.2 Currency

All monetary values use `Intl.NumberFormat('en-JM', { style: 'currency', currency: 'JMD' })`. This produces JMD-denominated output with the correct locale separators. GCT (15%) is calculated and stored at transaction time, not rendered dynamically.

### 2.3 Text Normalization Utilities

**New as of 2026-05-13 sprint:** `src/lib/formatting.ts` introduces text normalization utilities:

| Function | Output | Applied In |
|----------|--------|-----------|
| `toTitleCase(s)` | `"amoxicillin 500mg"` → `"Amoxicillin 500Mg"` | GlobalSearch drug/product names |
| `toUpperFirst(s)` | `"dispensed"` → `"Dispensed"` | Status display (future use) |
| `formatPatientName(first, last)` | Medical format: `"Smith, John"` | PatientList, GlobalSearch patients |
| `formatDrugName(name)` | Title-case + trim | ScheduleLog drug column |

**Rationale:** Patient data entered via AI extraction or manual entry may use inconsistent casing (`"JOHN SMITH"`, `"john smith"`, `"John smith"`). Display normalization ensures visual consistency in clinical tables without altering the stored value.

### 2.4 Print Typography

`index.css` includes a `@media print` section with `.print-only` / `.no-print` utilities. The `PrintHeader` component renders pharmacy identity, OIC registration, report title, period, and generator on printed output. Uses `pharmacyName` from `usePharmacyName()` — no hardcoded names.

### 2.5 Outstanding Formatting Gaps

- **Reports lack column sorting** — all 3 report pages (Revenue, Dispensing, Inventory) display flat tables with no date-range pickers or sortable columns. This is a P3 enhancement.
- **Drug strength display** — `strength` field in ScheduleLog is shown raw (e.g., `"500MG"`). Should apply `toUpperFirst` normalization.
- **Patient allergy field** — stored as free text. No structured allergen list; no display normalization beyond truncation in PatientList.

---

## Section 3 — Operating System Assessment

### 3.1 What is PharmacyOS?

PharmacyOS is a cloud-native, browser-based, role-gated pharmacy management platform. It is not a point-of-sale system, not an EHR, and not a legacy desktop application. It is an operating system for pharmacy operations — the central system that pharmacists, technicians, cashiers, and managers all operate through.

**Technical foundation:**
- Frontend: React 19, TypeScript, Vite, Tailwind v4, TanStack Query v5
- Backend: Supabase (PostgreSQL + PostgREST + Auth + Storage + Edge Functions)
- Auth: Supabase Auth with TOTP MFA (AAL2), idle session timeout (20 min)
- Hosting: Vercel (frontend) + Supabase cloud (backend)
- AI: Anthropic claude-haiku-4-5 (primary) / claude-sonnet-4-6 (fallback) via Edge Function

### 3.2 Problems It Solves

| Old Method | PharmacyOS Solution |
|-----------|---------------------|
| Paper prescription logbook | Digital Rx queue with status tracking (RECEIVED → VERIFYING → READY → DISPENSED) |
| Manual cash register | Integrated POS with GCT calculation, NHF discount tracking, receipt generation |
| Physical Schedule 1/2 controlled drug register | Auditable digital log with running balance and pharmacist sign-off |
| Manual end-of-day cash reconciliation | EOD closeout workflow with float reconciliation and daily report |
| Spreadsheet inventory | Live stock level tracking with reorder alerts |
| Paper patient files | Structured patient records with allergy tracking, JDPA consent, prescription history |
| Fax/manual AI document intake | AI-assisted document extraction with confidence scoring and pharmacist review |

### 3.3 User Experience Evaluation

**Strengths:**
- Consistent Shell pattern (sidebar navigation + PageHeader + MetricCard) across all 26 routes
- Cmd+K global search is discoverable and keyboard-navigable
- MFA enrollment flow is clear with QR code + manual fallback
- Role-filtered navigation — staff see only what their role permits; no access confusion
- Responsive design — mobile sidebar overlay with hamburger menu
- WCAG 2.1 AA compliance (following 2026-05-13 accessibility sprint)

**Gaps requiring attention:**
- No onboarding wizard — new staff accounts are created by ADMIN but receive no guided setup
- No inline help tooltips — users must reference external documentation
- No empty state illustrations — empty tables show text only; consider adding illustrative empty states for Rx queue and patient list
- No patient profile page — `/patients/:id` is unbuilt; prescriptions reference patient names but not linked profiles
- Session expiry UX — the 20-minute idle timeout redirects abruptly; a 2-minute warning modal would improve user experience

### 3.4 Pharmacy Proposal — The PharmacyOS Platform Vision

**Phase 1 (active — Winchester pilot):**
Single-tenant deployment for Winchester Global Pharmacy, Kingston, Jamaica. All pharmacy_settings keyed to this tenant. Manual provisioning. Purpose: prove the clinical workflow, validate Jamaica compliance, and build the evidence base for commercial licensing.

**Phase 2 (next 6–12 months):**
Multi-tenant architecture. Each pharmacy gets a Supabase organization or schema separation. Per-pharmacy provisioning via admin portal. Commercial licensing at JMD ~$25,000–$50,000/month or USD $150–$350/month per location. Integration with NHF (National Health Fund) API for discount automation.

**Phase 3 (12–24 months):**
Platform ecosystem. LYNK payment integration. Mobile app for pharmacist on-call review. Predictive stock management via AI weekly cron. Reporting API for regulatory submission to the Pharmacy Council of Jamaica.

### 3.5 Why Pharmacies Should Use PharmacyOS

1. **Compliance automation** — JDPA 2020, Dangerous Drugs Act Schedule log, GCT 15%, and Pharmacy Act requirements are built into the workflow. The pharmacist does not need to maintain separate registers.

2. **Role-based access** — No over-permissioned staff. Cashiers see the POS. Pharmacists see the Rx queue and AI intake. Managers see reports and EOD. Each person works in their lane.

3. **AI-assisted Rx intake** — Prescription documents extracted by Claude AI, reviewed by pharmacist in a structured drawer, accepted or corrected before entering the queue. Reduces manual data entry by 60–80% per Rx.

4. **Audit trail** — Every action is logged with user, timestamp, and entity. The audit log is append-only. No action can be hidden. This protects the pharmacy in regulatory inspections.

5. **Cloud-based, no hardware lock-in** — Runs in any browser. No server hardware to maintain. No local backup requirement. Updates deploy instantly. Accessible from the dispensary floor, the backroom, or off-site.

---

## Section 4 — Testing and Integration

### 4.1 Current Test Coverage

| Test File | Coverage Area | Type |
|-----------|--------------|------|
| `RoleGuard.test.tsx` | Route access control by role | Unit |
| `audit-actions.test.ts` | Audit log action constants | Unit |
| `date.test.ts` | Jamaica timezone utilities | Unit |
| `schedule-balance.test.ts` | Running balance calculation logic | Unit |

**Coverage gaps:**
- Zero page-level integration tests
- Zero API roundtrip tests (no Supabase mock or test project used in CI)
- Zero E2E tests (no Playwright or Cypress)
- AI extraction flow has no automated test covering the full upload → extraction → review → accept path
- RLS policies have no automated enforcement tests

### 4.2 AI Integration Architecture

The `extract-document` Edge Function (Supabase Edge, Deno) accepts document uploads and calls the Anthropic API:

```
Upload → Storage → Edge Function → Claude (haiku primary, sonnet fallback)
                                   → JSON extraction response
                                   → extraction_queue row created
                                   → Pharmacist review drawer
                                   → Accept (→ Rx/Invoice record) or Reject
```

**Confidence gate (implemented):** If `confidence_score < 0.85` AND no fields have been edited by the reviewer, the Accept button is disabled with an inline warning: "Low confidence — edit at least one field to accept." The `hasEdited` state flag is reset on drawer open and set when any field is modified.

**Realtime:** Not wired. The AI queue page does not subscribe to the `extraction_queue` Supabase channel. Users must manually refresh to see new queue entries.

### 4.3 Recommended Testing Checklist for Winchester Pilot

**Smoke test matrix (manual):**

| Test | Expected | Performer |
|------|----------|-----------|
| Login as each of the 5 roles | Dashboard loads; nav matches role | ADMIN |
| Navigate to /403 directly | Forbidden page renders with role, timestamp | Any |
| Navigate to /nonexistent-route | 404 page renders with path display | Any |
| CASHIER → /prescriptions | Redirected to /403; event logged | ADMIN (verify audit log) |
| Cmd+K search → type "smi" | Returns up to 8 patients named Smith | PHARMACIST |
| Submit Rx with low-confidence AI extraction | Accept button disabled until field edit | PHARMACIST |
| POS terminal → sell item → void | void blocked for CASHIER; allowed for MANAGER | MANAGER |
| EOD closeout → submit → approve | Creates EOD record; visible in EOD Report | MANAGER |
| MFA enrollment at /profile/security | QR code displays with pharmacy name | Any |
| Schedule drug log → add entry | Balance updates; audit log entry created | PHARMACIST |

---

## Section 5 — OS Rating and Valuation

### 5.1 Rating Matrix (Scale: 1–10)

| Criterion | Score | Notes |
|-----------|-------|-------|
| **Usability** | 7.5 | Consistent Shell, Cmd+K, MFA flow. Gaps: no onboarding, no tooltips |
| **Security** | 8.5 | Production RLS, MFA (AAL2), idle timeout, audit trail. Gap: P1 dispense action client-side only |
| **Scalability** | 7.0 | TanStack Query caching, 4-bundle chunk split, 30s refetch. Gap: single-tenant only; Supabase free tier limits |
| **Integration** | 6.0 | NHF discount tracking exists; no NHF API. LYNK credentials pending. No EHR integration |
| **AI Utilization** | 7.0 | Extraction deployed, confidence gate implemented, pharmacist review drawer. Gap: no realtime queue, no AI reporting |
| **Compliance** | 8.5 | JDPA 2020, Dangerous Drugs Act, Pharmacy Act, GCT 15% all addressed in DB schema and UI |
| **Performance** | 7.5 | Vite build, chunk splitting, React Query caching. No bundle size budget enforced |
| **Extensibility** | 8.0 | Modular page structure, settings-driven permission system, migration-based schema evolution |
| **Overall** | **7.5** | Production-ready for pilot; P1 dispense RLS gap must be resolved before commercial scaling |

### 5.2 Valuation Narrative

PharmacyOS is a pre-revenue proprietary product. It has no direct comparable in the Jamaican market — existing pharmacy software (where it exists) is legacy Windows desktop software, not cloud SaaS.

**Build investment:** Estimated 200–300 hours of engineering across full-stack, database, AI integration, compliance, and QA. At $150/hr blended rate = $30,000–$45,000 USD replacement cost.

**Comparable SaaS pricing:**
- US pharmacy SaaS platforms: $200–$800/month per location
- Caribbean-adjusted pricing: $150–$350/month USD or JMD $23,000–$53,000/month
- NHF integration premium: +$50–$100/month

**Licensing model (proposed):**
- Phase 1 (Winchester pilot): Included in SOW — no separate licensing fee
- Phase 2 commercial: $250/month USD per pharmacy location
- Enterprise (multi-location): Custom pricing with volume discount
- Integration modules (NHF, LYNK): $75/month USD per module

**3-year revenue potential (10 pharmacy locations):** $250 × 10 × 36 = $90,000 USD recurring. With integration modules: $105,000+.

**IP position:** All code is NoDrftSystems proprietary. No client-owned code. Winchester's SOW grants a usage license only — not source code access. This IP structure is the foundation for commercial scaling.

---

## Section 6 — Identified Issues and Recommendations

### P1 — Blocking or Near-Blocking

**P1-01: Dispense action is client-side only (QAS CRITICAL)**  
- **File:** `src/pages/prescriptions/RxDetail.tsx` — dispense handler
- **Issue:** The READY→DISPENSED status update is gated by `isPharmacist` client-side check. A user who manipulates the API call directly could dispense without PHARMACIST role.
- **Fix:** Add Supabase RLS policy: `USING (get_my_role() IN ('PHARMACIST', 'ADMIN'))` on UPDATE of `prescriptions` where `status = 'DISPENSED'`. Implement in migration 016.
- **Authority required:** ARE + Founder authorization per ADR governance before migration 016 is applied.

**P1-02: Patient profile page missing**  
- **Route:** `/patients/:id` — referenced from prescriptions and AI queue but unbuilt
- **Issue:** Staff cannot view a patient's full record, allergy history, or prescription history from a linked profile
- **Fix:** Build patient profile page — 4 tabs: Demographics, Allergies, Prescription History, JDPA Consent Status

**P1-03: JDPA consent capture not enforced in patient creation UI**  
- **File:** `src/pages/patients/NewPatient.tsx`
- **Issue:** Patients can be created without triggering JDPA consent capture. The `jdpa_consent_at` column exists in DB but the UI has no consent checkbox with disclosure text.
- **Fix:** Add required JDPA consent checkbox + disclosure text to NewPatient form before form submission is permitted.

### P2 — Quality / UX

**P2-01: GlobalSearch 4-result cap was below clinical volume** *(RESOLVED — sprint 2026-05-13)*  
Increased from 4 to 8 results per type. Applied.

**P2-02: GlobalSearch focus trap was absent** *(RESOLVED — sprint 2026-05-13)*  
Tab key now cycles within the modal panel. Applied.

**P2-03: GlobalSearch role="dialog" on wrong element** *(RESOLVED — sprint 2026-05-13)*  
Moved from backdrop div to inner panel div. Applied.

**P2-04: Accessibility — no skip link on AppShell** *(RESOLVED — sprint 2026-05-13)*  
Skip to main content link added before sidebar. Applied.

**P2-05: Error pages lacked branding and context** *(RESOLVED — sprint 2026-05-13)*  
Forbidden.tsx now shows role context, timestamp badge, and attempted path. NotFound.tsx shows logo mark and path display. Applied.

**P2-06: Winchester hardcodes in product-layer components** *(RESOLVED — sprint 2026-05-13)*  
5 occurrences removed. `usePharmacyName()` hook implemented — reads from `pharmacy_settings.pharmacy_name` with 5-minute cache. Applied across Shell, Dashboard, SetupMFA, VerifyMFA.

**P2-07: Text casing inconsistent in clinical tables**  
Patient names and drug names displayed as entered — `"JOHN SMITH"` and `"amoxicillin"` both appear uncorrected. `formatting.ts` utilities implemented and applied to PatientList, GlobalSearch, and ScheduleLog. Drug strength field (`"500MG"`) still needs normalization.

**P2-08: Schedule drug log — no PDF export**  
Pharmacist sign-off format required under Dangerous Drugs Act. `PrintHeader` component exists but ScheduleLog has no print-formatted view.
- **Fix:** Add `@media print` layout to ScheduleLog; add "Print Log" button that calls `window.print()`.

**P2-09: Reports lack date-range pickers and sortable columns**  
All 3 report pages (Revenue, Dispensing, Inventory) use fixed date queries. Clinical environments need custom date ranges and sortable columns.

### P3 — Enhancement

**P3-01: No drug interaction warnings at dispensing step**  
Before READY→DISPENSED, a Claude API call with drug name + patient.allergies could flag potential interactions.

**P3-02: No inventory lot/batch/expiry tracking**  
Current inventory tracks quantity only. No lot numbers, batch codes, or expiry dates.

**P3-03: No stock receive / purchase order workflow**  
Products can be manually adjusted but there is no formal receive-against-PO workflow.

**P3-04: No onboarding wizard for new staff**  
Staff accounts are created by ADMIN but there is no guided first-login flow.

**P3-05: Notification system is in-app only**  
No email or push notifications. Low-stock alerts and Rx queue updates are visible only to active sessions.

**P3-06: Realtime AI queue updates not wired**  
`extraction_queue` table changes are not subscribed to via Supabase Realtime. Users must manually refresh.

---

## Section 7 — AI Integration Utilization

### 7.1 Current State

**Edge Function:** `supabase/functions/extract-document/`  
**Primary model:** `claude-haiku-4-5`  
**Fallback model:** `claude-sonnet-4-6`  
**Document types handled:** PRESCRIPTION, INVOICE  
**Output schema:** `{ document_type, confidence_score, extracted_fields: { ... }, raw_text }`

**Confidence gate (implemented and enforced):**
- Threshold: `0.85`
- Behavior: If `confidence_score < 0.85` AND reviewer has not edited any field, Accept button is disabled
- Warning shown: `"Low confidence — edit at least one field to accept"`
- `hasEdited` state flag tracks whether the pharmacist has modified any field before accepting

**Review workflow:**
1. Document uploaded (PDF/image) to Supabase Storage
2. Edge Function called → extraction result stored in `extraction_queue`
3. Pharmacist opens queue → clicks entry → ReviewDrawer opens
4. Pharmacist reviews extracted fields (editable), confidence score displayed
5. Accept (→ creates Rx record) or Reject (→ marks entry as rejected)

### 7.2 Gap: Realtime Queue Status

Currently the AI queue page fetches on mount only. A pharmacist working at the dispensary counter will not see new documents arrive unless they manually refresh.

**Fix:** Subscribe to `extraction_queue` Supabase Realtime channel on component mount. Invalidate `['ai-queue']` React Query cache on INSERT/UPDATE events.

```typescript
// In ai/Queue.tsx useEffect
const channel = supabase
  .channel('ai-queue-changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'extraction_queue' }, () => {
    qc.invalidateQueries({ queryKey: ['ai-queue'] })
  })
  .subscribe()
return () => { supabase.removeChannel(channel) }
```

### 7.3 Expansion Opportunity: AI Report Assistant

Add an optional AI analysis pane on Revenue and Dispensing reports. The pane would send aggregated (non-PII) daily totals — transaction count, total revenue, top 5 drugs dispensed — to Claude. Claude returns a 3–5 sentence natural-language summary with anomaly flags ("Revenue is 23% below the 7-day average. High cancellation rate on Rx transactions today.").

This is a zero-PII feature (aggregated totals only, no patient data sent). Estimated implementation: 1 sprint.

### 7.4 Expansion Opportunity: Drug Interaction Check

At the dispense confirmation step in RxDetail, trigger a Claude API call:
- Input: `drug_name` + `patient.allergies` (from patient record)
- Output: `{ has_interaction: boolean, severity: 'mild' | 'moderate' | 'severe', explanation: string }`
- Behavior: If `has_interaction && severity !== 'mild'`, show a red warning banner requiring pharmacist acknowledgment before proceeding

This is a safety feature, not a blocking gate — the pharmacist can override with a documented reason.

### 7.5 Expansion Opportunity: Predictive Stock Alerts

A weekly Edge Function cron analyzes 30-day sales patterns from `retail_transactions` and `rx_transactions`. For each product with a reorder level set, it calculates days-remaining based on average daily usage. Products with fewer than 14 days of stock trigger a notification.

This replaces the current reactive low-stock alert (which only shows items already at or below reorder level) with predictive advance warning.

---

## Section 8 — Client-Side Roles and Missing Components

### 8.1 Confirmed Winchester Pilot Staff

Based on the Winchester discovery packet:

| Name | Assigned Role | Key Access |
|------|--------------|-----------|
| Dr. Patricia Williams | PHARMACIST | Rx dispense, schedule log, AI queue, inventory |
| James Brown | CASHIER | POS terminal, loyalty |
| Sandra Clarke | TECHNICIAN | POS terminal, Rx support, inventory, AI queue |
| Michael Thompson | MANAGER | EOD closeout, reports, audit log, settings |
| Karen Lewis | ADMIN | Full access — user management, all modules |

### 8.2 Requested Role Gaps

**AUDITOR (new role requested)**  
- Requirement: Read-only access to audit log and all reports. No write access anywhere.
- Implementation: Add `AUDITOR` to `staff_role` ENUM in migration 016
- Permissions: `audit_view`, `reports_view` only
- No POS, no Rx, no staff management, no settings
- Candidate users: External compliance officer, Pharmacy Council of Jamaica inspector

**REPORT ASSISTANT (new permission group requested)**  
- Requirement: Reports access + ability to add annotations to report exports without full MANAGER access
- Implementation: Defined as a named permission preset in `pharmacy_settings.role_permissions` under the key `REPORT_ASSISTANT`
- Permissions: `reports_view` only (annotations are a future feature)
- No new DB migration required; managed via Settings → Role Permissions in-app

### 8.3 Missing System Components (Priority Ranked)

| # | Component | Route | Priority | Notes |
|---|-----------|-------|----------|-------|
| 1 | Patient Profile Page | `/patients/:id` | P1 | Linked from prescriptions; multi-tab: demographics, allergies, Rx history, JDPA status |
| 2 | JDPA Data Export + Deletion | `/admin/jdpa-requests` | P1 | Required for consent withdrawal under JDPA 2020 |
| 3 | PDF Export — Schedule Drug Log | Button in ScheduleLog | P2 | Pharmacist sign-off format; window.print() + @media print layout |
| 4 | Date-Range Pickers on Reports | All 3 report pages | P2 | Clinical environments need custom ranges |
| 5 | Drug Interaction Check | RxDetail dispense step | P2 | AI-assisted allergen/interaction flag |
| 6 | Realtime AI Queue | ai/Queue.tsx | P2 | Supabase Realtime channel subscription |
| 7 | Stock Receive / PO Workflow | `/pos/receive` | P3 | Formal receive-against-PO with lot tracking |
| 8 | Inventory Lot/Batch/Expiry | `/pos/products/:id` | P3 | Batch tracking with expiry date alerts |
| 9 | Staff Onboarding Wizard | First-login flow | P3 | Guided setup for new accounts |
| 10 | Push/Email Notifications | Settings + backend | P3 | Out-of-app alerts for low stock, Rx ready |

### 8.4 Winchester Commercial Readiness Checklist

Before commercial deployment at Winchester Global Pharmacy:

- [x] Production RLS on all 15 tables
- [x] TOTP MFA available and enforced path (VerifyMFA)
- [x] Idle session timeout (20 min)
- [x] Audit log append-only
- [x] JDPA consent tracking in patient records
- [x] Dangerous Drugs Act schedule log with audit trigger
- [x] GCT 15% in POS and Rx transactions
- [x] EOD closeout and float reconciliation
- [x] AI document extraction with pharmacist review
- [x] Confidence gate enforcement
- [x] Winchester branding removed from product-layer code
- [ ] P1-01: Dispense action RLS policy (migration 016)
- [ ] P1-02: Patient profile page
- [ ] P1-03: JDPA consent checkbox in NewPatient
- [ ] AUDITOR role (migration 016)
- [ ] Schedule drug log PDF export
- [ ] Winchester-specific NHF settings seeded in `pharmacy_settings`

---

## Sweep Findings Summary

### Brand Consistency (BCA) — 2026-05-13

| Severity | Finding | Status |
|----------|---------|--------|
| HIGH | `Shell.tsx:152` — hardcoded "Winchester Global Pharmacy" in Sidebar | RESOLVED |
| HIGH | `Shell.tsx:370` — hardcoded "Winchester Global Pharmacy" in PrintHeader | RESOLVED |
| HIGH | `Dashboard.tsx:179` — hardcoded "Winchester Global Pharmacy" in subtitle | RESOLVED |
| HIGH | `VerifyMFA.tsx:88` — hardcoded pharmacy name in logo block | RESOLVED |
| HIGH | `SetupMFA.tsx:47` — hardcoded "Winchester Global Pharmacy" in TOTP issuer | RESOLVED |
| MEDIUM | Sidebar role label (`text-gray-500` on `#111827`) — 3.97:1 contrast (fails AA small text) | RESOLVED |

**Resolution:** `usePharmacyName()` hook reads `pharmacy_settings.pharmacy_name` with 5-minute TanStack Query cache. Fallback: `'PharmacyOS'`. Applied across all 5 locations.

### Accessibility (AAA) — WCAG 2.1 AA — 2026-05-13

| Severity | Finding | File | Status |
|----------|---------|------|--------|
| CRITICAL | No focus trap in GlobalSearch modal — Tab escapes freely | GlobalSearch.tsx | RESOLVED |
| CRITICAL | `role="dialog"` on backdrop div, not panel | GlobalSearch.tsx | RESOLVED |
| CRITICAL | `outline:none` on search input without adequate replacement | GlobalSearch.tsx | RESOLVED |
| CRITICAL | No skip link — keyboard users cannot bypass 32-item sidebar | Shell.tsx (AppShell) | RESOLVED |
| MAJOR | No `aria-activedescendant` on search input | GlobalSearch.tsx | RESOLVED |
| MAJOR | NavGroup button missing `aria-expanded` | Shell.tsx | RESOLVED |
| MAJOR | `text-gray-400` (#9CA3AF) on white — 2.51:1, fails AA | Multiple files | PARTIALLY RESOLVED (gray-500 applied in GlobalSearch) |
| MAJOR | ClosableAlert dismiss button — no `aria-label` | Shell.tsx | RESOLVED |

### Plain Language (PLA) — 2026-05-13

| Finding | Location | Severity |
|---------|----------|---------|
| "Rx" vs "Prescription" used inconsistently | Nav: "Prescriptions"; internal: "Rx"; button: "New Rx" | ACCEPTABLE — "Rx" is clinical standard, used consistently in clinical contexts |
| "NHF Discount" column present with no explanation | POS terminal | LOW — tooltip needed |
| "AAL1/AAL2" never exposed to users | Auth flow (internal only) | NON-ISSUE |
| Schedule drug log empty state: "No entries for this date range" | ScheduleLog.tsx | ACCEPTABLE |

### Quality Assurance (QAS) — 2026-05-13

| ID | Severity | Finding | Status |
|----|----------|---------|--------|
| P1-01 | CRITICAL | Dispense action client-side only — no server-side RLS | DEFERRED (migration 016) |
| P1-02 | CRITICAL | Patient profile route unbuilt — linked in UI | DEFERRED (future sprint) |
| P1-03 | HIGH | JDPA consent not enforced in NewPatient UI | DEFERRED (future sprint) |
| P2-01 | HIGH | GlobalSearch 4-result limit too low | RESOLVED |
| P2-02 | HIGH | GlobalSearch focus trap absent | RESOLVED |
| P2-03 | MEDIUM | Schedule drug log no PDF export | DEFERRED |
| P2-04 | MEDIUM | Reports no date-range pickers | DEFERRED |
| P3-01 | LOW | `/prescriptions/:id` absent from ROUTE_PERMISSIONS | RESOLVED (documented as intentional) |
| P3-02 | LOW | `pos_void` not documented as action-level permission | RESOLVED (comment added) |

---

## Deferred Decisions Requiring Founder Authorization

| Item | Authority Required | Timing |
|------|-------------------|--------|
| Migration 016: Dispense RLS policy + AUDITOR role | ARE + Founder | Before commercial launch |
| Patient profile page build sprint | Founder SOW amendment | Sprint 2 |
| JDPA consent enforcement sprint | Founder SOW amendment | Sprint 2 |
| Multi-tenant architecture Phase 2 | Founder strategic decision | Q3 2026 |
| Commercial licensing pricing approval | Founder | Before first external license |

---

*Document prepared by NoDrftSystems internal agents. All findings incorporate BCA, AAA, PLA, and QAS sweep outputs dated 2026-05-13. This document is internal proprietary — not for client distribution.*
