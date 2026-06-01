# WeLoan v2 — Design System

> Tokens, components, and patterns for the NongHyup Finance Cambodia mobile app.
> The v2 language is calm, white-card based, with a single deep blue accent and an 8px geometry.
> Every screen in *WeLoan App v2* is built from what's documented below.

| Frame      | Font  | Primary    | Radii        | Button                   |
| ---------- | ----- | ---------- | ------------ | ------------------------ |
| 375 × 760  | Inter | `#275CB2`  | 8 / 14 / 16  | 48px height · 8px radius |

---

## Contents

**Foundations** — Colors · Typography · Spacing · Radius
**Components** — Buttons · Inputs & fields · Cards · Pills & badges · Banners · Confirmation sheet · Avatars · Selection controls · OTP & PIN · Slider & stepper · Timeline & step bar · Document upload
**Patterns** — Bottom tab bar · KPI card · Quick actions · Product cards · Hero state

---

## 01 — Colors

Five branded scales plus a tight set of semantic and surface tokens.
Use the **700** step as the primary action; **50** for tinted backgrounds.

### NH Blue · `--nh-blue-{50…900}`

| 50        | 100       | 200       | 300       | 400       | 500       | 600       | **700**     | 800       | 900       |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | ----------- | --------- | --------- |
| `#E6EEF8` | `#C5D4EE` | `#9DB6DF` | `#6190CC` | `#2A6BC7` | `#1056B5` | `#0E4AA5` | **`#275CB2`** | `#093178` | `#062048` |

### NH Green · `--nh-green-{50…700}`

| 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| `#EBF6EC` | `#C8E7CB` | `#97D49C` | `#5DB964` | `#3AAE43` | `#32A13C` | `#267E2D` | `#1F6724` |

### NH Light Green · `--nh-lg-{50…700}`

| 50        | 100       | 300       | 500       | 700       |
| --------- | --------- | --------- | --------- | --------- |
| `#F4FADE` | `#E3F2A5` | `#B5DD3F` | `#8CC919` | `#5C8511` |

### NH Yellow · `--nh-yellow-{50…700}`

| 50        | 100       | 300       | 500       | 700       |
| --------- | --------- | --------- | --------- | --------- |
| `#FFF6E0` | `#FFE7AD` | `#FFCA46` | `#FFB300` | `#B07900` |

### Neutrals · `--gray-{50…900}`

| 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| `#FAFAFA` | `#F5F5F5` | `#E5E5E5` | `#D4D4D4` | `#A3A3A3` | `#737373` | `#525252` | `#404040` | `#262626` | `#171717` |

### Semantic, surfaces & text

| Token             | Hex       | Variable           |
| ----------------- | --------- | ------------------ |
| Primary action    | `#275CB2` | `--nh-blue-700`    |
| Success           | `#32A13C` | `--success`        |
| Warning           | `#EA580C` | `--warning`        |
| Danger            | `#DC2626` | `--danger`         |
| Info              | `#1056B5` | `--info`           |
| Surface · base    | `#FFFFFF` | `--bg-base`        |
| Surface · canvas  | `#F5F5F5` | `--bg-canvas`      |
| Surface · subtle  | `#FAFAFA` | `--bg-subtle`      |
| Text · primary    | `#171717` | `--text-primary`   |
| Text · secondary  | `#525252` | `--text-secondary` |
| Text · tertiary   | `#737373` | `--text-tertiary`  |
| Border · default  | `#E5E5E5` | `--border-default` |

---

## 02 — Typography

Inter throughout — tabular numbers for amounts and a subtle `letter-spacing` tightening on display sizes.

| Role             | Size      | Weight    | Tracking         | Example                                  |
| ---------------- | --------- | --------- | ---------------- | ---------------------------------------- |
| Display          | 30        | 800       | −0.02em          | Apply for a loan                         |
| Heading L        | 22        | 800       | −0.02em          | You're all set                           |
| Heading M        | 18        | 700       | —                | Choose a repayment method                |
| Amount           | 44 + 28   | 800 / 700 | −0.03em · tabular| 128.40 / mo                              |
| Body             | 14        | 500       | —                | We'll send a one-time code to your phone.|
| Caption          | 12        | 400       | — · tertiary     | Updated 3 minutes ago                    |
| Eyebrow          | 11        | 800       | 0.08em · uppercase | POPULAR PRODUCTS                       |
| Tag / identifier | 10        | 600       | 0.08em · uppercase | PRODUCT-SHOT-01                        |

### Localized type stacks

Set the appropriate font on `html[lang]` so the entire screen flips at once.

| Language | Font            | Selector            |
| -------- | --------------- | ------------------- |
| English  | Inter           | `html[lang="en"]`   |
| Khmer    | Kantumruy Pro   | `html[lang="km"]`   |
| Korean   | Noto Sans KR    | `html[lang="ko"]`   |

**Font stack:** `'Inter', 'Kantumruy Pro', 'Noto Sans KR', system-ui, sans-serif`

---

## 03 — Spacing

Increments of 2 and 4. Stack within a card with **8 px**, between sections with **18 px**, full-page padding **20 px**.

| 2     | 4         | 8           | 12    | 16          | 20             | 24      | 32    |
| ----- | --------- | ----------- | ----- | ----------- | -------------- | ------- | ----- |
| micro | hairline  | inside-card | tight | comfortable | screen padding | section | block |

---

## 04 — Radius

Three working radii: **8** for buttons & small chips, **14** for inline cards and inputs, **16** for primary cards and sheets. Outer screen frame is **32**.

| px  | Use            |
| --- | -------------- |
| 4   | Micro          |
| 6   | Chip           |
| 8   | Button         |
| 12  | Small card     |
| 14  | Inline / input |
| 16  | Card           |
| 24  | Sheet          |
| 32  | Screen frame   |

---

## 05 — Buttons

All actionable buttons are **48 px** tall with an **8 px** radius. Use one primary action per screen.

| Variant      | Background           | Text             | Border        |
| ------------ | -------------------- | ---------------- | ------------- |
| Primary      | `--nh-blue-700`      | `#FFFFFF`        | none          |
| Secondary    | `#FFFFFF`            | `--text-primary` | none (soft shadow) |
| Ghost        | transparent          | `--nh-blue-700`  | none          |
| Destructive  | `--danger`           | `#FFFFFF`        | none          |
| Disabled     | `--nh-blue-700` @ 40%| `#FFFFFF`        | none          |

**Sizes** — Small `36px`, Default `48px`, Large `48px` (kept consistent for v2).

**Anatomy.** Height `48px` · Radius `8px` · Horizontal padding `16px` · Font `14px / 600`. Primary hover bumps to `--nh-blue-800`.

---

## 06 — Inputs & fields

Flat-on-card style: no visible border in default state, ring on validation. Always pair a label with an input; mark required with a red asterisk.

### States

| State    | Indicator                                                     |
| -------- | ------------------------------------------------------------- |
| Default  | flat on white, no border                                      |
| Focus    | inset 1.5px ring `--nh-blue-700`                              |
| Success  | inset 1.5px ring `--success` + green helper text with ✓       |
| Error    | inset 1.5px ring `--danger` + red helper text with ✗          |
| Disabled | value at tertiary color, container at 60% opacity             |

### Special inputs

- **Phone with country code** — flag glyph + `+855` chip, vertical divider, number on the right.
- **Date placeholder** — `DD / MM / YYYY` in placeholder color.

---

## 07 — Cards

Cards are flat white tiles on a warm gray canvas — no shadow, no border. Group related rows inside one card; separate dissimilar groups with vertical space.

| Card             | Class             | Radius | Padding |
| ---------------- | ----------------- | ------ | ------- |
| Field card       | `.v2card`         | 16px   | 14 / 16 |
| Summary review   | `.v2-summary-card`| 16px   | 16      |
| Input card       | `.v2-input-card`  | 14px   | 10 / 14 |
| Repayment table  | `.v2-tbl`         | 16px   | 0       |
| Agency detail    | `.v2-agency-card` | 16px   | mixed   |

---

## 08 — Pills, chips & badges

Compact uppercase pills for status, soft chips for filters, badges for counts. All sit at **9999 px** radius for full pill shape.

### Status pill (`.v2-pill`)

| Tone   | BG              | FG               |
| ------ | --------------- | ---------------- |
| Blue   | `--nh-blue-50`  | `--nh-blue-700`  |
| Green  | `--nh-green-50` | `--nh-green-700` |
| Yellow | `--nh-yellow-50`| `--nh-yellow-700`|
| Gray   | `#F0F1F3`       | `--text-secondary` |
| Pop    | `#FFE8C2`       | `#8A4500`        |

Text: `11 / 700`, uppercase, `.03em`. Padding `3 / 9`.

---

## 09 — Banners

Toast-style black pill, icon on the left, white text.

| State   | Icon                  | Icon color                     |
| ------- | --------------------- | ------------------------------ |
| Success | check (✓)             | `#32D17E` on transparent       |
| Error   | exclamation in disc   | white on `--danger`            |

**Anatomy.** Background `#111111`, white text `15 / 500`, 9999px radius, padding `16 / 22 / 16 / 16`, min-width `360px`.

---

## 10 — Confirmation sheet

Bottom-anchored modal for two-option decisions. Always stack the primary action on top.

- Container background `#F1F1F4`, radius `20px`, padding `14 / 16 / 18`.
- Grab handle `44 × 5 px`, `#D0D2D6`, centered.
- Title `17 / 700`, primary text, centered.
- Body `14`, secondary text, centered, `1.45` line-height.
- Buttons: white background, height `56px`, radius `14px`, font `16 / 500`.

---

## 11 — Avatars

Solid disc with mono-color initials. Use blue for the customer, green for the relationship officer, gray for system.

| Variant | Size    | Class            |
| ------- | ------- | ---------------- |
| Large   | 56 × 56 | `.v2-avatar-lg`  |
| Default | 44 × 44 | `.v2-avatar`     |
| Small   | 36 × 36 | `.v2-avatar-sm`  |

---

## 12 — Selection controls

### Method picker
Vertical list of comparable options. Radio sits on the **right**; body on the left.

### Checkbox list
Box `22 × 22`, 6px radius, 2px border `#C9CCD2`. Selected → background + border `--nh-blue-700`, white check inside.

### Destination row (radio card)
Tap target the size of a card row. Default: white card, no border. Selected: background tinted `--nh-blue-50`, no border.

---

## 13 — OTP & PIN

Six-cell entry box for SMS codes. Cell `1:1` aspect, max `56 × 56`, radius `14px`, background white. Focused cell: inset 2px ring `--nh-blue-700` + blinking 2px caret.

---

## 14 — Slider & stepper

### Term slider
Chip labels above (e.g. `6 · 12 · 24 · 36 · 48`). Track `4px`, `#E6E8EB`, with fill in `--nh-blue-700`. Thumb `22 × 22`, white fill, 2.5px `--nh-blue-700` border.

### Numeric stepper
Used for small bounded numbers (e.g. grace months). Layout: `[−]   number / label   [+]`.

---

## 15 — Timeline & step bar

### Wizard step bar
Label on the left (`3 of 5`, `12 / 600` tertiary), dots filling the rest. Dots: `4px` height, `2px` radius, `#E6E8EB`; active `--nh-blue-700`.

### Application timeline
Vertical 2px guide line in `#E6E8EB`. Node: `16 × 16` circle, 2px border, white fill. Done: filled `--nh-blue-700`. Current: blue border, white fill, 3px focus-ring shadow `rgba(12,65,154,.18)`.

---

## 16 — Document upload

One row per required document. White card row, radius `16px`, padding `14 / 16`. Icon `40 × 40`, radius `12px`. Default state: blue icon on `--nh-blue-50`, action button `Upload`. Uploaded state: green icon on `--nh-green-50`, action button `Replace`.

---

## 17 — Bottom tab bar

Four anchored destinations: **Home · Products · My Loan · More**. Background white, top border `--border-subtle`. Tab: filled glyph + label, `13.5 / 700`, `#9CA3AF` inactive, `--nh-blue-700` active.

---

## 18 — KPI card

Two-currency outstanding balance — hero of the Home screen. White card, radius `16px`, padding `10 / 12`. Two-column body with `1px` divider between USD and KHR. Amount `19 / 800` tabular, `−.025em`.

---

## 19 — Quick actions

Three-up tile row of high-frequency entry points. Never more than five. Tile: white card, radius `12px`, padding `8`. Icon `22 × 22` in black (`#111`).

---

## 20 — Product cards

**TBD** — pattern not finalized. Spec pending design decisions on imagery, MWL badge treatment, and grid density.

---

## 21 — Hero state

Centered confirmation or empty-state pattern. Disc `80 × 80`, `50%` radius. Title `22 / 800`, `−.02em`. Sub `14`, secondary, `1.5` line-height, max-width `280px`, centered.

---

## Source

Compiled from **`tokens.css`** + **`tokens-v2.css`**.
WeLoan v2 · NongHyup Finance Cambodia.
