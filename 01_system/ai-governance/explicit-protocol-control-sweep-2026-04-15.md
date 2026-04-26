# Explicit Protocol Control Sweep

Status: active reference  
Date: 2026-04-15  
Last updated: 2026-04-19  
Owners: PRGA, PCA, KDGA, QAS, ARE  
Confidentiality: proprietary internal framework; no external publishing approved  
Purpose: sweep the agent, role, skill, prompt, and governance layers for places where operating control is still implied rather than explicit

## 1. Verified Facts

- The official working registry now records `60` official agents under the expanded working architecture. Agent count history: 45 (baseline) → 55 (engineering expansion 2026-04-15) → 59 (skills optimization directive 2026-04-17: SRA, VDA, LCA, SMA added) → 60 (QMA added 2026-04-18 per Founder Decision Log 2026-04-18-001).
- The live role-skill layer has been directory-verified to contain `60` `SKILL.md` files under `03_agent-skills/department-skill-pack/` — all 60 skill packs are structurally complete (SKILL.md + agents/openai.yaml + references/role-charter.md all present).
- New agents added 2026-04-17 (Skills Optimization Directive): SRA (Strategic Review Agent — Janice, Strategic Intelligence), VDA (Visual Direction Agent — Jeanine, Delivery & Build), LCA (Legal Compliance Agent — Dorothy, Quality & Compliance), SMA (System Maintenance Agent — Yvonne, People, Roles & Governance). Activation readiness record on file: `new-agent-activation-readiness-record-2026-04-17.md`.
- New agent added 2026-04-18: QMA (Quantitative Mathematics Agent — Solomon, Specialist Pool). Founder Decision Log 2026-04-18-001 on file.
- The skill-pack manifest records `live_skill_pack_count: 60` and `generated_at: 2026-04-18`.
- The build prompt library and build control asset libraries exist as canonical template layers.
- The client governance profile, scoped rules, activation and handoff checklist, canonical prompt inventory template, canonical tool inventory template, incident record template, and repository-agent capability map template all exist.
- The workspace AGENTS.md has been updated (2026-04-16) to: (a) explicitly list all 7 required preloads including the engineering standards policy and build context engineering standard; (b) explicitly name the full mandatory base activation stack including CSM and MOA; (c) define startup declaration storage location as `00_admin/session-log.md`.
- The CHSA dual-escalation to HR-FOUNDER is now explicit in the escalation routing matrix of the human authority map.
- DESA's confidence floor of 70 is now documented in its SKILL.md with the reason.

## 2. Analysis

### Objective

Determine whether the current operating system uses explicit protocol controls or still relies on implied behavior across agents, roles, skills, prompts, and governance.

### Scope

- official agent registry
- role-skill pack layer
- skill-pack manifest and loading matrix
- authority routing
- governed build protocols
- prompt and control asset libraries

### Findings

| Severity | Finding | Status | Evidence |
| --- | --- | --- | --- |
| Critical | The expanded 10-role technical bench is approved in the registry but does not yet have live role-skill coverage. | **Resolved 2026-04-15/16** | Directory-verified: all 60 skill packs present with required 3-file structure |
| Critical | Canonical prompt and tool inventory templates exist, but no live populated prompt inventory, tool inventory, or repository-agent capability map exists for a specific governed repository or client. | **Partially resolved — PEO product has full control asset set (scoped rules, root contract, capability map, prompt inventory, tool inventory); BUCKETHEAD has client governance profile. Most client workspaces remain unpopulated.** | `build-control-assets/04-canonical-prompt-inventory-template.md`, `05-canonical-tool-inventory-template.md`, `07-repository-agent-capability-map-template.md` |
| Material | Five new agents (SRA, VDA, LCA, SMA, QMA) were added without being reflected in the sweep's verified-facts record. | **Resolved 2026-04-19** | `new-agent-activation-readiness-record-2026-04-17.md`, `final-approved-department-and-agent-registry.md` |
| Material | VECS is activated as a permanent architectural overlay with a workflow skill and reviewer agent, but was not recorded in the sweep. | **Resolved 2026-04-19** | `03_agent-skills/vecs-public-route/SKILL.md`, `.claude/agents/reviewer_vecs.md`, `visual-experience-conversion-systems-architecture-amendment-2026-04-19.md` |
| Material | Six standard capabilities (Website Monetization Fit Review, Branded Error-State System, Chatbot Scope & Safety Design, Knowledge Integrity Sweep, Routine Usage Policy, Client Success Operating Protocol) were operationally needed but had no governed skill or policy. | **Resolved 2026-04-19** | New workflow skills and governance docs created; see Explicit Controls Now Present section |
| Material | The skill-pack build specification was still written as if the skill layer only needed to cover the legacy 45-role source set. | **Resolved 2026-04-15** | `03_agent-skills/skill-pack-build-specification.md` |
| Material | The human authority map and some newer governance documents were not aligned cleanly on how human escalation routing should work. | **Resolved 2026-04-15** | `03_agent-skills/authority-routing/human-authority-map.md`, `mandatory-build-activation-protocol-2026-04-15.md` |
| Material | Several specialist and strategic-intelligence skills used direct human escalation language instead of explicit HHC-based escalation language. | **Resolved 2026-04-15** | `cda`, `pdb`, `desa`, `tsa`, `moa-g` skill files |
| Material | The `MOA-G` role skill folder and skill name were inconsistent with the canonical naming convention and manifest path. | **Resolved 2026-04-15** | `03_agent-skills/department-skill-pack/strategic-intelligence/moa-g-market-opportunity-agent/` |
| Material | The skill-loading matrix did not explicitly describe governed technical-build control assets as mandatory companions to active role skills. | **Resolved 2026-04-15** | `03_agent-skills/skill-loading-matrix.md` |
| Material | Workspace AGENTS.md only listed RCA and TVA as the required cell minimum; CSM, MOA, and PMA were omitted. Engineering standards policy and build context engineering standard were not in the preload list. Startup declaration had no defined storage location. | **Resolved 2026-04-16** | `02_client-system/templates/client-workspace-template/AGENTS.md` |
| Moderate | CHSA dual-escalation to HR-FOUNDER was not reflected in the escalation routing matrix of the human authority map. | **Resolved 2026-04-16** | `03_agent-skills/authority-routing/human-authority-map.md` |
| Low | DESA confidence floor of 70 existed only in the manifest; no explanation was present in the SKILL.md. | **Resolved 2026-04-16** | `03_agent-skills/department-skill-pack/specialist-pool/desa-data-extraction-structuring-agent/SKILL.md` |
| Low | Manifest `generated_at` recorded 2026-04-14 despite live_skill_pack_count reflecting 55 (expansion packs added 2026-04-15). | **Resolved 2026-04-16** | `03_agent-skills/manifest/skill-pack-manifest.yaml` |
| Open — requires human decision | MOA stall detection (4-hour flag) defined in skill but no described monitoring mechanism exists. This is an implied human check. | **Open — flag for human decision** | `03_agent-skills/department-skill-pack/supervisor-layer/moa-master-orchestrator-agent/SKILL.md` — stall detection needs a real monitoring mechanism or explicit acknowledgment that it is a human-supervised check |

### Explicit Controls Now Present

- all 60 skill packs present, directory-verified, structurally complete
- explicit registry count in the skill-pack manifest — no gap between approved (60) and live (60) counts
- all 5 new agents (SRA, VDA, LCA, SMA, QMA) have activation readiness records and skill packs on file
- VECS workflow skill and reviewer_vecs agent explicit and operational
- six standard capabilities formalized as governed skills or governance documents: website-monetization-fit-review, chatbot-scope-safety-design, knowledge-integrity-sweep, client-success-operating-protocol, routine-usage-policy, branded-error-state (build spec + QA enforcement)
- MCP architecture direction document established — MCP designated as integration standard
- explicit distinction between escalation routing and routine approval-path routing in the human authority map
- explicit HHC-based escalation language in all reviewed skill files
- explicit governed-build control bundle language in the skill-loading matrix
- explicit source hierarchy for post-expansion technical roles in the skill-pack build specification
- explicit full mandatory base activation stack (MOA, CSM, PMA, RCA, implementation role, TVA, reviewer) in the workspace AGENTS.md
- explicit engineering standards policy and build context engineering standard in the workspace preload list
- explicit startup declaration storage location in the workspace AGENTS.md
- explicit CHSA-to-FOUNDER escalation path in the human authority map routing matrix
- explicit DESA confidence floor acknowledgment in the DESA SKILL.md

### Remaining Gaps

1. **Live control asset instantiation for most client workspaces**: PEO and BUCKETHEAD are partial exceptions; the majority of active client workspaces lack populated prompt inventory, tool inventory, and capability maps.
2. **MOA stall detection mechanism**: 4-hour stall flag defined in skill behavior; no described monitoring mechanism. Currently an implied human check. Requires Founder + ARE decision before the first fully governed live build.
3. **Routine Usage pricing figures**: placeholder values in the routine-usage-policy document; Founder must confirm exact included-run quota and per-run overage rate before the policy is operative for client billing.
4. **MCP Phase 2 (memory layer)**: architecture direction document exists but no MCP memory server has been built or approved for deployment. This is by design — Phase 2 requires a separate Founder + ARE activation decision.

### Risks

- Using template-only control assets without live client or repo instantiation creates a false sense of governance completeness.
- Leaving the capability map unpopulated weakens agent-fit and handoff controls at Gate 0A.
- MOA stall detection without a mechanism means workflow stalls will only surface if someone notices them manually.

### Acceptance Criteria

The explicit-control sweep is operationally complete only when:

- every approved live role has a corresponding skill pack — **MET as of 2026-04-16; updated to 60/60 as of 2026-04-19**
- VECS is activated as an explicit governed overlay — **MET as of 2026-04-19**
- the six standard capabilities are governed by skills or policies — **MET as of 2026-04-19**
- every governed repository has a populated repository-agent capability map — **Partially met (PEO only)**
- every governed client has a populated client governance profile — **Partially met (BUCKETHEAD only)**
- every governed repository or client context has live scoped rules and a live root contract — **Partially met (PEO only)**
- live prompt and tool inventories exist and are populated with approved active assets — **Partially met (PEO only)**
- MOA stall detection mechanism is resolved — **Not yet met**
- Routine Usage pricing figures confirmed by Founder — **Not yet met**

### Recommended Next Build Order

1. Resolve MOA stall detection — Founder + ARE decision (human-supervised or tooling-assisted).
2. Confirm Routine Usage pricing figures — Founder decision required.
3. Populate control assets for next active client workspaces as prioritized by Founder.
4. Add GitHub MCP server to governed tool inventory (highest-leverage near-term MCP addition).
5. Audit first fully governed build activation against the complete control stack.
6. Review MCP Phase 2 (memory layer) design for Founder + ARE activation decision.

## 3. Unknowns / Data Gaps

- The repository does not yet identify which specific client or repository should be the first live instantiation target.
- Not verifiable with available data whether any external execution environment is already using unpublished local prompt or tool inventories outside this repository.
- MOA stall detection mechanism: not specified whether this is a tooling solution, a human review cadence, or a scheduled check. Requires human decision before the first live governed build.

## 4. Conclusion

As of 2026-04-19, the system has reached its highest explicit-control state to date. All 60 agents are covered by skill packs. VECS is formally activated. Six standard capabilities that were previously handled ad hoc are now governed by explicit skills and policies. The MCP control-plane direction is established. Remaining open items are operational — not architectural: Routine Usage pricing confirmation, live control-asset instantiation for most workspaces, and the MOA stall-detection mechanism decision. The system is governance-complete and operationally ready. The next focus is live instantiation and the first fully governed build against the complete control stack.
