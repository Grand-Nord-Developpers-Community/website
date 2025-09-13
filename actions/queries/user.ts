import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import {
  getNewUsersList,
  getTotalUsers,
  getPaginatedUsers as getUsers,
} from "../user.actions";

export const userKeys = {
  users: (page: number, size: number, query: string) =>
    ["users", { page, size, query }] as const,
  new: ["new"] as const,
  all: ["all-users-amount"] as const,
};

export const getPaginatedUsers = (page: number, size: number, query?: string) =>
  queryOptions({
    queryKey: userKeys.users(page, size, query ?? ""),
    queryFn: async () => await getUsers(page, size, query),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
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
