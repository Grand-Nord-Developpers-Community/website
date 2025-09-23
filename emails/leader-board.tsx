import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail from "./base-layout";
import { baseUrl } from "./base-layout";
export interface LeaderBoardProps {
  name: string;
  xp: number;
  username: string;
  rank: number;
  tops: { name: string; xp: number }[];
}

export default function LeaderBoard({
  name,
  rank,
  xp,
  username,
  tops,
}: LeaderBoardProps) {
  return (
    <LayoutEmail
      title={`Classement du ${new Date().toLocaleDateString()} - Votre position`}
    >
      <Section>
        <Section
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <Text
            style={{ color: "#ffffff", fontSize: "14px", marginBottom: "10px" }}
          >
            CLASSEMENT HEBDOMADAIRE
          </Text>
          <Text
            style={{
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: "700",
              margin: "0",
            }}
          >
            Position #{rank}
          </Text>
          <Text
            style={{ color: "#fef3c7", fontSize: "16px", marginTop: "5px" }}
          >
            {xp} xp
          </Text>
        </Section>

        <Heading style={{ fontSize: "20px", marginBottom: "20px" }}>
          Bonjour {name} !
        </Heading>

        <Text
          style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "25px" }}
        >
          Découvrez votre performance et le classement des meilleurs
          contributeurs de cette période.
        </Text>

        <Section
          style={{
            backgroundColor: "#fffbeb",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "25px",
          }}
        >
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            🏆 Top 3 du classement
          </Text>

          {tops?.slice(0, 3).map((user, index) => (
            <Section
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: index < 2 ? "1px solid #fde68a" : "none",
              }}
            >
              <Text
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: index === 0 ? "#f59e0b" : "#6b7280",
                  minWidth: "30px",
                }}
              >
                #{index + 1}
              </Text>
              <Text style={{ fontSize: "14px", flex: "1", margin: "0 15px" }}>
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                {user.xp} xp
              </Text>
            </Section>
          ))}
        </Section>

        <Button
          href={`${baseUrl}/leaderboard`}
          style={{
            backgroundColor: "#f59e0b",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            display: "inline-block",
            fontWeight: "500",
          }}
        >
          Voir le classement complet
        </Button>
      </Section>
    </LayoutEmail>
  );
}
