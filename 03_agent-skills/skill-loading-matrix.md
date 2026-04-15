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
| `client-intake-analysis` | intake packet or discovery request needs routing | intake data, budget, timeline, stakeholders | verified facts, risk flags, route recommendation | lead qualification |
| `pricing-safety-review` | commercial artifact is being drafted or reviewed | operative pricing, artifact, scope summary, payment rules | blockers, corrections, pass/fail | commercial control |
| `client-workspace-bootstrap` | accepted work must be instantiated into the standard workspace | intake packet, client name, project slug, owner | initialized workspace plan, starter records, missing-info list | workspace setup |
| `strategy-brief-builder` | discovery outputs must become an execution-ready brief | discovery notes, intake, constraints, package path | strategy brief, scope boundaries, acceptance criteria | discovery-to-strategy transition |
| `release-gate-review` | work is approaching release or handoff | release candidate, QA status, approvals, known issues | release recommendation, blockers, readiness note | pre-release control |
| `handoff-preparation` | final delivery package or close-out is being assembled | final files, access list, QA status, support terms | handoff package, checklist, archive note | transfer and closure |

## Recommended Skill Bundles By Workflow

### Repository restructuring

- `repository-triage`
- `documentation-reconstruction`
- `profitability-review` when tool or workflow drag matters

### Lead intake and qualification

- `client-intake-analysis`
- `pricing-safety-review` only if the output is already moving toward proposal or package fit

### Accepted client setup

- `client-workspace-bootstrap`

### Discovery to executable plan

- `strategy-brief-builder`
- `pricing-safety-review` when scope changes affect the offer

### Release and close-out

- `release-gate-review`
- `handoff-preparation`

### Governed technical build activation

- `release-gate-review` when the work is approaching reviewer or release gates
- use the build prompt library and build control asset library as mandatory companions to the active role skills

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

### Prompt, tool, and governance control

- `documentation-reconstruction` when a governed prompt, protocol, or control artifact is weak or fragmented
- `repository-triage` when the skill, prompt, or control layer is inconsistent with the approved registry
- `release-gate-review` when a governed technical output is being assessed for advancement

## Build Order For Future Skills

Only add more skills when one of these recurring gaps becomes operationally active:

1. proposal assembly
2. legal template preparation after counsel-approved forms exist
3. recurring QA pass documentation
4. post-project review and archive analysis
5. approved technical-role skill packs for the post-expansion engineering bench once role charters are complete

## Acceptance Criteria

The skill system is working when:

- every recurring workflow maps to an explicit skill or skill bundle
- agents can load a skill without guessing the workflow scope
- required inputs and expected outputs are clear
- the skill layer reduces prompt drift instead of increasing it
