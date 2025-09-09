import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Font,
} from "@react-email/components";
import { ReactNode } from "react";

export const baseUrl = process.env.BASE_URL
  ? `${process.env.BASE_URL}`
  : "http://localhost:3000";
export const appName = "GNDC";

export const LayoutEmail = ({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) => (
  <Tailwind>
    <Html>
      <Head />
      <Font
        fontFamily="Montserrat"
        fallbackFontFamily="sans-serif" // A common fallback font
        webFont={{
          url: "https://fonts.gstatic.com/s/montserrat/v31/JTUQjIg1_i6t8kCHKm459WxRxC7mw9c.woff2", // Example URL for Montserrat
          format: "woff2",
        }}
        fontWeight={400} // Specify desired font weight (e.g., 400 for regular)
        fontStyle="normal"
      />
      <Preview>{title}</Preview>
      <Body className={`bg-background font-m antialiased`}>
        <Container className="mx-auto pt-5 pb-12 max-w-[560px]">
          <Img height={40} src={`${baseUrl}/ogdata/logo.png`} alt={appName} />
          {children}
          <Hr className="mt-10 mb-6 border-[#dfe1e4]" />
          <Link href={`${baseUrl}`} className="text-sm text-[#b4becc]">
            @{appName} TEAM
          </Link>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default LayoutEmail;
