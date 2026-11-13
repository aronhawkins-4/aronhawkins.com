import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

interface AuditKickoffEmailProps {
  /** Customer's first name, if known. */
  firstName?: string | null;
  /** Link to the intake form on /success, carrying the Checkout Session ID. */
  intakeUrl: string;
}

const LOGO_URL = "https://aronhawkins.com/images/Brand_Icon-07.png";
const SITE_URL = "https://aronhawkins.com";

const font = "Inter,system-ui,Arial,sans-serif";
const muted = "rgb(123,125,129)";

/**
 * Sent to the customer after a site audit purchase, asking them to book the
 * kickoff call. Adapted from React Email's "Barebones" template.
 */
export function AuditKickoffEmail({
  firstName,
  intakeUrl,
}: AuditKickoffEmailProps) {
  const preview = "Fill out your site audit intake form";

  return (
    <Html dir="ltr" lang="en">
      <Head>
        <meta name="x-apple-disable-message-reformatting" />
        <title>{preview}</title>
        {[400, 500, 600].map((weight) => (
          <Font
            key={weight}
            fontFamily="Inter"
            fallbackFontFamily="Arial"
            webFont={{
              url:
                weight === 400
                  ? "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf"
                  : weight === 500
                    ? "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf"
                    : "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
              format: "truetype",
            }}
            fontWeight={weight}
            fontStyle="normal"
          />
        ))}
        <style>{`@media (max-width:600px){.mobile_mt-0{margin-top:0!important}.mobile_px-2{padding-right:0.5rem!important;padding-left:0.5rem!important}.mobile_px-6{padding-right:1.5rem!important;padding-left:1.5rem!important}.mobile_py-12{padding-bottom:3rem!important;padding-top:3rem!important}}`}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: "rgb(255,255,255)",
          margin: 0,
          fontFamily: font,
          textAlign: "center",
        }}
      >
        <Container
          className="mobile_mt-0"
          style={{
            maxWidth: "640px",
            marginTop: "2rem",
            width: "100%",
            backgroundColor: "rgb(255,255,255)",
          }}
        >
          <Section className="mobile_px-2" style={{ padding: "1rem 1.5rem" }}>
            {/* Main card */}
            <Section
              style={{
                backgroundColor: "rgb(243,244,246)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Row>
                <Column
                  className="mobile_px-6 mobile_py-12"
                  style={{ padding: "64px 40px" }}
                >
                  <Img
                    src={LOGO_URL}
                    alt="Aron Hawkins"
                    width="64"
                    style={{ margin: "0 auto 1.25rem" }}
                  />
                  <Heading
                    as="h1"
                    style={{
                      fontSize: "28px",
                      fontWeight: 600,
                      letterSpacing: "-0.084px",
                      lineHeight: 1.3,
                      color: "rgb(52,45,39)",
                      margin: "0 0 0.75rem",
                    }}
                  >
                    Let&apos;s get started on your site audit
                  </Heading>
                  <Text
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.5,
                      color: "rgb(67,69,75)",
                      margin: "0 auto 2rem",
                      maxWidth: "420px",
                      textAlign: "center",
                    }}
                  >
                    Thank you for purchasing a site audit
                    {firstName ? `, ${firstName}` : ""}!
                    <br />
                    <br />
                    The first step is a short kickoff form. Share your
                    site&apos;s URL and any problem points you&apos;re already
                    aware of. After that, I can get started!
                  </Text>
                  <Button
                    href={intakeUrl}
                    style={{
                      backgroundColor: "rgb(196,63,48)",
                      color: "rgb(255,255,255)",
                      fontSize: "18px",
                      lineHeight: "1rem",
                      borderRadius: "4rem",
                      padding: "14px 26px",
                      textDecoration: "none",
                    }}
                  >
                    Fill out kickoff form
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* Footer */}
            <Section style={{ padding: "2.5rem 1.5rem", textAlign: "center" }}>
              <Text
                style={{
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color: muted,
                  margin: "0 auto 0.5rem",
                  maxWidth: "320px",
                }}
              >
                Apps • Sites • Automation
              </Text>
              <Text
                style={{
                  fontSize: "11px",
                  lineHeight: 1.5,
                  color: muted,
                  margin: 0,
                }}
              >
                <Link
                  href={SITE_URL}
                  style={{ color: muted, textDecoration: "none" }}
                >
                  aronhawkins.com
                </Link>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

AuditKickoffEmail.PreviewProps = {
  firstName: "Jane",
  intakeUrl: "https://aronhawkins.com/success?session_id=cs_test_123",
} satisfies AuditKickoffEmailProps;

export default AuditKickoffEmail;
