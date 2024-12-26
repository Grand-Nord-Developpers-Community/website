import React from "react";
import HeadingPage from "@/sections/common/HeadingPage";
import BlogList from "@/components/blogList"
import { NewspaperIcon } from "lucide-react";
export const revalidate = 0;
export const dynamic='force-dynamic';
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
      <BlogList/>
    </>
  );
};

export default BlogPage;
