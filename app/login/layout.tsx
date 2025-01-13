import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LayoutSignInLogIn from "@/components/LayoutSignInLogIn";
async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await auth();
  if (session) {
    redirect("/user");
  }
  return <LayoutSignInLogIn>{children}</LayoutSignInLogIn>;
}

export default Layout;
