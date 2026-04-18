# Evidence Ledger

## 1. Build Record

- Build ID: BHPW-001
- Repository: `04_products/Bucket Head Bilingual Site/app/`
- Branch or Review Surface: master (initial commit 52afa50)
- Build Class: Class 2 — Standard Feature Build
- Status: in_progress — Session 001 complete; BPA/TVA/QAS handoffs pending
- Human Owner: Founder
- Build Lead: FIS (Kiara) — Claude Sonnet 4.6
- Reviewer Path: QAS (Imani) → Founder
- Start Date: 2026-04-17 (retroactive; Kimi scaffold predates this)
- Last Updated: 2026-04-17

---

## 2. Scope Record

- Objective: Deliver a production-ready bilingual (EN/ES) static SPA for Bucket Head Pressure Washing — 6 pages, mobile-first, conversion-focused, deployable to Vercel
- Bounded Scope:
  - Audit and remediate Kimi AI scaffold against tech-spec
  - Remove shadcn/ui violations
  - Fix all critical bugs (scroll reveal, bilingual strings, form placeholder)
  - Add SEO meta tags
  - Wire Formspree contact form (ID pending)
  - Initialize git repository
  - Create full governance artifacts
  - Logo size increase (Founder direction)
- Exclusions:
  - Backend server development
  - Database or schema work
  - User authentication or payments
  - CMS integration
  - Vercel deployment (deferred — pending Founder sign-off session)
  - Brand voice / copy rewrite (flagged as needed, deferred pending Founder input)
- Affected Surfaces:
  - src/components/ (NavigationHeader, PageLayout, WaterCausticCanvas — logo size, scroll reveal fix)
  - src/hooks/useScrollReveal.ts (route-aware fix)
  - src/pages/ServicesPage.tsx (useTranslation fix, hardcoded string fix)
  - src/pages/GalleryPage.tsx (bilingual lightbox counter)
  - src/pages/ContactPage.tsx (Formspree fetch wiring)
  - src/index.css (shadcn CSS variable removal)
  - src/lib/utils.ts (shadcn cn() helper removed)
  - tailwind.config.js (shadcn tokens and plugin removed)
  - vite.config.ts (kimi plugin removed)
  - index.html (SEO meta tags)
  - package.json (40+ packages uninstalled)
  - src/components/ui/ (53 files deleted)
  - components.json (deleted)
- Release Sensitivity: public_or_client_facing — Founder sign-off required before production

---

## 3. Active Roles

| Role | Name or Agent | Function | Start Time | End Time | Notes |
| --- | --- | --- | --- | --- | --- |
| Founder | Human Owner | Directing, approving, reviewing | 2026-04-17 | Session open | Present throughout |
| FIS (Kiara) | Claude Sonnet 4.6 | Primary frontend implementation | 2026-04-17 | Session open | Acting in FIS role |
| RCA (Deven) | Claude Sonnet 4.6 | Repository context loading | 2026-04-17 | 2026-04-17 | Context loaded at session open |
| PMA (Keon) | Claude Sonnet 4.6 | Build packet and governance artifacts | 2026-04-17 | Session open | Retroactive packet assembled |
| BPA (Maritza) | Pending | Bilingual parity review | — | — | Not yet activated — pending handoff |
| TVA (Leandra) | Pending | Build verification evidence | — | — | Not yet activated — pending handoff |
| QAS (Imani) | Pending | Independent review | — | — | Not yet activated — reviewer gate pending |

---

## 4. Prompt Set Used

| Prompt ID | Prompt Name | Version or Date | Owner | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| — | Mandatory Build Activation Protocol | 2026-04-15 | Founder / ARE | active | Governing protocol |
| — | Founder session direction | 2026-04-17 | Founder | active | Direct session prompting |
| — | Formal prompt inventory | — | PCA | not yet populated | Open gap |

---

## 5. Tools Used

| Tool or Service | Owner | Access Scope | Use in This Build | Notes |
| --- | --- | --- | --- | --- |
| Claude Code (claude-sonnet-4-6) | Founder | Full repository | Primary implementation and governance tool | All build work in this session |
| Vite 7.3.0 | Founder | Build toolchain | npm run build, npm run dev | Build passes zero errors |
| Node.js 20 | Founder | Local environment | Package management | npm install clean |
| Git | Founder | Local repository | Version control | Initial commit 52afa50 |
| Kimi AI | External (unauthorized) | Full scaffold — ungoverned | Produced original scaffold before governed session | **Prohibited going forward** |

---

## 6. Key Decisions

| Timestamp | Decision | Reason | Owner | Downstream Impact |
| --- | --- | --- | --- | --- |
| 2026-04-17 | Remove all shadcn/ui components and dependencies | Tech-spec explicitly prohibits shadcn; 53 components were dead weight; violated spec intent | FIS / Founder | CSS bundle: 87KB → 23KB; package.json leaner; spec compliance restored |
| 2026-04-17 | Fix useScrollReveal to be route-aware via pathname dependency | All non-home pages had invisible content (opacity:0, never revealed) — critical UX bug | FIS | All pages now display content correctly on navigation |
| 2026-04-17 | Wire Formspree with placeholder ID (not fake setTimeout) | Real submission pattern ready; client must supply form ID | FIS | Contact form will 404 until FORMSPREE_FORM_ID is replaced |
| 2026-04-17 | Defer brand voice / copy rewrite | Founder confirmed issue; no client direction available in this session | Founder | Site reads as generic AI template — must address before client delivery |
| 2026-04-17 | Defer Vercel deployment | Pending Founder sign-off session; governance artifacts not complete | Founder | No public URL exists yet |
| 2026-04-17 | Initialize git in app/ as standalone repo (not subfolder of MASTER) | Bucket Head is a client project — needs its own version control history | FIS | Separate repo; future: push to nodrftsystems/bucket-head-bilingual-site |

---

## 7. Evidence Summary

| Evidence Type | Result | Location or Reference | Reviewer-Relevant Notes |
| --- | --- | --- | --- |
| typecheck | PASS — zero TypeScript errors | `npm run build` output 2026-04-17 | tsc -b clean on both pre- and post-cleanup builds |
| lint | NOT RUN — no lint step in build command | `npm run lint` available but not run this session | ESLint configured; should be run before QAS review |
| tests | N/A — no test suite in this repository | — | Test suite not in scope for this build class; TVA to confirm |
| build result | PASS — vite build clean | dist/ output: index-m_TiSo8F.js 370.86KB / 114.68KB gzip; CSS 23.43KB / 5.10KB gzip | Significant CSS reduction from shadcn removal |
| preview or runnable artifact | LIVE — dev server at http://localhost:3000 | npm run dev in app/ | All 6 pages navigable; scroll reveal confirmed working post-fix |
| trace or failure evidence | Scroll reveal bug traced to useEffect dependency missing pathname; fixed | useScrollReveal.ts → PageLayout.tsx | Bug caused blank pages on all routes except home |
| screenshots or recordings | Not captured this session | — | QAS should request visual evidence for reviewer package |

---

## 8. Issues and Open Risks

| Issue or Risk | Severity | Status | Owner | Next Action |
| --- | --- | --- | --- | --- |
| Formspree form ID not wired — `FORMSPREE_FORM_ID` placeholder | Critical | Open | Founder | Create Formspree form at formspree.io; replace placeholder in ContactPage.tsx:57 |
| Google Review URL is a placeholder | Critical | Open | Founder / Client | Obtain GMB short review link; replace in ReviewsPage.tsx:78 |
| Brand voice — site copy is generic, no client personality | High | Open | Founder + FIS | Founder to provide client direction; copy pass required before delivery |
| og:url and canonical URL missing — requires final domain | Medium | Open | FIS post-deployment | Add after Vercel domain is assigned |
| No GitHub remote — repo local only | Medium | Open | Founder | Push to nodrftsystems/bucket-head-bilingual-site (private) |
| npm run lint not run this session | Low | Open | TVA | Run before QAS review; address any ESLint findings |
| AAA accessibility audit not performed | Medium | Open | AAA (Rochelle) | Mandatory before public launch |
| BPA formal parity sign-off pending | Medium | Open | BPA (Maritza) | Review modified keys: services.whatsIncluded, lightbox.of |

---

## 9. Reviewer Findings

| Reviewer Role | Finding Summary | Severity | Status | Notes |
| --- | --- | --- | --- | --- |
| QAS (Imani) | — | — | PENDING | Independent review not yet completed |

---

## 10. Release Disposition

- Reviewer Outcome: pending
- Release Status: not_ready
- Blockers:
  - Formspree form ID not wired
  - Google Review URL placeholder active
  - Brand voice copy pass not completed
  - QAS independent review not completed
  - Founder production sign-off not issued
  - Vercel deployment not executed
- Escalation Triggered: none
- Exceptional Incident Level If Any: none
- Recommended Next Action: Complete copy pass (Founder direction required) → wire Formspree ID → QAS review → Founder sign-off → Vercel deploy
