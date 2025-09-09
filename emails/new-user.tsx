import { Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail from "./base-layout";

export interface NewUserProps {
  name: string;
}

export default function NewUser({ name }: NewUserProps) {
  return (
    <LayoutEmail title={`Salut ${name}`}>
      <Section className="text-[#3c4149]">
        <Text>Salut {name},</Text>
        <Text>🎉 Bienvenue à board, tu as rejoint avec succès la GNDC.</Text>
        <Text>Nous sommes éxcités de vous voir dans notre communauté.</Text>
      </Section>
    </LayoutEmail>
  );
}
