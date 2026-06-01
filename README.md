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

- **UX** — the screen rendered in the Classic baseline. Use this to read the flow and layout without color noise.
- **UI** — three samples (Classic / Modern / Playful) shown side-by-side. Click one to select it as the direction for this screen. The selection is per-screen and survives a refresh (stored in `localStorage`).
- **Design System** — only visible when developer mode is on. Shows the merged master + style profile + screen spec markdown, with copy and download buttons.

### Downloads (`/downloads`)
A single button — **Download bundled spec** — packages **all** screens into one zip:

```
WeLoan365_All_Specs.zip
├── WeLoan365_All_Specs.md          ← concatenated screen specs
├── WeLoan_Design_System.md         ← master design system
├── WeLoan_Sample_1_Style.md        ← Classic style profile
├── WeLoan_Sample_2_Style.md        ← Modern style profile
├── WeLoan_Sample_3_Style.md        ← Playful style profile
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
│   ├── variants.ts                 Classic / Modern / Playful style tokens
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
| `index.tsx`  | The React component. Reads `useSettings().uiStyleId` and branches between Classic / Modern / Playful. |
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

---

## 7. Adding or editing an asset

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

## 8. Editing the design system

There are two layers:

1. **Master** — `public/assets/design-system/master.md`. Edited as plain Markdown; checked into Git as-is. The Downloads zip and every screen's dev-mode bundle include this file verbatim. It defines the brand-neutral foundations: typography, spacing, semantic colors, component anatomy.

2. **Style profiles** — `src/design-system/variants.ts` defines the three samples (Classic, Modern, Playful). Each profile **overrides** specific master tokens (`--primary`, `--card-bg`, radii, accent bar). The actual Markdown profile is generated from the tokens by `src/design-system/profile-markdown.ts`, so the document and the rendered preview can never drift out of sync.

When you add or change a token in `variants.ts`:
- The rendered React previews update immediately.
- The `WeLoan_<style>_Style.md` profile in every download bundle picks the new values up automatically — no manual Markdown edit needed.

---

## 9. Common workflows

### "I want to see what the Playful direction looks like for create-account"
- Open `/screen/create-account` → **UI** tab → click the **Sample 3** preview. The card border highlights, and the selection is saved.

### "Designer picked Modern for onboarding — send it to engineering"
- Open `/screen/onboarding` → **UI** tab → click **Sample 2** → flip on developer mode in **Settings** → back to the screen → **Download UX/UI Spec**. Send the resulting `WeLoan365_onboarding_modern_UI.zip`.

### "Give me one zip with everything"
- `/downloads` → **Download bundled spec**.

### "I'm picking up a fresh checkout — what should I run?"
- `npm install && npm start`. Browse to `/overview`.

---

## 10. Troubleshooting

- **Port 3000 is busy** — set a port: `PORT=3001 npm start`.
- **Download finishes but the zip has `MISSING.txt`** — open it; it lists files that couldn't be fetched. Usually a typo in `assets.ts` (filename mismatch or wrong category folder). Fix the row and re-download.
- **The screenshot in the zip is blank / unstyled** — `html2canvas` runs against the live DOM, so make sure the preview is fully visible (not scrolled off-screen) before clicking download. Reload the page if MUI's font hasn't loaded yet.
- **Type errors after editing `types.ts`** — adding a new `ScreenId` literal but not adding the matching config will fail to compile. Add the new `ScreenConfig` to the registry to satisfy the compiler.

---

## 11. Built with

- React 19 + TypeScript 4.9
- MUI 5 (`@mui/material`, `@mui/icons-material`, Emotion)
- react-router-dom 6
- jszip + file-saver for bundling
- html2canvas for screenshots
- framer-motion for the screen-transition animations
