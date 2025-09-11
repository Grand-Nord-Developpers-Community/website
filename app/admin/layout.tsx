import { getRecentUsers, getTotalUser } from "@/actions/queries/user";
import AppSidebar from "@/components/layout/app-sidebar";
import { getQueryClient } from "@/lib/react-query";
import { withAuth } from "@/lib/withAuth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const session = await withAuth({ ifNoSession: "notfound" });
  const role = await session.user.role;
  console.log(role);
  if (role !== "admin") {
    return notFound();
  }
  const qc = getQueryClient();
  await Promise.all([
    qc.prefetchQuery(getTotalUser()),
    qc.prefetchQuery(getRecentUsers()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <AppSidebar>{children}</AppSidebar>
    </HydrationBoundary>
  );
}
