import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs";
import ListingPage from "./_components/listing";
import { BlogFiltersCompact } from "./_components/tables/toolbar";
import ForumDialogButton from "@/components/forum-dialog";

export const metadata = {
  title: "Dashboard: Forums",
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Questions" description="liste de question posés" />
          <div className="hidden sm:block">
            <ForumDialogButton />
          </div>
        </div>

        <Separator />
        <BlogFiltersCompact />

        <ListingPage />
      </div>
    </PageContainer>
  );
}
