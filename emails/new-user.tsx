import { Button, Heading, Img, Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail from "./base-layout";

export interface NewUserProps {
  name: string;
}

export default function NewUser({ name }: NewUserProps) {
  return (
    <LayoutEmail title={`Bienvenue sur notre plateforme !`}>
      <Section className="text-[#3c4149]">
        <Section>
          {/* <Img
            src="https://lycee-europe-dunkerque.fr/userfiles/images/habillage/bienvenue.png"
            width="400"
            height="176"
            alt="Bienvenue"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "30px" }}
          /> */}
          <Section className="text-center mb-4">
            <Text className="text-6xl mb-4">🎉</Text>
          </Section>

          <Heading
            style={{
              fontSize: "28px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Bienvenue {name} !
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Nous sommes ravis de vous accueillir dans notre communauté. Pour
            commencer votre aventure, veuillez confirmer votre adresse email.
          </Text>

          <Section style={{ textAlign: "center", marginBottom: "40px" }}>
            <Button
              // href={verificationUrl}
              style={{
                backgroundColor: "#059669",
                color: "#ffffff",
                padding: "16px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Confirmer mon email
            </Button>
          </Section>

          <Section
            style={{
              backgroundColor: "#f8fafc",
              padding: "20px",
              borderRadius: "8px",
              borderLeft: "4px solid #059669",
            }}
          >
            <Text style={{ fontSize: "14px", margin: "0" }}>
              <strong>Prochaines étapes :</strong>
              <br />
              • Complétez votre profil
              <br />
              • Explorez nos fonctionnalités
              <br />• Rejoignez les discussions
            </Text>
          </Section>
        </Section>
      </Section>
    </LayoutEmail>
  );
}
