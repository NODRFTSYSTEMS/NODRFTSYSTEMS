# 03_agent-skills — Agent Activation Contract

## Purpose

This directory contains reusable workflow skills and department role skill packs. Changes here affect every project that loads a skill. Precision and consistency are non-negotiable.

## Mandatory preload

Before creating, renaming, or substantially editing any skill, load:

1. `03_agent-skills/skill-pack-build-specification.md` — the canonical build spec for folder structure, naming, and file conventions
2. `01_system/registry/final-approved-department-and-agent-registry.md` — source of truth for which agents exist and where they belong
3. `03_agent-skills/manifest/skill-pack-manifest.yaml` — routing index for all department role skills

## Scope boundaries

- **Workflow skills** live at the root of `03_agent-skills/`. They are cross-project, phase-based workflows.
- **Department role skills** live inside `03_agent-skills/department-skill-pack/`. They are agent personas organized by operational department.
- Do not mix workflow skills and department role skills in the same folder.

## Hard rules

1. **Every department role skill folder must contain exactly:**
   - `SKILL.md`
   - `agents/openai.yaml`
   - `references/role-charter.md`
2. **Skill `name` in YAML frontmatter must exactly match the folder slug.**
3. **Caribbean names must match the approved registry.** No invented names.
4. **SKILL.md section order is fixed:** `# Title`, `## Use When`, `## Required Inputs`, `## Workflow`, `## Outputs`, `## Escalation Behavior`, `## Do Not Do`.
5. **Do not add README.md, CHANGELOG.md, or INSTALLATION_GUIDE.md** inside skill folders.
6. **Workflow skills should include `## Escalation Behavior`** or document the intentional omission.

## Creating a new skill pack

1. Confirm the agent is in the approved registry.
2. Create the folder under the correct `department-skill-pack/<department>/` path using `<code>-<slug>` naming.
3. Generate `SKILL.md`, `agents/openai.yaml`, and `references/role-charter.md` following the build spec exactly.
4. Add the skill entry to `manifest/skill-pack-manifest.yaml`.
5. Update `skill-pack-build-specification.md` Required Department Pack Inventory if this is a newly approved role.

## Unknowns

If a skill folder is missing required files, contains an unrecognized agent code, or uses a Caribbean name not in the registry, **stop** and flag it for correction before proceeding.
