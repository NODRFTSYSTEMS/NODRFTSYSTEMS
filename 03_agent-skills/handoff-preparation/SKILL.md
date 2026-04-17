---
name: handoff-preparation
description: Use when preparing a delivery package, internal handoff, launch handoff, or project close-out. Assemble the required assets, sign-off records, access notes, and known-issues context so the project can transfer cleanly without hidden knowledge.
---

# Handoff Preparation

## Use When

- a project is nearing launch
- ownership is shifting between team members
- the client needs a final delivery package

## Required Inputs

- final deliverables
- access and credential transfer list
- QA and acceptance status
- support-window terms

## Workflow

1. Confirm the release candidate is actually approved.
2. Separate final deliverables from working drafts.
3. Assemble:
   - final files
   - access list
   - setup or runbook notes
   - known issues list
   - sign-off evidence
4. Record what remains inside support scope and what does not.
5. Archive superseded drafts after handoff.

## Outputs

- handoff package
- handoff checklist
- acceptance record
- archive note

## Escalation Behavior

- If required sign-off evidence is missing and the approving authority is disputed or unreachable, stop and escalate to `MOA` before proceeding with the handoff.
- If known issues exist that materially affect client operations after handoff, escalate to Founder before releasing the delivery package. Do not suppress known issues to close on time.
- If access transfer involves credentials or systems where transfer authority is ambiguous, escalate to `ARE` before any credential movement.

## Do Not Do

- do not treat “delivered in chat” as a handoff
- do not leave access transfer undocumented
- do not close a project without a known-issues statement
