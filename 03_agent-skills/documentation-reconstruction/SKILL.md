---
name: documentation-reconstruction
description: Use when a document, template, workflow spec, or operating asset is incomplete, fragmented, placeholder-level, or misaligned with the actual project goal. Rebuild it into a bounded, production-usable document with clear scope, constraints, outputs, and acceptance criteria.
---

# Documentation Reconstruction

## Use When

- the file is shallow or partially useful
- multiple weak files should be merged into one stronger asset
- a document describes intent but not execution

## Required Inputs

- the weak or fragmented source file
- any adjacent source files with useful content
- the actual operating objective

## Workflow

1. Separate verified facts from vague claims.
2. Identify what can be preserved and what must be rewritten.
3. Rebuild around:
   - objective
   - scope
   - required elements
   - exclusions
   - dependencies
   - risks
   - acceptance criteria
4. Remove ornamental or duplicate language.
5. Ensure the finished file can be used by both humans and AI agents.

## Outputs

- reconstructed document
- remaining unknowns
- recommended follow-up decisions

## Escalation Behavior

- If the document being reconstructed is a canonical governance artifact that requires policy authority to modify (e.g., an `01_system/` file, a registry entry, or a governed protocol), escalate to `ARE` before publishing the reconstruction.
- If the reconstruction requires decisions that only a human owner can resolve (scope boundaries, commercial commitments, legal language), flag those decisions explicitly and escalate to Founder or the named human owner before finalizing.
- If conflicting sources cannot be resolved without a canonical ruling, stop and escalate to `MOA` rather than arbitrating the conflict independently.

## Do Not Do

- do not patch weak documents with superficial edits
- do not preserve contradictions for the sake of continuity
- do not leave implied steps undocumented when they affect execution
