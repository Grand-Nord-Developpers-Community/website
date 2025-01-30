import React, { Suspense } from "react";
import HeadingPage from "@/sections/common/HeadingPage";
import BlogList from "@/components/blogList";
import { NewspaperIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
//export const revalidate = 0;
export const dynamic = "force-dynamic";
const BlogPage = () => {
  //const { data: blogs, isLoading, isError } = useGetListBlog();
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
      <Suspense
        fallback={
          <>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(3)].map((_, index) => (
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
        }
      >
        <BlogList />
      </Suspense>
    </>
  );
};

export default BlogPage;
