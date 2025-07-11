import { getBlogPost, getBlogPostPreview } from "@/actions/blog.actions";
import { getUserProfile } from "@/actions/user.actions";
import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
export type Post =
  | Awaited<ReturnType<typeof getBlogPost>>
  | Awaited<ReturnType<typeof getBlogPostPreview>>;

export type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;
