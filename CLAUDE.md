# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AynzamAI marketing website — a static multi-page site for an Enterprise Knowledge Intelligence platform. Built with Webpack 5, Alpine.js, and Tailwind CSS 4.

## Commands

- **Dev server:** `npm start` (runs on http://localhost:3000, auto-opens browser)
- **Production build:** `npm run build` (outputs to `./build/`)
- **Lint:** `npm run lint` (runs Biome check with auto-fix on `src/`)
- **Format:** `npm run format` (runs Biome format on `src/`)

## Architecture

### Build Pipeline

Webpack 5 bundles everything from `src/` into `build/`. Key details:
- **Entry point:** `src/js/index.js` — imports CSS, initializes Alpine.js, sets up scroll-based active nav detection
- **HTML processing:** A custom webpack preprocessor resolves `<include src="./partials/header.html" />` tags, enabling reusable HTML partials (header, footer, scrolltop)
- **CSS:** PostCSS processes Tailwind CSS 4; `MiniCssExtractPlugin` outputs a single `style.css`
- **JS:** Babel transpiles ES6+; outputs a single `bundle.js`
- **All HTML files** in `src/*.html` are auto-discovered via glob and each generates an `HtmlWebpackPlugin` instance

### Dark Mode

Managed via Alpine.js global store (`src/js/theme.js`):
- Toggles `.dark` class on `<html>` element
- Persisted to `localStorage` key `"theme"`, falls back to `prefers-color-scheme`
- CSS uses custom properties defined in `:root` and `:root.dark` blocks in `src/css/style.css`
- Dark mode variant: `@custom-variant dark (&:is(.dark *));`
- **Gradient mesh background:** Dark mode uses a fixed multi-radial gradient on `body` (`.dark body` rule) that transitions from muted purple (top-left) through dusty blue (top-right) to warm amber (bottom-right). The dark mode CSS variables use semi-transparent rgba values (`--bg-primary`, `--bg-surface`) so the gradient shows through page sections and cards, creating depth. The solid base color (`#181325`, warm dark purple) is set on `:root.dark` as `background-color` for html. When changing the dark mode color scheme, update both the gradient blobs in `.dark body` and the CSS variables together.

### Tailwind CSS 4 Custom Utilities

All defined in `src/css/style.css` using `@utility` syntax:
- Layout: `container`
- Effects: `glass`, `glass-hover`, `glow-orb`, `grid-bg`, `shimmer`
- Buttons: `btn-primary`, `btn-outline`
- Text: `text-gradient-hero`, `text-gradient-subtle`
- Cards: `card-premium`, `card-premium-hover`
- Nav: `nav-link`, `active-nav-link`

### Key Libraries

- **Alpine.js** (with `@alpinejs/persist`) — reactive UI state (theme toggle, mobile menu, sticky header)
- **Swiper** — carousels/sliders
- **WOW.js** — scroll-triggered animations (paired with `src/css/animate.css`)
- **FSLightbox** — image lightbox galleries

### External Integrations

- **Calendly** — booking widget loaded via CDN
- **Google Fonts** — DM Sans font family

### Pages

8 HTML pages in `src/`: index (landing), about, pricing, blog-grid, blog-single, signin, signup, 404. Each uses `<include>` tags for shared partials.

### Favicon

The favicon (`src/images/favicon.svg`) must match the site logo (purple rounded square with white lightning bolt). Whenever the logo design or brand color changes, update the favicon SVG to stay in sync.

### Semantic Color System

Colors are defined as CSS custom properties (not hardcoded) to support dark mode. Use the semantic variables (`--bg-primary`, `--text-primary`, `--brand-color`, etc.) rather than raw color values. See the `:root` / `:root.dark` blocks in `src/css/style.css` for the full palette.
