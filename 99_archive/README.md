# 99_archive — NoDrftSystems decommissioned workspaces

This directory holds workspaces that are no longer in active use. Items here must not be edited, pushed, or referenced as current source of truth.

---

## 2026-05-08_legacy-static-site/

**Status:** Archived — not in active use.
**Reason for archive:** Replaced by the Next.js production site at `04_products/nodrft-web/`, which is the canonical source for `nodrftsystems.com`. The legacy static-HTML site is no longer the deploy target — Vercel is wired to `nodrft-web` and the apex/`www` domain serves Next.js, not GitHub Pages.

**What this was:** The original static HTML/CSS/JS marketing site (pages/, src/, .nojekyll, index.html, deploy-pages.yml). Pushed to GitHub Pages on the `NODRFTSYSTEMS/NODRFTSYSTEMS` repo via a workflow.

**Last pushed commit before archive:** `6f282ba feat: premium visual refinements + GitHub Pages workflow fix` (2026-04-28).
**Local-only modifications at time of archive:** 11 working-tree changes (modified pages/*.html, several src/assets/*.svg, src/js/runtime-config.js). Preserved in archive — not committed.

**Do not push from this clone.** The remote it targets (`NODRFTSYSTEMS/NODRFTSYSTEMS`) is now the home of the Next.js site. A push from this clone would either:
- Be rejected (history diverged from current `origin/main` which is now the monorepo containing `nodrft-web`), or
- If forced, would overwrite the live site source. Never force-push from this archive.

**Outstanding follow-up at archive time:**
- The `deploy-pages.yml` workflow on the GitHub repo will continue to fire on every push to `main` until the Pages source is set to **None** in repo Settings → Pages, and the workflow is disabled in repo Settings → Actions. This must be done in the GitHub UI; it is the responsibility of whoever maintains the production site.

**Authority for archive:** Founder, 2026-05-08, via final-sweep priority list approval.
**Disclosure gate:** Archive contains only NoDrftSystems-owned static site content (no client data, no API keys, no internal SOPs, no agent prompts). Safe to retain in this workspace.
