import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getPaginatedForums } from "../forum.actions";

export const forumKeys = {
  forums: (page: number, size: number, q?: string) =>
    ["forums", { page, size, q }] as const,
};

export const getPaginatedForum = (
  page: number,
  size: number,
  q: string = "",
  isDraft: boolean | undefined = undefined
) =>
  queryOptions({
    queryKey: forumKeys.forums(page, size, q),
    queryFn: async () => await getPaginatedForums(page, size, q),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
