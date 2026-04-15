# Scoped Rules Template

Status: canonical control asset template  
Date: 2026-04-15  
Owner: PCA with PMA, KDGA, and QAS support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Purpose

Provide the narrowing rule layer that links a root contract to a specific client, repository, module, route, language surface, or compliance surface.

## Usage Rules

- Scoped rules narrow the context; they do not weaken the root contract.
- Create scoped rules per client, repository, module, route, or incident when the work requires narrower boundaries.
- Replace bracketed placeholders before live use.

## Template

```text
<scoped_rules>
scoped_rules_id: [SCOPED_RULES_ID]
status: [draft|approved|superseded]
owner: [OWNER]
linked_root_contract: [ROOT_CONTRACT_REFERENCE]
linked_client_profile: [CLIENT_PROFILE_REFERENCE]

scope_boundaries:
  client: [CLIENT_ID_OR_NAME]
  repository: [REPOSITORY]
  module_or_service: [MODULE_OR_SERVICE]
  page_or_route: [PAGE_OR_ROUTE_OR_NA]
  build_class_limit: [CLASS_1|CLASS_2|CLASS_3|CLASS_4]

surface_constraints:
  language_surface:
    - [LANGUAGE]
  privacy_or_disclosure_sensitivity: [LOW|MODERATE|HIGH]
  data_sensitivity: [LOW|MODERATE|HIGH]
  production_exposure: [NONE|INTERNAL_ONLY|LIMITED_USER|PUBLIC_OR_CLIENT_FACING]

role_constraints:
  required_roles:
    - [ROLE]
  conditional_roles:
    - [ROLE_AND_TRIGGER]
  reviewer_path: [REVIEWER_PATH]
  prohibited_role_shortcuts:
    - [SHORTCUT]

tool_constraints:
  approved_tools:
    - [TOOL]
  restricted_tools:
    - [TOOL]
  forbidden_tools:
    - [TOOL]

execution_constraints:
  in_scope:
    - [IN_SCOPE_ITEM]
  exclusions:
    - [EXCLUDED_ITEM]
  mandatory_evidence:
    - [EVIDENCE_ITEM]
  mandatory_handoffs:
    - [HANDOFF_RULE]

release_constraints:
  required_review_layers:
    - [REVIEW_LAYER]
  release_gate_notes:
    - [GATE_NOTE]
  escalation_triggers:
    - [ESCALATION_TRIGGER]
</scoped_rules>
```
