# Investor Onboarding Design

Date: 2026-05-21
Status: Approved for planning
Owner: Codex + user

## Context

The repo currently contains:

- investor auth entry pages:
  - `src/features/auth/pages/InvestorLoginPage.jsx`
  - `src/features/auth/pages/InvestorRegisterPage.jsx`
- a UMKM-only onboarding flow:
  - `src/features/auth/pages/OnboardingPage.jsx`
- no dedicated investor feature folder yet

The current investor register page still redirects directly into investor area logic. The user wants investor onboarding introduced first before entering the investor dashboard.

The target dashboard after investor onboarding is:

- `src/features/investor/pages/InvestorDashboardPage.jsx`

## Problem

Investor registration now exists, but there is no investor onboarding flow that establishes:

- verified personal identity
- professional credibility
- a trustable investor profile before entering the dashboard

The existing UMKM onboarding cannot be reused directly because its purpose and fields are fundamentally different.

## Decision Summary

Add a dedicated investor onboarding flow with three steps:

1. `Identitas Diri`
2. `Riwayat Pekerjaan`
3. `Selesai`

This onboarding is investor-specific and separate from UMKM onboarding.

Investor register success should lead into investor onboarding instead of jumping straight into investor dashboard.

The final step is a completion page, not an automatic redirect. The user must explicitly continue into the investor dashboard.

## Route Decision

Add a new route:

- `/investor/onboarding`

Behavior:

- investor register success -> `/investor/onboarding`
- investor onboarding step progression stays in the same route and is handled by page state
- final CTA in step 3 routes to investor dashboard

Dashboard target:

- `/investor/dashboard`
- page implementation target: `src/features/investor/pages/InvestorDashboardPage.jsx`

## Step Design

### Step 1: Identitas Diri

Purpose:

- establish that the investor is a real, identifiable professional
- build trust with UMKM without exposing private raw KTP data publicly

Core interaction:

- upload KTP
- OCR result appears
- user checks and corrects data

Fields shown in the step:

- nama depan
- nama belakang
- NIK masked
- tempat lahir
- tanggal lahir
- no. HP aktif
- email notifikasi

UX notes:

- KTP is marked private
- text explains that data is used to build trust with UMKM
- KTP must not be shown publicly to UMKM

### Step 2: Riwayat Pekerjaan

Purpose:

- establish investor credibility through professional history
- give UMKM enough context to evaluate the investor before accepting engagement

Core interaction:

- add at least one professional experience entry
- fill current institution and role details
- see a live investor profile preview

Fields shown in the step:

- jabatan / posisi
- institusi / perusahaan
- jenis pekerjaan
- lokasi
- tanggal mulai
- tanggal selesai
- checkbox sedang aktif
- deskripsi pencapaian
- skill terkait

Supporting UI:

- investor profile preview card
- experience timeline list
- trust/credibility helper copy

### Step 3: Selesai

Purpose:

- confirm that investor onboarding is completed
- show a compact summary of investor identity and professional profile
- provide an intentional handoff into dashboard

Main CTA:

- `Masuk ke Dashboard`

Target:

- `src/features/investor/pages/InvestorDashboardPage.jsx`

## Component Boundary

Create a dedicated investor onboarding page:

- `src/features/auth/pages/InvestorOnboardingPage.jsx`

Create dedicated step components under auth components:

- `InvestorOnboardingHeader.jsx`
- `InvestorOnboardingIdentityStep.jsx`
- `InvestorOnboardingCareerStep.jsx`
- `InvestorOnboardingCompleteStep.jsx`
- `InvestorProfilePreviewCard.jsx`

Reasoning:

- the page shell and step navigation can conceptually mirror current onboarding structure
- the actual content and field model should not be coupled to UMKM onboarding components

## Reuse Strategy

Can reuse:

- general page framing ideas from `OnboardingPage.jsx`
- visual language from the existing auth/onboarding pages

Should not reuse directly:

- `OnboardingIdentitasDiri`
- `OnboardingIdentitasBisnis`

Reason:

- those components encode UMKM-oriented input requirements and completion logic

## Data And State Model

The frontend should keep local onboarding state for the flow while backend contracts are still incomplete in this repo.

Suggested state split:

- `identityForm`
  - firstName
  - lastName
  - nikMasked
  - birthPlace
  - birthDate
  - phone
  - notificationEmail
  - ktpFileMeta

- `careerForm`
  - roleTitle
  - institutionName
  - workType
  - location
  - startDate
  - endDate
  - isCurrent
  - achievementSummary
  - skills[]

- `completionSummary`
  - derived from identity + career state

No fake production persistence layer should be introduced only to support this slice.

## Dashboard Handoff

After step 3 completion CTA:

- navigate to `/investor/dashboard`
- route should resolve to `src/features/investor/pages/InvestorDashboardPage.jsx`

If the dashboard page does not exist yet, the implementation may temporarily target a placeholder investor page, but the route/file contract should be aligned to `InvestorDashboardPage.jsx`.

## Scope For Implementation

In scope:

- add investor onboarding route
- add investor onboarding page and step components
- update investor register success path to onboarding
- add final CTA to investor dashboard
- introduce live investor profile preview on step 2

Out of scope:

- backend OCR integration
- real KTP upload persistence
- real profile approval scoring
- investor-to-UMKM proposal features
- changes to UMKM onboarding

## Documentation Alignment Needed

`PLAN.md` and auth route documentation should be updated to note:

- investor onboarding is now present
- investor register success no longer jumps directly to dashboard
- investor onboarding is separate from UMKM onboarding

## Risks And Mitigations

### Risk: investor onboarding drifts toward a full CRM

Mitigation:

- keep step 2 limited to one clear professional profile + experience summary
- do not add proposal, messaging, or portfolio systems in this pass

### Risk: confusion between private identity and public credibility data

Mitigation:

- step 1 copy must explicitly mark KTP/private identity as private
- step 2 preview must emphasize professional profile, not sensitive KTP data

### Risk: coupling investor onboarding to UMKM onboarding internals

Mitigation:

- keep investor step components separate
- reuse only shell/layout concepts, not form components with business-specific assumptions

## Acceptance Criteria For Planning

- investor has a dedicated onboarding route
- onboarding has exactly three steps: identity, career, completion
- investor register success leads into onboarding
- final onboarding CTA leads to investor dashboard
- investor onboarding components are separate from UMKM onboarding components
