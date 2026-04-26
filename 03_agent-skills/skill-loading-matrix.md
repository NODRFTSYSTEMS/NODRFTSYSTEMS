# Skill Loading Matrix

## Objective

Define which repository skills should load for which workflow so AI participation stays modular, reviewable, and tied to real operating needs.

## Loading Principles

- Load skills by workflow phase, not by generic persona.
- Use the minimum number of skills that fully covers the task.
- Do not combine unrelated phases such as intake, pricing, build, and handoff into one prompt when a bounded sequence is clearer.
- If a workflow has no matching skill, add one only when the workflow is genuinely recurring.

## Current Skill Registry

| Skill | Load When | Required Inputs | Expected Outputs | Workflow Supported |
| --- | --- | --- | --- | --- |
| `repository-triage` | repository is cluttered, ambiguous, or export-heavy | repository tree, representative files, business objective | structural observations, deficiencies, folder recommendations | repository audit and restructuring |
| `documentation-reconstruction` | a document or template is weak or fragmented | source file, adjacent references, operating objective | rebuilt document, remaining gaps, follow-up decisions | canonical doc rebuilding |
| `profitability-review` | workflow, pricing, or tooling may be leaking margin | service model, workflow map, tool stack, team model | margin risks, simplifications, tool rationalization | efficiency and leverage review |
| `client-intake-analysis` | intake packet or discovery request needs routing — **EXTERNAL CLIENTS ONLY. Do not load for NoDrft proprietary products.** | intake data, budget, timeline, stakeholders | verified facts, risk flags, route recommendation | lead qualification |
| `pricing-safety-review` | commercial artifact is being drafted or reviewed; also applies to SaaS pricing pages, product subscription tiers, and proprietary product commercial surfaces | operative pricing, artifact, scope summary, payment rules | blockers, corrections, pass/fail | commercial control |
| `client-workspace-bootstrap` | accepted work must be instantiated into the standard workspace — **dual mode: external client OR proprietary product** | external: intake packet, client name, project slug, owner; proprietary: product name, Proprietary Build Declaration, Founder authorization | initialized workspace plan, starter records, missing-info list | workspace setup |
| `strategy-brief-builder` | discovery outputs must become an execution-ready brief | discovery notes, intake, constraints, package path | strategy brief, scope boundaries, acceptance criteria | discovery-to-strategy transition |
| `release-gate-review` | work is approaching release or handoff | release candidate, QA status, approvals, known issues | release recommendation, blockers, readiness note | pre-release control |
| `handoff-preparation` | final delivery package or close-out is being assembled | final files, access list, QA status, support terms | handoff package, checklist, archive note | transfer and closure |
| `strategic-review` | QAS or supervisor outputs need critical synthesis into recommended next steps | QAS reports, supervisor summaries, scope, constraints, supporting data | recommendation brief, evidence map, gap flags | decision support and cross-functional analysis |
| `visual-direction` | a project requires visual strategy, asset direction, a visual brief, or governed modernization of a homepage, packages page, case-study route, or service page | project brief, brand framework, asset library, platform constraints, active proof inventory where relevant | visual direction brief, asset requirements, changelog | visual system governance |
| `legal-compliance` | a deliverable touches privacy, contracts, terms, disclaimers, or regulatory requirements | legal document, jurisdiction, regulatory framework, baseline | compliance review report, gap analysis, risk flags | legal and regulatory oversight |
| `system-maintenance` | system health, component currency, or pre-build verification is required | tool inventory, build plan, version records, security advisories | health report, pre-build checklist, update recommendations | system monitoring and readiness |
| `quantitative-review` | any build phase, deliverable, or analysis containing formulas, calculations, quantitative models, financial projections, scoring logic, or quantitative claims | problem statement, raw data/parameters, precision requirement, downstream use | Mathematical Surface Inventory, verified derivations with confidence scores, verification evidence, Mathematical Review Summary | quantitative analysis and mathematical verification |
| `vecs-public-route` | any governed build that materially changes a homepage, packages page, case-study route, or service page — hierarchy, proof presentation, interaction states, CTA path, or trust framing; requires `visual-direction` brief on file before loading | route classification, active proof inventory, visual direction brief, current route audit, package tier, root contract active | route audit baseline, VECS cell activation record, implementation evidence, review completion records, evidence ledger update, structured completion report | public commercial route governance |
| `website-monetization-fit-review` | strategy phase when client asks how to generate revenue from their site, or when monetization is explicitly a topic in the strategy brief | website tier, audience profile, content model, client revenue model, pricing governance reference | monetization fit summary, ranked model recommendations, scope boundary note, implementation exclusions, privacy flag if triggered | discovery-to-strategy and website strategy |
| `chatbot-scope-safety-design` | any build where a chatbot, live chat widget, or conversational AI component is in scope | chatbot use case brief, audience profile, data handling requirements, escalation path, brand voice, platform context | chatbot purpose statement, safety rail specification, data handling scope, handoff specification, failure-mode spec, integration brief, privacy flag if triggered | web build feature scoping |
| `knowledge-integrity-sweep` | quarterly review cycle; before any major proposal, case study, or public content release that cites prior work; when governance documents have not been reviewed in >90 days; when internal contradictions are suspected | document or document set to review, original approved sources, date of last verified update, known changes in subject matter | knowledge integrity report, stale-document list, unverified-claims list, contradiction flags, remediation priority | governance health and content quality |
| `client-success-operating-protocol` | any active client in live delivery or on a maintenance retainer — recurring operational cadence, not a one-time task | client workspace reference, project phase, CSM context package, CHSA health score or PSA proxy, last communication date, retainer allocation if applicable | weekly status packets, monthly health reports, at-risk escalation notes, renewal trigger records | client relationship management |
| `business-baseline-reconciliation` | company-level facts, strategic documents, or baseline records contain unresolved unknowns, drift, or unsupported claims | current business plan or strategy doc, source hierarchy, decision log, any human-supplied evidence | updated company baseline register, unresolved-facts list, source-integrity findings, decision list | company baseline control |
| `public-proof-inventory-builder` | NoDrftSystems needs a controlled ledger for proof claims, evidence, permission status, or public-use approval | candidate proof claims, source evidence, permission constraints, intended use surface | updated proof inventory, blocked-claims list, approval ledger, route-safe proof summary | public proof governance |
| `proprietary-surface-governance-reconciliation` | an active `04_products/` surface lacks a clean paired workspace, control-plane record, or registry coverage | product folder path, current product docs, control-plane context, registry context, Founder authorization | paired workspace records, control-plane reconciliation, registry updates, blocker-tracking plan | proprietary product governance |

## Recommended Skill Bundles By Workflow

### Repository restructuring

- `repository-triage`
- `documentation-reconstruction`
- `profitability-review` when tool or workflow drag matters

### Lead intake and qualification (external clients only)

- `client-intake-analysis` — external client leads only; do not load for NoDrft proprietary products
- `pricing-safety-review` only if the output is already moving toward proposal or package fit

### Proprietary product build setup

- `client-workspace-bootstrap` — load in proprietary product mode: inputs are product name, Proprietary Build Declaration, and Founder authorization; skip intake scoring entirely
- `strategy-brief-builder` — for proprietary builds, "intake packet" = product brief; "commercial context" = internal business case

### Accepted external client setup

- `client-workspace-bootstrap` — load in external client mode

### Discovery to executable plan

- `strategy-brief-builder`
- `pricing-safety-review` when scope changes affect the offer

### Company baseline and business-plan gap closure

- `business-baseline-reconciliation` - reconcile company-level unknowns into a controlled baseline register
- `public-proof-inventory-builder` - build or update the public proof approval ledger before any proof claim is reused
- `proprietary-surface-governance-reconciliation` - formalize any active proprietary surface that lacks clean workspace or registry coverage
- `strategic-review` when multiple open items or conflicting source positions require ranked synthesis
- `legal-compliance` when legal entity or legal-adjacent external language is involved

### Release and close-out

- `release-gate-review`
- `handoff-preparation`

### Governed technical build activation

- `release-gate-review` when the work is approaching reviewer or release gates
- `system-maintenance` before any build or deployment to verify component currency and system health
- `legal-compliance` when the build includes trust-sensitive surfaces, data collection, or legal-adjacent copy
- `visual-direction` when the build includes new visual assets, branding, UI surface changes, or public commercial route modernization such as homepage, packages, case studies, or service pages
- use the build prompt library and build control asset library as mandatory companions to the active role skills

### VECS public-route modernization

- `visual-direction` — must run first; produces the direction brief that `vecs-public-route` requires as a pre-condition
- `vecs-public-route` — load after visual direction is confirmed; governs the full VECS cell, build phases, and reviewer gates
- `release-gate-review` before route release
- `legal-compliance` when proof, disclosures, or regulated claims increase trust or liability risk
- `strategic-review` when route changes materially alter package framing, service-fit messaging, or market-facing posture

Required reviewer agents (load before Gate 4):
- `reviewer_vecs` — route-level authority flow, anti-generic patterns, proof posture, CTA architecture, interaction governance
- `reviewer_public_proof` — individual claim verification
- `reviewer_plain_language` — copy clarity and CTA specificity
- `reviewer_accessibility` — WCAG 2.1 AA and reduced-motion compliance
- `reviewer_localization` — if bilingual route exists

Required control assets:

- client governance profile
- root contract
- scoped rules
- activation and handoff checklist
- canonical prompt inventory
- canonical tool inventory
- repository-agent capability map
- evidence ledger
- structured completion report

### Website feature scoping (chatbot or monetization in scope)

- `chatbot-scope-safety-design` — when chatbot is in scope; run before any build work begins
- `website-monetization-fit-review` — when monetization strategy is a topic; run during strategy-brief phase
- `legal-compliance` — if either skill triggers a PII or legal flag
- `pricing-safety-review` — if monetization implementation scope would require a new SOW addendum

### Client success operating rhythm (active delivery or retainer)

- `client-success-operating-protocol` — recurring cadence for any active client
- `knowledge-integrity-sweep` — quarterly; combine with monthly retainer health check for maximum efficiency

### Release and close-out (updated)

- `release-gate-review`
- `handoff-preparation`
- `knowledge-integrity-sweep` — for any public-facing deliverable before external release; verifies claims before client or public exposure

### Mathematical analysis and formula governance

- `quantitative-review`
- `system-maintenance` when build has computational dependencies
- `pricing-safety-review` when financial math feeds a commercial artifact
- `legal-compliance` when statistical modeling touches regulatory surfaces

### Prompt, tool, and governance control

- `documentation-reconstruction` when a governed prompt, protocol, or control artifact is weak or fragmented
- `repository-triage` when the skill, prompt, or control layer is inconsistent with the approved registry
- `release-gate-review` when a governed technical output is being assessed for advancement
- `strategic-review` when cross-functional agent outputs conflict or require reconciliation before advancement
- `system-maintenance` when tooling or dependency drift threatens governance artifact integrity

## Build Order For Future Skills

Only add more skills when one of these recurring gaps becomes operationally active:

1. proposal assembly
2. legal template preparation after counsel-approved forms exist
3. recurring QA pass documentation
4. post-project review and archive analysis
5. approved technical-role skill packs for the post-expansion engineering bench once role charters are complete [COMPLETED — 2026-04-15]
6. strategic-review, visual-direction, legal-compliance, and system-maintenance skills to fill critical system gaps [COMPLETED — 2026-04-18]
   - `03_agent-skills/strategic-review/SKILL.md`
   - `03_agent-skills/visual-direction/SKILL.md`
   - `03_agent-skills/legal-compliance/SKILL.md`
   - `03_agent-skills/system-maintenance/SKILL.md`
7. quantitative-review and QMA (Solomon) specialist agent for mathematical analysis and formula governance [COMPLETED — 2026-04-18]
   - `03_agent-skills/quantitative-review/SKILL.md`
   - `03_agent-skills/department-skill-pack/specialist-pool/qma-quantitative-mathematics-agent/SKILL.md`
   - `.claude/skills/quantitative_analysis.md`
8. vecs-public-route workflow skill and reviewer_vecs agent for governed public commercial route modernization [COMPLETED — 2026-04-19]
   - `03_agent-skills/vecs-public-route/SKILL.md`
   - `.claude/agents/reviewer_vecs.md`
9. six standard capabilities formalized as governed skills and policies [COMPLETED — 2026-04-19]
   - `03_agent-skills/website-monetization-fit-review/SKILL.md`
   - `03_agent-skills/chatbot-scope-safety-design/SKILL.md`
   - `03_agent-skills/knowledge-integrity-sweep/SKILL.md`
   - `03_agent-skills/client-success-operating-protocol/SKILL.md`
   - `01_system/operations/routine-usage-policy.md`
   - `01_system/ai-governance/mcp-architecture-direction-2026-04-19.md`
   - Branded error-state enforcement added to `release-gate-review/SKILL.md` and `CLAUDE.md` skill sections
10. company-baseline and proprietary-surface reconciliation workflow skills [COMPLETED — 2026-04-19]
   - `03_agent-skills/business-baseline-reconciliation/SKILL.md`
   - `03_agent-skills/public-proof-inventory-builder/SKILL.md`
   - `03_agent-skills/proprietary-surface-governance-reconciliation/SKILL.md`
   - `01_system/ai-governance/company-baseline-gap-closure-protocol-2026-04-19.md`
   - `01_system/operations/company-baseline-register.md`
   - `01_system/commercial/public-proof-inventory.md`
   - `01_system/commercial/routine-usage-pricing-decision-brief-2026-04-19.md`
11. Business Analysis service line and Kimi dedicated skills — Deep Summit 2026-04-24 [COMPLETED — 2026-04-24]
   - `03_agent-skills/business-analysis-evaluation/SKILL.md` — 17-section FACT-STRICT framework; BAO/FMA/MCA/RSA cell
   - `03_agent-skills/business-analysis-evaluation/agents/openai.yaml` — agent definitions for all 4 Business Analysis agents
   - `03_agent-skills/kimi/kimi-content-drafting.md` — self-contained CEA content drafting skill for Kimi
   - `03_agent-skills/kimi/kimi-document-synthesis.md` — self-contained DESA document synthesis skill for Kimi
   - `03_agent-skills/kimi/kimi-code-assist.md` — self-contained SEA code assist skill for Kimi
   - Registry: 4 new agents added (BAO, FMA, MCA, RSA); count 60 → 64
   - `01_system/ai-governance/technology-watch-protocol.md` — monthly TSA + TACA tech currency sweep
   - `01_system/ai-governance/mandatory-routing-signoff-protocol.md` — explicit routing and signoff chain for all artifact classes
   - `01_system/registry/agent-charters/` — charter template + 10 priority agent charters (MOA, QAS, HHC, CSM, ARE, SEA, PMA, LCA, QADM, PCA)
   - `01_system/operations/client-expectations-policy.md` — 6-item client expectations policy resolving all identified ambiguities
   - Split-Review Rule added to `ai-native-operating-architecture.md` Review Model section
   - Pricing display rule ($+ for T4/T5) and Chatbot Add-On SKU added to `CLAUDE.md` web_build skill

## Skill Registry Addition (2026-04-24)

| Skill | Load When | Required Inputs | Expected Outputs | Workflow Supported |
| --- | --- | --- | --- | --- |
| `business-analysis-evaluation` | Client submits a business idea for structured evaluation; Business Analysis Sprint engagement authorized by Founder | Client brief, budget/capital context, Founder authorization | 4-section FACT-STRICT report (Verified Facts / Analysis / Unknowns / Conclusion) covering all 17 analysis dimensions | Business Analysis service line |

## Kimi Skills (Platform-Specific — Not Claude Code Workflow Skills)

Kimi skills are loaded manually by the Founder at the start of a Kimi session. They live in `03_agent-skills/kimi/` and use a two-layer loading model.

### Layer 1 — Master Brief (Load Every Session)

**Always paste first:** `kimi/kimi-master-brief.md`

This brief activates the full 64-agent bench with all governance rules, the supervisor layer, all agent codes and scopes, escalation conditions, and the high-risk artifact routing table. Kimi cannot properly route tasks or activate the correct agents without this brief active.

### Layer 2 — Task Skill Overlays (Load Per Task)

After the master brief is confirmed, paste the appropriate task skill for the work at hand.

| Skill File | Paste When | Default Agent | Full Bench Available |
| --- | --- | --- | --- |
| `kimi/kimi-content-drafting.md` | Writing content, proposals, briefs, client communications, copy | CEA (Kalila) | Yes — any of 64 agents |
| `kimi/kimi-document-synthesis.md` | Synthesizing or extracting from large source documents | DESA (Niko) | Yes — any of 64 agents |
| `kimi/kimi-code-assist.md` | Writing, debugging, reviewing code | SEA (Malik) | Yes — any of 64 agents |
| `kimi/kimi-revenue-and-sales.md` | Outreach copy, prospect research, proposal drafts, discovery call prep, CRM log drafts | SDA (Marlon) for prospecting; PEA (Giselle) for proposals | Yes — any of 64 agents |
| `kimi/kimi-finance-and-bookkeeping.md` | Invoice drafts, AR tracking, cash flow analysis, financial reporting | IGA (Shanice) for billing; FRA (Winston) for reporting | Yes — any of 64 agents |
| `kimi/kimi-client-success.md` | Status reports, health scoring, client communications, onboarding, retainer tracking | CSM (Josette) for oversight; PSA (Donovan) for status | Yes — any of 64 agents |
| `kimi/kimi-quality-and-compliance.md` | QA documentation, drift detection, IP/license review, legal compliance flagging, config audit | QAS (Imani) for QA; QADM (Fabian) for drift | Yes — any of 64 agents |
| `kimi/kimi-strategic-intelligence.md` | Tech watch, market opportunity research, strategic synthesis, document synthesis, client health intelligence | SRA (Janice) for synthesis; TSA (Kareem) for tech watch | Yes — any of 64 agents |
| `kimi/kimi-visual-direction-and-design.md` | Visual direction briefs, design specifications, brand consistency, accessibility review, deployment readiness | VDA (Jeanine) for direction; DAA (Anika) for specs | Yes — any of 64 agents |

Each task skill can also be pasted standalone (without the master brief) for quick single-task sessions — the task skills include a condensed roster for common agents in that domain. For full bench access, load the master brief first.

### Session Startup Sequence

1. Open new Kimi session
2. Paste `kimi-master-brief.md` → wait for confirmation
3. Paste the task skill file for this session's work
4. State session objective, active agents, and known constraints
5. Proceed

All Kimi output is governed draft material. High-risk artifact classes (commercial, legal-adjacent, release, bilingual final) must route to Claude Code for applicable reviewer passes before finalization.

## Acceptance Criteria

The skill system is working when:

- every recurring workflow maps to an explicit skill or skill bundle
- agents can load a skill without guessing the workflow scope
- required inputs and expected outputs are clear
- the skill layer reduces prompt drift instead of increasing it
