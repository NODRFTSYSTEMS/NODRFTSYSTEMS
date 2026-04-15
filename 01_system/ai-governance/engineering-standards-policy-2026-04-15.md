# Engineering Standards Policy

Status: proposed canonical governance  
Date: 2026-04-15  
Policy owner: People, Roles & Governance with Architecture Review Executive approval  
Purpose: convert current-source engineering research into binding standards for delivery quality, reviewer independence, prompt governance, tool governance, and evidence-based release control

## 1. Verified Facts

- The user has directed that this framework be treated as proprietary internal operating infrastructure and not as something to publish externally.
- The approved governance posture is to approve engineering-cell redesign, approve the separate-reviewer rule, approve assistant and specialist role expansion, and not approve blind mass replacement as the first move.
- The active operating model does not require every approved agent to be deployed on every task. A larger approved bench is acceptable if activation remains disciplined and task-specific.
- The current-source research supports enforced merge gates, `CODEOWNERS`, required security checks, strict TypeScript settings, schema-generated types, trace-first browser QA, runtime observability, protected previews, governed prompt assets, and structured tool use as current usable controls.
- The reviewer function is intentionally separate from the implementation cell and must not be collapsed into assistant review or self-review.

## 2. Analysis

### Objective

Define the minimum enforceable engineering standards that align with the NoDrftSystems precision model:

- smallest viable sophisticated engineering cell
- separate reviewer authority
- explicit scope and acceptance criteria
- controlled prompts and tools
- evidence before approval
- low tolerance for elementary coding failure

### Scope

This policy applies to:

- software delivery agents
- engineering assistants and specialists
- engineering prompts used in governed workflows
- engineering tool access and approvals
- pull request evidence standards
- pre-release validation for coded deliverables

### Confidentiality Rule

This policy is internal only.

- do not publish the framework, prompt system, governance layer, internal role logic, or internal operating controls externally
- do not expose internal mechanics in public-facing copy, marketing, or external delivery artifacts unless Founder approval explicitly overrides this restriction
- use protected internal review artifacts and access-controlled previews where implementation evidence must be inspected

### Required Elements

- explicit task packet before implementation
- separate reviewer outside the implementation chain
- prompt ownership and versioning
- approved tool list and access controls
- typed and testable implementation standards
- evidence-backed QA and release gating

### Exclusions

- ad hoc brainstorming not connected to implementation
- founder-only scratch experiments that are explicitly marked non-governed
- non-code documents unless they directly change prompt, tool, release, or engineering governance

### Standard Activation Model

The default engineering pattern is not one broad coder. The default pattern is a bounded cell selected per task.

Minimum rule set:

- activate the smallest cell that can complete the task with precision
- do not keep the cell artificially small if the task requires specialist depth
- do not deploy the full approved bench if the task does not require it
- keep reviewer authority separate from implementation authority

Recommended implementation domains for the redesigned cell:

- solution architecture assistant
- frontend specialist
- backend and logic specialist
- integration and debugging specialist
- repository context assistant
- test and verification assistant

The reviewer remains separate from these roles.

### Task Packet Standard

No governed implementation begins without a task packet that states:

- objective
- bounded scope
- exclusions
- dependencies
- acceptance criteria
- risk level
- affected surfaces
- required evidence before review

If the packet is weak, implementation pauses and escalates.

### Prompt Governance Standard

Every governed engineering prompt must include:

- prompt name
- owner
- status
- last approved date
- target model or allowed model class
- allowed tools
- forbidden behaviors
- expected output structure
- rollback reference
- evaluation set reference
- last reviewed date

Mandatory build-prompt system components:

- reusable master build prompt
- page-level build prompts where route or page behavior differs materially
- role-specific review prompts
- bilingual QA prompts where parity-sensitive language surfaces exist
- privacy and disclosure QA prompts where trust, consent, or disclosure sensitivity exists
- prompt library under version control

Prompt construction standards:

- use explicit sections for objective, scope, exclusions, constraints, and acceptance criteria
- use XML or similarly explicit delimiters when multiple instruction blocks must stay distinct
- use structured outputs or tool or function schemas when downstream systems consume the output
- use prompt chaining when a single prompt is becoming opaque, hard to inspect, or too overloaded
- place stable instructions before variable request data to support caching and review stability

Prompt publication rule:

- no prompt enters governed production use without owner approval, rollback reference, and a minimal evaluation pass
- build prompts must operate under a persistent root contract and scoped rules rather than one oversized blended instruction block

### Tool Governance Standard

Every governed engineering tool must have:

- named owner
- approved use case
- access scope
- credential or secret handling rule
- cost posture
- fallback path
- review date

Tool use rules:

- only approved tools may be used in governed execution
- tools with write or deploy power require stricter access review than read-only tools
- tool sprawl is not treated as sophistication
- a better tool is justified only when it improves precision, auditability, or speed without reducing control

### Code Standard

For TypeScript projects, baseline compiler policy is:

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`

Where database-backed schema contracts exist:

- generate types from the real schema where the stack supports it
- verify generated types in continuous integration on pull requests
- fail the pull request on unresolved schema and type drift

Implementation rules:

- prefer explicit contracts over cleverness
- document non-obvious decisions briefly where future reviewers need context
- do not merge undocumented workaround logic for critical flows
- treat accessibility, error handling, and edge-state coverage as product quality, not optional polish

### Testing, QA, and Evidence Standard

Required evidence before review depends on the task surface but must include the relevant subset of:

- typecheck result
- lint result
- unit or integration test result
- build result
- preview deployment or equivalent runnable artifact
- QA notes
- failure evidence where a defect was fixed
- evidence-ledger update
- structured completion report

For browser flows:

- prefer Playwright or equivalent deterministic automation for repeatable paths
- use resilient selectors based on user-facing contracts
- retain traces on CI retry or failure
- include report or trace references in the review packet when behavior changed materially

### Observability and Release Standard

For app-class work:

- maintain request-level runtime logs
- instrument traces and metrics where the stack supports it
- keep preview deployments protected during review
- tie release approval to the actual built artifact, not only repository claims
- use a fail-closed release posture when evidence, review, or completion reporting is incomplete

### Context Engineering Standard

Governed builds must use context engineering with enforced controls.

Mandatory elements:

- persistent root contract
- scoped rules
- specialist subagents within bounded scopes
- reusable execution skills
- evidence-ledger discipline
- mandatory Plan Mode before execution
- mandatory verification loop before advancement
- mandatory structured completion report
- fail-closed release gate

### Audit Prompt Pack

Use the following audit prompts as the canonical starting point.

Prompt audit:

> Review this engineering prompt as a governed production asset. Verify owner, purpose, version, approval status, rollback reference, target model, allowed tools, forbidden behaviors, output contract, and linked evaluation set. Identify ambiguity, role overlap, unsafe discretion, unbounded scope, missing evidence requirements, and any instruction that could weaken reviewer independence or release discipline. Return findings grouped as critical, material, and minor, followed by required remediation actions.

Tool audit:

> Review this engineering tool or service for governed operational use. Verify owner, approved use case, access scope, credential handling, write authority, deployment impact, data exposure risk, cost posture, fallback path, and review date. Identify any mismatch between the tool's power and the current control layer. Return approval posture, controls required, and whether the tool should be approved, limited, or removed.

Standards audit:

> Review this repository or delivery workflow against the NoDrftSystems engineering standards policy. Check task packets, reviewer separation, branch protections, CODEOWNERS coverage, pull request template usage, required status checks, type-safety settings, generated-type controls, test evidence, trace evidence, preview protection, and observability coverage. Return failures, partial compliance, missing controls, and the minimum remediation order required before high-trust delivery continues.

### Dependencies

- GitHub administrative access sufficient to configure review and merge controls
- current prompt registry or prompt inventory
- current tool inventory and access map
- repository-level CI capability
- designated reviewer team outside the implementation cell

### Risks

- standards written without repository enforcement will decay into aspiration
- adding specialists without path ownership will create overlap and ambiguity
- stricter controls without better task packets will slow work without improving quality
- tool upgrades without governance will create cost and access drag

### Acceptance Criteria

- a governed repository can identify its active implementation cell and separate reviewer
- governed prompts are versioned and auditable
- governed tools are approved and scoped
- pull requests cannot merge without required evidence and independent review
- TypeScript projects use the baseline strictness settings unless a documented exception is approved
- web projects with meaningful UI behavior produce reproducible QA evidence

### Recommended Next Build Order

1. Approve the policy and designate the reviewer authority.
2. Operationalize the internal prompt registry fields and audit process.
3. Operationalize the internal tool registry fields and audit process.
4. Apply the merge-gate and `CODEOWNERS` enforcement spec.
5. Roll the TypeScript baseline and generated-type checks into active repositories.
6. Require QA evidence and protected previews for client-facing work.
7. Audit the first three governed repositories against this policy.

## 3. Unknowns / Data Gaps

- The exact active repository mix and stack composition are not fully verifiable with available local data.
- The current reviewer-team membership and GitHub team structure are not verifiable with available local data.
- The current prompt inventory and tool inventory are not yet present as canonical live registries in this repository.

## 4. Conclusion

The correct standard is not "use fewer agents" or "replace coders first." The correct standard is to activate the smallest sophisticated engineering cell that fits the task, govern prompts and tools as controlled assets, keep reviewer authority separate, and enforce evidence before merge. This policy is designed to make quality measurable, not implied.

## 5. Current Source Basis

- GitHub protected branches: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- GitHub `CODEOWNERS`: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- GitHub dependency review: https://docs.github.com/en/code-security/concepts/supply-chain-security/about-dependency-review
- GitHub code scanning: https://docs.github.com/en/code-security/concepts/code-scanning/about-code-scanning
- GitHub pull request templates: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository
- Playwright best practices: https://playwright.dev/docs/best-practices
- Playwright trace viewer: https://playwright.dev/docs/trace-viewer-intro
- TypeScript strictness flags: https://www.typescriptlang.org/tsconfig/strict.html
- Supabase generated types: https://supabase.com/docs/guides/api/rest/generating-types
- OpenTelemetry JavaScript: https://opentelemetry.io/docs/languages/js/
- Vercel runtime logs: https://vercel.com/docs/logs/runtime
- Vercel deployment protection: https://vercel.com/docs/deployment-protection
- OpenAI prompting: https://developers.openai.com/api/docs/guides/prompting
- OpenAI structured outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- OpenAI prompt caching: https://platform.openai.com/docs/guides/prompt-caching
- OpenAI agent evals: https://developers.openai.com/api/docs/guides/agent-evals
- Anthropic prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Anthropic tool use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- Anthropic evaluation tool: https://platform.claude.com/docs/en/test-and-evaluate/eval-tool
