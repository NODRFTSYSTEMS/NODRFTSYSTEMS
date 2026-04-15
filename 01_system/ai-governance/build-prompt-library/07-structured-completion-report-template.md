# Structured Completion Report Template

Status: canonical control asset template  
Date: 2026-04-15  
Owner: PMA with QAS and KDGA support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Purpose

Provide the mandatory close-out format for governed technical builds.

## Usage Rules

- This report is required before release advancement on governed builds.
- Keep it bounded to what was actually executed and verified.
- Do not claim completion for excluded or unverified work.

## Template

```markdown
# Structured Completion Report

## 1. Build Identity

- Build ID:
- Repository:
- Build Class:
- Human Owner:
- Build Lead:
- Reviewer Path:
- Report Date:

## 2. Objective Completed

- Objective:
- Completion Status: [completed|partially completed|blocked]
- Outcome Summary:

## 3. Scope Completed

- In-Scope Work Completed:
  - 
- In-Scope Work Deferred:
  - 

## 4. Exclusions Preserved

- Confirmed Exclusions:
  - 
- Any Scope Pressure or Drift Attempted:
  - 

## 5. Files or Surfaces Changed

- Changed Files, Modules, Routes, or Systems:
  - 
- User-Facing Surfaces Affected:
  - 

## 6. Tests and Evidence

- Typecheck:
- Lint:
- Tests:
- Build Result:
- Preview or Runnable Artifact:
- Trace, Failure, or Regression Evidence:
- Evidence Ledger Reference:

## 7. Reviewer Outcome

- Reviewer Role:
- Reviewer Decision: [approve|approve_with_required_fixes|block|escalate]
- Reviewer Notes:

## 8. Open Risks

- Critical Open Risks:
  - 
- Material Open Risks:
  - 
- Monitoring or Follow-Up Needed:
  - 

## 9. Release Status

- Release Status: [not_ready|ready_for_review|ready_for_release|released|escalated]
- Release Gate Blockers:
  - 
- Human Approval Required:
  - 

## 10. Recommended Next Actions

- Immediate Next Actions:
  - 
- Safe Postponements:
  - 
- Escalation Required:
  - 
```
