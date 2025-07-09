import { withAuth } from "@/lib/withAuth";

export default async function PageRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await withAuth({ requireProfileCompletion: true });
  return <>{children}</>;
}
