import { Section, Text, Heading, Button, Hr } from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl } from "./base-layout";

export interface NotificationProps {
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  actionUrl?: string;
  actionText?: string;
  userName?: string;
}

export default function Notification({
  title,
  message,
  type = "info",
  actionUrl,
  actionText,
  userName,
}: NotificationProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "success":
        return {
          emoji: "✅",

          bgColor: "from-green-50 to-emerald-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          iconBg: "bg-green-600",
          text: "Succès !!",
          buttonColor:
            "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
        };
      case "warning":
        return {
          emoji: "⚠️",
          text: "Attention !!",
          bgColor: "from-yellow-50 to-orange-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
          iconBg: "bg-yellow-600",
          buttonColor:
            "from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700",
        };
      case "error":
        return {
          emoji: "❌",
          text: "Echec !!",
          bgColor: "from-red-50 to-pink-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          iconBg: "bg-red-600",
          buttonColor:
            "from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700",
        };
      default: // info
        return {
          emoji: "💡",
          text: "Information",
          bgColor: "from-blue-50 to-indigo-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
          iconBg: "bg-blue-600",
          buttonColor:
            "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
        };
    }
  };

  const config = getTypeConfig(type);

  return (
    <LayoutEmail
      title={`Nouvelle notification - ${title}`}
      preview={message.substring(0, 100) + "..."}
    >
      <Section>
        <Heading style={{ fontSize: "16px", marginBottom: "20px" }}>
          Bonjour {userName}
        </Heading>

        <Text
          style={{ fontSize: "14px", lineHeight: "1.5", marginBottom: "20px" }}
        >
          Vous avez reçu une nouvelle notification :
        </Text>

        <Section
          style={{
            backgroundColor: "#f3f4f6",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "25px",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "8px",
            }}
          >
            {config.emoji} {config.text}
          </Text>
          <Text style={{ fontSize: "14px", lineHeight: "1.4", margin: "0" }}>
            {message}
          </Text>
        </Section>

        {actionUrl && (
          <Button
            href={actionUrl}
            style={{
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "500",
            }}
          >
            {actionText}
          </Button>
        )}
      </Section>
    </LayoutEmail>
  );
}
