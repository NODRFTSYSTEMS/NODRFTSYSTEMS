# Execution Plan — CasaClaro Phase 2/3

## Startup Declaration

- Governance files loaded: CLAUDE.md, mandatory-build-activation-protocol-2026-04-15.md, ai-native-operating-architecture.md, build-activation-record.md, evidence-ledger.md
- Active named agents: MOA (Zayne), CSM (Josette), PMA (Keon), RCA, SEA (Malik), IDS, BLS, FIS, DSS, TVA, DAA (Anika), QAS (Imani), AAA (Rochelle), BPA, DRA (Terrence) — reserved Phase 5, HHC (Desmond) — escalation only
- Current project phase: Phase 2 Architecture (COMPLETE) / Phase 3 Core Build (HOLD — RECONCILE as of 2026-04-20)
- Required artifact trail present: Gate 0A routing note (populated 2026-04-20), build-activation-record.md, evidence-ledger.md, casaclaro-app-summary.md
- Workspace exception recorded: Data loss incident 2026-04-18 — RESOLVED. Files confirmed present in `04_products/CASACLARO/`. QA fixes (commit 3cb3217) must be re-applied as they were committed to the inner nested repo prior to folder recovery.

---

## Named Agent Chain

| Function | Named Agent | Status | Reference |
| --- | --- | --- | --- |
| Orchestration | Zayne / MOA | Active | `01_system/registry/final-approved-department-and-agent-registry.md` |
| Context | Josette / CSM | Active | — |
| Scope and acceptance | Keon / PMA | Active | — |
| Repository context | RCA | Active | — |
| Frontend HTML | FIS | Active — Phase 3 | — |
| Core JS implementation | Malik / SEA | Active — Phase 3 | — |
| FX API / integration debugging | IDS | Active — Phase 3 | — |
| Bilingual content | BLS | Active — Phase 3 | — |
| Data schema | DSS | Consult-only — Phase 3 | — |
| Design guidance | Anika / DAA | Consult-only — Phase 3 | — |
| QA gate | Imani / QAS | Active — review only | — |
| Bilingual parity | BPA | Active — review only | — |
| Accessibility | Rochelle / AAA | Active — review only | — |
| Verification | TVA | Active — Phase 3 | — |
| Security | SCA (Omari) | Reserved — Phase 4 | — |
| Deployment readiness | Terrence / DRA | Reserved — Phase 5 | — |
| Legal compliance | LCA (Dorothy) | CRITICAL — must schedule | — |
| Escalation only | Desmond / HHC | On call | — |

---

## MOA Routing Record

- Routing date: 2026-04-20
- Routing rationale: Phase 3 build is resuming after the 2026-04-18 data loss incident. Recovery confirmed. Gate 0A routing note populated. Build is HOLD — RECONCILE pending Founder CC-O-006 sign-off. Once authorized, Phase 3 proceeds with QA fix re-application followed by GitHub push.
- Dependency map reference: Gate 0A routing note (`04_execution/agent-routing-note.md`)
- Confidence level: High — all surfaces identified, agent roles assigned, QA fix manifest documented in memory and build record

---

## Workstreams

### Workstream A — QA Fix Re-Application (Phase 3 resume gate)
Re-apply 6 documented fixes from pre-loss commit 3cb3217 to current working files.

Fixes to re-apply (in sequence):
1. `script.js` lines ~1245, ~1524 — unescaped apostrophe in `'Colombia's minimum wage'` → `\u2019`
2. `script.js` — `formatCurrency` renamed to `formatMoney` throughout
3. `script.js` — `renderCityCardMarkup` function missing — define and insert
4. `currency-engine.js` — `CurrencyEngine` redeclaration on `city.html` — add `window.CurrencyEngine = CurrencyEngine`
5. `currency-engine.js` — endpoint updated from deprecated `api.exchangerate.host` → `api.frankfurter.dev/v2/rates?base=USD&quotes=COP`
6. `currency-engine.js` — response parsing fixed for Frankfurter array format (`data[0].rate`)

Owner: SEA (fixes 1–3), IDS (fixes 4–6)

### Workstream B — GitHub Push
Push current working state to `github.com/NODRFTSYSTEMS/CASACLARO`.  
Prerequisite: Workstream A complete + TVA Playwright run passes.

Owner: RCA  
Pre-conditions: disclosure gate sweep complete, no proprietary NoDrftSystems assets in repo

### Workstream C — LCA Privacy Review (Phase 4 pre-condition)
LCA (Dorothy) reviews PII collection surfaces: submit-property form, contact flows, any localStorage data retention.  
This is a CRITICAL blocker for Phase 4 — cannot be deferred past Phase 3 completion.

Owner: LCA (Dorothy) — Founder must schedule  
Dependency: no Phase 4 activation until this is complete

### Workstream D — Phase 4 Prep (deferred — post Phase 3)
Scope: SCA security review, auth provider selection, Colombia market legal review.  
Do not activate until Workstreams A, B complete and Phase 3 QAS sign-off is on file.

---

## Milestones

| Milestone | Owner | Target Date | Status | Evidence Required |
| --- | --- | --- | --- | --- |
| Founder CC-O-006 sign-off (resume Phase 3) | Founder | TBD | AWAITING | Written authorization in decision log |
| QA fix re-application complete | SEA / IDS | Post sign-off | PENDING | Diff log confirming all 6 fixes applied |
| TVA Playwright run — all browsers | TVA | Post fixes | PENDING | Test output: target 99/99 Chrome/Firefox/WebKit |
| QAS Phase 3 release recommendation | QAS | Post Playwright | PENDING | QA summary report |
| GitHub push to NODRFTSYSTEMS/CASACLARO | RCA | Post QAS rec | PENDING | Push confirmation + remote URL |
| LCA privacy review complete | LCA (Dorothy) | TBD — Founder schedules | CRITICAL OPEN | Legal review log entry |
| Phase 4 activation | Founder | Post LCA + push | PENDING | All Phase 3 milestones on file |

---

## Dependencies

- Founder CC-O-006 sign-off → unblocks Workstream A
- Workstream A (QA fixes) → unblocks TVA Playwright run
- TVA Playwright → unblocks QAS Phase 3 sign-off
- QAS Phase 3 sign-off → unblocks GitHub push (Workstream B)
- LCA privacy review (Workstream C) → required before Phase 4 activation
- GitHub push confirmed + LCA complete → unblocks Phase 4 activation

---

## QA Gates

| Gate | Triggered By | QA Agent | Verifying Agent | Human Approval Required |
| --- | --- | --- | --- | --- |
| Phase 3 QA (all passes) | TVA Playwright passing | QAS (Imani) | TVA | No — QAS recommendation is sufficient for Phase 3 |
| Bilingual parity | BLS content review complete | BPA | QAS | No |
| Accessibility | FIS HTML surface changes | AAA (Rochelle) | QAS | No |
| Phase 4 activation gate | Phase 3 milestones complete + LCA done | QAS | ARE | Yes — Founder |
| Production release gate | Phase 5 complete | QAS | ARE | Yes — Founder + ARE |

---

## QAS Release Gate

- Current status: HOLD — Phase 3 not yet resumed
- Blocking defects: CC-O-006 (Founder Phase 3 sign-off), CC-O-002 (LCA review)
- Remediation owner: Founder (CC-O-006), LCA Dorothy (CC-O-002)
- Latest review reference: 2026-04-20 reconciliation session

---

## Required Human Approvals

| Decision | Authority | Required By |
| --- | --- | --- |
| Phase 3 resume — QA fix re-application and GitHub push (CC-O-006) | Founder | Before Workstream A begins |
| LCA privacy review scheduling | Founder | Before Phase 4 activation |
| Auth provider selection (CC-O-004) | Founder | Before Phase 4 scope definition |
| Colombia market legal review scheduling (CC-O-005) | Founder + external counsel | Before production deployment |
| Production release | Founder + ARE | Phase 5 gate |

---

## Blockers Log

| Date | Blocker | Owner | Resolution | Status |
| --- | --- | --- | --- | --- |
| 2026-04-18 | OneDrive data loss — all CASACLARO source files deleted | Founder | Files recovered via OneDrive recycle bin | RESOLVED 2026-04-20 |
| 2026-04-20 | Gate 0A routing note not populated (blank template) | MOA / PMA | Populated in 2026-04-20 reconciliation session | RESOLVED |
| 2026-04-20 | Gate 1 execution plan not populated (blank template) | MOA / PMA | Populated in 2026-04-20 reconciliation session | RESOLVED |
| 2026-04-20 | casaclaro-app-summary.md missing from registry path | RCA | MD file created at `90_source-documents/ai-architecture/` | RESOLVED |
| 2026-04-20 | AI_REVIEW_AUTHORITY_MATRIX.md — legacy status unclear | MOA | Legacy header added; retirement to archive deferred to Founder | OPEN — CC-O-007 |
| 2026-04-20 | CC-O-006 Founder Phase 3 sign-off pending | Founder | — | OPEN |
| Ongoing | LCA privacy review not yet scheduled (CC-O-002) | Founder | — | OPEN — CRITICAL |

---

## Change Log

| Date | Change | Approved By |
| --- | --- | --- |
| 2026-04-18 | Build activation record created; build classified Class 3 | Founder |
| 2026-04-18 | Data loss incident recorded | — |
| 2026-04-20 | Reconciliation session: incident closed, Gate 0A + Gate 1 populated, app-summary.md restored, legacy matrix flagged | MOA / Codex (pending Founder ratification) |
