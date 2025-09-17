import {
  getBlogPost,
  getBlogPostPreview,
  getBlogPostsPaginated,
} from "@/actions/blog.actions";
import { getPaginatedForums } from "@/actions/forum.actions";
import { getPaginatedBlogs } from "@/actions/queries/blogs";
import { getPaginatedUsers, getUserProfile } from "@/actions/user.actions";
import { Icons } from "@/components/icons";
import { IRole } from "@/lib/db/schema";

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
  role?: IRole["name"][];
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
export type PaginatedBlog = Awaited<ReturnType<typeof getBlogPostsPaginated>>;
export type PaginatedForum = Awaited<ReturnType<typeof getPaginatedForums>>;
export type User = Awaited<ReturnType<typeof getPaginatedUsers>>;
