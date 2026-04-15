# Activation and Handoff Checklist Template

Status: canonical control asset template  
Date: 2026-04-15  
Owner: MOA with PMA, RCA, and QAS support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Purpose

Operationalize Gate 0 through Gate 3A of the Mandatory Build Activation Protocol.

## Usage Rules

- Complete this before implementation begins on governed builds.
- Update the handoff section whenever work moves across roles or domains.
- Treat unchecked required items as no-start conditions.

## Template

```markdown
# Activation and Handoff Checklist

## 1. Build Identity

- Build ID:
- Client Profile:
- Repository:
- Build Class:
- Human Owner:
- Build Lead:
- Reviewer Path:

## 2. Gate 0: Intake

- [ ] Objective defined
- [ ] Scope defined
- [ ] Exclusions defined
- [ ] Affected surfaces identified
- [ ] Human owner assigned
- [ ] Build lead assigned
- [ ] Reviewer path assigned
- [ ] Relevant and capable agent set assessed
- [ ] Likely cross-domain handoff path identified

## 3. Gate 1: Build Packet

- [ ] Build packet exists
- [ ] Acceptance criteria defined
- [ ] Required evidence defined
- [ ] Risk level defined
- [ ] Release sensitivity defined
- [ ] Dependencies identified

## 4. Gate 1A: Plan Mode

- [ ] Build class confirmed
- [ ] Selected active cell listed
- [ ] Reason active cell is relevant and capable recorded
- [ ] Verification plan defined
- [ ] Completion-report shape defined

## 5. Gate 2: Governance Check

- [ ] Root contract linked
- [ ] Scoped rules linked
- [ ] Approved prompt stack linked
- [ ] Approved tool surface linked
- [ ] Repo context loaded
- [ ] Correct specialist set activated
- [ ] Handoff path defined for adjacent specialist domains
- [ ] Reviewer remains outside the build cell

## 6. Gate 3A: Handoff Record

| Sending Role | Receiving Role | Reason | Bounded Surface | Evidence Status | Risks | Expected Output |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

## 7. No-Start or Pause Triggers

- [ ] Missing relevant and capable role coverage
- [ ] Missing handoff target
- [ ] Reviewer independence compromised
- [ ] Prompt or tool surface not approved
- [ ] Scope no longer matches build class

## 8. Signoff

- MOA:
- PMA:
- RCA:
- QAS or Reviewer Path Confirmation:
- Date:
```
