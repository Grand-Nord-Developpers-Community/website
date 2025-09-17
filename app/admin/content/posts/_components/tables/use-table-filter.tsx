"use client";

import { searchParams } from "@/lib/searchparams";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";
import { useCallback, useMemo } from "react";

export const DRAFT_OPTIONS = {
  all: "all",
  draft: "draft",
  published: "published",
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
  const [draftFilter, setDraftFilter] = useQueryState(
    "status",
    parseAsStringEnum(Object.values(DRAFT_OPTIONS)).withDefault("all")
  );
  // const [searchQuery, setSearchQuery] = useQueryState(
  //   "q",
  //   searchParams.q
  //     .withOptions({ shallow: false, throttleMs: 1000 })
  //     .withDefault("")
  // );

  // const [isDraft, setIsDraft] = useQueryState(
  //   "isDraft",
  //   searchParams.isDraft.withOptions({ shallow: false })
  // );

  // const [page, setPage] = useQueryState(
  //   "page",
  //   searchParams.page.withDefault(1)
  // );

  const resetFilters = useCallback(() => {
    //setSearchQuery(null);
    //setIsDraft(null);
    setSearch(null);
    setDraftFilter("all");
    //setPage(1);
  }, [setSearch, setDraftFilter /* setPage*/]);

  const isAnyFilterActive = useMemo(() => {
    return !!search || !!draftFilter;
  }, [search, draftFilter]);
  const hasActiveFilters = search.length > 0 || draftFilter !== "all";
  return {
    search,
    setSearch,
    page,
    setPage,
    resetFilters,
    hasActiveFilters,
    draftFilter,
    setDraftFilter,
    pageLimit,
    setPageLimit,
  };
}
