import AppSidebar from "@/components/layout/app-sidebar";
import { withAuth } from "@/lib/withAuth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Admin panel Dashboard",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await withAuth({ ifNoSession: "notfound" });
  return (
    <>
      <AppSidebar>{children}</AppSidebar>
    </>
  );
}
