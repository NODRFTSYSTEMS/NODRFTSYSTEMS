# Proprietary Build Declaration — CasaClaro

## Product Identity

- Product name: CasaClaro
- Owning entity: NoDrft Systems
- Product owner and human authority: Founder
- Product type: Colombia real estate marketplace and relocation platform
- Workspace slug: `CASACLARO_marketplace-v1`
- Declaration date: 2026-04-17

## Build Authorization

This product is authorized for development by NoDrft Systems. The Founder holds all product ownership, approval authority, and scope authorization. There is no external client. All build decisions, scope changes, and release approvals route through the Founder.

This declaration replaces the external client intake and qualification scoring process. Intake scoring does not apply to NoDrft Systems proprietary products.

## Current Build Status

- Phase: Active — receiving changes
- Build started: Yes — v1 static frontend deployed
- Current build focus: Active development on marketplace features

## Product Scope (Current Understanding)

CasaClaro is a static Colombia real estate marketplace and relocation site. Current implementation:

- Multi-page static site: HTML entry pages with shared `styles.css` and `script.js`
- City explorer and filter by walkability, retiree fit, coastal living, healthcare depth, maintenance burden, yield context
- Browser-based cost simulator for pricing, closing costs, renovation reserve, rent, financed cash flow
- Relocation and residency guidance with healthcare notes, visa cards, eligibility self-check
- Rental coverage at city and neighborhood level
- Seller, investor, partner, and data-feedback submission capture

**Repo gaps (known):** Backend, auth, and database not yet implemented. Current behavior is static frontend plus browser storage with placeholder HTTPS endpoints for future routing.

## Open Decisions (Blocking Next Phase)

Phase 6 and beyond requires decisions on:
- Backend and database architecture (Supabase or equivalent)
- Authentication model
- CRM integration path for lead capture
- Phase 6 build date and scope (pending authorization)

## Authority Chain

| Role | Party |
|---|---|
| Product owner | Founder / NoDrft Systems |
| Build authorization | Founder |
| Scope approval | Founder |
| Release approval | Founder |
| External clients or external decision-makers | None |

## Required Next Actions

1. Founder decision on Phase 6 build scope and start date.
2. Build activation per Mandatory Build Activation Protocol (Gate 0 through Gate 2).
3. Advance to `03_strategy/strategy-brief.md` when Phase 6 scope is confirmed.

## Approvals

- Declared by: Founder / NoDrft Systems
- Date: 2026-04-17
- Human authority sign-off: Founder (implicit — all NoDrft Systems proprietary products are Founder-authorized)
