# Design System: GreenTrust App

**Stack:** React 19 + Vite + Tailwind CSS v4  
**Last updated:** 2026-05-21

---

## Ground Rules

These rules are non-negotiable and apply to every component:

- **No gradients** on any background — buttons, cards, sections, inputs, badges. Flat solid colors only.
- **No colorful borders** on cards or buttons. Borders use only `--border` (neutral gray). The only exception is focus rings on interactive elements (accessibility requirement).
- Components added later must follow these rules and update the relevant section below.

---

## 1. Visual Theme & Atmosphere

Clean, minimal, and trustworthy. The aesthetic is purposefully restrained — lots of breathing room, white surfaces, and a deep forest green primary that carries all interactive weight. Gold accent is used sparingly for highlights and badges. Think "professional sustainability dashboard": serious enough to convey credibility, light enough to feel approachable.

Light mode is the primary experience.

---

## 2. Color Palette & Roles

### Core Colors

| Name | Hex | Role |
|---|---|---|
| **White** | `#FFFFFF` | Main background (`--bg`) |
| **Forest Green** | `#205336` | Primary — CTAs, links, active states, brand (`--primary`) |
| **Gold** | `#FDA800` | Secondary — highlights, badges, tier indicators (`--secondary`) |

### Extended Palette

| Name | Hex | Role |
|---|---|---|
| Warm Parchment | `#f4f3ec` | Muted surface backgrounds (`--surface`) |
| Light Green Tint | `#e8f0eb` | Primary element backgrounds, hover states (`--primary-bg`) |
| Light Gold Tint | `#fff4d6` | Secondary element backgrounds (`--secondary-bg`) |
| Near-Black | `#111111` | Headings, high-emphasis text (`--text-h`) |
| Slate Gray | `#5f5a53` | Body text, secondary labels (`--text`) |
| Hairline Gray | `#e5e4e0` | Borders, dividers (`--border`) |

### Usage Rules

- **Primary `#205336`** — all CTAs, nav active states, links, progress bars, on-chain badges
- **Secondary `#FDA800`** — tier badges (Unggul), star icons, highlight numbers, GRS score for top tier
- **White `#FFFFFF`** — page background, card backgrounds
- **Never** use primary or secondary as card/section backgrounds — use tints (`--primary-bg`, `--secondary-bg`) instead

---

## 3. Typography Rules

**Font families:**
- All text: `"Plus Jakarta Sans", sans-serif`
- Monospace: `ui-monospace, Consolas, monospace` — for code/hash snippets only

**Scale:**

| Level | Tailwind | Weight | Usage |
|---|---|---|---|
| Display | `text-4xl` / `text-5xl` | 600 | Hero headlines |
| H1 | `text-3xl` / `text-4xl` | 600 | Page titles |
| H2 | `text-2xl` | 600 | Section headings |
| H3 | `text-xl` | 600 | Card titles |
| Body | `text-base` | 400 | Paragraphs |
| Small | `text-sm` | 400 | Labels, captions |
| Micro | `text-xs` / `text-[10px]` | 600 | Uppercase labels, badges |

**Letter spacing:** Normal (no `tracking-wide` or `tracking-wider` on body text). Negative tracking only on large display text.

---

## 4. Component Stylings

### Buttons

- **Primary:** `bg-[#205336] text-white` — hover `bg-[#173d28]`
- **Secondary:** `bg-[#FDA800] text-[#111]` — hover `bg-[#e09700]`
- **Ghost:** `border border-[#e5e4e0] bg-white text-[#111]` — hover `bg-[#f4f3ec]`
- **Shape:** `rounded-xl` (12px). Not pill-shaped.
- **No gradients.**

### Cards

- **Background:** `bg-white`
- **Border:** `1px solid #e5e4e0`
- **Radius:** `rounded-2xl` (16px)
- **Shadow:** Soft on hover only

### Badges / Tags

- **Tier Unggul:** `bg-[#fff4d6] text-[#c47739]` — gold tint
- **Tier Siap:** `bg-[#e8f0eb] text-[#205336]` — green tint
- **On-chain:** `bg-[#e8f0eb] text-[#205336]`

---

## 5. Layout Principles

- **Max content width:** `max-w-7xl` (1280px), centered
- **Section padding:** `px-4 sm:px-6 lg:px-8`
- **Section vertical spacing:** `mt-24` between major sections
- **Responsive breakpoint:** 1024px (lg)

---

## 6. Interaction & Motion

- Transitions subtle: `transition-colors duration-200`, `transition-transform duration-500`
- Hover scale on cards: `group-hover:scale-105`
- No entrance animations by default

---

## 7. Accessibility Baseline

- Focus rings: `outline: 2px solid #205336` with offset
- Color contrast: all text meets WCAG AA minimum
- Icon-only elements use `aria-hidden="true"` with adjacent visible labels

---

*This file is a living document. Update when new components are added.*
