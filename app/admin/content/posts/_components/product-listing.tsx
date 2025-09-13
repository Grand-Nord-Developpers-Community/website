import { Product } from "@/constants/data";
import { fakeProducts } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import { DataTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPaginatedBlogs } from "@/actions/queries/blogs";
import { getTotalBlogs } from "@/actions/queries/stats";

export default async function ProductListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const authorId = searchParamsCache.get("authorId");
  const isDraft = searchParamsCache.get("isDraft");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(authorId && { authorId }),
    ...(isDraft && { isDraft }),
  };

  const qc = getQueryClient();
  const numberBlogs = await qc.fetchQuery(getTotalBlogs());
  const data = await qc.fetchQuery(
    getPaginatedBlogs(filters.page, filters.limit)
  );
  const totalProducts = numberBlogs;

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <DataTable columns={columns} data={data} totalItems={totalProducts} />
    </HydrationBoundary>
  );
}
