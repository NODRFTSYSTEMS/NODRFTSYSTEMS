---
document: NoDrftSystems Master Canonical Tool Inventory
status: Canonical governance
version: 1.0
date: 2026-05-02
owner: TACA (Regine) + Founder
authority: 01_system/ai-governance/build-control-assets/05-canonical-tool-inventory-template.md
confidentiality: Proprietary internal — no external publishing approved
---

# Canonical Tool Inventory — NoDrftSystems Master System

Scope: all MCP servers and governed tooling active at the master system level (`.claude/settings.json`).
This inventory does not cover product-level tool inventories — see `04_products/[PRODUCT]/00_governance/canonical-tool-inventory.md` for product-scoped entries.

**Governance rule:** Every new MCP server must be added to this inventory before activation in `.claude/settings.json`. TACA review required. ARE approval required before production use. Reference: `01_system/ai-governance/mcp-architecture-direction-2026-04-19.md`.

---

## MCP Servers

| Tool or Service | Owner | Status | Approved Use Case | Client Profile or Scope | Repository or Surface | Access Scope | Write or Deploy Power | Credential Rule | Data Exposure Risk | Fallback Path | Last Review Date | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nodrft-governance MCP (`mcpServers.nodrft-governance`) | Founder + ARE | Active — TACA reviewed, approved for production use | Governance context serving, task routing, authority checks, scope-drift detection, escalation log formatting | Internal — NoDrftSystems master workspace only | `04_products/nodrft-governance-mcp/` | Read-only; 17 allowlisted governance docs | No write or deploy power — read-only by design | No credentials required; `NODRFT_ROOT` env var points to workspace root | Low — no client PII; internal governance docs only | Agents fall back to direct file reads via canonical-sources path list | 2026-05-02 | Decision Log 2026-05-02-001; 53/53 tests passing; path traversal blocked in markdown-loader.ts |
| GitHub MCP (`mcpServers.github`) | TACA + ARE | Active — PAT required to enable | Repository context loading, CODEOWNERS enforcement, PR review, pattern inventory | Internal — NoDrftSystems repositories; no client repos without separate approval | Any GitHub repository the PAT has access to | Repository read; PR read; org read | No deploy power — read/write dependent on PAT scopes granted | `GITHUB_PERSONAL_ACCESS_TOKEN` in `.claude/settings.json` env block; minimum scopes: `repo` (read), `read:org`; never hardcoded in source | Medium — repository contents visible to Claude; do not grant access to client repositories without Founder approval | Agents fall back to direct file reads (RCA, SEA, TVA, DRA pre-MCP mode) | 2026-05-02 | mcp-architecture-direction Phase 1 Priority 1; requires TACA formal review before production client-session use |
| Figma MCP | VDA + DAA | Active | Design-to-code context, component references, visual direction | Internal design work + client build phases where Figma is the design surface | Figma files and design systems | Design file read; component read | No deploy power | Figma API credentials managed via MCP server config | Medium — design files may contain client-confidential brand assets | Agents fall back to screenshot review and manual design inspection | 2026-04-19 | Listed in mcp-architecture-direction as currently active |
| Gmail MCP | OOA + CCA | Active | Email as outreach and client communication surface | Internal — NoDrftSystems outreach and client communications only | Gmail account | Email read + send | Email send — all outreach and client-facing sends require Founder or CCA review before transmission | OAuth credentials managed via MCP server config | High — email contains client PII and commercial data; strict scope required | Agents fall back to draft-only mode; no sends without human review | 2026-04-19 | Listed in mcp-architecture-direction as currently active; client PII — LCA privacy review on file required |
| Google Calendar MCP | DCPA + COA | Active | Scheduling, meeting prep, deadline tracking | Internal — NoDrftSystems calendar only | Google Calendar account | Calendar read + event write | Event create/modify — calendar changes require human confirmation | OAuth credentials managed via MCP server config | Medium — calendar contains client meeting details | Agents fall back to manual scheduling coordination | 2026-04-19 | Listed in mcp-architecture-direction as currently active |
| Linear MCP (`mcpServers.linear`) | PSA + PMA + MOA | Configured — awaiting credentials | Task tracking, milestone visibility, blocker logging, sprint planning | Internal — NoDrftSystems project tracking only | Linear workspace | Issue read/write; project read; team read | Issue create/update — human confirmation required for client-visible tasks | `LINEAR_API_KEY` in `.claude/settings.json`; replace placeholder to activate | Medium — issue titles may contain client names and project details | Agents fall back to manual task tracking and status updates | 2026-05-05 | mcp-architecture-direction Phase 1 Priority 2; credential setup guide: `01_system/operations/mcp-credential-setup.md` |
| Supabase MCP (`mcpServers.supabase`) | DSS + SEA + BLS | Configured — awaiting credentials + LCA review | Database schema access, migration review, data integrity checks, row-level query support | Internal — NoDrftSystems projects only; no client DBs without separate privacy review | Supabase project | Schema read; data read; migration read | No write without ARE approval | `SUPABASE_ACCESS_TOKEN` + `SUPABASE_PROJECT_ID` in `.claude/settings.json`; replace placeholders to activate | High — schema and row samples may contain client PII | Agents fall back to direct schema documentation and manual query review | 2026-05-05 | mcp-architecture-direction Phase 1 Priority 3; LCA privacy review required before client data access; credential setup guide: `01_system/operations/mcp-credential-setup.md` |

---

## Pending — Phase 1 Additions (mcp-architecture-direction Priority 2–4)

| Integration | Priority | Status | Blocking Condition |
| --- | --- | --- | --- |
| Notion MCP (or equivalent) | 4 | Not yet added | Tool selection pending; TACA review required before activation |

---

## Change History

| Date | Change | Authority |
| --- | --- | --- |
| 2026-05-02 | Document created; nodrft-governance MCP and GitHub MCP entries added; Figma, Gmail, Google Calendar backfilled from mcp-architecture-direction-2026-04-19.md | Founder (Decision Log 2026-05-02-001) |
| 2026-05-05 | Linear MCP and Supabase MCP added as configured (awaiting credentials); canonical source count reconciled to 17; global-operations-matrix.md created | Founder + TACA + ARE |
