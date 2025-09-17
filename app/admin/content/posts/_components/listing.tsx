"use client";
import { columns } from "./tables/columns";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedBlogs } from "@/actions/queries/blogs";
import { getTotalBlogs } from "@/actions/queries/stats";
import { PaginatedBlog } from "@/types";
import DataTable from "@/components/datable/Datable";
import { useMemo } from "react";
import { useTableFilters } from "./tables/use-table-filter";
import Content from "./content-card";

export default function ListingPage() {
  const {
    draftFilter: status,
    page,
    pageLimit,
    search,
    setPage,
    setPageLimit,
  } = useTableFilters();

  // Create filters object
  const filters = useMemo(
    () => ({
      page,
      limit: pageLimit,
      ...(search && { search }),
      ...(status !== "all" && { status }),
    }),
    [page, pageLimit, search, status]
  );

  // Fetch data with React Query
  const { data: totalBlogs } = useQuery({
    ...getTotalBlogs(),
    // Add filters as query key dependency if getTotalBlogs needs them
  });

  const { data, isLoading, isError, error } = useQuery({
    ...getPaginatedBlogs(
      filters.page,
      filters.limit,
      filters.search,
      filters.status === "draft"
        ? true
        : filters.status === "published"
          ? false
          : undefined
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
    <DataTable<PaginatedBlog[number]>
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
      empty={<span>Aucun post pour l’instant.</span>}
      renderCard={(p) => <Content data={p} />}
    />
  );
}
