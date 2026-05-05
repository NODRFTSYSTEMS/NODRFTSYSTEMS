# Skill Loading Matrix

## Objective

Define which repository skills should load for which workflow so AI participation stays modular, reviewable, and tied to real operating needs.

## Loading Principles

- Load skills by workflow phase, not by generic persona.
- Use the minimum number of skills that fully covers the task.
- Do not combine unrelated phases such as intake, pricing, build, and handoff into one prompt when a bounded sequence is clearer.
- If a workflow has no matching skill, add one only when the workflow is genuinely recurring.

## Cross-Reference: SOP Library

This matrix defines which skills to load. The SOP library (`01_system/operations/sop-library.md`) defines the step-by-step procedure for each workflow. They are parallel governance artifacts — skills govern activation, SOPs govern execution sequence. Use them together.

| Workflow | Load Skill(s) From This Matrix | Follow SOP |
|----------|-------------------------------|-----------|
| New client inquiry and qualification | `client-intake-analysis` | SOP-001 |
| Discovery Sprint execution | `strategy-brief-builder` | SOP-002 |
| Scope brief and SOW production | `strategy-brief-builder`, `pricing-safety-review` | SOP-003 |
| Build activation and execution | `system-maintenance`, `visual-direction` (if visual), `legal-compliance` (if legal), `vecs-public-route` (if VECS) | SOP-004 |
| QA multi-pass and release gate | `release-gate-review`, `quantitative-review` (if math), `knowledge-integrity-sweep` | SOP-005 |
| Client handover and close-out | `release-gate-review`, `handoff-preparation` | SOP-006 |
| Ongoing maintenance retainer | `client-success-operating-protocol`, `system-maintenance` | SOP-007 |
| GitHub operations and disclosure gate | `release-gate-review` | SOP-008 |
| Content production | `knowledge-integrity-sweep` (before public release) | SOP-009 |
| Business formation assistance | `legal-compliance` | SOP-010 |
| Agent and skill activation | `system-maintenance` | SOP-011 |
| Proprietary product build | `client-workspace-bootstrap`, `system-maintenance`, `visual-direction`, `vecs-public-route` (if applicable) | SOP-012 |
| Business Analysis Sprint | `business-analysis-evaluation` | SOP-013 |

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

### Business Analysis Sprint

- `business-analysis-evaluation` — FACT-STRICT workflow skill; activates BAO/FMA/MCA/RSA cell for the 17-section evaluation framework
- `pricing-safety-review` — before any BA Sprint is proposed to a client; verify pricing matches `pricing-governance.md` tier table
- `legal-compliance` — if the evaluation surfaces regulatory or legal red flags (activate LCA; do not advance without LCA flag status)
- `quantitative-review` — for any section containing financial projections, unit economics, or modeling output (FMA sections 2.6–2.8, 2.16)

See also: SOP-013 (Business Analysis Sprint Execution) for the step-by-step 12-stage procedure from intake to client delivery.

Required reviewer agents before delivery:
- `reviewer_public_proof` — all market demand claims, competitor references, and cited statistics
- `reviewer_pricing_safety` — any pricing language in the evaluation output

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

## Multi-Provider Layer

NoDrftSystems operates across three AI providers. Each has a parallel governance layer. Claude Code is primary and fully governed via CLAUDE.md + MCP. Kimi and Claude web require paste-in briefs. ChatGPT is backup only.

| Provider | Role | Master Brief | Task Overlays | Notes |
|----------|------|-------------|---------------|-------|
| **Claude Code** | Primary | `CLAUDE.md` (auto-loads) | `.claude/skills/` + `03_agent-skills/` (auto-loads via skill system) | Full MCP governance. All high-risk artifact review happens here. |
| **Claude Web / API** | Secondary analytical | `03_agent-skills/claude-web/claude-web-master-brief.md` | `claude-web-[task].md` — 10 task overlays | Paste-in brief. Same rules as Claude Code. Drafts route back to Claude Code for final review. |
| **Kimi** | Secondary analytical | `03_agent-skills/kimi/kimi-master-brief.md` | `kimi-[task].md` — 10 task overlays | Paste-in brief. Drafts route back to Claude Code for final review. |
| **ChatGPT** | Backup / DALL-E | `03_agent-skills/chatgpt/chatgpt-master-brief.md` | None (master brief only) | Backup use. Single brief covers all tasks. Image generation via DALL-E. All output routes to Claude Code. |

**Rule:** Regardless of which provider produces a draft, the final review path is always Claude Code. No high-risk artifact (proposal, code, contract, BA Sprint report) is finalized in a non-Code session.

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
11. Business Analysis service line and Kimi dedicated skills — Deep Summit 2026-04-24 [COMPLETED — 2026-04-24]; kimi-business-analysis.md added 2026-05-02
   - `03_agent-skills/business-analysis-evaluation/SKILL.md` — 17-section FACT-STRICT framework; BAO/FMA/MCA/RSA cell
   - `03_agent-skills/business-analysis-evaluation/agents/openai.yaml` — agent definitions for all 4 Business Analysis agents
   - `03_agent-skills/kimi/kimi-content-drafting.md` — self-contained CEA content drafting skill for Kimi
   - `03_agent-skills/kimi/kimi-document-synthesis.md` — self-contained DESA document synthesis skill for Kimi
   - `03_agent-skills/kimi/kimi-code-assist.md` — self-contained SEA code assist skill for Kimi
   - `03_agent-skills/kimi/kimi-business-analysis.md` — FACT-STRICT BA Sprint skill for Kimi; includes RSA self-audit, 17-section framework summary, and mandatory Claude Code routing gate before delivery [ADDED 2026-05-02]
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

## Platform-Specific Skills (Kimi, Claude Web, ChatGPT)

These skills are loaded manually by pasting into the respective provider. They are not Claude Code workflow skills. They live in `03_agent-skills/[provider]/` and use a two-layer loading model (master brief + task overlay) for Kimi and Claude web. ChatGPT uses a single master brief only.

### Kimi — `03_agent-skills/kimi/`

| File | Purpose |
|------|---------|
| `kimi-master-brief.md` | Full operating brief — paste first every session |
| `kimi-revenue-and-sales.md` | Outreach, proposals, pipeline, discovery call prep |
| `kimi-content-drafting.md` | Content, copy, strategy briefs, client communications |
| `kimi-document-synthesis.md` | Extracting and structuring from source documents |
| `kimi-code-assist.md` | Writing, debugging, reviewing code |
| `kimi-finance-and-bookkeeping.md` | Invoices, AR, cash flow, financial reporting |
| `kimi-quality-and-compliance.md` | QA passes, compliance review, IP checks |
| `kimi-client-success.md` | Onboarding, client communication, retainer management |
| `kimi-strategic-intelligence.md` | Market research, competitive intelligence, strategic synthesis |
| `kimi-visual-direction-and-design.md` | Visual direction briefs, design specs, brand strategy |
| `kimi-business-analysis.md` | BA Sprint — 17-section FACT-STRICT evaluation (ADDED 2026-05-02) |

### Claude Web / API — `03_agent-skills/claude-web/`

| File | Purpose |
|------|---------|
| `claude-web-master-brief.md` | Full operating brief — paste first every session |
| `claude-web-revenue-and-sales.md` | Outreach, proposals, pipeline, discovery call prep |
| `claude-web-content-drafting.md` | Content, copy, strategy briefs, client communications |
| `claude-web-document-synthesis.md` | Extracting and structuring from source documents |
| `claude-web-code-assist.md` | Writing, debugging, reviewing code (draft only — TVA+SCA required) |
| `claude-web-finance-and-bookkeeping.md` | Invoices, AR, cash flow, financial reporting |
| `claude-web-quality-and-compliance.md` | QA pre-review, self-check passes, compliance flagging |
| `claude-web-client-success.md` | Onboarding, client communication, retainer management |
| `claude-web-strategic-intelligence.md` | Market research, competitive intelligence, strategic synthesis |
| `claude-web-visual-direction-and-design.md` | Visual direction briefs, design specs, brand strategy |
| `claude-web-business-analysis.md` | BA Sprint — 17-section FACT-STRICT evaluation |

### ChatGPT — `03_agent-skills/chatgpt/`

| File | Purpose |
|------|---------|
| `chatgpt-master-brief.md` | Compact operating brief — paste at session start. Covers all tasks. No task-specific overlays. |

ChatGPT is the backup LLM. Use for: primary-provider unavailability, DALL-E image generation, and backup drafting. Single master brief covers all task types. No task-specific overlays — use Claude web or Kimi for complex multi-step work.

### Session Startup Sequence (Kimi and Claude Web)

1. Open new session
2. Paste `[provider]-master-brief.md` → wait for confirmation
3. Paste the task skill file for this session's work
4. State session objective, active agents, and known constraints
5. Proceed

**All non-Code provider output is governed draft material.** High-risk artifact classes (commercial proposals, code for production, contracts, BA Sprint final reports) must route to Claude Code for applicable reviewer passes and Founder approval before finalization. This rule applies regardless of provider.

12. Claude web and ChatGPT provider governance layers [COMPLETED — 2026-05-02]
   - `03_agent-skills/claude-web/claude-web-master-brief.md` — full operating brief for Claude.ai web and API sessions
   - `03_agent-skills/claude-web/claude-web-business-analysis.md`
   - `03_agent-skills/claude-web/claude-web-revenue-and-sales.md`
   - `03_agent-skills/claude-web/claude-web-content-drafting.md`
   - `03_agent-skills/claude-web/claude-web-code-assist.md`
   - `03_agent-skills/claude-web/claude-web-finance-and-bookkeeping.md`
   - `03_agent-skills/claude-web/claude-web-quality-and-compliance.md`
   - `03_agent-skills/claude-web/claude-web-client-success.md`
   - `03_agent-skills/claude-web/claude-web-strategic-intelligence.md`
   - `03_agent-skills/claude-web/claude-web-visual-direction-and-design.md`
   - `03_agent-skills/claude-web/claude-web-document-synthesis.md`
   - `03_agent-skills/chatgpt/chatgpt-master-brief.md` — compact backup brief for ChatGPT sessions

## Acceptance Criteria

The skill system is working when:

- every recurring workflow maps to an explicit skill or skill bundle
- agents can load a skill without guessing the workflow scope
- required inputs and expected outputs are clear
- the skill layer reduces prompt drift instead of increasing it
- every active AI provider has at least a master brief governing operating rules and escalation paths
