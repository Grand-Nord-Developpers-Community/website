"use client";

import { useQueryState, parseAsString, parseAsStringEnum } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, X, RotateCcw } from "lucide-react";
import { useCallback, useMemo } from "react";
import { ROLE_OPTIONS, useTableFilters } from "./use-table-filter";

// Define the Role filter options

type RoleOption = keyof typeof ROLE_OPTIONS;

interface BlogFiltersProps {
  className?: string;
}

// Export a compact version for use in toolbar/header areas
export function BlogFiltersCompact({ className }: BlogFiltersProps) {
  const {
    setSearch,
    setRoleFilter,
    search,
    roleFilter,
    resetFilters,
    hasActiveFilters,
  } = useTableFilters();
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value || null);
    },
    [setSearch]
  );

  const handleRoleFilterChange = useCallback(
    (value: RoleOption) => {
      setRoleFilter(value);
    },
    [setRoleFilter]
  );

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Search */}
      <div className="relative flex items-center w-2/3 sm:w-3/4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 w-full py-2"
        />
      </div>

      {/* Status Filter */}
      <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
        <SelectTrigger className="grow">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          <SelectItem value="admin">Administrateurs</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="grow"
          onClick={resetFilters}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Rénitialiser
        </Button>
      )}
    </div>
  );
}
