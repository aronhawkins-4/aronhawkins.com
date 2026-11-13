export const prerender = false;

import type { APIRoute } from "astro";
// @ts-expect-error - virtual module provided by the Cloudflare adapter
import { env } from "cloudflare:workers";
import Stripe from "stripe";

export const POST: APIRoute = async ({ request, url, redirect }) => {
  const priceId = env.STRIPE_PRICE_ID ?? import.meta.env.STRIPE_PRICE_ID;
  const secretKey = env.STRIPE_SECRET_KEY ?? import.meta.env.STRIPE_SECRET_KEY;
  if (!secretKey || !priceId) {
    return Response.json(
      { error: "Payments are not configured." },
      { status: 500 },
    );
  }

  const stripe = new Stripe(secretKey);

  // Send cancelled checkouts back to the page the user came from,
  // but only if it's on this site — otherwise fall back to the homepage.
  const referer = request.headers.get("referer");
  let cancelUrl = `${url.origin}/`;
  if (referer) {
    try {
      const from = new URL(referer);
      if (from.origin === url.origin) cancelUrl = from.href;
    } catch {
      // malformed header — keep the fallback
    }
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "hosted_page",
    mode: "payment",
    billing_address_collection: "auto",
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false },
    allow_promotion_codes: true,
    submit_type: "auto",
    name_collection: {
      individual: { enabled: true },
      business: { enabled: true },
    },
    integration_identifier: "hosted_web_0001",
    origin_context: "web",
    success_url: `${url.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    line_items: [{ price: priceId, quantity: 1 }],
  });

  if (!session.url) {
    return Response.json(
      { error: "Failed to create checkout session." },
      { status: 502 },
    );
  }

  return redirect(session.url, 303);
};
