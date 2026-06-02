import { UiStyleId } from '../../../design-system/variants';

export const LOAN_SUMMARY_MARKDOWN = `# Loan Summary — Review Your Offer

> **Render directive (READ FIRST).** This document describes a screen that has already been built. If a PNG named \`screen-ui_loan-summary_<style>.png\` is supplied alongside this file, **treat that image as the visual ground truth** — match its layout proportions, image crops, and vertical rhythm exactly. When prose and screenshot disagree, the screenshot wins.

**Screen:** Loan Summary
**Status:** Draft — assumptions surfaced below; revise as the product narrative tightens
**Background:** \`var(--mobile-bg)\` (Sample 1 = #F2F3F5)

## Assumptions (call-outs for review)

These were not specified when the screen was scaffolded; they should be confirmed before this screen ships.

- **Flow position:** in the **Existing User** flow, placed after \`dashboard\` (set as \`dashboard.next\`). Currently a leaf (no \`next\`); whatever screen "Confirm & continue" navigates to does not yet exist. Originally scaffolded as the tail of the New User Sign Up flow, then moved here because a returning user reviewing their selected loan is the better narrative fit.
- **Sample loan offer used in the prototype:** Micro Loan, principal $2,000, term 24 months, rate 1.2% per month. Monthly payment $93.42, total interest $242.05, total payable $2,242.05. **These figures are illustrative only** — the production screen should derive them from the prior product-selection / calculator flow, not hardcode them.
- **Agreement copy:** "I have read and agree to the loan agreement, the privacy policy, and the disclosure statement." This wording is a placeholder pending Legal sign-off.
- **Secondary action ("Edit terms") destination:** assumed to back-navigate to the calculator / product selection. There is no real calculator screen yet; the link currently no-ops.

## Frame (non-negotiable)

| Attribute              | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Device frame           | 375 × 760 px (iPhone 13/14 mini, portrait)           |
| Inner content area     | 375 × 760 px — the screen fills the entire frame     |
| Horizontal screen pad  | 16 px both sides                                     |
| Bottom CTA reserves    | 92 px from bottom (CTA + helper link + padding)      |

**Do not scale the frame up or down.** If your target device is wider, letterbox; do not stretch.

## Copy (verbatim strings — do not paraphrase)

\`\`\`
Header title              "Review your loan"
Header subtitle           "Confirm the terms before we submit your application"
Eyebrow (summary block)   "MONTHLY PAYMENT"
Loan product label        "Micro Loan"
Monthly payment value     "$93.42"
Monthly payment unit      "/ month for 24 months"
Breakdown heading         "Breakdown"
Row 1 label / value       "Loan amount"          "$2,000.00"
Row 2 label / value       "Term"                 "24 months"
Row 3 label / value       "Interest rate"        "1.2% / month"
Row 4 label / value       "Total interest"       "$242.05"
Row 5 label / value       "Total payable"        "$2,242.05"
Agreement checkbox label  "I have read and agree to the loan agreement, the privacy policy, and the disclosure statement."
Primary CTA               "Confirm & continue"
Secondary action          "Edit terms"
\`\`\`

The "Total payable" row is the visual emphasis row in the breakdown — heavier weight and a top border separator above it.

## Layout (top → bottom, with hard sizes)

| #  | Block                          | Outer size                       | Notes                                                |
| -- | ------------------------------ | -------------------------------- | ---------------------------------------------------- |
| 1  | Header row                     | full-width × 44 px               | back chevron (left) + heading + subtitle stack       |
| 2  | Summary block                  | full-width × ~140 px             | eyebrow + monthly payment value + unit + product tag |
| 3  | Breakdown block                | full-width × ~220 px             | "Breakdown" heading + 5 label/value rows             |
| 4  | Agreement row                  | full-width × ~52 px              | checkbox + statement, 12px line-height 1.4           |
| 5  | Spacer                         | flex 1                           | pushes CTA group to bottom                           |
| 6  | Primary CTA + "Edit terms"     | full-width × 76 px               | px 16, pb 16; CTA on top, link centered beneath      |

## Components

### Header
- **Back button:** \`/assets/icons/Back%20Icon.png\` 22 × 22 in #1A1A1A, returns to \`dashboard\`
- **Title:** "Review your loan", 18 / 700, #1A1A1A, mt 4
- **Subtitle:** "Confirm the terms before we submit your application", 12 / 400, text_secondary, mt 2

### Summary block
- **Eyebrow:** "MONTHLY PAYMENT", 11 / 700, letter-spacing 0.5, text_tertiary
- **Monthly payment value:** "$93.42", **32 / 800**, #1A1A1A (Sample 1 / Sample 2) or \`var(--on-primary)\` if on a gradient (Sample 3)
- **Unit:** "/ month for 24 months", 12 / 500, text_secondary, mt 2
- **Product tag:** "Micro Loan" chip — visual treatment differs per Sample (see variant notes)

### Breakdown rows
- 5 rows, each row 36 px tall, label (13 / 500, text_secondary) left, value (13 / 700, #1A1A1A) right.
- Top border 1px #E0E0E0 between row 4 and row 5 only — emphasizing **Total payable**. Row 5 value uses 14 / 800.

### Agreement row
- **Checkbox:** 20 × 20, radius 4, border 1px #C7CACE; when checked, fill \`var(--primary)\` with white check.
- **Label:** to the right, 12 / 500, line-height 1.4, color #1A1A1A. The words "loan agreement", "privacy policy", and "disclosure statement" are styled in \`var(--primary)\` (clickable in production; static in the prototype).
- Default state: **checked** (so the primary CTA is enabled in the prototype walkthrough).

### Primary CTA — "Confirm & continue"
- Full-width, **height exactly 52 px** (Sample 1 / Sample 2) or 56 px (Sample 3), border-radius \`var(--radius-button)\` (Sample 1 / Sample 2) or 999 (Sample 3 — Sample-3 local layout decision, not a token override).
- Background \`var(--primary)\`, color \`var(--on-primary)\`, 15 / 700, text-transform none.
- Disabled state (agreement unchecked): background \`var(--primary)\` at 40% opacity. Disabled state is rendered visually but is not interactive in the prototype.
- Includes \`/assets/icons/ico_arrow_forward.svg\` 18 × 18 in \`var(--on-primary)\` (right of label).

### Secondary action — "Edit terms"
- Plain text link below the CTA, centered, 13 / 600 in \`var(--primary)\`.
- No background, no border. Currently no-ops (target screen does not exist).

## Assets used
- \`/assets/icons/Back Icon.png\` — header back chevron
- \`/assets/icons/ico_storefront.svg\` — product tag glyph (Sample 1 / Sample 3 only)
- \`/assets/icons/ico_calculator.svg\` — breakdown heading glyph (Sample 2 only)
- \`/assets/icons/ico_arrow_forward.svg\` — primary CTA arrow

## Navigation
- **Back chevron** returns to \`dashboard\`.
- **Confirm & continue** — currently no-op (no next screen registered). When the post-confirmation flow is added, set this screen's \`next\` accordingly.
- **Edit terms** — currently no-op (target screen does not exist).
`;

export const LOAN_SUMMARY_VARIANT_NOTES: Record<UiStyleId, string> = {
  'sample-1': `## Sample 1 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

Card-led baseline. Frame stays at 375 × 760.
- **Summary block:** a single elevated white card (radius \`var(--radius-card)\`, padding 16, \`var(--card-shadow)\`). Eyebrow + monthly payment value + unit stacked left; product tag pill on the right ("Micro Loan" with the \`ico_storefront.svg\` glyph, \`var(--primary-tint)\` background, \`var(--primary)\` text).
- **Breakdown:** rendered inside its own white card (radius \`var(--radius-card)\`, padding 16). "Breakdown" heading at the top (14 / 700, #1A1A1A); rows separated visually by spacing, not by dividers.
- **Agreement + CTA group:** stacked at the bottom of the frame with px 2 and a 12 px gap between agreement row and CTA card.
`,
  'sample-2': `## Sample 2 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

List-led, editorial. Frame stays at 375 × 760.
- **Summary block:** no card. Eyebrow + monthly payment value + unit set directly on \`var(--mobile-bg)\` with no chrome. Product line replaces the chip with a text row: \`ico_storefront.svg\` 14 × 14 in \`var(--primary)\` + "Micro Loan" (12 / 700) inline above the eyebrow.
- **Breakdown:** rendered as an underlined table. Each row has a hairline divider beneath (1px #E0E0E0). The "Breakdown" heading is paired with \`/assets/icons/ico_calculator.svg\` 16 × 16 in #1A1A1A on the left, 12 / 700 letter-spacing 0.5 uppercase ("BREAKDOWN").
- **Total payable row:** retains the heavier 14 / 800 value but no card chrome; uses a thicker top border (2px #1A1A1A) instead of the 1px tint to separate it from the other rows.
- **Agreement row:** no card, no shadow — sits flat on the mobile background, hairline 1px #E0E0E0 above it.
- **CTA:** filled \`var(--primary)\` rectangle, full-width, default token radius. Trailing arrow is omitted in this variant — text-only label.
`,
  'sample-3': `## Sample 3 — variant notes

All three samples share the same brand tokens — the differences below are structural layout overrides only.

Hero-led, action-driven. Frame stays at 375 × 760.
- **Summary block:** full-width gradient hero card (\`linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)\`), padding 20, radius \`var(--radius-card)\` + 8. Eyebrow rendered in \`var(--on-primary)\` opacity 0.85; monthly payment value 36 / 800 in \`var(--on-primary)\`; unit in \`var(--on-primary)\` opacity 0.9. Product tag pill is white (background \`var(--on-primary)\`, text \`var(--primary)\`, radius 999) and sits in the top-right of the hero with \`ico_storefront.svg\` 14 × 14 in \`var(--primary)\`.
- **Breakdown:** white card with rounded corners + soft shadow. The "Total payable" row is emphasised by a soft \`var(--primary-tint)\` background fill on that row only (radius 8, padding 8/10) — no top border treatment.
- **Agreement row:** sits in its own outlined card (1px \`var(--primary-tint)\`, radius \`var(--radius-card)\`, padding 12).
- **CTA:** height 56 px, radius 999 (Sample 3 local layout decision, not a token override). Trailing \`ico_arrow_forward.svg\` is retained.
- **Edit terms link:** styled as a soft pill chip (background \`var(--primary-tint)\`, text \`var(--primary)\`, padding 10/6, radius 999) rather than a plain text link.
`,
};
