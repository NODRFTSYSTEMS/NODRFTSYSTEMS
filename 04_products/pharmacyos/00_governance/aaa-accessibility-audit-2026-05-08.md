# AAA Accessibility Audit — PharmacyOS Frontend Build

| Field | Value |
|---|---|
| **Classification** | Internal — NoDrftSystems Proprietary. Do NOT commit to client repositories. |
| **Date** | 2026-05-08 |
| **Audience** | Founder + ARE archive (governance evidence) |
| **Reviewer** | AAA — Accessibility Audit Agent (Rochelle) |
| **Build commit** | `01405fc` — branch `claude/condescending-wu-b8aa1e` |
| **Authority** | WCAG 2.1 Level AA · BAP acceptance criterion (Gate 4) · Design Handoff Section 8 |
| **Audit type** | Static-source review (no runtime tooling executed) |
| **Build class** | Class 3 — Integration / Data-Sensitive (Class 4 surfaces in auth + JDPA + financial) |

---

## 1. Methodology

### What was reviewed (static source-of-truth read)
- All 12 reusable components: `Button.tsx`, `Input.tsx`, `Checkbox.tsx`, `StatusPill.tsx`, `PageHeader.tsx`, `Breadcrumb.tsx`, `Tabs.tsx`, `Sidebar.tsx`, `Placeholder.tsx`, `auth/ProtectedRoute.tsx`, `auth/RoleGuard.tsx` (RoleGuard not opened — referenced from router only).
- All 3 layouts: `AdminPortalLayout.tsx`, `AuthLayout.tsx`, `PosLayout.tsx`.
- 22 implemented page modules (sample of 26 — placeholder-only routes excluded from page-level analysis as they render the shared `Placeholder` component): Dashboard, Login, TwoFactor, Stock, Catalog, DrugDetail, Suppliers, Queue, PrescriptionDetail, ScheduleLog, Patients, PatientDetail, AuditLog, Security, Users, Settings, ReportingHub, InventoryReport, DispensingReport, ScheduleLogReport, RevenueReport, JobQueue, POSTerminal, POSProducts, POSReports, Loyalty.
- Design tokens: `src/styles/globals.css` (full read).
- Routing + auth wiring: `router.tsx`, `ProtectedRoute.tsx`, `App.tsx`, `index.html`.
- Governance authority: BAP, Design Handoff Section 8 (a11y direction), ADR.

### What was NOT executed (coverage gap — see §10)
- No axe-core, WAVE, Lighthouse, or pa11y scan was run against a live build. All findings are derived from static source review.
- No screen-reader walkthrough (NVDA, JAWS, VoiceOver). Announcement behaviour for live regions, focus-trap correctness, and reading order are inferred from markup but not verified empirically.
- No keyboard-only walkthrough at runtime.
- No prefers-reduced-motion runtime test.
- No mobile/touch event verification — desktop and 1024px tablet target only (per BAP).

### How contrast ratios were computed
WCAG 2.1 relative-luminance formula applied to design-token hex pairs. Token values read from `globals.css`. Ratios cited below are computed, not estimated.

---

## 2. Critical Issues — Block Production Deploy

These violate WCAG 2.1 AA on regulated, safety-critical surfaces (prescription, schedule drug, patient identity) and must be resolved before any environment carrying real patient data.

### C1. Status pill text fails WCAG 1.4.3 contrast on multiple variants
- **WCAG criterion:** 1.4.3 Contrast (Minimum) — AA, normal text 4.5:1.
- **Locations:**
  - `src/components/StatusPill.tsx:45` — pill renders text at `text-[11px]` (≈11px). At <14px (and not bold-equivalent), this is normal text and requires 4.5:1.
  - Computed ratios for pill variants (foreground hex on background hex):
    - `verified` (`#D97706` on `#FEF3C7`) = **3.16:1** — FAIL.
    - `received` (`#6366F1` on `#E0E7FF`) = **3.51:1** — FAIL.
    - `filled` / `success` (`#059669` on `#D1FAE5`) = **3.52:1** — FAIL.
    - `schedule` / `error` (`#DC2626` on `#FEE2E2`) = **3.92:1** — FAIL.
    - `nhf` / `info` (`#2563EB` on `#EFF6FF`) = **4.55:1** — borderline pass.
- **Why this is Critical:** Pills carry regulated state — Rx workflow stage (Received/Verified/Filled/Dispensed), Schedule-drug flag, NHF flag. Misreading "Verified" vs "Filled" or missing a "SCHED" tag is a clinical-safety failure, not a cosmetic issue. The chip text is the primary state signal in 16+ screens (Stock, Queue, PrescriptionDetail, PatientDetail, DispensingReport, ScheduleLog, etc.).
- **Recommended fix:** Two clean options:
  1. Bump pill foreground colors to AA-compliant tones at 11px (e.g., verified-fg `#92400E` → ~5.4:1 on `#FEF3C7`; filled-fg `#065F46` → ~5.8:1 on `#D1FAE5`; schedule-fg `#991B1B` → ~6.5:1 on `#FEE2E2`; received-fg `#3730A3` → ~7.4:1 on `#E0E7FF`). Update tokens in `globals.css:32-45`.
  2. OR enlarge pill text to ≥14px and bump weight to 700 to qualify as "large text" (3:1 threshold). Most current variants would then pass; the 24px/font-semibold change at `StatusPill.tsx:45` would also need adjustment.
- **Note on Section 8 commitment:** Design Handoff Section 8 explicitly states "Body text contrast ≥ 4.5:1." The current implementation deviates from this contract.

### C2. Allergy chips render at error-red contrast that fails on a high-stakes clinical surface
- **WCAG criterion:** 1.4.3 Contrast (Minimum).
- **Locations:**
  - `src/pages/patients/PatientsPage.tsx:79` — `<StatusPill variant="error">{a}</StatusPill>` for each allergy.
  - `src/pages/patients/PatientDetailPage.tsx:60` — same usage in patient-detail header.
- **Computed ratio:** `#DC2626` on `#FEE2E2` = **3.92:1** at 11px — FAIL 4.5:1.
- **Why Critical:** Allergies are the single most safety-critical fact in a pharmacy record. A cashier or technician reading "Penicillin" must read it correctly. If C1 is fixed (token-level), this resolves automatically.
- **Recommended fix:** Resolved by C1 token correction.

### C3. Custom focus styles defeated by `focus:outline-none` on the POS barcode input
- **WCAG criterion:** 2.4.7 Focus Visible — AA.
- **Location:** `src/pages/pos/POSTerminalPage.tsx:88-98` — the barcode `<input>` uses `focus:outline-none placeholder:text-text-disabled` with **no replacement focus indicator** (no ring, no border change, no underline). It sits inside a transparent-background row with only an icon next to it.
- **Why Critical:** The POS terminal is the primary daily workstation for cashiers. Removing the focus indicator on the most-used input on the system fails a baseline AA criterion. Auto-focus on mount partially masks the problem during normal scanning, but a Tab-key user who lands on the input from the "Clear cart" button has no visual confirmation of focus.
- **Recommended fix:** Replace `focus:outline-none` with a visible focus indicator consistent with the design token system: `focus:outline-none focus:ring-[3px] focus:ring-primary/20 focus:bg-bg-subtle` or apply the Input component's pattern.
- **Cross-reference:** Design Handoff Section 8 — "Never `outline: none` without a replacement." Direct contract violation.

### C4. POS terminal interactive controls below the BAP-mandated 56px minimum
- **WCAG criterion:** Not strictly a WCAG 2.1 AA failure (2.5.8 Target Size Minimum is WCAG 2.2 24×24). However, this is a **direct BAP acceptance-criterion violation** and is treated as Critical for the Gate 4 evidence package.
- **BAP requirement:** `build-activation-packet.md:160` — "POS terminal touch targets ≥ 56px."
- **Locations on `src/pages/pos/POSTerminalPage.tsx`:**
  - Lines 146–153: Quantity decrement button — `w-8 h-8` = **32px** (FAIL — should be ≥56px on POS).
  - Lines 155–162: Quantity increment button — `w-8 h-8` = **32px** (FAIL).
  - Lines 167–174: Remove-from-cart `X` button — `w-8 h-8` = **32px** (FAIL).
  - Lines 100–108: "Clear cart" inline-text button — no explicit min-height, renders below 32px (FAIL).
  - Lines 88–109: Barcode input row — `h-16` (64px) on the wrapper, but the inner input has no explicit height; depends on font line-height. Likely OK but should be confirmed at runtime.
- **Why Critical for this build class:** BAP is the controlling document for Gate 4. POS targets are the sole acceptance criterion explicitly called out for this build under accessibility/ergonomic scope.
- **Recommended fix:** On the POS surface only, scale the quantity stepper and remove buttons to `w-14 h-14` (56px) per the design handoff Section 2.6 density spec for POS. Adjust icon size to 24px to match the larger control. Apply only inside `PosLayout` route tree so admin-portal density (32px inline) is preserved.

### C5. Skip-to-main-content link absent on every layout
- **WCAG criterion:** 2.4.1 Bypass Blocks — AA.
- **Locations:**
  - `src/layouts/AdminPortalLayout.tsx:9-18` — no skip link.
  - `src/layouts/AuthLayout.tsx:7-27` — no skip link (less critical given small frame).
  - `src/layouts/PosLayout.tsx:8-30` — no skip link.
- **Why Critical:** The admin portal sidebar contains 30+ tabbable nav items before the main content area. A keyboard-only user must Tab through every nav item on every navigation. This is exactly what 2.4.1 exists to prevent.
- **Recommended fix:** Add a skip link as the first child of `AdminPortalLayout`:
  ```tsx
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-primary focus:text-white focus:px-3 focus:py-2">
    Skip to main content
  </a>
  ```
  And add `id="main-content"` to the `<main>` in `AdminPortalLayout.tsx:13` and `PosLayout.tsx:25`.
- **Cross-reference:** Design Handoff Section 8 — "Skip-to-content link at top of every admin frame." Direct contract violation.

### C6. Form inputs marked `required` but no programmatic ARIA exposure
- **WCAG criterion:** 3.3.2 Labels or Instructions — AA; 4.1.2 Name, Role, Value — AA.
- **Locations:**
  - `src/components/Input.tsx` — the `Input` component does not propagate a `required` attribute to ARIA. The `FormField` wrapper at `src/components/Input.tsx:17-33` renders a visual asterisk (`<span className="text-error ml-0.5">*</span>` at line 23) but never sets `aria-required="true"` and never sets `aria-invalid` when `error` is present.
  - `src/pages/auth/LoginPage.tsx:48-76` — relies on browser native `required` attribute on the input, which works for native validation but does not connect the visual asterisk to assistive tech.
  - The error helper text at `src/components/Input.tsx:27` (`<p className="text-xs text-error">{error}</p>`) is **not linked to the input** via `aria-describedby`. A screen reader user who tabs to an errored field hears the label only — they do not hear the error message.
- **Why Critical:** This is the single most regulated screen pattern in the system (login, 2FA, patient registration, JDPA consent). Failure mode: a screen reader user submits an empty required field, hears only the label, and has no programmatic indication of which field errored or why.
- **Recommended fix:** In `FormField`, generate an `errorId` with `useId()` and pass both `aria-invalid={!!error}` and `aria-describedby={error ? errorId : undefined}` to the child render prop. The error `<p>` then carries `id={errorId}`. Also pass `aria-required` from the `required` prop. Pattern:
  ```tsx
  // FormField shape
  children: (id: string, descriptors: { errorId?: string; describedBy?: string; ariaInvalid?: boolean; ariaRequired?: boolean }) => ReactNode
  ```
- **Cross-reference:** Design Handoff Section 8 — "Required fields: visible asterisk + `aria-required='true'`. Error messages: rendered below input, linked via `aria-describedby`." Direct contract violation.

---

## 3. Important Issues — Block Client Demo

These do not block a private build but must resolve before any external (Winchester / pharmacist) walkthrough.

### I1. Tabs component does not implement WAI-ARIA tab pattern correctly
- **WCAG criterion:** 4.1.2 Name, Role, Value — AA.
- **Location:** `src/components/Tabs.tsx:14-56`.
- **Problems:**
  - The `<div role="tablist">` at line 27 has no `aria-label` — a screen reader announces "tab list" with no context.
  - Tab buttons (line 31–45) have `role="tab"` and `aria-selected` but no `aria-controls` linking each tab to its panel, and no `id` on each tab button.
  - The tab panel at line 49–52 has `role="tabpanel"` but no `aria-labelledby` linking back to the active tab and no `id`. A screen reader cannot navigate between the tab and its panel.
  - Arrow-key navigation between tabs is not implemented. A keyboard user must Tab through every tab button to reach the panel; ARIA APG requires Left/Right arrow rotation within the tablist and `tabindex={-1}` on inactive tabs.
- **Recommended fix:** Implement WAI-ARIA tab pattern: assign `id={`tab-${value}`}` to each button, `aria-controls={`panel-${value}`}`; assign `id={`panel-${value}`}` and `aria-labelledby={`tab-${activeValue}`}` to the panel. Add Left/Right arrow key handler that wraps focus across the tablist and updates `active`. Set `tabIndex={isActive ? 0 : -1}` on tab buttons.
- **Used at:** `src/pages/patients/PatientDetailPage.tsx:67-167` (4 tabs: Overview / Medication / Insurance / JDPA). The Patient profile is the most data-dense screen in the system; tab navigation must be correct.

### I2. Allergy chips in Patient table emit error-tone for a non-error state
- **WCAG criterion:** 1.3.1 Info and Relationships — AA (semantic clarity).
- **Locations:**
  - `src/pages/patients/PatientsPage.tsx:79`.
  - `src/pages/patients/PatientDetailPage.tsx:60`.
- **Problem:** Allergies render as `<StatusPill variant="error">`. The "error" variant is semantically reserved (token name `--color-error`, used for system errors and schedule drugs). For a screen reader user, the chip background and color do not encode any text-equivalent meaning — they hear only the allergy name. For a sighted user with cognitive accessibility needs, the chip's visual urgency is appropriate, but the variant naming creates a maintainability risk and the "error" tone can be over-applied in future work.
- **Recommended fix:** Add a dedicated `allergy` or `warning-strong` variant to `StatusPill`. Prefix the chip text with a leading icon `aria-hidden="true"` and a screen-reader-only "Allergy:" prefix: `<span className="sr-only">Allergy: </span>{a}`.

### I3. Audit Log table is sortable-by-design but no sort affordance, and the table has no `<caption>` or `aria-label`
- **WCAG criterion:** 1.3.1 Info and Relationships — AA.
- **Locations:**
  - `src/pages/admin/AuditLogPage.tsx:46-68` — `<table>` has no `<caption>` and the wrapper card has no `aria-label`.
  - Same omission across all 14 tables in the audited pages: `StockPage.tsx:44`, `CatalogPage.tsx:31`, `SuppliersPage.tsx:23`, `PatientsPage.tsx:42`, `PatientDetailPage.tsx:85`, `DrugDetailPage.tsx:88`, `UsersPage.tsx:52`, `SecurityPage.tsx:63,93,127`, `JobQueuePage.tsx:30`, `ScheduleLogPage.tsx:40`, `ScheduleLogReportPage.tsx:59,86`, `DispensingReportPage.tsx:72`, `RevenueReportPage.tsx:80`, `InventoryReportPage.tsx:53`, `POSProductsPage.tsx:33`, `POSReportsPage.tsx:30`, `LoyaltyPage.tsx:31`, `DashboardPage.tsx:174`.
- **Why Important:** A screen reader user navigating with the table-rotor command gets "table, 6 columns, 142 rows" with no indication of what the table contains. `<th scope="col">` is in place — that part is correct (BAP required this and the implementation honored it) — but the table identity is missing.
- **Recommended fix:** Add `<caption className="sr-only">{descriptiveLabel}</caption>` as the first child of every `<table>`. Examples: "Audit log — system activity, last 24 hours," "Drug catalog — 142 SKUs."

### I4. POS Terminal completion screen uses dl/dt/dd correctly but the success heading "Transaction complete" is a `<p>`, not a heading
- **WCAG criterion:** 1.3.1 Info and Relationships — AA; 2.4.6 Headings and Labels — AA.
- **Location:** `src/pages/pos/POSTerminalPage.tsx:62` — `<p className="type-section text-text-primary mb-1">Transaction complete</p>`.
- **Problem:** The success state is the primary outcome of a checkout flow. Marking it as a `<p>` with section-typography styling means a screen reader user does not get an `<h2>`-level landmark to navigate to. Also at `POSTerminalPage.tsx:118` ("Empty cart" rendered as `type-card-title`) — same issue.
- **Recommended fix:** Promote both to `<h2>` and rely on the `type-section` / `type-card-title` utility classes to control visual weight (these are already pure typography utilities). Same pattern across DashboardPage, AuditLogPage, etc., where section labels are `<p>` instead of `<h2>` / `<h3>`.

### I5. Heading hierarchy skip — admin portal renders one `<h1>` per page but no `<h2>` / `<h3>` for sections
- **WCAG criterion:** 1.3.1 Info and Relationships — AA; 2.4.6 Headings and Labels — AA.
- **Locations (representative):**
  - `src/components/PageHeader.tsx:25` — `<h1>` (correct).
  - `src/pages/DashboardPage.tsx:68-128,167-208` — three `<section>` blocks ("Prescription Board", "Stock Alerts", "Recent Activity") each labeled with a `<p className="type-caption">` instead of `<h2>`. The `<section>` elements have `aria-label` (good — line 71, 127, 169), so they ARE landmarks. But screen-reader rotor heading-by-heading navigation produces just "Dashboard" with no sub-headings.
  - `src/pages/admin/SettingsPage.tsx:65-78` — `Section` helper renders title as `<p className="type-card-title">` (line 71) instead of `<h2>`.
  - `src/pages/admin/SecurityPage.tsx:90-92,121-123` — section captions as `<p>`.
- **Recommended fix:** Replace the `<p className="type-caption">` and `<p className="type-card-title">` section-title patterns with `<h2 className="type-caption">` (typography is a CSS class — no visual change). Establishes proper heading outline.

### I6. Sidebar tooltip descriptions are mouse-hover-only — keyboard users do not receive them
- **WCAG criterion:** 1.3.1 Info and Relationships — AA; 2.1.1 Keyboard — AA.
- **Location:** `src/components/Sidebar.tsx:90-121,149-177,201-217` — Radix Tooltip is used everywhere. Radix Tooltip ships with focus-trigger by default, so tooltip content WILL appear on keyboard focus — confirmed by Radix docs. **However** the tooltip's content is not connected to the link via `aria-describedby` — Radix usually wires this via `aria-labelledby` or `aria-describedby` automatically when the trigger uses `asChild`. A runtime check is needed.
- **Why Important not Critical:** Radix has a strong reputation for accessible primitives; behavior is likely correct. But the audit cannot confirm this without DOM inspection.
- **Recommended fix:** Verify at runtime with a screen reader that focusing each nav item announces both the visible label and the tooltip description. If not, switch each NavLink to `<NavLink aria-describedby={tooltipId}>` and assign `id={tooltipId}` to `Tooltip.Content`.

### I7. Loyalty Tier semantics — Bronze/Silver/Gold/Platinum encoded by chip variant and crown icon for Platinum only
- **WCAG criterion:** 1.4.1 Use of Color — AA.
- **Location:** `src/pages/pos/LoyaltyPage.tsx:53-58` — Crown icon shown only for Platinum (`m.tier === 'Platinum'`); Bronze/Silver/Gold/Platinum chips use color variants `neutral`, `info`, `warning`, `success` respectively. The chip TEXT does say the tier name — so this is OK. Mark as Important pending a verification that the tier label is always announced (it appears to be inside `<StatusPill>` which renders `children`).
- **Recommended fix:** None required if the tier text is the chip child. Confirmed at line 56 — `{m.tier}` is the chip child. **Downgrade to Observation O3.**

### I8. Sidebar caption text fails AA on dark sidebar background
- **WCAG criterion:** 1.4.3 Contrast (Minimum) — AA.
- **Location:** `src/components/Sidebar.tsx:140` — "Built by NoDrftSystems" rendered at `text-[10px] text-text-secondary` (=`#6B7280`) on `--color-bg-sidebar` (`#111827`).
- **Computed ratio:** `#6B7280` on `#111827` = **3.96:1** at 10px (small text) — FAIL 4.5:1.
- **Recommended fix:** Switch to `text-text-on-dark-dim` (`#9CA3AF`) which lands at ~6.8:1 on `#111827`. (Tailwind class would be `text-[#9CA3AF]` or matching token.)
- Same defect at `Sidebar.tsx:182` — group-header caption "INVENTORY/PRESCRIPTIONS/etc." uses `text-text-secondary` (`#6B7280`) on `#111827` at 12px.
  - Computed: 3.96:1 — FAIL 4.5:1 normal.
  - Fix: same — switch to `text-on-dark-dim` (`#9CA3AF`) for sidebar group headers, which gives ~6.8:1 PASS.
- Same at `Sidebar.tsx:199` — user-role caption "Pharmacist".

### I9. Receipt-success "✓" is a Unicode character on a colored bg with no text equivalent
- **WCAG criterion:** 1.1.1 Non-text Content — AA.
- **Location:** `src/pages/pos/POSTerminalPage.tsx:61` — `<div ...>✓</div>` with no `aria-label`. The screen-reader experience: nothing is announced for the icon, but the surrounding `<p>Transaction complete</p>` provides context. Borderline acceptable. Mark as Important — add `aria-hidden="true"` to make the omission explicit.

### I10. Two-Factor input lacks live region for error announcement and lockout countdown
- **WCAG criterion:** 4.1.3 Status Messages — AA.
- **Location:** `src/pages/auth/TwoFactorPage.tsx:82-86` — error renders into `<div role="alert">` (correct — implicit `aria-live="assertive"`), good. **However:** the BAP specifies "Account locked after 5 wrong 2FA attempts" — there is no implementation of a lockout-attempt counter or remaining-attempts announcement here. Once wired up, attempt-counter announcements will need an `aria-live="polite"` region. Flagging now so the contract holds when auth wires up.
- **Recommended fix:** When real auth lands (currently stubbed in `ProtectedRoute.tsx:19-22`), add a polite live region announcing "3 attempts remaining" after each failed verify.

---

## 4. Enhancements — Improvements

### E1. Status pills should announce as "{state} prescription" not just "{state}"
- **Location:** All `StatusPill` consumers.
- **Suggestion:** Add an optional `srPrefix` prop: `<StatusPill srPrefix="Prescription status:" variant="verified">Verified</StatusPill>` rendering a visually-hidden `<span>Prescription status: </span>` before the children. Improves screen-reader context.

### E2. Mono numeric content (`type-mono-data`) — DIN, lot numbers, quantities
- **WCAG-related:** Not a violation; Design Handoff Section 8 specifies "Mono data fields announce as their label, not the digits — e.g. 'Quantity, 30 tablets' not 'three zero'."
- **Suggestion:** Verify with a screen reader at runtime; the content is plain text inside `<td>` cells so it is read as digits. If a more friendly read is required, add an `aria-label` per cell.

### E3. Dashboard activity table has no visually-hidden caption
- **Location:** `src/pages/DashboardPage.tsx:167-207`.
- **Suggestion:** Add `<caption className="sr-only">Recent activity — last 8 system events</caption>` (covered by I3 systemic fix).

### E4. POS terminal "Empty cart" recommended-products grid uses `<button>` correctly but lacks an accessible group label
- **Location:** `src/pages/pos/POSTerminalPage.tsx:121-134`.
- **Suggestion:** Wrap the recommended-products grid in `<section aria-label="Quick-add recommended products">`.

### E5. Status indicator dots in PrescriptionDetail workflow use color + numeral + check icon — three signals, good
- **Location:** `src/pages/prescriptions/PrescriptionDetailPage.tsx:55-83`.
- **Observation:** This pattern is the gold standard from Design Handoff Section 8 ("three signals, not one"). Replicate this care across other status surfaces (e.g., Stock status pills, which currently rely on color + text only — meeting the contract but not exceeding it).

### E6. POSTerminalPage uses `<dl>/<dt>/<dd>` correctly for the receipt-success summary
- **Location:** `src/pages/pos/POSTerminalPage.tsx:64-73`.
- **Observation:** Good semantic markup; flag as positive baseline.

### E7. Search inputs are typed as `type="search"` consistently
- **Locations:** `PatientsPage.tsx:33`, `AuditLogPage.tsx:23`, `UsersPage.tsx:34`, `POSProductsPage.tsx:24`.
- **Observation:** Correct. None lack a label, however — they have placeholder text only. **Promote to Important?** The placeholder text is the only label. WCAG 3.3.2 requires a label. **See I11 below — promote.**

### I11 (promoted from E7). Search inputs have placeholder-only labels
- **WCAG criterion:** 3.3.2 Labels or Instructions — AA.
- **Locations:**
  - `src/pages/patients/PatientsPage.tsx:32-37`.
  - `src/pages/admin/AuditLogPage.tsx:22-27`.
  - `src/pages/admin/UsersPage.tsx:33-38`.
  - `src/pages/pos/POSProductsPage.tsx:23-28`.
- **Problem:** No `<label>` element; only `placeholder`. A screen-reader user who tabs to the input hears nothing labeled. Placeholder text disappears when typing.
- **Recommended fix:** Add a visually-hidden label: `<label htmlFor={searchId} className="sr-only">Search patients</label>` plus `<input id={searchId} ...>`. Or pass `aria-label="Search patients by name, NHF, or phone"` directly on the input.
- (Reclassify: this is **Important**, not Enhancement — it's a discrete WCAG failure.)

---

## 5. Observations — Worth Noting

- **O1.** Disabled/placeholder text uses `--color-text-disabled` (`#D1D5DB`) which is **1.50:1 on white** — well below AA. This is exempt from contrast requirements per WCAG 1.4.3 ("text or images of text that are part of an inactive UI component … have no contrast requirement"). Acceptable.
- **O2.** `<html lang="en">` correctly set in `index.html:2`. Pass.
- **O3.** Loyalty tier chips correctly include the tier name as text (Bronze/Silver/Gold/Platinum) — not color-only.
- **O4.** Quantity stepper buttons in POSTerminal correctly use `aria-label="Increase quantity"` / `"Decrease quantity"` (`POSTerminalPage.tsx:148,157`). Good baseline.
- **O5.** Prescription Queue cards use `<article>` semantics (`QueuePage.tsx:51`) — correct semantic choice.
- **O6.** `PageHeader` uses `<header>` element (`PageHeader.tsx:23`) and `<h1>` for the page title — correct landmark.
- **O7.** `Sidebar` correctly identified as `<aside aria-label="Main navigation">` (`Sidebar.tsx:129`) and inner `<nav aria-label="Primary">` (`Sidebar.tsx:147`).
- **O8.** `Breadcrumb` uses `<nav aria-label="Breadcrumb">`, `<ol>`, and `aria-current="page"` on the active segment (`Breadcrumb.tsx:15,29`). Reference-quality implementation.
- **O9.** Login form error correctly uses `role="alert"` (`LoginPage.tsx:43`). Good.
- **O10.** No `autoplay`, `<video>`, or `<audio>` elements found in the build; no time-based content concerns.
- **O11.** `prefers-reduced-motion` is NOT explicitly handled anywhere in `globals.css` or component CSS. The only animations in scope are: button loading spinner (`Button.tsx:62` — `animate-spin`) and card hover transitions (`hover:shadow-card-hover`). Low-impact — no kanban drag animations or toast slide-ins are implemented yet. When kanban DnD is wired, reduced-motion handling per Design Handoff Section 8 is required.
- **O12.** `<body style="min-width: 1024px">` (`globals.css:103`) — the build is intentionally desktop+tablet-only per BAP. Mobile zoom-out is not blocked, but content does not reflow below 1024px. WCAG 1.4.10 Reflow requires content reflow at 320px — but the BAP explicitly scopes out mobile (`build-activation-packet.md:159` — "Responsive at 1024px (tablet landscape) minimum"). Documented exception, not a defect.
- **O13.** `min-width: 1024px` may interact poorly with browser zoom: zooming to 200% on a 1280px window can produce horizontal scroll. WCAG 1.4.4 Resize Text requires content to remain readable at 200% — text-only zoom may be OK, but full-page zoom may trigger horizontal scroll. Runtime test required.
- **O14.** Modals: no modal/dialog patterns are implemented in any reviewed file (the Receipt modal is a full-route replacement, not a modal). Focus-trap concerns are deferred until modal patterns are introduced (Add Drug, Edit drawer, etc., are still `<Placeholder />`).

---

## 6. Tested with screen reader / keyboard?

**No.** This is a static source-code review only. No runtime tooling was executed.

Specifically not run:
- axe-core / WAVE / Lighthouse / pa11y automated scans.
- NVDA / JAWS / VoiceOver screen-reader walkthroughs.
- Keyboard-only navigation tests.
- Focus-trap correctness tests on any modal pattern.
- `prefers-reduced-motion` runtime verification.

These are required **before Gate 4 evidence is closed** per BAP `build-activation-packet.md:317` ("WCAG 2.1 AA: all screens pass automated + manual audit"). This audit is the manual-static layer; runtime axe-core + screen-reader pass remain outstanding.

---

## 7. Summary Table

### By severity

| Severity | Count |
|---|---|
| **Critical** | 6 (C1–C6) |
| **Important** | 11 (I1–I11) |
| **Enhancement** | 6 (E1–E6, with E7 promoted to I11) |
| **Observation** | 14 (O1–O14) |
| **Total findings** | 37 |

### By WCAG criterion area

| Area | Findings |
|---|---|
| 1.1.1 Non-text Content | I9 |
| 1.3.1 Info and Relationships | I2, I3, I4, I5 |
| 1.4.1 Use of Color | (none — handoff Section 8 commitment honored: status pills always carry text + sometimes icon) |
| 1.4.3 Contrast (Minimum) | C1, C2, I8 |
| 2.1.1 Keyboard | I6 |
| 2.4.1 Bypass Blocks | C5 |
| 2.4.6 Headings and Labels | I4, I5 |
| 2.4.7 Focus Visible | C3 |
| 3.3.2 Labels or Instructions | C6, I11 |
| 4.1.2 Name, Role, Value | C6, I1 |
| 4.1.3 Status Messages | I10 |
| BAP-specific (POS targets ≥ 56px) | C4 |

---

## 8. Coverage Gaps (Cannot Assess Without Runtime)

1. **Focus-trap behavior in modals / drawers** — no modal patterns implemented yet; all are `<Placeholder />`. Cannot assess until Add-Drug modal, Edit-Drawer, Receipt modal v2, etc., land.
2. **Live region announcements** — `role="alert"` and `aria-live` regions are present in markup, but actual announcement timing and verbosity require screen-reader runtime.
3. **Tooltip keyboard reachability** — Radix Tooltip should announce on focus by default; runtime confirmation required (I6).
4. **Tab arrow-key navigation** — flagged in I1 as a gap; runtime required to confirm focus rotation pattern.
5. **6-digit 2FA paste / auto-advance announcement** — the implementation handles paste correctly per code; runtime needed to confirm screen-reader announces `aria-label="Digit 1"` … `"Digit 6"` on each focus shift without verbose duplication.
6. **`prefers-reduced-motion` honoring** — no media query handling in `globals.css`. Runtime test with OS-level reduced-motion enabled required once animations are added.
7. **High-contrast / forced-colors mode (Windows)** — not assessed; affects clinical workstations (Windows + Chrome per BAP Section 1.4) with high-contrast accessibility settings.
8. **Browser-zoom behavior at 200%** — `min-width: 1024px` may produce horizontal scroll under full-page zoom (O13).
9. **Real keyboard tab order** — markup order is generally correct, but visual tab order on POSTerminal split layout (60/40) needs runtime confirmation.
10. **TwoFactor lockout UX** — currently stubbed; will need re-audit once auth wires up (I10).

---

## 9. Recommendation Routing

| Finding | Owner | Track |
|---|---|---|
| C1, C2, I8 (token-level color contrast) | FIS + DAA | Token revision in `globals.css` — single coordinated change |
| C3 (POS focus indicator) | FIS | POS terminal hardening |
| C4 (POS 56px targets) | FIS | POS terminal hardening — direct BAP acceptance criterion |
| C5 (skip link) | FIS | Layout-level — three layout files |
| C6, I11 (form ARIA) | FIS | `FormField` component — single coordinated change |
| I1 (Tabs ARIA pattern) | FIS | `Tabs` component refactor |
| I3 (table captions) | FIS | Systemic — apply to all 14 tables |
| I4, I5 (heading semantics) | FIS | Systemic — `<p className="type-caption">` → `<h2 className="type-caption">` |
| I6 (sidebar tooltip a11y) | FIS — runtime verification first | Defer until QA Pass 6 manual run |
| I9 (receipt success icon) | FIS | One-line fix |
| I10 (2FA lockout live region) | FIS — when auth wires up | Defer to G2 closure |
| All E* enhancements | FIS | Track in evidence ledger; non-blocking |

---

## 10. Hold Conditions for QA Pass 6

Per AAA hard rules: every Critical finding is reported to QAS immediately. The following Critical items constitute the HOLD list for Gate 5:

- C1 — Status pill contrast on regulated state.
- C2 — Allergy chip contrast.
- C3 — POS barcode focus indicator.
- C4 — POS touch-target ≥56px (BAP acceptance criterion).
- C5 — Skip-to-main-content link missing.
- C6 — Form `aria-required` / `aria-invalid` / `aria-describedby` linkage missing.

This audit is the **static-review layer** of Gate 4. The runtime axe-core + screen-reader walkthrough remains outstanding and must occur before this report is paired with a passing reviewer_accessibility flag for Gate 5 sign-off.

---

## 11. Audit Discipline Note

This audit identifies risk and routes findings. It does **not** constitute:
- A WCAG 2.1 AA compliance certification — that requires runtime tooling pass + human screen-reader pass.
- A legal-compliance opinion on JDPA or accessibility legislation — escalate to LCA + Founder per AAA escalation protocol.
- A Gate 5 / Gate 6 release decision — that belongs to QAS and Founder.

Per AAA charter (`role definition`): AAA produces deep diagnostic reports; reviewer_accessibility issues the QA Pass 6 gate decision.

*— End of audit, AAA (Rochelle), 2026-05-08*
