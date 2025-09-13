"use client";

import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useProductTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault("")
  );

  const [isDraft, setIsDraft] = useQueryState(
    "isDraft",
    searchParams.isDraft.withOptions({ shallow: false })
  );

  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setIsDraft(null);

    setPage(1);
  }, [setSearchQuery, setIsDraft, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!isDraft;
  }, [searchQuery, isDraft]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    isDraft,
    setIsDraft,
  };
}
