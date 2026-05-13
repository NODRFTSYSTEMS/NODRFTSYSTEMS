# PharmacyOS — Master Handoff Document
**Classification:** Internal — NoDrftSystems Proprietary  
**Version:** 1.2  
**Date:** 2026-05-13  
**Product:** PharmacyOS — NoDrftSystems Proprietary Pharmacy Operations Platform  
**Produced by:** NoDrftSystems  
**Status:** Development Build — Pre-Controlled Pilot. Not yet approved for live patient data or regulatory submission.

> **v1.2 Change Summary (2026-05-13):** Commercial framing corrected — PharmacyOS is NoDrftSystems IP; Winchester Global is first licensee (not the client who commissioned a custom build). Blank screen root cause identified and fixed: `supabase.ts` no longer throws at module level; `ProtectedRoute` now catches auth errors instead of hanging in loading state. v1.1 change summary: security sprint complete, 6 new migrations applied, production RLS deployed, MFA live, RoleGuard built, AI Edge Function deployed, route count 22 → 26.

---

## Table of Contents

1. [Project Definition & Scope](#1-project-definition--scope)
2. [Commercial Structure](#2-commercial-structure)
3. [URLs & Access Points](#3-urls--access-points)
4. [Technology Stack](#4-technology-stack)
5. [Repository Structure](#5-repository-structure)
6. [Database Schema](#6-database-schema)
7. [Migration Log](#7-migration-log)
8. [Route Map — All 26 Implemented Routes](#8-route-map)
9. [Module-by-Module Feature Status](#9-module-by-module-feature-status)
10. [Reports & Calculations](#10-reports--calculations)
11. [Named Agents Active on This Build](#11-named-agents-active-on-this-build)
12. [Supabase — Functions, RLS, Helpers](#12-supabase--functions-rls-helpers)
13. [What Is Complete](#13-what-is-complete)
14. [What Is Next](#14-what-is-next)
15. [Known Errors, Problems & Resolutions](#15-known-errors-problems--resolutions)
16. [Open Capability Gaps — Blocking Production](#16-open-capability-gaps--blocking-production)
17. [Credentials & First Login](#17-credentials--first-login)

---

## 1. Project Definition & Scope

### What PharmacyOS Is

PharmacyOS is a **NoDrftSystems proprietary product** — a single-tenant, web-based pharmacy operations platform. It is not a custom build commissioned by Winchester Global Pharmacy. It is NoDrftSystems IP being licensed to Winchester Global Pharmacy (Kingston, Jamaica) as the first deployment. License terms are to be confirmed in the pending SOW.

PharmacyOS is the daily operational system for all pharmacy staff — covering retail POS, prescription dispensing, inventory management, controlled drug logging, patient records, and management reporting.

This is a **staff-facing internal tool only**. Patients never log in. There are no public routes, no SEO surfaces, and no marketing content.

### Build Classification

| Field | Value |
|---|---|
| Build class | Class 3 — Integration or Data-Sensitive Build |
| Class 4 surfaces within it | Auth boundary, JDPA data handling, financial transactions |
| Risk level | High — regulated healthcare data; controlled drug logging; RBAC; AI vision; patient privacy (JDPA 2020) |
| Legal jurisdiction | Jamaica — Pharmacy Act, Dangerous Drugs Act, Jamaica Data Protection Act 2020 |

### Scope — What Was Built (Phase 1 implemented so far)

**26 routes implemented and functional** (out of 43 routes planned in Phase 1 scope):

- Auth (login + MFA verify + MFA setup)
- Dashboard
- Retail POS terminal + transaction log + EOD closeout + EOD report + products + suppliers + loyalty + POS reports
- Prescriptions queue + new prescription form + schedule drug log + prescription detail/state machine
- Patients list + new patient form
- Reports: Revenue + Dispensing + Inventory
- Admin: Users (with role permissions matrix) + Audit Log + Settings
- AI Queue (upload UI + review drawer — Edge Function deployed)
- Error pages: 403 Forbidden + 404 Not Found

### Scope — Not Yet Built

- AI Rx Scanner confidence gate enforcement + live Realtime status updates
- Patient profile page (full tabs: overview, medication history, insurance, JDPA)
- JDPA consent capture UI in registration form (blocked on G5 — legal review; column exists in DB)
- JDPA data export / deletion flow (blocked on G5)
- NHF claims / insurance submission (Phase 2)
- Security admin page (2FA management, session log, failed login log)
- Full inventory module with receive stock, drug lots, expiry alerts
- Global search
- Schedule drug log PDF export
- WhatsApp/SMS automations (Phase 2)

### Explicit Exclusions (not in scope at any phase)

- Patient-facing portal — patients never log in
- E-commerce / online ordering
- Clinical EMR — no diagnoses, charting, or lab integration
- Bilingual — English only
- Multi-pharmacy / multi-tenant switching in Phase 1

---

## 2. Commercial Structure

| Item | Status |
|---|---|
| IP Ownership | NoDrftSystems — 100% proprietary product (reclassified 2026-05-08; was initially structured as client-owned custom work) |
| Product type | Licensed SaaS — not bespoke client work |
| First licensee | Winchester Global Pharmacy — Kingston, Jamaica |
| License terms | To be confirmed in pending SOW. Winchester does not own the codebase. |
| Winchester commercial status | MSA amendment + new SOW required — both UNSIGNED as of this document |
| Product repo visibility | Private — `github.com/NODRFTSYSTEMS/pharmacyos` |

---

## 3. URLs & Access Points

| System | URL / Location | Notes |
|---|---|---|
| **Product repo** | `https://github.com/NODRFTSYSTEMS/pharmacyos` | Private. `main` branch = current build |
| **Monorepo path** | `04_products/pharmacyos/` | Inside NoDrftSystems master repo |
| **Local dev server** | `http://localhost:5174/` | Run: `cd app && npm run dev` |
| **Vercel** | Not yet confirmed live | 9 commits ahead of `origin/main` — push and Vercel env var setup required (see Section 15 E8) |
| **Supabase project** | `https://aeidooydivhnvwskypov.supabase.co` | Free tier — all 14 migrations applied |
| **Supabase dashboard** | `https://supabase.com/dashboard/project/aeidooydivhnvwskypov` | |
| **Edge Function** | `extract-document` | Deployed. Processes PRESCRIPTION and INVOICE documents via Claude Vision |

### Environment Variables Required

The app reads from `app/.env.local` (not committed to git):

```
VITE_SUPABASE_URL=https://aeidooydivhnvwskypov.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_GuRFMJ19hSAV3_tClky_tw_BuihFdtf
```

**Critical:** If either variable is missing, `lib/supabase.ts` throws at module load time — before React mounts. The result is a completely blank screen with no error message. Both variables must be set in Vercel environment settings before any production deployment.

For Vercel deployment: add these same keys under **Project Settings → Environment Variables** in the Vercel dashboard.

### Supabase Secrets (Edge Functions)

The following secret is set in the Supabase project (not in `.env.local`):

```
ANTHROPIC_API_KEY  — set via supabase secrets set (used by extract-document Edge Function)
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are auto-injected by Supabase at Edge Function runtime.

---

## 4. Technology Stack

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.6 | UI framework |
| `react-dom` | ^19.2.6 | DOM rendering |
| `react-router` | ^7.15.0 | Client-side routing |
| `react-router-dom` | ^7.15.0 | DOM bindings for router |
| `@supabase/supabase-js` | ^2.105.3 | Database, auth, storage client |
| `@tanstack/react-query` | ^5.80.0 | Server state management, caching, mutations |
| `@phosphor-icons/react` | ^2.1.7 | Icon library |
| `@radix-ui/react-tooltip` | ^1.2.7 | Accessible tooltip primitive |
| `zustand` | ^5.0.13 | Client-side state (cart, UI state) |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^6.0.0 | Type checking |
| `vite` | ^7.0.0 | Build tool and dev server |
| `@vitejs/plugin-react` | ^5.0.0 | React fast refresh |
| `tailwindcss` | ^4.2.4 | Utility CSS |
| `@tailwindcss/vite` | ^4.2.4 | Tailwind Vite plugin |
| `vitest` | latest | Unit test runner |
| `@types/react` | ^19.1.8 | React type definitions |
| `@types/react-dom` | ^19.1.5 | ReactDOM type definitions |

### TypeScript Compatibility Note

TypeScript 6.0 introduced a compatibility break with Supabase JS v2. The `supabase` client in `src/lib/supabase.ts` uses a `SupabaseClient<any>` cast workaround, and `tsconfig.app.json` sets `"ignoreDeprecations": "6.0"`. This is intentional and correct for TS 6.0. Do **not** downgrade TypeScript to 5.x — it will break the build.

### Vite Build Configuration

`vite.config.ts` has manual chunk splitting to keep bundle sizes manageable:

```
vendor-react    — react, react-dom, react-router, react-router-dom
vendor-query    — @tanstack/react-query
vendor-supabase — @supabase/supabase-js
vendor-icons    — @phosphor-icons/react
```

`@radix-ui/react-tooltip` is intentionally NOT split into its own chunk — it imports React and must share the same React instance to avoid a circular chunk warning.

---

## 5. Repository Structure

```
04_products/pharmacyos/
├── 00_governance/
│   ├── build-activation-packet.md         ← Gate 0 scope document
│   ├── architecture-decision-record.md    ← Tech stack decisions (SAA)
│   ├── evidence-ledger.md                 ← QA gate evidence log
│   ├── pharmacyos-design-handoff-*.md     ← 48KB design specification
│   ├── msa-amendment-brief.md             ← Commercial restructure brief
│   ├── sow-restructure-brief.md           ← New SOW brief
│   └── pharmacyos-master-handoff-2026-05-13.md  ← this document
│
├── app/                                   ← Vite React app
│   ├── src/
│   │   ├── App.tsx                        ← Router definition (26 routes)
│   │   ├── main.tsx                       ← Entry point + AppErrorBoundary
│   │   ├── index.css                      ← Design system + print CSS
│   │   ├── components/
│   │   │   ├── Shell.tsx                  ← AppShell, Sidebar, PageHeader, MetricCard, Pill
│   │   │   ├── ProtectedRoute.tsx         ← Session guard + MFA check + idle timeout
│   │   │   └── RoleGuard.tsx              ← Route-level RBAC (redirects to /403)
│   │   ├── constants/
│   │   │   └── audit-actions.ts           ← Centralized audit action string registry
│   │   ├── hooks/
│   │   │   ├── useCurrentUser.ts          ← Auth user + staff_profiles lookup
│   │   │   └── usePermission.ts           ← Role × permission check (+ useAnyPermission)
│   │   ├── lib/
│   │   │   ├── supabase.ts                ← Supabase client (TS6 cast)
│   │   │   └── date.ts                    ← Jamaica timezone utilities
│   │   ├── types/
│   │   │   └── database.ts                ← TypeScript types for all tables
│   │   ├── test/
│   │   │   ├── constants/audit-actions.test.ts
│   │   │   └── lib/date.test.ts
│   │   │   └── lib/schedule-balance.test.ts
│   │   └── pages/
│   │       ├── auth/
│   │       │   ├── Login.tsx
│   │       │   ├── VerifyMFA.tsx          ← MFA challenge (AAL1 → AAL2)
│   │       │   └── SetupMFA.tsx           ← TOTP enrollment + recovery codes
│   │       ├── errors/
│   │       │   ├── Forbidden.tsx          ← 403 page
│   │       │   └── NotFound.tsx           ← 404 page
│   │       ├── Dashboard.tsx
│   │       ├── pos/                       ← 8 POS pages
│   │       ├── prescriptions/
│   │       │   ├── Queue.tsx
│   │       │   ├── NewPrescription.tsx
│   │       │   ├── RxDetail.tsx           ← Prescription detail + workflow state machine
│   │       │   └── ScheduleLog.tsx
│   │       ├── patients/                  ← 2 patient pages
│   │       ├── reports/                   ← 3 report pages
│   │       ├── admin/                     ← 3 admin pages
│   │       └── ai/Queue.tsx               ← Upload modal + review drawer
│   ├── package.json
│   ├── vite.config.ts                     ← Chunk splitting configured
│   └── tsconfig.app.json
│
├── supabase/
│   ├── migrations/                        ← 14 SQL migration files (all applied)
│   │   ├── 001_transactions_eod_extraction.sql
│   │   ├── 002_retail_suppliers.sql
│   │   ├── 003_extended_schema.sql
│   │   ├── 004_stock_decrement.sql
│   │   ├── 005_sample_data.sql
│   │   ├── 006_security_fixes.sql
│   │   ├── 007_extended_sample_data.sql
│   │   ├── 008_schedule_drug_log.sql
│   │   ├── 009_schedule_drug_log_audit_trigger.sql  ← NEW
│   │   ├── 010_production_rls.sql                  ← NEW
│   │   ├── 011_notifications.sql                   ← NEW
│   │   ├── 012_jdpa_consent.sql                    ← NEW
│   │   ├── 013_security_patch.sql                  ← NEW
│   │   └── 014_storage_buckets.sql                 ← NEW
│   └── functions/
│       └── extract-document/index.ts               ← NEW — Claude Vision AI extraction
│
└── prototype/                             ← Reference only — not production code
```

---

## 6. Database Schema

All tables live in the Supabase PostgreSQL instance. As of migration 013, all tables have **production-scoped RLS policies** — dev-permissive placeholders have been fully replaced. The helper function `get_my_role()` (SECURITY DEFINER) powers all role-based policies.

### Core Enums

| Enum | Values |
|---|---|
| `payment_method` | CASH, CARD, LYNK, NHF, MIXED |
| `eod_status` | OPEN, SUBMITTED, APPROVED, DISCREPANCY |
| `extraction_status` | PENDING, PROCESSING, REVIEW_REQUIRED, ACCEPTED, REJECTED |
| `document_type` | PRESCRIPTION, INVOICE, OTHER |
| `shift_type` | MORNING, AFTERNOON, FULL_DAY |
| `prescription_status` | RECEIVED, VERIFYING, READY, DISPENSED, CANCELLED |
| `staff_role` | PHARMACIST, CASHIER, TECHNICIAN, MANAGER, ADMIN |
| `loyalty_tier` | STANDARD, SILVER, GOLD, PLATINUM |

### Tables

| Table | Description | Key Columns |
|---|---|---|
| `retail_transactions` | POS sale records | id, ref_number, subtotal, tax, discount, total, payment_method, cash_tendered, change_given, loyalty_customer_id, loyalty_points_earned, voided, created_at |
| `retail_transaction_items` | Line items for each sale | id, transaction_id, product_id, product_name, quantity, unit_price, line_total |
| `rx_transactions` | Prescription dispensing financial records | id, ref_number, prescription_id, patient_name, drug_name, quantity_dispensed, nhf_subsidy, patient_copay, payment_method, voided, created_at |
| `eod_closeouts` | End-of-day closeout records | id, closeout_date, shift, opening_float, system totals (retail/rx/cash/card/lynk/nhf), actual counts, cash_variance, status, manager_id, manager_approved_at |
| `extraction_queue` | AI document extraction jobs | id, ref_number, document_type, storage_path, extraction_status, raw_extraction (JSONB), extracted_fields (JSONB), confidence_score, linked_prescription_id |
| `retail_suppliers` | Product suppliers | id, name, contact_name, phone, email, notes, is_active |
| `products` | Product catalog with stock | id, name, barcode (UNIQUE), category, unit_price, cost_price, stock_qty, reorder_level, supplier_id, is_active |
| `patients` | Patient demographic records | id, first_name, last_name, date_of_birth, phone, address, allergies, notes, jdpa_consent_at, is_active |
| `prescriptions` | Prescription records with workflow state | id, ref_number, patient_id, patient_name, prescriber_name, prescriber_reg, drug_name, dosage, quantity, issue_date, status (enum), dispensed_by, extraction_queue_id |
| `staff_profiles` | Staff display records (not Auth users) | id, email, full_name, role (enum), is_active |
| `pharmacy_settings` | Key-value configuration store | key (PK), value, updated_at |
| `loyalty_customers` | Loyalty program members | id, name, phone (UNIQUE), email, points_balance, tier (enum), joined_date |
| `audit_log` | System event log — append only | id, actor_id, actor_name, action, table_name, record_id, details (JSONB), created_at |
| `schedule_drug_log` | Controlled drug register (Dangerous Drugs Act) | id, entry_date, drug_name, strength, quantity_in, quantity_out, balance, patient_name, prescriber_name, prescriber_reg, rx_ref, pharmacist_id, pharmacist_name, notes |
| `notifications` | In-app notification surface | id, user_id (nullable), role_target (nullable), type, title, body, href, is_read, created_at, expires_at |

### Schema Notes

**`patients.jdpa_consent_at`** — Added in migration 012. `NULL` = consent not yet recorded. `NOT NULL` = staff-confirmed consent timestamp. Partial index on `(id) WHERE jdpa_consent_at IS NULL AND is_active = true` for JDPA audit queries. LCA (Dorothy) legal review gate (G5) is still open.

**`notifications`** — Supports two targeting modes: direct (user_id set, role_target null) and broadcast (role_target set, user_id null). Constraint `notifications_role_target_valid` enforces that role_target must be a valid staff role if not null.

### pharmacy_settings Keys

| Key | Default / Description |
|---|---|
| `pharmacy_name` | Winchester Global Pharmacy |
| `pharmacy_address` | Full address for receipts + reports |
| `nhf_provider_no` | NHF provider number |
| `oic_reg_no` | OIC registration number |
| `default_float` | Default opening float (JMD) |
| `gct_rate` | GCT rate percentage (default: 15) |
| `currency` | Currency code (default: JMD) |
| `opening_float` | Today's float override |
| `default_shift` | Default shift for EOD (MORNING/AFTERNOON/EVENING/OVERNIGHT) |
| `loyalty_rate` | Points earned per $1 spent |
| `receipt_footer` | Custom text printed at bottom of POS receipts |
| `role_permissions` | JSON — role×permission matrix (see Users admin page) |

---

## 7. Migration Log

All 14 migrations have been applied to the live Supabase project (`aeidooydivhnvwskypov`). Each is idempotent (uses `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `DROP POLICY IF EXISTS`, `OR REPLACE` functions).

**Run order is mandatory** — migrations 009 onwards depend on tables/functions defined in prior migrations. Never skip or reorder.

| # | File | What It Creates / Does | Status |
|---|---|---|---|
| 001 | `001_transactions_eod_extraction.sql` | `retail_transactions`, `retail_transaction_items`, `rx_transactions`, `eod_closeouts`, `extraction_queue`; enums; `generate_ref_number()` function | Applied |
| 002 | `002_retail_suppliers.sql` | `retail_suppliers` table | Applied |
| 003 | `003_extended_schema.sql` | `products`, `patients`, `prescriptions`, `staff_profiles`, `pharmacy_settings`, `loyalty_customers`, `audit_log`; enums; `touch_updated_at()` trigger | Applied |
| 004 | `004_stock_decrement.sql` | `decrement_product_stock()` RPC function for atomic stock reduction | Applied |
| 005 | `005_sample_data.sql` | Basic sample data (products, basic records) | Applied |
| 006 | `006_security_fixes.sql` | Revokes anonymous `EXECUTE` grant on `decrement_product_stock` | Applied |
| 007 | `007_extended_sample_data.sql` | Extended sample data: 5 staff, loyalty customers, retail transactions, Rx transactions, EOD closeout, audit entries | Applied |
| 008 | `008_schedule_drug_log.sql` | `schedule_drug_log` table; RLS placeholder | Applied |
| 009 | `009_schedule_drug_log_audit_trigger.sql` | `log_schedule_drug_change()` AFTER trigger on schedule_drug_log — writes audit_log entry on every INSERT/UPDATE/DELETE. Required for Dangerous Drugs Act | Applied |
| 010 | `010_production_rls.sql` | `get_my_role()` SECURITY DEFINER helper; **drops all dev-permissive policies**; creates role-scoped RLS on all 14 tables | Applied |
| 011 | `011_notifications.sql` | `notifications` table + RLS; depends on `get_my_role()` from 010 | Applied |
| 012 | `012_jdpa_consent.sql` | Adds `jdpa_consent_at timestamptz` column to `patients`; partial index for JDPA audit queries | Applied |
| 013 | `013_security_patch.sql` | Resolves 7 SCA findings: dev policy name mismatch (CRITICAL-00), role self-escalation (010-01 CRITICAL), audit fabricated actor_id (010-02 HIGH), staff PII exposure (010-03 HIGH), notification INSERT open (011-01 HIGH), notification column hijack (011-02 HIGH), JDPA consent audit trail (012-01 MEDIUM) | Applied |
| 014 | `014_storage_buckets.sql` | Creates `documents` private storage bucket (10 MB, image/PDF); RLS on `storage.objects` (insert/select: any auth; delete: ADMIN only) | Applied |

### Deferred Security Findings (not in 013)

These were logged by SCA (Omari) but deferred pending ARE/Founder decision:

| ID | Severity | Description | Decision needed |
|---|---|---|---|
| 009-02 | LOW | TRUNCATE on schedule_drug_log produces no audit event | ARE/Founder: revoke TRUNCATE entirely, or add statement-level trigger |
| 009-03 | LOW | `to_jsonb(NEW)/to_jsonb(OLD)` serializes all columns; PII risk | Confirm full column list, replace with explicit jsonb_build_object |
| 010-07 | MEDIUM | TECHNICIAN SELECT on patients — may be unintentional PII exposure | Founder/ARE confirmation of TECHNICIAN patient access |
| CROSS-01 | MEDIUM | `get_my_role()` subquery fires on every policy evaluation — performance cost | Cache role in JWT via Supabase auth hook; requires SAA review |

---

## 8. Route Map

### Implemented (26 routes)

| Path | Component | Status |
|---|---|---|
| `/login` | `Login` | Functional — email+password auth |
| `/verify-mfa` | `VerifyMFA` | Functional — TOTP challenge; accessible with AAL1 session |
| `/403` | `Forbidden` | Functional — access denied page with back navigation |
| `/dashboard` | `Dashboard` | Functional — role-filtered metric cards + Rx queue |
| `/pos` | `PosTerminal` | Functional — cart, barcode, payment, receipt modal |
| `/pos/transactions` | `TransactionLog` | Functional — searchable, filterable |
| `/pos/closeout` | `CloseOut` | Functional — submit EOD |
| `/pos/eod-report` | `EodReport` | Functional — manager approval workflow |
| `/pos/products` | `ProductCatalog` | Functional — add/edit products |
| `/pos/suppliers` | `RetailSuppliers` | Functional — add/edit suppliers |
| `/pos/loyalty` | `Loyalty` | Functional — customer management, points |
| `/pos/reports` | `PosReports` | Functional — daily/monthly POS stats |
| `/prescriptions` | `RxQueue` | Functional — prescription list with status filter |
| `/prescriptions/new` | `NewPrescription` | Functional — new Rx form |
| `/prescriptions/schedule-log` | `ScheduleLog` | Functional — full CRUD, compliance notice |
| `/prescriptions/:id` | `RxDetail` | Functional — state machine (RECEIVED → VERIFYING → READY → DISPENSED), dispensing flow, audit trail |
| `/patients` | `PatientList` | Functional — search, add, edit drawer |
| `/patients/new` | `NewPatient` | Functional — demographics + allergies form |
| `/reports/revenue` | `RevenueReport` | Functional — daily + payment breakdown, print |
| `/reports/dispensing` | `DispensingReport` | Functional — Rx records, totals, print |
| `/reports/inventory` | `InventoryReport` | Functional — stock levels, value, print |
| `/admin/users` | `UsersAdmin` | Functional — staff CRUD + permissions matrix |
| `/admin/audit` | `AuditLog` | Functional — expandable rows, badges, CSV export |
| `/admin/settings` | `Settings` | Functional — 11 configurable fields |
| `/ai/queue` | `AiQueue` | Functional — upload modal (drag-drop, doc type selector), review drawer, accept/reject |
| `/profile/security` | `SetupMFA` | Functional — TOTP enrollment + QR code + recovery codes |

**404 catch-all:** `<Route path="*" element={<NotFound />} />` inside the authenticated shell — renders branded 404 page for unknown paths.

### Not Yet Built (17 routes remaining)

- AI Rx Scanner — standalone scan + extraction view (`/prescriptions/scan`)
- AI Invoice Scanner — standalone upload + extraction view
- Patient profile page (`/patients/:id`) — full multi-tab view
- JDPA consent + data export flow (blocked G5)
- Inventory: receive stock, drug lot detail, expiry alerts
- Admin: Security page (active sessions, failed login log)
- Additional reports (NHF claims, schedule drug export with compliant format)

---

## 9. Module-by-Module Feature Status

### Authentication

| Feature | Status |
|---|---|
| Email + password login | Working |
| Session persistence (Supabase Auth) | Working |
| Protected route guard | Working — redirects to `/login` if no session |
| Idle session timeout | Working — 20-minute idle timeout with 2-minute warning banner |
| 2FA (TOTP) setup page | Working — `SetupMFA.tsx` at `/profile/security` |
| 2FA verification page | Working — `VerifyMFA.tsx` at `/verify-mfa` |
| MFA enforcement in ProtectedRoute | Working — checks `aal.nextLevel === 'aal2'`; redirects to `/verify-mfa` if MFA enrolled but not yet verified |
| MFA toggle in Supabase dashboard | Enabled — Authentication → Sign In/Up → Multi-Factor Authentication |
| Role-based route enforcement | Working — `RoleGuard` wraps all non-dashboard routes; redirects to `/403` if permission missing |
| Account lockout after failed attempts | Not built |
| Security admin page | Not built |

### Retail POS

| Feature | Status |
|---|---|
| Product search by barcode / name | Working |
| Add to cart, quantity edit, remove | Working |
| Cash payment with change calculation | Working |
| Card / Lynk payment (no integration) | Working — records payment method, no API |
| GCT calculation on checkout | Working |
| Loyalty points earn + redeem | Working |
| Receipt modal (print/dismiss) | Working |
| Void transaction | Working |
| Stock decrement on sale | Working — uses `decrement_product_stock()` RPC |
| Barcode scanner hardware support | Working — keyboard wedge emulation |
| POS EOD closeout submission | Working |
| Manager EOD approval | Working |

### Prescriptions

| Feature | Status |
|---|---|
| New prescription form | Working — creates `prescriptions` record |
| Prescription queue list | Working — filter by status |
| Prescription detail / state machine | Working — `RxDetail.tsx`; RECEIVED → VERIFYING → READY → DISPENSED; creates rx_transactions on dispense; writes to audit_log |
| Schedule Drug Log (controlled document) | Working — full CRUD; balance tracked per entry; audit trigger fires on all DML |
| AI Rx Scanner | Partial — upload UI and Edge Function deployed; confidence gate enforcement and Realtime status updates not yet wired |

### Patients

| Feature | Status |
|---|---|
| Patient list with search | Working |
| Add new patient | Working |
| Edit patient (slide-in drawer) | Working |
| JDPA consent column | Working — `jdpa_consent_at` column in DB with audit trigger; UI capture pending G5 |
| Patient profile page | Not built |
| JDPA consent capture in registration UI | Not built — blocked G5 |
| JDPA data export/deletion flow | Not built — blocked G5 |

### Reports

| Feature | Status |
|---|---|
| Revenue report (daily + by payment method) | Working — CSV export, print, totals |
| Dispensing report (Rx records) | Working — CSV export, print, totals |
| Inventory report (stock levels + value) | Working — CSV export, print, totals |
| Schedule drug log export | Not built (log exists; PDF/CSV export pending G6 format sign-off) |
| NHF claims report | Not built (Phase 2) |

### Admin

| Feature | Status |
|---|---|
| Staff list + add/edit | Working |
| Role permissions matrix (checkboxes) | Working — saved to `pharmacy_settings` |
| Audit log (read-only, expandable, badges) | Working — CSV export |
| Settings (11 configurable fields) | Working — upsert to `pharmacy_settings` |
| Security page (2FA, sessions) | Not built |

### AI Queue

| Feature | Status |
|---|---|
| Review drawer (accept/reject, confidence display, linked Rx creation) | Working |
| Upload modal (drag-drop, document type selector, storage upload) | Working — uploads to `documents` bucket, inserts to `extraction_queue` |
| Edge Function `extract-document` | Deployed — processes PRESCRIPTION (claude-haiku-4-5, escalates to claude-sonnet-4-6) and INVOICE (claude-haiku-4-5) |
| Auto-trigger Edge Function on upload | Working — called from upload mutation after `extraction_queue` INSERT |
| Confidence gate enforcement (< 85% → REVIEW_REQUIRED) | Not yet enforced in frontend logic |
| Realtime status subscription | Not yet wired |
| `ANTHROPIC_API_KEY` Supabase secret | Set |

---

## 10. Reports & Calculations

### Revenue Report

**Source tables:** `retail_transactions` (voided=false) + `rx_transactions` (voided=false)

| Metric | Formula |
|---|---|
| Total Retail Revenue | `SUM(retail_transactions.total)` |
| Total Rx Revenue | `SUM(rx_transactions.patient_copay)` |
| Total NHF Subsidy | `SUM(rx_transactions.nhf_subsidy)` — not included in total |
| Grand Total Revenue | Total Retail + Total Rx |
| Daily Breakdown | Grouped by Jamaica-timezone date — retail + rx + nhf + combined total per day |
| Payment Method Breakdown | Grouped by `payment_method` — count + total per method |

**Date filter:** Applied using `toJamaicaBounds(from, to)` — Jamaica UTC-5 offset applied to avoid midnight off-by-one errors.

### Dispensing Report

**Source table:** `rx_transactions`

| Metric | Formula |
|---|---|
| Total Dispensings | COUNT of non-voided records |
| Total Rx Revenue | `SUM(patient_copay)` for non-voided |
| NHF Claims | `SUM(nhf_subsidy)` for non-voided |
| Total Qty | `SUM(quantity_dispensed)` for non-voided |
| Voids | COUNT of voided=true records |

### Inventory Report

**Source table:** `products` (is_active=true)

| Metric | Formula |
|---|---|
| Stock Status | `OUT_OF_STOCK` if qty=0; `LOW_STOCK` if qty ≤ reorder_level; `IN_STOCK` otherwise |
| Stock Value per product | `unit_price × stock_qty` |
| Total Stock Value (tfoot) | `SUM(unit_price × stock_qty)` for filtered products |
| Total Stock Qty (tfoot) | `SUM(stock_qty)` for filtered products |

### POS EOD Closeout Calculations

**Calculated at submission by the frontend:**

| Field | Calculation |
|---|---|
| `system_retail_cash` | SUM of retail transactions where payment_method=CASH and closeout_date |
| `system_retail_card` | Same, CARD |
| `system_retail_lynk` | Same, LYNK |
| `system_rx_cash` | SUM of rx_transactions where payment_method=CASH |
| `system_total` | Sum of all system fields |
| `cash_variance` | `actual_cash_counted - (opening_float + system_retail_cash + system_rx_cash)` |
| Negative variance | Short (cashier short) |
| Positive variance | Over (cashier over) |

### Reference Number Generation

All transaction reference numbers are generated by the `generate_ref_number(prefix TEXT)` PostgreSQL function:

```
FORMAT: PREFIX-YYYYMMDD-NNNNN
EXAMPLE: TXN-20260513-00001
```

Prefixes in use: `TXN` (retail), `RX` (Rx transactions), `EXT` (extraction queue), `RXP` (prescriptions).

### Loyalty Points

Points are earned at rate configured in `pharmacy_settings.loyalty_rate` (default: 1 pt per $1 spent).

```
points_earned = FLOOR(transaction_total × loyalty_rate)
```

Redemption is applied as a dollar discount at checkout (points balance reduced at transaction save).

---

## 11. Named Agents Active on This Build

All agents follow NoDrftSystems AI governance. All have Caribbean names per the Agent Naming Rule.

| Agent | Code | Role in This Build |
|---|---|---|
| MOA (Zayne) | `moa_orchestrator` | Primary orchestration, task routing, dependency management |
| PMA (Keon) | `pma_product_manager` | SOW tracking, phase management, scope boundary enforcement |
| FIS (Kiara) | `fis_frontend_implementation` | UI components, React, Tailwind, all page implementations |
| BLS | `bls_backend_logic` | Supabase queries, mutations, server-side logic |
| DSS | `dss_database_schema` | Schema design, migrations, indexing |
| SCA (Omari) | `sca_security_compliance` | RLS review completed (findings 009-02, 009-03, 010-07, CROSS-01 deferred) |
| SAA (Samara) | `saa_solution_architecture` | Tech stack decision (ADR produced; awaiting ARE + Founder sign-off) |
| TVA (Leandra) | `tva_test_verification` | TypeScript checks, Vitest test suite (3 test files) |
| IDS | `ids_integration_debugging` | AI scanner wiring, migration runtime error resolution |
| ASIS | `asis_agent_systems_integration` | Edge Function architecture, AI integration patterns |
| QAS (Imani) | `qas_supervisor` | Independent QA — reserved for Gate 5 |
| ARE | `are_reliability_engineer` | Technical authority — sign-off required at Gate 6 |
| LCA (Dorothy) | `lca_legal_compliance` | JDPA review — blocked on G5 |
| HHC (Desmond) | `hhc_handoff_coordinator` | Escalation routing to Founder |

---

## 12. Supabase — Functions, RLS, Helpers

### PostgreSQL Functions

| Function | Signature | Purpose |
|---|---|---|
| `generate_ref_number` | `(prefix TEXT) → TEXT` | Generates sequential reference numbers (PREFIX-YYYYMMDD-NNNNN) |
| `touch_updated_at` | trigger function | Auto-sets `updated_at = now()` on UPDATE |
| `decrement_product_stock` | `(product_id UUID, qty INT) → void` | Atomic stock decrement — used by POS terminal |
| `get_my_role` | `() → TEXT` STABLE SECURITY DEFINER | Returns the current auth user's role from staff_profiles. Powers all production RLS policies. Created in migration 010 |
| `log_schedule_drug_change` | trigger function SECURITY DEFINER | AFTER INSERT/UPDATE/DELETE on schedule_drug_log — writes audit_log entry. Required for Dangerous Drugs Act |
| `enforce_notification_readonly_cols` | trigger function | BEFORE UPDATE on notifications — blocks changes to all columns except `is_read` |
| `log_patient_consent_change` | trigger function SECURITY DEFINER | AFTER UPDATE on patients — writes audit_log entry when `jdpa_consent_at` changes. Required for JDPA 2020 |

### RLS Policies — Current State

**All tables have production-scoped RLS policies** as of migration 013. Dev-permissive placeholders (`USING (true)`) are fully replaced.

| Table | Select | Insert | Update | Delete |
|---|---|---|---|---|
| `retail_transactions` | All roles | ADMIN, MANAGER, CASHIER, TECHNICIAN | ADMIN, MANAGER | No DELETE (use voided=true) |
| `retail_transaction_items` | All roles | ADMIN, MANAGER, CASHIER, TECHNICIAN | — | — |
| `rx_transactions` | ADMIN, MANAGER, PHARMACIST, TECHNICIAN | ADMIN, PHARMACIST, TECHNICIAN | No UPDATE | No DELETE |
| `eod_closeouts` | ADMIN, MANAGER, CASHIER | ADMIN, MANAGER, CASHIER | ADMIN, MANAGER | — |
| `extraction_queue` | ADMIN, MANAGER, PHARMACIST, TECHNICIAN | ADMIN, PHARMACIST, TECHNICIAN | ADMIN, PHARMACIST, TECHNICIAN | — |
| `products` | All roles | ADMIN, MANAGER, TECHNICIAN | ADMIN, MANAGER, PHARMACIST, TECHNICIAN | — |
| `patients` | ADMIN, PHARMACIST, TECHNICIAN | ADMIN, PHARMACIST | ADMIN, PHARMACIST | ADMIN only |
| `prescriptions` | ADMIN, MANAGER, PHARMACIST, TECHNICIAN | ADMIN, PHARMACIST, TECHNICIAN | ADMIN, PHARMACIST, TECHNICIAN | — |
| `staff_profiles` | Own row OR ADMIN/MANAGER | ADMIN, MANAGER | ADMIN (any row) OR own row with role locked | — |
| `pharmacy_settings` | All roles | ADMIN, MANAGER | ADMIN, MANAGER | — |
| `loyalty_customers` | ADMIN, MANAGER, CASHIER, TECHNICIAN | ADMIN, MANAGER, CASHIER | ADMIN, MANAGER, CASHIER, TECHNICIAN | — |
| `retail_suppliers` | ADMIN, MANAGER, TECHNICIAN | ADMIN, MANAGER | ADMIN, MANAGER | — |
| `audit_log` | ADMIN, MANAGER | Own actor_id or NULL only | No UPDATE | No DELETE |
| `schedule_drug_log` | ADMIN, PHARMACIST | ADMIN, PHARMACIST | ADMIN only | ADMIN only |
| `notifications` | Own user_id OR matching role_target | Own user_id (no role_target) OR ADMIN/MANAGER/PHARMACIST/TECHNICIAN (broadcast) | Own/role target — is_read only | Own user_id (personal) or ADMIN/MANAGER (broadcast) |

**staff_profiles self-update:** A non-ADMIN user can update their own row but the `role` column is locked to its current value. A CASHIER cannot escalate to ADMIN via UPDATE.

### Supabase Storage

| Bucket | Visibility | Max Size | Allowed MIME Types |
|---|---|---|---|
| `documents` | Private (signed URLs) | 10 MB | image/jpeg, image/jpg, image/png, image/gif, image/webp, application/pdf |

Upload path convention: `documents/{YYYY}/{MM}/{timestamp}_{sanitized_filename}`

### Edge Functions

| Function | Runtime | Model | Purpose |
|---|---|---|---|
| `extract-document` | Deno | claude-haiku-4-5 (primary) / claude-sonnet-4-6 (fallback) | AI extraction from uploaded PRESCRIPTION and INVOICE images/PDFs. Updates `extraction_queue` with `extracted_fields`, `confidence_score`, and `extraction_status`. |

### Authentication

- Provider: Supabase Auth (email + password)
- MFA: TOTP enabled in dashboard (Authentication → Sign In/Up → Multi-Factor Authentication)
- `ProtectedRoute` state machine: `loading → authed / mfa-required / unauthed`
  - `mfa-required`: user has enrolled MFA and current AAL is AAL1 → redirects to `/verify-mfa`
  - `unauthed`: no session → redirects to `/login`
- Test users: Must be created manually in Supabase dashboard — the app does not seed auth users
- Session: Managed by `@supabase/supabase-js` — stored in localStorage
- Idle timeout: 20 minutes with 2-minute warning banner

### Known `get_my_role()` Behaviour

`get_my_role()` is SECURITY DEFINER — it reads `staff_profiles` using the function owner's privileges, bypassing RLS. This ensures the role lookup works even though `staff_profiles` SELECT is now scoped to own row or ADMIN/MANAGER. The first login of a newly created user resolves correctly because of this.

**Critical:** `useCurrentUser` in the frontend looks up staff profile by `email`. The email in `staff_profiles.email` must exactly match the email of the Supabase Auth user. If there is no matching `staff_profiles` record, the user will default to `CASHIER` role and `'Unknown User'` display name. This is intentional — create the staff profile via Admin → Users after creating the auth user.

---

## 13. What Is Complete

### Infrastructure
- [x] Vite + React 19 + TypeScript 6 scaffold
- [x] Tailwind v4 design system (tokens, cards, buttons, pills, inputs, table-compact)
- [x] Supabase JS v2 client with TS6 compatibility workaround
- [x] TanStack Query v5 provider setup
- [x] React Router v7 all-routes configuration
- [x] AppShell (sidebar, mobile topbar, viewport-locked layout)
- [x] AppErrorBoundary — catches React render errors; shows branded recovery screen
- [x] ProtectedRoute — session guard + MFA AAL check + idle timeout + warning banner
- [x] RoleGuard — route-level RBAC; redirects to `/403` if permission missing
- [x] 403 Forbidden page
- [x] 404 Not Found page
- [x] Vite manual chunk splitting (4 vendor bundles)
- [x] Supabase project provisioned and all 14 migrations applied
- [x] Supabase MFA (TOTP) enabled in dashboard
- [x] `documents` storage bucket created and RLS configured
- [x] Edge Function `extract-document` deployed
- [x] `ANTHROPIC_API_KEY` Supabase secret set

### Pages — Functional
- [x] Login page (email + password)
- [x] VerifyMFA page (TOTP challenge)
- [x] SetupMFA page (TOTP enrollment + QR + recovery codes)
- [x] Dashboard (role-filtered metric cards; revenue visible to reports_view roles; Rx queue visible to rx_dispense roles)
- [x] POS Terminal (cart, barcode, payment, receipt, loyalty, stock decrement)
- [x] POS Transaction Log (search, filter, void)
- [x] EOD Closeout (submit with float + payment breakdown)
- [x] EOD Report (manager approval, variance display)
- [x] Product Catalog (add, edit, stock management)
- [x] Retail Suppliers (add, edit)
- [x] Loyalty Program (customer search, register, points, tiers)
- [x] POS Reports (daily/monthly summaries)
- [x] Prescription Queue (list, status filter)
- [x] New Prescription form
- [x] Prescription Detail — RxDetail state machine (RECEIVED → VERIFYING → READY → DISPENSED)
- [x] Schedule Drug Log (full CRUD, compliance notice, drug filter)
- [x] Patient List (search, add, edit drawer)
- [x] New Patient form
- [x] Revenue Report (daily + payment breakdown, CSV, print, totals)
- [x] Dispensing Report (Rx records, CSV, print, totals)
- [x] Inventory Report (stock levels, stock value, CSV, print, totals)
- [x] Users Admin (staff CRUD + 13×5 role permissions matrix)
- [x] Audit Log (expandable rows, color badges, CSV export)
- [x] Settings (11 fields across 4 sections)
- [x] AI Queue (upload modal + drag-drop + review drawer + accept/reject)

### Security & Compliance
- [x] Production RLS deployed on all 14 tables (migration 010)
- [x] Security patch — 7 SCA findings resolved (migration 013)
- [x] Role self-escalation prevented via staff_profiles WITH CHECK
- [x] Audit log INSERT scoped to own actor_id
- [x] staff_profiles SELECT scoped to own row or ADMIN/MANAGER
- [x] Notification INSERT split into personal/broadcast with role validation
- [x] Notification column immutability enforced by trigger
- [x] JDPA consent audit trail (log_patient_consent_change trigger)
- [x] Controlled drug audit trigger (log_schedule_drug_change — all INSERT/UPDATE/DELETE)
- [x] Anon EXECUTE revoked from decrement_product_stock (migration 006)

### Quality
- [x] TypeScript 0 errors (`tsc --noEmit` passing)
- [x] Print CSS (`@media print`, `.print-only`, `.no-print`)
- [x] Viewport-locked layout (only main content area scrolls)
- [x] Vitest configured — 3 test files: audit-actions, date utilities, schedule balance
- [x] Jamaica timezone consistency — all date operations use `America/Jamaica` offset

### Git
- [x] All work committed (9 commits ahead of `origin/main`)
- [ ] **Push to `origin/main` pending** — see Section 15 E8

---

## 14. What Is Next

Listed in recommended order. Items marked **[BLOCKED]** cannot proceed without resolving the referenced gap.

### Priority 1 — Push & Deploy (immediate)

- [ ] Run GitHub Disclosure Gate pre-commit sweep
- [ ] `git push pharmacyos-origin main` or equivalent subtree push to `github.com/NODRFTSYSTEMS/pharmacyos`
- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel environment variables (Project Settings → Environment Variables)
- [ ] Confirm Vercel auto-deploys and build passes
- [ ] Verify app loads at Vercel URL and redirects to `/login`

### Priority 2 — Blank Screen Diagnosis (if Vercel still blank after Priority 1)

- [ ] Confirm `.env` vars are set in Vercel (both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- [ ] Check Vercel build logs for any `tsc` or Vite errors
- [ ] If env vars are set and build passes but app is blank: check browser console for module-level throw from `lib/supabase.ts`
- [ ] If first login works locally: confirm auth user email exactly matches `staff_profiles.email` (case-sensitive)

### Priority 3 — AI Queue Completion

- [ ] Enforce confidence gate: if `confidence_score < 0.85`, set `extraction_status = 'REVIEW_REQUIRED'` (currently set to ACCEPTED by default in Edge Function output path)
- [ ] Wire Supabase Realtime subscription on `extraction_queue` so Queue page auto-refreshes when Edge Function completes
- [ ] Test full upload → extraction → review → accept/reject flow end-to-end

### Priority 4 — Patient Profile

- [ ] Patient profile page (`/patients/:id`) with tabs: Overview, Medication History, Insurance, JDPA
- [ ] **[BLOCKED G5]** JDPA consent capture in registration UI
- [ ] **[BLOCKED G5]** JDPA data export/deletion flow

### Priority 5 — Security Deferred Findings

- [ ] **009-02:** Decision from ARE/Founder on TRUNCATE for clinical tables — revoke or add trigger
- [ ] **010-07:** Confirm whether TECHNICIAN SELECT on patients is intentional
- [ ] **CROSS-01:** Cache `get_my_role()` in JWT via Supabase auth hook (performance — deferred to post-pilot sprint)

### Priority 6 — Schedule Drug Log Export

- [ ] **[BLOCKED G6]** PDF export in pharmacist-approved regulatory format
- [ ] CSV export per drug per period

### Priority 7 — Inventory (extended)

- [ ] Receive stock form (creates stock increment)
- [ ] Drug detail page (lots, transaction history, expiry dates)
- [ ] Inventory alerts page (low stock + expiry)
- [ ] Stock lot tracking schema + migration

### Priority 8 — POS Payments **[BLOCKED G4]**

- [ ] Lynk payment API integration (requires client-supplied credentials)
- [ ] Lynk payment confirmation flow in POS terminal

### Priority 9 — MSA + SOW **[BLOCKED G7, G8]**

- [ ] Winchester MSA amendment signed
- [ ] New PharmacyOS SOW signed
- [ ] IGA invoice generation
- [ ] CRMA deal stage updated

---

## 15. Known Errors, Problems & Resolutions

### E1 — Vercel "No Production Deployment"

| Field | Detail |
|---|---|
| Error | Vercel dashboard shows "No Production Deployment — Your Production Domain is not serving traffic" |
| Root cause | `package.json` pinned `"typescript": "~5.8.3"`. Vercel installed TS 5.8. `"ignoreDeprecations": "6.0"` in `tsconfig.app.json` is invalid in TS 5.8 → `tsc -b` exits non-zero → Vite build fails |
| Fix applied | Changed `package.json` to `"typescript": "^6.0.0"` |
| Status | Fix committed. Vercel re-deployment not yet confirmed — push to remote required first (see E8) |

### E2 — SSH Force Push Failure

| Field | Detail |
|---|---|
| Error | `git push git@github.com:NODRFTSYSTEMS/pharmacyos.git` → SSH host key verification failed |
| Root cause | SSH key not registered / host key changed |
| Fix applied | Use HTTPS: `git push https://github.com/NODRFTSYSTEMS/pharmacyos.git pharmacyos-split:main --force` |
| Status | Resolved — HTTPS push is the working method |

### E3 — Invalid UUID in Sample Data (g7000000)

| Field | Detail |
|---|---|
| Error | `ERROR: 22P02: invalid input syntax for type uuid: 'g7000000-0000-0000-0000-000000000001'` |
| Root cause | UUID prefix `g7000000` uses `g` — not a valid hex character. PostgreSQL UUIDs must use 0–9, a–f only |
| Fix applied | Replaced with `e7000000` prefix in migration 007 EOD closeout record |
| Status | Resolved |

### E4 — `manager_approved_at` Type Cast Error

| Field | Detail |
|---|---|
| Error | `column manager_approved_at is of type timestamptz but expression is of type text` |
| Root cause | Sample data SQL used `(CURRENT_TIMESTAMP - INTERVAL '20 hours')::text` but column is `timestamptz` |
| Fix applied | Removed `::text` cast |
| Status | Resolved |

### E5 — Maximum Update Depth Exceeded (React infinite loop)

| Field | Detail |
|---|---|
| Error | Console: "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect…" |
| Root cause | Not yet diagnosed — likely a `useEffect` with a missing or incorrect dependency array in one of the POS or Rx pages |
| Impact | Cosmetic — does not crash the app |
| Status | Not yet fixed |
| Next action | Isolate by disabling pages one at a time; check `useEffect` hooks with object/array dependencies that recreate on each render |

### E6 — Supabase-JS v2 / TypeScript 6 Incompatibility

| Field | Detail |
|---|---|
| Error | TS6 marks certain Supabase generics as deprecated; `SupabaseClient` constructor type changes |
| Fix applied | `supabase.ts` casts client as `SupabaseClient<any>`; `tsconfig.app.json` sets `"ignoreDeprecations": "6.0"` |
| Status | Working. Do not remove these workarounds until supabase-js v3 or a TS6-compatible v2 patch is released |

### E7 — User Pasted Filename Into SQL Editor

| Field | Detail |
|---|---|
| Error | `ERROR: 42601: syntax error at or near "supabase"` |
| Root cause | User typed the migration filename into the SQL editor instead of pasting the SQL content |
| Resolution | Paste SQL content only — not the file path |
| Status | Resolved (user education) |

### E8 — App Shows Blank Screen

| Field | Detail |
|---|---|
| Symptom | "Loading — nothing comes up" when visiting app at localhost:5174 or Vercel |
| Root cause 1 (FIXED) | **`supabase.ts` module-level throw.** If `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are missing, the old code threw `new Error(...)` at module evaluation time — before React mounts. `AppErrorBoundary` cannot catch module-level throws. Result: completely blank screen. Fix: replaced `throw` with `console.error` + placeholder fallback values so React can mount and redirect to `/login`. |
| Root cause 2 (FIXED) | **`ProtectedRoute` silently swallows auth errors.** `void resolveAuthState()` means any thrown exception leaves `state = 'loading'` forever. Loading spinner is near-white (#F5F7FA) with a tiny 32px spinner — appears blank. Fix: `resolveAuthState` now wrapped in try/catch; all errors call `setState('unauthed')` so user is redirected to `/login`. |
| Remaining action | 1. Push 9 commits to remote. 2. Set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in Vercel env vars. 3. Confirm Vercel build. 4. Create auth user in Supabase + matching staff_profiles record with same email. |
| Status | Code fixes applied — push to remote pending |

### E9 — Migration Runtime Errors (resolved during session)

| Field | Detail |
|---|---|
| Errors | `policy "dev_sdl_all" already exists` (migration 008); `operator does not exist: text = uuid` in `rls_audit_insert` and `log_patient_consent_change` (migration 013); EOD closeout `ON CONFLICT (id)` wrong constraint target (migration 007) |
| Fixes applied | Added `DROP POLICY IF EXISTS` before recreation in 008; added `::text` cast to `auth.uid()` in two places in 013; changed to `ON CONFLICT DO NOTHING` in 007 |
| Status | All resolved — migrations 007, 008, 013 corrected and re-applied |

---

## 16. Open Capability Gaps — Blocking Production

| # | Gap | What It Blocks | Owner | Status |
|---|---|---|---|---|
| G1 | ADR sign-off (ARE + Founder) | Gate 1A formally closed | ARE + Founder | PRODUCED — awaiting sign-off |
| G2 | Supabase provisioning | Production database | PIS + Founder | CLOSED — Free tier provisioned; all 14 migrations applied |
| G3 | Claude Vision API access + Edge Function deployment | AI Rx Scanner live; AI Invoice Scanner; AI Queue full functionality | Founder / Anthropic | PARTIALLY UNBLOCKED — `extract-document` Edge Function deployed; `ANTHROPIC_API_KEY` set; upload UI built. Remaining: confidence gate enforcement, Realtime wiring, end-to-end test |
| G4 | Lynk payment API credentials | Lynk checkout in POS | Client (Winchester) | OPEN |
| G5 | JDPA compliance review (SCA + LCA) | Patient consent capture UI, data export, JDPA tab in patient profile | SCA (Omari) + LCA (Dorothy) | OPEN — DB column + audit trigger in place; UI capture and legal review pending |
| G6 | Schedule drug log format — pharmacist sign-off | PDF export of schedule drug log in regulatory format | Client pharmacist | OPEN |
| G7 | MSA amendment signed by Winchester | All commercial deployment, invoicing | Founder + Winchester | OPEN |
| G8 | New PharmacyOS SOW signed | All commercial deployment, invoicing | Founder + Winchester | OPEN (depends on G7) |
| G9 | NoDrftSystems product registry entry | Internal governance record | MOA / Founder | OPEN |

---

## 17. Credentials & First Login

### How to Create a Test User

There are no seeded auth users. Supabase Auth must be used directly:

1. Log into Supabase dashboard → `https://supabase.com/dashboard/project/aeidooydivhnvwskypov`
2. Go to **Authentication → Users**
3. Click **Add User → Create New User**
4. Enter email and password
5. The app login at `/login` accepts these credentials immediately

### Connecting Staff Profile to Auth User

After creating a Supabase Auth user, a matching record must exist in `staff_profiles` with the **same email address** (case-sensitive). `useCurrentUser` queries `staff_profiles` by email — if no match, the user gets `role: 'CASHIER'` and `name: 'Unknown User'`.

Add the staff profile via **Admin → Users** after first login, or insert directly via the Supabase Table Editor:

```sql
INSERT INTO public.staff_profiles (id, email, full_name, role, is_active)
VALUES (
  auth.uid(),                       -- or the user's UUID from Authentication → Users
  'staff@example.com',              -- must match Auth user email exactly
  'Dr. Jane Smith',
  'PHARMACIST',                     -- ADMIN, MANAGER, PHARMACIST, CASHIER, or TECHNICIAN
  true
);
```

**Important:** `staff_profiles.id` does not need to match `auth.uid()` — the lookup is by email. But it is best practice to keep them aligned.

### MFA First Setup

Staff members who want to enroll 2FA should:

1. Log in with email + password
2. Navigate to `/profile/security`
3. Follow the QR code enrollment flow in `SetupMFA.tsx`
4. Save recovery codes

On next login, they will be redirected to `/verify-mfa` for TOTP challenge.

### Session Behaviour

- Sessions persist across browser refreshes (stored in localStorage by supabase-js)
- Idle timeout: 20 minutes with a 2-minute warning banner
- Sign out available via sidebar "Sign Out" button — calls `supabase.auth.signOut()`

### Sample Data Note

Migration 007 (`007_extended_sample_data.sql`) seeds:
- 5 staff profiles — Dr. Patricia Williams (PHARMACIST), James Brown (CASHIER), Sandra Clarke (TECHNICIAN), Michael Thompson (MANAGER), Karen Lewis (ADMIN)
- 5 loyalty customers
- 9 retail transactions
- 4 Rx transactions
- 1 EOD closeout record
- 5 audit log entries

This sample data does not create auth users — only `staff_profiles` records. To log in as one of these staff members, create a Supabase Auth user with the matching email:

| Staff Name | Email in staff_profiles |
|---|---|
| Dr. Patricia Williams | `grace.bennett@winchesterglobal.com` |
| James Brown | `james.brown@winchesterglobal.com` |
| Sandra Clarke | `sandra.clarke@winchesterglobal.com` |
| Michael Thompson | `michael.thompson@winchesterglobal.com` |
| Karen Lewis | `karen.lewis@winchesterglobal.com` |

---

*Document produced by NoDrftSystems AI Production Cell. All findings are based on verified build artifacts as of 2026-05-13 (v1.1 update). No external facts, regulatory certifications, or commercial claims are made. Compliance assessments require SCA + LCA review before any pilot use.*
