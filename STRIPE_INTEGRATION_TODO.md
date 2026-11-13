# Stripe Integration TODO

Hosted Stripe Checkout: the endpoint creates a Checkout Session and redirects the customer to a Stripe-hosted payment page.

## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**

- [src/pages/api/create-checkout-session.ts](src/pages/api/create-checkout-session.ts)

| Field | Current Value | What to Set                                                                                                                                                                                       |
| ----- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode  | `payment`     | Set to `"payment"` for one-time charges or `"subscription"` for recurring billing. If you switch to `"subscription"`, also add `payment_method_collection: 'always'` (the Checkout Studio value). |

`url.origin` is the origin of the incoming request, so the same code works on `localhost:4321` and on `aronhawkins.com` without a `DOMAIN` env var.

## Configured Parameters

These parameters were configured in Checkout Studio and are already set correctly.

**Files containing these parameters:**

- [src/pages/api/create-checkout-session.ts](src/pages/api/create-checkout-session.ts)

| Parameter                  | Value                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| ui_mode                    | `hosted_page` (the installed `stripe` SDK is 23.1.0, which is at least 21.0.0)                            |
| billing_address_collection | `auto`                                                                                                    |
| phone_number_collection    | `{ enabled: false }`                                                                                      |
| automatic_tax              | `{ enabled: false }`                                                                                      |
| allow_promotion_codes      | `false`                                                                                                   |
| submit_type                | `auto`                                                                                                    |
| name_collection            | `{ individual: { enabled: true }, business: { enabled: true } }`                                          |
| success_url                | `/success` ([src/pages/success.astro](src/pages/success.astro)), with `?session_id={CHECKOUT_SESSION_ID}` |
| cancel_url                 | The page the customer came from (`Referer` header), only if it is on this site. Otherwise the homepage.   |
| integration_identifier     | `hosted_web_0001`                                                                                         |
| origin_context             | `web`                                                                                                     |
| payment_method_collection  | `always`. Only applies when `mode` is `"subscription"`, so it is currently omitted.                       |

## Setup

1. **Dependency.** `stripe` (v23.1.0) was added to `package.json`. Run `pnpm install` on any other machine.
2. **Secret key.**
   - Local: add `STRIPE_SECRET_KEY=sk_test_...` and `STRIPE_PRICE_ID=price_...` to `.env` (placeholders are in `.env.example`).
   - Production (Cloudflare Workers): `npx wrangler secret put STRIPE_SECRET_KEY` and `npx wrangler secret put STRIPE_PRICE_ID`.
   - It is server-only, so do **not** give it a `PUBLIC_` prefix. Get keys at https://dashboard.stripe.com/test/apikeys.
   - No publishable key is needed, because Hosted Checkout runs entirely on a server redirect.
3. **Add a button** that POSTs to the endpoint. A plain form works without JavaScript:
   ```html
   <form action="/api/create-checkout-session" method="POST">
     <button type="submit">Buy now</button>
   </form>
   ```

## New Files

```
src/pages/api/create-checkout-session.ts   # POST endpoint → creates session, 303-redirects to Stripe
STRIPE_INTEGRATION_TODO.md                 # this file
```

Also modified: `package.json` / `pnpm-lock.yaml` (stripe dependency) and `.env.example` (STRIPE_SECRET_KEY).

## How It Works

1. The customer submits a form that POSTs to `/api/create-checkout-session` (a Cloudflare Worker route, `prerender = false`, like `api/contact.ts`).
2. The endpoint calls `stripe.checkout.sessions.create(...)` and responds with a `303` redirect to `session.url`.
3. The customer pays on Stripe's hosted page.
4. Stripe redirects to `success_url` (with the session ID) or `cancel_url`.

## Testing

- Use test-mode keys (`sk_test_...`).
- Card `4242 4242 4242 4242`: succeeds. Any future expiry date, any CVC, any postal code.
- Card `4000 0025 0000 3155`: requires 3D Secure authentication.
- Card `4000 0000 0000 9995`: declined (insufficient funds).
- Full list: https://docs.stripe.com/testing

## Next Steps

- **Products/prices:** the site audit's Price ID comes from the `STRIPE_PRICE_ID` env var. If you sell more items later, pass a price or product identifier in the form and look it up server-side. Never trust a raw price sent from the client.
- **Fulfillment:** `src/pages/api/stripe-webhook.ts` handles paid checkouts for the audit and sends two emails through Resend:
  - **To howdy@aronhawkins.com:** everything the customer entered (name, business name, email, phone, billing address, tax IDs, custom fields), plus the amount and a Stripe Dashboard link. No card details.
  - **To the customer:** the kickoff-call booking link (https://cal.com/aron-hawkins/website-audit-onboarding, the `KICKOFF_URL` constant in the webhook).
  - **Setup:** in the Dashboard (https://dashboard.stripe.com/workbench/webhooks), add an endpoint at `https://aronhawkins.com/api/stripe-webhook` for the events `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Then set its signing secret: `npx wrangler secret put STRIPE_WEBHOOK_SECRET`.
  - **Local testing:** run `stripe listen --forward-to localhost:4321/api/stripe-webhook`, put the `whsec_...` it prints in `.env`, then run `stripe trigger checkout.session.completed`. Note that the triggered fixture uses a different price, so the route will skip it; a real test-mode checkout from `/website-audit` exercises the full path.
- **Order tracking:** the site has no database, so orders live in the Stripe Dashboard for now. You could send a Resend notification from the webhook, reusing the pattern in `api/contact.ts`.
- **Go live:** switch to live keys and a live `STRIPE_PRICE_ID` (`wrangler secret put` for both).

## Resources

- https://support.stripe.com
- https://docs.stripe.com/mcp
