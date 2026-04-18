# Repository-Agent Capability Map

Build ID: BHPW-001
Repository: `04_products/Bucket Head Bilingual Site/app/`
Linked Client Profile: `02_client-system/BUCKETHEAD_bilingual-site/00_admin/client-governance-profile.md`
Linked Root Contract: `01_system/ai-governance/mandatory-build-activation-protocol-2026-04-15.md`
Linked Scoped Rules: `04_products/Bucket Head Bilingual Site/00_governance/scoped-rules.md`
Last Reviewed: 2026-04-17

---

## 1. Repository Identity

- Repository: `04_products/Bucket Head Bilingual Site/app/`
- Stack: React 19, TypeScript, Vite 7, Tailwind CSS 3, i18next, react-router-dom v7, lucide-react
- Type: Client-facing static SPA — bilingual, mobile-first, 6 pages
- Git branch: master (initial commit 52afa50, 2026-04-17)
- Remote: not yet pushed

---

## 2. Surface Routing Map

| Surface or Module | Primary Agent | Secondary Agent | Specialist Trigger | Required Handoff Target | Reviewer Path | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `src/pages/` — all 6 page components | FIS (Kiara) | DAA (Anika) | DAA if layout or visual redesign | TVA → QAS | QAS | FIS owns page-level markup, layout, and content wiring |
| `src/sections/` — 7 home sections | FIS (Kiara) | DAA (Anika) | DAA on any visual direction change | TVA → QAS | QAS | HeroSection has WebGL component — see WaterCausticCanvas |
| `src/components/` — 9 shared components | FIS (Kiara) | DAA (Anika) | — | TVA → QAS | QAS | NavigationHeader, Footer, MobileStickyCTA are layout-critical |
| `src/components/WaterCausticCanvas.tsx` | FIS (Kiara) | IDS (Nia) | IDS if WebGL behavior debugging required | TVA → QAS | QAS | Raw WebGL fragment shader — high complexity, handle with care |
| `src/i18n/locales/en.json` | FIS (Kiara) | BPA (Maritza) | **BPA mandatory** on every edit | BPA parity check → TVA → QAS | QAS | 239 keys; BPA must confirm parity before merge |
| `src/i18n/locales/es.json` | BPA (Maritza) | TCA (Xiomara) | TCA if cultural adaptation needed | TVA → QAS | QAS | BPA owns Spanish — do not edit without BPA |
| `src/lib/constants.ts` | FIS (Kiara) | — | Founder approval required for contact field changes | Founder review → TVA → QAS | Founder + QAS | Phone numbers and email are live client contact details |
| `src/hooks/useScrollReveal.ts` | FIS (Kiara) | TVA (Leandra) | TVA to verify reveal behavior on all routes | TVA → QAS | QAS | Route-dependent — test on every page after changes |
| `src/hooks/use-mobile.ts` | FIS (Kiara) | — | — | TVA → QAS | QAS | Mobile breakpoint hook — test at 375px and 768px |
| `public/assets/` — 23 images | DAA (Anika) | FIS (Kiara) | DAA for any asset replacement or addition | TVA → QAS | QAS | Includes logo, gallery images, service photos, map |
| `index.html` — meta tags, SEO | FIS (Kiara) | STAA (Jermaine) | STAA if full SEO audit is in scope | TVA → QAS | QAS | og:url and canonical pending final domain |
| `tailwind.config.js` | FIS (Kiara) | SAA (Samara) | SAA if design system or token changes | TVA → QAS | QAS | Brand colors: brand-blue, brand-yellow, light-blue, dark-blue, success |
| `vite.config.ts` | FIS (Kiara) | PIS (Keston) | PIS for any build or deploy config changes | TVA → QAS | QAS | Base path is `./` — important for static hosting |
| `package.json` + dependencies | SAA (Samara) | FIS (Kiara) | SAA mandatory for any new package | TVA → QAS | QAS | Dependency surface is now lean — protect it |
| Contact form → Formspree | IDS (Nia) | FIS (Kiara) | IDS when Formspree ID is being wired | TVA → QAS | QAS | `src/pages/ContactPage.tsx` line 57 — FORMSPREE_FORM_ID placeholder |
| Vercel deployment | PIS (Keston) | DRA (Terrence) | Both required for production deploy | DRA → QAS → Founder | Founder | Root: app/, build: npm run build, output: dist/ |
| Accessibility | AAA (Rochelle) | FIS (Kiara) | AAA mandatory before public launch | QAS → Founder | Founder | Full pre-launch audit required |

---

## 3. Known Constraints

- High-Risk Surfaces:
  - `src/lib/constants.ts` — contains live client phone numbers and email; any change requires Founder approval
  - `src/components/WaterCausticCanvas.tsx` — raw WebGL; changes can silently break the hero effect; always test with WebGL disabled fallback
  - `src/i18n/locales/` — both files must stay at parity; a key mismatch shows raw key strings to Spanish-language users

- Trust-Sensitive Surfaces:
  - Contact form (`src/pages/ContactPage.tsx`) — handles user-submitted name, phone, service, and message; Formspree endpoint must be private (not committed to public repo)
  - Client contact details in `constants.ts`

- Data or Privacy-Sensitive Surfaces:
  - Contact form submissions route to Formspree → client email; no server-side storage; low risk but confirm Formspree privacy terms before production

- Areas Requiring ARE Escalation:
  - Any production deployment attempt — ARE review required before Vercel deploy
  - Any change to the Formspree endpoint configuration

---

## 4. Capability Gaps

- Known Gaps:
  - BPA formal sign-off on Session 001 translation changes is pending
  - TVA evidence package for Session 001 is pending
  - QAS independent review for Session 001 is pending
  - AAA accessibility audit has not been performed
  - STAA full SEO audit has not been performed (basic meta tags added but not audited)
  - Prompt and tool inventory for BHPW not yet formally populated

- Temporary Workarounds:
  - Founder directing session substitutes for formal MOA activation during Session 001
  - Claude Sonnet 4.6 acting as FIS surface for implementation; formal FIS skill pack should be loaded on next session

- Hiring, Skill, or Tool Actions Needed:
  - Load BPA skill pack before next bilingual content session
  - Load IDS skill pack before Formspree wiring session
  - Load PIS + DRA skill packs before Vercel deployment session
  - Load AAA skill pack before pre-launch accessibility review
