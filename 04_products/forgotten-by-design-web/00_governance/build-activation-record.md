---
document: FBD Build Activation Record
product: Forgotten by Design — Website
status: Active governance
version: 1.0
date: 2026-04-18
owner: Founder (nodrftsystems)
authority: Mandatory Build Activation Protocol — `01_system/ai-governance/mandatory-build-activation-protocol-2026-04-15.md`
confidentiality: Proprietary internal — no external publishing approved
linked-workspace: 02_client-system/FORGOTTENBYDESIGN_web/
---

# Forgotten by Design — Build Activation Record

## Build Classification

**Build Class: 2 — Standard Web Build with CMS**

Justification:
- Next.js frontend with Sanity v5 CMS
- Vercel deployment
- No auth, no PII handling beyond standard contact forms
- Content-driven product — editorial focus
- Kit integration in scope

## Active Build Phases

| Phase | Description | Status | Notes |
|-------|-------------|--------|-------|
| Phase 1 | Scope and scaffolding | COMPLETE | Next.js 16 + Sanity v5 + Vercel scaffolded |
| Phase 2 | CMS schema and content model | IN PROGRESS | — |
| Phase 3 | Frontend build | IN PROGRESS | — |
| Phase 4 | QA and accessibility | PENDING | — |
| Phase 5 | Founder review and release | PENDING | — |
| Phase 6 | Launch | PENDING | — |

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 | App Router |
| CMS | Sanity v5 | Headless |
| Hosting | Vercel | Client-owned account preferred |
| Email/Kit | Kit | Newsletter integration |

## Active Agent Cell

| Role | Agent | Status |
|------|-------|--------|
| Orchestration | MOA (Zayne) | Active |
| Project Management | PMA (Keon) | Active |
| Front-end | SEA + FIS | Active |
| Visual Direction | VDA (Jeanine) | Active |
| QA | QAS (Imani) + QDA (Patrice) | Pending Phase 4 |
| Accessibility | AAA (Rochelle) | Pending Phase 4 |

## Human Gates

| Gate | Authority | Status |
|------|-----------|--------|
| Build activation | Founder | APPROVED |
| Pre-release QA | ARE → Founder | PENDING |
| Launch | Founder | PENDING |

## Open Items

| ID | Item | Owner | Priority |
|----|------|-------|----------|
| FBD-O-001 | QA Pass 1–6 before release | QAS (Imani) | Required |
| FBD-O-002 | Accessibility audit (WCAG 2.1 AA) | AAA (Rochelle) | Required |
| FBD-O-003 | Disclosure gate sweep before commit | IPGA (Camille) | Required |
| FBD-O-004 | Confirm hosting account ownership (client vs. NoDrftSystems) | Founder | Important |
