import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Blog",
  description: "Nouvelle publication",
};
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/blog-sidebar";
import { Separator } from "@/components/ui/separator";
import BlogFormContext from "@/providers/BlogFormContext";
import { getUserProfileUserAuth } from "@/actions/user.actions";
import { User } from "@/lib/schema";
import { redirect } from "next/navigation";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserProfileUserAuth();
  if (!user) redirect("/login?fallBackURL");
  if (user && !user.name) redirect("/account/complete");
  return (
    <BlogFormContext userId={user?.id}>
      <SidebarProvider>
        <AppSidebar user={user as User} />
        <SidebarInset className="overflow-clip">
          <SidebarTrigger className="absolute top-3 left-1 z-10" />
          {/* page main content */}
          {children}
        </SidebarInset>
      </SidebarProvider>
    </BlogFormContext>
  );
}
