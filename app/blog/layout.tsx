import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Blog",
  description: "Liste des publications",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
