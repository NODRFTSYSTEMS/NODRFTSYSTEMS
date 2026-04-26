# NoDrftSystems Operating Repository

This repository is organized into five working layers:

- `01_system/`: canonical governance, control, pricing, registry, and operating rules
- `02_client-system/`: intake, qualification, workspace bootstrapping, and reusable client-lifecycle assets
- `03_agent-skills/`: workflow-bound skills for repeatable AI execution
- `04_products/`: internal NoDrftSystems product builds (governed via Mandatory Build Activation Protocol)
- `90_source-documents/`: preserved raw source exports and historical references

## Internal Products

All products are owned and built by **NoDrftSystems** (`https://github.com/NODRFTSYSTEMS/`).

- `04_products/CASACLARO/` — CasaClaro: marketplace platform (active build, owned by NoDrftSystems)
- `04_products/PEO/` — Peak Equity Optimizer: trust-based real-estate intelligence platform (6-phase build, Class 3, activation record at `04_products/PEO/00_governance/`)

Working rules:

- Use `01_system/operations/repository-control-plane.md` as the current repository operating map.
- Use `01_system/registry/document-registry.md` before treating any file as authoritative.
- Treat `01_system/repository-audit-2026-04-13.md` as the baseline historical audit, not the current control document.
- Use `02_client-system/client-intake-operating-system.md` and `02_client-system/templates/client-workspace-template/WORKSPACE-BOOTSTRAP.md` for every new engagement.
- Use `03_agent-skills/skill-loading-matrix.md` before inventing ad hoc agent prompts or workflow bundles.
- Use `03_agent-skills/skill-pack-build-specification.md` before generating department or agent-specific skills.
- Treat raw `docx` and `pdf` files as source material unless the document registry explicitly promotes them.

Recommended reading order:

1. `01_system/operations/repository-control-plane.md`
2. `01_system/registry/document-registry.md`
3. `01_system/ai-governance/ai-native-operating-architecture.md`
4. `01_system/commercial/pricing-governance.md`
5. `01_system/commercial/tool-stack-recommendations.md`
6. `02_client-system/client-intake-operating-system.md`
7. `02_client-system/templates/client-workspace-template/WORKSPACE-BOOTSTRAP.md`
8. `03_agent-skills/skill-loading-matrix.md`
9. `03_agent-skills/skill-pack-build-specification.md`

## Mandatory Activation Protocol

For any substantial build, review, or deployment task, do not begin execution until the active workspace has loaded and is following:

1. `01_system/operations/repository-control-plane.md`
2. `02_client-system/templates/client-workspace-template/WORKSPACE-BOOTSTRAP.md`
3. `03_agent-skills/skill-loading-matrix.md`
4. `01_system/registry/final-approved-department-and-agent-registry.md`

Required startup declaration for substantial work:

- governance files loaded
- active named agents
- current project phase
- required artifact trail for the phase
- missing inputs or blocking exceptions

Build cell composition is governed dynamically by `01_system/ai-governance/mandatory-build-activation-protocol-2026-04-15.md`. Classify the build, assess the active agent capability set, and assemble the minimum viable cell per the protocol. RCA and TVA are mandatory on every governed build. Additional specialists (SAA, FIS, BLS, IDS, DSS, PIS, POS, ASIS) activate conditionally by build class.

Escalation only:

- `Desmond / HHC`

Hard gate:

- No build, review, or deployment may proceed unless the build is classified, the minimum cell is assigned, a Gate 0A agent routing note is recorded in the workspace artifacts, and QAS release status is explicitly recorded.
