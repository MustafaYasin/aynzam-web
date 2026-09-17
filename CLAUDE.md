# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AynzamAI marketing website — a static multi-page site for an applied-AI platform for the construction industry (Baubranche: planning, tendering, technical documentation, handover, operations; TGA is one focus among several). Built with Webpack 5, Alpine.js, and Tailwind CSS 4.

**Positioning rules:** no prices anywhere on the site (terms are on request, every CTA leads to a Calendly call). Do not over-focus copy on Funktionsbeschreibungen or on a single pilot customer such as PowerCo; the site must make clear the company operates across the construction industry, details are discussed in a call.

## Commands

- **Dev server:** `npm start` (runs on http://localhost:3000, auto-opens browser)
- **Production build:** `npm run build` (outputs to `./build/`)
- **Lint:** `npm run lint` (runs Biome check with auto-fix on `src/`)
- **Format:** `npm run format` (runs Biome format on `src/`)

## Architecture

### Build Pipeline

Webpack 5 bundles everything from `src/` into `build/`. Key details:
- **Entry point:** `src/js/index.js` — imports CSS and translations, registers the `rail` Alpine component, starts Alpine, then wires active-nav detection, scroll reveal and the statement word reveal
- **HTML processing:** A custom webpack preprocessor resolves `<include src="./partials/header.html" />` tags, enabling reusable HTML partials (header, footer, fonts, lang-init)
- **CSS:** PostCSS processes Tailwind CSS 4; `MiniCssExtractPlugin` outputs a single `style.css`
- **JS:** Babel transpiles ES6+; outputs a single `bundle.js`
- **All HTML files** in `src/*.html` are auto-discovered via glob and each generates an `HtmlWebpackPlugin` instance

### Design System (wonderful.ai-inspired, light only)

The site follows a monochrome editorial look modelled on wonderful.ai: near-black on white, a silver-gradient hero, light-weight (300) grotesque display type with tight tracking, pill buttons, and a single warm accent (`--accent`, orange) used only for tiny marks. **There is no dark mode.** Tokens live in `:root` in `src/css/style.css` (`--ink*`, `--paper*`, `--night`, `--accent`, `--line*`).

- **Fonts:** Inter (300–600) for everything, IBM Plex Mono for small labels. Loaded via `src/partials/fonts.html`.
- **Landing page structure (mirrors wonderful.ai):** announcement bar + fixed header → full-viewport silver hero (headline bottom-left, deck + two pill buttons bottom-right) → logo wall → horizontal story-card rail → scroll-driven word-reveal statement → dark "platform" stage with dot field and floating labels → two pillar cards → industries with tab pills and one large art card → blurred colour "company" block with two link cards → black final CTA band → black footer with giant faded wordmark.
- **Art backgrounds:** no photography; `.art-carbon`, `.art-silver`, `.art-graphite`, `.art-ember`, `.art-steel`, `.art-mist` are CSS-gradient stand-ins used on cards, pillars, industry cards and page banners.
- **Header:** `.site-header` gets `.is-stuck` after 24px scroll (white blur bar, announcement bar hides). On pages whose `<body data-hero="silver">`, it also gets `.on-hero` so wordmark/nav/pills render white while over the hero.
- **Motion:** `.reveal` blur-in on intersection (added by JS only), `.statement .w` word reveal driven by scroll progress, `.animate-fade-up` for hero. All motion respects `prefers-reduced-motion`.

### Tailwind CSS 4 Custom Utilities

`@utility` definitions in `src/css/style.css`: `container`, `container-narrow`, typography (`display-xl/lg/md/sm`, `statement`, `lead`, `body-md/sm/xs`, `mono-sm`, `eyebrow`), buttons (`btn`, `btn-sm`, `btn-lg`, `btn-primary`, `btn-white`, `btn-outline`, `btn-outline-white`, `text-link`, `icon-btn`), `announce`, `wordmark`, `nav-link`, `hero-silver`, `on-dark`.

Plain component classes (header, cards, rail, stage backgrounds, footer, motion) are wrapped in `@layer components` so Tailwind utilities such as `lg:hidden` can override them. **Every `<body>` must carry `x-data`** (Alpine only initialises trees rooted at an `x-data` element; without it `x-text` outside the header stays empty).

### Key Libraries

- **Alpine.js** (with `@alpinejs/persist`) — reactive UI state (language toggle, mobile menu, sticky header, card rail, industry tabs)
- Swiper, WOW.js and FSLightbox are still in `package.json` but no longer imported.

### External Integrations

- **Calendly** — booking widget loaded via CDN
- **Google Fonts** — Inter + IBM Plex Mono

### Pages

7 HTML pages in `src/`: index (landing), about, blog-grid, blog-single, signin, signup, 404. There is deliberately no pricing page. Each uses `<include>` tags for shared partials (`header`, `footer`, `fonts`, `lang-init`).

### Favicon

The favicon (`src/images/favicon.svg`) should stay in sync with the wordmark. The wordmark is now plain text (`aynzam` medium + `AI` light) in near-black; when it changes, update the favicon SVG.

### Internationalization (i18n)

German is the default language; English is shown to users with English browser settings. Managed via Alpine.js global store (`src/js/language.js`), as a global store:

- **Translation files:** `src/js/translations/de.js` and `src/js/translations/en.js` — assign to `window.__translations_de` / `window.__translations_en`. Organized by section (header, hero, features, pricing, etc.) with dot-notation keys.
- **Language store:** `Alpine.store('lang')` with `current`, `toggle()`, `t(key)` methods. Reads `localStorage('language')`, falls back to `navigator.language`, defaults to `'de'`.
- **Lang init:** `src/partials/lang-init.html` — inline `<script>` in `<head>` that detects language from localStorage / navigator.language before first paint and sets `<html lang>` + `window.__lang`.
- **HTML pattern:** No hardcoded text in HTML. All visible text comes from translation files via `x-text="$store.lang.t('section.key')"`. Elements are empty in HTML — Alpine fills them on init.
- **Language toggle:** DE/EN pill in the header (shows the current language).
- **Adding new strings:** Add the key to both `de.js` and `en.js`, then use `x-text="$store.lang.t('section.key')"` on the element.

### Color Tokens

Use the CSS custom properties from `:root` in `src/css/style.css` (`--ink`, `--ink-2/3/4`, `--paper`, `--paper-2/3/4`, `--night`, `--accent`, `--line`, `--line-strong`, `--line-inverse`) instead of raw colour values. Never add emojis; do not reintroduce a dark mode.
