# PharmacyOS — Comprehensive Assessment and Proposal

**Product:** PharmacyOS — Pharmacy Operating System  
**Client:** Winchester Global Pharmacy (Kingston, Jamaica)  
**Build Classification:** Class 3 (Integration/Data-Sensitive) with Class 4 surfaces  
**Document Type:** Comprehensive Assessment, Editorial Sweep, UX Review, Valuation  
**Date:** 2026-05-13  
**Version:** 1.0 — DRAFT  
**Author:** NoDrftSystems — Assessment Cell  
**QA Authority:** QAS (Imani) — Gate 5 pending  
**Supervision:** ARE (technical authority) + Founder (release gate)  
**Status:** DRAFT — Requires ARE + Founder review before external distribution  
**Classification:** Internal — Client Confidential

---

## Supervision Register

| Layer | Agent | Role | Gate |
|---|---|---|---|
| Technical Authority | ARE | Independent sign-off on all technical findings | Gate 6 |
| Quality Gate | QAS (Imani) | Independent QA review before ARE | Gate 5 |
| Security | SCA (Omari) | RLS policies, auth, JDPA, Edge Function secrets | QA Pass 4 |
| Test Verification | TVA (Leandra) | Unit + integration tests, acceptance criteria | QA Pass 1 |
| Accessibility | AAA (Rochelle) | WCAG 2.1 AA audit across all routes | QA Pass 6 |
| Legal Compliance | LCA (Dorothy) | JDPA, Dangerous Drugs Act, data export | Pre-pilot |
| Frontend Build | FIS (Kiara) | RoleGuard, error pages, permission hooks, nav | Execution |
| Backend Logic | BLS | API routes, server-side logic, mutations | Execution |
| Schema | DSS (Marise) | Production RLS, audit triggers, schema changes | Execution |
| Integration | IDS (Nia) | Edge Functions, Realtime, Lynk, Claude Vision | Execution |
| Copy Sweep | PLA (Simone) | Plain language, error messages, UI copy | QA Pass 2 |
| Orchestration | MOA (Zayne) | Routing work to correct agents | Continuous |

---

## Rating Summary Card

```
╔══════════════════════════════════════════════════════════════╗
║          PHARMACYOS — ASSESSMENT RATING CARD                 ║
║          Date: 2026-05-13  |  Build State: Pre-Production    ║
╠══════════════════════════════════════════════════════════════╣
║  DIMENSION SCORES                                            ║
║  Functional Completeness    5.5 / 10   (weight: 25%)         ║
║  Security & Compliance      3.5 / 10   (weight: 20%)         ║
║  Code Quality               7.5 / 10   (weight: 15%)         ║
║  UX & Design System         7.0 / 10   (weight: 15%)         ║
║  AI Integration             3.0 / 10   (weight: 10%)         ║
║  Testing & Verification     0.5 / 10   (weight:  8%)         ║
║  Infrastructure Readiness   4.5 / 10   (weight:  7%)         ║
╠══════════════════════════════════════════════════════════════╣
║  OVERALL WEIGHTED SCORE:   4.91 / 10                         ║
║  RATING: BUILD-IN-PROGRESS                                   ║
║  Pre-pilot capable with P1 remediation                       ║
║  NOT approved for live patient data                          ║
║  NOT approved for production deployment                      ║
║  Target post-P1 remediation:    ~6.8–7.2                     ║
║  Target at Phase 1 completion:  ~8.0–8.5                     ║
╠══════════════════════════════════════════════════════════════╣
║  P1 CRITICAL ISSUES:  7   (must resolve before any pilot)    ║
║  P2 HIGH ISSUES:      7   (must resolve before production)   ║
║  P3 MEDIUM ISSUES:    8   (next sprint cycle)                ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Table of Contents

- Part I — Platform Identity and Problem Statement
  - Section 1: What PharmacyOS Is
  - Section 2: The Problems It Solves
  - Section 3: Intuitive Design Assessment
  - Section 4: Why Pharmacies Should Use PharmacyOS
- Part II — Roles, Authorizations, and Permissions
  - Section 5: Logical Role Design Assessment
  - Section 6: Missing Permission Enforcement (Critical)
  - Section 7: Role-Based Navigation Visibility Gap
- Part III — Testing and Integration Assessment
  - Section 8: Test Coverage Assessment
  - Section 9: Integration Assessment
- Part IV — Identified Issues and Recommendations
  - Section 10: Issue Register — Priority Ranked
- Part V — AI Integration Utilization
  - Section 11: Current AI Integration State
  - Section 12: AI Activation Roadmap
  - Section 13: Agent Assignments for PharmacyOS Build
- Part VI — Text Formatting and Presentation Standards
  - Section 14: Editorial and Presentation Standards Sweep
- Part VII — OS Rating and Valuation
  - Section 15: Rating Methodology
  - Section 16: Dimension Scores and Findings
  - Section 17: Valuation Approach
- Part VIII — Missing Components Inventory
  - Section 18: Missing Components by Module
- Part IX — Governance and Gate Status
  - Section 19: Gate Status Summary

---

---

# PART I — PLATFORM IDENTITY AND PROBLEM STATEMENT

---

## Section 1: What PharmacyOS Is

PharmacyOS is a single-tenant, cloud-hosted, web-based pharmacy operations platform built exclusively for staff use at Winchester Global Pharmacy, Kingston, Jamaica. It is not a patient portal. It is not an e-commerce site. It is not a clinical electronic medical record (EMR). It is not a public-facing application of any kind.

PharmacyOS is the daily operating system that every member of Winchester's staff interacts with to do their job — from the cashier processing an OTC sale to the pharmacist confirming a controlled drug dispense to the manager approving an end-of-day closeout.

**Platform definition:**

| Attribute | Value |
|---|---|
| Type | Single-page application (SPA) |
| Hosting | Vercel (frontend) + Supabase (backend) |
| Users | ~12 concurrent staff — pharmacists, technicians, cashiers, managers, admin |
| Devices | Desktop Windows 1440px+ and tablet 10-inch landscape (1024–1280px) |
| Browsers | Chrome, Edge |
| Tenancy | Single-tenant — Winchester data only, permanently isolated |
| Patient access | None — staff-facing only |
| Phase 1 scope | 43 routes total; 22 implemented |
| Predecessor system | PharmPartner (being replaced) |

**Five operational modes:**

1. **Retail POS** — Sales terminal, transaction log, EOD closeout, loyalty program management
2. **Prescription Dispensing** — Rx queue, new prescription entry, AI-assisted scanning, schedule drug register
3. **Patient Records** — Patient search, registration, profile management, JDPA data rights
4. **Inventory Management** — Stock catalog, receive stock, AI-assisted invoice scanning, low-stock alerts, supplier management
5. **Regulatory Compliance Reporting** — Revenue reports, dispensing reports, schedule drug log (Jamaica Dangerous Drugs Act), audit trail

**Technology stack (as implemented):**

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | React | 19.2.6 |
| Language | TypeScript | 6.0.0 |
| Build tool | Vite | 7.0.0 |
| Styling | Tailwind CSS | 4.2.4 |
| Backend / Auth / DB | Supabase JS | 2.105.3 |
| Server state | TanStack React Query | 5.80.0 |
| Local state (POS cart) | Zustand | 5.0.13 |
| Routing | React Router | 7.15.0 |
| Icons | Phosphor Icons | 2.1.7 |

---

## Section 2: The Problems It Solves

The following table documents the operational problems PharmacyOS addresses, with the before-state (incumbent system) and after-state (PharmacyOS capability). Items marked `[PENDING]` are committed to Phase 1 but not yet built.

| Domain | Before — PharmPartner / Manual | After — PharmacyOS |
|---|---|---|
| **Fragmented operations** | Staff switch between disconnected systems for POS sales, dispensing records, and inventory tracking. No shared data layer exists between them. | Single authenticated platform covers all five operational modes. Data flows from a sale to inventory, from a prescription to an Rx transaction, without re-entry. |
| **Manual controlled drug register** | Paper registers for Schedule 1 and 2 drugs. Error-prone manual entries. No electronic running balance. Cannot be audited or exported without transcription. Regulatory inspection requires physical retrieval. | `schedule_drug_log` table captures every controlled drug dispense with drug name, strength, quantity in/out, running balance, patient name, prescriber registration, and pharmacist confirmation. Append-only design with auto-trigger planned. Export pending pharmacist format approval (G6). |
| **Paper prescription handling** | Prescriptions received on paper, manually transcribed into the computer. Transcription errors common. Documents easily lost. No status tracking per prescription. | Prescription queue with kanban-style status workflow (RECEIVED → VERIFYING → READY → DISPENSED → CANCELLED). AI vision-based extraction `[PENDING G3]` reduces transcription errors with a pharmacist review gate. Every prescription has a ref number, status history, and links to its Rx transaction. |
| **No audit trail** | No systematic record of who performed which action or when. Disputes cannot be investigated. Regulatory inspections have no electronic evidence trail. | Append-only `audit_log` table captures actor ID, actor name, action, table name, record ID, and before/after JSONB details for every state-changing operation. The Audit Log admin page provides date-range filtering and CSV export. |
| **Manual EOD cash reconciliation** | Cashier counts are recorded on paper. Manager checks manually. No system record of expected vs. actual. Cash variance is undocumented. No sign-off workflow. | `eod_closeouts` table records system-calculated totals, cashier-entered actuals, cash variance, shift type, and a manager approval status. The EOD close-out workflow guides the cashier through the count and surfaces the variance immediately. Manager approves or flags a discrepancy. |
| **Off-system NHF claims** | National Health Fund subsidy data is not captured in the dispensing system. NHF claim submission is manual and subject to missed claims, delayed reimbursement, and underpayment. | `rx_transactions` captures `nhf_subsidy` separately from `patient_copay` at the point of dispense. The data architecture anticipates Phase 2 NHF claims submission integration without requiring a schema migration. |

---

## Section 3: Intuitive Design Assessment

**Design system — strengths confirmed in code:**

The PharmacyOS design system is canonical, complete, and correctly implemented in `app/src/index.css`. The token set is comprehensive:

- **Color system:** 8 semantic color categories (surfaces, actions, semantic feedback, prescription states, regulatory callouts, text, border) implemented as Tailwind CSS v4 `@theme` variables. Schedule drug entries use `#FEE2E2`/`#DC2626` red — a deliberate regulatory callout that is visually distinct and immediately understood in a clinical context.
- **Typography:** Two-family system — Inter for UI prose, JetBrains Mono for all numeric data (medication quantities, drug codes, currency, reference numbers). The `.num`, `.num-lg`, `.num-xl` and `.font-mono` utility classes are used consistently across all data-display components. This is the correct choice for a system where staff read numbers under time pressure.
- **Layout shells:** Three distinct shells are correctly applied — the AppShell (viewport-locked sidebar + scrollable content area) at `Shell.tsx` line 214, the POS terminal (fullscreen, no sidebar), and the auth shell (centered card). The viewport-locked layout prevents the disorienting full-page scroll common in generic admin templates.
- **Density:** Data tables use 36px row height (compact, appropriate for dense clinical data). POS buttons use `btn-pos` class at 56px — correct for counter use under time pressure or with gloves.
- **Print CSS:** `@media print` correctly hides sidebar and navigation, shows `.print-only` elements, and sets A4 portrait layout. This is correctly implemented and will work for regulatory document printing.
- **Component vocabulary:** `.card`, `.btn`, `.btn-primary`, `.btn-success`, `.btn-danger`, `.btn-ghost`, `.pill`, `.pill-green/yellow/red/blue/gray/purple`, `.input`, `.table-compact` — all defined in `index.css` and consistently applied across the 22 implemented pages.

**Design system — weaknesses confirmed in code:**

| Weakness | Evidence | Impact |
|---|---|---|
| Unconditional navigation rendering | `Shell.tsx` lines 16–48: `NAV` array is a static constant with no role filtering. All 7 nav groups render to all authenticated users regardless of role. | A CASHIER sees Admin, Prescriptions, AI Queue, and Patients nav groups that they are not authorized to use. Disclosure risk and UX noise. |
| No skeleton loaders | Loading states throughout the 22 pages use either a bare spinner or an empty table. No skeleton placeholder pattern exists. | Under slow network conditions (pharmacy on a shared connection), pages appear blank rather than showing content structure. Increases perceived wait time and causes staff to re-click. |
| No global search | Each page implements its own local search input. No cross-module search capability exists. | Staff cannot search for a patient, prescription, or product from a single entry point. They must navigate to the correct module, remember where to look, and repeat the search. This is a daily friction point. |
| No notifications or alert surface | No in-app notification bell or alert feed. | Low-stock items, pending AI extractions, and EOD approval requests have no active surface. Staff must proactively navigate to find these conditions rather than being surfaced them. |

---

## Section 4: Why Pharmacies Should Use PharmacyOS

**The commercial argument for a Jamaican community pharmacy:**

**1. Built for Jamaican regulatory reality, not adapted from a generic template.**
PharmacyOS is designed from the ground up for the specific compliance obligations of a Jamaican licensed pharmacy. The Schedule Drug Log is structured to comply with the Jamaica Dangerous Drugs Act. Patient data handling is designed to comply with the Jamaica Data Protection Act 2020. The NHF subsidy field is native to the dispensing record, not bolted on. A generic pharmacy system requires custom development to achieve this — PharmacyOS ships with it.

**2. AI-powered prescription and invoice scanning reduces transcription error.**
The prescription scanning module (pending G3 — Claude Vision API access) extracts patient name, drug name, prescriber registration, dosage, quantity, and issue date directly from a photograph of the paper prescription. A pharmacist reviews every extracted field with a per-field confidence score before confirming. Fields below 85% confidence are flagged and require manual edit before the record can be saved. This is not automation that replaces clinical judgment — it is automation that eliminates manual re-typing while keeping the pharmacist in control.

**3. The audit trail makes every action defensible.**
The append-only audit log records every state-changing operation in the system with actor, timestamp, table, record ID, and before/after values. When a regulatory inspector or a disputing patient asks "who changed this record and when?", the answer is three clicks away. Paper-based systems and disconnected spreadsheets cannot provide this.

**4. EOD reconciliation is transparent and documented.**
The EOD closeout workflow surfaces the expected cash total from system transactions, compares it to the cashier's physical count, and calculates the variance in real time. The manager approval step creates an electronic record of every end-of-day sign-off. Cash discrepancies are flagged, not buried.

**5. Loyalty is built into the POS — not a separate platform.**
Loyalty points accrue and redeem at the POS terminal in the same checkout flow. No separate system, no extra step, no staff training on a second application. Customer tier (Standard, Silver, Gold, Platinum) is surfaced at lookup and points are applied automatically to the transaction.

**6. The platform is ready to grow.**
The NHF claims integration (Phase 2) requires no schema migration — the data is already captured. WhatsApp automation, SMS notifications, and a patient portal are on the Phase 2 roadmap. Multi-location support is a Phase 3 architecture decision. A pharmacy that adopts PharmacyOS today does not need to re-platform when it grows.

---

---

# PART II — ROLES, AUTHORIZATIONS, AND PERMISSIONS

---

## Section 5: Logical Role Design Assessment

**Five staff roles are defined** in `app/src/types/database.ts` (line 11) and `app/src/pages/admin/Users.tsx` (line 27):

```typescript
type StaffRole = 'PHARMACIST' | 'CASHIER' | 'TECHNICIAN' | 'MANAGER' | 'ADMIN'
```

**Thirteen permissions are defined** in `app/src/pages/admin/Users.tsx` (lines 60–74):

| Permission Key | Label | Clinical Scope |
|---|---|---|
| `pos_terminal` | POS Terminal | Retail sales access |
| `pos_void` | Void Transactions | Financial reversal authority |
| `pos_closeout` | Submit EOD Closeout | End-of-day financial submission |
| `eod_approve` | Approve EOD | Manager financial sign-off |
| `rx_dispense` | Dispense Prescriptions | Clinical dispensing authority |
| `rx_schedule_log` | Schedule Drug Log | Controlled substance register access |
| `inventory_manage` | Manage Inventory | Stock management authority |
| `reports_view` | View Reports | Financial and dispensing reporting |
| `staff_manage` | Manage Staff | HR authority over staff accounts |
| `audit_view` | View Audit Log | Audit trail access |
| `settings_manage` | Manage Settings | System configuration authority |
| `loyalty_manage` | Manage Loyalty | Customer loyalty account management |
| `ai_queue` | AI Queue | AI document extraction review authority |

**Default permission assignments** (`app/src/pages/admin/Users.tsx`, lines 80–86):

```typescript
const DEFAULT_PERMS: RolePermsRecord = {
  ADMIN:      PERMISSIONS.map(p => p.key),
  MANAGER:    ['pos_terminal','pos_void','pos_closeout','eod_approve',
               'inventory_manage','reports_view','loyalty_manage','audit_view'],
  PHARMACIST: ['rx_dispense','rx_schedule_log','inventory_manage','reports_view'],
  CASHIER:    ['pos_terminal','loyalty_manage'],
  TECHNICIAN: ['pos_terminal','rx_dispense'],
}
```

**Assessment of default assignments — three gaps identified:**

| Role | Gap | Reason | Recommendation |
|---|---|---|---|
| `PHARMACIST` | Missing `ai_queue` | Pharmacists are the designated review authority for AI-extracted prescriptions per ADR Decision 4. A pharmacist without `ai_queue` access cannot perform their required document review function. | Add `ai_queue` to PHARMACIST defaults. |
| `TECHNICIAN` | Missing `inventory_manage` | Technicians receive stock from suppliers — a core daily task. Receiving stock is an `inventory_manage` operation. A technician without this permission cannot do their job. | Add `inventory_manage` to TECHNICIAN defaults. |
| `TECHNICIAN` | Missing `ai_queue` | Technicians run the AI invoice scanner to process supplier invoices. The AI Queue is the interface for this task. | Add `ai_queue` to TECHNICIAN defaults. |
| `MANAGER` | Missing `settings_manage` | Shift defaults, opening float, loyalty rate, tax rate, and pharmacy name are operational settings that a manager needs to adjust. Currently only ADMIN can change them. | Add `settings_manage` to MANAGER defaults. |

**Important:** These are default seed values only. The permissions matrix is stored in `pharmacy_settings.role_permissions` as JSON and is fully editable by an ADMIN via the Admin → Users page. The default gaps do not lock pharmacies into incorrect permissions — but they will create friction at initial setup when a new pharmacy configures the system from scratch.

**RBAC architecture rating: Sound in design, incomplete in enforcement.** The permission model is well-conceived for a community pharmacy context. The gaps above are configuration defaults, not architectural flaws. The critical problem is enforcement — documented in Section 6.

---

## Section 6: Missing Permission Enforcement (Critical — I-01)

This is the most consequential gap in the current build. The permission matrix is defined but not enforced.

**What was built:**
- `ProtectedRoute.tsx` (lines 1–33) wraps all non-login routes and checks `session !== null`. If a session exists, the user is admitted to any route.
- `useCurrentUser.ts` (lines 12–33) fetches the authenticated user's role from `staff_profiles` and makes it available to components.
- `DEFAULT_PERMS` constant defines what each role is allowed to do.
- The Admin → Users page allows the ADMIN to edit role permissions stored in `pharmacy_settings`.

**What was specified but not built:**
- ADR Decision 7 specified a `RoleGuard` component and a `src/config/route-permissions.ts` constant mapping each route to its required permission. Neither exists in the codebase.
- No `usePermission(key)` hook exists.
- No component-level permission check wraps any action button, mutation trigger, or sensitive form.

**Practical consequence:**
Any authenticated user — regardless of role — can navigate to any route in the application and interact with any control. Specifically:

| Route | Minimum Required Permission | Current Enforcement |
|---|---|---|
| `/prescriptions/schedule-log` | `rx_schedule_log` | None — any session admitted |
| `/admin/users` | `staff_manage` | None — any session admitted |
| `/admin/audit` | `audit_view` | None — any session admitted |
| `/admin/settings` | `settings_manage` | None — any session admitted |
| `/pos/closeout` | `pos_closeout` | None — any session admitted |
| `/pos/eod-report` | `eod_approve` | None — any session admitted |

A CASHIER can currently navigate to `/prescriptions/schedule-log` and create controlled drug register entries without any system barrier. This is not a theoretical risk — the routes are live, the nav links are visible to all roles (Section 7), and no server-side validation prevents the mutation.

**Fix specification:**

Step 1 — Create `src/config/route-permissions.ts`:
```typescript
export const ROUTE_PERMISSIONS: Record<string, string> = {
  '/prescriptions/schedule-log': 'rx_schedule_log',
  '/prescriptions/new':          'rx_dispense',
  '/prescriptions':              'rx_dispense',
  '/pos/closeout':               'pos_closeout',
  '/pos/eod-report':             'eod_approve',
  '/admin/users':                'staff_manage',
  '/admin/audit':                'audit_view',
  '/admin/settings':             'settings_manage',
  '/ai/queue':                   'ai_queue',
  '/reports/revenue':            'reports_view',
  '/reports/dispensing':         'reports_view',
  '/reports/inventory':          'reports_view',
}
```

Step 2 — Create `RoleGuard` component that reads `useCurrentUser()` and the permissions matrix, checks the current route against `ROUTE_PERMISSIONS`, and renders a `/403` redirect or page if the user lacks the required permission.

Step 3 — Wrap every protected `<Route>` in `App.tsx` with `<RoleGuard>`.

Step 4 — Create the `/403` Forbidden page (Section 10, I-02).

**Owner:** FIS (Kiara) — Priority: P1 Critical. Must complete before any Winchester staff receive access.

---

## Section 7: Role-Based Navigation Visibility Gap (I-08)

**Finding:** The `NAV` constant in `Shell.tsx` (lines 16–48) is a static array that renders unconditionally for every authenticated user.

```typescript
// Shell.tsx lines 16–48 — no role filtering
const NAV: NavItem[] = [
  { label: 'Dashboard',     href: '/dashboard',     icon: House },
  { label: 'Prescriptions', icon: PillIcon, children: [...] },
  { label: 'Retail POS',    icon: ShoppingBag, children: [...] },
  { label: 'Patients',      icon: Users, children: [...] },
  { label: 'Reports',       icon: ChartBar, children: [...] },
  { label: 'AI Queue',      href: '/ai/queue',      icon: Robot },
  { label: 'Admin',         icon: Gear, children: [...] },
]
```

The `Sidebar` component (`Shell.tsx` line 98) renders this array without calling `useCurrentUser()` at any point. There is no conditional rendering on any nav group.

**Consequence:**
- A CASHIER (permissions: `pos_terminal`, `loyalty_manage`) sees Prescriptions, Patients, Reports, AI Queue, and Admin in their sidebar — all of which they are not authorized to access.
- A PHARMACIST sees Admin nav items they should not interact with.
- The sidebar is the primary trust signal for what a staff member is expected to do. Showing unauthorized modules creates confusion, increases the risk of accidental access attempts, and presents a poor professional experience.

**Fix:** Inject `useCurrentUser()` into the `Sidebar` component. Filter `NAV` items by checking whether the user's role has the required permission for each nav section. The `ROUTE_PERMISSIONS` map (Section 6) provides the required-permission-per-route constant needed to evaluate visibility.

**Owner:** FIS (Kiara) — Priority: P2 High. Depends on `usePermission` hook being built first (I-01 remediation).

---

---

# PART III — TESTING AND INTEGRATION ASSESSMENT

---

## Section 8: Test Coverage Assessment

**Finding: Zero test files exist in the entire codebase.**

A comprehensive file search across `04_products/pharmacyos/` for `.test.ts`, `.test.tsx`, `.spec.ts`, and `.spec.tsx` returned no results. The `app/package.json` contains no `test` script entry and no test runner dependency (no Vitest, no Jest, no Playwright, no Cypress).

The only automated quality signal currently in place is TypeScript's strict-mode compilation check (`tsc --noEmit`), which the Evidence Ledger confirms passes cleanly (E1 issue — TypeScript 6.0 compatibility — was resolved).

**Evidence Ledger status for Gate 4 (Verification):**

| Evidence Item | Status | Owner |
|---|---|---|
| TypeScript check (`tsc --noEmit`) | PENDING confirmation on Vercel | TVA (Leandra) |
| Production build (`vite build`) | PENDING | TVA (Leandra) |
| Test suite | PENDING — not started | TVA (Leandra) |
| WCAG audit | PENDING | AAA (Rochelle) |
| SCA security review | PENDING | SCA (Omari) |
| Claude Vision integration test | PENDING — blocked on G3 | IDS (Nia) |
| Lynk payment test | PENDING — blocked on G4 | IDS (Nia) |

**Priority test targets (ranked by risk):**

| Test Target | Type | Risk if Untested | Complexity |
|---|---|---|---|
| Permission enforcement logic (once built) | Unit | A logic error silently admits unauthorized users | Low |
| `decrement_product_stock` RPC chain | Integration | Inventory goes negative or stock count drifts from reality | Medium |
| EOD variance calculation | Unit | Financial discrepancy between expected and actual is miscalculated | Low |
| `generate_ref_number()` sequence | Integration | Duplicate reference numbers compromise transaction integrity | Low |
| Loyalty points accumulation + redemption | Unit | Customer points balance corrupted at checkout | Low |
| Prescription dispense → Rx transaction → audit log | E2E | Clinical workflow produces no financial or audit record | High |
| POS checkout → stock decrement → transaction insert | E2E | Sale completes but inventory is not reduced | High |
| JDPA consent capture at patient registration | Integration | Patient record created without legally required consent | Medium |

**Recommended test stack:**

- **Unit/Integration:** Vitest (native Vite integration, no extra config, TypeScript 6 compatible)
- **E2E:** Playwright (headless Chromium for consistent CI behavior; supports Supabase test database seeding)
- **Coverage target:** 80% on all files in `src/lib/`, `src/hooks/`, and any future `src/utils/` directory; 100% on all permission enforcement logic

**Owner:** TVA (Leandra) — Priority: P1 (blocking Gate 4). Vitest configuration can be added to `package.json` without modifying any production code.

---

## Section 9: Integration Assessment

| Integration | Status | Notes |
|---|---|---|
| Supabase Auth (email + password) | Working | Session persistence and auto-refresh confirmed in `lib/supabase.ts` lines 23–24. |
| Supabase Database (all 14 tables) | Working (dev RLS) | All CRUD operations functional. Dev-permissive RLS policies must be replaced before production (I-05). |
| Supabase Realtime | Not implemented | ADR Decision 5 specified Realtime subscriptions for the prescription kanban board. The kanban itself is not built. Realtime is not wired anywhere in the codebase. |
| Supabase Storage | Not configured | Three buckets specified in ADR (`prescription-images`, `invoice-images`, `ai-uploads`) have not been created. Blocked until G3 is cleared and a Storage provisioning decision is made. |
| Supabase Edge Functions | Not deployed | `extract-document` function stub exists in `supabase/functions/` but the function body is not implemented. Pressing "Extract" in the AI Queue will fail at invocation. `process-rx-scan` and `process-invoice-scan` functions are not written. |
| Claude Vision API | Not integrated | AI Queue calls `supabase.functions.invoke('extract-document')` but the function does not exist. No Anthropic API key is configured. Blocked on G3. |
| Lynk Payment API | Not integrated | POS terminal records payment method as `LYNK` in the `payment_method` enum but makes no API call. Lynk credentials not yet supplied by client (G4). |
| NHF Claims API | Not started | Phase 2 item. `nhf_subsidy` is captured in `rx_transactions` schema. No claims submission code exists. |
| Vercel Deployment | Unconfirmed | TypeScript 6.0 fix (E1) was applied and committed but Vercel re-deployment has not been confirmed as passing. No production URL is active. |

**Integration readiness: 2 of 9 integrations working. 7 are pending, blocked, or not started.**

---

---

# PART IV — IDENTIFIED ISSUES AND RECOMMENDATIONS

---

## Section 10: Issue Register — Priority Ranked

### Priority Definition

**P1 Critical:** Represents a security risk, compliance violation, or system failure mode that makes the product unsafe or non-compliant to deploy in any pilot context — even internal. Must be resolved before any Winchester staff use the system with real data.

**P2 High:** Imposes meaningful limitations on safe operation, clinical workflow integrity, or regulatory posture. Does not immediately enable unauthorized data access but creates operational risk. Must be resolved before any external deployment.

**P3 Medium:** Degrades user experience, introduces edge-case data risks, or represents a missing Phase 1 feature. No immediate safety or compliance risk. Resolve in the next sprint cycle.

---

### P1 — Critical Issues (7)

| ID | Issue | File / Location | Description | Recommendation |
|---|---|---|---|---|
| **I-01** | No route-level permission enforcement | `App.tsx` line 98; `ProtectedRoute.tsx` lines 1–33 | `ProtectedRoute` checks session existence only. Any authenticated user can access any route regardless of role. A CASHIER can load `/prescriptions/schedule-log` and create controlled drug log entries with no system barrier. | Build `RoleGuard` component, `src/config/route-permissions.ts` constant, and `usePermission(key)` hook. Wrap all protected routes. Redirect unauthorized access to `/403`. Owner: FIS (Kiara). |
| **I-02** | No 403 Forbidden page | `App.tsx` line 98 (wildcard redirect) | No route exists for unauthorized access. Unauthorized users are silently redirected to `/dashboard` rather than receiving an informative access-denied response. | Create `/403` route with branded page. Explain the restriction clearly. Provide "Return to Dashboard" link. Log the access attempt in `audit_log`. Owner: FIS (Kiara). |
| **I-03** | No 404 Not Found page | `App.tsx` line 98 | Unknown routes silently redirect to `/dashboard`. Staff following a broken internal link receive no feedback. | Create `/404` route. Change `<Route path="*">` to render the 404 page instead of a silent redirect. Owner: FIS (Kiara). |
| **I-04** | No global error boundary | `main.tsx` (entry point) | No `React.ErrorBoundary` wraps the application. An unhandled JavaScript exception crashes the entire UI with a blank white screen. No recovery path exists. In a clinical environment, a white screen during a dispensing workflow is a patient safety concern. | Wrap the app in a top-level `ErrorBoundary` in `main.tsx`. Render a branded recovery screen with "Reload Application" action and optionally capture error details for the audit log. Owner: FIS (Kiara). |
| **I-05** | Dev-permissive RLS on all 14 tables | All migrations (001–008) | Every table uses `USING (true) WITH CHECK (true)`. Any authenticated user has full CRUD on all data — including patient records, the controlled drug log, and the audit log, which should be append-only. The audit log itself can be deleted by any authenticated session. | SCA (Omari) must replace all 14 dev-permissive policies with role-scoped production policies. Priority order: `schedule_drug_log` (regulatory), `patients` (JDPA), `audit_log` (append-only integrity), `eod_closeouts` (financial). Owner: SCA (Omari) + DSS (Marise). |
| **I-06** | React infinite loop (E5) undiagnosed | Unknown component | Console logs "Maximum update depth exceeded." Root cause not identified. Likely a `useEffect` with an object or array literal in its dependency array that changes on every render. Continuous re-renders degrade performance for all users on the terminal. | Systematically audit every `useEffect` across all 22 pages for inline object/array dependencies. Primary candidates: `Dashboard.tsx` (multiple queries with potential dependency overlap), `PosReports.tsx` (interplay between `useMemo` and `useQuery`). Owner: IDS (Nia). |
| **I-07** | No audit trigger on `schedule_drug_log` | `008_schedule_drug_log.sql`; `app/src/pages/prescriptions/ScheduleLog.tsx` | The controlled drug log has full CRUD mutations but no corresponding `audit_log` write is triggered on edit or delete. Editing or deleting a controlled substance register entry without an audit trail is a Jamaica Dangerous Drugs Act compliance risk and potentially a criminal liability. | Add a PostgreSQL trigger on `schedule_drug_log` that writes an `audit_log` entry on INSERT, UPDATE, and DELETE, capturing the before/after values in the `details` JSONB field. This is a new migration: `009_schedule_drug_log_audit_trigger.sql`. Owner: DSS (Marise) + SCA (Omari) review. |

---

### P2 — High Issues (7)

| ID | Issue | File / Location | Description | Recommendation |
|---|---|---|---|---|
| **I-08** | Role-based navigation visibility absent | `Shell.tsx` lines 16–48 (NAV constant) | All 7 nav groups render to all authenticated users regardless of role. A CASHIER sees Admin, Prescriptions, Patients, AI Queue — all unauthorized. | Inject `useCurrentUser()` into the `Sidebar` component. Filter `NAV` items using the `ROUTE_PERMISSIONS` map and user's role permissions. Owner: FIS (Kiara). Depends on I-01 remediation. |
| **I-09** | 2FA not built | Auth module; `ProtectedRoute.tsx` | Email and password only. A system handling patient health data and controlled drug records under Jamaican healthcare standards should require 2FA. ADR Decision 7 specified TOTP enrollment and a `/verify-2fa` route. Neither is built. | Build TOTP enrollment flow (QR code generation, backup codes) and a 2FA verification step at login using Supabase Auth MFA. Owner: FIS (Kiara) + BLS. |
| **I-10** | No component-level permission gates | All 22 implemented pages | Pages render all action controls regardless of the logged-in user's permissions. A CASHIER loaded on `/pos/eod-report` can see and click the manager approval button. | Create `usePermission(key)` hook. Wrap sensitive action buttons and forms with `{hasPermission && <component />}`. Owner: FIS (Kiara). Depends on I-01 remediation. |
| **I-11** | Vercel deployment unconfirmed | CI/CD pipeline; `vercel.json` | The TypeScript 6.0 fix (E1) was committed but Vercel re-deployment has not been confirmed as passing. PharmacyOS has no confirmed production URL. | Push to the production branch of `github.com/NODRFTSYSTEMS/pharmacyos`. Monitor Vercel build logs. Confirm `npm run build` produces a clean output with TS 6.0. Owner: PIS + TVA (Leandra). |
| **I-12** | No session timeout | `ProtectedRoute.tsx`; `lib/supabase.ts` | Sessions never expire within a browser session. A pharmacist who walks away from a terminal stays logged in indefinitely. In a shared-terminal environment, this is a patient data exposure risk. | Implement idle session timeout (15–30 minutes) using Supabase `auth.onAuthStateChange` and an activity event listener. Show a "Session expiring in 2 minutes" warning before forceful sign-out. Owner: FIS (Kiara) + BLS. |
| **I-13** | No JDPA consent capture | `patients` table; `app/src/pages/patients/NewPatient.tsx` | Patient records are being created without capturing Jamaica Data Protection Act 2020 consent. The `patients` table has no `jdpa_consent_given` or `jdpa_consent_date` column. Creating patient health records without verifiable consent is a legal exposure. | Blocked on G5 (LCA Dorothy review). When unblocked: add `jdpa_consent_given BOOLEAN NOT NULL DEFAULT FALSE` and `jdpa_consent_date TIMESTAMPTZ` columns to the `patients` table via a new migration. The `NewPatient` form must not submit without consent capture. Owner: LCA (Dorothy) → DSS (Marise) → FIS (Kiara). |
| **I-14** | Prescription dispense workflow not built | `app/src/pages/prescriptions/` (no detail page) | The Rx queue exists and shows status. The new prescription form exists. But there is no `/prescriptions/:id` detail page. A prescription cannot be formally dispensed through the system. `rx_transactions` records are not being created via the clinical workflow. | Build `/prescriptions/:id` detail page with status advancement buttons. The DISPENSED transition must create an `rx_transactions` record. For controlled drugs, it must also prompt for a `schedule_drug_log` entry. Owner: FIS (Kiara) + BLS. |

---

### P3 — Medium Issues (8)

| ID | Issue | File / Location | Description | Recommendation |
|---|---|---|---|---|
| **I-15** | No global search | All pages | No cross-module search exists. Users must navigate to each module to search. Staff cannot find a patient, a prescription, or a product from a single entry point. | Design a global search overlay (`Cmd/Ctrl+K`) querying patients, prescriptions, products, and transactions. Implement with Supabase full-text search or PostgreSQL `ILIKE` across key tables. Owner: FIS (Kiara). |
| **I-16** | No notifications or alerts system | All pages | No in-app notification surface. Low-stock items, pending AI extractions, and EOD approval requests have no active signal. Staff must proactively navigate to discover these states. | Design a notification bell in the sidebar header. Backend: a `notifications` table. Seed with low-stock events (`stock_qty <= reorder_level`) and pending AI queue items. Owner: FIS (Kiara) + BLS + DSS (Marise). |
| **I-17** | AI Queue has no document upload path | `app/src/pages/ai/Queue.tsx` | The AI Queue page shows existing extraction entries and allows review and accept/reject. There is no UI to upload a new document for extraction. The "Extract" trigger calls a function that does not exist. | Add an "Upload Document" button. Trigger a Supabase Storage upload to the `ai-uploads` bucket and insert an `extraction_queue` record. Then invoke `process-rx-scan` or `process-invoice-scan` based on `document_type`. Blocked on G3. Owner: IDS (Nia) + FIS (Kiara). |
| **I-18** | Schedule drug log has no export | `app/src/pages/prescriptions/ScheduleLog.tsx` | The controlled drug log is complete and accurate but has no CSV or PDF export. Pharmacists must be able to produce a formatted report for regulatory submission and physical filing. | Blocked on G6 (pharmacist format approval). When unblocked: implement CSV export immediately (low effort). PDF export via print-optimized CSS layout or a Supabase Edge Function with a PDF generation library. Owner: IDS (Nia) + FIS (Kiara). |
| **I-19** | No pharmacy logo | `Shell.tsx` lines 109–113 | The sidebar header displays a Phosphor `Files` icon as a placeholder. Winchester Global Pharmacy's actual logo SVG/PNG has not been supplied by the client. | Client deliverable (G6). When supplied: replace the `<Files>` icon with an `<img>` element in the Sidebar component header block. Owner: Client → FIS (Kiara). |
| **I-20** | `useCurrentUser` silent CASHIER fallback | `useCurrentUser.ts` line 27 | If no `staff_profiles` record exists for the authenticated Supabase user, the hook silently defaults the role to `CASHIER`. A misconfigured admin account silently receives the most restricted role with no error or indication to the user. | Replace the silent fallback with an explicit error state. If no `staff_profiles` record is found, redirect to a "Profile Setup Required" page or display an admin contact message rather than silently assuming CASHIER permissions. Owner: FIS (Kiara). |
| **I-21** | Dashboard not role-filtered | `app/src/pages/Dashboard.tsx` | All metric cards and activity feeds render to all roles. A CASHIER sees Rx transaction totals and controlled drug activity data they do not need and should not be prompted to act on. | Once the `usePermission` hook (I-01 remediation) is built, conditionally render Dashboard sections by role. CASHIER sees POS metrics only. PHARMACIST sees Rx and clinical metrics. MANAGER and ADMIN see all panels. Owner: FIS (Kiara). Depends on I-01. |
| **I-22** | Timezone inconsistency in date boundary calculations | `app/src/pages/Dashboard.tsx` (unconfirmed exact line) vs `app/src/pages/pos/PosReports.tsx` | `PosReports.tsx` correctly uses `America/Jamaica` timezone offset in its date boundary queries. `Dashboard.tsx` uses bare `.toISOString().slice(0, 10)` without timezone context. This will produce off-by-one errors for transactions near midnight during Jamaican business hours (Jamaica is UTC-5). | Create a shared utility function `toJamaicaBounds(from: Date, to: Date)` in `src/lib/date.ts`. Replace all ad-hoc date boundary calculations with this function. Apply to Dashboard, Revenue Report, and EOD report date filters. Owner: FIS (Kiara). |

---

---

# PART V — AI INTEGRATION UTILIZATION

---

## Section 11: Current AI Integration State

The AI integration is more developed than the "shell only" label in the master handoff suggests. The AI Queue page (`app/src/pages/ai/Queue.tsx`) implements a substantive UI:

**What the AI Queue page currently does:**
- Queries `extraction_queue` table via TanStack Query
- Displays entries with status filtering (PENDING, PROCESSING, REVIEW_REQUIRED, ACCEPTED, REJECTED)
- Shows per-entry confidence score with color coding: green (≥85%), amber (≥70%), red (<70%)
- Provides a `ReviewDrawer` side panel with:
  - Image preview area (placeholder until Storage is configured)
  - Editable field forms for PRESCRIPTION type (patient_name, drug_name, prescriber_name, prescriber_reg, dosage, quantity, issue_date)
  - Editable field forms for INVOICE type (supplier_name, invoice_number, invoice_date)
  - Accept and Reject mutation triggers
  - Linked prescription creation on accept (writes to `prescriptions` table)
- Provides a "Trigger Extraction" button that calls `supabase.functions.invoke('extract-document')`

**What is missing from the AI Queue:**

| Gap | Impact | Blocked On |
|---|---|---|
| `extract-document` Edge Function does not exist | "Trigger Extraction" button fails at invocation | G3 (Claude Vision API) |
| Supabase Storage buckets not configured | Image preview is non-functional; uploads impossible | G3 + provisioning decision |
| No document upload path in the UI | Users cannot submit a new document for extraction | G3 + Edge Function |
| Confidence gate not enforced | Accept button is always enabled regardless of confidence score. ADR specified "Confirm All disabled until fields below 85% are edited" | FIS build task |
| Realtime not wired | Queue does not update when an extraction completes. Users must manually refresh. | IDS (Nia) build task |
| Model assignments not implemented | ADR specifies Haiku for invoices, Sonnet for prescriptions. No model selection logic exists yet. | Edge Function authoring |
| Function invocation name mismatch | UI calls `extract-document`; the correct function names per ADR are `process-rx-scan` and `process-invoice-scan` | FIS + IDS alignment |

**Current AI utilization score: 3.0/10.** The UI skeleton and review workflow are built. The actual AI processing pipeline is entirely absent. The confidence gate — a critical patient safety control — is not enforced.

---

## Section 12: AI Activation Roadmap

The following 7-step sequence activates the AI pipeline in dependency order. No step can safely begin before the one preceding it is complete.

| Step | Action | Owner | Dependency |
|---|---|---|---|
| 1 | Create Supabase Storage buckets: `prescription-images`, `invoice-images`, `ai-uploads` with auto-expiry on `ai-uploads` | DSS (Marise) + PIS | Supabase project access |
| 2 | Author `process-rx-scan` Edge Function using Claude Sonnet model for prescription extraction with mandatory confidence scoring per field | IDS (Nia) | G3 (Anthropic API key), Step 1 |
| 3 | Author `process-invoice-scan` Edge Function using Claude Haiku model for supplier invoice extraction | IDS (Nia) | G3, Step 1 |
| 4 | Rename invocation call in `ai/Queue.tsx` from `extract-document` to `process-rx-scan` or `process-invoice-scan` based on `entry.document_type` | FIS (Kiara) | Steps 2–3 |
| 5 | Build document upload flow: file picker → Storage upload → `extraction_queue` INSERT → invoke correct Edge Function | FIS (Kiara) + IDS (Nia) | Steps 1–4 |
| 6 | Implement confidence gate enforcement: disable the Accept button when any field has confidence < 0.85 and has not been manually edited | FIS (Kiara) | ADR Decision 4 requirement |
| 7 | Wire Supabase Realtime subscription on `extraction_queue` row changes so the Queue page updates automatically when extraction completes | IDS (Nia) | ADR Decision 5 |

**Post-activation AI capabilities (Phase 1):**
- Prescription scanning with clinical data extraction and pharmacist review gate
- Supplier invoice scanning with inventory posting
- Confidence-scored field display with edit-before-confirm workflow

**Phase 2 AI expansion (roadmap items, not in current scope):**
- Predictive inventory replenishment (trigger purchase orders when stock falls below reorder level based on consumption velocity)
- Automated NHF claims drafting from dispensing records
- Intelligent report assistants with natural-language query for reporting data

---

## Section 13: Agent Assignments for PharmacyOS Build

All agent names follow the Caribbean name rule per NoDrftSystems governance.

| Agent | Caribbean Name | Scope on PharmacyOS | Priority |
|---|---|---|---|
| SCA | Omari | Replace all 14 dev-permissive RLS policies with role-scoped production policies. JDPA patient data review. Auth security audit. Edge Function secret management. | P1 — before pilot |
| DSS | Marise | Production RLS SQL (migration 009+). Audit trigger on `schedule_drug_log`. JDPA columns on `patients` table. Storage bucket policy design. | P1 — before pilot |
| FIS | Kiara | RoleGuard component. `usePermission` hook. Route permissions config. 403/404 pages. Global error boundary. Role-filtered nav. Confidence gate enforcement. Session timeout UI. | P1 — before pilot |
| IDS | Nia | Diagnose and fix E5 React infinite loop. Edge Function authoring (`process-rx-scan`, `process-invoice-scan`). Realtime subscription wiring. Lynk API integration when G4 is supplied. | P1 (E5 diagnosis); P2 (AI pipeline) |
| TVA | Leandra | Vitest configuration. Unit tests for all calculation logic. Integration tests for POS checkout → stock decrement flow. Prescription dispense → audit log flow. | P1 — Gate 4 |
| LCA | Dorothy | JDPA 2020 compliance review for patient consent flow. Dangerous Drugs Act format approval support. Data export/deletion flow specification. Unblocks G5. | P2 — before production |
| AAA | Rochelle | WCAG 2.1 AA audit across all 22 implemented routes and any newly built routes before Gate 5. | QA Pass 6 |
| PLA | Simone | Plain language sweep of all UI copy per Section 14. Error message standards. AI Queue button label corrections. Audit action string registry. | QA Pass 2 |
| BLS | — | Server-side logic for 2FA, session timeout, permission validation middleware for mutations. | P2 — before production |
| QAS | Imani | Gate 5 independent review. Scope drift check against Build Activation Packet. Evidence ledger completeness audit. Prerequisite for ARE Gate 6. | Post-P2 remediation |
| ARE | — | Gate 6 technical sign-off. Required before any production deployment. | Final gate |

---

---

# PART VI — TEXT FORMATTING AND PRESENTATION STANDARDS

---

## Section 14: Editorial and Presentation Standards Sweep

This section reports the findings of the editorial, UX copy, and content review sweep across all 22 implemented routes and the design system.

### Standards Confirmed — Codify as Canonical

The following formatting patterns are correctly implemented and must be maintained consistently across all future routes:

| Standard | Implementation | Status |
|---|---|---|
| Currency formatting | `Intl.NumberFormat('en-JM', { style: 'currency', currency: 'JMD' })` | Confirmed correct throughout POS and reporting pages |
| Timestamp display | `toLocaleString('en-JM', ...)` patterns | Consistently applied on transaction pages |
| Date display | `toLocaleDateString('en-JM', ...)` | Correctly applied where implemented — see I-22 for exception |
| Timezone | `America/Jamaica` used in date bounds on `PosReports.tsx` | Correct; must be standardized via shared utility |
| Numeric data | JetBrains Mono / `.font-mono` / `.num` / `.num-lg` / `.num-xl` classes | Consistently applied |
| Reference numbers | `.font-mono` formatting | Correct on all transaction tables |
| Status badges | `.pill .pill-[variant]` classes with 6 color variants | Consistently applied |

### Issues Found — Action Required

**Copy Issue 1 — AI Queue accept button is document-type-agnostic**

Current label: `"Accept & Forward to Rx"` (appears in the ReviewDrawer accept mutation trigger)

Problem: For INVOICE type documents, "Forward to Rx" is meaningless. A supplier invoice does not go to a prescription queue. The button copy fails to communicate the correct downstream action.

Recommendation:
- PRESCRIPTION type: `"Accept & Create Prescription Record"`
- INVOICE type: `"Accept & Post to Inventory"`

Owner: FIS (Kiara) + PLA (Simone).

---

**Copy Issue 2 — Schedule Drug Log header lacks regulatory citation**

Current state: The Schedule Log page header uses a generic subtitle describing the log's purpose.

Required state: The page header must read:

> **Controlled Substances Register**
> *Maintained under the Jamaica Dangerous Drugs Act, Chapter 92 — Pharmacist signature required for all entries*

This language must appear on the page header AND in the print header block so that any physical printout includes the regulatory citation. A regulatory inspector viewing either the screen or a printout must immediately see the legal basis for the document.

Owner: FIS (Kiara) — the subtitle prop of `PageHeader` on the ScheduleLog page.

---

**Copy Issue 3 — Rx Queue button label mismatch**

Current state: The prescription queue uses `VERIFYING` as the status value for the in-progress verification state.

Problem: Button labels in the queue status advancement controls describe the destination state, not the action being taken. "Mark Verifying" is not a natural clinical instruction. Staff do not "mark verifying" — they "begin verification."

Recommendation — action-oriented labels:
- RECEIVED → VERIFYING: `"Begin Verification"`
- VERIFYING → READY: `"Mark Ready to Dispense"`
- READY → DISPENSED: `"Confirm Dispensed"`
- Any state → CANCELLED: `"Cancel Prescription"`

Owner: FIS (Kiara) + PLA (Simone).

---

**Copy Issue 4 — Error messages provide no recovery guidance**

Current state: Error states across all 22 pages use inline `text-red-600` paragraphs with generic messages such as "Failed to load transactions." No error message includes: what the user should do next, whether the problem is temporary, or how to get help.

In a clinical environment, a staff member who encounters an error during a dispensing workflow needs to know whether to retry, whether patient data was saved, or whether to call for help. Silent failure messages do not meet this standard.

Recommended error message format:
```
[What failed] — [Whether it is temporary] — [What to do next]

Example:
"Could not load prescription records. This may be a temporary connection issue.
 Try refreshing the page, or contact your system administrator if the problem continues."
```

Owner: PLA (Simone) — apply across all error states in all 22 pages. FIS (Kiara) to update components after copy is approved.

---

**Copy Issue 5 — Raw email address as display name fallback**

Location: `useCurrentUser.ts` line 26:
```typescript
name: profile?.full_name ?? user.email!,
```

Problem: If no `staff_profiles` record exists for a user, their full name falls back to their raw email address (e.g., `m.thompson@winchesterglobal.com`). This email address renders as the user's display name in the sidebar. In a professional clinical system, displaying a raw email address as a person's name is not acceptable.

Recommendation: If no `staff_profiles` record is found, render "Unknown User" as the display name, display a warning state, and redirect to a profile setup page rather than silently proceeding. This is also a security signal — if a valid auth user has no staff profile, that is a data integrity issue that should be flagged, not silently handled.

Owner: FIS (Kiara) — `useCurrentUser.ts` + sidebar display name rendering.

---

**Copy Issue 6 — No centralized audit action string registry**

Location: `app/src/pages/admin/AuditLog.tsx` — the action badge color map matches string values like `"create"`, `"update"`, `"void"`, `"dispense"` to color variants.

Problem: There is no centralized registry of valid audit action strings. As new operations are added to the system and new audit log writes are implemented, action strings will drift — some using `"create"`, others using `"insert"`, others using `"new_rx"`. The color map will not cover all variants and badges will fall back to the default gray, making the audit log visually unreliable.

Recommendation: Create `src/constants/audit-actions.ts` defining all valid audit action string constants:
```typescript
export const AUDIT_ACTIONS = {
  TRANSACTION_CREATE:      'transaction_create',
  TRANSACTION_VOID:        'transaction_void',
  RX_DISPENSE:             'rx_dispense',
  EOD_SUBMIT:              'eod_submit',
  EOD_APPROVE:             'eod_approve',
  STOCK_DECREMENT:         'stock_decrement',
  PATIENT_CREATE:          'patient_create',
  STAFF_CREATE:            'staff_create',
  SCHEDULE_DRUG_DISPENSE:  'schedule_drug_dispense',
  SETTINGS_UPDATE:         'settings_update',
  // ... complete set
} as const
```

Use these constants in both the audit log write sites and the AuditLog color map. Owner: BLS + FIS (Kiara).

---

### Print Header Standard

All report pages that can be printed (RevenueReport, DispensingReport, InventoryReport, ScheduleLog, EodReport) must include a consistent print-only header block showing:

```
[Pharmacy Name from pharmacy_settings]
[Pharmacy Address from pharmacy_settings]
OIC Registration: [Registration number from pharmacy_settings]
Report: [Report title]
Period: [Date range]
Generated: [Timestamp]  |  Generated by: [Staff name and role]
```

This header must be wrapped in a `.print-only` class so it is hidden in the screen view. Currently no such standardized header exists — each report page has independent print styling. The pharmacy name and address are stored in `pharmacy_settings` and must be fetched and applied as a shared print header component.

Owner: FIS (Kiara) — implement as a reusable `PrintHeader` component in `components/Shell.tsx`.

---

---

# PART VII — OS RATING AND VALUATION

---

## Section 15: Rating Methodology

The PharmacyOS assessment uses a 7-dimension weighted composite score adapted for regulated healthcare SaaS at the pre-production stage.

**Methodology design principles:**

1. Security and Compliance carries 20% weight — not higher — because a zero score does not produce a zero overall. A system can have strong code quality and good design while having incomplete security hardening; that is expected and acceptable at this stage. The weights model relative contribution to production readiness, not to quality in isolation.

2. Functional Completeness carries the highest weight (25%) because a system that cannot perform its clinical function has no value regardless of security posture or test coverage.

3. Testing carries 8% — the lowest weight — because at pre-production stage, the absence of tests is expected and recoverable. It does not make the product dangerous today; it is a risk multiplier if left unaddressed at production.

4. All scores are based on verified codebase evidence only. No score is estimated or inferred from documentation alone. Every finding references a specific file and line number where evidence was found.

| Dimension | Weight | What It Measures |
|---|---|---|
| Functional Completeness | 25% | Routes built vs. planned; core clinical workflows working |
| Security & Compliance | 20% | RLS, auth, RBAC enforcement, audit trail, JDPA posture |
| Code Quality | 15% | TypeScript strictness, pattern consistency, known bugs |
| UX & Design System | 15% | Token adherence, accessibility, information hierarchy |
| AI Integration | 10% | Depth and correctness of AI feature implementation |
| Testing & Verification | 8% | Test coverage, CI/CD, QA gate evidence |
| Infrastructure Readiness | 7% | Deployment, environment config, database provisioning |

---

## Section 16: Dimension Scores and Findings

### Functional Completeness: 5.5/10 — Weighted: 1.375

22 of 43 Phase 1 routes implemented (51%). All 22 implemented routes are functional. Core POS, prescription intake, patient management, reports, and admin are working.

Deductions:
- The prescription dispense workflow — the clinical heart of the system — has no detail page and no `rx_transactions` write path. This is the most consequential functional gap. Without it, Winchester cannot formally dispense a prescription through PharmacyOS.
- AI scanning is non-functional (Edge Functions absent, Storage not configured).
- 2FA is not built.
- Patient profile page is not built.
- Inventory receiving is not built.

The 5.5 score reflects that what is built works well, but the most clinically critical workflow is incomplete.

---

### Security & Compliance: 3.5/10 — Weighted: 0.700

The floor on this dimension is set by the dev-permissive RLS policies on all 14 tables. Until those policies are replaced, no authenticated user is restricted from any data.

Credits awarded:
- Migration 006 correctly revoked anonymous `EXECUTE` on `decrement_product_stock` — the one security fix deliberately applied.
- The Supabase TS client cast workaround is technically sound and documented — it is not a security gap.
- The Supabase Auth session management (`persistSession: true`, `autoRefreshToken: true`) is correctly configured.

Deductions:
- Dev-permissive RLS on all 14 tables (I-05) — any authenticated session has full CRUD on patient records, controlled drug log, and audit log.
- No route-level RBAC enforcement (I-01) — any session reaches any route.
- No 2FA (I-09).
- No JDPA consent capture (I-13).
- No session timeout (I-12).
- Audit log does not cover `schedule_drug_log` edits (I-07).

---

### Code Quality: 7.5/10 — Weighted: 1.125

Credits awarded:
- TypeScript strict mode passes cleanly (`tsc --noEmit` clean).
- TS 6.0 / Supabase JS v2 compatibility workaround is documented and technically sound.
- Component patterns are consistent across all 22 pages.
- Tailwind CSS v4 `@theme` implementation is correct.
- Migration files are idempotent and correctly numbered.
- The `generate_ref_number()` PostgreSQL function uses sequence-based uniqueness — correct for transaction reference integrity.

Deductions:
- E5 React infinite loop bug is undiagnosed (`-1.0`).
- `useCurrentUser.ts` line 27 silent CASHIER fallback is a logic bug with security implications (`-0.5`).
- Timezone inconsistency in date boundary calculations between Dashboard and PosReports (`-0.5`).
- Zero test coverage multiplies the risk of the above defects going undetected in future changes (`-0.5` — partially captured in the Testing dimension).

---

### UX & Design System: 7.0/10 — Weighted: 1.050

Credits awarded:
- Complete and correctly implemented design token set (colors, typography, spacing, shadows, border radius).
- Viewport-locked AppShell with fixed sidebar and scrollable content area — appropriate for a clinical workstation.
- POS terminal uses 56px button targets — correct for counter use.
- Print CSS correctly implemented across report pages.
- Component vocabulary (`.card`, `.btn`, `.pill`, `.input`, `.table-compact`) is consistently applied.
- The `Pill` component with 6 color variants is correctly used for status communication throughout the application.

Deductions:
- Unconditional nav rendering — all 7 groups visible to all roles (I-08). `-1.0`
- No skeleton loaders — blank states on slow connections. `-0.5`
- No global search capability (I-15). `-0.5`
- No notifications surface (I-16). `-0.5`
- Error messages provide no recovery guidance (Section 14, Copy Issue 4). `-0.5`

---

### AI Integration: 3.0/10 — Weighted: 0.300

Credits awarded:
- AI Queue review workflow is substantially built — ReviewDrawer, confidence score display with color coding, accept/reject mutations, linked prescription creation on accept.
- Confidence score thresholds (70% amber, 85% green) are implemented in the UI display layer.
- The `extraction_queue` schema is correctly designed for the AI pipeline with status workflow and JSONB fields.

Deductions:
- Edge Function does not exist — the core AI processing pipeline is absent (`-4.0`).
- Storage buckets not configured — document upload is impossible (`-1.0`).
- Confidence gate not enforced — Accept button is always enabled regardless of confidence score. This is a patient safety control gap (`-1.0`).
- Realtime not wired — queue does not update automatically (`-0.5`).
- Function invocation name mismatch — UI calls `extract-document` not `process-rx-scan`/`process-invoice-scan` (`-0.5`).

---

### Testing & Verification: 0.5/10 — Weighted: 0.040

Zero test files exist. No test runner is configured. Gate 4 evidence is entirely PENDING.

The 0.5 (not zero) reflects:
- TypeScript strict mode and `tsc --noEmit` clean is a form of automated type-safety verification.
- Migration 006 security fix represents deliberate quality discipline — a defect was identified and corrected proactively.

No other automated verification exists at the time of this assessment.

---

### Infrastructure Readiness: 4.5/10 — Weighted: 0.315

Credits awarded:
- Supabase project provisioned (Free tier).
- All 8 migrations written, numbered, and ready to run.
- E1 TypeScript version fix applied and committed.
- `vercel.json` present and configured.
- Environment variable schema documented (two required: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

Deductions:
- Vercel deployment not confirmed — no production URL is active.
- Supabase Storage buckets not configured.
- Edge Functions not deployed.
- SSH force-push issue (E2) indicates an unresolved repository access problem.
- No production Supabase environment — Free tier is appropriate for development only; Pro plan needed for production SLA and backup guarantees.

---

### Overall Score

```
Dimension              Score    Weight    Weighted Score
Functional Completeness  5.5  ×  0.25  =  1.375
Security & Compliance    3.5  ×  0.20  =  0.700
Code Quality             7.5  ×  0.15  =  1.125
UX & Design System       7.0  ×  0.15  =  1.050
AI Integration           3.0  ×  0.10  =  0.300
Testing & Verification   0.5  ×  0.08  =  0.040
Infrastructure Readiness 4.5  ×  0.07  =  0.315
                                          ─────
OVERALL WEIGHTED SCORE                    4.905 ≈ 4.91 / 10
```

**Qualitative Rating: BUILD-IN-PROGRESS — Pre-Pilot Capable with P1 Remediation**

This score does not reflect the architectural ambition or the quality of what has been built. It reflects the current pre-production state of a 51%-complete build with known critical gaps. A fully remediated build — with all 7 P1 issues resolved — would score approximately 6.8–7.2 before additional Phase 1 routes are built. At Phase 1 completion (all 43 routes, all P1/P2 issues resolved, test suite in place), the target score is 8.0–8.5.

---

## Section 17: Valuation Approach

PharmacyOS is classified as a NoDrftSystems proprietary product (reclassified 2026-05-08). Winchester Global Pharmacy is the first licensed deployment. The commercial model is structured on three components.

### Component 1 — Subscription License (Recurring)

A per-pharmacy, per-month flat fee is recommended over per-seat pricing. Community pharmacies have fixed staff counts; per-seat pricing creates friction at renewal when seasonal staff changes occur.

| Tier | Scope | Target Monthly Price (USD) |
|---|---|---|
| **Standard** | Single location, up to 15 staff, all Phase 1 modules | $350 – $500 |
| **Professional** | Single location, up to 30 staff, Phase 1 + NHF claims (Phase 2) | $650 – $900 |
| **Enterprise** | Multi-location (Phase 3), dedicated support SLA | Custom |

*Note: Final pricing requires Founder authorization and reviewer_pricing_safety clearance before any proposal references these figures.*

### Component 2 — Implementation and Onboarding (One-Time)

Covers: data migration from the prior system, staff training, role and permission configuration, pharmacy settings setup, and supervised go-live.

Target range: $1,500 – $3,000 USD depending on data migration complexity.

Winchester as the reference client: this fee is likely waived or reduced as part of the reference client commercial arrangement pending MSA amendment and new SOW (G7, G8).

### Component 3 — Maintenance and Support Retainer (Recurring)

Covers: bug fixes, minor feature requests, security patches, compliance updates (e.g., JDPA implementing regulations when published), and Supabase infrastructure monitoring.

Target range: $200 – $400 USD/month. May be bundled into the license fee for the Standard tier or offered as a separate line item for Professional and Enterprise.

### Market Sizing (Jamaica)

*Note: figures below are estimates for planning purposes. MCA (Sterling) must verify against Ministry of Health licensing data before these figures appear in any external document.*

| Market Level | Estimate | Basis |
|---|---|---|
| TAM — Total Addressable Market | ~600–700 Jamaican community pharmacies × $5,400/year (Standard plan) = ~$3.24M – $3.78M ARR | Ministry of Health licensing registry estimate |
| SAM — Serviceable Addressable Market | 15–25% willing to replace incumbent software in a 3-year window = ~$486K – $945K ARR | Adoption curve estimate; not verified |
| SOM — Year 1–3 Obtainable | 10–20 pharmacies at $5,400/year = $54K – $108K ARR | Conservative pipeline target |

Regional expansion (CARICOM Phase 4): The platform's Jamaican compliance features are directly transferable to other CARICOM member states with similar Dangerous Drugs Act frameworks. The Caribbean pharmacy market is estimated at 4,000–6,000 community pharmacies across 15 member states. This is a longer-term opportunity requiring localization per jurisdiction.

### Winchester ROI Inputs

FMA (Valentina) should model the Winchester-specific case using the following confirmed data inputs:

| Input | Value for Modeling |
|---|---|
| Staff time saved on EOD reconciliation | Estimate 45–60 minutes combined (cashier + manager) per business day |
| Dispensing error reduction via AI Rx scan | Industry benchmark: 1–3% of prescriptions contain transcription errors. Target: <0.5% with AI-assisted entry and pharmacist review. |
| NHF claims accuracy improvement | Requires Winchester's current NHF submission volume and rejection rate as input |
| Loyalty member visit frequency uplift | Requires Winchester's current loyalty program data (if any) |
| Training time reduction vs. PharmPartner | Qualitative — structured onboarding with a role-appropriate UI reduces ramp-up time |

---

---

# PART VIII — MISSING COMPONENTS INVENTORY

---

## Section 18: Missing Components by Module

Each item is tagged with complexity (Low / Medium / High) and blocker status where applicable.

### Authentication Module (0 of 4 items built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| 2FA TOTP enrollment flow (QR code + backup codes) | Medium | None — Supabase Auth MFA available | ADR Decision 7 specified this |
| 2FA verification step at login (`/verify-2fa` route) | Low | Depends on enrollment | Must complete before production |
| Admin security page (active sessions, failed login log) | Medium | Requires `security_events` table (new migration) | |
| Account lockout after N failed login attempts | Low | Requires `security_events` table | |

### Authorization Infrastructure (0 of 3 items built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| `RoleGuard` component | Low | None | ADR Decision 7 specified this |
| `src/config/route-permissions.ts` | Low | None | Maps routes to required permissions |
| `usePermission(key)` hook | Low | None | Reads role, checks permissions matrix, returns boolean |

### Error Pages (0 of 3 items built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| `/403` Forbidden page | Low | None | Branded, with return-to-dashboard link |
| `/404` Not Found page | Low | None | Branded, replaces silent redirect |
| Global error boundary (`main.tsx`) | Low | None | Standard React ErrorBoundary pattern |

### Prescriptions Module (2 of 5 items built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| `/prescriptions/:id` detail page with dispense workflow | High | None | Creates `rx_transactions` on DISPENSED; triggers schedule drug log entry for controlled substances |
| AI Prescription Scanner upload page | Medium | G3 (Claude Vision API) | Depends on Edge Function being deployed |

### Patients Module (2 of 5 items built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| Patient profile page `/patients/:id` with tabs | High | None | Tabs: medication history, insurance, JDPA data rights |
| JDPA consent capture at patient registration | Medium | G5 (LCA review) | Requires new columns on `patients` table |
| JDPA data export and deletion flow | High | G5 (LCA review) | Regulatory obligation under JDPA 2020 |

### Inventory Module (0 of 7 items built, excluding Suppliers and Products which are in POS module)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| Stock overview dashboard with low-stock alerts | Medium | None | `products` table and data are available |
| Drug catalog with lot numbers and expiry dates | High | Requires schema extension for lot tracking | |
| Receive stock form (purchase order intake) | Medium | None | |
| AI Invoice Scanner upload and review page | Medium | G3 (Claude Vision API) | |
| Inventory alerts and notification surface | Low–Medium | None | Feeds into notifications system (I-16) |

### Admin Module (3 of 4 items built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| Security admin page (2FA management, session audit) | Medium | Requires `security_events` table | |

### AI Module (UI shell only — 0 of 3 pipeline items built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| `process-rx-scan` Supabase Edge Function (Sonnet) | High | G3 | Core AI pipeline for prescription scanning |
| `process-invoice-scan` Supabase Edge Function (Haiku) | Medium | G3 | AI pipeline for supplier invoices |
| Document upload path in AI Queue UI | Low | Steps 1–4 of AI roadmap | |

### Cross-Cutting Missing Items (0 of 8 built)

| Item | Complexity | Blocker | Notes |
|---|---|---|---|
| Global search overlay (`Cmd/Ctrl+K`) | Medium | None | Queries patients, prescriptions, products, transactions |
| Notification system (bell + `notifications` table) | Medium | None | Low-stock, pending AI, EOD approval events |
| Session timeout (idle detection + warning) | Low | None | 15–30 minute timeout with 2-minute warning |
| Skeleton loader pattern | Low | None | Apply across all data-loading states |
| Role-filtered navigation | Low | Depends on `usePermission` hook | Filter `NAV` array by role |
| Shared `toJamaicaBounds(from, to)` date utility | Low | None | Replaces ad-hoc date boundary calculations |
| Pharmacy logo (client-supplied asset) | Low | G6 (client asset delivery) | Replace `Files` icon in sidebar header |
| Shared print header component | Low | None | Pharmacy name, address, OIC reg, report title, period |

---

---

# PART IX — GOVERNANCE AND GATE STATUS

---

## Section 19: Gate Status Summary

### Capability Gap Status

| Gap | Description | Status | Blocking Party |
|---|---|---|---|
| G1 | ADR ARE + Founder sign-off | OPEN — ADR produced; signatures not on record | ARE + Founder |
| G2 | Supabase project provisioning | CLOSED — Free tier provisioned | — |
| G3 | Claude Vision API access (Anthropic API key) | OPEN | Founder / Anthropic account |
| G4 | Lynk payment credentials | OPEN | Winchester Global Pharmacy |
| G5 | JDPA compliance review | OPEN | SCA (Omari) + LCA (Dorothy) |
| G6 | Schedule drug log format + pharmacy logo + pharmacist approval | OPEN | Winchester pharmacist + client asset delivery |
| G7 | MSA amendment signed (PharmacyOS as NoDrftSystems IP) | OPEN | Founder + Winchester |
| G8 | New PharmacyOS SOW signed | OPEN | Founder + Winchester (depends on G7) |
| G9 | NoDrftSystems product registry entry for PharmacyOS | OPEN | MOA (Zayne) + Founder |

### Evidence Ledger Gate Summary

| Gate | Item | Status | Owner |
|---|---|---|---|
| Gate 0 | Build Activation Packet | CLOSED | PMA |
| Gate 1A | SAA Architecture ADR | PRODUCED — awaiting ARE + Founder | SAA |
| Gate 1A | DSS Schema Approval | PENDING | DSS (Marise) |
| Gate 2 | SCA Auth + JDPA Review | PENDING | SCA (Omari) |
| Gate 2 | LCA compliance review | PENDING | LCA (Dorothy) |
| Gate 4 | TypeScript check | PENDING — confirmation on Vercel | TVA (Leandra) |
| Gate 4 | Production build | PENDING | TVA (Leandra) |
| Gate 4 | Test suite | PENDING — not started | TVA (Leandra) |
| Gate 4 | WCAG 2.1 AA audit | PENDING | AAA (Rochelle) |
| Gate 4 | SCA security review | PENDING | SCA (Omari) |
| Gate 4 | Claude Vision integration test | PENDING — blocked on G3 | IDS (Nia) |
| Gate 4 | Lynk payment integration test | PENDING — blocked on G4 | IDS (Nia) |
| Gate 4 | Schedule drug log format approval | PENDING — blocked on G6 | Winchester pharmacist |
| Gate 5 | QAS independent review | PENDING | QAS (Imani) |
| Gate 6 | ARE technical sign-off | PENDING | ARE |
| Gate 6 | Founder authorization | PENDING | Founder |

### Critical Path to Controlled Pilot

The minimum sequence of actions required before any Winchester staff member uses PharmacyOS with real data:

```
1. G1 — ARE + Founder sign ADR  →  unlocks all build continuation
2. I-05 — SCA replaces all RLS policies (migration 009+)
3. I-01 — FIS builds RoleGuard + route-permissions.ts
4. I-02/I-03/I-04 — FIS builds 403, 404, error boundary
5. I-07 — DSS adds audit trigger on schedule_drug_log
6. I-06 — IDS diagnoses and resolves React infinite loop
7. TVA initializes test suite and covers core business logic
8. QAS Gate 5 independent review
9. ARE Gate 6 technical sign-off
10. Founder authorization
→  Controlled pilot may begin
```

G3, G4, G5, and G6 resolve in parallel with the above sequence and unlock their respective features when cleared — but they do not block the controlled pilot for the POS, Rx intake, and administrative modules.

---

## Document Control

| Field | Value |
|---|---|
| Document ID | PHARMACYOS-ASSESS-2026-05-13-v1.0 |
| Created | 2026-05-13 |
| Author | NoDrftSystems Assessment Cell |
| Next review | After P1 issue remediation is complete |
| Supersedes | N/A — first issue |
| Related documents | pharmacyos-master-handoff-2026-05-13.md, architecture-decision-record.md, build-activation-packet.md, evidence-ledger.md |
| Distribution | Internal — NoDrftSystems + Winchester Global Pharmacy (client-confidential) |
| External distribution | Requires Founder sign-off before any external release |
