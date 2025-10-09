import {
  Button,
  Heading,
  Section,
  Text,
  Hr,
  Img,
} from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl, colors, headerStyles } from "./base-layout";

export interface BlogPublishedProps {
  title: string;
  author: string;
  url: string;
  preview: string;
  userName: string;
  description?: string;
}

export default function BlogPublished({
  title,
  author,
  url,
  userName,
  description,
  preview,
}: BlogPublishedProps) {
  return (
    <LayoutEmail
      title={`Nouvel article : ${title}`}
      preview={`${author} vient de publier : ${title}.`}
    >
      <Section>
        <Text
          style={{ fontSize: "14px", color: "#6b7280", marginBottom: "10px" }}
        >
          NOUVEL ARTICLE
        </Text>

        <Heading
          style={{ fontSize: "24px", lineHeight: "1.3", marginBottom: "20px" }}
        >
          {title}
        </Heading>

        {/* {postImage && ( */}
        <Img
          src={
            // postImage ||
            preview
          }
          width="500"
          height="250"
          alt="Image de l'article"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />
        {/* )} */}

        <Text
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#374151",
            marginBottom: "20px",
          }}
        >
          {description}
        </Text>

        <Text
          style={{ fontSize: "14px", color: "#6b7280", marginBottom: "25px" }}
        >
          Par {author}
        </Text>

        <Button
          href={url}
          style={{
            backgroundColor: colors.secondary,
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            display: "inline-block",
            fontWeight: "500",
          }}
        >
          Lire l'article complet
        </Button>
      </Section>
    </LayoutEmail>
  );
}
