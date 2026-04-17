# Explicit Protocol Control Sweep

Status: active reference  
Date: 2026-04-15  
Last updated: 2026-04-16  
Owners: PRGA, PCA, KDGA, QAS, ARE  
Confidentiality: proprietary internal framework; no external publishing approved  
Purpose: sweep the agent, role, skill, prompt, and governance layers for places where operating control is still implied rather than explicit

## 1. Verified Facts

- The official working registry currently records `55` official agents under the expanded working architecture.
- The live role-skill layer has been directory-verified to contain `55` `SKILL.md` files under `03_agent-skills/department-skill-pack/` — all 10 previously missing expansion-role skill packs (SAA, RCA, FIS, BLS, IDS, TVA, DSS, PIS, POS, ASIS) are now built and structurally complete (SKILL.md + agents/openai.yaml + references/role-charter.md all present).
- The skill-pack manifest records `live_skill_pack_count: 55` and has been updated to `generated_at: 2026-04-15`.
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
| Critical | The expanded 10-role technical bench is approved in the registry but does not yet have live role-skill coverage. | **Resolved 2026-04-15/16** | Directory-verified: all 55 skill packs present with required 3-file structure |
| Critical | Canonical prompt and tool inventory templates exist, but no live populated prompt inventory, tool inventory, or repository-agent capability map exists for a specific governed repository or client. | **Open** | `build-control-assets/04-canonical-prompt-inventory-template.md`, `05-canonical-tool-inventory-template.md`, `07-repository-agent-capability-map-template.md` |
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

- all 55 skill packs present, directory-verified, structurally complete
- explicit registry count in the skill-pack manifest — no gap between approved and live counts
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

1. **Live prompt inventory**: template exists; no live populated instance for any client or repository.
2. **Live tool inventory**: template exists; no live populated instance.
3. **Live repository-agent capability map**: template exists; no live populated map for any governed repository.
4. **Live client governance profile**: template exists; no live populated profile for any client.
5. **Live root contract and scoped rules**: templates exist; no live instances.
6. **MOA stall detection mechanism**: 4-hour stall flag defined in skill behavior; no described monitoring mechanism. Currently an implied human check. Requires Founder + ARE decision on whether this stays as human-monitored or gets a tooling solution.

### Risks

- Using template-only control assets without live client or repo instantiation creates a false sense of governance completeness.
- Leaving the capability map unpopulated weakens agent-fit and handoff controls at Gate 0A.
- MOA stall detection without a mechanism means workflow stalls will only surface if someone notices them manually.

### Acceptance Criteria

The explicit-control sweep is operationally complete only when:

- every approved live role has a corresponding skill pack — **MET as of 2026-04-16**
- every governed repository has a populated repository-agent capability map — **Not yet met**
- every governed client has a populated client governance profile — **Not yet met**
- every governed repository or client context has live scoped rules and a live root contract — **Not yet met**
- live prompt and tool inventories exist and are populated with approved active assets — **Not yet met**

### Recommended Next Build Order

1. Populate the first live client governance profile (first active client workspace).
2. Populate the first live scoped rules set and root contract for that client.
3. Populate the first live prompt inventory and tool inventory.
4. Populate the first live repository-agent capability map for the first governed repository.
5. Audit the first governed build activation against the complete control stack.
6. Resolve the MOA stall detection mechanism question — human-supervised or tooling-assisted.

## 3. Unknowns / Data Gaps

- The repository does not yet identify which specific client or repository should be the first live instantiation target.
- Not verifiable with available data whether any external execution environment is already using unpublished local prompt or tool inventories outside this repository.
- MOA stall detection mechanism: not specified whether this is a tooling solution, a human review cadence, or a scheduled check. Requires human decision before the first live governed build.

## 4. Conclusion

As of 2026-04-16, the skill layer is fully built and structurally complete. All major protocol-control gaps identified in the 2026-04-15 sweep have been resolved. The system is now at its strongest explicit-control state. The remaining gap is not abstract governance — it is live instantiation. Five templates exist without populated live instances. The next milestone is the first real client governance profile, root contract, and capability map for a specific governed workspace. Until those are populated, governance is template-complete but not execution-ready at the instance level.
