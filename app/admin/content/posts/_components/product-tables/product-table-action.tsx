"use client";

import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { useProductTableFilters } from "./use-product-table-filters";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedUsers } from "@/actions/queries/user";
import Avatar from "@/components/avatar";

export default function ProductTableAction() {
  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useProductTableFilters();
  const { data, isLoading, isError, error } = useQuery(getPaginatedUsers(0, 5));
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey="categories"
        title="Categories"
        options={
          data?.map((d) => {
            return {
              label: d.name!,
              value: d.id,
            };
          }) || []
        }
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
      />
      {data?.length}
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
