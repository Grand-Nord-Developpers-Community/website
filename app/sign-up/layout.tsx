import React from "react";
<<<<<<< HEAD

import LayoutSignInLogIn from "@/components/LayoutSignInLogIn";
function Layout({
=======
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LayoutSignInLogIn from "@/components/LayoutSignInLogIn";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Inscription",
  description: "Inscription dans la plus grande communauté Tech du Grand Nord",
};

async function Layout({
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
<<<<<<< HEAD
=======
  const session = await auth();
  if (session) {
    redirect("/user");
  }
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db
  return <LayoutSignInLogIn>{children}</LayoutSignInLogIn>;
}

export default Layout;
