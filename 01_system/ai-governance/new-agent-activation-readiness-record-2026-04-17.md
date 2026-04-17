---
document: New Agent Activation Readiness Record
status: Active governance
version: 1.0
date: 2026-04-17
owner: Founder (nodrftsystems)
authority: AI-Native Operating Architecture + Mandatory Build Activation Protocol
confidentiality: Proprietary internal — no external publishing approved
---

# New Agent Activation Readiness Record
## SRA · VDA · LCA · SMA — Skills Optimization Directive 2026-04-17

---

## Gate 0: Activation Classification

**Activation Class: Governance Expansion — New Role Integration**

Justification:
- Four new AI agents approved to fill structural gaps in the 59-agent architecture
- Roles span Strategic Intelligence, Delivery & Build, Quality & Compliance, and People, Roles & Governance
- Each role has a complete skill pack (SKILL.md, openai.yaml, role-charter.md)
- Integration requires workflow cell updates and first-use validation

---

## New Agent Inventory

| Code | Caribbean Name | Canonical Name | Department | Tier | Activation Status | Human Owner |
|------|----------------|----------------|------------|------|-------------------|-------------|
| SRA | Janice | Strategic Review Agent | Strategic Intelligence | Tier 2 | Active — Triggered Workflow | Founder |
| VDA | Jeanine | Visual Direction Agent | Delivery & Build | Tier 2 | Always-On | ARE / Human Designer |
| LCA | Dorothy | Legal Compliance Agent | Quality & Compliance | Tier 2 | Always-On | Founder + Qualified Legal Counsel |
| SMA | Yvonne | System Maintenance Agent | People, Roles & Governance | Tier 2 | Always-On | ARE |

---

## Workflow Cell Placement

### Discovery and Strategy Cell
- **SRA** added as triggered member when QAS or multi-agent outputs require synthesis before strategic commitment
- Activation trigger: QAS report completion, supervisor summary, or cross-functional conflict
- Handoff target: MOA for routing, Founder for strategic decisions

### Build Cell
- **VDA** added as always-on member when visual assets or UI surfaces are in scope
- **SMA** added as pre-build verification gate before any execution start
- Activation trigger: build packet preparation, visual surface identification, dependency audit

### Release and Handoff Cell
- **LCA** added as triggered member when release includes updated terms, privacy disclosures, or regulatory-facing materials
- Activation trigger: legal-adjacent deliverables, compliance-sensitive surfaces

---

## Activation Checklist

### Pre-activation (before first use)

- [ ] Caribbean names assigned and propagated (Janice, Jeanine, Dorothy, Yvonne) ✅
- [ ] Skill packs generated with required anatomy (SKILL.md, openai.yaml, role-charter.md) ✅
- [ ] Manifest updated with 59 entries ✅
- [ ] Registry updated with 59-agent count ✅
- [ ] PDF export regenerated from canonical source ✅
- [ ] Workflow cell definitions updated in AI operating architecture ✅
- [ ] Skill-loading matrix updated with new skill bundles ✅
- [ ] Registry consistency validator created and passing ✅
- [ ] CODEOWNERS reviewed — no path changes required ✅

### First-use activation (next governed build)

- [ ] Agent routing note includes relevant new role(s) with justification
- [ ] Required inputs for each new role are available in workspace
- [ ] Escalation paths tested: SRA→MOA→HHC, VDA→MOA→HHC, LCA→QAS→HHC, SMA→MOA→HHC
- [ ] Human owner notified of role activation
- [ ] Evidence ledger records first activation with timestamp and build context
- [ ] QAS stage-gate sign-off includes review of new role outputs

### Post-activation validation (within 48 hours of first use)

- [ ] Skill outputs match defined outputs in role charter
- [ ] Escalation behavior functions as specified
- [ ] No scope drift detected (QADM monitoring)
- [ ] Prompt version recorded (PCA monitoring)
- [ ] Feedback captured for skill pack refinement

---

## Handoff and Routing Guidance

### SRA (Strategic Review Agent)

**When to activate:**
- QAS review report needs synthesis into recommendations
- Multi-agent outputs conflict or require reconciliation
- Founder needs independent analytical perspective

**Inputs required:**
- QAS reports or supervisor summaries
- Original scope / acceptance criteria
- Supporting operational data
- Decision constraints

**Escalation path:**
- Data quality too low → escalate to MOA → HHC → Founder
- Governance conflict → escalate to MOA → HHC → Founder
- Technical/process decision → escalate to MOA → HHC → ARE

**Do not:** Execute recommendations directly, override QAS holds, citeless recommendations

---

### VDA (Visual Direction Agent)

**When to activate:**
- Project requires visual brief before design/development
- Visual assets need brand alignment audit
- DAA or human designer needs scoped direction

**Inputs required:**
- Project/campaign brief
- Brand identity framework
- Platform constraints
- Accessibility requirements

**Escalation path:**
- Brand governance conflict → escalate to MOA → HHC → Founder
- Licensing/IP risk → escalate to MOA → HHC → Founder + counsel
- Accessibility/performance violation → escalate to MOA → HHC → ARE

**Do not:** Produce final rendered assets, override BCA, approve licenses

---

### LCA (Legal Compliance Agent)

**When to activate:**
- Privacy policy, terms, disclaimer, or contract clause drafted/updated
- Product feature requires regulatory compliance review
- CDA draft needs compliance-oriented review before counsel

**Inputs required:**
- Legal document/process under review
- Applicable jurisdiction and framework
- Prior approved baselines
- Data handling specs (if privacy-related)

**Escalation path:**
- Critical compliance gap → escalate to QAS → HHC → Founder + Qualified Legal Counsel
- Regulatory uncertainty → escalate to QAS → HHC → Founder + Qualified Legal Counsel
- Client requirement conflicts baseline → escalate to QAS → HHC → Founder

**Do not:** Provide licensed legal advice, authorize external sending, negotiate terms

---

### SMA (System Maintenance Agent)

**When to activate:**
- Pre-build or pre-deployment verification required
- Dependencies need update audit
- TACA flags stale tooling affecting build integrity
- Recurring maintenance cycle due

**Inputs required:**
- Tool inventory from TACA
- Build/deployment plan
- Version records and deprecation notices
- Security advisories
- Environment config

**Escalation path:**
- Critical unapplied security patch → escalate to MOA → HHC → ARE
- Pre-build blocker → escalate to MOA → HHC → ARE
- Vendor deprecation no replacement → escalate to MOA → HHC → Founder

**Do not:** Execute updates directly, approve build with Critical blocker, override TACA

---

## Integration with Existing Roles

| Existing Role | Integration Point | Change |
|---------------|-------------------|--------|
| QAS | Stage-gate discipline | QAS now requires formal sign-off at every stage; SRA analyzes QAS outputs; LCA reports to QAS |
| MOA | Routing | MOA routes to SRA for analysis, VDA for visual briefs, SMA for pre-build checks |
| DAA | Design execution | VDA produces briefs; DAA implements from VDA briefs |
| BCA | Brand consistency | VDA sets visual direction; BCA enforces consistency against that direction |
| CDA | Legal drafting | CDA drafts contracts; LCA reviews for compliance before counsel |
| TACA | Tool governance | TACA governs tool inventory; SMA verifies currency and health |
| SEA / PIS | Implementation | SMA flags blockers; SEA/PIS execute remediation |

---

## Risk Flags

| Risk | Mitigation |
|------|-----------|
| New role scope overlap with existing agent | Each new role has explicit bounded scope and non-permitted actions defined in skill pack |
| Activation without human owner awareness | HHC routes all first activations to designated human owner with context brief |
| Skill pack untested in live workflow | First use limited to non-client-facing or low-risk build phase; QAS reviews outputs |
| Placeholder names caused parsing issues | All placeholders resolved; validation script confirms no remaining `[Pending Founder Assignment]` |
| PDF export stale | Regenerated 2026-04-17 from canonical source |

---

## Evidence and Audit Trail

- Registry consistency validator: `01_system/operations/scripts/validate-registry-consistency.py` — PASS
- Canonical registry: `01_system/registry/final-approved-department-and-agent-registry.md`
- Updated manifest: `03_agent-skills/manifest/skill-pack-manifest.yaml`
- Updated AI operating architecture: `01_system/ai-governance/ai-native-operating-architecture.md`
- Updated skill-loading matrix: `03_agent-skills/skill-loading-matrix.md`
- New skill packs: `03_agent-skills/department-skill-pack/` under respective departments

---

## Sign-off

| Role | Name / Agent | Status | Date |
|------|-------------|--------|------|
| Founder | HR-FOUNDER | Approved | 2026-04-17 |
| ARE | HR-ARE | Approved | 2026-04-17 |
| QAS | Imani | Approved | 2026-04-17 |
| MOA | Zayne | Approved | 2026-04-17 |

---

*This record becomes active upon Founder and ARE sign-off. Until then, new roles may be activated for testing and validation only, with explicit human oversight.*
