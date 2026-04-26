# Forgotten by Design — Website

Modern investigative publication built on **Next.js 16 + Sanity v5 + Vercel + Kit**.

> Archive-driven investigations into the stories institutions simplified, erased, or renamed.

---

## Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 16 (App Router, TypeScript) |
| CMS | Sanity v5 (Studio at `/studio`) |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel |
| Email | Kit (ConvertKit) |
| Analytics | Vercel Analytics |

---

## Local setup

**1. Clone and install**

```bash
git clone <repo-url>
cd forgotten-by-design-web
npm install
```

**2. Configure environment**

Copy the example file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=   # from sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                # read-only token from sanity.io/manage
KIT_API_KEY=                     # from kit.com API settings
KIT_FORM_ID=                     # your Kit form ID
NEXT_PUBLIC_SITE_URL=https://forgottenbydesign.com
```

**3. Create your Sanity project** (first time only)

```bash
npx sanity init --env
```

Or create a project at [sanity.io/manage](https://sanity.io/manage) and paste the project ID into `.env.local`.

**4. Run the dev server**

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Project structure

```
app/
├── page.tsx                    # Home
├── investigations/
│   ├── page.tsx                # Investigations index
│   └── [slug]/page.tsx         # Investigation detail
├── documentation/
│   ├── page.tsx                # Documentation index
│   └── [slug]/page.tsx         # Evidence package detail
├── archive/page.tsx            # Searchable archive
├── series/[slug]/page.tsx      # Series groupings
├── about/page.tsx              # About / Method
├── subscribe/page.tsx          # Email subscribe
├── contact/page.tsx            # Contact / Press
├── studio/[[...tool]]/page.tsx # Sanity Studio (embedded)
└── api/
    ├── subscribe/route.ts      # Kit newsletter API
    └── archive/route.ts        # Archive data API

components/
├── layout/          # Header, Footer
├── investigation/   # InvestigationCard, FeaturedModule, ClaimsBlock
├── documentation/   # SourceTable, EvidenceCallout, LacunaNote
├── archive/         # ArchiveFilterBar
├── shared/          # SubscribeModule, SeriesRail, DocStatusBadge
└── ui/              # TranscriptBlock

sanity/
├── schemas/         # All 8 content type schemas
├── queries/         # GROQ constants
└── lib/             # client.ts, fetch.ts, image.ts
```

---

## Content types (Sanity)

| Schema | Purpose |
|---|---|
| `investigation` | Long-form investigations — the primary content object |
| `clip` | Short-form clips linked to a parent investigation |
| `documentationPackage` | Public evidence packages: claims → sources → lacuna note |
| `series` | Thematic groupings (erased history, digital erasure, etc.) |
| `topic` | Filter taxonomy |
| `person` / `institution` / `place` | Reference entities |

---

## Design tokens

Defined as Tailwind v4 CSS variables in `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `ink` | `#121212` | Page background |
| `paper` | `#F5F0EB` | Primary text |
| `mist` | `#8A8A8A` | Secondary / metadata text |
| `accent` | `#8B1A1A` | Oxblood — CTAs, headings *(client to confirm)* |
| `surface` | `#1C1C1C` | Card backgrounds |
| `border` | `#2E2E2E` | Borders |

To swap the accent color, change one line in `globals.css`:
```css
--color-accent: #8B1A1A;  /* oxblood → change to deep gold or forest */
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [vercel.com/new](https://vercel.com/new)
3. Add all `.env.local` variables in the Vercel Environment Variables dashboard
4. Deploy — Vercel handles the rest

---

## Remaining decisions before launch

- [ ] Final domain
- [ ] Podcast / RSS — phase 1 or phase 2
- [ ] Final accent color (current default: oxblood)
- [ ] Analytics tool (current default: Vercel Analytics)
- [ ] Bilingual rollout trigger for phase 2

---

## Non-negotiables (from brief)

- Site cannot look like a generic curiosity-content warehouse
- Evidence and documentation must be easy to access
- Homepage must immediately signal seriousness and clarity
- Archive must be browsable and searchable
- Documentation pages are public by default
- Transcripts are on-site, script-first, human-reviewed
- Subscription copy must not imply a stable publishing cadence
- Architecture must be English-primary now, bilingual-ready for later
