export interface AuditIntakeDetails {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  website: string;
  message: string;
  sessionId: string;
}

/** Internal notification sent to Aron when a customer submits the audit intake form. */
export function AuditIntakeEmail(details: AuditIntakeDetails) {
  const rows: [string, string][] = [
    ["Name", `${details.firstName} ${details.lastName}`],
    ["Business name", details.businessName],
    ["Email address", details.email],
    ["Website URL", details.website],
    ["Message", details.message],
    ["Checkout session", details.sessionId],
  ];

  return (
    <div>
      <h1>New site audit intake form</h1>
      {rows
        .filter(([, value]) => value)
        .map(([label, value]) => (
          <p key={label}>
            {label}: {value}
          </p>
        ))}
    </div>
  );
}
