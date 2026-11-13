export const prerender = false;

import type { APIRoute } from "astro";
// @ts-expect-error - virtual module provided by the Cloudflare adapter
import { env } from "cloudflare:workers";
import Stripe from "stripe";

/**
 * Returns the customer-entered checkout fields for a paid Checkout Session so
 * the /success intake form can pre-fill them. The session ID in the success
 * URL is unguessable and only contact fields are returned (no payment data).
 */
export const GET: APIRoute = async ({ url }) => {
  const secretKey = env.STRIPE_SECRET_KEY ?? import.meta.env.STRIPE_SECRET_KEY;
  const sessionId = url.searchParams.get("session_id");
  if (!secretKey) {
    return Response.json({ error: "Payments are not configured." }, { status: 500 });
  }
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    return Response.json({ error: "Invalid session." }, { status: 400 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await new Stripe(secretKey).checkout.sessions.retrieve(sessionId);
  } catch {
    return Response.json({ error: "Session not found." }, { status: 404 });
  }
  if (session.payment_status !== "paid") {
    return Response.json({ error: "Session not paid." }, { status: 404 });
  }

  const customer = session.customer_details;
  const fullName = (customer?.individual_name ?? customer?.name ?? "").trim();
  const [firstName = "", ...rest] = fullName.split(/\s+/);

  return Response.json(
    {
      firstName,
      lastName: rest.join(" "),
      businessName: customer?.business_name ?? "",
      email: customer?.email ?? "",
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
};
