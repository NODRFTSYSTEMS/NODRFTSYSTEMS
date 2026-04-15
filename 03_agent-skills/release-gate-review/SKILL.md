---
name: release-gate-review
description: Use when a release candidate, launch package, or final delivery set needs a structured pass/fail decision before handoff or production release. Check QA status, approval evidence, deployment readiness, access handling, and known issues.
---

# Release Gate Review

## Use When

- a project is approaching launch
- a final delivery package is being assembled
- handoff should not proceed without a release decision

## Required Inputs

- release candidate or final artifact set
- QA status
- approval evidence
- known issues list
- deployment or delivery plan

## Workflow

1. Confirm the artifact is actually in release-candidate state.
2. Check QA completion and unresolved blockers.
3. Verify required approvals and sign-off evidence.
4. Check deployment, access, and handoff readiness.
5. Issue a pass, conditional pass, or fail recommendation.

## Outputs

- release recommendation
- blocker list
- required fixes
- handoff-readiness note

## Do Not Do

- do not approve work because it is "close enough"
- do not treat missing sign-off as a minor detail
- do not release without a known-issues statement when issues remain
