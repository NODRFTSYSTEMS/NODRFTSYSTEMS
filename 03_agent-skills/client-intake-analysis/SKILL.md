---
name: client-intake-analysis
description: Use when reviewing a client intake, discovery packet, or lead qualification record. Score fit, identify risk, route the opportunity to the correct next step, and produce a decision-ready intake brief for humans and AI agents.
---

# Client Intake Analysis

## Use When

- a lead has submitted intake information
- discovery may be required before scoping
- the team needs a fit decision or routing recommendation

## Required Inputs

- intake form or questionnaire
- budget and timeline data if available
- project description
- known stakeholders and decision authority

## Workflow

1. Extract verified facts from the intake.
2. Flag unknowns that block accurate scoping.
3. Assess:
   - scope clarity
   - budget realism
   - timeline realism
   - stakeholder complexity
   - compliance or technical risk
4. Route the lead:
   - decline
   - discovery
   - proposal
   - founder escalation
5. Produce a short intake brief that another agent can use without re-reading the whole form.

## Outputs

- verified facts
- risk flags
- data gaps
- recommended next step
- suggested package or engagement model

## Escalation Behavior

- If the intake produces no clear routing decision (decline / discovery / proposal / founder escalation), stop and escalate to `MOA` before routing. Do not improvise a route.
- If the lead involves non-standard commercial terms, founder-level risk, or an engagement type outside the approved package architecture, escalate to Founder before advancing.
- If critical inputs (budget authority, decision-maker identity, project scope) are absent and cannot be resolved without direct client contact, flag the gap and escalate to `CSM` to manage the information loop.

## Do Not Load

This skill applies to **external client leads only**. Do not load `client-intake-analysis` for NoDrft Systems proprietary product builds (CasaClaro, Peak Equity Optimizer, The Walcott & Co. Press, Forgotten by Design, or any future NoDrft-owned product).

For proprietary builds, the intake scoring model does not apply. Budget authority = Founder. Decision-maker = Founder. Scope authorization = Founder. Loading this skill against a proprietary build produces invalid qualification scores and false risk flags.

For proprietary builds, use a **Proprietary Build Declaration** instead. See `01_system/ai-governance/mandatory-build-activation-protocol-2026-04-15.md` Section 3 for the proprietary build application rules.

## Do Not Do

- do not write a proposal from incomplete intake
- do not hide missing decision-maker or budget clarity issues
- do not route complex ambiguous work straight into build
- do not load this skill for a NoDrft Systems proprietary product
