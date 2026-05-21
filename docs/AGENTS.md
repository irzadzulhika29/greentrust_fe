# Product Docs

## Package Identity
- `docs/` holds product requirement documents.
- In this repo, docs must be read together with root-level `PLAN.md` and `DESIGN.md`, because product, execution, and visual rules are intentionally split.

## Setup & Run
- List docs: `Get-ChildItem docs`
- Find headings across canonical docs: `rg -n '^#|^## ' PLAN.md DESIGN.md docs/*.md`
- Compare references to routes/features: `rg -n 'src/features|router|Route|passport|investor|auditor' PLAN.md docs`

## Patterns & Conventions
- `docs/PRD_2.md` is the canonical feature/business document.
- `PLAN.md` is the execution and architecture source of truth for this workspace.
- `DESIGN.md` is binding for visual decisions and can override generic PRD styling assumptions.
- DO document technical deviations in `PLAN.md` section 1 or section 7 instead of silently drifting from the PRD.
- DO keep role naming consistent with the current plan: UMKM, Auditor, Admin, Investor.
- DO reference actual workspace paths when describing implementation targets, as `PLAN.md` already does.
- DON'T rewrite documentation as if backend, Supabase migrations, or blockchain code already exist in this repo.
- DON'T duplicate the whole PRD into new docs when a short link or section reference is enough.

## Key Files
- `PLAN.md` - execution plan, current architecture, folder mapping, phases
- `DESIGN.md` - non-negotiable UI rules
- `docs/PRD_2.md` - canonical product requirements
- `docs/PRD_1.md` - older companion copy noted in `PLAN.md`

## JIT Index Hints
- Find architecture decisions: `rg -n 'Keputusan|Boundary penting|Arsitektur Target' PLAN.md`
- Find feature mapping: `rg -n 'Mapping PRD|Folder Codebase|Route' PLAN.md`
- Find phase sequencing: `rg -n 'Fase [0-9]|DoD' PLAN.md`
- Find design constraints: `rg -n 'No gradients|No colorful borders|Accessibility' DESIGN.md`

## Common Gotchas
- `PLAN.md` contains mojibake characters from encoding issues in places; read semantically, not literally.
- The docs describe target architecture beyond the current workspace. Separate "exists in repo now" from "planned later" in any summary or implementation note.
- If docs and code disagree, update the execution note rather than hiding the discrepancy.

## Pre-PR Checks
`rg -n 'TODO|TBD|Open questions|Keputusan' PLAN.md DESIGN.md docs`
