# AI-Native Operating Architecture

## Objective

Define the realistic AI operating model for NoDrftSystems so the approved agent bench, the repository skill system, and the human control gates work together without drift, false autonomy, or review theater.

## Verified Facts

- The approved working registry currently contains `45` official agents.
- The approved registry explicitly states the architecture is not capped at `40`.
- The approved structure includes `4` supervisor-layer agents, `37` departmental operational and governance agents across `8` departments, and `4` specialist-pool agents.
- The repository now contains a dedicated skill layer in `03_agent-skills/`.
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
- `BCA` or `PLA` when messaging direction shapes the scope

Use for:

- discovery synthesis
- scope boundary definition
- strategy brief creation
- package-path recommendation

Mandatory controls:

- commercial check before pricing-dependent strategy commitments
- founder review when the engagement repositions the offer or creates market-facing claims

### Build Cell

Recommended members:

- `PMA`
- `SEA`
- `DAA`
- `AAA`
- `SCA`
- `DRA`

Use for:

- implementation
- QA preparation
- accessibility review
- security-sensitive checks
- deployment readiness

Mandatory controls:

- `QDA` before any client-ready release candidate
- `QAS` before release advancement
- human ARE review before production release when the work affects real systems or client access

### Release and Handoff Cell

Recommended members:

- `QDA`
- `DRA`
- `HHC`
- `CCA`
- `PSA`
- `COA` when onboarding or support terms are in scope

Use for:

- final QA closure
- release decision packet
- access transfer
- client communication
- support-window capture

Mandatory controls:

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

- commercial control: Is the package fit and scope logic sound?
- finance control: Do payment terms and invoice logic match the offer?
- quality control: Is the artifact complete, consistent, and release-safe?
- security and compliance control: Does the work create exposure that changes approval depth?
- handoff control: Can someone else operate the outcome without hidden knowledge?

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

## Skill Translation

Skills should map to workflow phases rather than broad personas.

Current repository-backed skill uses:

- `repository-triage`: classify structure before changing it
- `documentation-reconstruction`: rebuild weak operating docs
- `profitability-review`: detect margin leakage and overhead
- `client-intake-analysis`: score and route opportunities
- `pricing-safety-review`: enforce commercial consistency
- `client-workspace-bootstrap`: instantiate accepted work into the standard workspace
- `strategy-brief-builder`: convert discovery into execution-ready strategy
- `release-gate-review`: enforce pre-release control
- `handoff-preparation`: package transfer and archive materials

Rule:

Load the minimum set of skills that matches the workflow phase. Do not create giant blended prompts that collapse intake, pricing, build, release, and handoff into one instruction block.

## Model-Class Guidance

Assign model classes by task type, not personal preference:

- high-judgment models: strategy, scope, pricing, critique, release decisions
- production execution models: drafting, code, documentation, structured transformation
- low-cost triage models: formatting checks, simple classification, early screening

For high-risk artifacts, at least one critical review should come from a different model family or provider than the primary creator when that is operationally available.

## Acceptance Criteria

The AI operating architecture is working when:

- the `45`-agent approved registry remains the staffing truth
- workflow cells activate only the roles actually required
- skills are used to standardize recurring workflows
- no artifact self-certifies its own readiness
- pricing, legal-adjacent, and release-critical outputs remain human-governed
- the activated cell stays small enough to preserve margin and coordination clarity
