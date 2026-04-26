# Forgotten by Design — Claude Code Notes

## Stack
Next.js 16 (App Router) · Sanity v5 · Tailwind CSS v4 · TypeScript · Vercel

## Key conventions
- Tailwind tokens live in `app/globals.css` as CSS `@theme` variables — no `tailwind.config.ts`
- Sanity client is **lazy** (`getClient()` in `sanity/lib/client.ts`) — never instantiate at module level
- All `sanityFetch` calls require a `defaultValue` so `next build` passes without real credentials
- User-facing text fields use locale objects `{ en: string }` for bilingual-readiness (no migration needed to add `es`)
- Kit newsletter logic lives in `app/api/subscribe/route.ts` and `lib/kit.ts`

## Running locally
```bash
cp .env.local.example .env.local   # fill in Sanity + Kit credentials
npm install
npm run dev
```

## Before running dev
`NEXT_PUBLIC_SANITY_PROJECT_ID` must be set in `.env.local`. Get it from sanity.io/manage.
