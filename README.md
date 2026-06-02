# WeLoan365 — Prototype & Design Bundler

WeLoan365 is the prototype workspace for the **NongHyup Finance (Cambodia) Plc** loan app. It runs every product screen inside a 375 × 760 mobile frame, lets you compare three UI style directions side-by-side, and packages everything an engineer needs — screen spec, design system, style profile, screenshot, assets — into a single downloadable zip.

The same React project serves three audiences:

- **Product / Design** — browse the live prototype, click between screens, pick the UI direction per screen.
- **Engineering** — flip on developer mode to read the variant-aware Markdown spec and grab the asset bundle.
- **Anyone consuming the spec downstream** — the all-specs zip on the Downloads page is self-contained: master design system + 3 style profiles + every screen's assets.

---

## 1. Prerequisites

- **Node.js** ≥ 18 (Node 20 LTS recommended)
- **npm** ≥ 9 (ships with Node)

Verify before starting:

```bash
node -v
npm -v
```

---

## 2. Install & run

From the repo root:

```bash
npm install        # one-time, populates node_modules
npm start          # starts the dev server at http://localhost:3000
```

The browser opens automatically. The app redirects `/` → `/overview`.

Other scripts:

| Command         | What it does                                             |
| --------------- | -------------------------------------------------------- |
| `npm start`     | Dev server with HMR at `http://localhost:3000`           |
| `npm run build` | Production build into `build/`                           |
| `npm test`      | Run the (currently minimal) Jest test suite              |

---

## 3. Using the app — screen by screen

### Overview page (`/overview`)
The landing page shows every prototype screen as a card, arranged left-to-right in flow order with arrow connectors. Click any card to open it.

### Screen preview (`/screen/:id`)
Three tabs sit above the rendered mobile frame:

- **UX** — the screen rendered in the Sample 1 baseline. Use this to read the flow and layout without color noise.
- **UI** — three samples (Sample 1 / 2 / 3) shown side-by-side. Click one to select it as the direction for this screen. The selection is per-screen and survives a refresh (stored in `localStorage`).
- **Design System** — only visible when developer mode is on. Shows the merged master + style profile + screen spec markdown, with copy and download buttons.

### Downloads (`/downloads`)
A single button — **Download bundled spec** — packages **all** screens into one zip:

```
WeLoan365_All_Specs.zip
├── WeLoan365_All_Specs.md          ← concatenated screen specs
├── WeLoan_Design_System.md         ← master design system
├── WeLoan_Sample_1_Style.md        ← Sample 1 style profile (shared brand tokens)
├── WeLoan_Sample_2_Style.md        ← Sample 2 style profile (shared brand tokens)
├── WeLoan_Sample_3_Style.md        ← Sample 3 style profile (shared brand tokens)
└── assets/
    ├── banners/
    ├── flags/
    ├── icons/
    ├── illustrations/
    └── logos/
```

### Settings (`/settings`)
Two toggles:

- **Developer mode** — exposes the **Design System** tab on each screen and unlocks the dev-mode "Download UX/UI Spec" panel.
- **UI style** — the global default for the **UX** tab and the initial selection used elsewhere.

Both are persisted in `localStorage`.

---

## 4. Downloading a screen as a bundle

There are three places you can download from. Each produces a different artifact, sized to the audience.

| Where | Button | Output | When to use |
| --- | --- | --- | --- |
| `/downloads` | Download bundled spec | **All screens** in one zip: combined markdown spec, master design system, 3 style profiles, every asset. | Hand-off to a downstream team that needs the whole product. |
| `/screen/:id` → **UI** tab (no dev mode) | Download Design System (.zip) — on each sample card | Per-screen zip for **one** style: screen spec, that style's profile, master design system, merged markdown, asset folder, plus a screenshot of the rendered preview. | Share a single style direction with a stakeholder. |
| `/screen/:id` → **UI** tab (dev mode ON) | Download UX/UI Spec | Per-screen zip for the **currently active** style: screen spec, active style profile, master design system, asset folder, plus a high-resolution screenshot of the live preview (used as visual ground truth). | Hand-off to engineering once a direction is picked. |

> **About the screenshot.** The screenshot is captured with `html2canvas` at the device's pixel ratio (up to 2×). It is shipped inside the zip as `screen-ui_<screen>_<style>.png`. Every spec file in this project references this exact filename and instructs the reader: *"if a PNG with this name is supplied, treat it as the visual ground truth."*

If any file can't be fetched at packaging time, the zip will include a `MISSING.txt` listing what was skipped — nothing fails silently.

---

## 5. How the code is organised

```
public/
├── assets/
│   ├── banners/                    PNG hero/banner images
│   ├── design-system/master.md     The master design-system document
│   ├── flags/                      en.svg, kh.svg
│   ├── icons/                      SVG + PNG icons referenced by screens
│   ├── illustrations/              illustration_empty.png and friends
│   └── logos/                      header_logo2.png
└── index.html

src/
├── App.tsx                         Top-level shell (Theme + Settings + Router)
├── app/
│   ├── layout/                     Header + Sidebar
│   ├── pages/                      OverviewPage, ScreenPreviewPage,
│   │                               DownloadsPage, SettingsPage
│   ├── providers/SettingsProvider  Dev mode + active UI style + per-call override
│   └── routes.tsx
├── components/                     ScreenCard, FlowConnector, MobilePreview,
│                                   DownloadButton
├── design-system/
│   ├── tokens.ts                   Static design tokens shared across screens
│   ├── theme.ts                    MUI theme wiring
│   ├── variants.ts                 Sample 1 / 2 / 3 style tokens
│   └── profile-markdown.ts         Generates the per-style profile Markdown
└── prototype/
    ├── registry.ts                 Single source of truth: every screen
    ├── types.ts                    ScreenConfig + ScreenAsset shape
    └── screens/
        ├── home/                   index.tsx · config.ts · assets.ts · spec.md.ts
        ├── onboarding/             index.tsx · config.ts · assets.ts · spec.md.ts
        └── create-account/         index.tsx · config.ts · assets.ts · spec.md.ts
```

### A screen has four files

| File         | Role                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------- |
| `index.tsx`  | The React component. Reads `useSettings().uiStyleId` and branches between Sample 1 / 2 / 3. |
| `assets.ts`  | The asset manifest — every PNG / SVG the production design needs. Included in every download. |
| `spec.md.ts` | Two exports: the master screen spec (`*_MARKDOWN`) and per-style notes (`*_VARIANT_NOTES`).  |
| `config.ts`  | The `ScreenConfig` that wires the above together and registers it with the registry.          |

---

## 6. Adding or editing a screen

### Editing an existing screen

1. Update **`index.tsx`** for whatever needs to change visually. The component automatically receives `useSettings().uiTokens` — branch on `uiStyleId` for variant-specific layouts.
2. Update **`spec.md.ts`** so the prose still matches the implementation. The render directive at the top of every spec says *"when prose and screenshot disagree, the screenshot wins"*, but please keep them in sync anyway.
3. If you reference a new icon, image, banner, illustration, flag, or logo:
   - Drop the file under the matching `public/assets/<category>/` folder.
   - Add a row to the screen's **`assets.ts`** so the download bundle picks it up.

### Adding a new screen

1. Pick a stable `ScreenId` (kebab-case, URL-safe) and add it to the union in `src/prototype/types.ts`. The compiler will then refuse to let you forget to wire it elsewhere.
2. Create `src/prototype/screens/<id>/` with the four files above. Easiest path: copy `home/` and trim.
3. Import the new `config` into `src/prototype/registry.ts` and add it to the `SCREENS` array.
4. If you want the new screen to follow another one in the overview flow, set the `next` field on the predecessor's `config.ts`.

> **Shortcut — use the `/new-screen` slash command.** Section 7 below documents two reusable slash commands that automate the four-file scaffold, registry wiring, and Sample 1/2/3 layouts. Reach for those instead of hand-copying `home/` when you're starting from scratch.

---

## 7. Slash commands — scaffolding screens and flows

This project ships two Claude Code slash commands under `.claude/commands/` that automate the scaffolding rules in section 6. They encode the conventions (4-file folder, `flow` value, Sample 1/2/3 layouts, asset discipline, registry wiring, verification gates) so you don't have to re-derive them every time.

| Command | What it scaffolds | Source |
| ------- | ----------------- | ------ |
| `/new-screen <screen-id>` | A single screen — the four files under `src/prototype/screens/<id>/`, the `ScreenId` union update, the `SCREENS` registry entry. | [.claude/commands/new-screen.md](.claude/commands/new-screen.md) |
| `/new-flow <flow-name>`   | A multi-screen flow — every screen in the flow (using the `/new-screen` rules per screen), `next` wiring between consecutive screens, a shared `flow` value, optional entry hook patched into an existing screen. | [.claude/commands/new-flow.md](.claude/commands/new-flow.md) |

### Using `/new-screen`

```
/new-screen loan-summary
```

Claude reads the prompt with `loan-summary` as the argument and gets straight to scaffolding. If the screen name is enough to imply purpose (`login`, `loan-summary`, `dashboard`), it'll pick sensible defaults and surface every assumption in the spec's `## Assumptions` section so you can push back.

Pass `/new-screen` with no argument to make Claude ask for: screen id, purpose, flow position (previous / next screen), key UI elements, and primary user action.

### Using `/new-flow`

```
/new-flow Existing User Login
```

Claude asks for the ordered screen list, an optional entry hook (e.g. "from `home`, swap the Quick Sign Up CTA to enter `login`"), and per-screen briefs. Then it scaffolds every screen, batches the registry edits in one pass, sets the shared `flow` value, wires `next` between consecutive screens, and patches the entry-hook source screen if you specified one.

For long flows (4+ screens), the command supports a lighter pattern where Sample 1 is the canonical layout and Sample 2 / Sample 3 each apply ONE structural override on top — so you don't owe three radically distinct designs per screen across the whole flow.

### What the commands assume about Sample 1 / 2 / 3

Both commands treat the three samples as **layout-only** directions over a single shared design-system foundation (`BASE_STYLE_TOKENS` in [src/design-system/variants.ts](src/design-system/variants.ts)). Component shape, arrangement, and per-Sample local layout decisions (e.g. one Sample's pill-radius CTA) are encouraged. Per-Sample tokens divergence (different primary colors, radii, shadows) is not — see section 9 if you want to genuinely fork tokens for a Sample.

### Verifying after scaffolding

Both commands end with a verification gate. The agent will not report done until:

1. `npx tsc --noEmit` passes.
2. The new screen(s) render under the matching flow in the sidebar's USER FLOW dropdown and on `/overview`.
3. **Download Design System (.zip)** on each new screen ships with no `MISSING.txt`.
4. `/downloads` → **Download bundled spec** picks up every new screen and its assets.

If a slash command isn't available in your CLI yet, the source `.md` files under `.claude/commands/` are self-contained prompts — you can paste the file contents into a Claude session manually with the screen / flow argument inlined.

---

## 8. Adding or editing an asset

Every visible image must live under `public/assets/` **and** be listed in the screen's `assets.ts`. Both are required:

- Files under `public/` only — the React preview will render, but the file is **not** included in download bundles.
- Listed in `assets.ts` but not on disk — the bundle will contain a `MISSING.txt` row at packaging time.

Asset categories (folder name = `ScreenAsset['category']`):

| Category        | Public folder                  | Used for                              |
| --------------- | ------------------------------ | ------------------------------------- |
| `logos`         | `public/assets/logos/`         | Brand / partner logos                 |
| `icons`         | `public/assets/icons/`         | Small UI glyphs (button + nav icons)  |
| `illustrations` | `public/assets/illustrations/` | Spot illustrations                    |
| `flags`         | `public/assets/flags/`         | Country / locale flags                |
| `banners`       | `public/assets/banners/`       | Hero / promotional banners            |

---

## 9. Editing the design system

There are two layers:

1. **Master** — `public/assets/design-system/master.md`. Edited as plain Markdown; checked into Git as-is. The Downloads zip and every screen's dev-mode bundle include this file verbatim. It defines the brand-neutral foundations: typography, spacing, semantic colors, component anatomy.

2. **Style profiles** — `src/design-system/variants.ts` defines the three samples (Sample 1, Sample 2, Sample 3). All three currently share the SAME design-system tokens (a single `BASE_STYLE_TOKENS` constant spread into each); the per-Sample differences live in screen layout (carousel vs list vs hero), not in colors or radii. The Markdown profile is generated from the tokens by `src/design-system/profile-markdown.ts`, so the document and the rendered preview can never drift out of sync.

When you add or change a token in `variants.ts`:
- The rendered React previews update immediately.
- The `WeLoan_<style>_Style.md` profile in every download bundle picks the new values up automatically — no manual Markdown edit needed.
- If you want a Sample to genuinely diverge on a token (e.g. give Sample 2 a different `cardShadow`), replace the spread of `BASE_STYLE_TOKENS` for that sample with its own values.

---

## 10. Common workflows

### "I want to see what Sample 3 looks like for create-account"
- Open `/screen/create-account` → **UI** tab → click the **Sample 3** preview. The card border highlights, and the selection is saved.

### "Designer picked Sample 2 for onboarding — send it to engineering"
- Open `/screen/onboarding` → **UI** tab → click **Sample 2** → flip on developer mode in **Settings** → back to the screen → **Download UX/UI Spec**. Send the resulting `WeLoan365_onboarding_sample-2_DesignSystem.zip`.

### "Give me one zip with everything"
- `/downloads` → **Download bundled spec**.

### "I'm picking up a fresh checkout — what should I run?"
- `npm install && npm start`. Browse to `/overview`.

---

## 11. Troubleshooting

- **Port 3000 is busy** — set a port: `PORT=3001 npm start`.
- **Download finishes but the zip has `MISSING.txt`** — open it; it lists files that couldn't be fetched. Usually a typo in `assets.ts` (filename mismatch or wrong category folder). Fix the row and re-download.
- **The screenshot in the zip is blank / unstyled** — `html2canvas` runs against the live DOM, so make sure the preview is fully visible (not scrolled off-screen) before clicking download. Reload the page if MUI's font hasn't loaded yet.
- **Type errors after editing `types.ts`** — adding a new `ScreenId` literal but not adding the matching config will fail to compile. Add the new `ScreenConfig` to the registry to satisfy the compiler.

---

## 12. Built with

- React 19 + TypeScript 4.9
- MUI 5 (`@mui/material`, `@mui/icons-material`, Emotion)
- react-router-dom 6
- jszip + file-saver for bundling
- html2canvas for screenshots
- framer-motion for the screen-transition animations
