import { Button, Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl } from "./base-layout";
import { cn } from "@/lib/utils";

export interface ValidatedBlogProps {
  title: string;
  author: string;
  url: string;
}

export default function ValidatedBlog({
  title,
  author,
  url,
}: ValidatedBlogProps) {
  return (
    <LayoutEmail title={`${title}`} preview="Votre article a été publié !">
      <Section>
        <Section
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "600",
              margin: "0",
            }}
          >
            🎉 Article publié avec succès !
          </Text>
        </Section>

        <Heading style={{ fontSize: "24px", marginBottom: "20px" }}>
          Félicitations {author} !
        </Heading>

        <Text
          style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "25px" }}
        >
          Votre article "<strong>{title}</strong>" vient d'être validé par notre
          équipe et est maintenant visible publiquement sur notre plateforme.
        </Text>

        <Section
          style={{
            backgroundColor: "#ecfdf5",
            padding: "20px",
            borderRadius: "8px",
            borderLeft: "4px solid #10b981",
            marginBottom: "25px",
          }}
        >
          <Text
            style={{ fontSize: "14px", color: "#065f46", marginBottom: "10px" }}
          >
            <strong>Détails de la publication :</strong>
          </Text>
          <Text style={{ fontSize: "14px", color: "#065f46", margin: "0" }}>
            <br />• Date de publication : {new Date().toLocaleDateString()}
            <br />• Statut : En ligne et visible par tous
          </Text>
        </Section>

        <Text
          style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "30px" }}
        >
          Votre contenu contribue à enrichir notre communauté. Merci pour votre
          participation et continuez à partager vos connaissances !
        </Text>

        <Section style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            href={url}
            style={{
              backgroundColor: "#10b981",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "500",
              marginRight: "15px",
            }}
          >
            Voir l'article
          </Button>

          <Button
            href={url}
            style={{
              backgroundColor: "transparent",
              color: "#10b981",
              padding: "12px 24px",
              border: "1px solid #10b981",
              borderRadius: "6px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "500",
            }}
          >
            Partager
          </Button>
        </Section>
      </Section>
    </LayoutEmail>
  );
}
