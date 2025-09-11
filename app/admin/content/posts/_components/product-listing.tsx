import { Product } from "@/constants/data";
import { fakeProducts } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPaginatedBlogs } from "@/actions/queries/blogs";
import { getTotalBlogPosts } from "@/actions/blog.actions";
import { getTotalBlogs } from "@/actions/queries/stats";

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const authorId = searchParamsCache.get("authorId");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(authorId && { categories: authorId }),
  };

  const qc = getQueryClient();
  const numberBlogs = await qc.fetchQuery(getTotalBlogs());
  const data = await qc.fetchQuery(
    getPaginatedBlogs(filters.page, filters.limit)
  );
  const totalProducts = numberBlogs;

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ProductTable columns={columns} data={data} totalItems={totalProducts} />
    </HydrationBoundary>
  );
}
