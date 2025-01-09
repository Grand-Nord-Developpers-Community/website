import { cn } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
//import config from "../tailwind.config";

interface LoginCodeEmailProps {
  validationCode?: string;
}

const baseUrl = process.env.BASE_URL
  ? `${process.env.BASE_URL}`
  : "http://localhost:3000";
const appName = process.env.APP_NAME || "Acme Inc.";

export const LoginCodeEmail = ({ validationCode }: LoginCodeEmailProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Your login code for {appName}</Preview>
      <Body className="bg-background font-sans">
        <Container className="mx-auto pt-5 pb-12 max-w-[560px]">
          <Img
            height={40}
            src={`${baseUrl}/images/logo-black.png`}
            alt={appName}
          />
          <Heading className="text-2xl pt-4 font-normal leading-5">
            Your login code for {appName}
          </Heading>
          <Section className="py-7">
            <Button
              className={cn(
                "px-4 py-3 text-small gap-2 rounded-medium",
                "inline-flex items-center justify-center",
                "rounded-md bg-blue-500 text-white"
              )}
              href={`${baseUrl}/api/verify-email?token=${validationCode}`}>
              Login to {appName}
            </Button>
          </Section>
          <Text className="mb-4 text-[#3c4149] ">
            This link and code will only be valid for the next 5 minutes. If the
            link does not work, you can use the login verification code
            directly:
          </Text>
          <code className="font-mono font-bold px-1 bg-[#dfe1e4] text-xl rounded text-[#3c4149] ">
            {validationCode}
          </code>
          <Hr className="mt-10 mb-6 border-[#dfe1e4]" />
          <Link href={`${baseUrl}`} className="text-sm text-[#b4becc]">
            {appName}
          </Link>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

LoginCodeEmail.PreviewProps = {
  validationCode: "12312343",
} as LoginCodeEmailProps;

export default LoginCodeEmail;
