import PageContainer from "@/components/layout/page-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "nuqs";
import ListingPage from "./_components/listing";
import { BlogFiltersCompact } from "./_components/tables/toolbar";
import UserDialog from "./_components/userDialog";
import AddMemberButton from "./_components/add-member";

export const metadata = {
  title: "Dashboard: Publications",
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
          <Heading
            title="Managers"
            description="gérer les managers/administrateurs"
          />
          <AddMemberButton />
        </div>

        <Separator />
        <BlogFiltersCompact />
        <ListingPage />
      </div>
    </PageContainer>
  );
}
