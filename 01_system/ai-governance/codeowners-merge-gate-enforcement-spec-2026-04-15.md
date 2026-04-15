# CODEOWNERS and Merge-Gate Enforcement Spec

Status: proposed canonical governance  
Date: 2026-04-15  
Policy owner: People, Roles & Governance with Architecture Review Executive approval  
Purpose: define the ownership-routing and merge-control rules that enforce separate reviewer authority, specialist path ownership, and evidence-backed merges

## 1. Verified Facts

- The user has directed that this framework be treated as proprietary internal operating infrastructure and not published externally.
- GitHub currently supports required pull requests, required status checks, code-owner review, stale-review dismissal, conversation resolution, signed commits, linear history, merge queue, and successful deployment requirements as enforceable controls.
- `CODEOWNERS` can automatically request review for owned paths when a pull request is opened or moved from draft to ready for review.
- The approved governance posture requires reviewer authority to remain separate from implementation authority.
- The approved operating posture accepts a larger approved bench because not all agents activate on every task; therefore ownership should be path-based and task-based, not repo-wide and always-on.

## 2. Analysis

### Objective

Create a review-routing and merge-gate system that:

- routes code to the right specialist domain
- blocks self-approval
- forces evidence into review
- supports a sophisticated small active cell without requiring the whole bench

### Scope

This spec applies to:

- GitHub `CODEOWNERS`
- repository rulesets or protected-branch configuration
- required status checks
- pull request review requirements
- merge methods and queue policy
- exception handling for urgent changes

### Confidentiality Rule

- treat repository controls, ownership maps, and merge-gate logic as internal operating infrastructure
- artifact links in pull requests should point to controlled internal or access-restricted review surfaces, not open public publication endpoints

### Required Elements

- path ownership by technical surface
- separate reviewer rule
- required evidence checks
- branch protections on governed branches
- explicit exception policy

### Exclusions

- internal ideation branches that never merge into governed branches
- throwaway prototype repositories explicitly marked non-governed
- reviewer staffing decisions outside the enforcement mechanism itself

### Ownership Model

Do not place internal AI agent codes directly in `CODEOWNERS`.

Use GitHub teams or named human review groups that map to implementation domains. This keeps the enforcement layer compatible with real repository controls while still aligning to the approved architecture.

Recommended team domains:

- `@nodrftsys/frontend`
- `@nodrftsys/backend`
- `@nodrftsys/integrations`
- `@nodrftsys/platform`
- `@nodrftsys/data`
- `@nodrftsys/qa`
- `@nodrftsys/reviewers`
- `@nodrftsys/are`
- `@nodrftsys/founder`

### Reviewer Separation Rule

The author, most recent pusher, and active implementation specialist pool must not satisfy the final independent reviewer requirement by themselves.

Enforcement posture:

- require approval from someone other than the most recent pusher
- require code-owner review on owned paths
- require at least one reviewer from `@nodrftsys/reviewers` or another designated independent review team for governed branches
- do not count assistant review inside the implementation cell as the separate reviewer sign-off

### Proposed Path Ownership Pattern

Use the broadest stable path partitions that match real delivery surfaces.

- `/app/` or `/src/app/`: frontend plus backend depending on route ownership
- `/src/components/`, `/src/ui/`: frontend
- `/src/server/`, `/api/`, `/src/api/`: backend
- `/src/lib/integrations/`, `/integrations/`: integrations
- `/supabase/`, `/db/`, `/migrations/`, `/prisma/`: data
- `/tests/`, `/playwright/`, `/e2e/`: QA
- `/.github/workflows/`, `/infra/`, `/deploy/`, `/vercel.json`: platform
- `/docs/engineering/`, `/01_system/ai-governance/`: ARE or governance owners where applicable

### Proposed `CODEOWNERS` Template

Adjust paths to each repository, but keep the ownership logic stable.

```text
# Default reviewers for all governed changes
* @nodrftsys/reviewers

# Frontend
/app/ @nodrftsys/frontend @nodrftsys/reviewers
/src/app/ @nodrftsys/frontend @nodrftsys/reviewers
/src/components/ @nodrftsys/frontend @nodrftsys/reviewers
/src/ui/ @nodrftsys/frontend @nodrftsys/reviewers

# Backend and APIs
/api/ @nodrftsys/backend @nodrftsys/reviewers
/src/api/ @nodrftsys/backend @nodrftsys/reviewers
/src/server/ @nodrftsys/backend @nodrftsys/reviewers

# Integrations
/src/lib/integrations/ @nodrftsys/integrations @nodrftsys/reviewers
/integrations/ @nodrftsys/integrations @nodrftsys/reviewers

# Data and schema
/supabase/ @nodrftsys/data @nodrftsys/reviewers
/db/ @nodrftsys/data @nodrftsys/reviewers
/migrations/ @nodrftsys/data @nodrftsys/reviewers
/prisma/ @nodrftsys/data @nodrftsys/reviewers

# QA and automated validation
/tests/ @nodrftsys/qa @nodrftsys/reviewers
/playwright/ @nodrftsys/qa @nodrftsys/reviewers
/e2e/ @nodrftsys/qa @nodrftsys/reviewers

# Platform and deployment controls
/.github/workflows/ @nodrftsys/platform @nodrftsys/are
/infra/ @nodrftsys/platform @nodrftsys/are
/deploy/ @nodrftsys/platform @nodrftsys/are
/vercel.json @nodrftsys/platform @nodrftsys/are

# Governance layer
/01_system/ai-governance/ @nodrftsys/are @nodrftsys/founder
```

### Branch Protection or Ruleset Standard

Preferred posture:

- use repository rulesets where available for consistent multi-branch governance
- use protected branches directly where rulesets are not yet adopted

Required controls on governed branches:

- require a pull request before merge
- require at least two approvals for production-facing code or infrastructure changes
- require code-owner approval
- require approval from someone other than the most recent pusher
- dismiss stale approvals when new commits are pushed
- require all review conversations to be resolved
- require required status checks to pass
- require signed commits where the organization can support it
- require linear history
- block direct pushes except for explicitly approved administrators
- do not allow broad bypass permissions for routine delivery work

Use merge queue on busy protected branches where concurrent pull requests create rebase churn or integration risk.

### Required Status Checks

The exact names depend on each repository, but the categories should remain stable.

- `typecheck`
- `lint`
- `unit-test`
- `integration-test`
- `e2e-smoke`
- `build`
- `dependency-review`
- `code-scanning`
- `generated-types-check` where schema-backed typing applies
- `preview-deployment` or equivalent deployed artifact check for client-facing surfaces

Checks may be reduced only where the repository genuinely lacks the relevant surface. They may not be removed for convenience.

### Merge Method Policy

Recommended posture:

- prefer squash merge for most application repositories to keep history legible
- use merge queue where branch concurrency is high
- do not permit direct rebase or merge commits if that weakens the governed history model for the team

If merge queue is enabled, repository merge-method settings must not conflict with queue requirements.

### Pull Request Intake Template Requirement

Every governed repository should require a pull request template that asks for:

- objective
- scope
- exclusions
- acceptance criteria
- risk level
- affected surfaces
- testing and evidence summary
- preview or artifact link
- migration or deployment notes
- prompt, tool, or standards impact

### Exception Policy

Urgent exceptions must be narrow and recorded.

Required exception fields:

- reason for exception
- approving authority
- controls temporarily bypassed
- compensating checks performed
- deadline for post-change review

Emergency changes are not exempt from post-change audit.

### Dependencies

- GitHub admin access
- mapped GitHub teams or equivalent human review groups
- repository CI workflows
- repository maintainers willing to normalize check names

### Risks

- path ownership that is too broad will flood reviewers
- path ownership that is too narrow will rot as repositories evolve
- required checks without stable CI will create false process pain
- exceptions without audit logging will silently destroy the standard

### Acceptance Criteria

- every governed repository has a committed `CODEOWNERS` file
- every governed branch has pull request enforcement and independent review controls
- code-owner approval is active on owned paths
- required checks are present and documented
- the reviewer team is separate from the implementation author on governed merges
- urgent exceptions create an explicit post-change audit trail

### Recommended Next Build Order

1. Create the GitHub teams that map to review domains.
2. Operationalize the internal repository check-name convention.
3. Add the repository pull request template.
4. Commit the first `CODEOWNERS` file using the path model above.
5. Enable code-owner review and independent-review rules on governed branches.
6. Turn on the required status checks.
7. Enable merge queue on high-traffic branches.
8. Audit the first live repository after one week of usage and adjust only where the path model is objectively wrong.

## 3. Unknowns / Data Gaps

- The current GitHub organization team structure is not verifiable with available local data.
- The active repository set and current CI check names are not verifiable with available local data.
- Whether all governed repositories can support signed-commit enforcement immediately is not verifiable with available local data.

## 4. Conclusion

The enforcement goal is not "more reviewers everywhere." It is correct ownership routing, real reviewer independence, and merge gates that stop weak or under-evidenced work before it lands. A larger approved bench is compatible with this model because activation is task-specific while ownership and controls stay constant.

## 5. Current Source Basis

- GitHub protected branches: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- GitHub `CODEOWNERS`: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- GitHub merge queue: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request-with-a-merge-queue
- GitHub merge methods: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github
- GitHub pull request templates: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository
- GitHub dependency review: https://docs.github.com/en/code-security/concepts/supply-chain-security/about-dependency-review
- GitHub code scanning: https://docs.github.com/en/code-security/concepts/code-scanning/about-code-scanning
