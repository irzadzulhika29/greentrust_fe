# Frontend App

## Package Identity
- This folder contains the Vite SPA entrypoints, global styling, router, shared layout glue, and all product-facing features.
- The current app is frontend-first scaffolding for the GreenTrust Passport MVP described in `PLAN.md`.

## Setup & Run
- Install deps from repo root: `npm install`
- Start dev server from repo root: `npm run dev`
- Build from repo root: `npm run build`
- Lint from repo root: `npm run lint`
- Inspect top-level app files: `rg --files src`

## Patterns & Conventions
- App shell is intentionally thin:
  - `src/App.jsx` mounts only the router.
  - `src/router.jsx` is the routing source of truth.
  - `src/components/shared/AppLayout.jsx` wraps sidebar-driven private areas.
- Use `@/` imports for internal modules.
- Keep route pages under `src/features/**/pages/` and import them into `src/router.jsx`.
- Keep global design tokens and animations in `src/index.css`; avoid scattering global CSS across feature folders.
- DO follow the current composition pattern from `src/App.jsx` and `src/router.jsx`.
- DO reuse `src/components/shared/AppLayout.jsx` when a page belongs inside the private shell.
- DO keep public pages sidebar-free, matching `src/features/public/pages/LandingPage.jsx`.
- DON'T add direct backend assumptions inside `src/App.jsx` or `src/main.jsx`; this layer should stay bootstrapping-only.
- DON'T bypass the alias convention with deep relative imports like `../../../components/...` when `@/` is available.
- If `PLAN.md` introduces a new route such as `/passport/:slug` or `/investor`, add the page file first, then wire the route, then update nav/layout if needed.

## Key Files
- `src/main.jsx` - Vite bootstrap
- `src/App.jsx` - root app component
- `src/router.jsx` - all current routes
- `src/index.css` - global tokens, typography, motion helpers
- `src/App.css` - leftover starter styles; verify whether new work belongs here before adding more

## JIT Index Hints
- Find route definitions: `rg -n 'Route path=' src/router.jsx`
- Find all pages: `rg --files src/features | rg 'pages/.+\\.jsx$'`
- Find all layout wrappers: `rg -n 'AppLayout' src`
- Find all global CSS variables: `rg -n '^\\s*--' src/index.css`
- Find inline links that should become router-aware: `rg -n 'href="/|href="#"' src`

## Common Gotchas
- `src/App.css` still contains starter/demo styles from the Vite scaffold; do not copy its patterns blindly into product UI.
- `src/index.css` and `DESIGN.md` are partially out of sync on accent direction; prefer the explicit product/UI instruction the user gives for the active task, and keep the repo internally consistent.
- There is no test harness configured yet; lint is the only built-in automated check in this workspace.

## Pre-PR Checks
`npm run lint && npm run build`
