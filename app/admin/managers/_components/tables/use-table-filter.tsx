"use client";

import { searchParams } from "@/lib/searchparams";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";
import { useCallback, useMemo } from "react";

export const ROLE_OPTIONS = {
  all: "all",
  admin: "admin",
  manager: "manager",
} as const;

export function useTableFilters() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault("")
  );
  const [pageLimit, setPageLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10)
  );
  const [roleFilter, setRoleFilter] = useQueryState(
    "roleFilter",
    parseAsStringEnum(Object.values(ROLE_OPTIONS)).withDefault("all")
  );
  // const [searchQuery, setSearchQuery] = useQueryState(
  //   "q",
  //   searchParams.q
  //     .withOptions({ shallow: false, throttleMs: 1000 })
  //     .withDefault("")
  // );

  // const [isRole, setIsRole] = useQueryState(
  //   "isRole",
  //   searchParams.isRole.withOptions({ shallow: false })
  // );

  // const [page, setPage] = useQueryState(
  //   "page",
  //   searchParams.page.withDefault(1)
  // );

  const resetFilters = useCallback(() => {
    //setSearchQuery(null);
    //setIsRole(null);
    setSearch(null);
    setRoleFilter("all");
    //setPage(1);
  }, [setSearch, setRoleFilter /* setPage*/]);

  const isAnyFilterActive = useMemo(() => {
    return !!search || !!roleFilter;
  }, [search, roleFilter]);
  const hasActiveFilters = search.length > 0 || roleFilter !== "all";
  return {
    search,
    setSearch,
    page,
    setPage,
    resetFilters,
    hasActiveFilters,
    roleFilter,
    setRoleFilter,
    pageLimit,
    setPageLimit,
  };
}
