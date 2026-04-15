# 90_source-documents — Source Document Archive

## Purpose

This directory preserves the original source documents that fed the live markdown-based operational system in `01_system/`, `02_client-system/`, and `03_agent-skills/`.

**Authority rule:** The markdown governance files in `01_system/` and the approved registries are the **live control documents**. The files in `90_source-documents/` are **reference archives**. If a `.docx` or PDF contradicts a markdown file in `01_system/`, the markdown file governs.

## Binary-lock warning

~90% of files here are `.docx` or PDF. Git cannot diff them, search tools cannot index their contents, and AI agents cannot edit them directly. This creates maintenance burden and drift risk.

**Conversion priority:**
1. **High** — `commercial/NoDrftSystems_Service_Pricing_Architecture_v1.docx` (operative pricing source)
2. **High** — `legal/NoDrftSystems_Legal_Contract_Framework.docx` and addendums (live contract templates)
3. **Medium** — `operations/NoDrftSystems_SOP_Library.docx` and `NoDrftSystems_Client_Delivery_Workflow.docx`
4. **Low** — Strategy and research documents (reference only, less frequent updates)
5. **Low** — Audit PDFs (`reports/NoDrftSystems - Critical Deficiencies Register.pdf`, `reports/NoDrftSystems - Full System Audit Report.pdf`)

When converting, create a markdown equivalent in the appropriate `01_system/` or `02_client-system/` directory, tag the `.docx`/PDF as `archive-export` in the document registry, and update `01_system/registry/document-registry.md`.

## Addendum index

The Business Plan references 23 addendums. They are located across 6 subdirectories by subject matter.

| # | Title | Location | Status |
|---|-------|----------|--------|
| 1 | Organizational Architecture Resolution | `strategy/NoDrftSystems_Addendum_1_Organizational_Architecture_Resolution.docx` | Reference |
| 2 | Master Service Agreement | `legal/NoDrftSystems_Addendum_2_Master_Service_Agreement.docx` | Operative source |
| 3 | Statement of Work | `legal/NoDrftSystems_Addendum_3_Statement_of_Work.docx` | Operative source |
| 4 | NDA Template | `legal/NoDrftSystems_Addendum_4_NDA_Template.docx` | Operative source |
| 5 | Client Evaluation Scorecard | `operations/NoDrftSystems_Addendum_5_Client_Evaluation_Scorecard.docx` | Reference |
| 6 | Pre-Engagement Questionnaire | `operations/NoDrftSystems_Addendum_6_Pre_Engagement_Questionnaire.docx` | Reference |
| 7 | Project Proposal Template | `commercial/NoDrftSystems_Addendum_7_Project_Proposal_Template.docx` | Operative source |
| 8 | QA Multi-Pass Checklist | `operations/NoDrftSystems_Addendum_8_QA_Multi_Pass_Checklist.docx` | Superseded by `01_system/ai-governance/build-control-assets/` |
| 9 | Completion Report Template | `operations/NoDrftSystems_Addendum_9_Completion_Report_Template.docx` | Superseded by `01_system/ai-governance/build-prompt-library/07-structured-completion-report-template.md` |
| 10 | Release Sign-Off Form | `operations/NoDrftSystems_Addendum_10_Release_Sign_Off_Form.docx` | Reference |
| 11 | Invoice Template | `commercial/NoDrftSystems_Addendum_11_Invoice_Template.docx` | Operative source |
| 12 | AI Sovereignty Protocol | `ai-architecture/NoDrftSystems_Addendum_12_AI_Sovereignty_Protocol.docx` | Reference |
| 13 | Tax Optimization Plan | `strategy/NoDrftSystems_Addendum_13_Tax_Optimization_Plan.docx` | Reference |
| 14 | AI Architecture Master | `ai-architecture/NoDrftSystems_Addendum_14_AI_Architecture_Master.docx` | Reference |
| 15 | Tier 1 Supervisor Prompts | `ai-architecture/NoDrftSystems_Addendum_15_Tier1_Supervisor_Prompts.docx` | Superseded by `01_system/ai-governance/build-prompt-library/` |
| 16 | Tier 2 Domain Prompts | `ai-architecture/NoDrftSystems_Addendum_16_Tier2_Domain_Prompts.docx` | Superseded by `03_agent-skills/department-skill-pack/` |
| 17 | Tier 3 Specialist Prompts | `ai-architecture/NoDrftSystems_Addendum_17_Tier3_Specialist_Prompts.docx` | Superseded by `03_agent-skills/department-skill-pack/` |
| 18 | Human Handoff Protocol | `operations/NoDrftSystems_Addendum_18_Human_Handoff_Protocol.docx` | Reference |
| 19 | Cost Budget Roadmap | `commercial/NoDrftSystems_Addendum_19_Cost_Budget_Roadmap.docx` | Reference |
| 20 | Essential Business Elements | `strategy/NoDrftSystems_Addendum_20_Essential_Business_Elements.docx` | Reference |
| 21 | Realistic Cost Analysis | `commercial/NoDrftSystems_Addendum_21_Realistic_Cost_Analysis.docx` | Reference |
| 22 | AI Platform Tool Stack | `ai-architecture/NoDrftSystems_Addendum_22_AI_Platform_Tool_Stack.docx` | Reference |
| 23 | Multi-Product Strategy | `strategy/NoDrftSystems_Addendum_23_Multi_Product_Strategy.docx` | Reference |

## Directory inventory

### `ai-architecture/`
- `NoDrftSystems_AI_Agent_Architecture.docx` — Original 3-tier supervisor model and 43-agent roster
- `NoDrftSystems_Claude_Code_Execution_System.docx` — Claude Code execution rules
- `NoDrftSystems_Skills_Library_v1.md` — Canonical source for agent definitions (now distributed into `03_agent-skills/` and `01_system/registry/`)
- Addendums 12, 14, 15, 16, 17, 22

### `assets/`
- `social-og.png` — Web social image. *Consider moving to `brand-web/` or a dedicated media directory.*

### `brand-web/`
- `NoDrftSystems_Brand_Identity_Framework.docx`
- `NoDrftSystems_Copy_System.docx`
- `NoDrftSystems_Website_Architecture.docx`

### `commercial/`
- `NoDrftSystems_Service_Pricing_Architecture_v1.docx` — **Operative pricing source**
- `NoDrftSystems_Pricing_Colombia_2026.pdf`
- `NoDrftSystems_Pricing_Jamaica_2026.pdf`
- `NoDrftSystems_Pricing_Summary_Sheet_2026.docx`
- Addendums 7, 11, 19, 21

### `legal/`
- `NoDrftSystems_Legal_Contract_Framework.docx` — **Operative contract source**
- Addendums 2, 3, 4

### `operations/`
- `NoDrftSystems_Client_Delivery_Workflow.docx`
- `NoDrftSystems_SOP_Library.docx`
- `NoDrftSystems_QA_Release_Controls.docx`
- `NoDrftSystems_Client_Intake_Form.pdf`
- `NoDrftSystems_Hiring_Specialist_Framework.docx`
- `NoDrftSystems_KPI_Framework.docx`
- `NoDrftSystems_Template_Library.docx`
- Addendums 5, 6, 8, 9, 10, 18

### `reports/`
- `NoDrftSystems_Operational_System_Report_v1.0.docx`
- `NoDrftSystems - Critical Deficiencies Register.pdf`
- `NoDrftSystems - Full System Audit Report.pdf`

### `research/`
- `NoDrftSystems_Competitor_Analysis.docx`

### `strategy/`
- `NoDrftSystems_2026_Business_Plan_v2_Updated.docx`
- `NoDrftSystems_Business_Foundation.docx`
- `NoDrftSystems_Investor_Package.docx`
- `NoDrftSystems_Master_Strategic_Alignment_Pack.docx`
- Addendums 1, 13, 20, 23

## Maintenance rules

1. **Do not edit `.docx` or PDF files in place.** Convert to markdown if the content needs to become a living source.
2. **When converting,** place the markdown file in the appropriate operational directory (`01_system/`, `02_client-system/`, or `03_agent-skills/`), not here.
3. **Update the document registry** whenever a source document is converted, superseded, or reclassified.
4. **Preserve the original export** in this directory for audit and legal reference.
5. **Tag the status** in the registry: `operative`, `superseded`, `archive-export`, or `reference-only`.

## Cross-reference to live governance

| This archive | Live equivalent |
|--------------|-----------------|
| `ai-architecture/NoDrftSystems_Skills_Library_v1.md` | `01_system/registry/final-approved-department-and-agent-registry.md` + `03_agent-skills/department-skill-pack/` |
| `commercial/NoDrftSystems_Service_Pricing_Architecture_v1.docx` | `01_system/commercial/pricing-governance.md` |
| `operations/NoDrftSystems_Client_Intake_Form.pdf` | `02_client-system/client-intake-form.html` |
| `operations/NoDrftSystems_SOP_Library.docx` | Partially distributed into `01_system/ai-governance/` and workspace templates |
| `operations/NoDrftSystems_QA_Release_Controls.docx` | `01_system/ai-governance/engineering-standards-policy-2026-04-15.md` |
