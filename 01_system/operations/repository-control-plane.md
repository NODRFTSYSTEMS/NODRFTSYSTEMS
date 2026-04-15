# Repository Control Plane

## Objective

Define the current operating rules for this repository so it can function as a reusable, multi-client, AI-augmented delivery backbone instead of a document archive with partial structure.

## Verified Facts

- The repository is currently organized into four primary layers: `01_system`, `02_client-system`, `03_agent-skills`, and `90_source-documents`.
- `01_system` contains the current governance layer for pricing, tool stack, registry discipline, and AI operating rules.
- `02_client-system` contains the intake surface, intake operating rules, and the reusable client workspace template.
- `03_agent-skills` contains reusable workflow skills for repository triage, intake analysis, documentation reconstruction, pricing review, profitability review, and handoff preparation.
- `90_source-documents` preserves raw `docx`, `pdf`, and related exports by domain.
- The approved working agent registry currently normalizes `45` official agents and explicitly states the architecture is not capped at `40`.
- The existing repository audit dated `2026-04-13` documents the initial restructuring pass, but it predates the current control-plane layer and should now be treated as baseline history rather than the live operating map.
- The client workspace template contains stage folders and now includes a bootstrap kit with starter artifact definitions for repeatable use.

## Analysis

- The repository is no longer suffering from root-level chaos, but it is still at risk of execution drift if operators treat historical audits, raw exports, and live control documents as equivalent.
- The most important remaining weakness is not folder naming. It is insufficient operating depth between the canonical layer and the actual delivery workflow.
- A lean operator model benefits more from explicit control documents, reusable starter artifacts, and skill routing than from adding more folders or more tools.

## Canonical Position

### 1. Repository layers have distinct authority

- `01_system` is the control layer.
- `02_client-system` is the intake-to-delivery entry layer.
- `03_agent-skills` is the reusable workflow-execution layer.
- `90_source-documents` is the preserved source layer.

No file in `90_source-documents` outranks a canonical governance file in `01_system` unless a human decision explicitly promotes it.

### 2. Root discipline matters

The repository root should remain minimal:

- working layers
- the root `README.md`
- any unavoidable approval-source export that has not yet been relocated

Do not let the root become a mixed holding area for drafts, proposals, exports, screenshots, or ad hoc notes.

### 3. Audit is not control

An audit identifies problems. A control plane defines how the repository operates after the audit. The historical audit remains useful, but it must not be mistaken for the current rule set.

## Artifact Classes

### Canonical governance

Use for:

- operating rules
- pricing hierarchy
- tool-stack policy
- document status
- skill routing
- AI activation and review gates

Requirements:

- repository-native format
- explicit scope
- acceptance criteria or operating rules
- clear status in the document registry

### Active reference

Use for:

- normalized registries
- working templates
- operational starter kits
- skills that support recurring workflows

Requirements:

- bounded purpose
- no conflict with canonical governance
- easy reuse by humans and AI agents

### Governed live assets

Use for:

- intake surfaces
- proposal templates
- future client-facing forms
- other live artifacts that depend on canonical rules

Requirements:

- tied to a governing document
- reviewed when pricing, routing, or acceptance logic changes

### Raw source material

Use for:

- historical source recovery
- extraction of useful clauses
- reference when canonical material is incomplete

Restrictions:

- do not quote externally without checking canonical governance
- do not let raw exports become the de facto operating layer

## Operating Rules

### Change control

Before adding or restructuring files, determine:

- objective
- workflow served
- authority level
- downstream dependency
- reuse value
- whether the change reduces or increases operating overhead

### Naming discipline

Use names that reflect one of these functions:

- governance
- intake
- discovery
- strategy
- execution
- deliverables
- handoff
- archive
- skill
- registry

Avoid vague names such as `final`, `new`, `misc`, `latest`, or `working copy`.

### Canonical first

When a workflow depends on policy, create or update the governing file before expanding templates, prompts, or delivery assets that rely on it.

### Template before improvisation

If a workflow recurs across clients, the repository should contain a starter artifact or template rather than relying on memory or chat history.

### Skill before persona

For AI-assisted work, prefer workflow-bound skills with clear inputs and outputs over generic agent personas or one-off mega-prompts.

## Client Lifecycle Integration

The repository should support a single default lifecycle:

1. Lead intake
2. Qualification
3. Discovery
4. Strategy
5. Execution
6. Deliverables
7. Handoff
8. Archive

Each accepted engagement should instantiate into the same client workspace skeleton and produce the same minimum control artifacts:

- intake packet
- qualification decision
- discovery brief when required
- strategy brief
- execution plan
- delivery register
- handoff record
- archive note

## AI Workflow Integration

The repository uses two separate but connected AI layers:

### Agent registry

Purpose:

- approved department structure
- staffing coverage
- ownership and escalation mapping

Source of truth:

- `01_system/registry/final-approved-department-and-agent-registry.md`

### Skill system

Purpose:

- repeatable execution patterns
- prompt discipline by workflow
- bounded inputs and outputs

Source of truth:

- `03_agent-skills/skill-loading-matrix.md`
- `03_agent-skills/skill-pack-build-specification.md`

Rule:

The registry defines who can be activated. The skill-loading matrix defines when workflow skills should load. The skill-pack build specification defines how department and role skills must be generated.

## Current Structural Priorities

### Priority 1

Keep repository authority unambiguous:

- current operating map
- document status registry
- approved agent registry
- pricing governance

### Priority 2

Make intake and workspace setup reusable:

- intake operating system
- workspace bootstrap kit
- standardized starter artifacts

### Priority 3

Make AI participation bounded:

- skill-loading matrix
- skill-pack build specification
- workflow-specific skills
- review and release gates

## Acceptance Criteria

The repository control plane is working when:

- the current operating map is explicit
- historical audits are not mistaken for live governance
- every recurring workflow has a canonical rule or starter artifact
- raw exports remain preserved but subordinate
- AI execution is routed through skills instead of improvised prompting
- a new client can be instantiated into the template without inventing folder logic or control artifacts

## Recommended Next Build Order

1. Keep the control-plane, registry, pricing, and AI-governance files aligned whenever one changes.
2. Port the most-used legal and commercial templates into controlled repository-native formats.
3. Connect the intake surface to a single operations database when the database choice is approved.
4. Expand the skill library only when a workflow is genuinely recurring and not yet bounded.
