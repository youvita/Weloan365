import { UiStyleId } from '../../../design-system/variants';

export const CREATE_ACCOUNT_MARKDOWN = `# Create Your Account

> **Render directive (READ FIRST).** This document describes a screen that has already been built. If a PNG named \`screen-ui_create-account_<style>.png\` is supplied alongside this file, **treat that image as the visual ground truth** — match its layout proportions, image crops, and vertical rhythm exactly. When prose and screenshot disagree, the screenshot wins.

**Screen:** Create Account
**Status:** Production Ready
**Background:** \`var(--mobile-bg)\` (Sample 1 = #F2F3F5)

## Frame (non-negotiable)

| Attribute              | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Device frame           | 375 × 760 px (iPhone 13/14 mini, portrait)           |
| Inner content area     | 375 × 760 px — the screen fills the entire frame    |
| Horizontal screen pad  | 16 px both sides                                     |
| Bottom CTA reserves    | 72 px from bottom (button + padding)                 |

**Do not scale the frame up or down.**

## Copy (verbatim strings — do not paraphrase)

\`\`\`
Language pill         "EN"
Heading               "Create your account"
Subtitle              "We'll send a verification code to your number."
Country label         "Country"
Country default value "Cambodia"
Code label            "Code *"        (asterisk in #E00025)
Code value            "+855"
Phone label           "Phone Number *" (asterisk in #E00025)
Phone default value   "093333333"
Primary CTA           "Send code"     (Sample 1 / Sample 2)
                      "Send my code →" (Sample 3 only)
\`\`\`

Asterisks (\`*\`) on required-field labels are rendered in danger red \`#E00025\` and sit immediately after the label text with no space.

## Layout (top → bottom, with hard sizes)

| #  | Block                          | Outer size                  | Notes                                            |
| -- | ------------------------------ | --------------------------- | ------------------------------------------------ |
| 1  | Header row                     | full-width × 44 px          | px 16, pt 16, pb 12                              |
| 2  | Progress bar (3 segments)      | full-width × 3 px           | gap 6, mt 0, mb 16                               |
| 3  | Heading                        | full-width × ~30 px         | 24 / 700                                          |
| 4  | Subtitle                       | full-width × ~16 px         | mt 4, mb 20                                       |
| 5  | Country card                   | full-width × ~56 px         | radius 12, padding 10/8                          |
| 6  | Code + Phone row               | full-width × ~56 px         | mt 12, gap 10                                    |
| 7  | Spacer                         | flex 1                      | pushes CTA to bottom                              |
| 8  | "Send code" button             | full-width × 52 px          | px 16, pb 20                                      |

## Components

### Header
- **Back button:** \`/assets/icons/Back%20Icon.png\` 18 × 18 in #1A1A1A, returns to Onboarding screen
- **EN pill:** white pill, border-radius 999, padding 8/4
  - Flag image \`/assets/flags/en.svg\` 22 × 16
  - Text "EN" 13px weight 600 #1A1A1A

### Progress Bar (Sample 1)
- 3 equal segments, gap 6, **height exactly 3 px**, border-radius 2
- Active (step 1): \`var(--primary)\`
- Inactive: #D0D3D7

### Heading + Subtitle
- Heading: "Create your account", 24px, weight 700, #1A1A1A, line-height 1.2
- Subtitle: "We'll send a verification code to your number.", 13px, color text_secondary, mt 4, margin-bottom 20

### Country Card
- White, border-radius 12, padding 10/8, flex row align center, gap 10, box-shadow 0 1 3 rgba(0,0,0,0.04), height 56 px
- **Flag:** \`/assets/flags/kh.svg\` 32 × 32, border-radius 50% (rendered as circle)
- **Label:** "Country", 11px, text_secondary
- **Value:** Select bound to \`country\` state (default "Cambodia"); 15px, weight 700, #1A1A1A; no underline, no native arrow
- **Chevron:** down chevron glyph, 22 × 22 in #6F7479 (the preview uses MUI \`KeyboardArrowDown\`; production may swap in a matching down-chevron SVG)
- Options: Cambodia, Thailand, Vietnam

### Code + Phone Row (gap 10, margin-bottom 24)
- **Code card** (fixed width 86):
  - White, border-radius 12, padding 12/8, box-shadow 0 1 3 rgba(0,0,0,0.04)
  - Label "Code *" — 11px text_secondary; asterisk in #E00025
  - Value "+855" — 15px, weight 700, #1A1A1A
- **Phone Number card** (flex 1):
  - White, border-radius 12, padding 12/8, box-shadow 0 1 3 rgba(0,0,0,0.04)
  - Label "Phone Number *" — 11px text_secondary; asterisk #E00025
  - Input (no underline), default value "093333333", type tel
  - Input style: 15px, weight 700, #1A1A1A

### Send Code Button
- Anchored to bottom (flex 1 spacer above), padding-x 16, padding-bottom 20
- Background \`var(--primary)\`, color \`var(--on-primary)\`, **height exactly 52 px**, border-radius \`var(--radius-button)\`, font 15 weight 600, text-transform none, full-width
- Hover: background \`var(--primary-hover)\`

## Assets used
- \`/assets/icons/Back Icon.png\` — header back chevron
- \`/assets/flags/en.svg\` — UK flag for language pill
- \`/assets/flags/kh.svg\` — Cambodia flag (rendered as circle 32 × 32)

## Navigation
- **Back chevron** returns to Onboarding screen.
- **Send code** triggers verification flow (out of scope for this screen).
`;

export const CREATE_ACCOUNT_VARIANT_NOTES: Record<UiStyleId, string> = {
  'sample-1': `## Sample 1 — variant notes

Baseline implementation. Frame stays at 375 × 760. 3-segment progress bar (3 px tall), country card + side-by-side code/phone cards, "Send code" button anchored at bottom (52 px tall).
`,
  'sample-2': `## Sample 2 — variant notes

Underline / typographic form. Frame stays at 375 × 760. All three samples share the same brand tokens — the differences below are structural layout overrides only.
- **Progress:** "STEP 1 OF 3" eyebrow (11 / 700, letter-spacing 0.5, text_tertiary) on the left + 3-segment thin progress lines on the right (each segment 24 × 2, gap 4). Active segment: \`var(--primary)\`.
- **Heading:** 22 / 700, letter-spacing -0.5.
- **Inputs:** card containers replaced with **underlined fields**. 11px uppercase field labels above. Country row: small circular flag (24 × 24) + select + chevron. Phone row: "+855" + 1px vertical divider + tel input. Border bottom \`1px solid #1A1A1A\` for both. No card backgrounds, no shadows.
- **Code/Phone:** merged into a single underlined row (no separate "Code" card outline).
- **CTA:** filled \`var(--primary)\` rectangle, full-width, default token radius (\`var(--radius-button)\`).
`,
  'sample-3': `## Sample 3 — variant notes

Centered, rounded, friendly. Frame stays at 375 × 760. All three samples share the same brand tokens — the differences below are structural layout overrides only.
- **Progress:** **3 numbered circles** (28 × 28, 50% radius), active uses \`var(--primary)\` fill + \`var(--on-primary)\` text; inactive uses \`var(--primary-tint)\` + \`var(--primary)\` text. Gap 8.
- **Heading:** centered, 26 / 800.
- **Inputs:** wrapped in a floating card (radius \`var(--radius-card)\` + 4, padding 16). Each field is a **pill row** (999 px radius) with a soft primary-tinted background. Country: 28 × 28 circular flag, label/value stacked, primary chevron. Phone: "+855" in \`var(--primary)\` + thin divider + tel input.
- **Primary CTA:** **56 px tall**, **fully rounded (999 px)**, label "Send my code →".
`,
};
