"use client";
import { columns } from "./tables/columns";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedBlogs } from "@/actions/queries/blogs";
import { getTotalBlogs } from "@/actions/queries/stats";
import { PaginatedBlog, User } from "@/types";
import DataTable from "@/components/datable/Datable";
import { useMemo } from "react";
import { useTableFilters } from "./tables/use-table-filter";
import Content from "./content-card";
import { getPaginatedUsers } from "@/actions/queries/user";
import { IRole } from "@/lib/db/schema";

export default function ListingPage() {
  const { roleFilter, page, pageLimit, search, setPage, setPageLimit } =
    useTableFilters();

  // Create filters object
  const filters = useMemo(
    () => ({
      page,
      limit: pageLimit,
      ...(search && { search }),
      ...(roleFilter !== "all" && { roleFilter }),
    }),
    [page, pageLimit, search, roleFilter]
  );

  // Fetch data with React Query
  const { data: totalBlogs } = useQuery({
    ...getTotalBlogs(),
    // Add filters as query key dependency if getTotalBlogs needs them
  });

  const { data, isLoading, isError, error } = useQuery({
    ...getPaginatedUsers(
      filters.page,
      filters.limit,
      filters.search,
      filters.roleFilter
        ? [filters.roleFilter as IRole["name"]]
        : ["admin", "manager"]
    ),
  });

  // Pagination handlers
  const goToPage = async (nextPage: number) => {
    await setPage(nextPage);
  };

  const changePageSize = async (newLimit: number) => {
    // When changing page size, reset to page 1 to avoid out-of-bounds issues
    await Promise.all([setPageLimit(newLimit), setPage(1)]);
  };

  return (
    <DataTable<User[number]>
      rows={data}
      total={totalBlogs}
      page={page}
      className="mt-5"
      pageSize={10}
      onPageChange={goToPage}
      onPageSizeChange={changePageSize}
      columns={columns}
      getRowId={(p) => p.id}
      isLoading={isLoading}
      isError={isError}
      errorMessage={(error as Error)?.message}
      toolbar={<></>}
      empty={<span>Aucun utilisateurs pour l’instant.</span>}
      renderCard={(p) => <Content data={p} />}
    />
  );
}
