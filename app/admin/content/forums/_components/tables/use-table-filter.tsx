"use client";

import { searchParams } from "@/lib/searchparams";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";
import { useCallback, useMemo } from "react";

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

  const resetFilters = useCallback(() => {
    //setSearchQuery(null);
    //setIsDraft(null);
    setSearch(null);

    //setPage(1);
  }, [setSearch /* setPage*/]);

  const hasActiveFilters = search.length > 0;
  return {
    search,
    setSearch,
    page,
    setPage,
    resetFilters,
    hasActiveFilters,
    pageLimit,
    setPageLimit,
  };
}
