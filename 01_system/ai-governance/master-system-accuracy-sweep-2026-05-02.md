# Master System Accuracy and Execution Prowess Sweep

Status: active reference  
Date: 2026-05-02  
Owners: ARE, PRGA, KDGA, QAS  
Confidentiality: proprietary internal framework; no external publishing approved  
Scope: master system only — CLAUDE.md, governance layer, registry, skill layer, SOP library, canonical authority documents. NOT products or client workspaces.  
Trigger: Founder directive — hard sweep focused strictly on master system accuracy and execution prowess

---

## Executive Summary

The master system is architecturally sound and far more explicit than it was six weeks ago. The governance layer is real, not theater. The skill system is comprehensive. The MCP server is operational. The 64-agent registry is synchronized.

However, a distinct accuracy gap persists after the Business Analysis department was added on 2026-04-24: four documents in the canonical governance layer still described a 60-agent bench as of the start of this sweep. Two of those four were corrected this session. Additionally, the system has five Founder-blocked operational items that prevent key service lines and policies from being fully operative. These are not architectural failures — they are decisions that have not yet been made.

**Net assessment:** High execution architecture with a targeted accuracy backlog and a cluster of Founder-decision gates that limit operational completeness for specific workflows.

---

## Part 1 — Accuracy: Does the System Correctly Describe Itself?

### Finding A-001: Stale agent count in `ai-native-operating-architecture.md` — RESOLVED this session

**Severity:** High  
**Status:** Fixed 2026-05-02  
**Evidence:** Lines 9, 433, 565 previously read `60 official agents`. The Business Analysis department (BAO/FMA/MCA/RSA) was added 2026-04-24, raising the count to 64. The structural breakdown on line 11 also required updating: `47 departmental agents across 8 departments` → `51 departmental agents across 9 departments`.  
**Fix applied:** All three occurrences updated to `64`. Structural breakdown corrected.

### Finding A-002: Stale agent count in `mandatory-build-activation-protocol-2026-04-26.md` — RESOLVED this session

**Severity:** High  
**Status:** Fixed 2026-05-02  
**Evidence:** Line 14 read `reflects 60 official agents`. The document's last-amended date (2026-04-26) is after the BA dept addition (2026-04-24) — meaning the document was reviewed but not corrected.  
**Fix applied:** Updated to `64 official agents` with explicit note naming the BA department addition as the cause.

### Finding A-003: Stale document-registry note for skill-pack-manifest — RESOLVED this session

**Severity:** Moderate  
**Status:** Fixed 2026-05-02  
**Evidence:** `document-registry.md` line 105 contained a forward-looking action note written before I-001 was executed. After I-001 completed (64/64 manifest, validator exit 0), the note continued to say "manifest is stale as of 2026-05-02" — which had become false.  
**Fix applied:** Note updated to reflect I-001 completion and validator PASS.

### Finding A-004: `sop-library.md` last-updated date predates Business Analysis department by 6 days

**Severity:** Moderate  
**Status:** Open — remediation proposed below  
**Evidence:** `sop-library.md` header reads `Last updated: 2026-04-18`. The BA department was added 2026-04-24. The library has 12 SOPs (SOP-001 through SOP-012); no SOP exists for the Business Analysis Sprint service line. Any operator reading the SOP library has no governed procedure for executing the BA Sprint from inquiry receipt through Founder approval and client delivery.  
**Remediation:** Add SOP-013 (Business Analysis Sprint Execution) and update the header date. Requires Founder review before it is canonical.

### Finding A-005: No Decision Log entry for Business Analysis department registry addition (2026-04-24)

**Severity:** Moderate  
**Status:** Open — Founder action required  
**Evidence:** The final-approved-department-and-agent-registry.md records the BA department with 4 agents (BAO/Cyrus, FMA/Valentina, MCA/Sterling, RSA/Imara). The decision log contains entries for 2026-04-18-001 (QMA activation) and 2026-05-02-001/002 (MCP server activation), but no entry for the 2026-04-24 BA department addition. Per CLAUDE.md Section 2.3 and the mandatory-build-activation-protocol, new agent additions require a Decision Log entry with proposed scope, rationale, and Founder or ARE approval on record.  
**Remediation:** Founder creates Decision Log entry 2026-04-24-001 (retroactive) documenting the BA department activation, Founder authorization, and the 4-agent scope justification.

### Finding A-006: `skill-loading-matrix.md` Build Order item 11 references a non-canonical path for BA skill anatomy

**Severity:** Low  
**Status:** Informational — no action required  
**Evidence:** Build Order item 11 (line 187) references `03_agent-skills/business-analysis-evaluation/SKILL.md` and `agents/openai.yaml` — these files exist at that path and are the workflow-level skill (correctly placed). The department-style role-skill packs in `03_agent-skills/department-skill-pack/business-analysis/` are a separate, additional layer that item 11 was not written to describe. Both layers exist and serve different functions. No path error — the workflow skill and the role-skill packs are structurally parallel, consistent with how all other skills are organized.

---

## Part 2 — Execution Prowess: Can the System Do What It Claims?

### Finding E-001: Routine Usage policy is non-operative — two Founder pricing decisions still [PLACEHOLDER]

**Severity:** Critical for Billing  
**Status:** Open — Founder decision required  
**Evidence:** `01_system/operations/routine-usage-policy.md` contains two `[FOUNDER DECISION REQUIRED]` placeholders:
1. The included-run quota per billing cycle
2. The per-run overage rate  

Until these are confirmed, the policy cannot be used to bill clients for routine session usage. Any client engagement that triggers routine usage fees is currently ungoverned at the billing level.  
**Remediation:** Founder confirms both figures; Codex updates the policy and logs Decision Log entry.

### Finding E-002: Business Analysis Sprint has no operative pricing

**Severity:** High for Revenue  
**Status:** Open — Founder decision required  
**Evidence:** The BA Sprint service line has full operational infrastructure (64/64 agents, SKILL.md, 17-section framework, MCP routing rule, authority rule, SOP gap noted in A-004). It has no confirmed client-facing pricing. The `pricing-governance.md` document does not yet contain a BA Sprint package rate. Without pricing, the service line cannot be formally proposed to a client.  
**Remediation:** Founder sets BA Sprint pricing; `pricing-governance.md` and `CLAUDE.md` skill table updated accordingly; `reviewer_pricing_safety` rule added to cover BA Sprint proposals.

### Finding E-003: MOA stall detection has no monitoring mechanism

**Severity:** High for Operational Reliability  
**Status:** Open — Founder + ARE decision required  
**Evidence:** The MOA SKILL.md defines a 4-hour stall flag but no monitoring mechanism exists. Per the explicit-protocol-control-sweep-2026-04-15.md (Section 2 Remaining Gaps, item 2): "4-hour stall flag defined in skill behavior; no described monitoring mechanism. Currently an implied human check." This remains unresolved as of 2026-05-02.  
**Remediation:** Founder + ARE decide: (a) human review cadence with defined schedule, (b) tooling-assisted check via MCP or external scheduler, or (c) explicit acknowledgment that this is a founder-supervised interval check with a named frequency. Whatever is decided must be written into MOA SKILL.md and the mandatory-build-activation-protocol.

### Finding E-004: 67 agent files in `.claude/agents/` with no consolidated activation authorization record

**Severity:** Moderate  
**Status:** Resolved 2026-05-02 — retroactive batch activation record created  
**Evidence:** `.claude/agents/` contains 67 files (64 department/specialist agents + 3 reviewer agents + reviewer_vecs and others). The decision log explicitly authorizes the Tier 1 supervisor deployment (Wave 1) and ARE. The remaining 62+ files were presumably deployed as part of the engineering expansion sprint (2026-04-15/16) but no single Decision Log entry covers that mass activation. The mandatory-build-activation-protocol references deployment waves but does not contain an activation evidence record.  
**Fix applied:** `01_system/ai-governance/retroactive-agent-activation-record-2026-05-02.md` created 2026-05-02. Covers the Wave 1–2 baseline (45 agents, pre-2026-04-15) and engineering expansion batch (10 agents, 2026-04-15). Includes agent roster, authority chain, completion status, reviewer agents as separate track, and chain-of-custody table linking to subsequent expansion records. Document registry updated. Standing rule added: all future activations require Decision Log entry or activation readiness record BEFORE agent files are created.

### Finding E-005: Kimi multi-provider governance gap — MCP server context not available outside Claude Code

**Severity:** Moderate  
**Status:** Open — by design; remediation planned  
**Evidence:** Decision Log 2026-05-02-002 (TACA review) explicitly notes: "multi-provider limitation (server is Claude Code-only; Kimi and ChatGPT sessions do not receive governed context) is a design gap logged for v0.2, not a blocking concern for current internal use." The Kimi skills (`kimi-master-brief.md`, task overlays) provide a parallel governance layer for Kimi sessions but it relies on manual prompt loading rather than server-enforced routing/authority checks.  
**Remediation:** v0.3 candidate: design a governance prompt export pattern that makes routing and authority rules portable to Kimi/ChatGPT without requiring the MCP server. Confirmed as a known gap — no immediate action unless BA Sprint work runs in Kimi.

### Finding E-006: DocuSign not yet activated — contract signing workflow is blocked

**Severity:** Moderate for Client Delivery  
**Status:** Open — STOP-003 in company-baseline-register.md  
**Evidence:** `company-baseline-register.md` STOP-003 records DocuSign as pending Founder setup. Until DocuSign is active, no MSA, SOW, NDA, or Change Order can be executed through the governed signing workflow. The CDA agent can draft contracts; LCA can review; but the final delivery mechanism (signed document to client) is blocked.  
**Remediation:** Founder activates DocuSign account, logs credentials in secure store, updates company-baseline-register STOP-003 to resolved.

### Finding E-007: GitHub MCP PAT not replaced — GitHub MCP tool non-functional

**Severity:** Moderate for Build Workflow  
**Status:** Resolved 2026-05-02 — Founder provided PAT; applied to `.claude/settings.json`  
**Evidence:** `.claude/settings.json` has `mcpServers.github` registered with `"REPLACE_WITH_YOUR_PAT"` as the token placeholder. The GitHub MCP tools (list repos, search code, read files, create issues/PRs) are non-functional until replaced. RCA, SEA, TVA, and DRA SKILL.md files note GitHub MCP availability — but those tools will fail silently until the PAT is set.  
**Required scopes:** `repo` (read), `read:org`. Restart Claude Code after setting.  
**Fix applied:** Founder provided PAT 2026-05-02. Applied to `.claude/settings.json` → `mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN`. Restart Claude Code to activate GitHub MCP tools in build sessions.

---

## Part 3 — Critical Gaps

| Gap | Severity | Blocks What | Owner |
|-----|----------|------------|-------|
| Routine Usage pricing unconfirmed | Critical for billing | Client billing for session overages | Founder |
| BA Sprint has no pricing | High | BA Sprint cannot be proposed to clients | Founder |
| No SOP-013 for BA Sprint | High | Operators have no governed procedure for BA Sprint | Codex + Founder review |
| No Decision Log entry for BA dept addition | Moderate | Governance record incomplete | Founder |
| MOA stall detection undefined | High | No recovery mechanism for workflow stalls | Founder + ARE |
| DocuSign not activated | Moderate | Contract execution workflow | Founder |
| GitHub MCP PAT not set | Moderate | Full GitHub toolchain in build sessions | Founder |
| 67-agent activation record incomplete | Moderate | Audit trail for agent deployment | PRGA |

---

## Part 4 — Missed Opportunities

### Opportunity O-001: `validate-registry-consistency.py` not yet integrated into a pre-commit hook or session startup check

The validator exists and works. It is currently manual-only. Adding it as a pre-commit check or a session startup check would eliminate the category of accuracy errors this sweep found (stale count in governance docs). Cost: one small hook config change. Value: prevents this exact class of drift automatically.

**Status:** Open — queued for future sprint. Pre-commit hook configuration requires ARE review of hook placement.

### Opportunity O-002: SOP library is not cross-referenced in the skill-loading-matrix

The skill-loading-matrix and SOP library are parallel governance artifacts covering similar ground (workflow → skill/agent assignments) but are not linked. A cross-reference in the matrix ("see also: SOP-004 for step-by-step build activation sequence") would reduce the risk of agents following the matrix without the SOP procedure.

**Status:** Resolved 2026-05-02 — "Cross-Reference: SOP Library" section added to `03_agent-skills/skill-loading-matrix.md` with a full 13-row workflow → skill → SOP mapping table. Business Analysis Sprint bundle section also added.

### Opportunity O-003: Decision Log has no recurring-review cadence

The decision log is authoritative but grows without a review mechanism. Decisions from 2026-04-18 may have implementation consequences that are now stale (e.g., ARE authority delegation decisions that pre-date new agents). A quarterly "decision log audit" pass (20 minutes, KDGA + Founder) would surface stale or superseded decisions before they cause governance drift.

**Status:** Resolved 2026-05-02 — "Quarterly Review Cadence" section added to `01_system/operations/decision-log.md` defining: frequency (quarterly), owners (KDGA + Founder), scope (5-step review), escalation path, and completion log format.

### Opportunity O-004: Kimi skill router (`kimi-revenue-and-sales.md` and `kimi-finance-and-bookkeeping.md`) were added in the skill-loading-matrix without BA Sprint coverage

The Kimi skill layer (9 task skills) does not include a `kimi-business-analysis.md` skill. Any BA Sprint work in a Kimi session would either fall through to the master brief alone or require manual cell activation. Given BA Sprint requires FACT-STRICT MODE (a discipline Kimi needs explicit instruction to maintain), a dedicated Kimi BA skill would reduce output quality risk.

**Status:** Resolved 2026-05-02 — `03_agent-skills/kimi/kimi-business-analysis.md` created; includes FACT-STRICT MODE declaration, 17-section framework summary, RSA self-audit checklist, FLAGS block, and mandatory Claude Code routing gate before any output reaches the client.

### Opportunity O-005: `ai-review-authority-matrix.md` has no explicit BA Sprint artifact class

The authority matrix governs artifact classes. `business-analysis` as an artifact class exists in the MCP server's `authority-rules.ts` but may not yet be present in the source governance document `01_system/ai-governance/ai-review-authority-matrix.md`. If operators consult the source document rather than the MCP tool, they would not find explicit BA Sprint guidance. The MCP server's rules should trace back to the source document.

**Status:** Resolved in the prior session (2026-05-02) — "Business Analysis Artifacts" section added to `ai-review-authority-matrix.md`.

---

## Part 5 — Remediation Priority Order

| Priority | Item | Type | Who | Effort |
|----------|------|------|-----|--------|
| 1 | Confirm Routine Usage pricing figures | Founder decision | Founder | 15 min |
| 2 | Replace GitHub MCP PAT | Config | Founder | 5 min |
| 3 | Confirm BA Sprint pricing | Founder decision | Founder | 15 min |
| 4 | Activate DocuSign | Account setup | Founder | 30 min |
| 5 | Write Decision Log entry 2026-04-24-001 for BA dept activation | Governance record | Founder + Codex | 10 min |
| 6 | MOA stall detection — decide mechanism | ARE + Founder decision | ARE + Founder | 30 min |
| 7 | Add SOP-013 (BA Sprint) to `sop-library.md` | Codex draft + Founder review | Codex | 30 min |
| 8 | Create retroactive agent activation record for Wave 1–2 deployment | Governance record | PRGA + Codex | 20 min |
| 9 | Add `business-analysis` artifact class to source `ai-review-authority-matrix.md` | Accuracy | Codex | 15 min |
| 10 | Add `validate-registry-consistency.py` to session startup or pre-commit | Automation | Codex | 20 min |
| 11 | Decision log quarterly audit cadence | Process | KDGA + Founder | Recurring |
| 12 | `kimi-business-analysis.md` skill | New skill | Codex | 45 min |

---

## Fixes Executed This Session (2026-05-02)

| File | Change | Status |
|------|--------|--------|
| `ai-native-operating-architecture.md` | "60" → "64" at lines 9, 433, 565; structural breakdown updated (47 dept agents / 8 depts → 51 / 9) | Done |
| `mandatory-build-activation-protocol-2026-04-26.md` | "60" → "64"; BA dept addition noted as cause | Done |
| `document-registry.md` | Stale manifest note updated — I-001 complete, 64/64 confirmed; retroactive activation record entry added; skill-pack count "(60; 4 pending)" → "(64; complete)" | Done |
| `.claude/settings.json` | GitHub PAT set — `REPLACE_WITH_YOUR_PAT` → Founder-provided PAT | Done |
| `master-system-accuracy-sweep-2026-05-02.md` | E-007 body updated to Resolved; acceptance criteria for GitHub PAT marked MET; O-002 through O-005 and E-004 status lines updated | Done |
| `03_agent-skills/kimi/kimi-business-analysis.md` | New file — FACT-STRICT BA Sprint skill for Kimi sessions; O-004 resolved | Done |
| `01_system/ai-governance/retroactive-agent-activation-record-2026-05-02.md` | New file — consolidated retroactive activation record for Wave 1–2 baseline and engineering expansion batch; E-004 resolved | Done |
| `03_agent-skills/skill-loading-matrix.md` | SOP cross-reference table added; Business Analysis Sprint bundle section added; kimi-business-analysis.md added to Build Order item 11; O-002 resolved | Done |
| `01_system/operations/decision-log.md` | Quarterly Review Cadence section added at top of file; O-003 resolved | Done |

---

## Acceptance Criteria for This Sweep

The sweep is closed when:

- [x] All stale count references in canonical docs say `64` — **MET** (`ai-native-operating-architecture.md`, `mandatory-build-activation-protocol-2026-04-26.md`, `document-registry.md` all fixed 2026-05-02)
- [x] Decision Log 2026-04-24-001 written for BA dept activation — **MET** (entry created 2026-05-02, retroactive)
- [x] SOP-013 added for Business Analysis Sprint — **MET** (`sop-library.md` v1.1, SOP-013 added 2026-05-02)
- [x] MOA stall detection mechanism decided — **MET** (documented as explicit Founder-supervised human check at session end; written into MOA SKILL.md 2026-05-02)
- [x] `business-analysis` artifact class added to source `ai-review-authority-matrix.md` — **MET** (2026-05-02)
- [x] Routine Usage pricing confirmed by Founder — **MET: 100 runs included / $0.75 overage; routine-usage-policy.md operative as of 2026-05-02**
- [x] BA Sprint pricing confirmed by Founder — **MET: Quick $750 / Standard $1,500 / Advanced $2,500 / Architecture Intensive $3,500+; pricing-governance.md updated 2026-05-02**
- [x] GitHub MCP PAT replaced — **MET: Founder provided PAT 2026-05-02; applied to `.claude/settings.json` → `mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN`; scopes: `repo` + `read:org`; restart Claude Code to activate**
- [x] Retroactive agent activation record for Wave 1–2 deployment — **MET 2026-05-02: `retroactive-agent-activation-record-2026-05-02.md` created; covers 45-agent baseline + 10-agent engineering expansion; E-004 closed**
- [x] SOP library cross-referenced in skill-loading-matrix — **MET 2026-05-02: 13-row SOP mapping table + BA Sprint bundle added; O-002 closed**
- [x] Decision Log quarterly review cadence documented — **MET 2026-05-02: Quarterly Review Cadence section added to `decision-log.md`; KDGA + Founder owners; quarterly frequency; O-003 closed**
- [x] `kimi-business-analysis.md` skill created — **MET 2026-05-02: FACT-STRICT BA Sprint skill for Kimi sessions with RSA self-audit, FLAGS block, and mandatory Claude Code routing gate; O-004 closed**
- [ ] DocuSign activated — **OPEN — requires Founder action: activate account externally; close STOP-003 in `company-baseline-register.md` after setup**
- [ ] `validate-registry-consistency.py` integrated into pre-commit or session startup — **OPEN — queued; requires ARE review of hook placement**

---

*This sweep was triggered by Founder directive 2026-05-02. Data collection completed in the same session. Three accuracy fixes were applied immediately. O-002, O-003, O-004, O-005, E-004, and E-007 fully resolved across two sessions. Remaining open items: DocuSign (Founder external setup) and validator automation (ARE review required).*

---

## Post-Sweep Finding — 2026-05-03

### Finding PS-001: Three named agents missing `.claude/agents/` definition files

**Severity:** Critical — agents in the 64-agent registry were not activatable in Claude Code  
**Status:** Resolved 2026-05-03  
**Discovery:** `.claude/agents/` file count audit: 69 files found (expected 72 = 64 named agents + 7 reviewers + 1 ARE). Three files missing.  
**Agents affected:** AAA/Rochelle (Accessibility Audit Agent), BPA/Maritza (Bilingual Parity Agent), PLA/Simone (Plain Language Agent)  
**Root cause:** Department-skill-pack anatomy existed for all three (SKILL.md + openai.yaml + role-charter.md complete). The `.claude/agents/` activation files were never created during the original batch deployment. The functionally similar reviewer agents (reviewer_accessibility, reviewer_localization, reviewer_plain_language) masked the gap — they serve different roles (gate enforcement vs. deep analytical work).  
**Fix applied:** Three `.claude/agents/` definition files created 2026-05-03:
- `.claude/agents/aaa_accessibility.md` — comprehensive WCAG 2.1 AA audit, deep-diagnostic (upstream of reviewer_accessibility gate)
- `.claude/agents/bpa_bilingual_parity.md` — EN/ES parity analysis, cultural review, glossary management (upstream of reviewer_localization gate)
- `.claude/agents/pla_plain_language.md` — plain language sweep, jargon map, buyer profile calibration (upstream of reviewer_plain_language gate)

**Updated `.claude/agents/` count:** 72 (64 named + 7 reviewers + 1 ARE)  
**Retroactive activation record updated:** `retroactive-agent-activation-record-2026-05-02.md` — Post-Sweep Correction section added
