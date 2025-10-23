import { keepPreviousData, queryOptions,infiniteQueryOptions } from "@tanstack/react-query";
import { getAllBlogPostTags, getBlogPostsPaginated } from "../blog.actions";

export const blogKeys = {
  blogs: (page: number, size: number, q?: string, isDraft?: boolean) =>
    ["blogs", { page, size, q, isDraft }] as const,
  tags: () => ["blog-tags"] as const,
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

export const getInfiniteBlogs = (size: number) =>
  infiniteQueryOptions({
    queryKey: blogKeys.blogs(0, size),
    queryFn: async ({ pageParam = 0 }) =>
      await getBlogPostsPaginated(pageParam, size),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < size) {
        return undefined;
      }
      return allPages.length;
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    initialPageParam: 0,
  });


export const getBlogTags = () =>
  queryOptions({
    queryKey: blogKeys.tags(),
    queryFn: async () => await getAllBlogPostTags(),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });