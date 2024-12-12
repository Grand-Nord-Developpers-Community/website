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
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogFormContext>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-clip">
          <SidebarTrigger className="absolute top-3 left-1 z-10" />
          {/* page main content */}
          {children}
        </SidebarInset>
      </SidebarProvider>{" "}
    </BlogFormContext>
  );
}
