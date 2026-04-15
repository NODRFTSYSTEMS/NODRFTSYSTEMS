# Client Intake Operating System

## Objective

Create a complete intake system that captures execution-critical information, routes opportunities by fit and project type, and produces a structured packet that can move into discovery, proposal, or decline without re-interviewing the lead.

## Verified Facts

- The repository contains a working intake surface at `02_client-system/client-intake-form.html`.
- The current intake surface generates local summary and JSON outputs for download or copy.
- The current intake surface does not create a repository-side system of record by itself.
- The repository contains a reusable client workspace template at `02_client-system/templates/client-workspace-template/`.
- Pricing governance already requires Discovery Sprint routing when scope is unclear.
- The approved operating model requires stronger review on commercial, legal-adjacent, compliance-sensitive, and release-critical work.

## Current Implementation Status

The intake system is partially operational:

- usable intake surface exists
- qualification logic exists
- routing logic exists
- reusable workspace skeleton exists

The intake system is not yet fully automated:

- no connected Airtable or equivalent operations database is verified as live
- no automatic workspace creation is verified as live
- no repository-native legal or proposal template set is yet designated as fully operative

Until a live operations database is approved, every intake packet must be manually stored inside the client workspace after acceptance or review.

## Scope

This system covers:

- lead capture
- qualification
- discovery routing
- proposal-readiness routing
- founder escalation
- client workspace entry
- delivery-stage folder structure
- archive discipline

## Exclusions

- outbound prospecting workflows
- full CRM automation build
- accounting software setup
- legal review of contracts

## Intake Stages

### 1. Lead intake

Purpose:

- capture enough verified information to judge fit
- avoid unpaid discovery hidden inside the intake form

Required fields:

- company identity
- primary contact and role
- project title
- business problem
- success condition
- target users
- requested deliverables
- timeline
- budget range
- budget authority
- approval structure
- compliance requirements
- prior vendor context

Required outputs:

- structured packet export
- intake timestamp
- first-pass project classification

### 2. Qualification

Purpose:

- determine whether the opportunity should be declined, routed to discovery, or moved toward proposal

Decision factors:

- scope clarity
- budget realism
- timeline realism
- approval-chain friction
- compliance and security risk
- technical integration load
- evidence of prior delivery friction

### 3. Discovery

Purpose:

- convert ambiguous demand into a bounded brief before pricing or build commitments

Required outputs:

- clarified objective
- in-scope and out-of-scope list
- dependencies
- assumptions
- risks
- recommended package or phased path

### 4. Strategy

Purpose:

- translate discovery into the execution brief used by build and review roles

Required outputs:

- strategy brief
- architecture or delivery direction
- scope boundaries
- acceptance criteria
- QA targets

### 5. Active execution

Purpose:

- move the project through a consistent client workspace rather than ad hoc folders

Required outputs:

- execution plan
- working artifact locations
- approval and risk records

### 6. Deliverables

Purpose:

- separate active work from release-candidate and final outputs

Required outputs:

- delivery register
- release candidate set
- final packaged set

### 7. Handoff

Purpose:

- transfer the finished work without relying on memory or chat logs

Required outputs:

- access transfer note
- known-issues note
- support-window record
- acceptance evidence

### 8. Archive

Purpose:

- close the loop without leaving old work mixed into active folders

Required outputs:

- archive note
- closed-project snapshot
- post-mortem where useful

## Qualification Bands

These bands are the recommended operating interpretation for score-based routing:

- `85-100`: proposal-ready only if scope is already bounded and no high-risk flags remain
- `70-84`: discovery or structured scope clarification required before proposal
- `50-69`: do not quote yet; resolve data gaps, budget ambiguity, or approval friction first
- `0-49`: decline or founder review before additional work

These score bands do not override policy rules. If scope is unclear, Discovery Sprint remains mandatory even when the raw score appears acceptable.

## Mandatory Routing Rules

- unclear scope: route to Discovery Sprint
- undisclosed budget plus vague deliverables: discovery or decline
- more than `3` approvers: high-friction flag
- regulated or high-compliance work: founder review
- unrealistic deadline with fixed scope: re-scope or decline
- retainer request without a current-state baseline: do not route directly into retainer work

## Intake Packet Standard

Every completed intake should produce:

- machine-readable structured packet
- human-readable summary
- qualification recommendation
- risk-flag list
- next-step recommendation
- missing-data list when scope, budget, or authority remains unclear

## Workspace Entry Rule

If the opportunity moves forward, the intake output must be stored in the client workspace using the standard template. Use:

- `02_client-system/templates/client-workspace-template/WORKSPACE-BOOTSTRAP.md`
- `03_agent-skills/client-workspace-bootstrap/SKILL.md`

Minimum repository-side records after acceptance or formal review:

- intake summary
- intake packet JSON
- qualification decision note
- discovery brief when required

## Routing Logic by Project Type

### Website and positioning work

- smaller bounded website scope with ready content:
  - route toward Launch Site or equivalent bounded website package
- authority site with heavier content architecture, proof, multiple forms, bilingual needs, or stronger UX complexity:
  - route toward Authority Website or discovery-backed phased path

### App, portal, or internal tool work

- auth, workflows, and data model are already bounded:
  - route toward Platform Starter or phased build
- multiple roles, multiple surfaces, or integration-heavy work:
  - route toward Ecosystem Build or a phased enterprise path

### Operational or strategic audit work

- if the client needs diagnosis before a build decision:
  - route to Discovery Sprint first

### Growth or ongoing support

- route only after a baseline exists
- do not use a retainer to replace basic scoping discipline

## Acceptance Criteria

The intake system is operational when:

- an intake submission creates reusable structured outputs
- the packet can be scored without re-reading the whole intake
- policy-based routing is explicit
- every accepted lead can be instantiated into the workspace template
- every client workspace follows the same stage-based structure
- discovery is triggered automatically when scope is still unclear

## Recommended Next Build Order

1. Keep the intake form aligned with the routing rules in this document.
2. Store every accepted or materially reviewed intake inside the client workspace template.
3. Connect the intake outputs to one approved operations database.
4. Port live commercial and legal starter templates once their human approval status is resolved.
