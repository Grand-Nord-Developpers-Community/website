"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar.component";
import { navItems } from "@/constants/data";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  User,
  GalleryVerticalEnd,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Breadcrumbs } from "../breadcrumbs";
import { Icons } from "../icons";
import SearchInput from "../search-input";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { UserNav } from "./user-nav";
import { useSession } from "../auth/SessionProvider";
import { logout } from "@/lib/api/auth/logout";
import { toast } from "sonner";

export const company = {
  name: "GNDC",
  logo: GalleryVerticalEnd,
  plan: "Community",
};

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  const session = useSession();
  const router = useRouter();
  //const session={}
  const pathname = usePathname();
  // Only render after first client-side mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  const onLogoutClick = async () => {
    try {
      await logout();
    } catch (e) {
      toast.error(e as string);
    }
  };
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <company.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{company.name}</span>
              <span className="truncate text-xs">{company.plan}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="overflow-x-hidden">
          <SidebarGroup>
            <SidebarGroupLabel>Vue d&apos;ensemble</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                return item?.items && item?.items?.length > 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={pathname === item.url}
                        >
                          {item.icon && <Icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
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
                    <Avatar className="bg-gray-50 h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={
                          session?.user?.image ||
                          `/api/avatar?username=${session?.user?.username}`
                        }
                        alt={session?.user?.name || ""}
                      />
                      <AvatarFallback className="rounded-lg">
                        {session?.user?.name?.slice(0, 2)?.toUpperCase() ||
                          "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {session?.user?.name || ""}
                      </span>
                      <span className="truncate text-xs">
                        {session?.user?.email || ""}
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
                      <Avatar className="bg-gray-50 h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={
                            session?.user?.image ||
                            `/api/avatar?username=${session?.user?.username}`
                          }
                          alt={session?.user?.name || ""}
                        />
                        <AvatarFallback className="rounded-lg">
                          {session?.user?.name?.slice(0, 2)?.toUpperCase() ||
                            "CN"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user?.name || ""}
                        </span>
                        <span className="truncate text-xs">
                          {" "}
                          {session?.user?.email || ""}
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
                      onClick={() => router.push("/user/setting")}
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
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          {/* <div className=" hidden w-1/3 items-center gap-2 px-4 md:flex ">
            <SearchInput />
          </div>
          <div className="flex items-center gap-2 px-4">
            <UserNav />
            <ThemeToggle /> 
          </div> */}
        </header>
        {/* page main content */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
