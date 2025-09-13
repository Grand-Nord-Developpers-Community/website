import { queryOptions } from "@tanstack/react-query";
import { fetchAppViews, getViewData } from "../utils.actions";
import { getTotalBlogPosts } from "../blog.actions";
import { getTotalForumPosts } from "../forum.actions";

export const statKeys = {
  app_views: ["app_views"] as const,
  app_views_stats: ["app_stats"] as const,
  all_blog_posts: ["blog_amount"] as const,
  all_forum_posts: ["forum_amount"] as const,
};

export const getViewGlobal = () =>
  queryOptions({
    queryKey: statKeys.app_views,
    queryFn: async () => await fetchAppViews(),
    staleTime: 60_000,
  });

export const getViewDataStat = () =>
  queryOptions({
    queryKey: statKeys.app_views_stats,
    queryFn: async () => await getViewData("app"),
    staleTime: 60_000,
  });

export const getTotalBlogs = () =>
  queryOptions({
    queryKey: statKeys.all_blog_posts,
    queryFn: async () => await getTotalBlogPosts(),
    staleTime: 60_000,
  });

export const getTotalForums = () =>
  queryOptions({
    queryKey: statKeys.all_forum_posts,
    queryFn: async () => await getTotalForumPosts(),
    staleTime: 60_000,
  });
