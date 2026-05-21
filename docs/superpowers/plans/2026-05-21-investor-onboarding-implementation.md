# Investor Onboarding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated investor onboarding flow with three steps, route investor registration into that flow, and hand off to `src/features/investor/pages/InvestorDashboardPage.jsx` only after the completion step at `/investor/dashboard`.

**Architecture:** Keep investor onboarding under `src/features/auth/` because it is the continuation of auth completion, but make all investor onboarding step components separate from UMKM onboarding. Preserve `/investor` as the public investor directory and use `/investor/dashboard` as the authenticated investor entry so onboarding can hand off safely without colliding with public routes.

**Tech Stack:** React 19, React Router 7, Vite 8, Tailwind CSS v4, ESLint

---

## File Map

### Existing files to modify

- `PLAN.md`
  - Document investor onboarding route and updated register success behavior.
- `src/router.jsx`
  - Add `/investor/onboarding`.
  - Preserve `/investor` as public and make `/investor/dashboard` the authenticated dashboard entry.
- `src/features/auth/pages/InvestorRegisterPage.jsx`
  - Redirect successful investor registration into onboarding instead of investor area.

### New files to create

- `src/features/auth/pages/InvestorOnboardingPage.jsx`
  - State owner for the 3-step onboarding flow.
- `src/features/auth/components/InvestorOnboardingHeader.jsx`
  - Shared top bar and step indicator for investor onboarding.
- `src/features/auth/components/InvestorOnboardingIdentityStep.jsx`
  - Step 1 UI and local identity form contract.
- `src/features/auth/components/InvestorOnboardingCareerStep.jsx`
  - Step 2 UI and live investor profile preview area.
- `src/features/auth/components/InvestorOnboardingCompleteStep.jsx`
  - Step 3 completion summary and CTA to dashboard.
- `src/features/auth/components/InvestorProfilePreviewCard.jsx`
  - Preview card used on step 2 and optionally step 3 summary.

### Files to inspect during implementation

- `src/features/auth/pages/OnboardingPage.jsx`
  - Reference only for shell rhythm and step progression.
- `src/features/investor/pages/InvestorDashboardPage.jsx`
  - Confirm dashboard target and adjust route expectation if needed.

### Verification commands

- `npm run lint`
- `npm run build`

---

### Task 1: Align docs and investor route contract before building onboarding

**Files:**
- Modify: `PLAN.md`
- Modify: `src/router.jsx`

- [ ] **Step 1: Update `PLAN.md` to acknowledge investor onboarding**

Revise the auth and route notes so they explicitly mention:

```md
- `/investor/register` — investor registration entry
- `/investor/onboarding` — investor onboarding flow (identity, work history, completion)
- `/investor/dashboard` — investor authenticated dashboard entry
- investor register success routes to onboarding before dashboard
```

Also revise any nearby wording that still implies investor register goes straight to dashboard.

- [ ] **Step 2: Normalize investor route contract in `src/router.jsx`**

Keep public investor routes on `/investor` and move the authenticated investor entry target to `/investor/dashboard`.

Use this target route model:

```jsx
<Route path="/investor" element={<InvestorDirectoryPage />} />
<Route path="/investor/:slug" element={<InvestorDetailPage />} />

<Route path="/investor/dashboard" element={<InvestorLayout />}>
  <Route index element={<InvestorDashboardPage />} />
</Route>

<Route path="/investor/proposal" element={<InvestorLayout><InvestorProposalPage /></InvestorLayout>} />
<Route path="/investor/profil" element={<InvestorLayout><InvestorProfilPage /></InvestorLayout>} />
<Route path="/investor/disimpan" element={<InvestorLayout><InvestorDisimpanPage /></InvestorLayout>} />

<Route path="/investor/onboarding" element={<InvestorOnboardingPage />} />
```

This keeps `/investor` public and makes `/investor/dashboard` the onboarding completion target.

- [ ] **Step 3: Add a temporary failing import for `InvestorOnboardingPage`**

Before the page exists, add:

```jsx
import InvestorOnboardingPage from '@/features/auth/pages/InvestorOnboardingPage'
```

Expected:
- build should fail with module not found for the onboarding page

- [ ] **Step 4: Verify the route-level failure**

Run: `npm run build`

Expected:
- FAIL with missing `InvestorOnboardingPage`

---

### Task 2: Build the investor onboarding shell page and header

**Files:**
- Create: `src/features/auth/pages/InvestorOnboardingPage.jsx`
- Create: `src/features/auth/components/InvestorOnboardingHeader.jsx`

- [ ] **Step 1: Create `InvestorOnboardingHeader.jsx`**

Implement a top bar with:

- brand at left
- investor pill label
- step indicator for 3 steps
- exit button at right

Target API:

```jsx
const InvestorOnboardingHeader = ({ step, onExit }) => { ... }
```

Step labels:

- `Identitas Diri`
- `Riwayat Pekerjaan`
- `Selesai`

- [ ] **Step 2: Create `InvestorOnboardingPage.jsx` with local state and placeholder step switching**

Initial page responsibilities:

- hold `step` state
- hold `identityForm` state
- hold `careerForm` state
- render `InvestorOnboardingHeader`
- render temporary placeholders for each step

Use this initial skeleton shape:

```jsx
const InvestorOnboardingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [identityForm, setIdentityForm] = useState({
    firstName: '',
    lastName: '',
    nikMasked: '',
    birthPlace: '',
    birthDate: '',
    phone: '',
    notificationEmail: '',
    ktpFileMeta: null,
  })
  const [careerForm, setCareerForm] = useState({
    roleTitle: '',
    institutionName: '',
    workType: 'Full-time',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: true,
    achievementSummary: '',
    skills: [],
  })

  return (...)
}
```

Temporary step placeholder text is acceptable in this task because real step components are introduced in the next tasks.

- [ ] **Step 3: Verify build passes with the onboarding shell present**

Run: `npm run build`

Expected:
- PASS

---

### Task 3: Implement Step 1 investor identity flow

**Files:**
- Create: `src/features/auth/components/InvestorOnboardingIdentityStep.jsx`
- Modify: `src/features/auth/pages/InvestorOnboardingPage.jsx`

- [ ] **Step 1: Create `InvestorOnboardingIdentityStep.jsx`**

This component should render:

- step caption like `Langkah 1 dari 3`
- page title `Verifikasi identitas Anda.`
- trust/privacy support copy
- KTP upload placeholder area
- OCR result form

Field contract:

- `firstName`
- `lastName`
- `nikMasked`
- `birthPlace`
- `birthDate`
- `phone`
- `notificationEmail`

Target API:

```jsx
const InvestorOnboardingIdentityStep = ({
  values,
  onChange,
  onNext,
}) => { ... }
```

- [ ] **Step 2: Add minimal local fake OCR starter values in page state for visual slicing**

For frontend slicing, seed a realistic default state after mock upload trigger, for example:

```js
{
  firstName: 'Arnold',
  lastName: 'Prasetyo',
  nikMasked: '3174 xx xxxx xx 1421',
  birthPlace: 'Jakarta',
  birthDate: '11/03/1988',
  phone: '0812 9988 7766',
  notificationEmail: 'arnold@ekuator.id',
}
```

This is acceptable because the repo still has no real OCR backend integration.

- [ ] **Step 3: Wire step 1 into `InvestorOnboardingPage.jsx`**

Replace the placeholder view with the real identity step and transition to step 2 on next.

- [ ] **Step 4: Verify build**

Run: `npm run build`

Expected:
- PASS

---

### Task 4: Implement Step 2 career flow and investor profile preview

**Files:**
- Create: `src/features/auth/components/InvestorProfilePreviewCard.jsx`
- Create: `src/features/auth/components/InvestorOnboardingCareerStep.jsx`
- Modify: `src/features/auth/pages/InvestorOnboardingPage.jsx`

- [ ] **Step 1: Create `InvestorProfilePreviewCard.jsx`**

The preview card should summarize:

- investor initials or mini avatar
- investor name
- role title
- institution
- selected skill tags
- ticket/focus summary placeholders if needed

Target API:

```jsx
const InvestorProfilePreviewCard = ({ identityValues, careerValues }) => { ... }
```

- [ ] **Step 2: Create `InvestorOnboardingCareerStep.jsx`**

This step should include:

- step caption `Langkah 2 dari 3`
- title `Riwayat pekerjaan & institusi Anda.`
- main form for:
  - role title
  - institution name
  - work type
  - location
  - start date
  - end date
  - is current
  - achievement summary
  - skills
- right-side preview area using `InvestorProfilePreviewCard`
- simple experience timeline summary block

Target API:

```jsx
const InvestorOnboardingCareerStep = ({
  identityValues,
  values,
  onChange,
  onBack,
  onNext,
}) => { ... }
```

- [ ] **Step 3: Seed realistic initial career preview values**

Use frontend-only defaults such as:

```js
{
  roleTitle: 'Principal',
  institutionName: 'Ekuator Hijau Ventures',
  workType: 'Full-time',
  location: 'Jakarta · Hybrid',
  startDate: 'Apr 2023',
  endDate: 'Sekarang',
  isCurrent: true,
  achievementSummary: 'Mengelola portofolio 12 UMKM tekstil & agrikultur di Indonesia...',
  skills: ['Green Finance', 'Due Diligence', 'ESG Scoring'],
}
```

- [ ] **Step 4: Wire step 2 into `InvestorOnboardingPage.jsx`**

Replace the placeholder step 2 with the real career step and advance to step 3.

- [ ] **Step 5: Verify build**

Run: `npm run build`

Expected:
- PASS

---

### Task 5: Implement Step 3 completion and dashboard handoff

**Files:**
- Create: `src/features/auth/components/InvestorOnboardingCompleteStep.jsx`
- Modify: `src/features/auth/pages/InvestorOnboardingPage.jsx`
- Modify: `src/features/auth/pages/InvestorRegisterPage.jsx`

- [ ] **Step 1: Create `InvestorOnboardingCompleteStep.jsx`**

This component should render:

- step caption `Langkah 3 dari 3`
- completion title and reassuring summary
- compact identity/professional summary
- CTA `Masuk ke Dashboard`

Target API:

```jsx
const InvestorOnboardingCompleteStep = ({
  identityValues,
  careerValues,
  onBack,
  onContinue,
}) => { ... }
```

- [ ] **Step 2: Wire final step navigation in `InvestorOnboardingPage.jsx`**

Final CTA behavior:

```jsx
onContinue={() => navigate('/investor/dashboard')}
```

- [ ] **Step 3: Change investor register success redirect**

In `src/features/auth/pages/InvestorRegisterPage.jsx`, change OTP-success navigation from:

```js
navigate('/investor')
```

to:

```js
navigate('/investor/onboarding')
```

- [ ] **Step 4: Verify build**

Run: `npm run build`

Expected:
- PASS

---

### Task 6: Final verification

**Files:**
- Modify if needed: any files above only to fix verification issues

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected:
- PASS

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected:
- PASS

- [ ] **Step 3: Verify route and redirect contracts in code**

Run:

```bash
rg -n "/investor/onboarding|/investor/dashboard|navigate\\('/investor/onboarding'\\)|navigate\\('/investor/dashboard'\\)|InvestorDashboardPage|path=\"/investor\"" src/router.jsx src/features/auth src/features/investor
```

Expected:

- `/investor/onboarding` is present in router
- investor register success navigates to `/investor/onboarding`
- onboarding completion navigates to `/investor/dashboard`
- `/investor` remains public directory
- `/investor/dashboard` resolves to investor dashboard shell contract

---

## Self-Review

### Spec coverage

- dedicated investor onboarding route: Task 1
- three steps only: Task 3, Task 4, Task 5
- register success to onboarding: Task 5
- completion CTA to dashboard: Task 5
- separation from UMKM onboarding: Task 2 through Task 5 component boundaries

### Placeholder scan

No `TBD`, `TODO`, or deferred implementation markers remain in plan steps.

### Type consistency

Planned component names are consistent:

- `InvestorOnboardingPage`
- `InvestorOnboardingHeader`
- `InvestorOnboardingIdentityStep`
- `InvestorOnboardingCareerStep`
- `InvestorOnboardingCompleteStep`
- `InvestorProfilePreviewCard`
