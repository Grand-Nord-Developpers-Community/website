import { cn } from "@/lib/utils";
import { Button, Heading, Section, Text } from "@react-email/components";
import LayoutEmail, { appName, baseUrl } from "./base-layout";

export interface LoginCodeEmailProps {
  validationCode?: string;
}

export const LoginCodeEmail = ({ validationCode }: LoginCodeEmailProps) => (
  <LayoutEmail title={` Your login code for ${appName}`}>
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
        href={`${baseUrl}/api/verify-email?token=${validationCode}`}
      >
        Login to {appName}
      </Button>
    </Section>
    <Text className="mb-4 text-[#3c4149] ">
      This link and code will only be valid for the next 5 minutes. If the link
      does not work, you can use the login verification code directly:
    </Text>
    <code className="font-mono font-bold px-1 bg-[#dfe1e4] text-xl rounded text-[#3c4149] ">
      {validationCode}
    </code>
  </LayoutEmail>
);

export default LoginCodeEmail;
