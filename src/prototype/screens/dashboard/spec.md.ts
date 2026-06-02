import { UiStyleId } from '../../../design-system/variants';

export const DASHBOARD_MARKDOWN = `# Dashboard — Returning Customer Landing

> **Render directive (READ FIRST).** This document describes a screen that has already been built. If a PNG named \`screen-ui_dashboard_<style>.png\` is supplied alongside this file, **treat that image as the visual ground truth** — match its layout proportions, image crops, and vertical rhythm exactly. When prose and screenshot disagree, the screenshot wins.

**Screen:** Dashboard
**Status:** Draft — assumptions surfaced below
**Background:** \`var(--mobile-bg)\` (Sample 1 = #F2F3F5)

## Assumptions (call-outs for review)

- **Flow position:** leaf of the **Existing User** flow. Reached from \`otp-verify\` (Verify CTA). No \`next\` — there's no defined post-dashboard screen yet.
- **User name:** "Sopheak" (placeholder). Production should derive from the authenticated profile.
- **Active loan figures:** Micro Loan, principal $2,000, **3 / 24 months elapsed**, next payment $93.42 due 14 Jun 2026. Same illustrative figures used on \`loan-summary\`; production should pull from the loan service.
- **Recent activity:** 3 hardcoded sample transactions. Production should bind to the transactions service.
- **Bottom nav:** Home / Products / More — same shape as the home screen's bottom nav. Tapping items does not navigate in the prototype.
- **Three samples — lighter pattern:** Sample 1 is the canonical card-based dashboard; Sample 2 flattens the cards into outlined rows on a list-led layout; Sample 3 leads with a gradient greeting hero.

## Frame (non-negotiable)

| Attribute              | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Device frame           | 375 × 760 px (iPhone 13/14 mini, portrait)           |
| Inner content area     | 375 × 760 px — the screen fills the entire frame     |
| Bottom nav reserves    | 56 px from bottom (absolute)                         |
| Horizontal screen pad  | 16 px both sides                                     |

## Copy (verbatim strings — do not paraphrase)

\`\`\`
Greeting eyebrow          "WELCOME BACK"
Greeting name             "Hi, Sopheak"
Active loan eyebrow       "ACTIVE LOAN"
Active loan title         "Micro Loan"
Active loan progress      "3 of 24 months"
Next payment label        "Next payment"
Next payment value        "$93.42"
Next payment due          "due 14 Jun 2026"
Pay CTA                   "Pay now"
Quick actions heading     "QUICK ACTIONS"
Quick action 1            "Browse Loan"
Quick action 2            "Calculator"
Quick action 3            "Consult"
Activity heading          "RECENT ACTIVITY"
Activity row 1            "Loan disbursement"   "+$2,000.00"   "14 Mar 2026"
Activity row 2            "Monthly payment"     "-$93.42"      "14 Apr 2026"
Activity row 3            "Monthly payment"     "-$93.42"      "14 May 2026"
Bottom nav item 1         "Home"
Bottom nav item 2         "Products"
Bottom nav item 3         "More"
\`\`\`

## Layout (top → bottom, with hard sizes)

| #  | Block                          | Outer size                       | Notes                                              |
| -- | ------------------------------ | -------------------------------- | -------------------------------------------------- |
| 1  | Header row                     | full-width × 44 px               | greeting (left) + notification bell + avatar       |
| 2  | Active loan card               | full-width × ~120 px             | progress + next payment + Pay now CTA              |
| 3  | Quick actions heading          | full-width × ~16 px              | uppercase eyebrow                                  |
| 4  | Quick actions row              | full-width × 64 px               | 3 equal tiles (Browse / Calculator / Consult)      |
| 5  | Activity heading               | full-width × ~16 px              | uppercase eyebrow                                  |
| 6  | Activity list                  | full-width × ~3 × 56 px          | 3 rows                                             |
| 7  | Bottom nav                     | full-width × 56 px               | absolute bottom, Home active                       |

## Components

### Header
- **Greeting eyebrow:** "WELCOME BACK", 10 / 700, letter-spacing 0.5, text_tertiary.
- **Greeting name:** "Hi, Sopheak", 20 / 700, #1A1A1A.
- **Notification bell:** \`/assets/icons/ico_notification.png\` 24 × 24 in an icon button.
- **Avatar:** 32 × 32 circle, background \`var(--primary-tint)\`, initial "S" in \`var(--primary)\` 14 / 700.

### Active loan card
- White card (radius \`var(--radius-card)\`, padding 16, \`var(--card-shadow)\` — Sample 1 only; see variant notes for Sample 2 / 3 overrides).
- **Eyebrow** "ACTIVE LOAN" 11 / 700, letter-spacing 0.5, text_tertiary.
- **Title** "Micro Loan" 16 / 700, #1A1A1A, mt 2.
- **Progress** "3 of 24 months" with a 6 px tall progress bar beneath (radius 999, background #D0D3D7, filled portion \`var(--primary)\` at 3/24 = 12.5% width).
- **Next payment row:** "Next payment" label (12 / 500, text_secondary) + "$93.42" (16 / 700) + "due 14 Jun 2026" (11 / 500, text_secondary).
- **Pay now CTA:** chip-style pill on the right of the next-payment row — background \`var(--primary)\`, color \`var(--on-primary)\`, padding 12/6, radius 999, 12 / 700.

### Quick actions
- 3 equal tiles, flex 1 each, gap 8, height 64 px.
- Each tile: \`var(--card-bg)\`, radius \`var(--radius-card)\`, py 1.25, flex column align center, gap 4.
  - Browse Loan → \`/assets/icons/ico_browse_loan.svg\` 22 × 22 in #1A1A1A
  - Calculator → \`/assets/icons/ico_calculator.svg\` 22 × 22 in #1A1A1A
  - Consult → \`/assets/icons/ico_consult.svg\` 22 × 22 in #1A1A1A
- Label: 11 / 500, #1A1A1A.

### Recent activity list
- 3 rows, each 56 px tall, separated by hairline dividers (1px #E0E0E0).
- Row contents: title (13 / 600, #1A1A1A) on left over date (11 / 500, text_secondary); amount on the right (13 / 700; positive amounts in #2F6F3A, negative in #1A1A1A).

### Bottom navigation
- Absolute bottom, **exactly 56 px tall**, white, border-top 1px #E0E0E0, full screen width.
- 3 items, space-around, icon 22 × 22 + label 10 px:
  - Home (active) → \`/assets/icons/ico_nav_home.svg\` — active color \`var(--primary)\`
  - Products → \`/assets/icons/ico_browse_loan.svg\` — inactive #6F7479
  - More → \`/assets/icons/ico_nav_more.svg\` — inactive #6F7479

## Assets used
- \`/assets/icons/ico_notification.png\` — notification bell
- \`/assets/icons/ico_browse_loan.svg\` — Browse Loan tile + Products nav tab
- \`/assets/icons/ico_calculator.svg\` — Calculator tile
- \`/assets/icons/ico_consult.svg\` — Consult tile
- \`/assets/icons/ico_nav_home.svg\` — Home nav tab
- \`/assets/icons/ico_nav_more.svg\` — More nav tab

## Navigation
- **Pay now** — no-op (post-dashboard flow not defined).
- **Bottom nav items** — no-op in the prototype.
`;

export const DASHBOARD_VARIANT_NOTES: Record<UiStyleId, string> = {
  'sample-1': `## Sample 1 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

Canonical card-based dashboard. Frame stays at 375 × 760. Greeting in the header row, then the active-loan card with the progress bar and Pay now pill, then a flat row of 3 quick-action tiles, then an activity list under an uppercase eyebrow. Bottom nav fixed at the bottom (56 px tall).
`,
  'sample-2': `## Sample 2 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

**Structural override vs Sample 1:** flatten the chrome. Active loan rendered as a row inside a hairline-bordered outlined card (1px #E0E0E0), no shadow. Quick actions become 3 outlined tiles (1px #E0E0E0) instead of filled cards. Activity rows lose the row-level dividers and instead become a single outlined card with internal dividers. Pay now button becomes an inline text link "Pay →" in \`var(--primary)\` rather than a filled pill.
`,
  'sample-3': `## Sample 3 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

**Structural override vs Sample 1:** lead with a **gradient greeting hero** (\`linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)\`, padding 20, radius \`var(--radius-card)\` + 8). The greeting eyebrow + name live inside the hero in \`var(--on-primary)\`, and the avatar sits in the hero's top-right (white background, primary text). Quick action icons get a 36 × 36 \`var(--primary-tint)\` disc behind each glyph (matching the home screen's Sample 3 treatment).
`,
};
