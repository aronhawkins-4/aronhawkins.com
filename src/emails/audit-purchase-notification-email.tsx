export interface AuditPurchaseDetails {
  sessionId: string;
  paymentIntentId: string | null;
  livemode: boolean;
  purchasedAt: string;
  amount: string;
  paymentStatus: string;
  name: string | null;
  individualName: string | null;
  businessName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxIds: string[];
  customFields: { label: string; value: string }[];
}

/** Internal notification sent to Aron when a site audit is purchased. */
export function AuditPurchaseNotificationEmail(details: AuditPurchaseDetails) {
  const dashboardUrl = details.paymentIntentId
    ? `https://dashboard.stripe.com/${details.livemode ? "" : "test/"}payments/${details.paymentIntentId}`
    : null;

  const rows: [string, string | null][] = [
    ["Name", details.name],
    ["Individual name", details.individualName],
    ["Business name", details.businessName],
    ["Email address", details.email],
    ["Phone", details.phone],
    ["Billing address", details.address],
    ...details.taxIds.map((id): [string, string] => ["Tax ID", id]),
    ...details.customFields.map(({ label, value }): [string, string] => [
      label,
      value,
    ]),
    ["Amount paid", details.amount],
    ["Payment status", details.paymentStatus],
    ["Purchased at", details.purchasedAt],
    ["Checkout session", details.sessionId],
  ];

  return (
    <div>
      <h1>New site audit purchase{details.livemode ? "" : " (test mode)"}</h1>
      {rows
        .filter(([, value]) => value)
        .map(([label, value]) => (
          <p key={label + value}>
            {label}: {value}
          </p>
        ))}
      {dashboardUrl && (
        <p>
          <a href={dashboardUrl}>View payment in Stripe</a>
        </p>
      )}
    </div>
  );
}
