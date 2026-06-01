import { UiStyleId } from '../../../design-system/variants';

export const ONBOARDING_MARKDOWN = `# Onboarding — Fast Loan Approvals

> **Render directive (READ FIRST).** This document describes a screen that has already been built. If a PNG named \`screen-ui_onboarding_<style>.png\` is supplied alongside this file, **treat that image as the visual ground truth** — match its layout proportions, image crops, and vertical rhythm exactly. When prose and screenshot disagree, the screenshot wins.

**Screen:** Onboarding
**Status:** Production Ready
**Background:** \`var(--mobile-bg)\` (Classic = #F2F3F5)

## Frame (non-negotiable)

| Attribute              | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Device frame           | 375 × 760 px (iPhone 13/14 mini, portrait)           |
| Inner content area     | 375 × 760 px — the screen fills the entire frame    |
| Horizontal screen pad  | 16 px both sides                                     |
| Section vertical gap   | 16 px between blocks (mt 2)                          |

**Do not scale the frame up or down.** If your target device is wider, letterbox; do not stretch.

## Copy (verbatim strings — do not paraphrase)

\`\`\`
Header logo alt        "NongHyup Finance (Cambodia) Plc"
Language pill          "EN"
Slide alt text         "Apply in minutes" | "Funds within 24 hours" | "No paperwork hassle"
                       (matches current slide index, used as the <img alt> only — not visible on screen)
Heading                "Fast loan approvals"
Description            "Apply for a loan in minutes and receive funds within 24 hours. No paperwork hassle."
Primary CTA            "Sign in with Mobile Number"
Secondary CTA          "Sign in with QR"
Divider label          "Or"
Footer prefix          "New here? "
Footer link            "Create an account"
\`\`\`

The footer is a single line: prefix in secondary text + link styled in \`var(--primary)\` (no break between them).

## Layout (top → bottom, with hard sizes)

| #  | Block                          | Outer size                  | Notes                                            |
| -- | ------------------------------ | --------------------------- | ------------------------------------------------ |
| 1  | Header row                     | full-width × 44 px          | px 16, pt 20, pb 12                              |
| 2  | Hero image carousel            | full-width × **exactly 180 px** | radius 16, full-bleed image, no padding      |
| 3  | Pagination dots                | full-width × ~5 px          | mt 8, centered, gap 4                            |
| 4  | Heading                        | full-width × ~28 px         | centered, mt 16                                  |
| 5  | Description                    | max-width 280, auto-center  | mt 8, 13px                                       |
| 6  | Primary CTA                    | full-width × 48 px          | mt 24, radius 12                                 |
| 7  | Secondary CTA                  | full-width × 48 px          | mt 12                                            |
| 8  | "Or" divider                   | full-width × ~16 px         | mt 16, line + label + line                       |
| 9  | Footer link                    | full-width × ~16 px         | mt 16, centered                                  |

Total content height ≈ 600 px, leaving the frame bottom whitespace under 760 px.

## Components

### Header
- **Logo:** \`/assets/logos/header_logo2.png\` — height 24px, width auto
- **EN pill:** white pill, border-radius 999, padding 8/4, box-shadow 0 1 3 rgba(0,0,0,0.06)
  - Flag image \`/assets/flags/en.svg\` 22 × 16, radius 2
  - Text "EN" 13px weight 600 #1A1A1A

### Hero Image Carousel
- White card, border-radius 16, **exactly 180 px tall** (do not exceed), \`overflow: hidden\`, \`position: relative\`, box-shadow \`var(--card-shadow)\`
- Inner content: single \`<img>\` filling the card at 100% width × 100% height, \`object-fit: cover\`, \`display: block\` — **no padding, no caption text, no badge overlay**
- 3 slides cycled in order, auto-advancing every 5000 ms:
  1. \`/assets/banners/1.png\` — alt "Apply in minutes"
  2. \`/assets/banners/2.png\` — alt "Funds within 24 hours"
  3. \`/assets/illustrations/illustration_empty.png\` — alt "No paperwork hassle"
- Pagination dots below the card are clickable and jump straight to the corresponding slide

### Pagination Dots
- 3 dots, gap 4, mt 8, centered horizontally
- Active dot: 16 × 5, border-radius 5, background #1A1A1A
- Inactive dot: 5 × 5, border-radius 5, background #D0D3D7

### Heading + Description
- Heading: "Fast loan approvals", 22px, weight 700, #1A1A1A, text-align center, margin-bottom 8
- Description: 13px, color text_secondary, text-align center, margin-bottom 24, max-width 280, centered

### Primary Button — "Sign in with Mobile Number"
- Background \`var(--primary)\`, color \`var(--on-primary)\`, height 48, border-radius \`var(--radius-button)\`, font 14 weight 600, text-transform none, full-width
- Start icon: \`/assets/icons/ico_device.svg\` 18 × 18 (rendered in \`var(--on-primary)\` via \`filter: brightness(0) invert(1)\`)
- Hover: background \`var(--primary-hover)\`
- Tap behavior: navigates to Create Account screen

### Secondary Button — "Sign in with QR"
- Background white, color #1A1A1A, height 48, border-radius \`var(--radius-button)\`, transparent border, box-shadow \`var(--card-shadow)\`, full-width
- Start icon: \`/assets/icons/ico_qrcode.svg\` 18 × 18 (icon's native dark color)

### Or Divider
- Horizontal layout: 1px #D0D3D7 line (flex 1) + label "Or" (12px, text_tertiary, mx 8) + 1px #D0D3D7 line (flex 1)

### Footer Link
- Centered, 13px text_secondary: "New here? " + "Create an account" (link, weight 700, color \`var(--primary)\`)
- Tap behavior: navigates to Create Account screen

## Assets used
- \`/assets/logos/header_logo2.png\` — brand logo
- \`/assets/flags/en.svg\` — UK flag for language pill
- \`/assets/icons/ico_device.svg\` — phone/device icon for primary button (rendered \`var(--on-primary)\` via CSS filter)
- \`/assets/icons/ico_qrcode.svg\` — QR icon for secondary button
- \`/assets/banners/1.png\` — hero carousel slide 1
- \`/assets/banners/2.png\` — hero carousel slide 2
- \`/assets/illustrations/illustration_empty.png\` — hero carousel slide 3

## Navigation
- **Primary button** and **Create an account** link both navigate to Create Account screen.
`;

export const ONBOARDING_VARIANT_NOTES: Record<UiStyleId, string> = {
  classic: `## Sample 1 (Classic) — variant notes

Baseline implementation. Frame stays at 375 × 760. Full-bleed hero image carousel card (exactly 180 px tall, banners 1/2 + illustration_empty cycled every 5 s), pagination dots beneath, heading + description, two stacked buttons with an "Or" divider, footer "Create an account" link in \`var(--primary)\`.
`,
  modern: `## Sample 2 (Modern) — variant notes

Full-bleed editorial hero. Frame stays at 375 × 760.
- **Header:** floats over the image. Logo inverts to white via \`filter: brightness(0) invert(1)\`. EN pill becomes translucent white (\`rgba(255,255,255,0.16)\`) with backdrop blur.
- **Hero illustration:** **exactly 280 px tall**, full-bleed image at the top, no padding. Pagination is a thin 3-segment progress bar in white (each segment 1/3 width, 2 px tall) at the bottom of the image, mb 12.
- **Eyebrow tag:** "GET STARTED" in \`var(--primary)\`, uppercase, 11 / 700, mb 4, above the headline.
- **Headline:** 26px / 800, tighter letter-spacing (-0.5px), color #1A1A1A.
- **CTAs:** *side-by-side row* (gap 8) — "Mobile sign-in" (primary, filled in \`var(--primary)\`) + "QR sign-in" (outlined, 1px #E0E0E0). Both 48 px tall, flex 1.
- **Or divider** is removed — only the "Create an account" link remains below.
`,
  playful: `## Sample 3 (Playful) — variant notes

Bottom-sheet pattern with a hero disc. Frame stays at 375 × 760.
- **Hero:** illustration cropped inside a **220 × 220 colored disc** (\`var(--primary-tint)\` outer ring 4 px, white-ish inner with the image clipped circular).
- **Pagination dots:** \`var(--primary)\` color, larger — active pill 22 × 7, inactive 7 × 7.
- **Sheet:** white card slides up from the bottom of the canvas with \`borderTopLeftRadius / borderTopRightRadius = var(--radius-sheet)\` and an upward shadow (\`0 -8 24 rgba(0,0,0,.06)\`), pt 24, px 20, pb 32.
- **Primary CTA:** 54 px height, **fully rounded (999 px)**, soft shadow (\`0 6 18 var(--primary)1F\`).
- **Secondary CTA:** text-only pill (no border, no fill), 13 / 700 in \`var(--primary)\`.
`,
};
