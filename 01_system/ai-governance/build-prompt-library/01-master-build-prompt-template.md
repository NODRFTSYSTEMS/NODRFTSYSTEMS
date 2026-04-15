# Reusable Master Build Prompt Template

Status: canonical prompt asset template  
Date: 2026-04-15  
Prompt ID: PRM-BUILD-MASTER-001-TEMPLATE  
Owner: PCA with PMA, RCA, and KDGA support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Asset Control Record

- Prompt Name: Reusable Master Build Prompt Template
- Purpose: default governed entry prompt for technical build execution
- Allowed Model Class: approved build-capable model classes only
- Allowed Tools: only tools approved for the active role set and repository
- Forbidden Behaviors: improvised scope expansion, missing-plan execution, self-review, hidden prompt drift, hidden tool drift, external publication of internal framework logic
- Expected Output Structure: Plan Mode output, execution discipline, evidence expectations, structured completion report contract
- Rollback Reference: prior approved master build prompt version
- Evaluation Set Reference: master-build execution evaluation set required before governed activation
- Last Approved Date: 2026-04-15
- Last Reviewed Date: 2026-04-15

## Required Inputs

- approved root contract
- scoped rules for the repository and task surface
- build packet
- active cell assignment
- reviewer path
- approved tool surface

## Template

```text
<build_prompt>
  <asset_metadata>
  prompt_id: [PROMPT_ID]
  build_id: [BUILD_ID]
  repository: [REPOSITORY]
  build_class: [CLASS_1|CLASS_2|CLASS_3|CLASS_4]
  active_cell: [LIST_ACTIVE_ROLES]
  reviewer_path: [REVIEWER_PATH]
  </asset_metadata>

  <root_contract>
  [PASTE_OR_REFERENCE_APPROVED_ROOT_CONTRACT]
  </root_contract>

  <scoped_rules>
  repository_scope: [REPOSITORY_SCOPE]
  module_scope: [MODULE_OR_SERVICE]
  page_or_route_scope: [PAGE_OR_ROUTE_OR_NA]
  language_scope: [LANGUAGE_SURFACES]
  compliance_scope: [DISCLOSURE_OR_PRIVACY_SENSITIVITY]
  tool_scope: [APPROVED_TOOLS_ONLY]
  role_scope: [ACTIVE_ROLES_ONLY]
  </scoped_rules>

  <build_packet>
  objective: [OBJECTIVE]
  bounded_scope:
    - [IN_SCOPE_ITEM]
  exclusions:
    - [EXCLUDED_ITEM]
  dependencies:
    - [DEPENDENCY]
  acceptance_criteria:
    - [CRITERION]
  affected_surfaces:
    - [SURFACE]
  required_evidence:
    - [EVIDENCE_ITEM]
  release_sensitivity: [LOW|MODERATE|HIGH]
  </build_packet>

  <execution_rules>
  Operate in two phases.

  Phase 1: Plan Mode
  - Verify the packet is complete enough to execute without improvisation.
  - If anything required is missing, fail closed and return the missing items.
  - Return only:
    - objective restatement
    - scope and exclusions check
    - selected active roles check
    - implementation approach
    - verification plan
    - risks and escalation triggers
    - completion-report shape

  Phase 2: Controlled Execution
  - Execute only after the Plan Mode output is internally coherent and consistent with the build packet.
  - Do not expand scope without explicit reclassification.
  - Do not change model class, prompt set, or tool surface silently.
  - Preserve reviewer separation.
  - Update the evidence ledger as work progresses.
  - Preserve brief implementation notes where future context would otherwise be lost.
  </execution_rules>

  <verification_loop>
  Before advancement:
  1. compare implementation to acceptance criteria
  2. run the required evidence checks
  3. surface unresolved risks
  4. update the evidence ledger
  5. prepare the structured completion report
  6. route to independent review
  </verification_loop>

  <output_contract>
  If blocked:
  - return status: blocked
  - return exact missing control or missing input
  - return recommended next corrective action

  If proceeding:
  - return status: plan_ready or execution_ready
  - return plan or execution notes in bounded form
  - return evidence expected
  - return open risks
  - return escalation requirement if triggered
  </output_contract>
</build_prompt>
```
