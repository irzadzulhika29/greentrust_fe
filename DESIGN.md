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

Clean, minimal, and trustworthy. The aesthetic is purposefully restrained — lots of breathing room, neutral surfaces, and a single purple accent that carries all interactive weight. Think "professional sustainability dashboard": serious enough to convey credibility, light enough to feel approachable.

Light mode is the primary experience. Dark mode is fully supported via `prefers-color-scheme`.

---

## 2. Color Palette & Roles

### Light Mode

| Name | Hex | Role |
|---|---|---|
| Off-White Canvas | `#ffffff` | Page background (`--bg`) |
| Warm Parchment | `#f4f3ec` | Code blocks, muted surface backgrounds (`--code-bg`) |
| Frosted Social | `rgba(244,243,236,0.5)` | Semi-transparent card/button backgrounds (`--social-bg`) |
| Quiet Slate | `#6b6375` | Body text, secondary labels (`--text`) |
| Near-Black Ink | `#08060d` | Headings, high-emphasis text (`--text-h`) |
| Hairline Gray | `#e5e4e7` | Borders, dividers, structural lines (`--border`) |
| Electric Violet | `#aa3bff` | Primary accent — CTAs, links, active states (`--accent`) |
| Violet Wash | `rgba(170,59,255,0.10)` | Accent element backgrounds — never on cards/buttons (`--accent-bg`) |

### Dark Mode

| Name | Hex | Role |
|---|---|---|
| Deep Charcoal | `#16171d` | Page background (`--bg`) |
| Sunken Surface | `#1f2028` | Code blocks, inset surfaces (`--code-bg`) |
| Dim Social | `rgba(47,48,58,0.5)` | Semi-transparent card/button backgrounds (`--social-bg`) |
| Cool Ash | `#9ca3af` | Body text, secondary labels (`--text`) |
| Ghost White | `#f3f4f6` | Headings, high-emphasis text (`--text-h`) |
| Charcoal Line | `#2e303a` | Borders, dividers (`--border`) |
| Soft Lavender | `#c084fc` | Primary accent in dark mode (`--accent`) |
| Lavender Wash | `rgba(192,132,252,0.15)` | Accent element backgrounds — never on cards/buttons (`--accent-bg`) |

---

## 3. Typography Rules

**Font families:**
- Headings: `system-ui, 'Segoe UI', Roboto, sans-serif` — clean, native, no web font overhead
- Body: same stack — consistent and legible across platforms
- Monospace: `ui-monospace, Consolas, monospace` — for code snippets only

**Scale:**

| Level | Size | Weight | Letter Spacing | Usage |
|---|---|---|---|---|
| H1 | 56px (36px mobile) | 500 | -1.68px | Page titles only |
| H2 | 24px (20px mobile) | 500 | -0.24px | Section headings |
| Body | 18px (16px mobile) | 400 | 0.18px | Paragraphs, labels |
| Code | 15px | 400 | inherit | Inline code |

Line height is 145% for body text. Headings use 118% line height.

---

## 4. Component Stylings

### Buttons

- **Shape:** Slightly rounded corners — `border-radius: 4–6px`. Not pill-shaped, not sharp.
- **Background:** Flat solid color only. Use `--accent-bg` (violet wash) for primary, `--social-bg` for secondary/ghost. No gradients.
- **Border:** `border: 2px solid transparent` at rest. Border becomes visible only on `:hover` using `--accent-border` (semi-transparent violet) — this is the one permitted colored border, only on interactive hover state, not at rest.
- **Focus:** `outline: 2px solid var(--accent)` with `outline-offset: 2px` — required for accessibility.
- **Text color:** `--text-h` (near-black / ghost white in dark mode).
- **Transition:** `border-color 0.3s` for hover, smooth and subtle.

### Cards / Containers

- **Background:** Flat solid — `--social-bg` (frosted/dim) or `--bg` (white/charcoal). No gradients.
- **Border:** `1px solid var(--border)` (hairline gray / charcoal line). No accent-colored borders.
- **Corner roundness:** Subtly rounded — `border-radius: 6px`.
- **Shadow:** Whisper-soft diffused shadow on hover only — `rgba(0,0,0,0.1) 0 10px 15px -3px, rgba(0,0,0,0.05) 0 4px 6px -2px`. Flat at rest.
- **Padding:** 32px desktop, 24px mobile.

### Inputs / Forms

*(To be defined when form components are added)*

- Follow the same flat-background rule.
- Border: `1px solid var(--border)` at rest. No accent border at rest.
- Focus: `outline` or `border-color` using `--accent` only.

### Code Snippets

- Background: `--code-bg` (warm parchment / sunken surface).
- `border-radius: 4px`, padding `4px 8px`.
- Font: monospace stack, 15px.

### Badges / Tags

*(To be defined when badge components are added)*

- Flat background using a tint from the palette.
- No gradient fills, no colorful borders.

---

## 5. Layout Principles

- **Max content width:** 1126px, centered with `margin: 0 auto`.
- **Structural border:** `1px solid var(--border)` on the inline edges of `#root` — creates a contained column feel.
- **Whitespace:** Generous. Section padding is 32px desktop / 24px mobile. Gap between stacked elements is 25px desktop / 18px mobile.
- **Grid:** Flex-based two-column layout for peer sections (e.g., docs + social). Each column takes equal `flex: 1 1 0`. Collapses to single column below 1024px.
- **Alignment:** Center-aligned for hero/CTA sections. Left-aligned for content-heavy sections.
- **Dividers:** `1px solid var(--border)` horizontal lines between sections. Decorative tick marks (CSS `::before`/`::after`) at section boundaries use the same border color.
- **Responsive breakpoint:** 1024px — font sizes, padding, and layout direction all adjust at this single breakpoint.

---

## 6. Interaction & Motion

- Transitions are subtle and single-property: `border-color 0.3s`, `box-shadow 0.3s`.
- No entrance animations, no parallax, no scroll-triggered effects by default.
- Motion should never be the focus — it only confirms interaction.

---

## 7. Accessibility Baseline

- Focus rings are always visible: `outline: 2px solid var(--accent)` with offset.
- Color contrast: `--text` on `--bg` meets WCAG AA. `--text-h` on `--bg` meets AAA.
- Dark mode is automatic via `prefers-color-scheme` — no manual toggle required (can be added later).
- Icon-only elements use `aria-hidden="true"` with adjacent visible labels.

---

*This file is a living document. When new components are added, update the relevant section above.*
