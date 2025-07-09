import { withAuth } from "@/lib/withAuth";
import SideBar from "./(common)/Sidebar";

export default async function PageRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await withAuth({ requireProfileCompletion: true });

  return <SideBar>{children}</SideBar>;
}
