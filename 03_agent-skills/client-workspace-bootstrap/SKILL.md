---
name: client-workspace-bootstrap
description: Use when an opportunity has been accepted or formally advanced and must be instantiated into the standard client workspace. Create the required control records, stage the intake artifacts, and identify what is still missing before discovery, strategy, or execution begins.
---

# Client Workspace Bootstrap

## Use When

- a lead is accepted
- a new project is opened for an existing client
- formal intake records need a controlled repository home

## Required Inputs

- intake packet or intake summary
- client name
- project title or slug
- routing decision
- accountable owner

## Workflow

1. Confirm the opportunity is accepted or formally in review.
2. Apply the standard workspace template.
3. Create the starter records defined in the workspace bootstrap kit.
4. Place intake artifacts in `01_intake`.
5. Record open gaps that still block discovery, strategy, pricing, or execution.

## Outputs

- initialized workspace plan
- starter record checklist
- missing-information list
- recommended next artifact

## Escalation Behavior

- If the accepted opportunity lacks a named accountable owner or a clear routing decision, stop and escalate to `MOA` before bootstrapping the workspace.
- If intake artifacts are missing and cannot be reconstructed from available context, escalate to `CSM` to resolve the information gap before proceeding.
- If the workspace cannot be instantiated from the standard template due to structural exceptions, escalate to `ARE` before creating non-standard workspace arrangements.

## Proprietary Product Mode

For NoDrft Systems proprietary products, this skill operates in proprietary product mode. The external lead qualification process does not apply.

**Inputs (proprietary product mode):**

- product name
- Proprietary Build Declaration (replaces intake packet and qualification decision)
- Founder authorization confirming the product is in active build or maintenance
- current build phase and status
- open blockers or decisions pending before the next phase

**Workflow differences (proprietary product mode):**

1. Confirm the Proprietary Build Declaration exists or will be created as the first artifact.
2. Skip intake scoring, budget qualification, and external decision-maker verification — the Founder holds all authority.
3. Apply the standard workspace template with product ownership framing (NoDrft Systems as owner, Founder as authority).
4. Replace `01_intake/qualification-decision.md` with `01_intake/proprietary-build-declaration.md`.
5. Record open gaps that block strategy, execution, or the next build gate — not "client contact" gaps but internal decision gaps.

**The workspace is a governed product record, not a client engagement.** All framing, field labels, and artifact names should reflect internal product governance, not external client management.

For NoDrft Systems proprietary products currently requiring workspace setup: CasaClaro (`CASACLARO_marketplace-v1/`), Peak Equity Optimizer (`PEAKEQUITYOPTIMIZER_web-app/`), The Walcott & Co. Press (`WALCOTT_homepage-website/`), Forgotten by Design (`FORGOTTENBYDESIGN_web/`).

## Do Not Do

- do not bootstrap a workspace from unqualified chatter
- do not skip the admin and intake control records
- do not start execution artifacts before scope direction exists
- do not run external client intake scoring against a NoDrft Systems proprietary product
