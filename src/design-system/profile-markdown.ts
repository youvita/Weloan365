import { UI_STYLES, UiStyleId, UiStyleTokens } from './variants';

export const DESIGN_SYSTEM_MASTER_URL = '/assets/design-system/master.md';
export const DESIGN_SYSTEM_MASTER_FILENAME = 'WeLoan_Design_System.md';

export const buildStyleProfileMarkdown = (tokens: UiStyleTokens): string => {
  return `# WeLoan — ${tokens.name} Style Profile

> **How to read this file.** This profile pins the design-system tokens that the ${tokens.name} screen variant renders against. All three samples share the same brand foundation (token values are identical); the per-Sample differences live in the screen layout, not in the tokens. Pair this file with the screen's variant notes to see what is structurally different.

## Frame (non-negotiable)

Every screen in this design system is rendered at **exactly 375 × 760 px** (iPhone 13/14 mini, portrait). Do not scale up to a larger device — if the target device is wider, letterbox; do not stretch the content. Horizontal padding is 16 px on both sides. The bottom navigation, when present, occupies the bottom 56 px and is positioned absolutely.

If a screenshot PNG (\`screen-ui_<screen>_<style>.png\`) is supplied alongside this file, **treat it as the visual ground truth** — match its proportions, image crops, and vertical rhythm exactly. When prose and screenshot disagree, the screenshot wins.

## Style tokens

| Token              | CSS variable        | Value               |
| ------------------ | ------------------- | ------------------- |
| Primary            | \`--primary\`         | \`${tokens.primary}\`     |
| Primary hover      | \`--primary-hover\`   | \`${tokens.primaryHover}\` |
| On primary         | \`--on-primary\`      | \`${tokens.onPrimary}\`   |
| Primary tint (10%) | \`--primary-tint\`    | \`${tokens.primary}1A\` (primary @ 10% alpha) |
| Mobile background  | \`--mobile-bg\`       | \`${tokens.mobileBg}\`    |
| Card background    | \`--card-bg\`         | \`${tokens.cardBg}\`      |
| Card shadow        | \`--card-shadow\`     | ${tokens.cardShadow === 'none' ? 'none' : `\`${tokens.cardShadow}\``} |
| Card radius        | \`--radius-card\`     | ${tokens.radius.card}px |
| Button radius      | \`--radius-button\`   | ${tokens.radius.button}px |
| Sheet radius       | \`--radius-sheet\`    | ${tokens.radius.sheet}px |
| Frame color        | \`--frame-color\`     | \`${tokens.frame.color}\` |
| Frame radius       | \`--frame-radius\`    | ${tokens.frame.radius}px |
| Frame padding      | \`--frame-padding\`   | ${tokens.frame.padding}px |
| Accent bar         | \`--accent-bar\`      | ${tokens.frame.accentBar ? `\`${tokens.frame.accentBar}\` (3px bar at TOP of the mobile frame, above the header — NOT on the bottom nav)` : 'none'} |

## Where each token applies

- \`--primary\` — primary CTA backgrounds (e.g. Quick Sign Up arrow button), filled link text ("Sign up →"), active bottom-nav icon + label, active wizard step dot, focus rings, selected-state borders, outlined "RECOMMENDED" tag border + text. Resolves to NongHyup blue inherited from master.md.
- \`--primary-hover\` — hover/pressed states of primary CTAs.
- \`--on-primary\` — text/icon color drawn on top of a \`--primary\` fill (e.g. white arrow inside the blue button).
- \`--primary-tint\` — tinted-on-white surfaces sitting under content (e.g. icon tile behind the ID card glyph).
- \`--mobile-bg\` — the canvas behind every card on the screen.
- \`--card-bg\` — every white tile (Quick Sign Up, action tile, product row, news banner).
- \`--card-shadow\` — applied to cards; setting it to \`none\` keeps surfaces flat.
- \`--radius-card\` / \`--radius-button\` / \`--radius-sheet\` — override the master's 12/8/16 defaults.
- \`--frame-*\` — describe the device-frame mockup that wraps the rendered screen.
- \`--accent-bar\` — when set, draw a 3px horizontal bar in this color at the TOP of the mobile frame (above the status bar/header). When \`none\`, draw nothing.

## What this profile does NOT override

Typography (sizes, weights, tracking), spacing scale, semantic colors (success / warning / danger / info from master), neutrals, text colors, border colors, and component anatomy (button height, input height, OTP cell size, etc.). Pull those from \`WeLoan_Design_System.md\` unchanged.

## Swatches

${tokens.swatches.map((s) => `- \`${s}\``).join('\n')}
`;
};

export const getStyleProfileMarkdown = (id: UiStyleId): string =>
  buildStyleProfileMarkdown(UI_STYLES[id]);

export const getStyleProfileFilename = (id: UiStyleId): string =>
  `WeLoan_${UI_STYLES[id].name.replace(/\s+/g, '_')}_Style.md`;
