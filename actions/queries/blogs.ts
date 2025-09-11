import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getBlogPostsPaginated } from "../blog.actions";

export const blogKeys = {
  blogs: (page: number, size: number) => ["users", { page, size }] as const,
};

export const getPaginatedBlogs = (page: number, size: number) =>
  queryOptions({
    queryKey: blogKeys.blogs(page, size),
    queryFn: async () => await getBlogPostsPaginated(page, size),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
