# GreenTrust Passport

## Project Snapshot
- Single-app frontend repo, not a monorepo.
- Stack in workspace today: React 19, Vite 8, React Router 7, Tailwind CSS v4, Framer Motion, ESLint.
- Product/source-of-truth split:
  - `docs/PRD_2.md` for feature/business rules
  - `PLAN.md` for execution plan and architecture decisions
  - `DESIGN.md` for UI constraints
- Current workspace contains frontend scaffolding and one n8n workflow. Backend Go, Supabase schema, and smart contracts are planned but not present here yet.

## Root Setup Commands
- Install deps: `npm install`
- Run dev app: `npm run dev`
- Build app: `npm run build`
- Lint repo: `npm run lint`
- Preview production build: `npm run preview`
- Find all route pages: `rg --files src/features`
- Find all docs anchors: `rg -n "^## " PLAN.md docs/*.md DESIGN.md`

## Universal Conventions
- Preserve the current stack. Do not introduce Next.js, SSR-only assumptions, or backend-only abstractions into this repo unless the task explicitly changes architecture.
- Treat `PLAN.md` as the execution reality. If it conflicts with PRD wording, follow `PLAN.md` and document the deviation.
- Treat `DESIGN.md` as binding for UI work. No gradients, no colorful borders at rest, and keep surfaces flat.
- Prefer alias imports from `@/` for code under `src/`, matching `src/router.jsx` and `src/components/shared/AppLayout.jsx`.
- Keep feature work role-scoped under `src/features/<role-or-domain>/`.
- When adding routes, update `src/router.jsx` first and keep route names aligned with `PLAN.md` section 3.
- Keep placeholder pages simple until the real flow exists; do not invent fake API clients or fake persistence layers as if they were production.

## Security & Secrets
- Never commit real Supabase keys, blockchain keys, or service credentials.
- `.env` values are local-only; only expose browser-safe variables with `VITE_` prefix.
- Do not make private evidence/document URLs public in frontend code.
- If a task touches auth/data boundaries, align with `PLAN.md` section 2 and section 4 before editing.

## JIT Index
### Area Guides
- Frontend app: [src/AGENTS.md](src/AGENTS.md)
- Feature modules and routing: [src/features/AGENTS.md](src/features/AGENTS.md)
- Shared layout and UI primitives: [src/components/AGENTS.md](src/components/AGENTS.md)
- Workflow automation: [n8n/AGENTS.md](n8n/AGENTS.md)
- Product and execution docs: [docs/AGENTS.md](docs/AGENTS.md)

### Quick Find Commands
- Find routes: `rg -n 'Route path=|Navigate to=' src/router.jsx src/features`
- Find alias imports: `rg -n "@/.*" src`
- Find Tailwind utility usage: `rg -n 'className=' src`
- Find TODOs/placeholders: `rg -n 'TODO|placeholder|Dashboard</div>|Claim</div>|Profile</div>' src`
- Find motion usage: `rg -n 'framer-motion|motion\\.|AnimatePresence' src`
- Inspect docs decisions: `rg -n 'Keputusan|Boundary penting|DoD|Open questions' PLAN.md docs`

## Definition Of Done
- The edited area follows the nearest relevant `AGENTS.md` plus `DESIGN.md` and `PLAN.md`.
- `npm run lint` passes when code changed in `src/`.
- Route, component, and copy changes stay consistent with the role and domain naming already used in the repo.
- Any new architecture assumption is reflected in `PLAN.md` or clearly called out to the user.
