import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "GNDC | Compte",
  description: "Completez des information pour finaliser votre compte",
};
export default async function CompleteRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { session, user } = await auth();
  // if (!session) {
  //   redirect("/login");
  // } else {
  //   if (user && user.isCompletedProfile) {
  //     redirect("/user/dashboard");
  //   }
  // }
  return <>{children}</>;
}
