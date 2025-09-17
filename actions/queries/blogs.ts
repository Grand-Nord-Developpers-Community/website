import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getBlogPostsPaginated } from "../blog.actions";

export const blogKeys = {
  blogs: (page: number, size: number, q?: string, isDraft?: boolean) =>
    ["blogs", { page, size, q, isDraft }] as const,
};

export const getPaginatedBlogs = (
  page: number,
  size: number,
  q: string = "",
  isDraft: boolean | undefined = undefined
) =>
  queryOptions({
    queryKey: blogKeys.blogs(page, size, q, isDraft),
    queryFn: async () => await getBlogPostsPaginated(page, size, q, isDraft),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
