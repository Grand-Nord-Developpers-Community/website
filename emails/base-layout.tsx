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
      <Body className="bg-gray-50 font-inter">
        <Container className="mx-auto py-12 px-4 max-w-[600px]">
          {/* Header */}
          <Section className="bg-white rounded-t-2xl border border-gray-200 border-b-0 px-8 py-6">
            <div className="flex items-center justify-center">
              <Img
                height={48}
                src={`${baseUrl}/ogdata/logo.png`}
                alt={appName}
                className="mx-auto"
              />
            </div>
          </Section>

          {/* Content */}
          <Section className="bg-white border-l border-r border-gray-200 px-8 py-8">
            {children}
          </Section>

          {/* Footer */}
          <Section className="bg-gray-100 rounded-b-2xl border border-gray-200 border-t-0 px-8 py-6 text-center">
            <Text className="text-sm text-gray-600 mb-4">
              Sent with ❤️ from the {appName} team
            </Text>
            <Link
              href={`${baseUrl}`}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Visit {appName}
            </Link>
            <Hr className="my-4 border-gray-300" />
            <Text className="text-xs text-gray-500">
              © {new Date().getFullYear()} {appName}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default LayoutEmail;
