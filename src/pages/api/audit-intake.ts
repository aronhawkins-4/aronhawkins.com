export const prerender = false;

import type { APIRoute } from "astro";
// @ts-expect-error - virtual module provided by the Cloudflare adapter
import { env } from "cloudflare:workers";
import { Resend } from "resend";
import Stripe from "stripe";
import { AuditIntakeEmail } from "../../emails/audit-intake-email";

const TO = "howdy@aronhawkins.com";
const FROM = "Site Audit <howdy@aronhawkins.com>";

const str = (value: unknown, max = 5000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export const POST: APIRoute = async ({ request }) => {
  const apiKey = env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  const stripeKey = env.STRIPE_SECRET_KEY ?? import.meta.env.STRIPE_SECRET_KEY;
  const priceId = env.STRIPE_PRICE_ID ?? import.meta.env.STRIPE_PRICE_ID;
  if (!apiKey || !stripeKey || !priceId) {
    return Response.json(
      { error: "Service is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const details = {
    firstName: str(body.firstName, 200),
    lastName: str(body.lastName, 200),
    businessName: str(body.businessName, 200),
    email: str(body.email, 320),
    website: str(body.website, 2000),
    message: str(body.message),
    sessionId: str(body.sessionId, 200),
  };

  if (
    !details.firstName ||
    !details.lastName ||
    !details.email.includes("@") ||
    !details.website
  ) {
    return Response.json(
      { error: "First name, last name, email, and website URL are required." },
      { status: 400 },
    );
  }

  // Only accept submissions tied to a paid site audit checkout.
  if (!/^cs_[A-Za-z0-9_]+$/.test(details.sessionId)) {
    return Response.json(
      { error: "A valid purchase is required." },
      { status: 403 },
    );
  }
  try {
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.retrieve(details.sessionId, {
      expand: ["line_items"],
    });
    const isAudit = session.line_items?.data.some(
      (item) => item.price?.id === priceId,
    );
    if (session.payment_status !== "paid" || !isAudit) {
      return Response.json(
        { error: "A valid purchase is required." },
        { status: 403 },
      );
    }
  } catch {
    return Response.json(
      { error: "A valid purchase is required." },
      { status: 403 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: details.email,
    subject: `Site audit intake: ${details.website}`,
    react: AuditIntakeEmail(details),
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send form." }, { status: 502 });
  }

  return Response.json({ ok: true });
};
