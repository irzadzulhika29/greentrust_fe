# Auth Role Split Design

Date: 2026-05-21
Status: Approved for planning
Owner: Codex + user

## Context

Current workspace already has:

- `src/features/auth/pages/LoginPage.jsx`
- `src/features/auth/pages/RegisterPage.jsx`
- `src/features/auth/pages/OnboardingPage.jsx`

Current behavior mixes two different concerns:

- login/register UI, which is largely similar for UMKM and investor
- post-auth flow, which diverges by role, especially for onboarding

`PLAN.md` already establishes role-scoped private areas such as `/umkm/...` and `/investor/...`. The current auth flow does not yet fully reflect that separation.

## Problem

The repo needs investor-specific login and register paths without forcing a full rewrite of the existing UMKM auth flow in the same pass.

The main design tension is:

- login/register UI is similar enough to share structure
- onboarding is role-specific and should not be unified

## Decision Summary

Use shared auth UI components for login/register, but keep route ownership role-specific.

For this pass, implement investor auth routes first and preserve the existing UMKM flow as-is unless a small compatibility adjustment is required.

Onboarding remains role-specific and is not unified.

## Route Decisions

### Current-state routes kept for UMKM

- `/login`
- `/register`
- `/onboarding`

These remain the active UMKM entry points during this investor-first slicing pass.

### New investor routes

- `/investor/login`
- `/investor/register`

These routes represent explicit investor intent and should not rely on an in-page role toggle as the primary source of state.

### Future target alignment

Longer-term route alignment may still move UMKM onboarding to `/umkm/onboarding` to match `PLAN.md` role scoping, but that migration is out of scope for this pass unless needed for documentation clarity.

## UX Behavior

### Login

- `/login` remains the default UMKM login page
- `/investor/login` is the investor login page
- each page exposes a clear CTA to switch to the other role path
- role switching changes the URL, not only local component state

### Register

- `/register` remains the default UMKM registration page
- `/investor/register` is the investor registration page
- each page exposes a clear CTA to switch to the other role path
- role switching changes the URL, not only local component state

### Redirect behavior

Successful auth must ultimately redirect based on authenticated account role and completion state, not only based on the page currently open.

Target behavior:

- UMKM register success -> onboarding flow
- UMKM login success -> onboarding or dashboard depending on completion state
- Investor register success -> investor landing area
- Investor login success -> investor landing area

For this pass, the concrete implementation focus is investor route entry and investor redirect behavior, while UMKM behavior should remain unchanged unless a minimal compatibility update is required.

## Component Boundary

Shared auth UI should move into reusable components under `src/features/auth/components/`.

Recommended shared pieces:

- `AuthShell` for the two-column auth layout and reusable framing
- `LoginForm` for common login fields and submit affordance
- `RegisterForm` for common register fields and submit affordance
- optional small CTA/switch components for cross-role navigation

Role-specific page wrappers stay at the page layer:

- `LoginPage.jsx` for UMKM
- `RegisterPage.jsx` for UMKM
- `InvestorLoginPage.jsx` for investor
- `InvestorRegisterPage.jsx` for investor

Each wrapper is responsible for:

- role-specific copy
- role switch destination
- role-specific redirect target
- any role-specific submission payload additions

## Onboarding Boundary

Onboarding is intentionally not shared.

Reasons:

- onboarding captures role-specific identity and completion requirements
- UMKM onboarding already exists and maps to business profile completion
- investor onboarding, if introduced later, will likely require different fields and a different success state

Therefore:

- UMKM onboarding remains separate
- investor onboarding is not introduced in this pass unless explicitly defined later

## Implementation Scope For The Next Pass

In scope:

- add investor login route and page
- add investor register route and page
- introduce shared auth shell/form components only where needed to support investor flow cleanly
- wire role-switch CTAs between UMKM and investor auth pages
- keep existing UMKM auth behavior stable
- update docs and router source of truth to reflect investor routes

Out of scope:

- full UMKM auth refactor
- replacing existing UMKM onboarding flow
- introducing investor onboarding
- backend auth redesign beyond the minimum contract needed by the current frontend slice

## Required Documentation Alignment

`PLAN.md` should be updated to reflect:

- investor-specific auth routes are added first
- UMKM auth routes remain current-state in this pass
- onboarding remains role-specific
- shared auth UI is a frontend implementation boundary, not a shared onboarding model

If `PLAN.md` currently implies a single toggle-based register entry as the only target model, that should be revised to reflect explicit investor auth paths for this implementation phase.

## Architecture Notes

- Route definitions remain centralized in `src/router.jsx`
- Auth pages remain under `src/features/auth/pages/`
- Shared auth building blocks remain under `src/features/auth/components/`
- No fake persistence or invented production auth abstraction should be introduced only to support this slice

## Risks And Mitigations

### Risk: duplication between UMKM and investor auth pages

Mitigation:

- keep page wrappers thin
- move only clearly reusable layout/form pieces into shared components

### Risk: docs and code drift on onboarding path naming

Mitigation:

- document current-state UMKM onboarding path explicitly in `PLAN.md`
- treat `/umkm/onboarding` as a possible later normalization, not an accidental partial migration in this pass

### Risk: redirect logic inferred only from visible page

Mitigation:

- keep final redirect contract tied to authenticated role and completion status

## Acceptance Criteria For Planning

- investor has explicit login and register paths
- UMKM keeps its existing auth flow intact during this slice
- shared auth components are limited to login/register UI concerns
- onboarding is treated as role-specific
- route and documentation changes describe the same model
