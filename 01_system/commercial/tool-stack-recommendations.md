# Tool Stack Recommendations

## Objective

Define the minimum viable strategic tool stack for a lean, AI-augmented operator model that supports multiple clients, multiple project types, and controlled execution without unnecessary overlap.

## Core Principle

Standardize on one tool per operational layer unless a second tool solves a clearly different problem. Tool sprawl is a margin leak.

## Core Stack

### 1. LLM Execution Layer

- Standard: keep the current multi-model access, but standardize roles instead of adding more providers.
- Recommended role split:
  - Codex / ChatGPT: execution, code change, structured synthesis
  - Claude: long-form reasoning, strategic writing, review pressure
- Why core:
  - this repository is already designed around AI-assisted execution
  - adding more frontier providers does not fix the real issue, which is workflow discipline
- Deployment rule:
  - maintain a written role map by task, not by preference

### 2. GitHub

- Use for:
  - canonical repository storage
  - change history
  - issues, projects, and milestone tracking
  - pull-request based review for any code or canonical operating doc changes
- Why core:
  - repo-native version control is the only reliable answer to document drift
  - GitHub already supports issue tracking and project views, so a second engineering PM tool is unnecessary early

### 3. Google Workspace

- Use for:
  - business email
  - shared calendar
  - client-shareable documents and folders
  - meeting coordination
  - basic e-sign workflows where the selected plan supports document e-signature
- Why core:
  - one suite covers communication, file sharing, calendars, and lightweight document collaboration
  - this keeps client-facing coordination out of the raw repository while preserving canonical internal docs in the repo
- Deployment rule:
  - repo is internal source of truth
  - Workspace is client-facing collaboration layer

### 4. Airtable

- Use for:
  - lead intake records
  - qualification scoring
  - pipeline stages
  - client master index
  - project routing and operational dashboards
- Why core:
  - the business needs one structured database for non-code operations
  - Airtable can hold intake, pipeline, and delivery metadata without requiring a full CRM plus separate ops database
- Deployment rule:
  - do not also run the same operational records in Notion, spreadsheets, and a separate CRM

### 5. Vercel

- Use for:
  - public websites
  - previews for review
  - production deployment for modern frontend work
- Why core:
  - preview deployments reduce QA friction and speed approvals
  - strong fit for the web/app delivery model described in the source documents
- Deployment rule:
  - use for frontend and marketing surfaces
  - do not force every project onto Vercel if the delivery model is not a web application

### 6. Supabase

- Use for:
  - Postgres database
  - authentication
  - storage
  - quick API and backend support for client portals and app projects
- Why core:
  - it covers the recurring app back-end needs in a single platform
  - it reduces the need to assemble multiple small infrastructure services for early-stage client systems
- Deployment rule:
  - standard default for new app-class projects unless a client has an existing stack or compliance constraint

## Optional Layer

### Dedicated E-Sign Tool

- Status: optional if Google Workspace plan-level e-signature is operational and sufficient
- Promote to core when:
  - contract volume increases
  - approval routing becomes more complex
  - audit trail requirements exceed the Workspace baseline

### Perplexity / NotebookLM

- Status: optional research acceleration layer
- Use for:
  - external research
  - synthesis of client-provided documents
- Keep out of canonical storage and project truth

### Slack

- Status: optional
- Use only when there are enough humans collaborating daily to justify a dedicated internal communication layer

## Redundant or Risky for This Stage

- Notion as primary source of truth
  - acceptable as a client-facing or low-stakes collaboration layer
  - not acceptable as the canonical operating system when a repo already exists

- Multiple PM systems at once
  - avoid combinations like GitHub Projects + Notion + ClickUp + Linear for the same work

- More LLM subscriptions than the operating model can justify
  - the current problem is orchestration and governance, not provider scarcity

## Recommended Deployment Pattern

- Internal canonical layer: GitHub repository
- Operations database: Airtable
- Communication and client-sharing layer: Google Workspace
- Web delivery layer: Vercel
- App backend layer: Supabase
- AI execution layer: existing Codex / ChatGPT / Claude stack with defined task ownership

## Acceptance Criteria

The tool stack is operational when:

- each workflow has one primary system of record
- intake records land in a structured operations database
- contracts can be sent and signed without manual ad hoc workarounds
- web projects have preview and production deployment discipline
- app-class work has a default backend path
- AI tools are assigned by workflow role, not by personal preference
