import React from "react";

import LayoutSignInLogIn from "@/components/LayoutSignInLogIn";
function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutSignInLogIn>{children}</LayoutSignInLogIn>;
}

export default Layout;
