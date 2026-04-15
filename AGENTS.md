# NoDrftSystems Repository — Agent Activation Contract

## When you enter this repository

You are operating inside the canonical operational backbone of NoDrftSystems. This repository contains live governance, active client systems, reusable AI skills, and source documents. Treat every change as potentially affecting delivery quality, client trust, and governance integrity.

## Mandatory preload

Before proposing any structural change, reconstruction, or multi-file edit, load these documents in order:

1. `01_system/operations/repository-control-plane.md` — layer definitions and change-control rules
2. `01_system/registry/document-registry.md` — canonical status of every significant file
3. `01_system/registry/final-approved-department-and-agent-registry.md` — the 55-agent approved working architecture
4. `03_agent-skills/skill-loading-matrix.md` — which workflow skills to load for which phase

## Scope boundaries

- `01_system/` is the control layer. edits here affect governance truth.
- `02_client-system/` is the intake-to-delivery entry layer. edits here affect lead conversion and client workspace quality.
- `03_agent-skills/` is the reusable workflow-execution layer. edits here affect every project that loads a skill.
- `90_source-documents/` is the preserved source archive. treat `.docx` and PDF as read-only exports; do not edit them in-place.

## Hard rules

1. **Do not reorganize folders blindly.** Strategy before restructuring.
2. **Do not edit `.docx` or PDF files directly.** Convert operative documents to markdown if they need to become living sources.
3. **Do not create skills outside `department-skill-pack/` or the root workflow-skill folders.**
4. **Do not add Caribbean names, agent codes, or departments that are not in the approved registry.**
5. **Do not commit changes without verifying they align with the document registry.**
6. **Flag contradictions instead of silently resolving them.** If two canonical documents disagree, stop and escalate.

## Change-control discipline

- Small, single-file fixes: proceed with analysis.
- Multi-file reconstructions: require a stated objective, scope, workflow role, and downstream dependency review.
- Client-facing materials, legal materials, pricing logic, and release-critical assets: require extra scrutiny. Do not change without explicit justification.
- After any governance edit, update the document registry if the file status or location changed.

## Naming discipline

- Folders: lowercase, hyphen-separated, no spaces
- Skill folders: `<code>-<slug>` matching the manifest exactly
- Workspace names: `CLIENTNAME_project-slug`
- Dates in filenames: `YYYY-MM-DD`

## Unknowns

If you encounter a file, claim, or instruction that contradicts the loaded governance documents, treat it as **Not verifiable with available data** and flag it before proceeding.
