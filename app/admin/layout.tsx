import AppSidebar from '@/components/layout/app-sidebar';
import type { Metadata } from 'next';
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
// export const metadata: Metadata = {
//   title: "GNDC | Admin panel Dashboard",
//   description:
//     "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
// };
export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    return notFound();
  }
  return (
    <>
      <AppSidebar>{children}</AppSidebar>
    </>
  );
}
