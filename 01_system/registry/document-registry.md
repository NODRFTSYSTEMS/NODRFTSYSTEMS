# Document Registry

Purpose: define what each preserved source file is for, whether it should be treated as authoritative, and what action is required before it is used operationally.

Status definitions:

- `Canonical governance`: current control document for a live repository workflow
- `Active reference`: useful working file that supports execution, but does not outrank canonical governance
- `Governed by canonical layer`: source material or live asset that must be interpreted through `01_system/`
- `Reference only`: keep for context, not for direct quoting or publishing
- `Derived export`: output or summary of other source material, not primary source
- `Historical baseline`: keep to preserve the prior audit or transition record, not as the current state by itself
- `Needs human decision`: cannot be treated as operative until founder, counsel, or another designated authority resolves status

## Canonical Working Files

- `01_system/operations/repository-control-plane.md`
  Role: current operating map for repository layers, artifact classes, change control, and execution routing
  Status: canonical governance
  Action: use as the current control document for repository behavior and future restructuring

- `01_system/operations/scripts/validate-registry-consistency.py`
  Role: automated validator that checks registry counts, manifest entries, and disk skill folder coverage remain synchronized
  Status: active reference
  Action: run before committing registry or manifest changes; exit code 0 means synchronized, exit code 1 means mismatch detected

- `01_system/repository-audit-2026-04-13.md`
  Role: first restructuring audit after root cleanup
  Status: historical baseline
  Action: preserve as the transition audit; do not treat it as the current operating map by itself

- `01_system/registry/final-approved-department-and-agent-registry.md`
  Role: normalized working registry for the approved agent architecture, including later founder-directed engineering expansion and skills optimization enhancement
  Status: active reference
  Action: use as the staffing truth for approved departments, codes, and ownership; updated 2026-04-17 to 59 agents with SRA, VDA, LCA, SMA additions

- `NoDrftSystems_Final_Approved_Agent_Registry.pdf`
  Role: approved source export backing the normalized registry; regenerated 2026-04-15 to reflect the 55-agent approved architecture at that date
  Status: derived export
  Action: preserve as approval evidence for the working registry; the current live registry contains 59 agents as of 2026-04-17; regenerate this PDF before using it as external evidence

- `01_system/ai-governance/ai-native-operating-architecture.md`
  Role: workflow activation, review-gate, and AI operating model guidance
  Status: canonical governance
  Action: use for activation logic and control rules; updated 2026-04-17 to reflect 59-agent architecture, QAS stage-gate discipline, and new workflow cell members; do not let it override the approved registry on staffing counts or department structure

- `01_system/commercial/pricing-governance.md`
  Role: pricing hierarchy, control chain, and quoting discipline
  Status: canonical governance
  Action: use before proposals, package pages, retainers, SOWs, or invoices are drafted

- `01_system/commercial/tool-stack-recommendations.md`
  Role: lean tool standardization policy
  Status: canonical governance
  Action: use when adding, removing, or standardizing workflow tools

- `02_client-system/client-intake-operating-system.md`
  Role: lead intake, qualification, routing, and workspace-entry operating rules
  Status: canonical governance
  Action: use for every new opportunity until a superseding intake system is approved

- `02_client-system/templates/client-workspace-template/WORKSPACE-BOOTSTRAP.md`
  Role: client workspace instantiation kit and required starter artifact pack
  Status: canonical governance
  Action: use when creating any new client or project workspace from the template

- `02_client-system/templates/client-workspace-template/AGENTS.md`
  Role: workspace-root activation contract for governed build, review, and deployment work
  Status: active reference
  Action: copy into instantiated workspaces and keep aligned with the canonical control plane and approved agent registry

- `03_agent-skills/skill-loading-matrix.md`
  Role: skill routing map for repeatable AI-assisted execution
  Status: canonical governance
  Action: use before loading skills or assembling workflow-specific agent bundles; updated 2026-04-17 to include strategic-review, visual-direction, legal-compliance, and system-maintenance skills

- `03_agent-skills/skill-pack-build-specification.md`
  Role: production build specification for department and agent role skills
  Status: canonical governance
  Action: use before generating per-department or per-agent skills from the approved registry and role library

- `90_source-documents/ai-architecture/NoDrftSystems_Skills_Library_v1.md`
  Role: normalized skill-source document containing role behavior, duties, triggers, inputs, outputs, and escalation rules for the pre-expansion 45-agent baseline
  Status: active reference
  Action: use as the source of truth for role behavior when building or regenerating skill packs for the original 45 agents; the 10 engineering expansion roles are not in this file — see engineering-expansion-approval-and-hire-list-2026-04-15.md and 03_agent-skills/department-skill-pack/

## Activation Contracts and Skill Manifests

- `AGENTS.md`
  Role: repository-root activation contract governing mandatory preloads, scope boundaries, hard rules, change-control discipline, and naming standards for all work in this repository
  Status: canonical governance
  Action: load before any substantial work begins in this repository; do not override without Founder or ARE authorization

- `02_client-system/AGENTS.md`
  Role: client-system activation contract covering intake, operating system, workspace template, and the rules for operating within the client-facing layer
  Status: canonical governance
  Action: load when working within the client-system layer; governs editing conventions and scope boundaries for all 02_client-system files

- `03_agent-skills/AGENTS.md`
  Role: skill-layer activation contract defining the workflow-skill and department role-skill directories, SKILL.md section conventions, mandatory preloads, and hard rules for creating or modifying skills
  Status: canonical governance
  Action: load before generating, editing, or routing any skill pack; defines the required section order and escalation behavior standard

- `03_agent-skills/manifest/skill-pack-manifest.yaml`
  Role: machine-readable index of all 59 live skill packs, their source priorities, skill metadata, and authority-routing definitions
  Status: active reference
  Action: use when routing agent activation to specific skill packs; keep synchronized with the approved department-and-agent registry and any new skill additions

## Skill System

- `03_agent-skills/repository-triage/SKILL.md`
  Role: repository audit and structural triage skill
  Status: active reference
  Action: load when auditing cluttered, export-heavy, or structurally ambiguous repositories

- `03_agent-skills/documentation-reconstruction/SKILL.md`
  Role: document rebuilding skill
  Status: active reference
  Action: load when an operating asset is incomplete, fragmented, or shallow

- `03_agent-skills/profitability-review/SKILL.md`
  Role: margin and leverage review skill
  Status: active reference
  Action: load when evaluating workflow drag, founder overload, or tool sprawl

- `03_agent-skills/client-intake-analysis/SKILL.md`
  Role: intake scoring and routing skill
  Status: active reference
  Action: load when a lead packet or discovery intake needs decision-oriented review

- `03_agent-skills/pricing-safety-review/SKILL.md`
  Role: commercial control and pricing consistency skill
  Status: active reference
  Action: load for proposals, SOWs, invoices, package pages, retainers, and pricing exceptions

- `03_agent-skills/client-workspace-bootstrap/SKILL.md`
  Role: accepted-client workspace setup skill
  Status: active reference
  Action: load once an opportunity is accepted and must be instantiated into the standard workspace

- `03_agent-skills/strategy-brief-builder/SKILL.md`
  Role: discovery-to-strategy translation skill
  Status: active reference
  Action: load when discovery outputs must become an execution-ready brief

- `03_agent-skills/release-gate-review/SKILL.md`
  Role: pre-release and pre-handoff control skill
  Status: active reference
  Action: load before release, launch, delivery handoff, or project close-out

- `03_agent-skills/handoff-preparation/SKILL.md`
  Role: transfer and close-out preparation skill
  Status: active reference
  Action: load when assembling final delivery packages, access transfer notes, and archive records

- `03_agent-skills/department-skill-pack/` (59 role skill folders — full approved working architecture)
  Role: individual role skill packs for all 59 approved agents across the Supervisor Layer, Revenue & Sales, Marketing & Content, Delivery & Build, Quality & Compliance, Client Success, Finance & Bookkeeping, Strategic Intelligence, People Roles & Governance, and Specialist Pool departments
  Status: active reference
  Action: load the relevant role-skill folder when activating a named agent for bounded task execution; the 10 engineering expansion roles (SAA, RCA, FIS, BLS, IDS, TVA, DSS, PIS, POS, ASIS) were added 2026-04-15 per engineering-expansion-approval-and-hire-list-2026-04-15.md; the 4 skills optimization roles (SRA, VDA, LCA, SMA) were added 2026-04-17 per the skills optimization and enhancement directive

## Strategy

- `90_source-documents/strategy/NoDrftSystems_2026_Business_Plan_v2_Updated.docx`
  Role: near-term operating and financial narrative
  Status: governed by canonical layer
  Action: use for strategic baseline, not as sole pricing authority

- `90_source-documents/strategy/NoDrftSystems_Business_Foundation.docx`
  Role: premium and enterprise positioning model
  Status: reference only
  Action: treat as future-state positioning unless founder promotes it

- `90_source-documents/strategy/NoDrftSystems_Master_Strategic_Alignment_Pack.docx`
  Role: executive alignment pack
  Status: active reference
  Action: use to align messaging, gating, and roadmap assumptions

- `90_source-documents/strategy/NoDrftSystems_Investor_Package.docx`
  Role: investor-facing narrative
  Status: reference only
  Action: verify that revenue, tooling, and pricing align before reuse

- `90_source-documents/strategy/NoDrftSystems_Addendum_1_Organizational_Architecture_Resolution.docx`
  Role: organizational design reference
  Status: active reference
  Action: keep aligned with AI architecture and hiring decisions

- `90_source-documents/strategy/NoDrftSystems_Addendum_13_Tax_Optimization_Plan.docx`
  Role: tax planning reference
  Status: needs human decision
  Action: do not treat as professional tax advice without licensed review

- `90_source-documents/strategy/NoDrftSystems_Addendum_20_Essential_Business_Elements.docx`
  Role: business checklist and requirements framing
  Status: active reference
  Action: merge useful elements into canonical governance where repeated

- `90_source-documents/strategy/NoDrftSystems_Addendum_23_Multi_Product_Strategy.docx`
  Role: multi-product expansion thesis
  Status: active reference
  Action: use after the cash engine is stable, not before

## Commercial

- `90_source-documents/commercial/NoDrftSystems_Service_Pricing_Architecture_v1.docx`
  Role: current package architecture
  Status: governed by canonical layer
  Action: primary commercial reference pending founder approvals called out inside the file

- `90_source-documents/commercial/NoDrftSystems_Pricing_Summary_Sheet_2026.docx`
  Role: public baseline plus market-edition calibration summary
  Status: governed by canonical layer
  Action: use only with pricing governance; do not treat as standalone quote sheet

- `90_source-documents/commercial/NoDrftSystems_Pricing_Colombia_2026.pdf`
  Role: regional confidential pricing edition
  Status: reference only
  Action: confirm active use before quoting from it

- `90_source-documents/commercial/NoDrftSystems_Pricing_Jamaica_2026.pdf`
  Role: regional confidential pricing edition
  Status: reference only
  Action: confirm active use before quoting from it

- `90_source-documents/commercial/NoDrftSystems_Addendum_7_Project_Proposal_Template.docx`
  Role: proposal template
  Status: active reference
  Action: port to a controlled working template before regular use

- `90_source-documents/commercial/NoDrftSystems_Addendum_11_Invoice_Template.docx`
  Role: invoice template
  Status: active reference
  Action: keep aligned with payment terms in pricing governance

- `90_source-documents/commercial/NoDrftSystems_Addendum_19_Cost_Budget_Roadmap.docx`
  Role: cost roadmap
  Status: active reference
  Action: cross-check against real subscriptions before financial use

- `90_source-documents/commercial/NoDrftSystems_Addendum_21_Realistic_Cost_Analysis.docx`
  Role: cost realism overlay
  Status: active reference
  Action: reconcile with any live subscription stack before budgeting

## Legal

- `90_source-documents/legal/NoDrftSystems_Legal_Contract_Framework.docx`
  Role: legal architecture overview
  Status: needs human decision
  Action: confirm legal review before operational use

- `90_source-documents/legal/NoDrftSystems_Addendum_2_Master_Service_Agreement.docx`
  Role: master services agreement
  Status: needs human decision
  Action: licensed counsel review required before sending externally

- `90_source-documents/legal/NoDrftSystems_Addendum_3_Statement_of_Work.docx`
  Role: statement of work template
  Status: needs human decision
  Action: keep in sync with pricing governance and contract framework

- `90_source-documents/legal/NoDrftSystems_Addendum_4_NDA_Template.docx`
  Role: NDA template
  Status: needs human decision
  Action: licensed counsel review required before sending externally

## Operations

- `90_source-documents/operations/NoDrftSystems_Client_Delivery_Workflow.docx`
  Role: end-to-end delivery workflow
  Status: active reference
  Action: use with the client workspace template, not as a standalone system

- `90_source-documents/operations/NoDrftSystems_SOP_Library.docx`
  Role: SOP set
  Status: active reference
  Action: port high-frequency SOPs to working formats over time

- `90_source-documents/operations/NoDrftSystems_Template_Library.docx`
  Role: template inventory
  Status: active reference
  Action: do not rely on stated storage locations inside this file without updating them

- `90_source-documents/operations/NoDrftSystems_QA_Release_Controls.docx`
  Role: QA and release controls
  Status: active reference
  Action: align with the live release-gate skill and sign-off roles

- `90_source-documents/operations/NoDrftSystems_KPI_Framework.docx`
  Role: KPI definitions
  Status: active reference
  Action: only operationalize metrics with live data sources

- `90_source-documents/operations/NoDrftSystems_Hiring_Specialist_Framework.docx`
  Role: specialist hiring and bench design
  Status: active reference
  Action: use after the client-delivery engine is running

- `90_source-documents/operations/NoDrftSystems_Addendum_5_Client_Evaluation_Scorecard.docx`
  Role: qualification scoring form
  Status: governed by canonical layer
  Action: incorporate into the live intake packet and decision record

- `90_source-documents/operations/NoDrftSystems_Addendum_6_Pre_Engagement_Questionnaire.docx`
  Role: pre-engagement questionnaire
  Status: governed by canonical layer
  Action: treat as source material for the live intake system

- `90_source-documents/operations/NoDrftSystems_Addendum_8_QA_Multi_Pass_Checklist.docx`
  Role: QA checklist
  Status: active reference
  Action: keep for release-gate design and future template porting

- `90_source-documents/operations/NoDrftSystems_Addendum_9_Completion_Report_Template.docx`
  Role: completion report template
  Status: active reference
  Action: port to working format before delivery volume increases

- `90_source-documents/operations/NoDrftSystems_Addendum_10_Release_Sign_Off_Form.docx`
  Role: release sign-off form
  Status: active reference
  Action: bind to the real sign-off workflow and chosen e-sign method

- `90_source-documents/operations/NoDrftSystems_Addendum_18_Human_Handoff_Protocol.docx`
  Role: human escalation and handoff rules
  Status: active reference
  Action: align with the live skill matrix and review system

- `90_source-documents/operations/NoDrftSystems_Client_Intake_Form.pdf`
  Role: export snapshot of intake
  Status: derived export
  Action: preserve only as reference; do not treat as operative intake surface

## AI Architecture

- `90_source-documents/ai-architecture/NoDrftSystems_Skills_Library_v1.md`
  Role: normalized role-behavior source for the pre-expansion 45-agent baseline — primary objective, bounded scope, core duties, inputs, outputs, escalation triggers, confidence floors, and evidence requirements
  Status: active reference
  Action: use as the role-behavior source when regenerating department skill packs for the original 45 agents; note that the 10 engineering expansion roles approved 2026-04-15 are not in this file — their role behavior is defined in engineering-expansion-approval-and-hire-list-2026-04-15.md and their skill packs in 03_agent-skills/department-skill-pack/; note also that the internal count summary (43 AI agents, 32 Tier 2) is incorrect — actual content contains 45 AI agents (37 Tier 2)
  Path: archived to repository from uncontrolled Downloads location on 2026-04-14

- `90_source-documents/ai-architecture/NoDrftSystems_AI_Agent_Architecture.docx`
  Role: early agent architecture baseline
  Status: reference only
  Action: use conceptually; current activation rules live in the canonical AI operating architecture

- `90_source-documents/ai-architecture/NoDrftSystems_Claude_Code_Execution_System.docx`
  Role: code execution model reference
  Status: active reference
  Action: align with the current tool stack before operational use

- `90_source-documents/ai-architecture/NoDrftSystems_Addendum_12_AI_Sovereignty_Protocol.docx`
  Role: AI use and sovereignty policy
  Status: active reference
  Action: preserve as policy input; do not expose publicly without review

- `90_source-documents/ai-architecture/NoDrftSystems_Addendum_14_AI_Architecture_Master.docx`
  Role: master AI architecture addendum
  Status: active reference
  Action: keep aligned with actual deployed roles, approved departments, and skills

- `90_source-documents/ai-architecture/NoDrftSystems_Addendum_15_Tier1_Supervisor_Prompts.docx`
  Role: raw prompt source for the supervisor layer
  Status: reference only
  Action: treat as source material, not as a live skill system

- `90_source-documents/ai-architecture/NoDrftSystems_Addendum_16_Tier2_Domain_Prompts.docx`
  Role: raw prompt source for domain agents
  Status: reference only
  Action: mine selectively when future skills are created

- `90_source-documents/ai-architecture/NoDrftSystems_Addendum_17_Tier3_Specialist_Prompts.docx`
  Role: raw prompt source for specialist agents
  Status: reference only
  Action: mine selectively; do not treat as deployment-ready

- `90_source-documents/ai-architecture/NoDrftSystems_Addendum_22_AI_Platform_Tool_Stack.docx`
  Role: AI and tool subscription planning
  Status: governed by canonical layer
  Action: use alongside the tool stack recommendation file, not by itself

- `01_system/ai-governance/people-roles-governance-engineering-cell-report-2026-04-15.md`
  Role: PRG diagnostic and redesign recommendation for engineering-cell quality failure
  Status: active reference
  Action: use for role-redesign, prompt-audit, tooling-audit, and replacement-decision work pending Founder and ARE approval

- `01_system/ai-governance/current-high-value-coding-techniques-research-2026-04-15.md`
  Role: current-source research memo on coding, prompt, tool, audit, and standards techniques that fit the precision engineering model
  Status: active reference
  Action: use to guide technical standards, prompt governance, tool approvals, engineering-role redesign, and merge-gate policy decisions

- `01_system/ai-governance/engineering-standards-policy-2026-04-15.md`
  Role: formal engineering standards policy for governed delivery, prompt control, tool control, evidence requirements, and reviewer separation
  Status: canonical governance
  Action: use as the primary engineering-quality control document once Founder and ARE approve activation

- `01_system/ai-governance/codeowners-merge-gate-enforcement-spec-2026-04-15.md`
  Role: repository enforcement specification for `CODEOWNERS`, review routing, required checks, and merge controls
  Status: canonical governance
  Action: use when configuring governed repositories and branch-control rules after Founder and ARE approval

- `01_system/ai-governance/engineering-expansion-approval-and-hire-list-2026-04-15.md`
  Role: approved internal directive recording the non-publishing rule, assistant and specialist expansion, and the new technical hire list
  Status: canonical governance
  Action: use as the expansion authority for engineering-bench growth, skill-pack creation, and registry updates

- `01_system/ai-governance/mandatory-build-activation-protocol-2026-04-15.md`
  Role: mandatory build-start control protocol covering classification, minimum role activation, reviewer separation, evidence gates, and stop conditions
  Status: canonical governance
  Action: use before any governed technical build is allowed to begin once Founder and ARE approve activation

- `01_system/ai-governance/exceptional-build-escalation-protocol-2026-04-15.md`
  Role: exceptional technical-incident escalation protocol covering multi-domain activation, maximum technical escalation, reassessment, and stand-down
  Status: canonical governance
  Action: use when a build failure or release incident exceeds the normal classified build model and requires temporary multi-domain escalation

- `01_system/ai-governance/build-context-engineering-standard-2026-04-15.md`
  Role: context-engineering standard defining the governed build prompt system, prompt-library requirements, evidence-ledger discipline, Plan Mode, verification loop, structured completion reporting, and fail-closed release behavior
  Status: canonical governance
  Action: use to design and govern all build prompt assets, execution skills, and completion controls for technical delivery

- `01_system/ai-governance/new-agent-activation-readiness-record-2026-04-17.md`
  Role: activation readiness record for the 4 new agents (SRA, VDA, LCA, SMA) added under the skills optimization directive
  Status: active reference
  Action: use before first activation of any new role in a governed build; requires Founder and ARE sign-off before active use

- `01_system/ai-governance/build-prompt-library/00-root-contract-template.md`
  Role: canonical template for the persistent root contract used across governed technical builds
  Status: canonical governance
  Action: instantiate per repository or governed build domain before active use

- `01_system/ai-governance/build-prompt-library/01-master-build-prompt-template.md`
  Role: reusable master build prompt template for governed execution under the root contract and scoped rules
  Status: canonical governance
  Action: use as the default controlled entry prompt for governed technical build work

- `01_system/ai-governance/build-prompt-library/02-page-level-build-prompt-templates.md`
  Role: page and route specific build prompt set for implementation, repair, and trust-sensitive surfaces
  Status: canonical governance
  Action: use when surface-level differences materially affect implementation, disclosure, or verification requirements

- `01_system/ai-governance/build-prompt-library/03-role-specific-review-prompt-templates.md`
  Role: bounded review prompt set for engineering, architecture, accessibility, security, deployment, and QA evidence review
  Status: canonical governance
  Action: use to preserve reviewer specificity and prevent generic review theater

- `01_system/ai-governance/build-prompt-library/04-bilingual-qa-prompt-templates.md`
  Role: multilingual parity QA prompt set for semantic, structural, disclosure, and UI-fit verification
  Status: canonical governance
  Action: use on parity-sensitive multilingual surfaces before advancement

- `01_system/ai-governance/build-prompt-library/05-privacy-disclosure-qa-prompt-templates.md`
  Role: privacy and disclosure QA prompt set for trust-sensitive surfaces with omission risk
  Status: canonical governance
  Action: use when data collection, consent, disclosure timing, or trust language is material

- `01_system/ai-governance/build-prompt-library/06-evidence-ledger-template.md`
  Role: mandatory control-record template for governed build evidence and reviewer-relevant history
  Status: canonical governance
  Action: use as the build evidence ledger on governed technical work

- `01_system/ai-governance/build-prompt-library/07-structured-completion-report-template.md`
  Role: mandatory structured close-out template for governed technical builds
  Status: canonical governance
  Action: use before release advancement or formal reviewer handoff

- `01_system/ai-governance/build-control-assets/01-client-governance-profile-template.md`
  Role: canonical client governance record template used to save, categorize, and link each client to its technical control set
  Status: canonical governance
  Action: instantiate one active profile per governed client and link it to the correct root contract, scoped rules, prompts, tools, and reviewer path

- `01_system/ai-governance/build-control-assets/02-scoped-rules-template.md`
  Role: canonical narrowing-rule template linking root contracts to specific clients, repositories, modules, routes, and sensitivity surfaces
  Status: canonical governance
  Action: instantiate per client, repository, module, route, or incident where narrower execution boundaries are required

- `01_system/ai-governance/build-control-assets/03-activation-and-handoff-checklist-template.md`
  Role: operational checklist template for Gate 0 through Gate 3A activation and handoff control
  Status: canonical governance
  Action: instantiate on governed builds to verify relevant and capable agent assignment and explicit cross-role handoff discipline

- `01_system/ai-governance/build-control-assets/04-canonical-prompt-inventory-template.md`
  Role: source-of-truth template for the governed prompt inventory
  Status: canonical governance
  Action: populate with every approved live prompt instance used in governed delivery

- `01_system/ai-governance/build-control-assets/05-canonical-tool-inventory-template.md`
  Role: source-of-truth template for the governed tool and service inventory
  Status: canonical governance
  Action: populate with every approved live tool or service used in governed delivery

- `01_system/ai-governance/build-control-assets/06-incident-record-template.md`
  Role: declaration and containment record template for E1, E2, and E3 escalation events
  Status: canonical governance
  Action: instantiate whenever exceptional build escalation is declared

- `01_system/ai-governance/build-control-assets/07-repository-agent-capability-map-template.md`
  Role: routing map template linking repositories and surfaces to relevant and capable agents, specialist triggers, and reviewer paths
  Status: canonical governance
  Action: populate per governed repository to support activation and handoff discipline

- `01_system/ai-governance/explicit-protocol-control-sweep-2026-04-15.md`
  Role: audit record of explicit versus implied operating controls across agents, roles, skills, prompts, and governance artifacts; last updated 2026-04-16 to reflect all 55 skill packs verified complete and secondary gaps (workspace AGENTS.md cell definition, CHSA routing matrix, DESA confidence floor, manifest date) resolved
  Status: active reference
  Action: use to track fixed versus unresolved control gaps; primary remaining gaps are live instantiation of client governance profiles, prompt/tool inventories, and repository-agent capability maps

## Brand and Web

- `90_source-documents/brand-web/NoDrftSystems_Brand_Identity_Framework.docx`
  Role: brand foundation
  Status: active reference
  Action: preserve for design and copy alignment

- `90_source-documents/brand-web/NoDrftSystems_Copy_System.docx`
  Role: messaging and copy framework
  Status: active reference
  Action: reuse for public-facing copy only after commercial terms are locked

- `90_source-documents/brand-web/NoDrftSystems_Website_Architecture.docx`
  Role: website architecture source
  Status: active reference
  Action: align it with pricing governance before publishing any pricing page

- `02_client-system/client-intake-form.html`
  Role: working intake surface and local packet generator
  Status: governed by canonical layer
  Action: use as the live intake artifact only with manual record storage or a connected operations database; it is not a repository-side system of record

## Research

- `90_source-documents/research/NoDrftSystems_Competitor_Analysis.docx`
  Role: competitor reference
  Status: reference only
  Action: refresh before using for positioning claims

## Reports and Derived Exports

- `90_source-documents/reports/NoDrftSystems_Operational_System_Report_v1.0.docx`
  Role: consolidated internal audit
  Status: derived export
  Action: keep as historical audit output; do not let it replace canonical governance

- `90_source-documents/reports/NoDrftSystems — Full System Audit Report.pdf`
  Role: PDF export of audit material
  Status: derived export
  Action: preserve only for sharing or archival reference

- `90_source-documents/reports/NoDrftSystems — Critical Deficiencies Register.pdf`
  Role: PDF export of deficiency register
  Status: derived export
  Action: preserve only for sharing or archival reference

## Repository Controls

- `.github/CODEOWNERS`
  Role: path-ownership enforcement file routing pull requests to the correct review teams by repository layer
  Status: canonical governance
  Action: update when repository structure changes or new team domains are added; GitHub teams must exist in the org before this file is enforceable

- `.github/BRANCH-PROTECTION-NOTES.md`
  Role: human-readable record of required branch protection settings for the main branch; documents controls that must be configured via GitHub UI or API
  Status: canonical governance
  Action: apply the documented settings via GitHub > Settings > Branches or Rulesets before enforcing the merge-gate model

- `.github/PULL_REQUEST_TEMPLATE.md`
  Role: structured pull request intake template enforcing objective, scope, evidence, and risk fields on all governed PRs
  Status: canonical governance
  Action: keep aligned with the evidence requirements in mandatory-build-activation-protocol-2026-04-15.md and codeowners-merge-gate-enforcement-spec-2026-04-15.md

- `02_client-system/templates/client-workspace-template/04_execution/agent-routing-note.md`
  Role: Gate 0A fill-in-the-blank template for the agent routing note required before build packet approval; defines surface map, role-to-surface assignments, capability check, handoff routing plan, and MOA/PMA/RCA sign-off fields
  Status: canonical governance
  Action: copy into each governed workspace's 04_execution/ folder at project open; complete before the build packet is approved

## Source Archive Index

- `90_source-documents/README.md`
  Role: master index and authority-rule document for the 90_source-documents archive; documents binary-lock status, conversion priorities, directory inventory, and cross-reference table to live governance equivalents
  Status: active reference
  Action: read before adding or modifying files in 90_source-documents; it defines which binary files are pending conversion and maps each source document to its live governance counterpart

## Assets

- `90_source-documents/assets/social-og.png`
  Role: social preview asset
  Status: active reference
  Action: use when the public web layer is rebuilt or published

## Internal Products

### Peak Equity Optimizer (PEO)

- `04_products/PEO/00_governance/build-activation-record.md`
  Role: canonical build activation record for PEO covering Gates 0, 0A, 1, 1A, and 2 — build classification, agent cell, surface mapping, build packet, plan mode output, and Gate 2 governance checklist
  Status: canonical governance
  Action: load before any PEO build phase begins; this is the primary activation control document for the PEO build

- `04_products/PEO/00_governance/agent-routing-note.md`
  Role: Gate 0A deliverable — signed agent cell with justification per role, phase-by-phase handoff sequence, evidence requirements between handoffs, and capability gap closure plan
  Status: canonical governance
  Action: load alongside build-activation-record.md; requires Founder and ARE sign-off before Gate 3 (execution) is unlocked

- `04_products/PEO/00_governance/root-contract.md`
  Role: persistent non-negotiable build rules for PEO covering formula governance, route boundaries, data quality, security/privacy, bilingual parity, accessibility, reviewer separation, confidentiality, evidence requirements, and binding spec corrections
  Status: canonical governance
  Action: persist across all PEO build phases; no build prompt may override or weaken these rules

- `04_products/PEO/00_governance/scoped-rules.md`
  Role: PEO-specific scoped rules covering roles and access model, formula defaults, formula scoping per route, comp logic rules, confidence scoring rules, kill-switch library, event instrumentation schema, design tokens, data model entities, and open items register
  Status: canonical governance
  Action: load for every PEO build phase; subordinate to root-contract.md — may not weaken it

- `04_products/PEO/00_governance/pricing-declaration.md`
  Role: canonical pricing declaration for PEO covering tier amounts, billing model, commercial control rules, and open item O-006 closure
  Status: canonical governance
  Action: use before implementing any pricing-linked UI, paywall, upgrade prompt, or public pricing page for PEO

- `04_products/PEO/00_governance/open-items-tracker.md`
  Role: standing register of unresolved vendor and process selections for PEO (O-002, O-003, O-005)
  Status: canonical governance
  Action: review before proceeding past any phase blocked by an open item; escalate to PMA + Founder if an open item is encountered during implementation

- `04_products/PEO/00_governance/evidence-ledger.md`
  Role: governed build evidence and reviewer-relevant history for PEO
  Status: canonical governance
  Action: review at each gate to confirm evidence requirements are met before advancement

- `04_products/PEO/00_governance/phase-6-activation-and-handoff-checklist.md`
  Role: instantiated Gate 0 through Gate 3A activation checklist for PEO Phase 6 Class 4 work
  Status: canonical governance
  Action: load with the Phase 6 build packet to confirm no-start conditions, handoff targets, and pending sign-offs before Gate 3 execution

- `04_products/PEO/00_governance/canonical-prompt-inventory.md`
  Role: PEO-local inventory of the approved Phase 6 governed prompt stack
  Status: canonical governance
  Action: use to confirm which governed prompt instance is active for Phase 6 and whether Founder/ARE approval is recorded

- `04_products/PEO/00_governance/canonical-tool-inventory.md`
  Role: PEO-local inventory of approved tools and services used in governed delivery
  Status: canonical governance
  Action: load before Phase 6 execution to confirm access scope, deploy power, and credential rules for the active tool surface

- `04_products/PEO/00_governance/repository-agent-capability-map.md`
  Role: repository-specific routing map for relevant and capable agent assignment across PEO technical surfaces
  Status: canonical governance
  Action: use during Gate 0A and Gate 2 to confirm the active Class 4 cell and adjacent specialist triggers

- `04_products/PEO/01_specs/architecture-boundaries.md`
  Role: Phase 1 deliverable — service decomposition, API boundaries, authorization model, data model skeleton, and architecture decision log for PEO
  Status: active reference
  Action: use as the implementation reference for service boundaries and API contracts in Phases 2–6

- `04_products/PEO/01_specs/phase-1-completion-report.md`
  Role: Gate 4A structured completion report for Phase 1
  Status: active reference
  Action: review as part of the gated handoff from Phase 1 to Phase 2

- `04_products/PEO/01_specs/phase-2-completion-report.md`
  Role: Gate 4A structured completion report for Phase 2
  Status: active reference
  Action: review as part of the gated handoff from Phase 2 to Phase 3

- `04_products/PEO/01_specs/phase-3-completion-report.md`
  Role: Gate 4A structured completion report for Phase 3
  Status: active reference
  Action: review as part of the gated handoff from Phase 3 to Phase 4

- `04_products/PEO/01_specs/phase-6-build-packet.md`
  Role: prepared Gate 1 build packet for Phase 6 covering marketplace, admin, deployment, inherited Phase 6-adjacent APIs, Class 4 active cell, evidence requirements, and open gates
  Status: active reference
  Action: load before any Phase 6 execution begins; this packet is prepared but still requires Founder and ARE approval before Gate 3

- `04_products/PEO/01_specs/spec-index.md`
  Role: index of all 24 primary source documents from C:\Users\nkwtr\Downloads\PEOSYS with binding corrections where the spec pack PDF conflicts with DOCX sources, resolved open items, and true remaining open items register
  Status: active reference
  Action: load at each build phase to confirm which source documents apply and to enforce binding corrections; do not implement from the spec pack PDF alone

- `04_products/PEO/02_source-ref/README.md`
  Role: pointer to primary source documents at C:\Users\nkwtr\Downloads\PEOSYS with full file inventory
  Status: active reference
  Action: use to locate canonical source files; recommend migrating PEOSYS files into repo before Phase 2 execution
