# Agent Routing Note

Gate 0A output — required before build packet approval.

Produced by: MOA, PMA, and RCA  
Build: [build name / ticket reference]  
Date: [YYYY-MM-DD]  
Classification: [Class 1 / Class 2 / Class 3 / Class 4]

---

## 1. Surface Map

List every technical surface affected by this build.

| Surface | Description |
| --- | --- |
| [e.g., frontend UI] | [brief description of what is changing] |
| [e.g., backend API] | [brief description] |
| [add rows as needed] | |

---

## 2. Role-to-Surface Assignment

Map each affected surface to the smallest set of relevant and capable agents.

| Surface | Assigned Agent | Role | Owner Type |
| --- | --- | --- | --- |
| [surface] | [agent code] | [primary / consult-only / reviewer] | [implementation / review] |
| | | | |

**Mandatory base activation stack (confirm all are assigned):**

- [ ] `MOA` — orchestration and activation discipline
- [ ] `CSM` — context and state continuity
- [ ] `PMA` — build packet control
- [ ] `RCA` — repository-context loading
- [ ] Primary implementation role: [SEA / FIS / BLS / IDS / DSS / PIS / POS / ASIS — select one]
- [ ] `TVA` — verification and reproducibility evidence
- [ ] Separate reviewer reserved under `QAS` authority: [name reviewer]

**Conditional specialists activated (check all that apply):**

- [ ] `SAA` — architecture / boundary-setting is non-trivial
- [ ] `FIS` — frontend UI / component implementation is primary work
- [ ] `BLS` — backend API / business logic is primary work
- [ ] `IDS` — third-party integration / debugging is material
- [ ] `DSS` — schema, migrations, or data integrity risk exists
- [ ] `PIS` — infrastructure, CI, or deployment is material
- [ ] `POS` — performance risk or optimization scope is explicit
- [ ] `ASIS` — agent-system integration or orchestration is material
- [ ] `DAA` — UI design fidelity is relevant
- [ ] `AAA` — accessibility compliance is required
- [ ] `SCA` — security or compliance review is triggered
- [ ] `DRA` — deployment readiness is in scope

---

## 3. Capability Check

For each assigned agent, confirm:

| Agent | Skill pack loadable? | Scope covers surface? | Required inputs available? | No cheaper agent can own this? |
| --- | --- | --- | --- | --- |
| [agent code] | [yes / no] | [yes / no] | [yes / no / list gaps] | [yes / no] |

---

## 4. Overlap Elimination

If two agents claimed the same surface, record the resolution:

| Surface | Primary Owner | Secondary Role | Resolution |
| --- | --- | --- | --- |
| [surface] | [primary agent] | [consult-only / reviewer] | [reason for assignment] |

---

## 5. Handoff Routing Plan

Document the expected execution sequence.

| Step | Agent | Bounded Surface | Handoff Trigger | Evidence Package Required | Fallback Agent |
| --- | --- | --- | --- | --- | --- |
| 1 | [agent] | [surface] | [condition] | [what must be ready] | [fallback] |
| 2 | [agent] | [surface] | [condition] | [what must be ready] | [fallback] |

---

## 6. Capability Gaps

List any identified gaps and how they will be closed before execution begins.

| Gap | Affected Surface | Resolution Plan |
| --- | --- | --- |
| [describe gap] | [surface] | [how it will be closed] |

If no gaps: state "None identified."

---

## 7. Routing Approval

This note must be signed off by MOA, PMA, and RCA before the build packet is approved.

- MOA sign-off: [ ] confirmed
- PMA sign-off: [ ] confirmed
- RCA sign-off: [ ] confirmed

If a clean routing plan cannot be produced, the build does not activate.
