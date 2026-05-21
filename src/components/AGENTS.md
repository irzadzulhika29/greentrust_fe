# Shared Components

## Package Identity
- `src/components/` contains reusable UI building blocks and shared layout chrome.
- Current structure is split into `ui/` for primitives/composite widgets and `shared/` for app-level wrappers.

## Setup & Run
- Run app from repo root: `npm run dev`
- Lint repo from root: `npm run lint`
- List component files: `rg --files src/components`

## Patterns & Conventions
- Keep reusable layout wrappers in `src/components/shared/`.
- Keep UI primitives or standalone composite widgets in `src/components/ui/`.
- Follow existing export style:
  - default export for single-purpose shared wrappers like `src/components/shared/AppLayout.jsx`
  - named export when the module exposes a primary widget plus helper subcomponents, as in `src/components/ui/sidebar.jsx`
- Use Tailwind classes for structure and spacing, with CSS variables from `src/index.css` for theme values.
- DO preserve the sidebar/layout contract in `src/components/shared/AppLayout.jsx`: sidebar fixed, content offset via `md:ml-64`.
- DO reuse motion patterns already present in `src/components/ui/sidebar.jsx` if changing sidebar interactions.
- DO keep form/auth UI aligned with `src/components/ui/sign-in.jsx` when editing login/register flows.
- DON'T introduce gradient backgrounds or accent borders at rest; `DESIGN.md` forbids them.
- DON'T hardcode navigation labels unrelated to GreenTrust product roles if you are touching `src/components/ui/sidebar.jsx`; the current labels are generic scaffolding and should move toward `PLAN.md`, not further away.

## Key Files
- `src/components/shared/AppLayout.jsx` - private shell wrapper
- `src/components/ui/sidebar.jsx` - current mobile/desktop sidebar behavior
- `src/components/ui/sign-in.jsx` - auth-facing reusable UI
- `src/index.css` - global variables consumed by UI components

## JIT Index Hints
- Find named exports: `rg -n '^export \\{' src/components`
- Find default exports: `rg -n '^export default' src/components`
- Find CSS variable usage: `rg -n 'var\\(--' src/components src/index.css`
- Find motion usage in components: `rg -n 'motion\\.|AnimatePresence' src/components`
- Find generic placeholder copy to replace: `rg -n 'Home|Notifications|Categories|View profile|GreenTrust User' src/components`

## Common Gotchas
- `src/components/ui/sidebar.jsx` still contains generic scaffold copy and should be treated as a transitional component.
- Motion, styling variables, and raw anchor tags coexist in the sidebar; if you modernize it, fix the structure holistically instead of patching one label at a time.
- Shared components should stay product-agnostic where possible, but current reality includes some domain copy; keep cleanup incremental.

## Pre-PR Checks
`npm run lint && rg -n 'Sidebar|SignInPage|AppLayout' src/components src/features`
