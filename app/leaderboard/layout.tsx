import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GNDC | Leaderboard",
  description: "Liste des utilisateurs les plus actifs",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
