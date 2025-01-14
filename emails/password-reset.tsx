import { cn } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.BASE_URL
  ? `${process.env.BASE_URL}`
  : "http://localhost:3000";
const appName = process.env.APP_NAME || "Acme Inc.";

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>{appName} reset your password</Preview>
        <Body className="bg-background font-sans">
          <Container className="mx-auto pt-5 pb-12 max-w-[560px]">
            <Img
              src={`${baseUrl}/images/logo-black.png`}
              height="33"
              alt={appName}
            />
            <Section className="text-[#3c4149]">
              <Text>Hi {userFirstname},</Text>
              <Text>
                Someone recently requested a password change for your {appName}
                account. If this was you, you can set a new password here:
              </Text>
              <Button
                className={cn(
                  "px-4 py-3 text-small gap-2 rounded-medium",
                  "inline-flex items-center justify-center",
                  "rounded-md bg-blue-500 text-white"
                )}
                href={resetPasswordLink}>
                Reset password
              </Button>
              <Text>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text>
                To keep your account secure, please don&apos;t forward this
                email to anyone. See our Help Center for{" "}
                <Link className="text-blue-600" href={`${baseUrl}`}>
                  more security tips.
                </Link>
              </Text>
              <Hr className="mt-10 mb-6 border-[#dfe1e4]" />
              <Link href={`${baseUrl}`} className="text-sm text-[#b4becc]">
                {appName}
              </Link>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

ResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
