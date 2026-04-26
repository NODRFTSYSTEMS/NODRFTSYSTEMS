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
4. For web builds (T1+): confirm branded error states are present — branded 404 page must carry brand logo, brand voice copy, primary CTA, and homepage navigation link. Absent branded 404 = delivery defect; do not pass.
5. Check deployment, access, and handoff readiness.
6. Issue a pass, conditional pass, or fail recommendation.

## Outputs

- release recommendation
- blocker list
- required fixes
- handoff-readiness note

## Escalation Behavior

- If the release is failed and the blocking issue requires human authority to resolve (approval dispute, sign-off authority absent, unresolved known issue with client impact or end-user impact for proprietary products), escalate to `ARE` and Founder before issuing a final gate decision.
- If a release gate is ambiguous because acceptance criteria in the build packet are unclear or missing, escalate to `MOA` and `PMA` to resolve the packet before reviewing the release candidate.
- If QA evidence is absent or fabricated, issue a hard fail and escalate to `ARE`. Do not conditionally pass work without verifiable evidence.

Note: for NoDrft Systems proprietary products, "client impact" means end-user or customer impact on the deployed product. There is no external client. Escalate to Founder when end-user impact is significant or the release affects market-facing product behavior.

## Do Not Do

- do not approve work because it is "close enough"
- do not treat missing sign-off as a minor detail
- do not release without a known-issues statement when issues remain
