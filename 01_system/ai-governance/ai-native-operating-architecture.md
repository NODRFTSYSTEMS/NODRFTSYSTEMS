# AI-Native Operating Architecture

## Objective

Define the realistic AI operating model for NoDrftSystems so the approved agent bench, the repository skill system, and the human control gates work together without drift, false autonomy, or review theater.

## Verified Facts

- The approved working registry currently contains `64` official agents.
- The approved registry explicitly states the architecture is not capped at `40`.
- The approved structure includes `4` supervisor-layer agents, `51` departmental operational and governance agents across `9` departments, and `9` specialist-pool agents.
- The repository now contains a dedicated skill layer in `03_agent-skills/`.
- Tier 1 supervisor agents and ARE are now deployed in `.claude/agents/` and are part of the live operating stack.
- VECS is approved in canonical governance as a permanent public-route architectural overlay that currently executes through the existing bench rather than a separate staffing expansion.
- Pricing, legal, release, and other trust-critical artifacts already require stronger review discipline than ordinary internal drafts.
- The current business model is a lean operator model, not a large human team with constant synchronous coordination.

## Analysis

- The repository needed alignment because prior AI guidance still described a `40`-agent framing that no longer matches the approved registry.
- The right operating model is not "activate every approved agent" and it is not "let one orchestrator improvise everything."
- The correct model is a governed bench:
  - a larger approved registry
  - a smaller activated working cell
  - workflow-bound skills
  - mandatory review and human approval on high-risk outputs

## Canonical Position

### 1. Registry and skills serve different purposes

- The approved agent registry is the staffing and ownership layer.
- The skill system is the execution-pattern layer.

Do not use the skill system to invent new staffing truth. Do not use the staffing registry as a substitute for workflow instructions.

### 2. Smallest viable cell is the default

The system should activate the smallest set of approved roles that can complete a task safely. Bench size exists for coverage and scale, not for mandatory participation on every deliverable.

### 3. Human approval remains mandatory at defined gates

No AI-only path should finalize:

- pricing commitments
- contracts or legal-adjacent language
- public trust claims
- release readiness for production work
- high-risk compliance decisions

## Operating Layers

### Supervisor Layer

Always-on control roles:

- `MOA`: orchestration and activation discipline
- `QAS`: quality gate enforcement
- `CSM`: context and state continuity
- `HHC`: human handoff coordination

These roles govern workflow state. They do not eliminate the need for domain review.

### Department Layer

The approved departments remain the activation pool:

- Revenue and Sales
- Marketing and Content
- Delivery and Build
- Quality and Compliance
- Client Success
- Finance and Bookkeeping
- Strategic Intelligence
- People, Roles and Governance

Permanent architectural overlay:

- `VECS` for homepage, packages, case-study, and service-page systems; execution routes through `VDA`, `DAA`, `FIS`, `BCA`, `STAA`, `AAA`, `PLA`, `BPA`, `QDA`, and `QAS`; governed by `03_agent-skills/vecs-public-route/SKILL.md` and reviewed by `.claude/agents/reviewer_vecs.md`

### Specialist Pool

Use on-demand specialists only when their specialist risk actually exists:

- contract drafting support
- transcreation
- presentations
- data extraction and structuring

## Recommended Workflow Cells

These are activation patterns built from the approved registry. They are not a new org chart.

### Intake and Qualification Cell

Recommended members:

- `COA`
- `CRMA`
- `DCPA`
- `PRGA`
- `CHSA` when historical client-health context exists

Use for:

- intake review
- lead qualification
- decision-authority checks
- routing into decline, discovery, or proposal

Mandatory controls:

- `QAS` when qualification affects release-risk or compliance-sensitive work
- founder review for regulated work, major ambiguity, or high-friction decision chains

### Discovery and Strategy Cell

Recommended members:

- `PMA`
- `PEA`
- `TSA` or `MOA-G` when market or positioning context matters
- `SRA` when QAS or multi-agent outputs require synthesis before strategic commitment
- `BCA` or `PLA` when messaging direction shapes the scope
- `LCA` when discovery surfaces data practices, terms, or regulatory scope

Use for:

- discovery synthesis
- scope boundary definition
- strategy brief creation
- package-path recommendation

Mandatory controls:

- commercial check before pricing-dependent strategy commitments
- founder review when the engagement repositions the offer or creates market-facing claims

### Company Baseline and Gap-Closure Cell

Recommended members:

- `PMA`
- `SRA`
- `RCA`
- `QDA` when public proof or public-facing source integrity is involved
- `IGA` when finance or billing baselines are involved
- `LCA` when legal entity or legal-adjacent language is involved
- `QAS`

Use for:

- business-plan unknown closure
- company baseline register maintenance
- public proof inventory control
- routine-usage pricing decision control
- proprietary surface governance reconciliation

Mandatory controls:

- `business-baseline-reconciliation`
- `public-proof-inventory-builder` when any market-facing proof is proposed
- `proprietary-surface-governance-reconciliation` when an active proprietary surface lacks a clean paired workspace or control record
- founder review for legal entity specifics, live financial baselines, live revenue or pipeline baselines, public proof approval, routine-usage pricing figures, or activation status of a proprietary public-commercial route
- qualified legal review where external legal-adjacent language or entity statements are involved

### Public Route Experience Cell (VECS Overlay)

Recommended members:

- `PMA`
- `VDA`
- `DAA`
- `FIS` when route changes are executable
- `BCA` when posture or pattern selection affects trust
- `STAA` when restructuring can affect semantics, crawlability, or internal linking
- `AAA`
- `PLA`
- `BPA` when bilingual parity exists
- `QDA`
- `QAS`

Use for:

- homepage systems
- packages and pricing-decision routes
- case-study proof routes
- service pages
- shared public-route upgrades affecting trust, proof, interaction, or readability

Mandatory controls:

- `visual-direction` workflow skill before implementation — must produce a direction brief before any design or frontend work begins
- `vecs-public-route` workflow skill — governs the full cell activation, build phases, proof inventory confirmation, and reviewer routing
- `reviewer_vecs` — route-level review: authority flow, anti-generic compliance, proof posture, CTA architecture, interaction governance, visual density (mandatory before Gate 5)
- `reviewer_public_proof` when metrics, testimonials, logos, before/after evidence, or other proof surfaces change
- `reviewer_accessibility` + `AAA` when motion, readability, or reduced-motion handling changes
- `reviewer_plain_language` + `PLA` when route copy, CTA framing, or dense explanatory sections change materially
- founder review when package presentation, case-study proof posture, or homepage/service-page authority structure changes market-facing behavior materially
- no fabricated proof artifacts of any kind
- no motion-dependent comprehension
- no release without `QAS` sign-off

### Build Cell

Recommended members:

- `PMA`
- `SEA`
- `DAA`
- `VDA` when visual assets or UI surfaces are in scope
- `AAA`
- `SCA`
- `DRA`
- `SMA` for pre-build system health and component currency verification

Use for:

- implementation
- QA preparation
- accessibility review
- security-sensitive checks
- deployment readiness

Mandatory controls:

- `QDA` before any client-ready release candidate
- `QAS` at every project stage and phase — formal sign-off required before advancement
- `SMA` + `system-maintenance` workflow skill before every build or deployment start — verify component currency, run `npm audit`, confirm no high/critical CVEs, generate SBOM
- `visual-direction` workflow skill before any build introducing new UI surfaces, branding, or visual assets — must produce a direction brief before DAA or FIS begin implementation
- `legal-compliance` workflow skill before any build touching privacy, consent forms, data collection, or regulatory surfaces
- human ARE review before production release when the work affects real systems or client access

### Release and Handoff Cell

Recommended members:

- `QDA`
- `DRA`
- `HHC`
- `CCA`
- `PSA`
- `COA` when onboarding or support terms are in scope
- `LCA` when release includes updated terms, privacy disclosures, or regulatory-facing materials

Use for:

- final QA closure
- release decision packet
- access transfer
- client communication
- support-window capture

Mandatory controls:

- `disclosure_gate` skill — run full 13-item sweep before any GitHub commit, repository transfer, or handoff package assembly; log result to `06_handoff/`
- `handover_protocol` rule — 6-gate sequence must complete in order before any file is transferred to client
- documented known-issues note
- acceptance evidence
- human approval where commercial or production implications exist

## Review Model

Every meaningful artifact should move through distinct questions, not duplicated "looks good" checks.

### Standard review chain

1. Owner creates
2. Peer or adjacent functional verifier checks completeness
3. Independent control checks risk specific to the artifact
4. Supervisor gate decides readiness for next phase
5. Human approval runs where policy requires it

### Distinct control questions

- route experience control: Does the public route establish authority, readable density, proof integrity, CTA clarity, and reduced-motion-safe interaction without generic patterns? -> `VDA` + `DAA` + `reviewer_public_proof` + `reviewer_accessibility`
- company baseline control: Are company facts tied to named source artifacts, proof approvals, and recorded Founder decisions rather than assumption or archive drift? -> `PMA` + `SRA` + `QAS`

- commercial control: Is the package fit and scope logic sound? → `reviewer_pricing_safety` + PEA (Giselle)
- finance control: Do payment terms and invoice logic match the offer? → IGA (Shanice) + FRA (Winston)
- quality control: Is the artifact complete, consistent, and release-safe? → `reviewer_package_integrity` + QDA (Patrice) + QAS (Imani)
- content control: Is copy accurate, brand-aligned, and free of fabricated claims? → `reviewer_plain_language` + `reviewer_public_proof`
- bilingual parity control: Do EN and ES versions have semantic and CTA parity? → `reviewer_localization` + TCA (Xiomara)
- accessibility control: Does the web surface meet WCAG 2.1 AA? → `reviewer_accessibility` + AAA (Rochelle)
- security and compliance control: Does the work create exposure that changes approval depth? → `reviewer_public_proof` + SCA (Omari) + LCA (Dorothy)
- handoff control: Can someone else operate the outcome without hidden knowledge? → `disclosure_gate` skill + IPGA (Camille) + HHC (Desmond)

### Split-Review Rule for T2+ Client Deliverables and Public Commercial Routes

Sequential review anchors — each reviewer is influenced by the conclusions of the prior reviewer. Split review removes that anchor.

**Rule:** For all T2+ client-facing deliverables and all public commercial routes, visual and content reviewers receive the artifact simultaneously, not sequentially. Each submits an independent assessment before reading the other's findings.

**Execution protocol:**
1. Visual reviewer (VDA/DAA) and content reviewer (PLA/BPA) receive the artifact at the same time
2. Each produces an independent assessment with no access to the other's findings
3. QAS (Imani) receives both assessments simultaneously and synthesizes — resolving conflicts, not averaging them
4. Legal (LCA) runs after content is stable. LCA cannot see prior reviewer conclusions until LCA's own review is submitted
5. QAS issues the consolidated verdict after all independent reviews are complete

**Conflicts:** When visual and content reviewers disagree, QAS synthesizes based on client outcome, not internal preference. Unresolvable conflicts escalate to ARE.

**Applies to:** All client-facing T2+ deliverables. All public commercial routes (homepage, packages page, case-study routes, service pages). Any artifact where VDA, DAA, PLA, BPA, and LCA are all in the review chain.

**Does not apply to:** Internal documentation, T0/T1 deliverables with single-reviewer scope, or any artifact where only one reviewer type is in scope.

## High-Risk Artifact Rules

### Commercial artifacts

Examples:

- proposals
- SOWs
- invoices
- retainers
- pricing pages

Required controls:

- commercial builder
- finance review
- pricing safety review
- founder approval when required by policy

### Legal-adjacent artifacts

Examples:

- contract drafts
- NDAs
- material legal clauses

Required controls:

- specialist support if used
- founder review
- qualified legal counsel where external use or liability is involved

### Release artifacts

Examples:

- production deployment decisions
- final delivery packages
- access-transfer packages

Required controls:

- QA and documentation check
- deployment readiness check
- supervisor release gate
- human approval where applicable

### Company-control artifacts

Examples:

- business plans
- company baseline registers
- public proof inventories
- routine-usage pricing decision briefs
- proprietary product surface reconciliation records

Required controls:

- baseline reconciliation review
- proof review where public claims are involved
- supervisor gate before downstream strategy or public reuse
- founder approval for any company fact that becomes operative externally or strategically

## Skill Translation

Skills should map to workflow phases rather than broad personas.

### Workflow Skills (`03_agent-skills/`) — Load per phase

| Skill | When to Load |
|-------|-------------|
| `repository-triage` | classify structure before changing it |
| `documentation-reconstruction` | rebuild weak or fragmented operating docs |
| `profitability-review` | detect margin leakage and overhead |
| `client-intake-analysis` | score and route external client opportunities |
| `pricing-safety-review` | enforce commercial consistency on any artifact with a price |
| `client-workspace-bootstrap` | instantiate accepted work into the standard workspace |
| `strategy-brief-builder` | convert discovery into execution-ready strategy |
| `release-gate-review` | enforce pre-release control before any deployment |
| `handoff-preparation` | package transfer and archive materials for close-out |
| `business-baseline-reconciliation` | reconcile company-level unknowns, unverified facts, and strategic source drift into controlled baseline records |
| `public-proof-inventory-builder` | create or maintain the approval ledger for public proof claims and evidence |
| `proprietary-surface-governance-reconciliation` | pair active proprietary product surfaces with clean workspace, control-plane, and registry records |
| `strategic-review` | synthesize QAS/supervisor outputs into a decision brief |
| `visual-direction` | set visual strategy before any design or UI implementation, especially homepage, packages, case-study, and service-page modernization |
| `legal-compliance` | review any privacy, contract, or regulatory surface |
| `system-maintenance` | pre-build health check — components, CVEs, SBOM |

### Invokable Session Skills (`.claude/skills/`) — Load via `/skill-name`

These are behavioral instruction sets invoked directly in a Claude Code session. They are distinct from workflow skills — they govern session execution rather than activating agent cells.

| Skill | Trigger |
|-------|---------|
| `/client_intake` | New external client inquiry received |
| `/idea_development` | Early-stage or ambiguous engagement — Discovery Sprint |
| `/scope_brief` | Discovery complete; produce execution-ready brief |
| `/web_build` | Web build task with signed SOW |
| `/hosting_maintenance` | Ongoing maintenance retainer activated |
| `/business_formation` | Client requests formation or NAICS guidance |
| `/content_production` | Content deliverable with approved brief |
| `/qa_multipass` | Any task declared complete; run QA passes |
| `/disclosure_gate` | Before any GitHub commit, repository transfer, or handoff |
| `/completion_report` | End of any bounded task |
| `/decision_log` | Any Founder/ARE decision or governance exception |

### Rule

Load the minimum set of skills that matches the workflow phase. Do not create blended prompts that collapse intake, pricing, build, release, and handoff into one instruction block.

## Model-Class Guidance

Assign model classes by task type, not personal preference:

- high-judgment models: strategy, scope, pricing, critique, release decisions
- production execution models: drafting, code, documentation, structured transformation
- low-cost triage models: formatting checks, simple classification, early screening

For high-risk artifacts, at least one critical review should come from a different model family or provider than the primary creator when that is operationally available.

## Agent Capacity Policy

The architecture is not capped at any fixed number.

- The current official bench is `64` agents.
- `VECS` currently operates through the approved existing bench and does not yet create a separate staffing count in the live registry.
- Additional agents may be added when precision, governance coverage, or operational control requires it.
- Each new agent requires: a workflow justification that cannot be covered by an existing agent, a proposed bounded scope that does not conflict with an existing agent's scope, an assigned human owner, and Founder or ARE approval before activation.
- The approval record must be added to `01_system/registry/final-approved-department-and-agent-registry.md` before the agent operates.
- Bench expansion is not the default response to new work. The default is routing the work to an existing agent with an appropriate skill loaded.

## Dual-Agent Independent Verification Protocol

Every meaningful artifact requires at minimum two agents from distinct bounded scopes to verify before it advances. The producing agent cannot be one of the verifying agents.

### Verification classes

**Standard verification** — applies to all non-trivial internal deliverables:
- Agent A produces the artifact
- Agent B (different bounded scope) verifies completeness and scope compliance
- If B finds issues, A revises and B re-verifies before advancement

**High-risk verification** — applies to commercial, legal-adjacent, compliance-sensitive, and release-critical artifacts:
- Agent A produces
- Agent B verifies content and scope compliance
- Agent C (independent control function — QAS, IPGA, or SCA as appropriate) verifies risk-specific concerns
- Human approves before client-facing use or production release

### Verification rules

- A verifier must challenge the artifact against defined criteria, not simply re-read it
- Agreement without documented rationale is not verification
- If both agents agree but a human review gate applies, human approval is still required
- A supervisor agent (MOA, QAS) classifies which verification class applies

### Routing to human after verification

Use HHC (Desmond) to route to the correct human authority. All routing decisions must be logged in the Decision Log (`decision_log` skill).

| Artifact / Decision Type | Routing Target | Delegation Threshold | Non-Delegable Condition |
|--------------------------|---------------|---------------------|------------------------|
| Commercial proposals, pricing | Growth Lead → Founder | Founder required >$15K | Any pricing exception |
| SOW and change orders | PEA (Giselle) → Founder | Founder required >$15K | Scope outside approved tiers |
| Invoice and payment terms | IGA (Shanice) → Growth Lead | Founder required if terms deviate | — |
| MSA, NDA, contract language | Founder + qualified legal counsel | Cannot be delegated | All external legal documents |
| Business formation templates | Founder review → legal counsel | Cannot be delegated | All formation outputs |
| Production release (real systems) | ARE → Founder | ARE approves Class 1–2; Founder required Class 3–4 | Client data, billing |
| Delivery package and access transfer | ARE + Founder | — | All client-facing transfers |
| Strategic scope changes | Founder | — | Market-facing behavior |
| Agent architecture changes | Founder + ARE | — | All registry additions |
| Pricing exceptions, discounts | Founder | Cannot be delegated | — |
| Disclosure gate failures | Founder | Cannot be delegated | — |

## Originality and Distinctiveness Standard

Generic output is a defect. Outputs that describe a category instead of this specific client, this specific offer, or this specific situation are not acceptable.

### Mandatory specificity requirements

Every client-facing artifact must be specific to:
- the client's actual business niche, not a generic sector label
- the client's stated objectives and evidence, not template filler
- NoDrftSystems' actual service scope and pricing, not generic agency claims
- the project's real constraints, risks, and dependencies

### Anti-generic checks

Before an agent advances a draft:
- Replace any phrase that could describe any company in this category with a phrase that could only describe this client
- Verify that every claim has a source, evidence, or constraint that created it
- Verify that the recommended package or path is grounded in the intake data, not a default assumption
- Verify that pricing references match approved governance, not rounded or estimated figures

### Escalation trigger

If an agent cannot make an output specific because required client information is missing, the agent must flag the gap and route to the appropriate human owner for input. The agent must not fill the gap with generic content.

## Multi-Platform Execution Model

NoDrftSystems operates across multiple AI platforms. Platform selection is a risk and efficiency decision, not a preference.

### Platform assignment logic

- **High-judgment, reasoning-intensive tasks** (strategy, scope definition, pricing review, critique, escalation classification): use the highest-capability available model on Claude or equivalent
- **Production execution tasks** (drafting, documentation, structured transformation, code): use production-tier models — Claude Sonnet, ChatGPT-4o, or equivalent
- **Triage and classification tasks** (formatting checks, early screening, field extraction): use efficient models — Claude Haiku, GPT-3.5, or equivalent
- **Cross-verification of high-risk artifacts**: use a different model family or provider from the primary creator when operationally feasible

### Consistency rule

If an artifact was created on Platform A, it may be verified on Platform A or Platform B. The verifier must apply the same criteria regardless of platform. Platform switching is not a shortcut around verification requirements.

### Prohibited uses

- Do not use consumer-grade models for artifacts that will be sent to clients, published, or submitted to legal review
- Do not use a single platform because it is convenient; document the selection when deviation from the standard assignment applies

## Anti-Drift Controls

Drift is when outputs, prompts, or workflows deviate from approved standards without detection or correction. Drift control is a standing governance responsibility.

### Types of drift

- **Prompt drift**: a prompt or role configuration deviates from its approved version without a change record
- **Scope drift**: an agent begins performing tasks outside its bounded scope definition
- **Standard drift**: outputs begin using language, claims, or pricing not sanctioned by canonical governance
- **Verification drift**: verification steps are abbreviated or skipped without documented authority

### Detection responsibilities

- `PCA` (Trevon) monitors prompt and configuration versions
- `QADM` (Fabian) monitors output variance against accepted baselines
- `QAS` (Imani) enforces verification-chain compliance
- `TACA` (Khadija) monitors tool and access compliance

### Session-level behavioral enforcement

`.claude/rules/` provides three always-active behavioral constraints that enforce drift controls at the session level before any agent or skill executes:

- `plan_mode.md` — enforces the 7-phase Plan Before Execute sequence; requires startup declaration before any substantial task
- `github_disclosure_gate.md` — pre-commit checklist fires before any `git add/commit/push`; blocks proprietary asset exposure
- `handover_protocol.md` — 6-gate close-out sequence; blocks transfer without QA sign-off, legal review, disclosure sweep, and Founder approval

These rules are the session-level tripwires. Agent-level drift detection (PCA, QADM, TACA, QAS) operates at the workflow level. Both layers must be active.

### Remediation

- Any agent detecting drift must flag it immediately and halt advancement of the drifting artifact
- Drift is routed through HHC to the appropriate human owner
- Prompt drift and scope drift require ARE sign-off before the affected agent resumes
- Systematic or repeated drift requires a documented root-cause note from the human owner before the system resumes normal operation

## Acceptance Criteria

The AI operating architecture is working when:

- the `64`-agent approved registry remains the staffing truth
- workflow cells activate only the roles actually required
- skills are used to standardize recurring workflows
- no artifact self-certifies its own readiness
- pricing, legal-adjacent, and release-critical outputs remain human-governed
- the activated cell stays small enough to preserve margin and coordination clarity
- every meaningful artifact has been independently verified before advancement
- public commercial route work loads `vecs-public-route` and activates `reviewer_vecs` when trust, proof, interaction, or readability systems are materially changing
- company-level unknowns route into controlled baseline artifacts instead of being normalized as unstated assumptions
- generic or category-level outputs are flagged before client-facing use
- drift in prompts, scope, or standards is detected and routed to human correction
- platform selection follows the assignment logic, not convenience
