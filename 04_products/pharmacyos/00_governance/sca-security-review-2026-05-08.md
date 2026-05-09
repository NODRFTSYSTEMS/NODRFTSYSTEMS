# SCA Security Review — PharmacyOS DSS Schema Plan + Frontend Auth Surfaces
Classification: Internal — NoDrftSystems Proprietary. Do NOT commit to client repositories.
Date: 2026-05-08
Build commit: `01405fc` (HEAD on branch `claude/condescending-wu-b8aa1e`)
Reviewer: SCA (Omari) — Security Compliance Agent
Audience: Founder + ARE archive
Build Class: Class 3 with Class 4 surfaces (auth, JDPA, financial)

---

## 1. DSS Schema Plan — Verdict on the 12 SCA-Review Items

The 12 items below correspond one-to-one with `dss-schema-plan.md` Section 10 (lines 333–346).

### Item 1 — Audit-trigger exclusion list — APPROVED WITH CHANGES

DSS excludes `audit_log`, `security_events`, `inventory_alerts`, `ai_job_results`, `retail_products`, `suppliers`. Verdict on each:

- `audit_log` — APPROVED (logs cannot audit themselves)
- `security_events` — APPROVED (already an append-only log; adding a meta-log creates infinite recursion risk and no defensive value)
- `inventory_alerts` — APPROVED (materialized derived data, not a system of record)
- `ai_job_results` — APPROVED — but with the requirement that the parent `ai_jobs` audit captures `review_outcome`, `reviewed_by`, `reviewed_at`; confirm DSS's "status changes only" filter on `ai_jobs` **does** include the human review fields, since those are the regulatory-relevant ones for Pharmacy Act traceability of AI-extracted Rx data.
- `retail_products` — APPROVED WITH CHANGE: the catalog itself does not require row-level audit, but **price changes** and **deactivation** (`is_active=false`) do — those are commercial-integrity events. Add a narrower trigger that fires on UPDATE only when `price_jmd`, `cost_jmd`, or `is_active` changes.
- `suppliers` — APPROVED WITH CHANGE: same posture — add a trigger restricted to UPDATE on `name`, `email`, `phone`, soft-delete (`deleted_at` set). Supplier identity changes are inventory-fraud-relevant.

### Item 2 — Pattern D coverage (service-role-only writes) — APPROVED

DSS's six designations are correctly scoped: `audit_log`, `schedule_drug_log`, `ai_job_results`, `ai_jobs UPDATE`, `inventory_alerts INSERT`, `security_events INSERT`. Add one explicit reinforcement: confirm that the `dispensing_records` AFTER INSERT trigger that writes to `schedule_drug_log` is itself defined `SECURITY DEFINER` and that the database role owning it has been granted INSERT on `schedule_drug_log` **and nothing else** on that table — no UPDATE, no DELETE — so even an exploited trigger cannot mutate prior rows.

### Item 3 — `security_events` SELECT scope — APPROVED WITH CHANGES

DSS proposes admin-only. For an internal pharmacy with one or two managers and one admin, admin-only is too narrow operationally — a manager investigating a staff lockout cannot see the failure trail.

**SCA decision:** SELECT for `admin` AND `manager`, but `manager` sees only events where `event_type IN ('failed_login', 'failed_2fa', 'lockout', 'force_logout')` and **never** sees `metadata` columns containing IP-correlated patterns or any field that could identify another staff member's session forensics. Implement via a `security_events_manager_view` (see Item 4 pattern).

### Item 4 — `audit_log` manager subset — APPROVED WITH CHANGES (specific boundary)

DSS leaves the boundary undefined ("limited subset for reporting"). Defining it now:

**Implementation:** create a view `audit_log_manager_view` with the policy `(auth.jwt() ->> 'role') IN ('manager', 'admin')` granting SELECT. The view filters:

- INCLUDE: `entity_type IN ('inventory_transactions', 'drug_lots', 'retail_transactions', 'loyalty_transactions', 'system_settings')` — operational and commercial events
- EXCLUDE: `entity_type IN ('patients', 'patient_insurance_cards', 'jdpa_data_export_requests', 'prescriptions', 'dispensing_records', 'schedule_drug_log')` — clinical/PII events stay admin-only
- REDACT: `before_state` and `after_state` returned as `jsonb_strip_nulls(...)` minus any path matching `*_phone`, `*_email`, `address`, `date_of_birth`, `name` — managers see WHAT changed, not the personal data

Underlying table `audit_log` itself remains admin-only at the RLS level. Manager access is exclusively through the view. This is the correct pattern for a regulated audit trail under JDPA — managers are not data controllers.

### Item 5 — Soft-delete vs hard-delete on `patients` — APPROVED WITH CHANGES + REQUIRES JAMAICA COUNSEL

The schema's soft-delete-with-field-nulling pattern is **structurally sound** for the JDPA-vs-Pharmacy-Act conflict, but the **field-nulling specification is not documented**. SCA cannot approve "sensitive demographic fields nulled" as a phrase.

**APPROVED WITH CHANGES:** before any migration writes the soft-delete handler, DSS must produce an explicit field redaction list inline in the migration SQL. SCA pre-authorises the following set as the working draft, subject to Jamaica counsel:
- `first_name` → `'[ERASED]'`
- `last_name` → `'[ERASED]'`
- `date_of_birth` → NULL
- `phone`, `email`, `address` → NULL
- `allergies` → NULL (allergies are PHI; if Pharmacy Act requires retention, this must reverse — counsel decides)
- RETAINED: `id`, `jdpa_consent_given`, `jdpa_consent_date`, `jdpa_consent_version`, `deleted_at` — the consent audit trail is the regulatory record of the erasure event itself.

**REQUIRES JAMAICA COUNSEL:** the JDPA-vs-Pharmacy-Act precedence question (which fields, if any, must persist for dispensing-record linkage under Pharmacy Act §X retention rules) is a statutory interpretation question. SCA does not interpret statute. Founder must commission Jamaica counsel review before this migration is finalised.

### Item 6 — Redaction-view design for soft-deleted patients — APPROVED WITH CHANGES

The view pattern is correct in principle. Specification:

```sql
CREATE VIEW prescriptions_with_redacted_patient AS
SELECT pr.*,
  CASE WHEN p.deleted_at IS NOT NULL
       THEN '[ERASED]' ELSE p.first_name END AS patient_first_name,
  CASE WHEN p.deleted_at IS NOT NULL
       THEN '[ERASED]' ELSE p.last_name END AS patient_last_name,
  CASE WHEN p.deleted_at IS NOT NULL
       THEN NULL ELSE p.date_of_birth END AS patient_dob
FROM prescriptions pr
JOIN patients p ON pr.patient_id = p.id;
```

Apply the same pattern for `dispensing_records`, `schedule_drug_log`, and `loyalty_transactions`. The underlying tables retain the FK; the view is the only authorised query path for clients. **SCA REQUIREMENT:** all client-facing queries in `app/src/hooks/` (when written) must hit the view, never the underlying joined table directly. Enforced by a code-review rule (TVA in Pass 4).

### Item 7 — `custom_access_token_hook` SECURITY DEFINER privilege envelope — APPROVED WITH CHANGES

The plan's description is structurally correct. SCA-mandated guardrails before approval:

1. The function must `SET search_path = ''` at the top of the body — without this, a malicious schema-shadow on `user_profiles` could redirect the role lookup. Known Postgres SECURITY DEFINER hardening pattern.
2. Function ownership: `postgres` superuser (NOT a normal application role).
3. Grants: `REVOKE ALL ON FUNCTION public.custom_access_token_hook(jsonb) FROM PUBLIC;` and grant EXECUTE only to `supabase_auth_admin`.
4. The grant on `user_profiles` for the function's lookup must be `GRANT SELECT (id, role) ON user_profiles TO supabase_auth_admin;` — column-level, not table-level. The function does not need read access to `failed_2fa_attempts`, `locked_at`, etc.
5. The function must return the original event JSON **unmodified** if the user has no `user_profiles` row (locked, deleted, mid-creation). It must NOT fabricate a default role. RLS denies-by-default is the intended posture.
6. Add a defensive `IF role IS NULL THEN return event; END IF;` guard.

These constraints are not suggestions — they are conditions of approval.

### Item 8 — Storage bucket policies — APPROVED WITH CHANGES

The three buckets per ADR Decision 6 are scoped correctly. Required additions:

- `prescription-images` — INSERT policy must additionally enforce `(storage.foldername(name))[1] = (auth.jwt() ->> 'sub')` OR add a server-side path validator. As written, a pharmacist could upload to **any** patient's path. Risk: cross-patient image pollution. Resolution: prefix the storage path with `(auth.jwt() ->> 'sub')/{patientId}/{prescriptionId}/{filename}` or implement a check function. **This is a CRITICAL change before any upload code is written.**
- `prescription-images` — add MIME-type validation in the policy itself (`name LIKE '%.jpg' OR name LIKE '%.png' OR name LIKE '%.webp' OR name LIKE '%.pdf'`) — bucket-level MIME config is enforced by Supabase Storage but a defense-in-depth policy clause is appropriate for a JDPA surface.
- `invoice-images` — same path-prefix concern applies; less severe (commercial document, not PHI), but apply the same pattern for consistency.
- `ai-uploads` — INSERT policy "any authenticated user" is too broad. Restrict to `(auth.jwt() ->> 'role') IN ('pharmacist', 'pharmacy_technician', 'manager')` — front-desk cashier has no AI scanner affordance per design handoff and should not be able to write to this bucket.
- All three buckets — add an explicit DELETE-denied policy for non-service roles. Supabase's default is deny, but an explicit policy makes the constraint visible in audit.

### Item 9 — JDPA-exports bucket — APPROVED, scope-scoped to Founder Item 3

A fourth bucket `jdpa-exports` is required. Posture:
- Private; no public URL ever
- INSERT: service-role only (Edge Function `export-patient-data`)
- SELECT: service-role only (the Edge Function returns a signed URL with a short TTL — 5 minutes — to the requesting pharmacist/admin)
- DELETE: service-role only; scheduled cleanup at 30 days

The 30-day retention is **APPROVED** as a starting posture but flagged to Founder — a JDPA export delivered to the patient could justify 7-day retention.

### Item 10 — CHECK constraint enumerated value sets — APPROVED WITH CHANGES

DSS enumerates value sets across multiple tables. Required:

- Every CHECK-constrained `text` column must reference a centralized enum definition. Recommendation: define `CREATE TYPE` enums (Postgres native enums) for `user_role`, `prescription_status`, `transaction_type`, `event_type`, `request_type`, `payment_method`, `alert_type`, `alert_severity`, `ai_job_type`, `ai_job_status`, `ai_review_outcome`, `audit_action`. CHECK-on-text scatters the canonical list across migrations and creates drift risk.
- The role set in `user_profiles.role` must match `app/src/types/auth.ts` lines 7–13 verbatim. SCA confirms current alignment: pharmacist, pharmacy_technician, front_desk_cashier, manager, admin — all present. No drift.
- `schedule_class` value set (schedule_2/3/4) is "pending pharmacist sign-off" (Open Question 1) — this is a **REQUIRES JAMAICA COUNSEL + CLIENT PHARMACIST** item. Until the Jamaica Pharmacy Act schedule classes are confirmed against the statute by counsel, the CHECK constraint cannot be finalized. Interim: leave as flexible jsonb is **REJECTED** as too permissive — instead, define the column as `text` with no CHECK constraint until pharmacist + counsel sign off, and add the CHECK constraint in a follow-up migration. A flexible jsonb on a regulated controlled-substance class field is an unacceptable posture for any duration.

### Item 11 — `pharmacy_act_fields` validation strategy — REJECTED as written, APPROVED WITH MODIFICATION

DSS's interim posture — column as `jsonb NOT NULL DEFAULT '{}'::jsonb` until pharmacist sign-off — is **REJECTED** in current form for the reason stated above: a regulated record cannot have an unvalidated payload, even temporarily.

**APPROVED WITH MODIFICATION:**
1. Migration `0005_schedule_drug_log.sql` does NOT execute until the pharmacist-approved field set is in hand. Hard sequencing constraint.
2. The schedule drug dispensing UI is gated off until `0005_schedule_drug_log.sql` ships. The current frontend `ScheduleLogPage.tsx` is read-only on sample data — that is fine. No write path may be wired to a schedule drug.
3. If client pharmacist sign-off slips beyond a date the Founder cannot accept, the **only** authorised interim is: schedule drugs cannot be dispensed via PharmacyOS at all (UI hard-disabled with "feature pending regulatory format approval" copy). They cannot be dispensed against a flexible-jsonb log.

This is a Class 4 surface inside a Class 3 build — the Pharmacy Act treats schedule drug records as evidentiary. SCA does not authorise an unvalidated schema for an evidentiary surface.

### Item 12 — Realtime publication scope — APPROVED

Two tables (`prescriptions`, `ai_jobs`) per ADR Decision 5. No others required for Phase 1. APPROVED. Confirm filter publication is row-level (specific `id`) for `ai_jobs` to avoid broadcasting all AI job churn to all subscribers — the kanban-style broadcast is appropriate for `prescriptions` only.

---

## 2. Cross-Cutting Schema Items DSS Did Not Flag (SCA-initiated)

**A. `failed_2fa_attempts` reset path.** `user_profiles.failed_2fa_attempts` increments on failed 2FA. The schema does not specify the **reset path** — successful 2FA must reset this counter to zero. DSS must define this as a trigger or a service-role-only function called by Supabase Auth's `mfa_challenge_verified` hook. Without this, the counter accumulates across legitimate sessions and any user eventually locks out. **APPROVED WITH ADDITION** — define the reset logic in `0001_initial_schema.sql`.

**B. `locked_at` clearance authority.** `locked_at` is set on lockout. The schema implies admin manually unlocks. Confirm the unlock RLS policy is admin-only and that unlock writes a `security_events` row with `event_type = 'admin_unlock'`. **APPROVED WITH ADDITION** to `0001`.

**C. JWT `aud` and `iss` claim verification in Edge Functions.** RLS uses `auth.jwt()` which Supabase validates server-side. But Edge Functions that receive a JWT via the `Authorization` header must explicitly verify `aud === 'authenticated'` and `iss` matches the project URL — Supabase's `verify_jwt = true` flag in `config.toml` handles this, but BLS must confirm it is enabled for every Edge Function before deployment.

---

## 3. Frontend Auth Surface Findings

### Three-layer enforcement readiness (ADR Decision 7)

**Current state (commit `01405fc`):** the frontend has UI-only stubs:
- `ProtectedRoute.tsx`: passes children through unconditionally with comment "Do NOT deploy this build to any environment with real user access."
- `RoleGuard.tsx`: passes through unconditionally; `roles` prop accepted but ignored.
- `LoginPage.tsx`: 600ms `setTimeout` then `navigate('/login/2fa')` — no Supabase Auth call.
- `TwoFactorPage.tsx`: same pattern — `setTimeout` then `navigate('/dashboard')` — no MFA verification call.

**Verdict:** acceptable for scaffolding. **CRITICAL** that the TODOs are closed before Slice 10 (auth integration). The `ProtectedRoute` self-warning is appropriate — preserve the warning in the JSDoc until both stubs are replaced, then remove together.

### Frontend security gaps (highest-severity first)

**HIGHEST SEVERITY — not yet a defect, but the largest gap to close before Slice 10:** there is no `useSupabaseSession` hook, no `AuthProvider` context, and no auth state listener wired. The frontend has no representation of "is the user logged in" beyond the stub. Required wiring:
1. `useSupabaseSession` hook in `app/src/hooks/useSupabaseSession.ts` — calls `supabase.auth.getSession()` on mount, subscribes to `supabase.auth.onAuthStateChange`, exposes `{ session, loading }`.
2. Replace `ProtectedRoute` body: if `!loading && !session` → `<Navigate to="/login" state={{ from: location }} replace />`. Add 2FA-completed gate (the AAL2 check) — `session.aal !== 'aal2'` redirects to `/login/2fa`.
3. Replace `RoleGuard` body: read `session.user.app_metadata.role` (per ADR); not in `roles` array → `<Navigate to="/unauthorized" replace />`. **NOT** `user_metadata` — that is user-writable. Confirm BLS implements the JWT custom claim hook to write to `app_metadata`, the server-only side.

**Token refresh:** `supabase.ts` sets `autoRefreshToken: true` — APPROVED. Also confirm `detectSessionInUrl: true` is appropriate for password-reset flows but does not introduce a session-injection risk on internal-only routes.

**Session storage in `localStorage` (ADR):** APPROVED for this build. Justification: PharmacyOS is internal-only, deployed on managed devices behind an auth gate, no XSS-loaded scripts. Combined with strict CSP (required below) the residual XSS-token-theft risk is acceptable. **Required hardening:** when Slice 10 lands, set a strict `Content-Security-Policy` header at the Vercel edge (`script-src 'self'`, `connect-src 'self' https://*.supabase.co`, `frame-ancestors 'none'`, `default-src 'self'`). PIS owns this at deployment.

**5-wrong-2FA-attempt lockout UX (BAP, ADR):** the frontend has **no lockout state surfacing** in `TwoFactorPage.tsx`. Required additions when auth wires:
- After each failed 2FA, surface remaining attempts ("3 attempts remaining").
- On lockout: render a dedicated lockout state (not a generic error) explaining the account is locked and to contact admin. Disable all 2FA inputs.
- The lockout decision must come from the server — never trust a client-side counter.

**Backup-code single-use UX:** `TwoFactorPage.tsx` has a "Use backup code" button but no separate state. When auth wires, the backup-code path must (a) call `supabase.auth.mfa.challenge({factorType: 'totp'})` for TOTP or use the backup-code-redemption endpoint, (b) on success, the UI must reflect that one of N backup codes was consumed. Backend invalidation is the security boundary; frontend reflects it.

**Password requirements (12-char minimum):** the ADR text in front of me does not actually contain a 12-character minimum. **REQUIRES FOUNDER CONFIRMATION** of the password policy. If 12-char minimum is the intent, add to `LoginPage.tsx` and the password reset/change forms with client-side validation, and configure the matching policy in Supabase Auth dashboard (the security boundary).

**Route inference flags:** `route-permissions.ts` has 14 routes flagged `inferred: true`. **APPROVED to ship as-is for scaffolding** but every `inferred: true` must close before Gate 5 with stakeholder confirmation. Most concerning: `/patients/:id/jdpa` is INFERRED admin-only. JDPA export/deletion is a regulated surface; admin-only is the conservative correct posture, but the inference must be **affirmatively confirmed**, not just left as default.

---

## 4. JDPA + Pharmacy Act Surface Findings

**Patient-data exfil risk in URL or analytics:**
- `PatientDetailPage.tsx` reads `id` from `useParams` — the patient ID is in the URL. Structurally fine **if** the ID is an opaque UUID (DSS — yes, `gen_random_uuid()`). It is a defect **if** any analytics, error-reporting, or telemetry tool captures URLs.
- **Current state:** no analytics, gtag, mixpanel, posthog, segment, or telemetry imports anywhere in `app/src`. No `console.log` of PII. **CLEAN today.**
- **Forward requirement:** when error reporting is added (Sentry, etc.), URL scrubbing must be configured to redact `:id` segments under `/patients/`, `/prescriptions/`, `/admin/users/`, `/pos/loyalty/`. Add this to the deployment pre-flight checklist.
- Patient names, DOBs, allergies, NHF numbers — none appear in URLs or anywhere except in-page display. CLEAN.

**Schedule drug log write-once UX:**
- `ScheduleLogPage.tsx` already renders a Lock icon and the explicit copy "Pharmacy Act Regulated Record · entries cannot be modified or deleted." Excellent. APPROVED.
- No edit affordance is rendered. APPROVED.
- When real data wires up, confirm: no row-action menu, no inline edit, no bulk-action row checkbox, no delete button. The dispense-action surface (which writes to `dispensing_records` and triggers the schedule log) is a separate UI; that one must require pharmacist re-authentication step-up (TOTP re-prompt) per ADR Decision 7's MFA framing — **REQUIRES JAMAICA COUNSEL** confirmation that step-up auth is required by the Pharmacy Act for schedule dispense, or merely best-practice.

---

## 5. Secret Hygiene Scan — CLEAN with two minor flags

Files scanned: all `app/src/**/*.{ts,tsx}` plus `app/.env.example`, `supabase/.env.example`, all `.gitignore` files.

**Findings:**
- `app/src/config/supabase.ts` — uses `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. CORRECT. Anon key is public-safe per ADR Decision 11.
- Guard throws if env vars missing. CORRECT pattern.
- No hardcoded API keys, tokens, passwords, connection strings.
- No `ANTHROPIC_API_KEY`, `LYNK_API_KEY`, `LYNK_API_SECRET`, `SUPABASE_SERVICE_ROLE_KEY` references in `app/src/`. CLEAN.
- No `console.log`/`console.error` calls anywhere in `app/src/`. CLEAN.
- No `dangerouslySetInnerHTML`, `eval()`, `new Function()`, `innerHTML`, `document.write`. CLEAN.
- `app/.env.example` (committed) contains placeholder values only. CLEAN.
- `supabase/.env.example` (committed) contains empty values for all secret keys. CLEAN.

**Two minor flags:**
- `app/.gitignore` does NOT explicitly include `.env` lines. It catches `*.local` (covers `.env.local`) but a bare file named `.env` in `app/` would slip through `app/.gitignore` and rely on the parent `04_products/pharmacyos/.gitignore` to catch it. **APPROVED today** because the parent does cover it, but consider adding `.env` and `.env.*` (with `!.env.example`) to `app/.gitignore` for defense-in-depth.
- `app/src/pages/admin/SettingsPage.tsx` displays "Anthropic Claude Vision · Connected" status copy. Status indicator only — not a secret leak. APPROVED. Confirm the eventual implementation does NOT leak the API key fingerprint or tail to the page.

**Verdict: SECRET HYGIENE CLEAN.**

---

## 6. Cross-Cutting Risks Spanning Multiple ADR Decisions

**R1. RLS-vs-Edge-Function-vs-Route-Guard alignment risk.** Three layers with three drift surfaces. Mitigation: every entity gets a single TypeScript type emitted from `supabase gen types typescript`. Every RLS policy, every Edge Function role check, and every `RoleGuard roles=` array must reference the same `Role` type from `app/src/types/auth.ts`. SCA-mandated: a CI-time check that `Role` enum members === `user_profiles.role` CHECK constraint members. TVA owns this in QA Pass 4.

**R2. `localStorage` token + future analytics.** As long as no third-party analytics, error-reporter, or chat widget is added to the app shell, `localStorage` token storage is appropriate. The moment any external script enters the bundle, the token-theft surface materially grows. SCA-mandated rule: any new third-party JS dependency triggers a re-review of the session storage decision.

**R3. AI extraction provenance vs. JDPA.** When `process-rx-scan` reads from `ai-uploads` and writes extracted patient names + drug data into `ai_job_results.extracted_fields`, that result row is now PHI. RLS on `ai_job_results` restricts to the same role set as the parent — APPROVED. But: the Claude Vision API call sends the prescription image to Anthropic's servers. **REQUIRES JAMAICA COUNSEL:** confirm Anthropic's data processing terms and data residency are JDPA-compliant for Jamaica patient PHI. Founder must verify Anthropic's DPA covers JDPA, and that "input data is not used for model training" is contractually established for the project's API key tier.

**R4. Edge Function service-role key handling.** Service role bypasses RLS by design. Every Edge Function that uses it is, in effect, a privilege-escalation surface. SCA mandates: Edge Function code review by SCA before each deployment.

**R5. Realtime broadcast leakage.** Supabase Realtime respects RLS on the publishing table, but a misconfigured publication can broadcast rows to subscribers who would not pass a SELECT policy. SCA-mandated: when `0004` and `0006` migrations enable Realtime on `prescriptions` and `ai_jobs`, DSS includes explicit publication scope and SCA tests that a `front_desk_cashier` subscribing to the `prescriptions` channel receives no rows.

---

## 7. Pre-Production Schema Migration Checklist

Before any production schema migration runs (which requires ARE per ADR Decision 12), SCA verifies:

- [ ] Founder + Jamaica counsel sign-off on JDPA-vs-Pharmacy-Act precedence (Item 5)
- [ ] Pharmacist sign-off on `pharmacy_act_fields` exact field set (Item 11)
- [ ] Pharmacist + counsel confirmation of `schedule_class` enum values (Item 10)
- [ ] All five `custom_access_token_hook` hardening clauses applied (Item 7)
- [ ] All four storage-bucket policy changes applied (Item 8)
- [ ] All `inferred: true` route-permission flags resolved with stakeholder confirmation
- [ ] Anthropic DPA confirmed JDPA-compatible (Cross-cutting R3)
- [ ] CSP header configured at Vercel edge
- [ ] Password policy confirmed and Supabase Auth setting matches
- [ ] 5-wrong-2FA-lockout tested end-to-end (UI + backend counter + admin unlock)
- [ ] Backup-code single-use tested (consume one, confirm cannot be reused)
- [ ] `failed_2fa_attempts` reset on successful 2FA tested
- [ ] RLS policy regression tests written for every table
- [ ] Schedule drug log immutability tested (UPDATE attempt fails for admin role)
- [ ] Audit log immutability tested (UPDATE/DELETE attempts fail for all roles including service role used outside the trigger context)
- [ ] Storage bucket path-prefix enforcement tested (pharmacist-A cannot upload to pharmacist-B's path)
- [ ] AI-extracted-data RLS tested (technician cannot read another pharmacy session's `ai_job_results`)

---

## 8. Items Beyond SCA Scope

**Founder authority required:**
- Jamaica counsel engagement for JDPA-vs-Pharmacy-Act precedence (Item 5)
- Anthropic DPA review for JDPA compliance (Cross-cutting R3)
- 30-day vs 7-day JDPA-export retention (Item 9)
- Password policy specification (12-char or other) — SCA could not verify the spec in ADR Decision 7
- Multi-tenant column placeholder decision (DSS Open Question for Founder #4)
- Supabase Free→Pro tier timing (DSS Open Question for Founder #5)

**Jamaica counsel required (REQUIRES JAMAICA COUNSEL):**
- Statutory interpretation of JDPA right-to-erasure vs Pharmacy Act dispensing-record retention
- Confirmation of Pharmacy Act schedule classes (2/3/4 or other) and required fields for the regulated log
- Whether step-up MFA is statutorily required at schedule-drug dispense
- Whether Anthropic's data-processing terms satisfy JDPA cross-border transfer requirements

**Client pharmacist required:**
- Final `pharmacy_act_fields` field set + format
- Schedule class enum values
- Schedule drug log export format (PDF/CSV column order)

---

## Summary

(a) **Schema-plan items: 3 APPROVED outright (Items 2, 9, 12), 8 APPROVED WITH CHANGES (Items 1, 3, 4, 5, 6, 7, 8, 10), 1 REJECTED-AS-WRITTEN with approved modification (Item 11).** Plus 3 SCA-initiated additions (failed_2fa reset path, locked_at clearance authority, JWT aud/iss verification in Edge Functions).

(b) **Highest-severity frontend security gap:** the `ProtectedRoute` and `RoleGuard` stubs pass children through unconditionally. The components self-warn against deployment, which is correct, but until the real session and JWT-claim wiring lands in Slice 10, the application has no authentication enforcement and must not be deployed to any environment with real user access.

(c) **Blocking items that must close before Slice 10 (auth integration) can begin:**
1. Founder + Jamaica counsel decision on the JDPA-vs-Pharmacy-Act soft-delete redaction field list (Item 5) — blocks `0003_patients_schema.sql`.
2. Pharmacist sign-off on `pharmacy_act_fields` and `schedule_class` enum (Items 10, 11) — blocks `0005_schedule_drug_log.sql`. Slice 10 itself can technically proceed without this, but the schedule-drug dispense surface cannot be wired until both close.
3. `custom_access_token_hook` hardening clauses applied (Item 7) — blocks `0001_initial_schema.sql`. **Single hardest blocker for Slice 10** because the hook is what gives the JWT its role claim, and the role claim is what Slice 10's `RoleGuard` reads.
4. Anthropic DPA confirmation for JDPA (Cross-cutting R3) — does not block Slice 10 (auth) but blocks any AI-scanner slice that processes real patient images.

The frontend-side prerequisites (the `useSupabaseSession` hook, real `ProtectedRoute` and `RoleGuard` bodies, lockout-state UI in `TwoFactorPage`, password policy validation) are all bounded engineering work that Slice 10 itself owns — they are not blockers for starting Slice 10, they are the contents of Slice 10.

**Overall verdict on the DSS schema plan:** structurally sound, single-tenant scope correctly observed, RLS posture appropriate for a Class 3-with-Class-4-surfaces build. Cleared for migration SQL drafting **after** the 8 APPROVED-WITH-CHANGES items receive their changes and the 1 REJECTED item is sequenced behind pharmacist sign-off. Full migration cannot run to production until the eight Founder/counsel/pharmacist items in Section 8 close.

---

*SCA (Omari) — Security Compliance Agent | NoDrftSystems*
*Classification: Internal — NoDrftSystems Proprietary | Do NOT commit to client repositories*
*Review date: 2026-05-08 | Build commit: 01405fc | Status: SCHEMA PLAN — APPROVED WITH CHANGES; FRONTEND AUTH SURFACE — STUB-CONFIRMED, READY FOR SLICE 10 SUBJECT TO BLOCKING ITEMS ABOVE*
