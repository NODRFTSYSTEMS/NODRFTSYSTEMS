---
name: pricing-safety-review
description: Use when reviewing package pages, proposals, statements of work, invoices, retainers, or regional pricing for pricing contradictions, package-fit errors, payment-schedule drift, or buyer-facing ambiguity. Enforce the NoDrftSystems multi-layer pricing control chain.
---

# Pricing Safety Review

## Use When

- reviewing any commercial artifact before it is sent or published
- comparing proposal, SOW, invoice, and package-page consistency
- checking whether a package is the right fit for the scoped work
- reviewing NoDrft Systems proprietary product pricing pages, SaaS subscription tiers, or app pricing before publication
- checking consistency between a product's public-facing pricing and internal pricing governance

## Required Inputs

- current package architecture
- artifact under review
- scope summary or project brief
- payment schedule rules

## Workflow

1. Confirm which pricing system is operative.
2. Check marketing control:
   - package framing
   - buyer clarity
   - exclusions visibility
3. Check commercial control:
   - package fit
   - scope alignment
   - need for Discovery Sprint or change order
4. Check finance control:
   - payment schedule
   - invoice logic
   - milestone consistency
5. Check QA pricing safety:
   - approved figures only
   - no cross-document contradictions
   - no outdated regional or superseded pricing

## Outputs

- blocking discrepancies
- non-blocking weaknesses
- required corrections
- pass / fail recommendation

## Escalation Behavior

- If a pricing exception is required that falls outside the approved package architecture or pricing governance controls, stop and escalate to Founder before issuing any commercial artifact. Do not approve exceptions unilaterally.
- If a contradiction exists between the artifact under review and a canonical pricing governance document, escalate to `ARE` before resolving the conflict.
- If the scope of work does not map cleanly to any approved package and no Discovery Sprint or change order path is defined, escalate to `MOA` for routing before advancing the commercial document.

## Do Not Do

- do not approve pricing because it “looks close enough”
- do not allow package framing to hide operational exclusions
- do not let a proposal advance when the payment schedule and delivery gates do not match
