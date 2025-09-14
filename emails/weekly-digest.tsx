import {
  Button,
  Heading,
  Section,
  Text,
  Hr,
  Img,
  Column,
  Row,
  Link,
} from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl, headerStyles } from "./base-layout";
import { findNewestBlogPost } from "@/actions/user.actions";
import { calculateReadingTime } from "@/lib/utils";
type Post = Awaited<ReturnType<typeof findNewestBlogPost>>;

export interface NewsletterDigestLayoutProps {
  articles: Post;
  weekNumber: Date;
  highlightedPost: Post[number];
}
export const NewsletterDigestLayout = ({
  articles,
  weekNumber,
  highlightedPost,
}: NewsletterDigestLayoutProps) => (
  <LayoutEmail
    title={`Newsletter - Semaine ${weekNumber.toLocaleDateString()}`}
  >
    <Section>
      <Heading style={{ fontSize: "26px", marginBottom: "10px" }}>
        Récap de la semaine
      </Heading>

      <Text
        style={{ fontSize: "16px", color: "#6b7280", marginBottom: "30px" }}
      >
        Découvrez les articles les plus populaires et les nouveautés de cette
        semaine.
      </Text>

      {/* Article mis en avant */}
      {highlightedPost && (
        <Section
          style={{
            backgroundColor: "#faf5ff",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "30px",
            border: "1px solid #e9d5ff",
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#8b5cf6",
              marginBottom: "10px",
            }}
          >
            ⭐ ARTICLE DE LA SEMAINE
          </Text>

          <Heading style={{ fontSize: "20px", marginBottom: "10px" }}>
            {highlightedPost.title!}
          </Heading>

          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "15px",
            }}
          >
            Par {highlightedPost.author.name}
          </Text>

          <Text
            style={{
              fontSize: "15px",
              lineHeight: "1.5",
              marginBottom: "20px",
            }}
          >
            {highlightedPost.description}
          </Text>

          <Button
            href={highlightedPost.slug}
            style={{
              backgroundColor: "#8b5cf6",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Lire maintenant
          </Button>
        </Section>
      )}

      {/* Liste des autres articles */}
      <Section>
        <Heading
          style={{
            fontSize: "18px",
            marginBottom: "20px",
            color: "#374151",
          }}
        >
          Autres articles de la semaine
        </Heading>

        {articles?.map((article, index) => (
          <Section
            key={index}
            style={{
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            <Row>
              <Column style={{ width: "70%" }}>
                <Heading style={{ fontSize: "16px", marginBottom: "8px" }}>
                  <Link
                    href={article.slug}
                    style={{ color: "#1f2937", textDecoration: "none" }}
                  >
                    {article.title}
                  </Link>
                </Heading>

                <Text
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "8px",
                  }}
                >
                  {article.description}
                </Text>

                <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
                  {article.author.name} •{" "}
                  {calculateReadingTime(article.content)} min
                </Text>
              </Column>

              <Column style={{ width: "30%", textAlign: "right" }}>
                {article.preview && (
                  <Img
                    src={article.preview}
                    width="80"
                    height="60"
                    alt="Miniature"
                    style={{ borderRadius: "6px", objectFit: "cover" }}
                  />
                )}
              </Column>
            </Row>
          </Section>
        ))}
      </Section>

      <Section
        style={{
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <Text
          style={{
            fontSize: "14px",
            color: "#374151",
            marginBottom: "15px",
          }}
        >
          Vous avez manqué quelque chose ?
        </Text>

        <Button
          href="#"
          style={{
            backgroundColor: "#6b7280",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Voir tous les articles
        </Button>
      </Section>
    </Section>
  </LayoutEmail>
);
