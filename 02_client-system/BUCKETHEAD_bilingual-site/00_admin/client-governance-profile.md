# Client Governance Profile

Status: active
Build ID: BHPW-001
Date: 2026-04-17
Last Reviewed: 2026-04-17

---

## 1. Client Identity

- Client ID: BHPW
- Client Name: Bucket Head Pressure Washing
- Status: active
- Human Relationship Owner: Founder
- Human Delivery Owner: Founder
- Profile Date: 2026-04-17
- Last Reviewed: 2026-04-17

## 2. Client Categorization

- Service or Product Category: Client Web Delivery — Bilingual Static SPA
- Client Type: external
- Trust Sensitivity: low
- Data Sensitivity: low (contact form submissions only; no PII storage, no auth, no payments)
- Privacy or Disclosure Sensitivity: low
- Language Surface:
  - English (en)
  - Spanish (es)
- Region or Market Surface:
  - Gwinnett County, Georgia, USA
  - Surrounding service areas: Lawrenceville, Suwanee, Buford, Duluth, Snellville, Grayson, Norcross, Lilburn
- Production Exposure: public_or_client_facing

## 3. Technical Estate

- Active Repositories:
  - `04_products/Bucket Head Bilingual Site/app/` — React 19 + Vite + TypeScript + Tailwind 3 + i18next SPA
- Active Products, Apps, or Systems:
  - Bucket Head Pressure Washing bilingual website (6 pages)
- Active Environments:
  - local dev: http://localhost:3000 (Vite dev server)
  - production: pending — Vercel deployment not yet executed
- Critical Routes, Modules, or Surfaces:
  - `/` — Home (WebGL caustic hero, trust strip, service preview, reviews preview)
  - `/services` — Full service catalog with pricing
  - `/gallery` — Filterable lightbox gallery
  - `/reviews` — Customer reviews grid
  - `/contact` — Service area map, business hours, contact form
  - `/about` — Brand story, differentiators, process
  - `src/i18n/locales/en.json` + `es.json` — All bilingual content (239 keys each)
  - `src/lib/constants.ts` — Phone numbers, email, tagline (single source of truth)
  - `src/pages/ContactPage.tsx` — Formspree submission handler

## 4. Governance Links

- Root Contract Reference: `01_system/ai-governance/mandatory-build-activation-protocol-2026-04-15.md`
- Scoped Rules Reference: `04_products/Bucket Head Bilingual Site/00_governance/scoped-rules.md`
- Prompt Library Reference: `01_system/ai-governance/build-prompt-library/`
- Active Prompt Inventory Reference: pending
- Active Tool Inventory Reference: pending
- Repository-Agent Capability Map Reference: `04_products/Bucket Head Bilingual Site/00_governance/repository-agent-capability-map.md`
- Activation and Handoff Checklist Reference: `04_products/Bucket Head Bilingual Site/00_governance/activation-and-handoff-checklist.md`
- Incident Record Reference: none to date
- Evidence Ledger Location Rule: `04_products/Bucket Head Bilingual Site/00_governance/evidence-ledger.md`
- Completion Report Location Rule: `04_products/Bucket Head Bilingual Site/00_governance/completion-report.md`

## 5. Reviewer and Approval Path

- Reviewer Path: QAS (Imani) for all governed builds on this repository
- QAS Routing: QAS → Founder for release sign-off
- ARE Gate Requirement: ARE review before production deployment
- Founder Gate Requirement: Founder sign-off required before any public URL is shared with the client
- Special Approval Notes:
  - Client contact information (phone, email) is a single-source constant in `src/lib/constants.ts`. Any change to contact details requires Founder approval before commit.
  - Bilingual content changes require BPA (Maritza) parity review before merge.

## 6. Default Activation Logic

- Default Minimum Cell:
  - MOA (Zayne) — orchestration
  - CSM (Josette) — context continuity
  - PMA (Keon) — build packet control
  - RCA (Deven) — repository context
  - FIS (Kiara) — primary frontend implementation
  - TVA (Leandra) — verification evidence
  - QAS (Imani) — independent reviewer (outside build cell)
- Mandatory Specialists for This Client:
  - BPA (Maritza) — required on any bilingual content change (EN or ES keys)
  - DAA (Anika) — required on any layout, color, or visual component change
- Conditional Specialists:
  - TCA (Xiomara) — transcreation specialist, activate if bilingual copy requires cultural adaptation beyond direct translation
  - PIS (Keston) — activate when Vercel deployment or CI/CD work is in scope
  - IDS (Nia) — activate when Formspree integration, third-party wiring, or form debugging is in scope
  - POS (Jovan) — activate if Lighthouse performance scores fall below acceptable thresholds post-deployment
  - AAA (Rochelle) — activate for accessibility audit before public launch
- Default Handoff Rules:
  - FIS owns all component and page-level UI work
  - BPA receives handoff for all translation key changes before merge
  - TVA receives handoff for build + typecheck verification before review
  - QAS receives final output before any release advancement
- Prohibited Shortcuts:
  - Do not merge bilingual content changes without BPA parity confirmation
  - Do not deploy to Vercel without ARE review and Founder sign-off
  - Do not add third-party libraries without SAA architecture review
  - Do not commit changes to `src/lib/constants.ts` contact fields without Founder approval
  - Do not use external AI scaffolding tools (Kimi, Bolt, v0, etc.) for governed builds on this repository

## 7. Prompt and Tool Control

- Approved Prompt Set IDs:
  - `build-prompt-library/01-master-build-prompt-template.md`
  - `build-prompt-library/02-page-level-build-prompt-templates.md`
  - `build-prompt-library/04-bilingual-qa-prompt-templates.md`
- Approved Tools and Services:
  - Claude Code (Claude Sonnet 4.6 / Opus 4.7) — primary build and review tool
  - Vite — build toolchain
  - Formspree — contact form backend (free tier)
  - Vercel — deployment target
  - GitHub — version control
- Restricted Tools:
  - No external AI scaffolding tools (Kimi, Bolt, v0, Lovable, etc.) without explicit Founder approval
- Client-Specific Forbidden Behaviors:
  - Do not expose business email or phone numbers in any client-facing log, commit message, or public document
  - Do not add analytics, tracking pixels, or third-party scripts without Founder approval
  - Do not modify pricing figures in `en.json` or `es.json` without Founder confirmation of client approval

## 8. Risk and Control Notes

- Known Operational Risks:
  - Formspree form ID not yet wired — contact form currently shows success on any valid submission attempt but does not deliver to client email. **Blocker for production.**
  - Google Review URL is a placeholder — Reviews page CTA links to a non-functional URL. **Blocker for production.**
  - Website copy is generic — no brand voice, no client personality captured. Site reads as AI-templated. **Must resolve before client delivery.**
  - Vercel deployment not yet executed — production URL does not exist.
  - No `og:url` or canonical URL set in `index.html` — requires final domain before completion.
- Disclosure or Trust Notes:
  - Client is a sole proprietor. All approvals route through Founder as delivery authority.
  - Client phone numbers and email are real business contact details — treat as sensitive operational data.
- Incident Escalation Triggers:
  - Any change to contact details (phone, email) must be flagged to Founder immediately
  - Any deployment failure must be escalated to ARE before retry
- Required Verification Emphasis:
  - Bilingual parity must be verified on every content change (BPA)
  - Contact form must be end-to-end tested in staging before production release
  - All 6 pages must render correctly at mobile (375px), tablet (768px), and desktop (1280px) before release

## 9. Change History

| Date | Change | Owner | Reason | Approval |
| --- | --- | --- | --- | --- |
| 2026-04-17 | Profile created — retroactive activation following ungoverned Kimi AI scaffold | Claude Sonnet 4.6 / Founder | First governed review of this repository | Founder |
