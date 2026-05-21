# Feature Modules

## Package Identity
- `src/features/` holds domain and role-specific pages.
- Current modules are `auth`, `public`, `umkm`, `auditor`, and `admin`. `investor` is planned in `PLAN.md` but not created yet.

## Setup & Run
- Start app from repo root: `npm run dev`
- Lint repo from root: `npm run lint`
- List feature files: `rg --files src/features`
- Find all feature exports: `rg -n 'export \\{|\bexport default\b' src/features`

## Patterns & Conventions
- Each feature exports through an `index.js` barrel plus page files under `pages/`.
- Keep pages named `*Page.jsx`, matching existing files like:
  - `src/features/auth/pages/LoginPage.jsx`
  - `src/features/public/pages/LandingPage.jsx`
  - `src/features/umkm/pages/DashboardPage.jsx`
- Route names and page responsibilities must match `PLAN.md` section 3 before you add or rename anything.
- DO keep role-specific flows inside their own feature folder, even when UI is still placeholder.
- DO use the auth feature for login/register behavior and keep form submit wiring close to the page, as in `src/features/auth/pages/LoginPage.jsx`.
- DO treat `src/features/public/pages/LandingPage.jsx` as the reference for current public-facing polish.
- DON'T mix admin/auditor/umkm logic into a shared page just because the current placeholders are minimal.
- DON'T create an `investor` folder with guessed flows that exceed `PLAN.md`; investor MVP is read-only explorer per the plan.
- Placeholder pages like `src/features/umkm/pages/DashboardPage.jsx` and `src/features/admin/pages/DashboardPage.jsx` are scaffolds. Replace them incrementally instead of layering complex abstractions on top of placeholder text.

## Key Files
- `src/features/public/pages/LandingPage.jsx` - most mature current page, sets public visual baseline
- `src/features/auth/pages/LoginPage.jsx` - current login submit pattern and `useNavigate` usage
- `src/features/auth/pages/RegisterPage.jsx` - registration entry point to extend for role selection
- `src/features/umkm/pages/*.jsx` - target area for onboarding, evidence, passport flow
- `src/features/auditor/pages/*.jsx` - target area for low-confidence review flow from `PLAN.md` phase 3
- `src/features/admin/pages/*.jsx` - target area for platform monitoring and reports

## JIT Index Hints
- Find all role pages: `rg --files src/features | rg '(auth|public|umkm|auditor|admin).+Page\\.jsx$'`
- Find placeholder content: `rg -n '<div>.*</div>' src/features`
- Find navigation redirects: `rg -n 'navigate\\(|Navigate to=' src/features src/router.jsx`
- Find planned-but-missing pages referenced in docs: `rg -n 'EvidenceVaultPage|PassportPage|Investor|ReportsPage' PLAN.md docs`

## Common Gotchas
- There are no route guards yet, even though `PLAN.md` explicitly requires them before later phases.
- Several current pages only return a single `<div>` placeholder, so preserve naming and role boundaries while upgrading them.
- `LoginPage.jsx` currently logs form data and redirects locally; do not mistake it for real auth integration.

## Pre-PR Checks
`npm run lint && rg -n 'Route path=' src/router.jsx`
