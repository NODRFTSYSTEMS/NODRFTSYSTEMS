# Client Governance Profile Template

Status: canonical control asset template  
Date: 2026-04-15  
Owner: PRGA with PCA, KDGA, TACA, and QAS support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Purpose

Provide the canonical internal record used to save, categorize, and govern each client for technical delivery.

## Usage Rules

- Keep one active profile per governed client.
- Use this as a governance record, not as a sales CRM entry.
- Link this profile to the correct root contract, scoped rules, prompt set, tool set, reviewer path, and release-control path.
- Update this profile when the client trust surface, repo footprint, language surface, or technical control posture changes materially.

## Template

```markdown
# Client Governance Profile

## 1. Client Identity

- Client ID:
- Client Name:
- Status: [prospective|active|paused|archived]
- Human Relationship Owner:
- Human Delivery Owner:
- Profile Date:
- Last Reviewed:

## 2. Client Categorization

- Service or Product Category:
- Client Type: [internal|external|partner|white_label|confidential]
- Trust Sensitivity: [low|moderate|high]
- Data Sensitivity: [low|moderate|high]
- Privacy or Disclosure Sensitivity: [low|moderate|high]
- Language Surface:
  - 
- Region or Market Surface:
  - 
- Production Exposure: [none|internal_only|limited_user|public_or_client_facing]

## 3. Technical Estate

- Active Repositories:
  - 
- Active Products, Apps, or Systems:
  - 
- Active Environments:
  - 
- Critical Routes, Modules, or Surfaces:
  - 

## 4. Governance Links

- Root Contract Reference:
- Scoped Rules Reference:
- Prompt Library Reference:
- Active Prompt Inventory Reference:
- Active Tool Inventory Reference:
- Repository-Agent Capability Map Reference:
- Activation and Handoff Checklist Reference:
- Incident Record Reference:
- Evidence Ledger Location Rule:
- Completion Report Location Rule:

## 5. Reviewer and Approval Path

- Reviewer Path:
- QAS Routing:
- ARE Gate Requirement:
- Founder Gate Requirement:
- Special Approval Notes:
  - 

## 6. Default Activation Logic

- Default Minimum Cell:
  - 
- Mandatory Specialists for This Client:
  - 
- Conditional Specialists:
  - 
- Default Handoff Rules:
  - 
- Prohibited Shortcuts:
  - 

## 7. Prompt and Tool Control

- Approved Prompt Set IDs:
  - 
- Approved Tools and Services:
  - 
- Restricted Tools:
  - 
- Client-Specific Forbidden Behaviors:
  - 

## 8. Risk and Control Notes

- Known Operational Risks:
  - 
- Disclosure or Trust Notes:
  - 
- Incident Escalation Triggers:
  - 
- Required Verification Emphasis:
  - 

## 9. Change History

| Date | Change | Owner | Reason | Approval |
| --- | --- | --- | --- | --- |
| | | | | |
```
