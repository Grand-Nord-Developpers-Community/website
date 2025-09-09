import { Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail from "./base-layout";

interface NotificationProps {
  title: string;
  message: string;
}

export default function Notification({ title, message }: NotificationProps) {
  return (
    <LayoutEmail title={`${title}`}>
      <Section className="text-[#3c4149]">
        <Text>Hi ,</Text>

        <Text>{message}</Text>
      </Section>
    </LayoutEmail>
  );
}
