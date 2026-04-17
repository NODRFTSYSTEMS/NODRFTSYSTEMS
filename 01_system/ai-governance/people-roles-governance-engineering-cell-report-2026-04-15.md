# People, Roles & Governance Report: Engineering Cell Optimization and Redesign

Status: PRG recommendation draft  
Date: 2026-04-15  
Owners for review: Founder, ARE  
Prepared for: People, Roles & Governance department
Approval status note: expansion approvals now live in `engineering-expansion-approval-and-hire-list-2026-04-15.md`

> **Amendment — 2026-04-15:** This report's Verified Facts reflect the pre-expansion baseline. The registry was subsequently expanded to 55 agents per `engineering-expansion-approval-and-hire-list-2026-04-15.md`. The Delivery & Build department now includes additional specialist roles beyond the five listed below. Treat section 1 as a historical snapshot, not current state.

## 1. Verified Facts

- The approved working registry currently contains `45` official agents and is not capped at `40`.
- The operating architecture explicitly uses the smallest viable cell. Bench size is not the same as simultaneous deployment load.
- The approved `Delivery & Build` department currently contains `PMA`, `SEA`, `DAA`, `AAA`, and `DRA`.
- The approved `Quality & Compliance` department currently contains `QDA`, `QADM`, `IPGA`, `SCA`, `BPA`, and `PLA`.
- `SEA` is the only explicit software implementation role in the approved registry.
- `SEA` currently carries broad implementation responsibility: coding, defect remediation, implementation notes, test artifacts, and handoff preparation.
- `PMA` is responsible for decomposing approved scope into task packets with acceptance criteria before implementation begins.
- `QDA` documents QA evidence and `QADM` detects drift, but neither role is defined as an independent same-domain code reviewer.
- `PRGA`, `PCA`, `TACA`, `KDGA`, and `VPCA` already exist as the active governance department for role, prompt, tool, documentation, and vendor control.
- The repository contains no local defect register, failed-code sample set, or benchmark pack that proves whether the primary failure source is talent, prompt drift, weak tooling, weak standards, or weak task definition.

## 2. Analysis

### Objective

Redesign the engineering cell so NoDrftSystems can deliver technically stronger outputs that fit the firm's precision model, while preserving activation discipline and separate review authority.

### Scope

- Engineering-role design
- Assistant-role design
- Training and upgrade recommendations
- Replacement decision logic
- Separation of implementation from review
- Governance actions required from `PRGA`, `PCA`, `TACA`, `KDGA`, and `VPCA`

### Required Elements

- Higher technical sophistication per task
- Better specialization without forcing every role to activate on every project
- Separate technical review path outside the implementation cell
- Clearer upstream task packets and acceptance criteria
- Better standards, tools, and prompt governance
- A replacement path when remediation fails

### Exclusions

- This report does not claim that any named current coding specialist is definitively incapable.
- This report does not approve new roles by itself.
- This report does not rewrite the approved staffing registry.
- This report does not eliminate human approval from release, security, or architecture-sensitive decisions.

### Core Diagnosis

The current engineering setup is under-scoped for a precision delivery model.

The strongest current explanation is not "we do not have enough agents." The stronger explanation is that the active coding layer is too thin, too broad, and too dependent on upstream clarity. The business already operates on a smallest-viable-cell model, so adding more approved specialist roles does not create the same burden as a human team carrying all roles at all times. The higher risk is insufficient sophistication on the tasks that actually activate.

Stated directly:

- the problem is more likely an engineering-cell design problem than a simple agent-count problem
- the current implementation role is too broad for consistent high-precision execution
- the system lacks enough specialized technical coverage before work reaches QA
- the review function must remain separate from implementation
- replacement may be necessary for some roles, but role redesign, prompt governance, tool quality, and technical standards must be audited first

### Probable Failure Modes

| Failure Mode | Verified or Inferred | Why It Matters |
| --- | --- | --- |
| Single broad coding role (`SEA`) carries too much responsibility | Verified | One role is expected to code, test, document, and hand off, which weakens depth and consistency |
| Weak or uneven task packets from `PMA` can poison implementation quality | Verified | `SEA` depends on PMA acceptance criteria and should not improvise ambiguous work |
| No explicit same-domain code reviewer exists in the approved live registry | Verified | QA packaging and drift detection are not substitutes for deep technical critique |
| Prompt drift may be contributing to coding failure | Not verifiable with available data | If prompt versions changed without control, output quality can degrade silently |
| Tooling and model access may be suppressing technical quality | Not verifiable with available data | Weak coding tools or poor tool-role matching can cap output quality |
| Missing or stale engineering standards may be forcing improvisation | Not verifiable with available data | If technical standards are not canonical and current, quality becomes style-by-style guesswork |
| Current coding specialists may be below the required sophistication threshold | Not verifiable with available data | Possible, but not proven without failure samples and controlled re-test |

### Option Review

| Option | Strategic Fit | Operational Complexity | Execution Risk | Maintainability | Recommendation |
| --- | --- | --- | --- | --- | --- |
| Replace current coding specialists immediately | Moderate | Moderate | High | Moderate | Not first move |
| Expand existing coding duties only | Low | Low | High | Low | Reject |
| Add assistants only without role redesign | Moderate | Low | Moderate | Moderate | Insufficient alone |
| Train current coders only | Moderate | Low | Moderate | Moderate | Necessary but insufficient alone |
| Redesign the engineering cell with role splits, assistants, separate reviewer, and evidence-based replacement triggers | High | Moderate | Lowest realistic risk | High | Recommended |

### Recommended Position

Approve an engineering-cell redesign, not a simple "do more with SEA" response and not a blind immediate replacement cycle.

The recommended path is:

1. audit the current system
2. narrow the catch-all coding role
3. add specialist execution support
4. keep reviewer authority separate
5. train against current stack-specific techniques
6. replace only where the redesigned system still fails

## 3. Recommended Engineering Cell Redesign

### Operating Principle

NoDrftSystems does not need every approved agent deployed on every task. It needs a sophisticated enough bench so the right small cell can activate for the actual problem in front of it.

The cost and coordination risk come from activating the wrong mix, not from having a larger approved bench governed correctly.

### Reviewer Separation Rule

The reviewer must remain separate from the implementation cell.

- The reviewer must not be the same role that wrote the code.
- The reviewer must not be positioned as a helper inside the implementation loop.
- The reviewer should sit in a separate control path under `QAS` and human `ARE` authority.
- The engineering-cell redesign should therefore optimize builders and builder-support roles, while preserving separate technical review as an adjacent mandatory control.

### Current State

| Current Role | Status | Current Problem |
| --- | --- | --- |
| `PMA` | Keep | Must become stricter on technical acceptance criteria and dependency framing |
| `SEA` | Redefine | Too broad as a single catch-all implementation role |
| `DAA` | Keep | Useful when UI structure affects build quality |
| `AAA` | Keep | Important control, but not a coding-depth substitute |
| `DRA` | Keep | Important release gate, but not a coding-depth substitute |
| `QDA` | Keep | Evidence role, not implementation critique |
| `QADM` | Keep | Drift role, not implementation critique |
| `SCA` | Keep | Security control remains necessary when risk exists |

### Proposed Future-State Engineering Cell

The following are recommended additions or splits. They are proposed roles, not approved staffing truth.

| Proposed Role | Primary Purpose | Recommended Position |
| --- | --- | --- |
| Solution Architecture Assistant | Convert scope into technical approach, boundaries, dependencies, and implementation strategy before coding begins | Add |
| Frontend Implementation Specialist | Own interface-layer coding, component logic, client-side behavior, and presentation fidelity | Add |
| Backend and Logic Specialist | Own server-side logic, data handling, business rules, and non-UI implementation complexity | Add |
| Integration and Debugging Specialist | Own API wiring, third-party integration, edge-case diagnosis, and defect isolation | Add |
| Test and Verification Assistant | Own implementation-adjacent test coverage preparation, regression checks, and reproducibility evidence | Add |
| Repository Context Assistant | Load project conventions, existing patterns, dependency constraints, and prior implementation references before coding starts | Add |

### Recommended SEA Transition

Do not leave `SEA` as the only broad implementation spine.

Recommended transition:

- short term: keep `SEA` active as implementation lead during transition
- medium term: narrow `SEA` to one implementation surface or lead-executor role
- medium term: move architecture loading, repo-context loading, testing support, and integration troubleshooting into separate specialist support roles
- long term: decide whether `SEA` remains one specialist role or is replaced based on measured results after redesign

### Recommended Activation Patterns

| Task Type | Recommended Activated Cell |
| --- | --- |
| Small bug or low-risk fix | `PMA` + Repository Context Assistant + one implementation specialist + Test and Verification Assistant + separate reviewer |
| Standard feature build | `PMA` + Solution Architecture Assistant + one or two implementation specialists + `DAA` if UI-sensitive + Test and Verification Assistant + separate reviewer |
| Complex integration or unstable codebase work | `PMA` + Solution Architecture Assistant + Frontend or Backend specialist as applicable + Integration and Debugging Specialist + Test and Verification Assistant + `SCA` if exposure exists + separate reviewer |
| Release candidate | implementation cell above + `QDA` + `DRA` + `QAS` + human `ARE` approval where policy requires |

## 4. Governance Actions by People, Roles & Governance

### PRGA

- Open a formal engineering-role incident review.
- Compare current engineering role definitions against actual delivery demands.
- Draft role charters for the proposed engineering assistants and specialist splits.
- Create replacement criteria for any role that remains below threshold after remediation.

### PCA

- Audit `PMA` and `SEA` prompt versions immediately.
- Flag unauthorized changes.
- Produce rollback references if quality regression correlates with prompt changes.
- Require formal ARE approval for any engineering-prompt redesign.

### TACA

- Audit actual coding-tool access against approved policy.
- Flag missing advanced coding tools, stale model access, or wrong tool-role pairing.
- Verify whether engineering agents have the right repo, test, and debugging tool access for current work.

### KDGA

- Audit whether current engineering standards are canonical, current, and operationally reachable.
- Flag missing technical playbooks, test expectations, code-quality rules, architecture note templates, and handoff standards.
- Create a documentation gap list tied to implementation quality risk.

### VPCA

- Evaluate whether upgraded coding tools, advanced model access, or specialist vendor support are justified.
- Compare current cost against rework cost, QA-loop cost, and delivery-delay cost.
- Prepare a recommendation on whether buying better technical capability is cheaper than continued failure.

## 5. Training, Replacement, and Upgrade Policy

### Training Recommendation

Current coding specialists should not remain static.

Training and update scope should include:

- current stack-specific implementation patterns
- framework-specific testing expectations for active projects
- stronger debugging and defect-isolation methods
- repo-context extraction before coding
- implementation note discipline
- regression-aware self-review before QA handoff

### Replacement Recommendation

Replacement should be evidence-based, not frustration-based.

Replace a current coding specialist only if failure persists after:

- clarified acceptance criteria
- current approved prompts
- approved advanced tooling access
- current technical standards
- specialist support or assistant coverage
- controlled re-test on representative tasks

### Assistant Recommendation

Assistants should be approved immediately as the default first expansion path because they reduce overload without requiring every task to activate a full engineering swarm.

## 6. Risks

- Replacing coders before auditing prompts, tools, and standards may hide the real cause.
- Training without role redesign may preserve the same structural overload.
- Adding more roles without activation discipline may create noise and overlap.
- Failing to keep the reviewer separate will weaken independence and recreate self-approval risk.
- Leaving `SEA` as a catch-all role will likely continue the same quality pattern even if the individual agent is improved.

## 7. Dependencies

- Founder approval for role expansion or replacement path
- ARE approval for prompt and tooling changes
- Actual sample set of failed or weak engineering outputs
- Current prompt versions for `PMA` and `SEA`
- Tool-access inventory for technical work
- Current technical standards and handoff templates

## 8. Acceptance Criteria

The redesign should be treated as working only when:

- implementation roles are no longer defined as one broad catch-all coding function
- reviewer independence is preserved
- task packets consistently contain technical acceptance criteria
- prompt versions for engineering roles are controlled and auditable
- tool access for engineering work is current and approved
- technical standards are current and reachable
- first-pass engineering quality improves in measured audit reviews
- rework loops and repeated elementary defects decline in repeated sample tasks

## 9. Recommended Next Build Order

1. `PRGA`: open engineering-cell incident review and draft proposed role map.
2. `PCA`: audit `PMA` and `SEA` prompts for drift, regression, and approval status.
3. `TACA`: audit engineering tool access and identify missing advanced capabilities.
4. `KDGA`: produce engineering standards and documentation gap report.
5. `VPCA`: produce vendor and advanced-tool upgrade recommendation.
6. Founder and ARE: approve assistant-first redesign path and reviewer-separation rule.
7. Draft proposed charters for the new engineering assistants and specialist roles.
8. Pilot the redesigned cell on a small benchmark pack of recent failed or weak tasks.
9. Decide on replacement only after the pilot results are reviewed.

## 10. Unknowns / Data Gaps

- The specific defect patterns in the current coding failures are not verifiable with available local data.
- Whether the primary failure driver is talent, prompt drift, tool weakness, poor standards, or weak task packets is not fully verifiable with available local data.
- The current active technical tool stack actually used on live coding tasks is not fully verifiable with available local data.
- The benchmark threshold for acceptable engineering quality has not been formally defined in repository-native form.

## 11. Conclusion

NoDrftSystems should not treat this as a simple "we need more coders" problem.

The stronger conclusion is:

- the active engineering cell is under-designed for the precision model
- more approved agents are acceptable because they do not all activate simultaneously
- the bigger risk is inadequate sophistication on the small cell that does activate
- reviewer independence must remain separate
- the recommended path is assistant-first role redesign, prompt and tool audit, standards cleanup, then evidence-based replacement where needed

Recommended approval posture:

- approve engineering-cell redesign
- approve separate reviewer rule
- approve assistant and specialist role expansion
- do not approve blind mass replacement as the first move
