import { CardBlog } from "@/components/cardBlog";
import { Button } from "@/components/ui/button";
import EmptyBlog from "@/assets/svgs/undraw_add_notes_re_ln36.svg";
import Link from "next/link";
import { fetchPageViews } from "@/actions/utils.actions";
import { getBlogPosts } from "@/actions/blog.actions";
const BlogList = async () => {
  //const { data: blogs, isLoading, isError } = useGetListBlog();
  const blogs = await getBlogPosts();
  const views = await fetchPageViews(
    blogs?.map((b) => b.slug),
    "blogs"
  );

  return (
    <>
      <div className="screen-wrapper my-10 ">
        <div className="flex flex-wrap gap-3 justify-start">
          {blogs?.map((blog, i) => (
            <CardBlog {...blog} view={views[blog.slug]} key={i} />
          ))}
        </div>

        {blogs?.length === 0 && (
          <div className="flex flex-col h-[300px] justify-center items-center my-5">
            <EmptyBlog className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
            <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
              il y&apos;a pas de blog pour l&apos;instant !
            </h2>
            <div className="flex w-full justify-center my-2">
              <Button className="px-4" asChild variant="secondary">
                <Link href="/blog/new">Publier en un</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
