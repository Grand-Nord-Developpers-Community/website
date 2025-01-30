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
import BlogFormContext from "@/providers/BlogFormContext";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBlogPost, getBlogPostEdit } from "@/actions/blog.actions";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { slug } = params;
  console.log(slug)
  const post = await getBlogPostEdit(slug);
  if (!post) notFound();

  const { user } = await auth();
  if (!user) redirect("/login");
  if (user && !user.isCompletedProfile) redirect("/account/complete");
  return (
    <BlogFormContext userId={user?.id} post={post}>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset className="overflow-clip">
          <SidebarTrigger className="absolute top-3 left-1 z-10" />
          {/* page main content */}
          {children}
        </SidebarInset>
      </SidebarProvider>
    </BlogFormContext>
  );
}
