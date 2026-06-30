# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Offline-first, installable **PWA** — the field reference guide for volunteers of the
*Comités Communaux Feux de Forêts* (CCFF) of the Hérault (34). UI and all content are in
**French**. Content is transcribed from the printed brochure *« Guide pratique du Bénévole
CCFF »*, **Mars 2015 edition** ("37 CCFF en 2015"); the original scans live in `Guide/`
(provenance) and the *À propos* page carries a "verify currency" disclaimer. Treat the scans
as the source of truth when editing content (numbers, dates, acronyms must match) — **except
where current field feedback supersedes the 2015 brochure.** Precedent: `largage.ts` lists the
**Thrush 710T** (1 500 L), which replaced the *Air Tractor 802 F* still shown in the scan. Such
currency updates are intentional — don't "correct" them back to match the scan.

## Commands

```bash
npm install
npm run dev      # Vite dev server → http://localhost:5173/ccff-guide-web/ (no service worker)
npm run build    # tsc -b (typecheck) + vite build → dist/
npm run preview  # serve the build at :4173 — service worker active; use this to test PWA/offline
npm run generate-pwa-assets   # regenerate icons from public/logo.svg into public/ (then commit)
```

There is **no test suite and no separate lint step** — type-checking is the gate: `tsc -b`
(standalone `npx tsc -b`, or via `npm run build`). Dev (5173) and preview (4173) are different
origins, so the preview's service worker never shadows the dev server.

Stack: Vite 8 · React 19 · TypeScript 6 (strict) · react-router 7 (HashRouter) ·
vite-plugin-pwa (Workbox) · Fuse.js. Plain CSS — no UI framework, no CSS-in-JS.

## Architecture

### Content is data, not markup
`src/content/*.ts` is the single typed source of truth; route pages (`src/routes/*.tsx`) are
thin renderers over it.
- **`sections.ts`** — the route registry (`SECTIONS`). Each entry drives the Home grid tile,
  the header title (`titleForPath`), and search. `TILE_SECTIONS` is the Home grid.
- **`searchIndex.ts`** — flattens content (sections + glossary acronyms + risk levels +
  aircraft + phone numbers) into one list the `Recherche` page feeds to Fuse.js.
- Data: `contacts.ts` (tel: numbers), `risques.ts` (6 risk levels), `alphabet.ts` (phonetic +
  digits), `glossaire.ts`, `emploiDuFeu.ts` (fire-use calendar), `largage.ts` (air-drop).

**To add a section:** add an entry to `SECTIONS` + a `<Route>` and import in `App.tsx` + a page
in `src/routes/`. It then appears on Home and in search automatically. Add new searchable
content types to `searchIndex.ts`.

### Routing
`HashRouter` (so deep links work on GitHub Pages and offline). All routes are nested under the
`AppShell` layout route in `App.tsx`; unknown paths redirect to `/`.

### App shell layout — do NOT reintroduce `position: fixed`
`AppShell` is a fixed-height flex column: `html, body, #root { height: 100% }` →
`.app { height:100%; display:flex; flex-direction:column; overflow:hidden }`, with `.main`
scrolling internally (`flex:1; min-height:0; overflow-y:auto`) and `.nav` as a normal in-flow
flex child. This is deliberate: it avoids iOS Safari's `position: fixed` bottom-bar drift after
keyboard dismissal and viewport-unit gaps. Route-change scroll-reset targets the `.main`
element, not `window`.

### Styling & theming (`src/styles/`, imported in `main.tsx`)
- **`theme.css`** — design tokens as CSS variables (brand + the 6 risk-scale colors, spacing,
  type, `--safe-*` from `env(safe-area-inset-*)`, layout sizes). Font sizes are
  `calc(... * var(--text-scale))` so the display-settings text-size control scales all type;
  `:root[data-text=…]` / `:root[data-contrast=…]` (set by `lib/settings.ts`) override tokens.
- **`global.css`** — reset + every component/page rule (BEM-ish class names). Element resets
  (`a`, `button`) are wrapped in `:where(…)` so component classes win without specificity fights.
- **Colors go through tokens — no raw hex in `global.css`.** All palette/semantic colors live in
  `theme.css`: neutrals, `--text-secondary`, `--text-on-color` (text on brand surfaces), `--map-*`,
  and brand tint companions (`--c-red-100`, `--c-amber-{50,100,800}`, `--c-blue-{100,800}`, …).
  When adding a color token that should vary by theme, **also add its `:root[data-contrast="high"]`
  override** so high-contrast mode stays complete (it was previously incomplete because callout
  colors were hard-coded).
- **Shared card chrome is one grouped selector** at the top of the cards block
  (`background: var(--surface); border: 1px solid var(--border)` for `.tile, .step, .callout, …`);
  each card rule adds only its radius/shadow/padding, and accent variants override background/border
  afterwards. Don't re-inline surface+border on a new card — add it to the group.

### PWA
- **vite-plugin-pwa** (`generateSW`, `registerType: 'autoUpdate'`) in `vite.config.ts`. Workbox
  precaches the whole shell **and** `public/maps/*` → fully usable offline after first load.
- **Icons** are generated from `public/logo.svg` by `@vite-pwa/assets-generator`
  (`pwa-assets.config.ts`) into `public/` and **committed**; `pwaAssets: { config: true }`
  injects them into the manifest at build. If `logo.svg` changes, re-run
  `npm run generate-pwa-assets` and commit the regenerated files.
- **SW registration + update prompt** live in `components/UpdateToast.tsx` (`useRegisterSW`).
  It re-checks for updates hourly and on `visibilitychange`, so installed PWAs pick up new
  versions without a manual relaunch.
- **`lib/install.ts`** captures `beforeinstallprompt` at startup (side-effect import in
  `main.tsx`) for the one-tap install on the `Installer` page (iOS has no API → manual steps).
- **`lib/settings.ts`** persists display prefs (text size, contrast) and applies them to
  `<html>` data-attributes before first paint (side-effect import in `main.tsx`).
- **Manifest** (`vite.config.ts`) sets `id` and app `shortcuts` (Urgence / Ma position /
  Recherche). Shortcut `url`s must carry the HashRouter fragment (`` `${base}#/route` ``) to
  deep-link; `id` tracks `base` so it stays valid for both the Pages subpath and root deploys.

### Base path & assets
`vite.config.ts` sets `base: '/ccff-guide-web/'`, overridable via the `BASE_PATH` env var (used
for root deploys `BASE_PATH=/ npm run build` and per-PR preview subpaths). HashRouter makes
routing base-agnostic — only assets/manifest depend on `base`. **Reference files in `public/`
via the `asset()` helper (`src/lib/asset.ts`)**, which prefixes `import.meta.env.BASE_URL`;
never hard-code `/…` paths (they break under the preview subpath). Maps load via `asset('maps/…')`.

## Deployment & PR previews

Both production and previews live on the **`gh-pages`** branch (Pages serves one source).
- **`.github/workflows/deploy.yml`** — on push to `main`, builds and publishes to `gh-pages`
  **root** (`clean-exclude: pr-preview/`). Production: `https://aureltyson.github.io/ccff-guide-web/`.
- **`.github/workflows/preview.yml`** — on each PR, builds with
  `BASE_PATH=/ccff-guide-web/pr-preview/pr-<N>/` and deploys to `pr-preview/pr-<N>/`
  (`rossjrw/pr-preview-action`), comments the link, and removes it on PR close.
- Pages source is **Deploy from a branch → `gh-pages` → `/ (root)`**. `public/.nojekyll` stops
  Pages from processing the build.

**iOS standalone safe-area behavior** (status-bar / home-indicator insets) **cannot be
reproduced in Safari or headless Chrome** — verify such changes on a real device via the PR
preview (Add to Home Screen). For local checks, simulate insets by overriding `--safe-top` /
`--safe-bottom`. The bottom nav caps the home-indicator inset to a slim clearance:
`padding-bottom: min(var(--safe-bottom), 4px)`. Installed-PWA features (manifest `shortcuts`
long-press menu, install-prompt UI) likewise can't be confirmed headless.

**Verifying visual / CSS changes.** No test suite, and `tsc` won't catch visual regressions.
The practical tool is headless Chrome (`--headless=new --screenshot --virtual-time-budget=4000`)
+ `sharp`: render routes for review, and **pixel-diff a refactor branch against the `main`
baseline** to prove "no visual change" — a pure token/dedup refactor should diff ~0%.
**Caveat:** headless `--window-size` does *not* set the CSS viewport, so `min-width` media
queries can match a width wider than the window — narrow-viewport shots show phantom horizontal
overflow / clipped content that doesn't exist on a real phone. Pixel-diffing at a *fixed* size is
reliable; judging responsive fit/breakpoints from headless shots is not (use a real device, or
CDP device-emulation, e.g. Playwright).

## Conventions

- **TypeScript is strict** with `verbatimModuleSyntax` + `erasableSyntaxOnly` +
  `noUnusedLocals/Parameters`: use `import type` for type-only imports, and only type syntax
  that erases (no enums / namespaces / parameter properties / decorators).
- French throughout (copy; comments mix FR/EN). Keep brochure terminology and emergency numbers
  (18 / 112 / 17) exact.
