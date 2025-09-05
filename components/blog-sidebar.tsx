"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { LayoutDashboard, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/images/brand/logo.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useFormContext } from "@/providers/BlogFormContext";
import { ChevronsUpDown, LogOut } from "lucide-react";
import type { SessionUser } from "@/lib/db/schema";
//import { logout } from "@/actions/user.actions";
import { logout } from "@/lib/api/auth/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Avatar from "./avatar";
export function AppSidebar({ user }: { user: SessionUser }) {
  const {
    form,
    setCompressedFile,
    loading,
    progress,
    success,
    img,
    onRemoveLoadedImage,
    isEdit,
    onSubmit,
  } = useFormContext();
  const { setValue } = form;
  const router = useRouter();
  const onLogoutClick = async () => {
    try {
      await logout();
    } catch (e) {
      toast.error(e as string);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blog Information</SidebarGroupLabel>
          <SidebarGroupContent className="gap-3 flex flex-col">
            <FormField
              name="preview"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-[200px]">
                      <ImageUpload
                        onCompressedComplete={(file) => setCompressedFile(file)}
                        onRemoveHandler={() => setCompressedFile(null)}
                        loading={loading}
                        progress={progress}
                        loadedImage={img}
                        onRemoveLoadedImage={onRemoveLoadedImage}
                        onHashChange={(h) =>
                          setValue("previewHash", h, { shouldValidate: true })
                        }
                        onReset={success && !loading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Blog title"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter the blog description"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-3 text-white"
              variant="secondary"
              onClick={onSubmit}
              disabled={loading}
            >
              {!isEdit ? "Publier" : "Modifier"}
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="bg-gray-50 h-8 w-8 rounded-lg" {...user} />

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || ""}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email || ""}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar
                      className="h-8 bg-gray-50 w-8 rounded-lg"
                      {...user}
                    />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name || ""}
                      </span>
                      <span className="truncate text-xs">
                        {" "}
                        {user?.email || ""}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/user")}>
                    <LayoutDashboard className="text-gray-400 mr-2 size-5" />
                    Tableau de board
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/user/settings")}
                  >
                    <User className="text-gray-400 mr-2 size-5" />
                    Paramètre
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogoutClick}>
                  <LogOut className="text-gray-400 mr-2 size-5" />
                  Se deconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
