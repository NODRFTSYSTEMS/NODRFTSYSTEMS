# Pricing Governance

## Objective

Define which pricing documents can be used for quoting, public packaging, and internal financial planning so NoDrftSystems stops operating with multiple concurrent commercial truths.

## Verified Facts

- `NoDrftSystems_2026_Business_Plan_v2_Updated.docx` contains a near-term package ladder with prices such as Launch, Platform, Ecosystem, and Growth Retainer.
- `NoDrftSystems_Business_Foundation.docx` contains a different commercial ladder built around Diagnostic, Foundation, Growth, and Scale with materially higher entry points.
- `NoDrftSystems_Service_Pricing_Architecture_v1.docx` explicitly calls itself an operative document and contains package-by-package rules, inclusions, exclusions, and payment schedules.
- `NoDrftSystems_Pricing_Summary_Sheet_2026.docx` states that public baseline pricing, Colombia pricing, and Jamaica pricing have been recalibrated against revised source documents.
- Multiple offers inside the service pricing architecture still state `NEEDS FOUNDER APPROVAL`.

## Analysis

- The business plan is useful for operating logic and near-term economics, but it is not strict enough to serve as the only quote source.
- The business foundation represents a different market posture. It is not a clean extension of the business-plan ladder; it is a different commercial model.
- The service pricing architecture is the strongest operational pricing document because it defines scope boundaries, exclusions, payment schedules, and risk multipliers.
- The pricing summary sheet is useful as a calibration overlay, but it should not outrank the service pricing architecture because it is derivative and summary-level.

## Canonical Position

### Source of Truth Hierarchy

1. `NoDrftSystems_Service_Pricing_Architecture_v1.docx`
   Use for package definitions, payment schedules, exclusions, retainer logic, risk multipliers, and package routing.

2. `NoDrftSystems_Pricing_Summary_Sheet_2026.docx`
   Use only as a regional calibration overlay on top of the main package architecture.

3. `NoDrftSystems_2026_Business_Plan_v2_Updated.docx`
   Use for strategy, roadmap, and near-term business economics, not for live quoting when it conflicts with the service pricing architecture.

4. `NoDrftSystems_Business_Foundation.docx`
   Treat as future-state or enterprise-positioning reference until the founder intentionally replaces the current ladder.

## Operational Rules

- Do not quote from the business foundation while the service pricing architecture remains the package-level operating reference.
- Do not publish any price tier marked `NEEDS FOUNDER APPROVAL`.
- Do not use regional pricing sheets as public baselines.
- Do not use the pricing summary sheet without checking the package architecture beneath it.
- If scope is unclear, Discovery Sprint is the mandatory entry point.
- If a package page or proposal includes functionality not explicitly covered in the package architecture, the offer must be rewritten before it is sent.

## Multi-Layer Pricing Control

Pricing does not belong to one agent or one team. It is a multi-layer control chain.

### 1. Marketing Control

Purpose:

- buyer-facing clarity
- package framing
- public price presentation
- non-generic positioning language

Failure examples:

- confusing package names
- hidden exclusions
- vague “from” pricing with no legitimate variability

### 2. Commercial Control

Purpose:

- package fit
- scope alignment
- risk pricing logic
- change-order boundary discipline

Failure examples:

- wrong package for the problem
- under-scoped proposal
- Discovery Sprint skipped when ambiguity is still high

### 3. Finance Control

Purpose:

- payment schedule consistency
- invoice logic
- deposit and milestone integrity
- currency discipline

Failure examples:

- proposal and invoice schedule mismatch
- milestone payments that do not match delivery gates
- public pricing language that conflicts with payment terms

### 4. QA Pricing Safety Control

Purpose:

- approved figures only
- document-to-document consistency
- no contradictory terms across package page, proposal, SOW, and invoice

Failure examples:

- outdated price copied into proposal
- exclusions missing in one document but present in another
- regional and baseline pricing accidentally mixed

## Mandatory Pricing Review Flow

1. Primary builder drafts the commercial artifact.
2. Peer commercial verifier checks structure and scope logic.
3. Marketing control verifies presentation and buyer clarity.
4. Commercial control verifies package fit and scope alignment.
5. Finance control verifies payment and invoice consistency.
6. QA pricing safety verifies final consistency and approved figures.
7. Human approval occurs where required.

If any blocking discrepancy is found, the artifact returns to the responsible role, is corrected, and must be re-verified before advancement.

## Required Human Decisions

1. Founder approval status for:
   - Launch Site
   - Authority Website
   - Platform Starter
   - Ecosystem Build
   - retainer tiers
   - hourly/advisory rates

2. Whether the business foundation becomes:
   - future-state internal positioning only
   - enterprise-only sales architecture
   - the new primary pricing system

3. Whether Colombia and Jamaica pricing are:
   - active regional sales instruments
   - internal calibration tools only

## Acceptance Criteria

Pricing governance is considered operational only when all conditions below are true:

- one package architecture is explicitly designated as operative
- all public offers have founder sign-off
- regional pricing is either activated with rules or archived as inactive
- proposal templates and website pricing pages point to the same package definitions
- intake routing uses the same package ladder that proposals use
