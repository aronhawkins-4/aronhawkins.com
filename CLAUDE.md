# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `pnpm` (pinned via `packageManager`).

```bash
pnpm install
pnpm dev             # dev server at http://localhost:4321
pnpm build           # production build to ./dist
pnpm preview         # preview the production build
pnpm deploy          # astro build + wrangler deploy (Cloudflare Workers)
pnpm email:dev       # React Email preview server for src/emails
pnpm generate-types  # wrangler types → worker-configuration.d.ts
```

There are no tests, linter, or formatter. `pnpm build` is the only verification step; run it after changes.

## Stack

Astro 7 with the `@astrojs/cloudflare` adapter, deployed as a Cloudflare Worker (`wrangler.jsonc`, custom domains aronhawkins.com and www). It also uses React 19 for interactive islands, `motion` for animation, `astro-icon`, `@astrojs/sitemap`, Resend for email, and PostHog for analytics.

Pages are prerendered by default. Only `src/pages/api/*` routes opt out with `export const prerender = false` and run in the Worker. Read `astro.config.mjs` before changing the adapter, images, or sessions. Its comments explain non-obvious choices:

- `imageService: 'passthrough'`: assets are pre-optimized, and the default Cloudflare image binding re-encodes them as lossless WebP and bloats them.
- `session` uses the null driver, so no KV namespace is needed.
- `vite-plugin-svgr`: import `*.svg?react` to get a React component. A plain `.svg` import in `.astro` files gives an Astro component.

Path aliases are defined in `tsconfig.json`: `@/*` → `src/*`, `@components/*` → `src/components/*`, `@public/*` → `public/*`.

## Architecture

**Routes** (`src/pages`):

- Multi-page site: home, about, work, contact, the service pages (`apps`, `sites`, `automation`), `website-audit`, and `404`.
- `projects/[slug].astro` generates a page per entry in `projects.ts` that has a `slug`.
- `llms.txt.ts` builds `/llms.txt` at build time from the data files, so it never needs hand-editing.

**Layout** (`src/layouts/Layout.astro`) is shared by every page and owns:

- All `<head>` meta: OG/Twitter tags, canonical URL, favicon, and PostHog.
- The JSON-LD graph (see SEO below).
- `<Popup />` and `<Footer />`.
- The site-wide client `<script>`: sticky header, mobile nav, and `motion` entrance animations. Elements with `.reveal`, `.reveal-on-load`, or `.reveal-stagger` animate in. Add new global client behavior there.

Pages render their own `<Header />`. Layout props are `title`, `description`, `imageSrc` (root-relative, resolved to absolute for OG), `noindex`, `pageType`, `mainEntity`, and `schema`.

**Components**:

- `components/pages/<Page>/` and `components/services/<Service>/` hold sections used by a single page.
- Top-level folders (`FAQ`, `ProjectsCarousel`, `TestimonialCarousel`, …) are shared. React ones (`.tsx` plus their own `.css`) are mounted with `client:load` or `client:visible`.
- Components use scoped `<style>` blocks.

**Content is data-driven.** Copy lives in typed arrays in `src/data/`: `projects`, `services`, `faqs`, `testimonials`, and `maintenance`. Edit content there, not in components. The same data feeds the pages, the JSON-LD, and `/llms.txt`.

**SEO / structured data** is centralized in `src/data/schema.ts`:

- `coreGraph()` produces the Person, practice, and site nodes that every indexed page emits.
- Page helpers include `webPage`, `breadcrumb`, `faqPage`, `serviceNode`/`serviceList`, and `projectNode`/`projectList`.
- Nodes reference each other by stable `@id`s from `ID`.
- Always build URLs with `abs()`. It normalizes trailing slashes so `@id`s match between dev (`/apps`) and the production build (`/apps/`).
- Pages pass route-specific nodes through Layout's `schema` prop.
- `Schema.astro` escapes `<` because some fields contain authored HTML.

**Styling:** design tokens (colors, fonts, max width, easing) are CSS custom properties in `:root` of `src/styles/global.css`. The theme is dark brown/cream/terracotta, with General Sans for headings and JetBrains Mono for body text. Use the variables rather than hardcoded values.

## Server routes and env

API routes read secrets with `env.X ?? import.meta.env.X`:

- `env` comes from `import { env } from 'cloudflare:workers'` and needs a `@ts-expect-error`.
- `import.meta.env` is the local `.env` fallback.

Production secrets are set with `wrangler secret put`. Browser-exposed vars use the `PUBLIC_` prefix (PostHog). Server-only vars don't (`RESEND_API_KEY`, `STRIPE_SECRET_KEY`). Keep `.env.example` in sync.

- `api/contact.ts` validates the JSON body from `ContactForm.astro` and sends it with Resend, using the React Email template in `src/emails/`. On success the form fires a PostHog `contact_form_submitted` event.
- `api/create-checkout-session.ts` is the Stripe Hosted Checkout endpoint for the site audit (`STRIPE_PRICE_ID`). It is posted to by a plain form in `SiteAudit/Hero.astro` and returns customers to `/success`, or to the page they came from if they cancel. `STRIPE_INTEGRATION_TODO.md` tracks the Stripe setup.
- `api/stripe-webhook.ts` verifies the Stripe signature. On a paid checkout for `STRIPE_PRICE_ID`, it sends two Resend emails: an order notification to the owner and a customer email whose button links to the `/success` intake form with their `session_id`, plus the kickoff-call booking link (`KICKOFF_URL`). Templates are in `src/emails/`. It returns 500 on failure so Stripe retries, and per-session Resend idempotency keys prevent duplicate emails.

- `/success` has an audit intake form. It pre-fills name, business, and email from `api/checkout-details.ts`, which looks up the paid Checkout Session using the `session_id` in the success URL. It posts to `api/audit-intake.ts`, which rejects submissions without a paid audit session (403) and emails the owner with Resend (`src/emails/audit-intake-email.tsx`).

## Other notes

- `Popup.astro` is a `<dialog>` that promotes the site audit. Dismissal is stored in `sessionStorage` under `storageKey`; bump the key when the offer changes. It is rendered from Layout, except on the paths in `NO_POPUP_PATHS` (`/site-audit`, `/success`).
