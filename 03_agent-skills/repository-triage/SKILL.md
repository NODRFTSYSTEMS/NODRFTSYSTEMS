---
name: repository-triage
description: Use when auditing a repository that is cluttered, incomplete, export-heavy, or structurally inconsistent. Classify files, separate canonical assets from raw sources, identify missing operating layers, and recommend or implement a scalable folder structure.
---

# Repository Triage

## Use When

- the repository is flat or cluttered
- file names are inconsistent or opaque
- canonical files and raw exports are mixed together
- you need to classify what exists before proposing changes

## Required Inputs

- current repository tree
- representative source documents or files
- any stated business or delivery objective

## Workflow

1. Inventory the repository and group files by functional domain.
2. Identify canonical gaps:
   - source of truth missing
   - intake missing
   - delivery template missing
   - skill library missing
3. Separate raw exports from working assets.
4. Define a top-level architecture with clear folder purposes.
5. Produce a decision-oriented audit, not just a file list.

## Outputs

- repository observations
- structural problems
- critical deficiencies
- recommended folder architecture
- immediate action plan

## Escalation Behavior

- If the triage reveals that canonical governance artifacts are missing, contradictory, or require restructuring that affects policy, escalate to `ARE` before recommending architectural changes to `01_system/`.
- If the repository structure is so fragmented that a triage cannot produce a safe action plan without risking destruction of canonical files, stop and escalate to `MOA` before proceeding.
- If the triage surfaces unknown files or configurations whose provenance is unclear, flag and escalate to the named human owner before reclassifying or moving them.

## Do Not Do

- do not preserve root clutter just because it already exists
- do not move files without preserving their discoverability
- do not confuse “well-written document” with “canonical system”
