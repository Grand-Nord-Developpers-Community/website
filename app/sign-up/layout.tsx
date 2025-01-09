import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LayoutSignInLogIn from "@/components/LayoutSignInLogIn";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Inscription",
  description: "Inscription dans la plus grande communauté Tech du Grand Nord",
};

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) {
    redirect("/user");
  }
  return <LayoutSignInLogIn>{children}</LayoutSignInLogIn>;
}

export default Layout;
