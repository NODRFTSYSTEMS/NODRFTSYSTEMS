# Agent Routing Note — Gate 0A

Gate 0A output — required before build packet approval.

Produced by: MOA, PMA, and RCA  
Build: CasaClaro — Colombia Real Estate Marketplace, Phase 2/3 Reconciliation + Core Build Resume  
Date: 2026-04-20  
Classification: Class 3 — Integration or Data-Sensitive Build

---

## 1. Surface Map

| Surface | Description |
| --- | --- |
| Static frontend — HTML entry points | 12 HTML pages: index, cities, city, city-template, map, relocation, rentals, residency, retiree-guide, guide, for-agents, for-sellers, cost-simulator, submit-property, terms-of-service |
| Shared JS — script.js | Core app logic: `CasaClaroApp.init()`, city explorer, cost simulator, map hydration, language toggle, data loading |
| Shared JS — content.js | Bilingual content strings (EN/ES) for UI text, labels, and dynamic copy |
| Shared JS — currency-engine.js | Live FX layer: Frankfurter API (USD/COP), localStorage cache, fallback dataset, timestamp display |
| Data layer — cities.json / cities-data.js | Neighborhood and city dataset; feeds explorer, simulator, and comparison views |
| Styles — styles.css | Shared visual layer across all pages |
| Map — Leaflet integration | Vendor-bundled map rendering (`vendor/`); marker data sourced from cities dataset |
| QA tooling — Playwright | Cross-browser test suite; Node scripts in `qa-nav-check/` and `review_patchA/` |
| GitHub remote | `github.com/NODRFTSYSTEMS/CASACLARO` — push has not yet occurred |

---

## 2. Role-to-Surface Assignment

| Surface | Assigned Agent | Role | Owner Type |
| --- | --- | --- | --- |
| HTML pages (all 12) | FIS | primary implementation | implementation |
| script.js — core logic + QA fixes | SEA | primary implementation | implementation |
| currency-engine.js — FX API wiring | IDS | primary implementation | implementation |
| content.js — bilingual strings | BLS | primary implementation | implementation |
| data/cities.json — schema integrity | DSS | consult-only | implementation |
| styles.css — visual layer | DAA | consult-only | implementation |
| Leaflet / vendor | SEA | primary | implementation |
| Playwright QA | TVA | primary | implementation |
| GitHub push + branch control | RCA | primary | implementation |
| QA gate — all surfaces | QAS | reviewer | review |
| Bilingual parity pass | BPA (via reviewer_localization) | reviewer | review |
| Accessibility pass | AAA (via reviewer_accessibility) | reviewer | review |
| Security review (pre-production only) | SCA | reviewer | review |

**Mandatory base activation stack (confirm all are assigned):**

- [x] `MOA` — orchestration and activation discipline
- [x] `CSM` — context and state continuity
- [x] `PMA` — build packet control
- [x] `RCA` — repository-context loading + GitHub push
- [x] Primary implementation role: `SEA` (script.js, core logic, QA fix re-application)
- [x] `TVA` — verification and reproducibility evidence (Playwright runs)
- [x] Separate reviewer reserved under `QAS` authority: QAS (Imani)

**Conditional specialists activated:**

- [x] `FIS` — frontend HTML page surface changes
- [x] `IDS` — FX API integration (Frankfurter endpoint), third-party debugging
- [x] `DSS` — data layer schema (cities.json parity validation)
- [x] `DAA` — visual layer; required for any UI-touching changes
- [x] `AAA` — accessibility review required (bilingual platform, mobile surface)
- [x] `BPA` — bilingual parity (EN/ES content.js + rendered pages)
- [ ] `SAA` — not activated; architecture is already defined; no boundary-setting decisions pending
- [ ] `PIS` — not activated; no CI/CD or deployment pipeline work in Phase 3
- [ ] `POS` — not activated; performance scope is not explicitly defined
- [ ] `ASIS` — not activated; no agent-system orchestration surfaces in scope
- [ ] `SCA` — reserved for Phase 4 only; not activated for Phase 3 feature work
- [ ] `DRA` — reserved for Phase 5; not activated until Founder release gate

---

## 3. Capability Check

| Agent | Skill pack loadable? | Scope covers surface? | Required inputs available? | No cheaper agent can own this? |
| --- | --- | --- | --- | --- |
| SEA | yes | yes — JS logic, QA fix re-application | yes — fixes documented in memory + build record | yes |
| FIS | yes | yes — HTML page surface | yes — existing pages on disk | yes |
| IDS | yes | yes — Frankfurter FX API, endpoint debugging | yes — endpoint and parsing logic documented | yes |
| BLS | yes | yes — bilingual content.js | yes — content.js on disk | yes |
| DSS | yes | consult-only — schema validation | yes — cities.json on disk | yes (consult role; SEA cannot own data integrity) |
| DAA | yes | yes — styles.css, visual QA | yes — styles.css on disk | yes |
| RCA | yes | yes — repo state, branch, GitHub push | yes — remote URL confirmed | yes |
| TVA | yes | yes — Playwright test runner | yes — test scripts in qa-nav-check/ | yes |
| QAS | yes | yes — all gates | yes | yes (reviewer; cannot implement) |
| BPA | yes | yes — EN/ES parity | yes — content.js + bilingual pages | yes |
| AAA | yes | yes — WCAG 2.1 AA | yes | yes |

---

## 4. Overlap Elimination

| Surface | Primary Owner | Secondary Role | Resolution |
| --- | --- | --- | --- |
| script.js | SEA | TVA (verify) | SEA owns all JS edits; TVA runs Playwright after each patch round |
| currency-engine.js | IDS | SEA (review) | IDS owns FX logic; SEA reviews for integration coherence |
| content.js | BLS | BPA (verify parity) | BLS owns content edits; BPA reviews EN/ES parity after completion |
| HTML pages | FIS | DAA (visual check) | FIS owns structure; DAA verifies visual fidelity |

---

## 5. Handoff Routing Plan

| Step | Agent | Bounded Surface | Handoff Trigger | Evidence Package Required | Fallback Agent |
| --- | --- | --- | --- | --- | --- |
| 1 | RCA | Repo state confirmation | Branch and remote confirmed clean | Git status log | MOA |
| 2 | SEA | QA fix re-application (6 fixes) | All 6 fixes applied, no console errors | Diff log + fix manifest | IDS |
| 3 | IDS | currency-engine.js FX verification | Frankfurter endpoint returns valid COP rate | API response log | SEA |
| 4 | BLS | content.js bilingual content check | No placeholder strings in EN or ES | Content audit log | FIS |
| 5 | TVA | Playwright QA run | All tests pass (target: 99/99 Chrome/Firefox/WebKit) | Test output log | QAS |
| 6 | BPA | Bilingual parity review | EN/ES parity confirmed across all 12 pages | Parity report | QAS |
| 7 | AAA | Accessibility pass | WCAG 2.1 AA at 375/768/1024 | Accessibility findings | QAS |
| 8 | QAS | Release gate review | All passes complete; no CRITICAL defects | QA summary report | ARE |
| 9 | RCA | GitHub push | QAS release recommendation on file | Push confirmation | MOA |
| 10 | Founder | Phase 4 go/no-go | GitHub push confirmed; LCA and SCA reviews scheduled | Human gate record | ARE |

---

## 6. Capability Gaps

| Gap | Affected Surface | Resolution Plan |
| --- | --- | --- |
| LCA privacy review not yet completed | Submit-property form, contact forms, any PII collection surface | LCA (Dorothy) must complete review before Phase 4 activation; blocked until Founder schedules |
| SCA security review not yet completed | All surfaces pre-production | SCA (Omari) activates at Phase 4; not a Phase 3 blocker |
| Auth provider not selected | Future authenticated dashboard surface | Founder decision required before Phase 4 scope can be defined; not a Phase 3 blocker |
| Colombia market legal review pending | Property listing content, residency guidance, regulatory claims | Founder + external counsel; not a Phase 3 blocker |

---

## 7. Routing Approval

This note must be signed off by MOA, PMA, and RCA before the build packet is approved.

- MOA sign-off: [ ] confirmed — awaiting Founder authorization to resume Phase 3
- PMA sign-off: [ ] confirmed — awaiting Founder authorization to resume Phase 3
- RCA sign-off: [ ] confirmed — awaiting Founder authorization to resume Phase 3

**Note:** This Gate 0A note was authored during the 2026-04-20 reconciliation session. The build is currently in HOLD — RECONCILE state. Routing approval will be finalized when the Founder issues the CC-O-006 sign-off to resume Phase 3.
