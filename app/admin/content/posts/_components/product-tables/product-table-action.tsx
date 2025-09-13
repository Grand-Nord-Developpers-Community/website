"use client";

import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { useProductTableFilters } from "./use-product-table-filters";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedUsers } from "@/actions/queries/user";
import Avatar from "@/components/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ProductTableAction() {
  const {
    isDraft,
    setIsDraft,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useProductTableFilters();
  const filterValue =
    isDraft === true ? "yes" : isDraft === false ? "no" : "all";

  const onSelectChange = (v: string) => {
    // normalize and set state
    if (v === "yes") setIsDraft(true);
    else if (v === "no") setIsDraft(false);
    else setIsDraft(null);
    // reset to first page when filter changes
    setPage(0);
  };
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="q"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      {/* <DataTableFilterBox
        filterKey="isDraft"
        title="État : "
        options={[
          {
            label: "En cours",
            value: "yes",
          },
          {
            label: "Publier",
            value: "no",
          },
          {
            label: "Toutes",
            value: "all",
          },
        ]}
        setFilterValue={(v) => {
          if (v === "yes") return setIsDraft(true);
          else if (v === "no") return setIsDraft(false);
          else return setIsDraft(null);
        }}
        filterValue={
          isDraft === true ? "yes" : isDraft === false ? "no" : "all"
        }
      /> */}

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">État :</span>
        <Select value={filterValue} onValueChange={onSelectChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="yes">En cours</SelectItem>
            <SelectItem value="no">Publier</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
