import { UiStyleId } from '../../../design-system/variants';

export const HOME_MARKDOWN = `# Home Screen — New Customer

> **Render directive (READ FIRST).** This document describes a screen that has already been built. If a PNG named \`screen-ui_home_<style>.png\` is supplied alongside this file, **treat that image as the visual ground truth** — match its layout proportions, image crops, and vertical rhythm exactly. This Markdown describes the same screen in words; when prose and screenshot disagree, the screenshot wins.

**Screen:** Home
**Status:** Production Ready
**Background:** \`var(--mobile-bg)\` (Classic = #F2F3F5)

## Frame (non-negotiable)

| Attribute              | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Device frame           | 375 × 760 px (iPhone 13/14 mini, portrait)           |
| Inner content area     | 375 × 760 px — the screen fills the entire frame    |
| Bottom nav reserves    | 56 px from bottom (absolute)                         |
| Status bar reserves    | 0 px (header sits at top of content area)            |
| Horizontal screen pad  | 16 px both sides (px 2 in MUI)                       |
| Section vertical gap   | 18 px between sections (mt 2.25)                     |

**Do not scale the frame up or down.** If your target device is wider, letterbox; do not stretch.

## Copy (verbatim strings — do not paraphrase)

\`\`\`
Header logo alt              "NongHyup Finance (Cambodia) Plc"
Quick Sign Up title          "Quick Sign Up"
Quick Sign Up subtitle       "Sign up to apply loan faster"
Quick Sign Up CTA (Classic)  "→" (icon only, no label)
Quick Sign Up CTA (Modern)   "Sign up →"
Quick Sign Up CTA (Playful)  "Start now →"
Action tile 1                "Browse Loan"
Action tile 2                "Calculator"
Action tile 3                "Consult"
Section heading 1            "POPULAR LOAN PRODUCTS"  (uppercase, eyebrow)
Section "See all" link       "See all"
Product 1 name               "Micro Loan"
Product 1 size               "Up to $100 – $3,000"
Product 1 term               "≤ 48 mo"
Product 1 rate               "1.2%"
Product 1 badge              "RECOMMENDED"   (Classic uppercase tag)
                             "Recommended"   (Modern outlined tag / Playful pill)
Product 2 name               "Small Business Loan"
Product 2 size               "Up to $30,000"
Product 2 term               "≤ 96 mo"
Product 2 rate               "1.2%"
Section heading 2            "NEWS & PROMOTIONS"  (uppercase, eyebrow)
Bottom nav item 1            "Home"
Bottom nav item 2            "Products"
Bottom nav item 3            "More"
\`\`\`

Card sublines combine size and term with " · " separator inside the same secondary-text row, e.g. \`Up to $100 – $3,000 · ≤ 48 mo\`. Never drop the "Up to" prefix; never merge "≤ 48 mo" into the size string.

## Layout (top → bottom, with hard sizes)

| #  | Block                  | Outer size                  | Inner padding   | Notes                                       |
| -- | ---------------------- | --------------------------- | --------------- | ------------------------------------------- |
| 1  | Header row             | full-width × 44 px          | px 16, pt 20, pb 12 | logo (left) + 2 icon buttons (right)    |
| 2  | Quick Sign Up card     | full-width × 72 px          | 12 px           | radius 16, gap 12                           |
| 3  | Action tiles row       | full-width × 64 px          | px 16, py 10 (per tile) | 3 equal tiles, gap 8                |
| 4  | Eyebrow + See all      | full-width × ~16 px         | px 16, mt 18    | baseline-aligned                            |
| 5  | Product carousel       | full-width × ~180 px        | px 16, gap 8    | horizontal scroll, 78% snap width per card  |
| 6  | News eyebrow           | full-width × ~16 px         | px 16, mt 18    | "NEWS & PROMOTIONS"                         |
| 7  | News banner            | full-width × **exactly 110 px** | px 16       | hard cap; do NOT stretch taller             |
| 8  | Pagination dots        | full-width × ~5 px          | mt 8, centered  | 3 pill dots                                 |
| 9  | Bottom nav             | full-width × 56 px          | absolute bottom | white, top-border #E0E0E0                  |

## Components

### Header
- **Logo:** \`/assets/logos/header_logo2.png\` — height 24px, width auto
- **Message icon:** \`/assets/icons/Ico_message.png\` — 22 × 22, object-fit contain, with red badge "2" (overlap circular, font 9px, 16 × 16 diameter)
- **Bell icon:** \`/assets/icons/ico_notification.png\` — 24 × 24, object-fit contain

### Quick Sign Up Card
- **Container:** white, border-radius 16px, box-shadow \`var(--card-shadow)\`, padding 12px, flex row align center, gap 12, fixed height 72 px
- **Icon tile:** 48 × 48, border-radius 12px, background \`var(--primary)\` at 10% opacity (\`--primary-tint\`); inner icon \`/assets/icons/ico_id_card.svg\` 24 × 24
- **Title:** "Quick Sign Up", 16px, weight 700, color #1A1A1A, line-height 1.2
- **Subtitle:** "Sign up to apply loan faster", 12px, color text_secondary, mt 2
- **Arrow button:** 36 × 36, border-radius \`var(--radius-button)\`, background \`var(--primary)\`, contains \`/assets/icons/ico_arrow_forward.svg\` 18 × 18 in \`var(--on-primary)\`
- **Tap behavior:** navigates to Onboarding screen

### Action Tiles (Browse Loan / Calculator / Consult)
- Each tile: flex 1, white background, border-radius 12px, padding-y 10px, padding-x 0, column align center, gap 4, height 64 px
- Icons (22 × 22, currentColor #1A1A1A):
  - Browse Loan → \`/assets/icons/ico_browse_loan.svg\`
  - Calculator → \`/assets/icons/ico_calculator.svg\`
  - Consult → \`/assets/icons/ico_consult.svg\`
- Label: 11px, weight 500, color #1A1A1A, line-height 1

### Product Cards (Micro Loan / Small Business Loan) — Classic carousel only
- **Container:** flex-basis 78%, white, border-radius 12px, overflow hidden, box-shadow \`var(--card-shadow)\`
- **Title row:** icon \`/assets/icons/ico_storefront.svg\` 18 × 18 in #1A1A1A + label (14px, weight 700, #1A1A1A), padding 12 horizontal / 8 vertical
- **Image area:** **exactly 130 px tall**, gradient background
  - Micro Loan gradient: \`linear-gradient(135deg, #6FA86B 0%, #2F6F3A 100%)\` (greens)
  - Small Business Loan gradient: \`linear-gradient(135deg, #C9A36B 0%, #6B4423 100%)\` (browns)
- **Recommended badge** (Micro Loan only): top-right, background rgba(0,0,0,0.55), white text 10px weight 600, padding 6/2, radius 4
- **Overlay (white text):**
  - Left: "LOAN SIZE" (9px, opacity 0.85) → value (13px, weight 700) → "TERM" (9px) → value (11px, weight 600)
  - Right: "INTEREST RATE" (9px) → "1.2%" (22px, weight 700, line-height 1)

### News & Promotions Banner
- Card **exactly 110 px tall** (do not exceed), full screen width minus 32 px horizontal padding, white, radius 12px, **purely an image holder** — no gradient overlay, no text overlay, no rate badge
- Content: \`/assets/banners/1.png\` rendered at 100% width × 100% height, object-fit cover, display block
- Pagination: 3 pill dots beneath the card, mt 8, centered, gap 4 (active 16 × 5 #1A1A1A, inactive 5 × 5 #D0D3D7)

### Bottom Navigation
- Absolute bottom, **exactly 56 px tall**, white background, border-top 1px #E0E0E0, full screen width
- 3 items, space-around, icon 22 × 22 + label 10px (currentColor — active = \`var(--primary)\`, inactive = #6F7479):
  - Home (active) → \`/assets/icons/ico_nav_home.svg\`
  - Products → \`/assets/icons/ico_browse_loan.svg\` (same glyph as the Browse Loan tile)
  - More → \`/assets/icons/ico_nav_more.svg\`

## Assets used
- \`/assets/logos/header_logo2.png\` — brand logo (PNG)
- \`/assets/icons/Ico_message.png\` — header message icon
- \`/assets/icons/ico_notification.png\` — header bell icon
- \`/assets/icons/ico_id_card.svg\` — Quick Sign Up tile glyph
- \`/assets/icons/ico_arrow_forward.svg\` — Quick Sign Up CTA arrow
- \`/assets/icons/ico_browse_loan.svg\` — Browse Loan tile + Products nav tab
- \`/assets/icons/ico_calculator.svg\` — Calculator tile
- \`/assets/icons/ico_consult.svg\` — Consult tile
- \`/assets/icons/ico_storefront.svg\` — Product card title icon
- \`/assets/icons/ico_nav_home.svg\` — Home nav tab
- \`/assets/icons/ico_nav_more.svg\` — More nav tab
- \`/assets/banners/1.png\` — News & Promotions banner

## Navigation
- Tapping **Quick Sign Up** card → Onboarding screen.
`;

export const HOME_VARIANT_NOTES: Record<UiStyleId, string> = {
  classic: `## Sample 1 (Classic) — variant notes

Baseline implementation. Layout matches the master spec above exactly. Frame stays at 375 × 760.
- Quick Sign Up card with rounded arrow CTA (icon only, no text label).
- 3-up action tiles (Browse Loan · Calculator · Consult), flat white, no border.
- **Horizontal product carousel** (Micro Loan + Small Business Loan), 78% snap width, with the gradient image area + LOAN SIZE / INTEREST RATE overlay described in master.
- Single news banner (exactly 110 px tall) with 3-pill-dot pagination underneath.
`,
  modern: `## Sample 2 (Modern) — variant notes

Editorial, dense, list-first reading. Frame stays at 375 × 760. All overrides below assume \`var(--primary)\` resolves to the Modern primary defined in the style profile (charcoal \`#111827\`).

- **Quick Sign Up:** card gains a hairline border (1px #E0E0E0); the rounded arrow button is replaced with an inline text link "Sign up →", font 13px / 700, color \`var(--primary)\` (no background, no chip). The ID-card icon tile background becomes a neutral \`#F4F5F7\` (NOT a primary tint) — Modern keeps surfaces neutral.
- **Action tiles:** outlined (1px #E0E0E0), no shadow, no primary tint behind the icon — flat white tiles, icons in #1A1A1A.
- **Products carousel → vertical list.** Each product is its own row inside its own outlined card (1px #E0E0E0), height ~64 px, padding 12/14: storefront icon (18 × 18 in \`var(--primary)\`) · title (14 / 700) + optional outlined "RECOMMENDED" tag (9px / 700, 1px border in \`var(--primary)\`, text in \`var(--primary)\`, padding 6/2) · "size · term" sub (11px, secondary) · large tabular rate "1.2%" on the right (18px / 800). **No gradient image area, no LOAN SIZE/INTEREST RATE overlay** — those belong to the Classic carousel only.
- **News & Promotions:** unchanged — pure image card at exactly 110 px tall. Do not add a gradient overlay or rate badge here.
- **Dark accent bar:** a 3px bar in \`var(--primary)\` sits at the very TOP of the mobile frame (above the status bar / header), spanning the full frame width — NOT on the bottom nav.
- **Bottom nav active state:** uses \`var(--primary)\` (charcoal #111827), NOT the master design system's NH Blue.
`,
  playful: `## Sample 3 (Playful) — variant notes

Hero-led, rounded, action-driven. Frame stays at 375 × 760.
- **Quick Sign Up:** replaced with a full-width gradient hero card (\`linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)\`), padding 16, color \`var(--on-primary)\`. Eyebrow "NEW HERE?" (11 / 700, opacity 0.85), display headline "Apply in 2 minutes" (22 / 800, line-height 1.1), supporting body "Sign up, scan ID, get a decision." (12, opacity 0.9), white pill CTA "Start now →" (12 / 700, padding 12/6, radius 999, background \`var(--on-primary)\`, text \`var(--primary)\`).
- **Action tiles:** larger square cards (\`var(--card-bg)\`, radius \`var(--radius-card)\` + 4, py 12, gap 4) with a soft-colored disc behind each icon (\`var(--primary-tint)\`, 36 × 36 circle).
- **Products:** single hero product card (Micro Loan only). Image hero band on top (140 px tall, gradient) with a pill "Recommended" tag in \`var(--primary)\` (top-right); bottom row shows "Term · ≤ 48 mo" left + a pill "Apply →" CTA right.
- **Buttons:** all primary CTAs use a 999px radius (full pill).
`,
};
