<scoped_rules>
scoped_rules_id: BHPW-SR-001
status: approved
owner: PCA (Trevon) with PMA (Keon) and QAS (Imani) support
linked_root_contract: 01_system/ai-governance/mandatory-build-activation-protocol-2026-04-15.md
linked_client_profile: 02_client-system/BUCKETHEAD_bilingual-site/00_admin/client-governance-profile.md

scope_boundaries:
  client: BHPW — Bucket Head Pressure Washing
  repository: 04_products/Bucket Head Bilingual Site/app/
  module_or_service: full static SPA — all 6 pages and shared components
  page_or_route: /, /services, /gallery, /reviews, /contact, /about
  build_class_limit: CLASS_2

surface_constraints:
  language_surface:
    - English (en) — primary
    - Spanish (es) — full parity required
  privacy_or_disclosure_sensitivity: LOW
  data_sensitivity: LOW
  production_exposure: PUBLIC_OR_CLIENT_FACING

role_constraints:
  required_roles:
    - MOA (Zayne) — orchestration and activation discipline
    - CSM (Josette) — context and state continuity
    - PMA (Keon) — build packet control
    - RCA (Deven) — repository context loading
    - FIS (Kiara) — primary frontend implementation owner
    - TVA (Leandra) — verification and reproducibility evidence
    - QAS (Imani) — independent reviewer outside the build cell
  conditional_roles:
    - BPA (Maritza) — activate on any change to en.json or es.json, any bilingual content edit
    - DAA (Anika) — activate on any layout, color, typography, or component visual change
    - TCA (Xiomara) — activate if Spanish copy requires cultural adaptation beyond direct translation
    - IDS (Nia) — activate when Formspree integration, third-party service wiring, or form debugging is in scope
    - PIS (Keston) — activate for Vercel deployment, CI/CD, or environment configuration work
    - AAA (Rochelle) — activate for full accessibility audit before public launch
    - POS (Jovan) — activate if Lighthouse performance scores fall below 85 on any category post-deployment
  reviewer_path: QAS (Imani) → Founder sign-off for release
  prohibited_role_shortcuts:
    - Do not use external AI scaffolding tools (Kimi, Bolt, v0, Lovable, Cursor auto-scaffold) as implementation substitutes
    - Do not treat self-review as reviewer coverage — QAS must be a separate pass
    - Do not merge bilingual content without BPA confirmation
    - Do not deploy without ARE review and Founder sign-off

tool_constraints:
  approved_tools:
    - Claude Code (claude-sonnet-4-6 or claude-opus-4-7) — primary build and review tool
    - Vite 7.x — build toolchain
    - React 19 + TypeScript — runtime stack
    - Tailwind CSS 3.x — styling
    - i18next + react-i18next — bilingual system
    - lucide-react — icon library
    - react-router-dom v7 — routing
    - Formspree — contact form backend (free tier approved)
    - Vercel — deployment target
    - GitHub — version control
  restricted_tools:
    - No additional npm packages without SAA architecture review and PMA approval
    - No analytics or tracking scripts without Founder approval
    - No shadcn/ui or similar component library (explicitly excluded by tech-spec)
  forbidden_tools:
    - Kimi AI / kimi-plugin-inspect-react — previously used without authorization, now prohibited
    - Any external scaffold generator that bypasses the activation protocol
    - Any tool that writes directly to src/ without a governed session

execution_constraints:
  in_scope:
    - UI component development and modification (FIS)
    - Bilingual content (en.json / es.json) updates with BPA parity check
    - Contact form Formspree wiring (IDS when activated)
    - SEO meta tag management
    - Gallery and lightbox behavior
    - Scroll reveal and animation system
    - Navigation and routing
    - Mobile responsive behavior
    - Copy and brand voice (FIS + Founder direction)
    - Vercel deployment (PIS when activated)
  exclusions:
    - Backend server development (this is a static SPA — no server-side code)
    - Database or schema work (no database in this product)
    - User authentication (not in scope for this site)
    - Payment processing (not in scope for this site)
    - CMS integration (not currently scoped)
    - Performance optimization beyond standard Vite build output unless POS is activated
  mandatory_evidence:
    - npm run build passing with zero TypeScript errors before any review
    - All 6 pages manually verified in browser (desktop + mobile viewport)
    - Bilingual toggle tested on every changed page
    - BPA sign-off on any translation change before merge
  mandatory_handoffs:
    - FIS → BPA on any en.json or es.json change
    - FIS → TVA before review package is assembled
    - TVA → QAS for independent review before release advancement
    - QAS → Founder for release sign-off

release_constraints:
  required_review_layers:
    - TVA build and typecheck evidence
    - QAS independent review
    - Founder approval for production deployment
  release_gate_notes:
    - Formspree form ID must be wired before production release
    - Google Review URL must be real before production release
    - og:url and canonical URL must reflect final domain before launch
    - AAA accessibility review must be completed before public launch
  escalation_triggers:
    - Any change to client contact details (phone, email) → Founder approval required before commit
    - Any dependency addition → SAA review required
    - Any deployment failure → escalate to ARE before retry
    - Any data or privacy risk discovered → escalate to QAS + Founder immediately
</scoped_rules>
