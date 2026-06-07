# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This repo has a `pnpm-lock.yaml`, so prefer `pnpm` (the README's `npm` commands also work).

```bash
pnpm install
pnpm dev      # dev server at http://localhost:4321
pnpm build    # production build to ./dist
pnpm preview  # preview the production build
```

There are no tests, linter, or formatter configured. Requires Node 18.17.1+ (or 20+).

## Architecture

A single-page static marketing site built with Astro 4. The entire site is one route:
`src/pages/index.astro`, which imports `Layout.astro` and stacks the section components in order
(Header, Hero, Services, Work, About, CtaBand, Contact, Footer). There is no router, no SSR, no
backend — output is fully static.

Three layers worth understanding before editing:

- **Design system lives entirely in `src/styles/global.css`.** All colors, fonts, spacing, and the
  dark earth/terracotta theme are CSS custom properties in `:root` at the top of that file. Components
  reference these variables rather than hardcoding values — retheming means changing a handful of
  vars, not touching components. `global.css` is imported once via `Layout.astro`.

- **Content is data-driven for two sections.** Services and Work render from typed arrays in
  `src/data/services.ts` and `src/data/projects.ts` (each exports an interface + array). Edit copy
  there, not in the components. Other sections hold their copy inline in their `.astro` files.

- **All client behavior is one inline `<script>` at the bottom of `src/pages/index.astro`.** Sticky
  header, mobile nav toggle, `IntersectionObserver` scroll-reveal (elements with class `reveal` get
  `.in`), the booking-button fallback, and the contact-form submit handler all live there. There is
  no separate JS bundle or framework — adding interactivity means extending this script.

## Pre-launch placeholders (intentionally non-functional)

Several things are deliberate stubs the README's "Before you launch" section tracks. Be aware before
treating them as bugs:

- **Booking URL** is unset. The nav/CTA buttons carry `data-booking` and `href="#"`; the inline script
  intercepts clicks and shows an alert until a real Calendly/Cal.com URL is set in `CtaBand.astro`.
- **Contact form** does no network call — submit just hides the button and shows a confirmation. Wire
  it to Formspree/Resend/etc. in the inline script in `index.astro`.
- **`Portrait.astro` and `Scene.astro`** are placeholder components for photos and project thumbnails.
