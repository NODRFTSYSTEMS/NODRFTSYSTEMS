# Branch Protection Configuration Notes

Reference: `01_system/ai-governance/codeowners-merge-gate-enforcement-spec-2026-04-15.md`

These settings cannot be committed as files — they must be configured via **GitHub > Settings > Branches** or **GitHub > Settings > Rulesets**. This document records the required posture so the configuration is reviewable and auditable.

---

## Governed Branch: `main`

### Required Controls

Configure all of the following on the `main` branch (or via a repository ruleset targeting `main`):

| Control | Setting |
| --- | --- |
| Require a pull request before merge | Enabled |
| Required approvals | 1 minimum; 2 for production-facing or infrastructure changes |
| Require code-owner approval | Enabled (enforces `CODEOWNERS` routing) |
| Require approval from someone other than the most recent pusher | Enabled |
| Dismiss stale approvals on new commits | Enabled |
| Require all conversations to be resolved | Enabled |
| Require signed commits | Enabled where the organization can support it |
| Require linear history | Enabled |
| Block direct pushes | Enabled; only explicitly approved administrators may bypass |
| Allow broad bypass for routine delivery | Disabled |

### Required Status Checks

Add the following checks once CI workflows exist. Checks may be reduced only where the repository genuinely lacks that surface — not for convenience.

- `typecheck`
- `lint`
- `unit-test`
- `integration-test`
- `build`
- `dependency-review`
- `code-scanning`

### Merge Method

Preferred: **Squash merge** to keep history legible. Do not permit methods that weaken the governed history model.

---

## Exception Policy

Emergency bypass of any control above must be:

1. Narrow in scope
2. Recorded with: reason, approving authority, controls bypassed, compensating checks performed, and deadline for post-change review
3. Subject to post-change audit regardless of urgency

---

## Team Setup (GitHub > Settings > Teams)

Before CODEOWNERS enforcement is active, create the following teams and assign members:

| Team handle | Domain |
| --- | --- |
| `@nodrftsys/founder` | Founder — final policy authority |
| `@nodrftsys/are` | Architecture Review Executive — governance and technical standards |
| `@nodrftsys/reviewers` | Independent reviewers — separate from implementation cell |

Additional teams for client delivery repositories (not required for this governance repo):

| Team handle | Domain |
| --- | --- |
| `@nodrftsys/frontend` | Frontend implementation |
| `@nodrftsys/backend` | Backend / API implementation |
| `@nodrftsys/integrations` | Third-party integration |
| `@nodrftsys/platform` | Infrastructure and deployment |
| `@nodrftsys/data` | Database and schema |
| `@nodrftsys/qa` | QA and automated validation |

---

## Pull Request Template

Every pull request on governed branches should answer:

- Objective
- Scope
- Exclusions
- Acceptance criteria
- Risk level
- Affected surfaces
- Testing and evidence summary
- Migration or deployment notes
- Prompt, tool, or standards impact
