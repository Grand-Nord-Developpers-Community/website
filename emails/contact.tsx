import {
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";
import LayoutEmail, { appName } from "./base-layout";

export interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) {
  return (
    <LayoutEmail
      title="Nouveau message de contact"
      preview={`Nouveau message de contact de ${name}`}
    >
      <Section style={{ padding: "0 0 24px 0" }}>
        <Heading
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            margin: "0 0 8px 0",
          }}
        >
          Nouveau message de contact
        </Heading>
        <Text style={{ color: "#6b7280", margin: "0", fontSize: "14px" }}>
          Un visiteur vous a envoyé un message via le formulaire de contact du
          site {appName}.
        </Text>
      </Section>

      <Hr style={{ borderColor: "#e5e7eb", margin: "0 0 24px 0" }} />

      {/* Sender Info */}
      <Section
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <Text
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: "0 0 16px 0",
          }}
        >
          Informations de l&apos;expéditeur
        </Text>

        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ paddingLeft: "10px" }}>
            <Text style={{ margin: "0", fontSize: "14px", color: "#374151" }}>
              <strong>Nom :</strong> {name}
            </Text>
          </Column>
        </Row>

        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ paddingLeft: "10px" }}>
            <Text style={{ margin: "0", fontSize: "14px", color: "#374151" }}>
              <strong>Email :</strong>{" "}
              <a href={`mailto:${email}`} style={{ color: "#2563eb" }}>
                {email}
              </a>
            </Text>
          </Column>
        </Row>

        <Row>
          <Column style={{ width: "24px" }}>
            <Text style={{ margin: "0", fontSize: "16px" }}>📞</Text>
          </Column>
          <Column style={{ paddingLeft: "10px" }}>
            <Text style={{ margin: "0", fontSize: "14px", color: "#374151" }}>
              <strong>Téléphone :</strong> {phone}
            </Text>
          </Column>
        </Row>
      </Section>

      {/* Message */}
      <Section style={{ marginBottom: "24px" }}>
        <Text
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: "0 0 12px 0",
          }}
        >
          Message
        </Text>
        <Section
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderLeft: "4px solid #2563eb",
            borderRadius: "0 8px 8px 0",
            padding: "16px 20px",
          }}
        >
          <Text
            style={{
              margin: "0",
              fontSize: "15px",
              color: "#374151",
              lineHeight: "1.7",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Text>
        </Section>
      </Section>

      <Hr style={{ borderColor: "#e5e7eb", margin: "0 0 20px 0" }} />

      <Text
        style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center" }}
      >
        Pour répondre, utilisez directement l&apos;adresse email de
        l&apos;expéditeur :{" "}
        <a href={`mailto:${email}`} style={{ color: "#2563eb" }}>
          {email}
        </a>
      </Text>
    </LayoutEmail>
  );
}