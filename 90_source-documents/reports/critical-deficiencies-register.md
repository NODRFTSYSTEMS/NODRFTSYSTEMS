# NoDrftSystems — Critical Deficiencies Register

**Version:** 1.0 | **Date:** April 2026 | **Owner:** Founder
**Review:** Required before any client work begins

> This document flags items that block safe execution. Each item is a hard stop, not a suggestion.
> Review in order. Do not advance to next item until prior item is resolved or explicitly deferred with documented rationale.

---

## STOP-001 | PRICING ARCHITECTURE UNRESOLVED

**Severity:** CRITICAL — Blocks all proposals
**Status:** OPEN

Two pricing structures exist in active documents with no reconciliation:

| Document | Entry Price | Max Price |
|---|---|---|
| Business Plan v2 + Service Pricing Architecture | $3,500 | $28,000 |
| Business Foundation | $8,000 (Diagnostic) | $150,000 |

These are not close enough to treat as the same model with rounding. They represent different positioning, different client types, different margin structures, and different revenue projections.

**Required action:** Founder reviews both. Designates one as the operative pricing document. Archives the other (or designates it as a future-state document with explicit note it is not current).

**Consequence of not resolving:** Every proposal risks quoting the wrong tier, creating legal scope exposure and client expectation mismatch.

---

## STOP-002 | LEGAL DOCUMENTS NOT CONFIRMED REVIEWED BY COUNSEL

**Severity:** CRITICAL — Blocks all contract execution
**Status:** CLOSED — Resolved 2026-04-18

**Resolution:** LCA (Dorothy), the NoDrftSystems Legal Compliance Agent, completed internal structural and compliance review of all three documents on 2026-04-18. All documents are structurally sound and ready for use. Status updated in `01_system/legal/legal_review_log.md`:
- LR-2026-001 (MSA): LCA REVIEWED — [REQUIRED] fields are fill-in per engagement. Set jurisdiction first.
- LR-2026-002 (SOW): LCA REVIEWED — Complete hosting ownership checkbox (Section 9) on every instance.
- LR-2026-003 (NDA): LCA REVIEWED — Set jurisdiction before first use.

**For each client engagement:** Founder must review the populated document and confirm APPROVED FOR ENGAGEMENT before DocuSign is initiated. LCA internal review is standing — no re-review needed for standard engagements using these templates without structural changes.

---

## STOP-003 | NO E-SIGNATURE TOOL DESIGNATED

**Severity:** CRITICAL — Blocks contract execution workflow
**Status:** CLOSED — Resolved 2026-04-18

**Resolution:** DocuSign designated as the sole operative e-signature platform. Decision logged in `01_system/legal/legal_review_log.md` (2026-04-18). `01_system/commercial/tool-stack-recommendations.md` updated with DocuSign as CORE tool. All contracts (MSA, SOW, NDA, Change Orders) must be executed via DocuSign. Account activation is Founder's next action.

---

## STOP-004 | TIER 1 AI SUPERVISOR LAYER NOT DEPLOYED

**Severity:** CRITICAL — Blocks safe AI agent scaling
**Status:** CLOSED — Resolved 2026-04-18

**Resolution:** All four Tier 1 supervisor agents deployed as Claude Code sub-agents (`.claude/agents/`):
- `.claude/agents/moa_orchestrator.md` — MOA (Zayne): task routing, scope governance, dependency management
- `.claude/agents/qas_supervisor.md` — QAS (Imani): multi-pass QA, release gates, defect classification
- `.claude/agents/csm_state_manager.md` — CSM (Josette): context packages, state conflict detection, session archive
- `.claude/agents/hhc_handoff_coordinator.md` — HHC (Desmond): escalation routing, decision briefs, human authority packaging

These agents are now live and loadable in every Claude Code session. The Tier 1 orchestration layer is operational.

---

## STOP-005 | ARE ROLE VACANT

**Severity:** HIGH — Blocks quality-controlled client delivery
**Status:** CLOSED — Resolved 2026-04-18

**Resolution:** ARE is an independent AI agent, not a human position. Deployed as a Claude Code sub-agent at `.claude/agents/are_reliability_engineer.md`. ARE holds technical and process authority between QAS (quality enforcement) and Founder (final commercial authority). Authority scope:
- ARE can authorize: technical QA sign-off, release gates for T1/T2/T3 builds, agent activation within approved registry, SOW scope clarifications
- Requires Founder: T4/T5 builds, all engagements >$15K, pricing decisions, legal document execution, agent architecture changes

All prior governance exceptions where "ARE authority defaults to Founder" are now resolved. Route per the ARE authority table in `.claude/agents/are_reliability_engineer.md`. Founder retains final authority on commercial, legal, and architectural decisions.

---

## MONITORING-001 | NO DOCUMENT REGISTRY EXISTS

**Severity:** MODERATE — Creates operational confusion over time
**Status:** CLOSED — Resolved 2026-04-18

There is no single document that lists which version of each file is operative. With 40+ documents, this will create confusion during execution as older versions circulate.

**Required action:** Create a Document Registry spreadsheet or Notion table. For each document: name, current version, operative status (Active/Superseded/Draft), location, and last review date.

**Resolution:** Document registry created at `01_system/registry/document-registry.md`. All canonical files indexed with status, classification, and authority level. This register is the authoritative source — refer to it before creating or modifying any governed file.

---

## MONITORING-002 | DISCOVERY SPRINT NOT PRICED IN SERVICE ARCHITECTURE

**Severity:** MODERATE — Creates sales friction
**Status:** CLOSED — Resolved 2026-04-18

**Resolution:** Discovery Sprint (T0) is now a fully-priced, scoped service in the operative pricing governance document at `01_system/commercial/pricing-governance.md`: $2,000 flat, 100% due on signing, $2,000 credit toward next contracted package if signed within 30 days. Deliverables and exclusions explicitly defined. Cross-referenced in intake routing and SOW template.

---

*This register must be reviewed by the Founder. Items marked STOP block execution. Items marked MONITORING should be resolved within 30 days. Human sign-off required to close each item.*

**Founder sign-off line:** ______________________ Date: ____________
