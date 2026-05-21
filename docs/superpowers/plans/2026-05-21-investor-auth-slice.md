# Investor Auth Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add explicit investor login/register routes while preserving the current UMKM auth flow and introducing shared login/register UI building blocks that can be reused later.

**Architecture:** Keep route ownership role-specific at the page layer, but extract reusable auth shell and form primitives into `src/features/auth/components/`. Do not unify onboarding. Investor pages become thin wrappers around shared UI, and existing UMKM pages are only touched where necessary to support cross-role navigation and shared presentation.

**Tech Stack:** React 19, React Router 7, Vite 8, Tailwind CSS v4, ESLint

---

## File Map

### Existing files to modify

- `PLAN.md`
  - Update auth mapping and route notes to reflect investor-first explicit routes and current-state UMKM onboarding path.
- `src/router.jsx`
  - Add `/investor/login` and `/investor/register` routes.
- `src/features/auth/pages/LoginPage.jsx`
  - Preserve UMKM ownership, but switch internal structure to shared auth building blocks and add CTA path to investor login.
- `src/features/auth/pages/RegisterPage.jsx`
  - Preserve UMKM ownership, but switch internal structure to shared auth building blocks and add CTA path to investor register.

### New files to create

- `src/features/auth/components/AuthShell.jsx`
  - Shared two-column auth layout and framing.
- `src/features/auth/components/AuthModeSwitch.jsx`
  - Role-to-role route CTA block for login/register pages.
- `src/features/auth/components/LoginForm.jsx`
  - Reusable login form UI with submit handler passed in by page wrapper.
- `src/features/auth/components/RegisterForm.jsx`
  - Reusable register form UI with submit handler and OTP state hooks passed in or managed inside component.
- `src/features/auth/pages/InvestorLoginPage.jsx`
  - Investor login wrapper with investor-specific copy and redirect target.
- `src/features/auth/pages/InvestorRegisterPage.jsx`
  - Investor register wrapper with investor-specific copy and redirect target.

### Files to inspect during implementation

- `src/features/auth/pages/OnboardingPage.jsx`
  - Confirm untouched UMKM-only behavior.
- `src/components/AGENTS.md`
  - Preserve auth UI conventions and avoid forbidden visual drift.

### Verification commands

- `npm run lint`
- `npm run build`

---

### Task 1: Update execution docs before code

**Files:**
- Modify: `PLAN.md`

- [ ] **Step 1: Edit the auth mapping and route notes in `PLAN.md`**

Replace the current auth mapping text so it no longer describes investor as only a toggle inside one register page. Update the route notes so the document explicitly says this implementation pass keeps UMKM auth current-state and adds investor-specific auth entry points first.

Use text aligned to this shape:

```md
| Auth (PRD §7.3, US-07/INV01) | `src/features/auth/` | `LoginPage.jsx`, `RegisterPage.jsx`, `InvestorLoginPage.jsx`, `InvestorRegisterPage.jsx` |
```

And update the route notes to include:

```md
- `/login` + `/register` — current-state UMKM auth entry
- `/investor/login` + `/investor/register` — investor auth entry
- `/onboarding` — current-state UMKM onboarding, kept unchanged in this slice
```

- [ ] **Step 2: Run a targeted grep to verify the old wording is gone**

Run: `rg -n "role toggle UMKM/Investor|/umkm/onboarding|/investor/login|/investor/register|current-state UMKM auth" PLAN.md`

Expected:
- the new investor route entries appear
- the old "toggle UMKM/Investor" wording is removed or revised

- [ ] **Step 3: Commit the docs-only checkpoint**

```bash
git add PLAN.md
git commit -m "docs: align plan with investor auth route split"
```

---

### Task 2: Extract the shared auth shell

**Files:**
- Create: `src/features/auth/components/AuthShell.jsx`
- Modify: `src/features/auth/pages/LoginPage.jsx`

- [ ] **Step 1: Create a failing integration checkpoint by temporarily importing `AuthShell` in `LoginPage.jsx` before the file exists**

Insert this import in `src/features/auth/pages/LoginPage.jsx`:

```jsx
import AuthShell from '@/features/auth/components/AuthShell'
```

Expected after save:
- Vite or build should fail with module resolution error for `AuthShell`

- [ ] **Step 2: Verify the failure with a production build**

Run: `npm run build`

Expected:
- FAIL with a module-not-found error pointing at `@/features/auth/components/AuthShell`

- [ ] **Step 3: Implement `AuthShell.jsx` with the reusable page frame**

Create `src/features/auth/components/AuthShell.jsx` with this structure:

```jsx
const AuthShell = ({
  leftPanel,
  rightEyebrow,
  rightTitle,
  rightCard,
  rightFooter,
}) => {
  return (
    <div className="h-screen overflow-hidden bg-[#f6f2ea] text-[#1e241e]">
      <div className="grid h-screen lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="relative flex h-screen flex-col justify-between overflow-hidden border-b border-[#d6d1c7] px-6 py-4 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-5 xl:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,120,79,0.08),transparent_34%)]" />
          {leftPanel}
        </section>

        <section className="relative hidden overflow-hidden bg-[#143d28] lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(121,179,113,0.08),transparent_42%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(172,213,167,0.22)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute right-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#4f8a57]/12 blur-3xl" />

          <div className="relative z-10 flex h-screen w-full flex-col justify-between px-14 py-12 xl:px-16">
            <div className="max-w-[44rem]">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[#9dbd90]">
                {rightEyebrow}
              </div>
              <h2 className="mt-4 max-w-[14ch] text-[3.2rem] leading-[0.98] tracking-[-0.05em] text-[#f6f2ea] xl:text-[4rem]">
                {rightTitle}
              </h2>
            </div>

            <div className="flex justify-end pr-6 xl:pr-12">
              {rightCard}
            </div>

            <div className="flex items-center justify-between text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#c6d8c4]">
              {rightFooter}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthShell
```

- [ ] **Step 4: Update `LoginPage.jsx` to render inside `AuthShell` without changing its UMKM behavior**

Move the existing two-column layout into `AuthShell` props instead of rendering the full page frame inline. Keep:

- the same form fields
- the same submit handler
- the same current `navigate('/umkm')` behavior

The only behavior change allowed in this task is structural extraction.

- [ ] **Step 5: Run build again to confirm the shared shell resolves**

Run: `npm run build`

Expected:
- PASS

- [ ] **Step 6: Commit the shell extraction**

```bash
git add src/features/auth/components/AuthShell.jsx src/features/auth/pages/LoginPage.jsx
git commit -m "refactor: extract shared auth shell"
```

---

### Task 3: Extract the shared login form and add investor login

**Files:**
- Create: `src/features/auth/components/AuthModeSwitch.jsx`
- Create: `src/features/auth/components/LoginForm.jsx`
- Create: `src/features/auth/pages/InvestorLoginPage.jsx`
- Modify: `src/features/auth/pages/LoginPage.jsx`
- Modify: `src/router.jsx`

- [ ] **Step 1: Create a failing route reference for investor login**

Add this import to `src/router.jsx` before the file exists:

```jsx
import InvestorLoginPage from '@/features/auth/pages/InvestorLoginPage'
```

And add this route:

```jsx
<Route path="/investor/login" element={<InvestorLoginPage />} />
```

- [ ] **Step 2: Verify the missing-page failure**

Run: `npm run build`

Expected:
- FAIL with module-not-found for `InvestorLoginPage`

- [ ] **Step 3: Create `AuthModeSwitch.jsx`**

```jsx
import { Link } from 'react-router-dom'

const AuthModeSwitch = ({ prompt, actionLabel, to }) => {
  return (
    <div className="mt-4 text-center text-[0.82rem] text-[#656058]">
      {prompt}{' '}
      <Link className="font-semibold text-[#2d6d46] transition hover:text-[#1d4f32]" to={to}>
        {actionLabel}
      </Link>
    </div>
  )
}

export default AuthModeSwitch
```

- [ ] **Step 4: Create `LoginForm.jsx`**

```jsx
const LoginForm = ({ defaultEmail, onSubmit, forgotLabel = 'Lupa?', submitLabel = 'Masuk' }) => {
  return (
    <form className="mt-5 space-y-3" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]" htmlFor="email">
          Email
        </label>
        <input
          className="h-10 w-full rounded-lg border border-[#d8d3ca] bg-white px-3.5 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
          defaultValue={defaultEmail}
          id="email"
          name="email"
          type="email"
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]" htmlFor="password">
            Password
          </label>
          <button className="text-[0.75rem] font-semibold text-[#2c6c45] transition hover:text-[#1d4f32]" type="button">
            {forgotLabel}
          </button>
        </div>
        <input
          className="h-10 w-full rounded-lg border border-[#d8d3ca] bg-white px-3.5 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
          defaultValue=""
          id="password"
          name="password"
          type="password"
        />
      </div>

      <label className="flex items-center gap-2.5 text-[0.8rem] text-[#55554f]">
        <input
          className="h-3.5 w-3.5 rounded border-[#b9c7b5] text-[#2f6b47] focus:ring-[#2f6b47]"
          defaultChecked
          name="remember"
          type="checkbox"
        />
        <span>Ingat saya di perangkat ini</span>
      </label>

      <button
        className="h-10 w-full rounded-lg bg-[#101310] text-[0.88rem] font-semibold text-white shadow-[0_18px_35px_rgba(16,19,16,0.18)] transition hover:-translate-y-0.5 hover:bg-[#171c17]"
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default LoginForm
```

- [ ] **Step 5: Refactor `LoginPage.jsx` to use `AuthShell`, `LoginForm`, and `AuthModeSwitch`**

Keep the page UMKM-specific:

```jsx
<AuthModeSwitch
  prompt="Masuk sebagai investor?"
  actionLabel="Buka investor login →"
  to="/investor/login"
/>
```

Retain the existing local submit stub and current UMKM redirect.

- [ ] **Step 6: Create `InvestorLoginPage.jsx` with investor copy and investor redirect**

Use the same shared shell and form, but change:

```jsx
const handleSignIn = (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.currentTarget).entries())
  console.log('Investor login:', data)
  navigate('/investor')
}
```

And switch CTA:

```jsx
<AuthModeSwitch
  prompt="Masuk sebagai UMKM?"
  actionLabel="Kembali ke login UMKM →"
  to="/login"
/>
```

- [ ] **Step 7: Run build to confirm both login routes compile**

Run: `npm run build`

Expected:
- PASS

- [ ] **Step 8: Commit the investor login slice**

```bash
git add src/router.jsx src/features/auth/components/AuthModeSwitch.jsx src/features/auth/components/LoginForm.jsx src/features/auth/pages/LoginPage.jsx src/features/auth/pages/InvestorLoginPage.jsx
git commit -m "feat: add investor login route with shared auth ui"
```

---

### Task 4: Extract the shared register form and add investor register

**Files:**
- Create: `src/features/auth/components/RegisterForm.jsx`
- Create: `src/features/auth/pages/InvestorRegisterPage.jsx`
- Modify: `src/features/auth/pages/RegisterPage.jsx`
- Modify: `src/router.jsx`

- [ ] **Step 1: Create a failing route reference for investor register**

Add this import to `src/router.jsx` before the file exists:

```jsx
import InvestorRegisterPage from '@/features/auth/pages/InvestorRegisterPage'
```

And add this route:

```jsx
<Route path="/investor/register" element={<InvestorRegisterPage />} />
```

- [ ] **Step 2: Verify the missing-page failure**

Run: `npm run build`

Expected:
- FAIL with module-not-found for `InvestorRegisterPage`

- [ ] **Step 3: Create `RegisterForm.jsx`**

Move the common register body from `RegisterPage.jsx` into a reusable component with props for:

- `roleLabel`
- `email`
- `password`
- `confirmPassword`
- `onFieldChange`
- `onSubmit`
- `submitting`
- `error`
- `showOtp`
- `otpVerifying`
- `otpError`
- `onOtpComplete`
- `switchBlock`
- `submitLabel`

The component should preserve the current OTP rendering contract:

```jsx
{showOtp ? (
  <OtpInput inline onComplete={onOtpComplete} />
) : (
  <form onSubmit={onSubmit} className="space-y-3">
    ...
  </form>
)}
```

Do not keep the old in-form UMKM/investor toggle buttons inside the shared component. Replace that area with a role heading or badge supplied by the wrapper page.

- [ ] **Step 4: Refactor `RegisterPage.jsx` to become a UMKM wrapper**

Preserve current backend contract and UMKM behavior:

- `fetch(`${import.meta.env.VITE_BASE_API}/auth/register`, ...)`
- OTP verification flow
- `navigate('/onboarding')` after OTP success

Inject a cross-role switch block that links to `/investor/register`.

- [ ] **Step 5: Create `InvestorRegisterPage.jsx`**

Copy only the page-level behavior needed from the UMKM wrapper:

- keep the same OTP flow structure
- use investor-specific labels and copy
- on OTP success, redirect to `/investor`
- if the backend already accepts role metadata, include:

```js
body: JSON.stringify({
  email: formData.email,
  password: formData.password,
  confirm_password: formData.confirm_password,
  role: 'investor',
})
```

If the backend does not yet support `role`, leave an inline comment in the plan implementation noting that frontend intent is investor-only while server contract remains unchanged for now.

- [ ] **Step 6: Run build to confirm both register routes compile**

Run: `npm run build`

Expected:
- PASS

- [ ] **Step 7: Commit the investor register slice**

```bash
git add src/router.jsx src/features/auth/components/RegisterForm.jsx src/features/auth/pages/RegisterPage.jsx src/features/auth/pages/InvestorRegisterPage.jsx
git commit -m "feat: add investor register route with shared auth ui"
```

---

### Task 5: Final verification and manual route QA

**Files:**
- Modify if needed: any of the files above only to fix issues found during verification

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected:
- PASS

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected:
- PASS

- [ ] **Step 3: Start the dev server and manually verify route navigation**

Run: `npm run dev`

Manual checks:

- open `/login`
- click switch CTA to `/investor/login`
- open `/register`
- click switch CTA to `/investor/register`
- verify UMKM register still routes to `/onboarding`
- verify investor login routes to `/investor`
- verify investor register routes to `/investor`

Expected:
- each route renders without layout break
- role-switch links change URL correctly
- no onboarding flow is introduced for investor

- [ ] **Step 4: Commit any last verification fixes**

```bash
git add PLAN.md src/router.jsx src/features/auth/components src/features/auth/pages
git commit -m "chore: verify investor auth route slice"
```

---

## Self-Review

### Spec coverage

- Explicit investor login/register routes: covered by Task 3 and Task 4
- UMKM flow preserved: covered by Task 2 through Task 4 wrapper constraints
- Shared login/register UI only: covered by Task 2 through Task 4 component boundaries
- Onboarding remains role-specific: preserved by Task 4 wrapper behavior and untouched `OnboardingPage.jsx`
- Docs/router alignment: covered by Task 1 and route changes in Task 3/4

### Placeholder scan

No `TBD`, `TODO`, or “implement later” placeholders remain in the plan.

### Type consistency

Component names are consistent across tasks:

- `AuthShell`
- `AuthModeSwitch`
- `LoginForm`
- `RegisterForm`
- `InvestorLoginPage`
- `InvestorRegisterPage`
