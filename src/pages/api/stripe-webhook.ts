export const prerender = false;

import type { APIRoute } from "astro";
// @ts-expect-error - virtual module provided by the Cloudflare adapter
import { env } from "cloudflare:workers";
import Stripe from "stripe";
import { Resend } from "resend";
import {
  AuditPurchaseNotificationEmail,
  type AuditPurchaseDetails,
} from "../../emails/audit-purchase-notification-email";
import { AuditKickoffEmail } from "../../emails/audit-kickoff-email";

const OWNER = "howdy@aronhawkins.com";
const FROM = "Aron Hawkins <howdy@aronhawkins.com>";

const config = (key: string): string | undefined =>
  env[key] ?? import.meta.env[key];

/**
 * Stripe webhook. On a paid website-audit checkout it emails:
 *   1. Aron, with everything the customer entered at checkout (no card data)
 *   2. the customer, with a link to the intake form on /success (carrying
 *      their session ID so it pre-fills) and the kickoff-call booking link
 *
 * Any failure returns 500 so Stripe retries; Resend idempotency keys (per
 * session) keep a retry from re-sending an email that already went out.
 */
export const POST: APIRoute = async ({ request }) => {
  const secretKey = config("STRIPE_SECRET_KEY");
  const webhookSecret = config("STRIPE_WEBHOOK_SECRET");
  const priceId = config("STRIPE_PRICE_ID");
  const resendKey = config("RESEND_API_KEY");
  if (!secretKey || !webhookSecret || !priceId || !resendKey) {
    console.error("Stripe webhook is missing required environment variables.");
    return new Response("Not configured", { status: 500 });
  }

  const stripe = new Stripe(secretKey);

  // Signature verification needs the raw, unparsed body.
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await request.text(),
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // `completed` fires for every finished checkout; delayed payment methods
  // arrive unpaid and confirm later via `async_payment_succeeded`.
  const session = event.data.object as Stripe.Checkout.Session;
  const isPaid =
    (event.type === "checkout.session.completed" &&
      session.payment_status === "paid") ||
    event.type === "checkout.session.async_payment_succeeded";
  if (!isPaid) return new Response(null, { status: 200 });

  // Only handle purchases of the site audit.
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  if (!lineItems.data.some((item) => item.price?.id === priceId)) {
    return new Response(null, { status: 200 });
  }

  const details = purchaseDetails(session);
  const resend = new Resend(resendKey);

  const ownerResult = await resend.emails.send(
    {
      from: FROM,
      to: [OWNER],
      replyTo: details.email ?? undefined,
      subject: `New site audit purchase${details.name ? ` from ${details.name}` : ""}`,
      react: AuditPurchaseNotificationEmail(details),
    },
    { idempotencyKey: `audit-owner/${session.id}` },
  );

  const clientResult = details.email
    ? await resend.emails.send(
        {
          from: FROM,
          to: [details.email],
          replyTo: OWNER,
          subject: "Next step: your site audit intake form",
          react: AuditKickoffEmail({
            firstName: (details.individualName ?? details.name)?.split(" ")[0],
            intakeUrl: `${new URL(request.url).origin}/success?session_id=${encodeURIComponent(session.id)}`,
          }),
        },
        { idempotencyKey: `audit-client/${session.id}` },
      )
    : (console.warn(`Checkout session ${session.id} has no customer email.`),
      { error: null });

  if (ownerResult.error || clientResult.error) {
    console.error("Audit purchase email failed:", {
      owner: ownerResult.error,
      client: clientResult.error,
    });
    return new Response("Email failed", { status: 500 });
  }

  return new Response(null, { status: 200 });
};

/** Customer-entered checkout fields. Card/payment method details are never included. */
function purchaseDetails(
  session: Stripe.Checkout.Session,
): AuditPurchaseDetails {
  const customer = session.customer_details;
  const address = customer?.address;

  return {
    sessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null),
    livemode: session.livemode,
    purchasedAt: new Date(session.created * 1000).toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    amount:
      session.amount_total == null
        ? "Unknown"
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: session.currency ?? "usd",
          }).format(session.amount_total / 100),
    paymentStatus: session.payment_status,
    name: customer?.name ?? null,
    individualName: customer?.individual_name ?? null,
    businessName: customer?.business_name ?? null,
    email: customer?.email ?? null,
    phone: customer?.phone ?? null,
    address: address
      ? [
          address.line1,
          address.line2,
          [address.city, address.state, address.postal_code]
            .filter(Boolean)
            .join(", "),
          address.country,
        ]
          .filter(Boolean)
          .join(", ")
      : null,
    taxIds: (customer?.tax_ids ?? []).map((t) => `${t.value} (${t.type})`),
    customFields: (session.custom_fields ?? []).map((field) => ({
      label: field.label.custom ?? field.key,
      value:
        field.text?.value ??
        field.dropdown?.value ??
        field.numeric?.value ??
        "(not provided)",
    })),
  };
}
