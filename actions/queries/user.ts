import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import {
  getNewUsersList,
  getTotalUsers,
  getPaginatedUsers as getUsers,
} from "../user.actions";
import { IRole } from "@/lib/db/schema";

export const userKeys = {
  users: (
    page: number,
    size: number,
    query: string,
    role: Array<IRole["name"]>
  ) => ["users", { page, size, query, role }] as const,
  new: ["new"] as const,
  all: ["all-users-amount"] as const,
  infiniteUsers: (size: number, query: string, role: Array<IRole["name"]>) =>
    ["users", "infinite", { size, query, role }] as const,
};

export const getPaginatedUsers = (
  page: number,
  size: number,
  query?: string,
  role?: Array<IRole["name"]>
) =>
  queryOptions({
    queryKey: userKeys.users(
      page,
      size,
      query ?? "",
      role ?? ["user", "manager"]
    ),
    queryFn: async () =>
      await getUsers(
        page,
        size,
        query,
        role?.length! > 0 ? role : ["user", "manager"]
      ),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

export const getInfiniteUsers = (
  size: number,
  query?: string,
  role?: Array<IRole["name"]>
) =>
  infiniteQueryOptions({
    queryKey: userKeys.infiniteUsers(
      size,
      query ?? "",
      role ?? ["user", "manager"]
    ),
    queryFn: async ({ pageParam }) =>
      await getUsers(
        pageParam,
        size,
        query,
        role?.length! > 0 ? role : ["user", "manager"]
      ),
    initialPageParam: 0, // Start with page 0
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage || lastPage.length < size) {
        return undefined; // No more pages
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      return firstPageParam > 0 ? firstPageParam - 1 : undefined;
    },
    staleTime: 60_000,
    maxPages: 10,
  });
export const getTotalUser = () =>
  queryOptions({
    queryKey: userKeys.all,
    queryFn: async () => await getTotalUsers(),
    staleTime: 60_000,
  });

export const getRecentUsers = () =>
  queryOptions({
    queryKey: userKeys.new,
    queryFn: async () => await getNewUsersList(),
    staleTime: 60_000,
  });
