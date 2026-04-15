# Page-Level Build Prompt Templates

Status: canonical prompt asset template set  
Date: 2026-04-15  
Owner: PCA with PMA, DAA, and KDGA support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Asset Control Record

- Prompt Set Name: Page-Level Build Prompt Templates
- Purpose: governed prompt variants for page, route, and interface-layer work where surface-specific constraints matter
- Allowed Model Class: approved build-capable model classes only
- Allowed Tools: only approved tools for the active repository and active role set
- Forbidden Behaviors: page-level changes without route-specific scope, disclosure omissions, UI parity drift, unverified client-side behavior changes
- Expected Output Structure: Plan Mode check, surface-specific execution guidance, page-level evidence and reviewer handoff
- Rollback Reference: prior approved page-level prompt set version
- Evaluation Set Reference: page-surface execution and regression evaluation set
- Last Approved Date: 2026-04-15
- Last Reviewed Date: 2026-04-15

## Prompt 1

Prompt ID: PRM-PAGE-BUILD-001-TEMPLATE  
Prompt Name: Page Implementation Prompt

```text
<page_build_prompt>
Use the approved root contract and scoped rules already assigned to this build.

Page Surface:
- page_or_route: [PAGE_OR_ROUTE]
- persona: [PRIMARY_PERSONA]
- trust_level: [LOW|MODERATE|HIGH]
- primary_goal: [PAGE_GOAL]

Build Packet:
- objective: [OBJECTIVE]
- in_scope:
  - [IN_SCOPE_ITEM]
- exclusions:
  - [EXCLUDED_ITEM]
- acceptance_criteria:
  - [CRITERION]
- changed_components:
  - [COMPONENT]
- required_evidence:
  - [EVIDENCE_ITEM]

Instructions:
- Start in Plan Mode.
- Identify user-flow entry, primary task, exit state, and failure states.
- Preserve existing trust, disclosure, accessibility, and responsive behavior requirements.
- Do not introduce new content claims, legal language, or hidden workflow changes without approval.
- Return page-specific implementation notes, verification plan, and known risks before execution.
</page_build_prompt>
```

## Prompt 2

Prompt ID: PRM-PAGE-FIX-001-TEMPLATE  
Prompt Name: Page Repair and Regression Prompt

```text
<page_fix_prompt>
Use the approved root contract and scoped rules already assigned to this build.

Problem Surface:
- page_or_route: [PAGE_OR_ROUTE]
- defect_summary: [DEFECT_SUMMARY]
- known_regression_risk: [REGRESSION_RISK]
- affected_personas:
  - [PERSONA]

Required Inputs:
- reproduction_steps:
  - [STEP]
- expected_behavior:
  - [EXPECTED_BEHAVIOR]
- actual_behavior:
  - [ACTUAL_BEHAVIOR]
- required_evidence:
  - [EVIDENCE_ITEM]

Instructions:
- Frame the defect first; do not jump directly to a fix.
- Separate root-cause hypothesis from confirmed cause.
- Limit the fix to the bounded surface unless reclassification is approved.
- Define regression checks for adjacent page states, breakpoints, and content conditions.
- Return root-cause view, fix plan, regression plan, and escalation triggers.
</page_fix_prompt>
```

## Prompt 3

Prompt ID: PRM-PAGE-TRUST-001-TEMPLATE  
Prompt Name: Disclosure-Sensitive Page Prompt

```text
<page_trust_prompt>
Use the approved root contract and scoped rules already assigned to this build.

Trust Surface:
- page_or_route: [PAGE_OR_ROUTE]
- disclosure_sensitivity: [PRIVACY|CONSENT|FINANCIAL|LEGAL|CLIENT_TRUST]
- required_disclosures:
  - [DISCLOSURE_ITEM]
- user_action_risk: [LOW|MODERATE|HIGH]

Build Packet:
- objective: [OBJECTIVE]
- scope:
  - [IN_SCOPE_ITEM]
- exclusions:
  - [EXCLUDED_ITEM]
- acceptance_criteria:
  - [CRITERION]

Instructions:
- Treat trust, disclosure clarity, and omission risk as product requirements.
- Do not shorten, paraphrase, or relocate required disclosures without explicit approval.
- Check whether layout, state logic, or copy changes affect user understanding.
- Require privacy and disclosure QA before advancement.
- Return trust-sensitive implementation plan, disclosure impact check, and required control reviews.
</page_trust_prompt>
```
