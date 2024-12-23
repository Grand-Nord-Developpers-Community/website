import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Forum",
  description: "Liste de questions posée par la communauté",
};
export const dynamic = "force-dynamic"
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
