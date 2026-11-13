# Aron Hawkins — Personal Site

Marketing site for Aron Hawkins' independent software practice (apps, sites, automation), live at
[aronhawkins.com](https://aronhawkins.com). It's built with [Astro](https://astro.build), uses React
islands for interactive parts, and is deployed to Cloudflare Workers.

## Getting started

```bash
pnpm install
cp .env.example .env   # then fill in the values below
pnpm dev               # http://localhost:4321
```

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `pnpm dev`            | Local dev server                             |
| `pnpm build`          | Production build to `./dist`                 |
| `pnpm preview`        | Preview the production build                 |
| `pnpm deploy`         | Build and deploy to Cloudflare with Wrangler |
| `pnpm email:dev`      | Preview the email templates in `src/emails`  |
| `pnpm generate-types` | Regenerate Cloudflare Worker types           |

## Environment variables

| Variable                       | Used for                                                 | Exposed to browser |
| ------------------------------ | -------------------------------------------------------- | ------------------ |
| `PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog analytics                                        | Yes                |
| `PUBLIC_POSTHOG_HOST`          | PostHog analytics                                        | Yes                |
| `RESEND_API_KEY`               | Contact form email (`/api/contact`)                      | No                 |
| `STRIPE_SECRET_KEY`            | Stripe Checkout (`/api/create-checkout-session`)         | No                 |
| `STRIPE_PRICE_ID`              | Price ID for the site audit                              | No                 |
| `STRIPE_WEBHOOK_SECRET`        | Verifies Stripe webhook requests (`/api/stripe-webhook`) | No                 |

Locally these go in `.env`. In production, set the server-only ones as Worker secrets:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_PRICE_ID
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

## Project structure

```
src/
  pages/            # one file per route; projects/[slug].astro generates case-study pages
    api/            # server routes that run on the Worker (contact form, Stripe checkout)
    llms.txt.ts     # /llms.txt, generated from the data files
  layouts/          # Layout.astro: <head>, SEO and structured data, footer, popup, site-wide scripts
  components/       # shared components; pages/ and services/ hold sections used by one page
  data/             # site content (projects, services, FAQs, testimonials, maintenance pricing)
                    # plus schema.ts, the structured-data (JSON-LD) helpers
  emails/           # React Email templates
  styles/           # global.css (design tokens) and font definitions
  assets/           # images and icons
```

## Editing content

- **Projects, services, FAQs, testimonials, and maintenance plans** live in `src/data/*.ts`. Editing
  them updates the pages, the structured data, and `/llms.txt` together.
- **Each project with a `slug`** in `projects.ts` gets its own page at `/projects/<slug>`.
- **Page-specific copy** lives in the section components under `src/components/pages/` and
  `src/components/services/`.
- **Colors and fonts** are CSS variables at the top of `src/styles/global.css`.
- **The website-audit popup** is in `src/components/Popup/Popup.astro`. Dismissals are remembered
  for the browser session; change its `storageKey` when the offer changes so everyone sees it again.

## Payments (in progress)

The "Get your site audit" button on `/website-audit` posts to `/api/create-checkout-session`, which
redirects to Stripe Hosted Checkout. After payment, customers land on `/success`, and the
`/api/stripe-webhook` route emails you the order details and emails the customer a link to book
their kickoff call. See [STRIPE_INTEGRATION_TODO.md](STRIPE_INTEGRATION_TODO.md) for setup and
going live.
