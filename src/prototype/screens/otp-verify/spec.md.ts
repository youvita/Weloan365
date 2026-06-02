import { UiStyleId } from '../../../design-system/variants';

export const OTP_VERIFY_MARKDOWN = `# Verify — 6-Digit Code

> **Render directive (READ FIRST).** This document describes a screen that has already been built. If a PNG named \`screen-ui_otp-verify_<style>.png\` is supplied alongside this file, **treat that image as the visual ground truth** — match its layout proportions, image crops, and vertical rhythm exactly. When prose and screenshot disagree, the screenshot wins.

**Screen:** OTP Verify
**Status:** Draft — assumptions surfaced below
**Background:** \`var(--mobile-bg)\` (Sample 1 = #F2F3F5)

## Assumptions (call-outs for review)

- **Flow position:** middle step of the **Existing User** flow. Reached from \`login\` (Sign in CTA). On submit, navigates to \`dashboard\`.
- **OTP delivery:** 6-digit code, delivered via SMS in production. In the prototype the code is **not** dispatched; "Verify" is enabled as soon as the user types 6 digits but performs no real verification.
- **Masked phone string:** "+855 93 *** 333" hardcoded for the demo. Production should mask the value bound to the prior \`login\` form state.
- **Resend timer:** 30-second countdown on screen load; once it hits 0, the "Resend code" link becomes tappable (no-op in prototype).
- **Three samples — lighter pattern:** Sample 1 is the canonical boxed-cell card; Sample 2 strips the card and uses underlined cells; Sample 3 uses circular cells inside a tinted card.

## Frame (non-negotiable)

| Attribute              | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Device frame           | 375 × 760 px (iPhone 13/14 mini, portrait)           |
| Inner content area     | 375 × 760 px — the screen fills the entire frame     |
| Horizontal screen pad  | 16 px both sides                                     |
| Bottom CTA reserves    | 80 px from bottom                                    |

**Do not scale the frame up or down.**

## Copy (verbatim strings — do not paraphrase)

\`\`\`
Header back               (icon only, back to login)
Heading                   "Enter the code"
Subtitle                  "We sent a 6-digit code to +855 93 *** 333"
Resend label (idle)       "Resend code in 30s"
Resend label (active)     "Resend code"
Primary CTA               "Verify"
Wrong number link         "Wrong number?"
\`\`\`

## Layout (top → bottom, with hard sizes)

| #  | Block                          | Outer size                       | Notes                                              |
| -- | ------------------------------ | -------------------------------- | -------------------------------------------------- |
| 1  | Header row                     | full-width × 44 px               | back chevron                                       |
| 2  | Heading + subtitle             | full-width × ~70 px              | 24 / 700 heading, 13 / 400 subtitle                |
| 3  | OTP cells                      | full-width × ~64 px              | 6 cells, gap 8, centered                           |
| 4  | Resend / wrong-number row      | full-width × ~32 px              | resend countdown left, wrong-number right          |
| 5  | Spacer                         | flex 1                           | pushes CTA to bottom                               |
| 6  | Primary CTA                    | full-width × 52 px               | px 16, pb 20                                       |

## Components

### Header
- **Back button:** \`/assets/icons/Back%20Icon.png\` 22 × 22 in #1A1A1A, returns to \`login\`.

### Heading + Subtitle
- Heading: "Enter the code", 24 / 700, #1A1A1A.
- Subtitle: "We sent a 6-digit code to +855 93 *** 333", 13 / 400, text_secondary.

### OTP cells
- 6 cells, gap 8, each cell receives one digit. Numeric keyboard only (\`inputMode="numeric"\` semantics enforced at the input level).
- **Auto-focus:** the first cell is focused automatically on screen mount so the user can start typing without a tap.
- **Forward advance:** when the user types a digit, focus jumps to the next cell.
- **Backward delete:** Backspace on an empty cell jumps focus to the previous cell (and the user can then delete that digit).
- **Paste / multi-character entry:** if the user pastes a string of digits into any cell (e.g. a code copied from SMS), the digits are distributed across the remaining cells starting at the focused cell. Non-digits are silently filtered.
- **Auto-verify:** when all 6 cells are filled, the screen waits ~400ms (so the user sees the last digit register and the Verify CTA enable) and then navigates to \`dashboard\`. Tapping Verify manually still works.
- Cell shape varies by Sample (see variant notes).

### Resend / wrong-number row
- **Resend countdown:** 12 / 500, text_secondary, left-aligned. Shows "Resend code in {n}s" while ticking; becomes "Resend code" (12 / 700, \`var(--primary)\`, clickable) at 0.
- **Wrong number link:** 12 / 600, \`var(--primary)\`, right-aligned, navigates to \`login\`.

### Primary CTA — "Verify"
- Background \`var(--primary)\`, color \`var(--on-primary)\`, height 52 px (Sample 1 / Sample 2) or 56 px (Sample 3), border-radius \`var(--radius-button)\` (Sample 1 / Sample 2) or 999 (Sample 3, local layout decision).
- Disabled state when code length < 6: opacity-style by halving the primary opacity. Disabled is visual only — the prototype does not block.
- Tap behavior: navigates to \`dashboard\`.

## Assets used
- \`/assets/icons/Back Icon.png\` — header back chevron

## Navigation
- **Back chevron** returns to \`login\`.
- **Verify** advances to \`dashboard\`.
- **Wrong number?** returns to \`login\`.
- **Resend code** no-op (no real SMS dispatch in prototype).
`;

export const OTP_VERIFY_VARIANT_NOTES: Record<UiStyleId, string> = {
  'sample-1': `## Sample 1 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

Canonical boxed cells. Frame stays at 375 × 760. 6 OTP cells render as white squares (**44 × 44**, gap 8 px), border 1px #E0E0E0, radius \`var(--radius-card)\`. Filled cell border becomes \`var(--primary)\`. Cells sit on the mobile background with no surrounding chrome. Dimensions kept under the 323 px usable content width so the row never clips at the frame edges.
`,
  'sample-2': `## Sample 2 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

**Structural override vs Sample 1:** strip the cells of their card chrome — each digit is shown as a 36 × 56 box with **only a bottom border** (\`2px solid #1A1A1A\`). Empty cells show a faint dash placeholder ("—") at 50% opacity. Heading drops to 22 / 700, letter-spacing -0.5. Resend row gains an uppercase eyebrow style ("RESEND CODE IN {n}s").
`,
  'sample-3': `## Sample 3 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

**Structural override vs Sample 1:** swap the squares for **circular cells** (**40 × 40** with \`borderRadius: 50%\`, gap 6 px) housed inside one floating tinted card (radius \`var(--radius-card)\` + 4, **padding 12**, background \`var(--card-bg)\`, \`var(--card-shadow)\`). Cells and card padding shrunk relative to Sample 1 so the row fits inside the card without horizontal clipping. Heading centered 26 / 800. CTA grows to 56 px and uses **borderRadius 999** (Sample 3 local layout decision).
`,
};
