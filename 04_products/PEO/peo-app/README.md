# Peak Equity Optimizer

**Real estate deal intelligence platform for US sellers and investors.**

Peak Equity Optimizer (PEO) is a bilingual (EN/ES) SaaS application that gives real estate sellers and investors comp-backed deal analysis, verified ARV, and strategy-specific calculations — not AVM guesses. The formula engine covers seller net proceeds, investor MAO, fix-and-flip, BRRRR, DSCR, and wholesale analysis. The platform targets the $5T+ US residential real estate market with a freemium → subscription pricing model starting at $49/property for sellers and $99/month for investors.

**What's built and ready:**
- Complete formula engine with 62 unit tests — seller net, investor MAO, BRRRR refi modeling, DSCR, confidence scoring, kill switches
- Full bilingual UI — 902 translation entries across EN/ES via `next-intl`
- 33 public marketing and product routes, 29 API routes with Zod validation on every boundary
- Prisma schema with 13 models and 3 migrations ready — Users, Sessions, ConsentRecords, EstimatorSessions, EstimatorResults, SellerApplications, TriageResults, ReadinessPlans, RehabItems, InvestorProfiles, Vendors, VendorLeads, AuditLogs
- 8-tier RBAC (anonymous → free → seller → investor → vendor → admin) with role-gated API enforcement
- PostHog analytics provider wired — page tracking active
- Clerk auth installed and configured — sign-in/sign-up UI ready to activate
- PII linting layer on all analytics and audit event payloads
- Security headers, CSP-ready, X-Frame-Options DENY, Next.js standalone Docker output

**What requires infrastructure wiring to activate (buyer's work):**
- `DATABASE_URL` — connect to Neon PostgreSQL (schema + migrations ready to deploy)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` — Clerk project keys
- `RENTCAST_API_KEY` — live property data (stub currently returns structured mock data)
- `NEXT_PUBLIC_POSTHOG_KEY` — PostHog project key
- `RESEND_API_KEY` — transactional email

## Quick Start — Docker (Recommended)

```bash
# 1. Clone and enter the directory
cd peo-app

# 2. Copy environment template
cp .env.example .env

# 3. Start the full stack (app + PostgreSQL + PGAdmin)
docker compose up --build

# 4. Open http://localhost:3000
```

**Services:**
| Service | URL | Credentials |
|---------|-----|-------------|
| PEO App | http://localhost:3000 | — |
| PostgreSQL | localhost:5432 | peo / peo_dev_pass |
| PGAdmin | http://localhost:5050 | admin@peakequityoptimizer.com / admin |

### Environment Variables

Create `.env` from `.env.example` and set real values:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
RENTCAST_API_KEY=...
```

## Quick Start — Local Development

```bash
# 1. Install dependencies (requires pnpm)
pnpm install

# 2. Copy environment template and configure
cp .env.example .env.local

# 3. Run database migrations
pnpm prisma migrate dev

# 4. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Production build (standalone output for Docker) |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint sweep |
| `pnpm test` | Run Vitest unit tests |

## Project Structure

```
src/
  app/              # Next.js App Router
    [locale]/       # Localized routes (en, es)
    api/            # API routes
  components/       # Shared UI components
  i18n/             # Internationalization config
  lib/
    auth/           # RBAC and server auth
    events/         # PII linting
    formulas/       # Formula engine (Layers A–G)
    investor/       # Investor analysis engine
    property-data/  # Rentcast integration + stub fallback
    readiness/      # Deal readiness generator
    triage/         # Triage engine
prisma/
  schema.prisma     # Database schema
  migrations/       # Migration files
tests/
  unit/             # Unit tests
  integration/      # Integration tests
messages/
  en.json           # English translations
  es.json           # Spanish translations
```

## Docker Deployment

### Production Build

```bash
# Build the production image
docker build -t peo:latest .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..." \
  -e CLERK_SECRET_KEY="sk_..." \
  -e RENTCAST_API_KEY="..." \
  peo:latest
```

### Docker Compose (Full Stack)

```bash
# Start everything
docker compose up -d

# View logs
docker compose logs -f app

# Run migrations manually
docker compose exec app npx prisma migrate deploy

# Stop everything
docker compose down
```

## Vercel Deployment (Recommended for Review)

### 1. Prerequisites

- A [Vercel](https://vercel.com) account (free tier works)
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)
- A [Clerk](https://clerk.com) project (free tier works)

### 2. Create a Neon Database

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string from your dashboard
3. Format: `postgresql://user:password@host/db?sslmode=require`

### 3. Connect to Vercel

1. Push this repo to GitHub
2. In Vercel: **Add New Project → Import Git Repository**
3. Vercel auto-detects Next.js — keep default settings

### 4. Environment Variables

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Neon connection string | ✅ Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ Yes |
| `RENTCAST_API_KEY` | Rentcast API key | ⚠️ Yes for live data |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key | ❌ Optional |
| `RESEND_API_KEY` | Resend API key | ❌ Optional |
| `RESEND_FROM_EMAIL` | Verified sender email | ❌ Optional |

**⚠️ Production Safety — DO NOT set these on Vercel:**
- `ENABLE_DEV_BYPASS` — server-only dev bypass; safe to omit
- `NEXT_PUBLIC_DEV_BYPASS` — client-visible; omit to prevent dev UI leaking to production
- `DEMO_AUTH_ENABLED` — grants demo auth; omit for real authentication

### 5. First Deploy

1. Click **Deploy**
2. Vercel builds the app, runs Prisma migrations, and provisions serverless functions
3. Every future `git push` auto-deploys
4. Every Pull Request gets its own **preview URL**

### 6. Run Migrations (if build fails)

If the build step can't reach the database, run migrations manually:

```bash
npx prisma migrate deploy
```

Or set the build command to `prisma generate && next build` (without migrate) and handle migrations separately.

## User Roles

| Role | Level |
|------|-------|
| anonymous_visitor | 0 |
| free_user | 1 |
| seller | 2 |
| investor_core | 3 |
| investor_elite | 4 |
| vendor | 5 |
| admin_internal | 10 |

## Security Architecture

- **PII linting** — all analytics and audit event payloads are scanned for prohibited fields (address, name, email, phone, SSN patterns) via `src/lib/events/pii-lint.ts` before any write
- **RBAC enforcement** — 7 explicit roles with numeric hierarchy, enforced at both middleware and API handler level
- **Formula isolation** — all calculation logic lives server-side; clients receive computed outputs only, never formula parameters or constants
- **Dev bypass** — local development bypass requires `NODE_ENV=development` AND `ENABLE_DEV_BYPASS=true` explicit flag; cannot activate in production builds
- **Security headers** — X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy set globally in `next.config.ts`

## Pricing Model

| Tier | Price | Description |
|------|-------|-------------|
| Free Estimator | $0 | Manual seller + investor calculations (no live data) |
| Seller Analysis | $49 / property | Verified ARV, live comps, triage, readiness plan |
| Investor Basic | $99 / month | MAO + flip analysis with real comp data |
| Investor Advanced | $299 / month | All Basic + BRRRR, DSCR, rehab budgeting |
| Vendor Listing | $199 / month | Marketplace presence + lead routing |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL via Prisma 6 (Neon serverless ready) |
| Auth | Clerk (`@clerk/nextjs`) |
| Analytics | PostHog |
| Internationalization | next-intl (EN/ES) |
| Testing | Vitest (62 tests, 8 files) |
| Deployment | Vercel / Docker (standalone output) |

## Architectural Decisions

See [DECISIONS.md](./DECISIONS.md) for the rationale behind every major technical choice — ORM selection, auth provider, analytics, RBAC design, formula isolation, and PII linting.

## License

All rights reserved.
