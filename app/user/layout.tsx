import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | User",
  description: "Votre espace de publication",
};
export const dynamic = "force-dynamic";
export default async function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
