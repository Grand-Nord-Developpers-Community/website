import {
  Button,
  Heading,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl, headerStyles } from "./base-layout";
import { cn } from "@/lib/utils";

export interface NewForumProps {
  title: string;
  author: string;
  id: string;
  userName: string;
  textContent: string;
}

export default function NewForum({
  title,
  author,
  id,
  userName,
  textContent,
}: NewForumProps) {
  return (
    <LayoutEmail title={`Nouvelle discussion : ${title}`}>
      <Section>
        <Text
          style={{ fontSize: "14px", color: "#6b7280", marginBottom: "10px" }}
        >
          NOUVELLE DISCUTION
        </Text>

        <Heading
          style={{ fontSize: "22px", lineHeight: "1.3", marginBottom: "15px" }}
        >
          {title}
        </Heading>

        <Text
          style={{ fontSize: "14px", color: "#6b7280", marginBottom: "15px" }}
        >
          Par {author}
        </Text>

        <Section
          style={{
            backgroundColor: "#f9fafb",
            padding: "20px",
            borderRadius: "8px",
            borderLeft: "3px solid #7c3aed",
            marginBottom: "25px",
          }}
        >
          <Text style={{ fontSize: "15px", lineHeight: "1.5", margin: "0" }}>
            {textContent.length > 200
              ? `${textContent.substring(0, 200)}...`
              : textContent}
          </Text>
        </Section>

        <Button
          href={`${baseUrl}/forum/${id}`}
          style={{
            backgroundColor: "#7c3aed",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            display: "inline-block",
            fontWeight: "500",
          }}
        >
          Voir la discussion
        </Button>
      </Section>
    </LayoutEmail>
  );
}
