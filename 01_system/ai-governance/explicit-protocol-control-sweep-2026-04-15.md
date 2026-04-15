# Explicit Protocol Control Sweep

Status: active reference  
Date: 2026-04-15  
Owners: PRGA, PCA, KDGA, QAS, ARE  
Confidentiality: proprietary internal framework; no external publishing approved  
Purpose: sweep the agent, role, skill, prompt, and governance layers for places where operating control is still implied rather than explicit

## 1. Verified Facts

- The official working registry currently records `55` official agents under the expanded working architecture.
- The live role-skill layer currently contains `45` `SKILL.md` files under `03_agent-skills/department-skill-pack/`.
- The skill-pack manifest now explicitly records that the working architecture is `55`, the live skill-pack count is `45`, and the missing skill-pack codes are `SAA`, `RCA`, `FIS`, `BLS`, `IDS`, `TVA`, `DSS`, `PIS`, `POS`, and `ASIS`.
- The build prompt library and build control asset libraries now exist as canonical template layers.
- The client governance profile, scoped rules, activation and handoff checklist, canonical prompt inventory template, canonical tool inventory template, incident record template, and repository-agent capability map template now exist.

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

| Severity | Finding | Status After Sweep | Evidence |
| --- | --- | --- | --- |
| Critical | The expanded 10-role technical bench is approved in the registry but does not yet have live role-skill coverage. This means activation logic exists, but role execution behavior is still implied for those roles. | Open | `final-approved-department-and-agent-registry.md`, `skill-pack-manifest.yaml`, `SKILL_COUNT=45` |
| Critical | Canonical prompt and tool inventory templates exist, but no live populated prompt inventory, tool inventory, or repository-agent capability map exists for a specific governed repository or client. This means live control is not yet instantiated. | Open | `build-control-assets/04-canonical-prompt-inventory-template.md`, `05-canonical-tool-inventory-template.md`, `07-repository-agent-capability-map-template.md` |
| Material | The skill-pack build specification was still written as if the skill layer only needed to cover the legacy 45-role source set. | Fixed in this sweep | `03_agent-skills/skill-pack-build-specification.md` |
| Material | The human authority map and some newer governance documents were not aligned cleanly on how human escalation routing should work. | Fixed in this sweep | `03_agent-skills/authority-routing/human-authority-map.md`, `mandatory-build-activation-protocol-2026-04-15.md` |
| Material | Several specialist and strategic-intelligence skills used direct human escalation language instead of explicit HHC-based escalation language. | Fixed in this sweep | `cda`, `pdb`, `desa`, `tsa`, `moa-g` skill files |
| Material | The `MOA-G` role skill folder and skill name were inconsistent with the canonical naming convention and manifest path. | Fixed in this sweep | `03_agent-skills/department-skill-pack/strategic-intelligence/moa-g-market-opportunity-agent/` |
| Material | The skill-loading matrix did not explicitly describe governed technical-build control assets as mandatory companions to active role skills. | Fixed in this sweep | `03_agent-skills/skill-loading-matrix.md` |

### Explicit Controls Now Present

- explicit registry count and missing-skill-gap disclosure in the skill-pack manifest
- explicit distinction between escalation routing and routine approval-path routing in the human authority map
- explicit HHC-based escalation language in the corrected specialist and strategic-intelligence skill files
- explicit governed-build control bundle language in the skill-loading matrix
- explicit source hierarchy for post-expansion technical roles in the skill-pack build specification

### Remaining Gaps

1. The 10 approved technical roles still need live role charters and skill packs before their execution behavior can be treated as explicit rather than implied.
2. The template libraries now exist, but live client-specific and repo-specific instantiations do not yet exist.
3. The prompt and tool governance layers are explicit at the template level, but not yet explicit at the live populated inventory level.

### Risks

- Activating new engineering roles without live skill packs will create naming without bounded execution behavior.
- Using template-only control assets without live client or repo instantiation will create a false sense of governance completeness.
- Leaving the capability map unpopulated will weaken the agent-fit and handoff controls recently added to the activation protocol.

### Acceptance Criteria

The explicit-control sweep should be treated as operationally complete only when:

- every approved live role has a corresponding skill pack or an explicit documented inactive status
- every governed repository has a populated repository-agent capability map
- every governed client has a populated client governance profile
- every governed repository or client context has live scoped rules and a live root contract
- live prompt and tool inventories exist and are populated with approved active assets

### Recommended Next Build Order

1. Build the 10 missing technical role charters.
2. Build the 10 missing technical skill packs.
3. Populate the first live client governance profile.
4. Populate the first live scoped rules set and root contract.
5. Populate the first live prompt inventory and tool inventory.
6. Populate the first live repository-agent capability map.
7. Audit the first governed repository against the complete control stack.

## 3. Unknowns / Data Gaps

- The repository does not yet identify which specific client or repository should be the first live instantiation target.
- Confidence floors and full charter details for the 10 post-expansion technical roles are not fully defined in a canonical live source artifact.
- Not verifiable with available data whether any external execution environment is already using unpublished local prompt or tool inventories outside this repository.

## 4. Conclusion

The system is materially stronger after this sweep, but not fully closed. The major improvements in this pass converted several control ambiguities into explicit protocol language. The major remaining gap is not abstract governance. It is live coverage: the missing 10 technical role skill packs and the absence of populated client, prompt, tool, and repository control records.
