import React from "react";
import LayoutEmail, { colors } from "./base-layout";
import { Heading, Img, Section, Text } from "@react-email/components";

export interface LoginCodeEmailProps {
  validationCode?: string;
}

export const LoginCodeEmail = ({ validationCode }: LoginCodeEmailProps) => (
  <LayoutEmail title={` Votre code de connexion`}>
    <Section>
      <Section className="text-center mb-4">
        <Text className="text-6xl mb-4">🔐</Text>
      </Section>
      <Heading
        style={{ fontSize: "24px", textAlign: "center", marginBottom: "20px" }}
      >
        Code de connexion
      </Heading>

      <Text
        style={{ fontSize: "16px", textAlign: "center", marginBottom: "30px" }}
      >
        Bonjour , voici votre code de connexion sécurisé :
      </Text>

      <Section
        style={{
          backgroundColor: colors.primary,
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <Text
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#ffffff",
            letterSpacing: "8px",
            margin: "0",
            fontFamily: "monospace",
          }}
        >
          {validationCode}
        </Text>
      </Section>

      <Section
        style={{
          backgroundColor: colors.secondaryShade,
          padding: "15px",
          borderRadius: "8px",
          borderLeft: `4px solid ${colors.secondary}`,
          marginBottom: "20px",
        }}
      >
        <Text style={{ fontSize: "14px", color: "#92400e", margin: "0" }}>
          ⚠️ Ce code expire dans 5 minutes. Ne le partagez avec personne.
        </Text>
      </Section>

      <Text style={{ fontSize: "14px", color: "#6b7280", textAlign: "center" }}>
        Si vous n'avez pas demandé ce code, ignorez cet email ou contactez notre
        support.
      </Text>
    </Section>
  </LayoutEmail>
);

export default LoginCodeEmail;
