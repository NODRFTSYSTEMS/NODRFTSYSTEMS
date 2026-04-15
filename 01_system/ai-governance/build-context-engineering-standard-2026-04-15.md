# Build Context Engineering Standard

Status: proposed canonical governance  
Date: 2026-04-15  
Owners: Founder, ARE, PCA, KDGA, PRGA  
Confidentiality: proprietary internal framework; no external publishing approved  
Purpose: define the mandatory context-engineering system, prompt components, control surfaces, and completion discipline for governed technical builds

## 1. Verified Facts

- The current governance layer already requires prompt governance, tool governance, reviewer separation, evidence-backed review, and fail-safe build activation.
- The user has explicitly directed that the corrective action focus on context engineering with enforced controls, not vague calls for "better prompts."
- The user has identified the following required build components: a reusable master build prompt, page-level build prompts, role-specific review prompts, bilingual QA prompts, privacy and disclosure QA prompts, and a prompt library maintained under version control.
- The user has identified the following required control elements: a persistent root contract, scoped rules, specialist subagents, reusable execution skills, evidence-ledger discipline, mandatory Plan Mode, a mandatory verification loop, a mandatory structured completion report, and a fail-closed release gate.

## 2. Analysis

### Objective

Make build execution faster, more reliable, and more auditable by turning context engineering into a governed system rather than an improvised prompt-writing habit.

### Scope

This standard applies to:

- governed technical builds
- build prompts and review prompts
- build-role instructions
- execution skills used in build workflows
- completion and handoff reporting
- release-gate evidence for build work

### Required Elements

- persistent root contract
- scoped prompt layers
- reusable prompt library
- role-specific review prompts
- QA prompt variants for bilingual and privacy or disclosure-sensitive work
- mandatory planning and verification loops
- structured completion reporting
- fail-closed release gating

### Exclusions

- casual ad hoc prompting outside governed build work
- non-technical internal notes that do not affect build execution
- public-facing content generation workflows

### Core Rule

The prompt system for builds is not one oversized instruction block.

It is a controlled stack of reusable context layers with clear boundaries, version control, and role-specific application.

### Mandatory Build Prompt Architecture

Every governed build prompt stack must be composed from the following layers.

#### 1. Persistent Root Contract

The root contract is the highest-priority durable build instruction layer.

It must define:

- mission of the build system
- non-negotiable quality rules
- reviewer-separation rule
- confidentiality and non-publishing rule
- evidence requirements
- release-gate rule
- fail conditions and escalation triggers

The root contract must persist across build prompts and may not be silently dropped.

#### 2. Scoped Rules Layer

Scoped rules narrow the build context by:

- repository
- product or module
- page or route
- build class
- compliance or disclosure sensitivity
- language surface

Scoped rules must override only where explicitly allowed and may not weaken the root contract.

#### 3. Build Execution Layer

This layer contains the task-specific build packet:

- objective
- scope
- exclusions
- dependencies
- acceptance criteria
- required evidence
- affected surfaces

#### 4. Role Layer

This layer adapts the build context for the active role:

- builder
- verifier
- QA
- accessibility
- security
- governance

#### 5. Completion Layer

This layer defines the expected structured completion report and evidence ledger output.

### Mandatory Prompt Components

The governed prompt library must contain at minimum:

- reusable master build prompt
- page-level build prompts
- role-specific review prompts
- bilingual QA prompts
- privacy and disclosure QA prompts

### Component Definitions

#### Reusable Master Build Prompt

The master build prompt should be the default entry point for governed build execution.

It must reference:

- root contract
- scoped rules
- build packet
- execution and evidence rules
- escalation conditions

#### Page-Level Build Prompts

Page-level prompts are required when route, page, or interface-layer differences materially affect implementation quality, compliance, disclosures, or verification requirements.

#### Role-Specific Review Prompts

Each control role should have a bounded review prompt that asks distinct questions rather than repeating generic approval language.

Minimum review-prompt set:

- engineering build review
- accessibility review
- security review
- deployment readiness review
- QA evidence review

#### Bilingual QA Prompts

Bilingual QA prompts are required when the build has multilingual surfaces or parity-sensitive content.

They must check:

- semantic parity
- structural parity
- disclosure parity
- UI-fit parity where text length affects behavior

#### Privacy and Disclosure QA Prompts

These prompts are required when a build touches:

- data collection
- account flows
- consent surfaces
- legal or policy-linked language
- client or public trust signals

They must check:

- privacy language presence
- disclosure clarity
- misleading omission risk
- role-appropriate escalation requirement

### Version-Controlled Prompt Library

The prompt library must be maintained under version control.

Each prompt asset must include:

- prompt id
- purpose
- owner
- status
- model class
- allowed tools
- revision date
- rollback reference
- linked evaluation set

Prompt changes must be reviewable as structured assets, not hidden inside chat history.

### Specialist Subagents and Reusable Execution Skills

This standard recognizes two controlled acceleration surfaces:

- specialist subagents
- reusable execution skills

Rules:

- specialist subagents may be used only within approved bounded scopes
- reusable execution skills should carry repeatable build patterns that reduce prompt bloat
- neither may override the root contract
- both must preserve evidence and reviewer separation requirements

### Evidence-Ledger Discipline

Every governed build must maintain an evidence ledger.

Minimum ledger contents:

- build id or task id
- active roles
- prompt set used
- tools used
- key implementation decisions
- tests and traces
- unresolved issues
- reviewer findings
- release disposition

The evidence ledger is a control record, not optional project notes.

### Mandatory Plan Mode

Every governed build must begin in Plan Mode or its local equivalent planning phase.

Minimum planning output:

- problem framing
- affected surfaces
- selected build class
- selected active cell
- acceptance criteria
- verification plan
- release sensitivity

Implementation should not begin before this planning layer exists.

### Mandatory Verification Loop

Every governed build must execute a verification loop before release advancement.

Minimum loop:

1. build role completes work
2. verifier checks against acceptance criteria
3. control role checks risk-specific criteria
4. findings are resolved
5. evidence ledger is updated
6. release gate decides advancement

### Mandatory Structured Completion Report

Every governed build must end with a structured completion report.

Minimum sections:

- objective completed
- scope completed
- exclusions preserved
- files or surfaces changed
- tests and evidence
- open risks
- reviewer outcome
- release status
- recommended next actions

### Fail-Closed Release Gate

Release posture for governed builds is fail-closed.

That means:

- missing evidence blocks advancement
- missing review blocks advancement
- unresolved critical findings block advancement
- undocumented prompt or tool drift blocks advancement
- unclear completion status blocks advancement

The default answer is not "probably fine." The default answer is "do not advance until the gate is satisfied."

### Dependencies

- engineering standards policy
- mandatory build activation protocol
- merge-gate enforcement spec
- exceptional build escalation protocol
- version-controlled prompt library location

### Risks

- prompt libraries without strong scope boundaries will become cluttered and contradictory
- mandatory planning without strong templates will create ceremony instead of clarity
- evidence ledgers without disciplined upkeep will decay into fiction
- role-specific review prompts that ask the same question will create review theater

### Acceptance Criteria

This standard is working only when:

- every governed build uses a persistent root contract
- prompt assets are version-controlled
- Plan Mode is mandatory before execution
- verification loops are mandatory before advancement
- structured completion reports exist for governed builds
- release posture remains fail-closed

### Recommended Next Build Order

1. Approve this standard and the build prompt or control asset libraries into active use.
2. Instantiate repository-specific root contracts, scoped rules, and client governance profiles from the approved templates.
3. Populate the canonical prompt inventory and canonical tool inventory with live governed assets.
4. Assign named owners, rollback references, and evaluation sets to each live prompt instance.
5. Link the active prompt set and control set to the Mandatory Build Activation Protocol before governed execution begins.
6. Require the evidence ledger and structured completion report on the first governed repository rollout.
7. Audit the first three live governed builds against this standard and revise where evidence shows friction or drift.

## 3. Unknowns / Data Gaps

- The repository now contains the template libraries, but repository-specific live prompt instances and linked evaluation sets do not yet exist as separate governed artifacts.
- Canonical prompt and tool inventory templates now exist, but the live populated registries do not yet exist as separate governed artifacts.
- The exact Plan Mode implementation pattern depends on the execution environment used for each build.

## 4. Conclusion

The corrective action is not "try better prompts." The corrective action is a governed context-engineering system with reusable prompt components, scoped control layers, specialist execution surfaces, evidence discipline, mandatory planning, mandatory verification, structured completion, and fail-closed release behavior.
