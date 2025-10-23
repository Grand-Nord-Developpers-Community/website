import React, { Suspense } from "react";
import HeadingPage from "@/sections/common/HeadingPage";
import BlogList from "@/components/blogList";
import { NewspaperIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAllBlogPostTags,
  getBlogPostsPaginated,
} from "@/actions/blog.actions";
import { fetchPageViews } from "@/actions/utils.actions";
//export const revalidate = 0;
export const dynamic = "force-dynamic";
const PAGE_SIZE = 12;
const BlogPage = async () => {
  //const { data: blogs, isLoading, isError } = useGetListBlog();
  const initialBlogs = await getBlogPostsPaginated(0, PAGE_SIZE);
  const initialViews = await fetchPageViews(
    initialBlogs?.map((b) => b.slug),
    "blog",
  );
  const tags = await getAllBlogPostTags();
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
        }
      >
        <BlogList
          initialBlogs={initialBlogs}
          initialViews={initialViews}
          pageSize={PAGE_SIZE}
          tags={tags}
        />
      </Suspense>
    </>
  );
};

export default BlogPage;
