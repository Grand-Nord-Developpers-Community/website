import React from "react";
import HeadingPage from "@/sections/common/HeadingPage";
import { NewspaperIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const LoadingPage = async () => {
  return (
    <>
      <HeadingPage
        title="Blogs et publications"
        subtitle={""}
        subClassName={"max-sm:block"}
        descClassName={"mb-5"}
        description={
          "Voici une liste de blogs/d'articles publiés par la communautée"
        }
        icon={
          <div className="p-4 bg-secondary text-white rounded-full flex items-center justify-center w-fit">
            <NewspaperIcon />
          </div>
        }
      />
      <div className="my-6 px-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default LoadingPage;
