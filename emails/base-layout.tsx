import React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Font,
  Section,
  Text,
} from "@react-email/components";
import { ReactNode } from "react";

export const baseUrl = process.env.BASE_URL
  ? `${process.env.BASE_URL}`
  : "http://localhost:3000";
export const appName = "GNDC";

const baseStyles = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  backgroundColor: "#ffffff",
  color: "#1f2937",
};

const containerStyles = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

export const headerStyles = {
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "20px",
  marginBottom: "30px",
};

const footerStyles = {
  borderTop: "1px solid #e5e7eb",
  paddingTop: "20px",
  marginTop: "40px",
  fontSize: "12px",
  color: "#6b7280",
};
export const LayoutEmail = ({
  children,
  title,
  preview,
}: {
  title: string;
  preview?: string;
  children: ReactNode;
}) => (
  <Html>
    <Head>
      <Font
        fontFamily="inter"
        fallbackFontFamily={"sans-serif"}
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>{preview || title}</Preview>
    <Tailwind>
      <Body style={baseStyles}>
        <Container style={containerStyles}>
          <Section style={headerStyles}>
            <Img
              src={`https://gndc.tech/ogdata/logo.png`}
              width="117"
              height="47"
              alt="Logo"
            />
          </Section>
          {children}
          <Section style={footerStyles}>
            <Text>
              © {new Date().getFullYear()} {appName}. All rights reserved.
              <Link href="#" style={{ color: "#dc2626" }}>
                {" "}
                Se désabonner
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default LayoutEmail;
