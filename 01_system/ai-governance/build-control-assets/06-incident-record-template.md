# Incident Record Template

Status: canonical control asset template  
Date: 2026-04-15  
Owner: QAS with MOA, PRGA, and ARE support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Purpose

Provide the declaration record required when `E1`, `E2`, or `E3` exceptional escalation is activated.

## Usage Rules

- Create one record per declared incident.
- Complete the declaration fields at incident start.
- Update reassessment, containment, and stand-down sections throughout the incident.

## Template

```markdown
# Incident Record

## 1. Declaration

- Incident ID:
- Incident Date:
- Declared Level: [E1|E2|E3]
- Incident Owner:
- Declared By:
- First Reassessment Deadline:

## 2. Incident Summary

- Summary:
- Affected Client Profile:
- Affected Repositories or Systems:
  - 
- Affected Surfaces:
  - 

## 3. Activated Roles

- Supervisor and Governance Roles:
  - 
- Build and Specialist Roles:
  - 
- Reviewer Path:

## 4. Containment Plan

- Containment Objective:
- No-Go Areas:
  - 
- Rollback Posture:
- Scoped Rules Changes Required:
  - 
- Prompt or Tool Surface Notes:
  - 
- Evidence Required to Stand Down:
  - 

## 5. Verification and Release Control

- Required Verification:
  - 
- DRA Requirement:
- QAS Requirement:
- Human ARE Gate:
- Human Founder Gate:

## 6. Reassessment Log

| Time | Summary | Decision | Next Deadline | Owner |
| --- | --- | --- | --- | --- |
| | | | | |

## 7. Stand-Down Decision

- Problem Bounded Again: [yes|no]
- Minimum Safe Build Cell Identified: [yes|no]
- Reviewer Coverage Restored: [yes|no]
- Returned to Mandatory Build Activation Protocol: [yes|no]
- Post-Incident Actions:
  - 
```
