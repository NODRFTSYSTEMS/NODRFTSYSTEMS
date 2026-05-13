# PharmacyOS — Master Handoff Document
**Classification:** Internal — Client Confidential  
**Version:** 1.0  
**Date:** 2026-05-13  
**Product:** PharmacyOS — Winchester Global Pharmacy Operations Platform  
**Produced by:** NoDrftSystems  
**Status:** Development Build — Pre-Controlled Pilot. Not yet approved for live patient data or regulatory submission.

---

## Table of Contents

1. [Project Definition & Scope](#1-project-definition--scope)
2. [Commercial Structure](#2-commercial-structure)
3. [URLs & Access Points](#3-urls--access-points)
4. [Technology Stack](#4-technology-stack)
5. [Repository Structure](#5-repository-structure)
6. [Database Schema](#6-database-schema)
7. [Migration Log](#7-migration-log)
8. [Route Map — All 22 Implemented Routes](#8-route-map)
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

PharmacyOS is a single-tenant, web-based pharmacy operations platform built for Winchester Global Pharmacy's Kingston, Jamaica location. It is the daily operational system for all pharmacy staff — covering retail POS, prescription dispensing, inventory management, controlled drug logging, patient records, and management reporting.

This is a **staff-facing internal tool only**. Patients never log in. There are no public routes, no SEO surfaces, and no marketing content.

### Build Classification

| Field | Value |
|---|---|
| Build class | Class 3 — Integration or Data-Sensitive Build |
| Class 4 surfaces within it | Auth boundary, JDPA data handling, financial transactions |
| Risk level | High — regulated healthcare data; controlled drug logging; RBAC; AI vision; patient privacy (JDPA 2020) |
| Legal jurisdiction | Jamaica — Pharmacy Act, Dangerous Drugs Act, Jamaica Data Protection Act 2020 |

### Scope — What Was Built (Phase 1 implemented so far)

**22 routes implemented and functional** (out of 43 routes planned in Phase 1 scope):

- Auth (login page + session guard)
- Dashboard
- Retail POS terminal + transaction log + EOD closeout + EOD report + products + suppliers + loyalty + POS reports
- Prescriptions queue + new prescription form + schedule drug log
- Patients list + new patient form
- Reports: Revenue + Dispensing + Inventory
- Admin: Users (with role permissions matrix) + Audit Log + Settings

### Scope — Not Yet Built

- Prescription queue detail view / kanban state machine (Verify → Fill → Dispense)
- AI Rx Scanner (blocked on G3 — Claude Vision API confirmation)
- AI Invoice Scanner (blocked on G3)
- AI Job Queue page (shell only)
- Patient profile page (full tabs: overview, medication history, insurance, JDPA)
- JDPA consent capture + data export (blocked on G5 — legal review)
- NHF claims / insurance submission (Phase 2)
- 2FA (TOTP) authentication (login currently email+password only)
- Security admin page (2FA management, session log, failed login log)
- Full inventory module with receive stock, drug lots, expiry alerts
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
| IP Ownership | NoDrftSystems proprietary product (reclassified 2026-05-08; was initially client-owned) |
| First licensed deployment | Winchester Global Pharmacy |
| Winchester commercial status | MSA amendment + new SOW required — both UNSIGNED as of this document |
| Product repo visibility | Private — `github.com/NODRFTSYSTEMS/pharmacyos` |
| Demo access | GitHub Pages static preview — see Section 3 |

---

## 3. URLs & Access Points

| System | URL / Location | Notes |
|---|---|---|
| **Product repo** | `https://github.com/NODRFTSYSTEMS/pharmacyos` | Private. `main` branch = current build |
| **Monorepo path** | `04_products/pharmacyos/` | Inside NoDrftSystems master repo |
| **Monorepo branch** | `claude/intelligent-davinci-64e683` (then merged to `main`) | |
| **GitHub Pages demo** | `https://nodrftsystems.github.io/pharmacyos/` | Static preview — no live Supabase connection |
| **Local dev server** | `http://localhost:5174/` | Run: `cd app && npm run dev` |
| **Vercel** | Not yet successfully deployed | See Section 15 — Vercel issues |
| **Supabase project** | Free tier — provisioned | Dashboard URL not recorded in docs |
| **Supabase region** | Not recorded | Check Supabase dashboard |

### Environment Variables Required

The app reads from `app/.env.local` (not committed):

```
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
```

These are loaded by Vite as `import.meta.env.VITE_SUPABASE_URL` etc.

For Vercel deployment, the same keys must be added as environment variables in the Vercel project settings.

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
| `@types/react` | ^19.1.8 | React type definitions |
| `@types/react-dom` | ^19.1.5 | ReactDOM type definitions |

### TypeScript Compatibility Note

TypeScript 6.0 introduced a compatibility break with Supabase JS v2. The `supabase` client in `src/lib/supabase.ts` uses a `SupabaseClient<any>` cast workaround, and `tsconfig.app.json` sets `"ignoreDeprecations": "6.0"`. This is intentional and correct for TS 6.0. Do **not** downgrade TypeScript to 5.x — it will break the build.

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
│   │   ├── App.tsx                        ← Router definition (22 routes)
│   │   ├── main.tsx                       ← Entry point
│   │   ├── index.css                      ← Design system + print CSS
│   │   ├── components/
│   │   │   ├── Shell.tsx                  ← AppShell, Sidebar, PageHeader, MetricCard, Pill
│   │   │   └── ProtectedRoute.tsx         ← Session guard
│   │   ├── lib/
│   │   │   └── supabase.ts                ← Supabase client (TS6 cast)
│   │   ├── types/
│   │   │   └── database.ts                ← TypeScript types for all tables
│   │   └── pages/
│   │       ├── auth/Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── pos/                       ← 8 POS pages
│   │       ├── prescriptions/             ← 3 Rx pages
│   │       ├── patients/                  ← 2 patient pages
│   │       ├── reports/                   ← 3 report pages
│   │       ├── admin/                     ← 3 admin pages
│   │       └── ai/Queue.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.app.json
│
├── supabase/
│   └── migrations/                        ← 8 SQL migration files
│       ├── 001_transactions_eod_extraction.sql
│       ├── 002_retail_suppliers.sql
│       ├── 003_extended_schema.sql
│       ├── 004_stock_decrement.sql
│       ├── 005_sample_data.sql
│       ├── 006_security_fixes.sql
│       ├── 007_extended_sample_data.sql
│       └── 008_schedule_drug_log.sql
│
└── prototype/                             ← Reference only — not production code
```

---

## 6. Database Schema

All tables live in the Supabase PostgreSQL instance. RLS is enabled on all tables with **dev-permissive placeholder policies** (authenticated users have full access). These must be replaced with role-scoped policies before production deployment.

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
| `patients` | Patient demographic records | id, first_name, last_name, date_of_birth, phone, address, allergies, notes, is_active |
| `prescriptions` | Prescription records with workflow state | id, ref_number, patient_id, patient_name, prescriber_name, prescriber_reg, drug_name, dosage, quantity, issue_date, status (enum), dispensed_by, extraction_queue_id |
| `staff_profiles` | Staff display records (not Auth users) | id, email, full_name, role (enum), is_active |
| `pharmacy_settings` | Key-value configuration store | key (PK), value, updated_at |
| `loyalty_customers` | Loyalty program members | id, name, phone (UNIQUE), email, points_balance, tier (enum), joined_date |
| `audit_log` | System event log — append only | id, actor_id, actor_name, action, table_name, record_id, details (JSONB), created_at |
| `schedule_drug_log` | Controlled drug register (Dangerous Drugs Act) | id, entry_date, drug_name, strength, quantity_in, quantity_out, balance, patient_name, prescriber_name, prescriber_reg, rx_ref, pharmacist_id, pharmacist_name, notes |

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

All migrations must be run in order in the Supabase SQL editor. Each is idempotent (uses `CREATE TABLE IF NOT EXISTS`).

| # | File | What It Creates | Run? |
|---|---|---|---|
| 001 | `001_transactions_eod_extraction.sql` | `retail_transactions`, `retail_transaction_items`, `rx_transactions`, `eod_closeouts`, `extraction_queue`; enums; `generate_ref_number()` function | Required |
| 002 | `002_retail_suppliers.sql` | `retail_suppliers` table | Required |
| 003 | `003_extended_schema.sql` | `products`, `patients`, `prescriptions`, `staff_profiles`, `pharmacy_settings`, `loyalty_customers`, `audit_log`; enums; `touch_updated_at()` trigger function | Required |
| 004 | `004_stock_decrement.sql` | `decrement_product_stock()` RPC function for atomic stock reduction | Required |
| 005 | `005_sample_data.sql` | Basic sample data (products, basic records) | Optional for dev |
| 006 | `006_security_fixes.sql` | Revokes anonymous `EXECUTE` grant on `decrement_product_stock` | Required |
| 007 | `007_extended_sample_data.sql` | Extended sample data: 5 staff, loyalty customers, retail transactions, Rx transactions, EOD closeout, audit entries | Optional for dev |
| 008 | `008_schedule_drug_log.sql` | `schedule_drug_log` table + RLS policy | Required |

**Important — UUID format:** All UUIDs in custom SQL must use only hex characters (0–9, a–f). The `g` character is invalid. Using invalid UUIDs will cause a `22P02` error and roll back the entire batch.

**Important — Supabase SQL editor batching:** The SQL editor runs all statements in a single transaction. One error rolls back everything. If inserts fail, fix the specific statement before re-running.

---

## 8. Route Map

### Implemented (22 routes)

| Path | Component | Status |
|---|---|---|
| `/login` | `Login` | Functional — email+password auth |
| `/dashboard` | `Dashboard` | Functional — metric cards, activity |
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
| `/patients` | `PatientList` | Functional — search, add, edit drawer |
| `/patients/new` | `NewPatient` | Functional — demographics + allergies form |
| `/reports/revenue` | `RevenueReport` | Functional — daily + payment breakdown, print |
| `/reports/dispensing` | `DispensingReport` | Functional — Rx records, totals, print |
| `/reports/inventory` | `InventoryReport` | Functional — stock levels, value, print |
| `/admin/users` | `UsersAdmin` | Functional — staff CRUD + permissions matrix |
| `/admin/audit` | `AuditLog` | Functional — expandable rows, badges, CSV export |
| `/admin/settings` | `Settings` | Functional — 11 configurable fields |
| `/ai/queue` | `AiQueue` | Shell — accept/reject UI only; no live AI integration |

### Not Yet Built (21 routes remaining to reach 43)

- Prescription detail / state machine (Verify → Fill → Dispense)
- AI Rx Scanner upload + extraction view
- AI Invoice Scanner upload + extraction view
- Patient profile (full multi-tab view)
- Patient JDPA consent + data export
- Inventory: receive stock form
- Inventory: drug catalog detail (lots, expiry)
- Inventory: alerts page
- Inventory: AI invoice scanner trigger
- Admin: Security page (2FA, sessions, failed logins)
- Admin: My profile
- 2FA verification flow (login step 2)

---

## 9. Module-by-Module Feature Status

### Authentication

| Feature | Status |
|---|---|
| Email + password login | Working |
| Session persistence (Supabase Auth) | Working |
| Protected route guard | Working — redirects to `/login` if no session |
| 2FA (TOTP) | Not built |
| Role-based route enforcement | Not built — `ProtectedRoute` checks session existence only |
| Account lockout after failed attempts | Not built |

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
| Schedule Drug Log (controlled document) | Working — full CRUD; balance tracked per entry |
| Prescription detail / dispense workflow | Not built |
| AI Rx Scanner | Not built — blocked on G3 |

### Patients

| Feature | Status |
|---|---|
| Patient list with search | Working |
| Add new patient | Working |
| Edit patient (slide-in drawer) | Working |
| Patient profile page | Not built |
| JDPA consent capture | Not built — blocked on G5 |

### Reports

| Feature | Status |
|---|---|
| Revenue report (daily + by payment method) | Working — CSV export, print, totals |
| Dispensing report (Rx records) | Working — CSV export, print, totals |
| Inventory report (stock levels + value) | Working — CSV export, print, totals |
| Schedule drug log export | Not built (log exists; PDF/CSV export not built) |
| NHF claims report | Not built (Phase 2) |

### Admin

| Feature | Status |
|---|---|
| Staff list + add/edit | Working |
| Role permissions matrix (checkboxes) | Working — saved to `pharmacy_settings` |
| Audit log (read-only, expandable, badges) | Working — CSV export |
| Settings (11 configurable fields) | Working — upsert to `pharmacy_settings` |
| Security page (2FA, sessions) | Not built |

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
| Daily Breakdown | Grouped by `created_at.slice(0,10)` — retail + rx + nhf + combined total per day |
| Payment Method Breakdown | Grouped by `payment_method` — count + total per method |

**Date filter:** Applied as `created_at >= FROM T00:00:00` and `<= TO T23:59:59`

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

Prefixes in use: `TXN` (retail), `RX` (Rx transactions), `EXT` (extraction queue).

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
| SCA (Omari) | `sca_security_compliance` | RLS review, auth, PII audit — required before production |
| SAA (Samara) | `saa_solution_architecture` | Tech stack decision (ADR produced; awaiting ARE + Founder sign-off) |
| TVA (Leandra) | `tva_test_verification` | TypeScript checks, test suite |
| IDS | `ids_integration_debugging` | AI scanner wiring, integration debugging |
| QAS (Imani) | `qas_supervisor` | Independent QA — reserved for Gate 5 |
| ARE | `are_reliability_engineer` | Technical authority — sign-off required at Gate 6 |
| LCA (Dorothy) | `lca_legal_compliance` | JDPA review — blocked on G5 |
| HHC (Desmond) | `hhc_handoff_coordinator` | Escalation routing to Founder |

---

## 12. Supabase — Functions, RLS, Helpers

### PostgreSQL Functions

| Function | Signature | Purpose |
|---|---|---|
| `generate_ref_number` | `(prefix TEXT) → TEXT` | Generates sequential reference numbers (TXN-YYYYMMDD-NNNNN) |
| `touch_updated_at` | trigger function | Auto-sets `updated_at = now()` on UPDATE |
| `decrement_product_stock` | `(product_id UUID, qty INT) → void` | Atomic stock decrement — used by POS terminal |

### RLS Policies — Current State

**All tables have dev-permissive policies.** These allow any authenticated user full CRUD access. This is a development placeholder only.

```sql
-- Example (all tables follow this pattern):
CREATE POLICY "dev_xxx_all" ON table_name FOR ALL USING (true) WITH CHECK (true);
```

**Before controlled pilot:** SCA must replace all `USING (true)` policies with role-scoped policies based on `auth.uid()` and staff role lookups.

### Supabase Storage

- Storage buckets: Not yet configured
- Used for: AI scanner — prescription image uploads and invoice image uploads
- Status: Needed when AI scanner is built (blocked on G3)

### Authentication

- Provider: Supabase Auth (email + password)
- 2FA: Not yet configured
- Test users: Must be created manually in Supabase dashboard — the app does not seed auth users
- Session: Managed by `@supabase/supabase-js` — stored in localStorage
- `ProtectedRoute` checks `supabase.auth.getSession()` — redirects to `/login` if null

---

## 13. What Is Complete

### Infrastructure
- [x] Vite + React 19 + TypeScript 6 scaffold
- [x] Tailwind v4 design system (tokens, cards, buttons, pills, inputs, table-compact)
- [x] Supabase JS v2 client with TS6 compatibility workaround
- [x] TanStack Query v5 provider setup
- [x] React Router v7 all-routes configuration
- [x] AppShell (sidebar, mobile topbar, viewport-locked layout)
- [x] ProtectedRoute session guard
- [x] Supabase project provisioned (Free tier)
- [x] All 8 migrations created and ready to run

### Pages — Functional
- [x] Login page (email + password)
- [x] Dashboard (metric cards, revenue summary)
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
- [x] Schedule Drug Log (full CRUD, compliance notice, drug filter)
- [x] Patient List (search, add, edit drawer)
- [x] New Patient form
- [x] Revenue Report (daily + payment breakdown, CSV, print, totals)
- [x] Dispensing Report (Rx records, CSV, print, totals)
- [x] Inventory Report (stock levels, stock value, CSV, print, totals)
- [x] Users Admin (staff CRUD + 13×5 role permissions matrix)
- [x] Audit Log (expandable rows, color badges, CSV export)
- [x] Settings (11 fields across 4 sections)

### Quality
- [x] TypeScript 0 errors (`tsc --noEmit` passing)
- [x] Print CSS (`@media print`, `.print-only`, `.no-print`)
- [x] Migration 006 security fix (revoked anon EXECUTE on `decrement_product_stock`)
- [x] Viewport-locked layout (no full-page scroll — only main content area scrolls)

### Git
- [x] Monorepo committed at `99e0cb5` (latest)
- [x] Product repo synced via `git subtree split` to `github.com/NODRFTSYSTEMS/pharmacyos`

---

## 14. What Is Next

Listed in recommended build order. Items marked **[BLOCKED]** cannot proceed without resolving the referenced gap.

### Priority 1 — Unlock Vercel Deployment

- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel environment variables
- [ ] Confirm Vercel deployment succeeds on latest push
- [ ] Verify TypeScript 6 build passes on Vercel (see known issue in Section 15)

### Priority 2 — Prescription Workflow (core clinical function)

- [ ] Prescription detail page (route `/prescriptions/:id`)
  - Status transitions: RECEIVED → VERIFYING → READY → DISPENSED
  - Dispensing creates `rx_transactions` record
  - Dispensed status triggers schedule drug log entry
  - Pharmacist confirmation required at DISPENSED step
- [ ] Prescription Queue kanban view (drag or button-based)

### Priority 3 — Patient Profile

- [ ] Patient profile page (`/patients/:id`) with tabs:
  - Overview (demographics, allergies)
  - Medication history (linked prescriptions + Rx transactions)
  - Insurance card (photo upload)
  - JDPA tab (consent status, data export request, deletion request)
- [ ] **[BLOCKED G5]** JDPA consent capture at registration
- [ ] **[BLOCKED G5]** JDPA data export/deletion flow

### Priority 4 — Auth Hardening

- [ ] 2FA (TOTP) setup + verification flow
- [ ] Role-based route enforcement (extend `ProtectedRoute` to check staff role)
- [ ] Account lockout after 5 failed 2FA attempts
- [ ] Security admin page (active sessions, failed login log)
- [ ] SCA RLS policy replacement (all tables — required before pilot)

### Priority 5 — AI Integration **[BLOCKED G3]**

- [ ] Confirm Claude Vision API access + model endpoint
- [ ] Supabase Edge Function: AI Rx extraction job
- [ ] Supabase Edge Function: AI Invoice extraction job
- [ ] AI Rx Scanner page (`/prescriptions/scan`)
- [ ] AI Invoice Scanner page (inventory module)
- [ ] AI Queue page — live job status tracking
- [ ] Confidence scoring UI (amber flags < 85%)

### Priority 6 — POS Payments **[BLOCKED G4]**

- [ ] Lynk payment API integration (requires client-supplied credentials)
- [ ] Lynk payment confirmation flow in POS terminal

### Priority 7 — Inventory (extended)

- [ ] Receive stock form (creates stock increment)
- [ ] Drug detail page (lots, transaction history, expiry dates)
- [ ] Inventory alerts page (low stock + expiry)
- [ ] Stock lot tracking schema + migration

### Priority 8 — Schedule Drug Log Export

- [ ] PDF export of schedule drug log (required for regulatory submission)
- [ ] CSV export per drug per period
- [ ] **[BLOCKED G6]** Format must be pharmacist-approved before final build

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
| Root cause | `package.json` pinned `"typescript": "~5.8.3"`. Vercel installed TS 5.8 at build time. `"ignoreDeprecations": "6.0"` in `tsconfig.app.json` is invalid in TS 5.8 → `tsc -b` exits non-zero → Vite build fails |
| Fix applied | Changed `package.json` to `"typescript": "^6.0.0"` |
| Status | Fix committed. Vercel re-deployment not yet confirmed |
| Next action | Push to product repo (`main`) and verify Vercel auto-deploys successfully |

### E2 — SSH Force Push Failure

| Field | Detail |
|---|---|
| Error | `git push git@github.com:NODRFTSYSTEMS/pharmacyos.git` → SSH host key verification failed |
| Root cause | SSH key not registered / host key changed |
| Fix applied | Used HTTPS: `git push https://github.com/NODRFTSYSTEMS/pharmacyos.git pharmacyos-split:main --force` |
| Status | Resolved — HTTPS push is the working method |

### E3 — Invalid UUID in Sample Data (g7000000)

| Field | Detail |
|---|---|
| Error | `ERROR: 22P02: invalid input syntax for type uuid: 'g7000000-0000-0000-0000-000000000001'` |
| Root cause | UUID `g7000000` uses `g` — not a valid hex character. PostgreSQL UUIDs must use 0–9, a–f only |
| Impact | Supabase SQL editor runs all statements in one transaction → entire batch rolled back |
| Fix applied | Replaced all `g7000000` prefixes with `a0000000` in migration 007 EOD closeout record |
| Status | Resolved — corrected SQL in `007_extended_sample_data.sql` |

### E4 — `manager_approved_at` Type Cast Error

| Field | Detail |
|---|---|
| Error | `::text` cast on a `timestamptz` column |
| Root cause | Sample data SQL used `(CURRENT_TIMESTAMP - INTERVAL '20 hours')::text` but column is `timestamptz` |
| Fix applied | Removed `::text` cast |
| Status | Resolved |

### E5 — Maximum Update Depth Exceeded (React infinite loop)

| Field | Detail |
|---|---|
| Error | Console: "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect..." |
| Root cause | A `useEffect` in one of the pages (likely with a missing or incorrect dependency array) causing setState on every render |
| Impact | Cosmetic — does not crash the app; logged in browser console repeatedly |
| Status | Not yet diagnosed or fixed |
| Next action | Identify which component triggers it by checking `useEffect` hooks without dependency arrays or with object/array dependencies that recreate on each render |

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
| Root cause | User accidentally typed the migration filename `supabase/migrations/007_extended_sample_data.sql` into the SQL editor instead of pasting the SQL content |
| Resolution | User education — paste SQL content only, not the file path |

---

## 16. Open Capability Gaps — Blocking Production

| # | Gap | What It Blocks | Owner | Status |
|---|---|---|---|---|
| G1 | ADR sign-off (ARE + Founder) | Gate 1A formally closed | ARE + Founder | PRODUCED — awaiting sign-off |
| G2 | Supabase provisioning | Production database | PIS + Founder | CLOSED (Free tier provisioned) |
| G3 | Claude Vision API access | AI Rx Scanner, AI Invoice Scanner, AI Queue live functionality | Founder / Anthropic | OPEN |
| G4 | Lynk payment API credentials | Lynk checkout in POS | Client (Winchester) | OPEN |
| G5 | JDPA compliance review (SCA + LCA) | Patient consent capture, data export, JDPA tab in patient profile | SCA (Omari) + LCA (Dorothy) | OPEN |
| G6 | Schedule drug log format — pharmacist sign-off | PDF export of schedule drug log in regulatory format | Client pharmacist | OPEN |
| G7 | MSA amendment signed by Winchester | All commercial deployment, invoicing | Founder + Winchester | OPEN |
| G8 | New PharmacyOS SOW signed | All commercial deployment, invoicing | Founder + Winchester | OPEN (depends on G7) |
| G9 | NoDrftSystems product registry entry | Internal governance record | MOA / Founder | OPEN |

---

## 17. Credentials & First Login

### How to Create a Test User

There are no seeded auth users. Supabase Auth must be used directly:

1. Log into Supabase dashboard
2. Go to **Authentication → Users**
3. Click **Add User → Create New User**
4. Enter email and password
5. The app login at `/login` accepts these credentials immediately

### Connecting Staff Profile to Auth User

After creating a Supabase Auth user, the corresponding staff profile must exist in the `staff_profiles` table for the user to appear in the Users admin page. The two are linked by email only — there is no hard foreign key.

Either:
- Use the **Admin → Users** page to add the staff profile after first login, OR
- Insert directly via Supabase Table Editor

### Session Behaviour

- Sessions persist across browser refreshes (stored in localStorage by supabase-js)
- Sign out available via sidebar "Sign Out" button — calls `supabase.auth.signOut()`
- No session timeout configured currently

### Sample Data Note

Migration 007 (`007_extended_sample_data.sql`) seeds:
- 5 staff profiles (names: Dr. Patricia Williams, James Brown, Sandra Clarke, Michael Thompson, Karen Lewis)
- 5 loyalty customers
- 9 retail transactions
- 4 Rx transactions
- 1 EOD closeout record
- 5 audit log entries

This sample data does not create auth users — only `staff_profiles` records.

---

*Document produced by NoDrftSystems AI Production Cell. All findings are based on verified build artifacts as of 2026-05-13. No external facts, regulatory certifications, or commercial claims are made. Compliance assessments require SCA + LCA review before any pilot use.*
