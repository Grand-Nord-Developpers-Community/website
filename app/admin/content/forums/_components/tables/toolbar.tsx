"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import { useCallback } from "react";
import { useTableFilters } from "./use-table-filter";

// Define the draft filter options

interface BlogFiltersProps {
  className?: string;
}

// Export a compact version for use in toolbar/header areas
export function BlogFiltersCompact({ className }: BlogFiltersProps) {
  const {
    setSearch,
    search,

    resetFilters,
    hasActiveFilters,
  } = useTableFilters();
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value || null);
    },
    [setSearch]
  );

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Search */}
      <div className="relative flex items-center w-2/3 sm:w-3/4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search ..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 w-full py-2"
        />
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="grow"
          onClick={resetFilters}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
