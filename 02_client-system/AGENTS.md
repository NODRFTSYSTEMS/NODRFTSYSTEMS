# 02_client-system — Agent Activation Contract

## Purpose

This directory contains the client intake surface, intake operating rules, and the reusable client workspace template. Changes here directly affect how leads enter the system and how client workspaces are structured.

## Mandatory preload

Before editing anything in this directory, load:

1. `02_client-system/client-intake-operating-system.md` — the governing spec for scoring, routing, and workspace instantiation
2. `02_client-system/templates/client-workspace-template/WORKSPACE-BOOTSTRAP.md` — workspace creation rules
3. `02_client-system/templates/client-workspace-template/AGENTS.md` — workspace-level activation contract

## Scope boundaries

- `client-intake-form.html` and `client-intake-form-client-facing.html` must remain aligned with the OS spec scoring model.
- `client-intake-operating-system.md` is the governing document. The forms are subordinate to it.
- `templates/client-workspace-template/` is a reusable bootstrap. Do not add client-specific content to the template.

## Hard rules

1. **The scoring algorithm in both HTML forms must match the OS spec.** If you change one, change the others.
2. **Both forms must generate a `missing_data` list** when scope, budget, or authority is unclear.
3. **Do not add backend dependencies** to the forms without explicit approval.
4. **Do not remove stages from the workspace template** without updating the bootstrap and the OS spec.
5. **Client-facing form must not expose internal scores or risk flags** to the user.

## Editing conventions

- When updating form JavaScript, mirror the change in both HTML files.
- When adding a new template file to the workspace, add it to `WORKSPACE-BOOTSTRAP.md` starter-artifact list.
- When changing routing thresholds or score bands, update `client-intake-operating-system.md` first, then the forms.

## Unknowns

If the forms and the OS spec disagree on scoring, routing, or policy, **stop** and reconcile them before making any further edits.
