import { UiStyleId } from '../../../design-system/variants';

export const LOGIN_MARKDOWN = `# Sign In — Returning Customer

> **Render directive (READ FIRST).** This document describes a screen that has already been built. If a PNG named \`screen-ui_login_<style>.png\` is supplied alongside this file, **treat that image as the visual ground truth** — match its layout proportions, image crops, and vertical rhythm exactly. When prose and screenshot disagree, the screenshot wins.

**Screen:** Login
**Status:** Draft — assumptions surfaced below
**Background:** \`var(--mobile-bg)\` (Sample 1 = #F2F3F5)

## Assumptions (call-outs for review)

- **Flow position:** entry point of the **Existing User** flow. Reached from the \`onboarding\` screen's "Sign in with Mobile Number" CTA (the same CTA previously routed to \`create-account\` — that path has moved to the footer "Create an account" link in onboarding).
- **Credentials:** phone number (default Cambodia +855, prefilled "093333333" for the demo) and a 6-digit PIN. Real auth is out of scope — submitting always proceeds to \`otp-verify\`.
- **Forgot PIN flow:** no destination wired. The link currently no-ops.
- **Three samples — lighter pattern:** Sample 1 is the canonical card-based form; Sample 2 swaps cards for underlined fields; Sample 3 wraps the form in a floating tinted card with pill rows. Same as the create-account screen's pattern.

## Frame (non-negotiable)

| Attribute              | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Device frame           | 375 × 760 px (iPhone 13/14 mini, portrait)           |
| Inner content area     | 375 × 760 px — the screen fills the entire frame     |
| Horizontal screen pad  | 16 px both sides                                     |
| Bottom CTA reserves    | 80 px from bottom (button + footer link + padding)   |

**Do not scale the frame up or down.**

## Copy (verbatim strings — do not paraphrase)

\`\`\`
Header back               (icon only, back to onboarding)
Heading                   "Welcome back"
Subtitle                  "Sign in to continue your loan journey."
Phone label               "Phone Number"
Phone default value       "093333333"
Phone prefix              "+855"
PIN label                 "PIN"
PIN placeholder           "Enter your 6-digit PIN"
PIN helper                "6 digits, never share this with anyone."
Forgot link               "Forgot PIN?"
Primary CTA               "Sign in"
Footer prefix             "New here? "
Footer link               "Create an account"
\`\`\`

## Layout (top → bottom, with hard sizes)

| #  | Block                          | Outer size                       | Notes                                              |
| -- | ------------------------------ | -------------------------------- | -------------------------------------------------- |
| 1  | Header row                     | full-width × 44 px               | back chevron + EN pill (right)                     |
| 2  | Heading + subtitle             | full-width × ~70 px              | 24 / 700 heading, 13 / 400 subtitle                |
| 3  | Phone field                    | full-width × ~64 px              | label + flag + +855 + input                        |
| 4  | PIN field                      | full-width × ~64 px              | label + masked input + helper                      |
| 5  | Forgot PIN link                | full-width × ~20 px              | right-aligned                                      |
| 6  | Spacer                         | flex 1                           | pushes CTA group to bottom                         |
| 7  | Primary CTA + footer line      | full-width × 80 px               | px 16, pb 20                                       |

## Components

### Header
- **Back button:** \`/assets/icons/Back%20Icon.png\` 22 × 22 in #1A1A1A, returns to \`onboarding\`.
- **EN pill:** white pill, border-radius 999, padding 8/4, box-shadow 0 1 3 rgba(0,0,0,0.06).

### Heading + Subtitle
- Heading: "Welcome back", 24 / 700, #1A1A1A, line-height 1.2.
- Subtitle: "Sign in to continue your loan journey.", 13 / 400, text_secondary, mt 4, margin-bottom 24.

### Phone field
- **Flag:** \`/assets/flags/kh.svg\` 32 × 32, border-radius 50% (rendered as circle in Sample 1 / Sample 3; 22 × 22 in Sample 2).
- **Prefix:** "+855", 15 / 700, #1A1A1A.
- **Input:** type tel, default value "093333333", 15 / 700.

### PIN field
- **Input:** masked (\`type="password"\`), placeholder "Enter your 6-digit PIN", 15 / 700.
- **Keypad / validation:** \`inputMode="numeric"\` (triggers the numeric keypad on mobile), digits-only filter applied on every change, \`maxLength={6}\`. Non-digit characters are silently discarded; typing past 6 characters has no effect.
- **Enter key:** submits the form (same effect as tapping the Sign in CTA) when the form is valid.
- **Helper:** "6 digits, never share this with anyone.", 11 / 400, text_secondary, mt 4.

### Forgot PIN link
- Right-aligned text link, 13 / 600, \`var(--primary)\`. No-op in the prototype.

### Primary CTA — "Sign in"
- Background \`var(--primary)\`, color \`var(--on-primary)\`, height 52 px (Sample 1 / Sample 2) or 56 px (Sample 3), border-radius \`var(--radius-button)\` (Sample 1 / Sample 2) or 999 (Sample 3, local layout decision).
- 15 / 600, text-transform none.
- **Disabled state** when phone is empty OR PIN length ≠ 6: background drops to \`var(--primary)\` at 40% opacity, text stays \`var(--on-primary)\`, button is not clickable. The button transitions to enabled the moment the user types the 6th PIN digit.
- Tap behavior: navigates to \`otp-verify\`.

### Footer line
- Centered, 13 / 400, text_secondary: "New here? " + "Create an account" (link, 13 / 700, \`var(--primary)\`).
- Tap behavior on the link: navigates to \`create-account\`.

## Assets used
- \`/assets/icons/Back Icon.png\` — header back chevron
- \`/assets/flags/en.svg\` — EN pill flag
- \`/assets/flags/kh.svg\` — Cambodia flag for the phone field

## Navigation
- **Back chevron** returns to \`onboarding\`.
- **Sign in** advances to \`otp-verify\`.
- **Create an account** routes to \`create-account\`.
- **Forgot PIN?** no-op (no target screen).
`;

export const LOGIN_VARIANT_NOTES: Record<UiStyleId, string> = {
  'sample-1': `## Sample 1 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

Canonical card-based form. Frame stays at 375 × 760.
- **Field labels** ("Phone Number", "PIN") render as small eyebrows (11 / 400, text_secondary) **above** each card — not inside it — so the input row inside the phone card has the full card width and doesn't squeeze the label.
- **Phone card:** flag (28 × 28 circle) + "+855" (15 / 700) + 1 px hairline divider + flex-1 \`<input>\`. Card radius \`var(--radius-card)\`, padding 10/10, \`var(--card-shadow)\`.
- **PIN card:** plain input only (label is the eyebrow above). Card radius \`var(--radius-card)\`, padding 12/10, \`var(--card-shadow)\`. Helper text ("6 digits, never share this with anyone.") sits as 11 / 400 text_secondary directly below the card.
- **Primary CTA:** standard 52 px height, default token radius.
`,
  'sample-2': `## Sample 2 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

**Structural override vs Sample 1:** swap cards for underlined fields. Phone and PIN sit directly on \`var(--mobile-bg)\` with an 11 px uppercase eyebrow label above and a \`1px solid #1A1A1A\` underline beneath. No card backgrounds, no shadows. Heading drops to 22 / 700 with letter-spacing -0.5. CTA stays 52 px tall but uses the default token radius (sharp).
`,
  'sample-3': `## Sample 3 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

**Structural override vs Sample 1:** wrap the form in one floating tinted card (radius \`var(--radius-card)\` + 4, padding 16, \`var(--card-shadow)\`), with each field rendered as a pill row (radius 999, background \`var(--primary-tint)\`). Heading centered 26 / 800. Primary CTA grows to 56 px tall and uses **borderRadius 999** (full pill — Sample 3 local layout decision, not a token override).
`,
};
