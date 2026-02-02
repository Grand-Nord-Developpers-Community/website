import React from "react";
import HeadingPage from "@/sections/common/HeadingPage";
import BlogList from "@/components/blogList";
import { NewspaperIcon } from "lucide-react";
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
  const initialBlogs = await getBlogPostsPaginated(
    0,
    PAGE_SIZE,
    undefined,
    false,
  );
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
      <BlogList
        initialBlogs={initialBlogs}
        initialViews={initialViews}
        pageSize={PAGE_SIZE}
        tags={tags}
      />
    </>
  );
};

export default BlogPage;
