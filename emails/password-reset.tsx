import { cn } from "@/lib/utils";
import {
  Button,
  Heading,
  Hr,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import LayoutEmail, { appName, baseUrl } from "./base-layout";

export interface ResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <LayoutEmail title={`${appName} reset password`}>
      <Section>
        <Section className="text-center mb-4">
          <Text className="text-6xl mb-4">🔑</Text>
        </Section>
        <Heading
          style={{
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Réinitialisation du mot de passe
        </Heading>

        <Text
          style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "25px" }}
        >
          Bonjour {userFirstname},
        </Text>

        <Text
          style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "30px" }}
        >
          Vous avez demandé la réinitialisation de votre mot de passe. Cliquez
          sur le bouton ci-dessous pour créer un nouveau mot de passe sécurisé.
        </Text>

        <Section style={{ textAlign: "center", marginBottom: "30px" }}>
          <Button
            href={resetPasswordLink}
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Réinitialiser le mot de passe
          </Button>
        </Section>

        <Section
          style={{
            backgroundColor: "#fee2e2",
            padding: "20px",
            borderRadius: "8px",
            borderLeft: "4px solid #ef4444",
            marginBottom: "25px",
          }}
        >
          <Text style={{ fontSize: "14px", color: "#991b1b", margin: "0" }}>
            <strong>Important :</strong> Ce lien expire dans 5 min heures. Si
            vous n'avez pas fait cette demande, ignorez cet email.
          </Text>
        </Section>

        <Text style={{ fontSize: "14px", color: "#6b7280" }}>
          Pour votre sécurité, assurez-vous que votre nouveau mot de passe
          contient au moins 8 caractères avec des lettres, chiffres et symboles.
        </Text>
      </Section>
    </LayoutEmail>
  );
};

export default ResetPasswordEmail;
