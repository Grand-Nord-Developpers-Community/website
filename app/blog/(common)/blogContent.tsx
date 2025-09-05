import type { Post } from "@/types";
import PostSharing from "../(common)/PostSharing";
import PostToc from "../(common)/PostToc";
import TiptapRenderer from "@/components/TiptapRenderer/ServerRenderer";
import ProfilCard from "@/components/cards/hoverCardUserInfo";
import clsx from "clsx";
import BlogLikeCard from "@/components/blogLikeCard";
import type { SessionUser } from "@/lib/db/schema";
import CommentSection from "@/components/comment-section";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getMoreBlogPosts } from "@/actions/blog.actions";
import { fetchPageViews } from "@/actions/utils.actions";
import { CardBlog } from "@/components/cardBlog";
import EmptyBlog from "@/assets/svgs/undraw_add_notes_re_ln36.svg";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";

async function MoreBlogPosts({ id, limit }: { id: string; limit: number }) {
  const blogs = await getMoreBlogPosts(id, limit);
  const views = await fetchPageViews(
    blogs?.map((b) => b.slug),
    "blog"
  );
  return (
    <div className="w-full">
      <h3 className="my-5 font-semibold text-lg sm:text-2xl">Autre blogs</h3>
      <div className="flex flex-wrap gap-3 justify-start">
        {blogs?.map((blog, i) => (
          <CardBlog
            {...blog}
            view={views[blog.slug]}
            key={i}
            className="w-full md:w-[49%] lg:w-[32.5%] xl:w-[33%]"
            imageClassName="!h-[150px]"
          />
        ))}
      </div>
      {blogs?.length === 0 && (
        <div className="flex flex-col h-[300px] justify-center items-center my-5">
          <EmptyBlog className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
          <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
            il y&apos;a pas d&apos;autre blog pour l&apos;instant !
          </h2>
        </div>
      )}{" "}
    </div>
  );
}
function BlogContent({
  post,
  user,
  likes = 0,
  views = 0,
}: {
  post: Post;
  user: SessionUser | null;
  likes?: number;
  views?: number;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 screen-wrapper lg:grid-cols-[minmax(auto,36px)_minmax(auto,1fr)_minmax(auto,320px)] gap-6 lg:gap-12 py-12",
        {
          "md:!pl-3 lg:!grid-cols-[minmax(auto,1fr)_minmax(auto,320px)]":
            post?.isDraft,
        }
      )}
    >
      {/* Content */}
      {!post?.isDraft && (
        <PostSharing
          title={post?.title || ""}
          url={`${process.env.BASE_URL}/blog/${post?.slug}`}
        />
      )}
      <div
        className={clsx("order-2 min-w-full", {
          "order-1": post?.isDraft,
        })}
      >
        <div className="md:hidden mt-4 flex flex-col sm:space-x-6">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-gray-50" {...post?.author!} />
            <div>
              <p className="text-sm font-medium text-primary">
                <Link href={`/user/${post?.author.username}`}>
                  {post!.author.name}
                </Link>
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>
                  Posté le{" "}
                  {new Date(post!.createdAt).toLocaleDateString("FR-fr", {
                    dateStyle: "long",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:hidden mt-5 flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />{" "}
              {calculateReadingTime(post!.content)} min lire
            </span>
            {!post!.isDraft && (
              <>
                <span className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />{" "}
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                  }).format(views)}{" "}
                  vues
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4" />{" "}
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                  }).format(likes)}{" "}
                </span>
              </>
            )}
          </div>
          <Separator className="mt-2 mb-4 bg-primary/30" />
        </div>
        <article className="min-w-full prose prose-blue dark:prose-invert prose-headings:scroll-m-20 article-content">
          <TiptapRenderer>{post!.content}</TiptapRenderer>
        </article>
        {!post?.isDraft && (
          <>
            <BlogLikeCard id={post?.id!} user={user} likes={likes} />
            <CommentSection user={user} blogId={post?.id} />
            <MoreBlogPosts id={post?.id!} limit={3} />
          </>
        )}
      </div>
      <div
        className={clsx("order-1 lg:order-3 max-lg:hidden", {
          "lg:!order-2": post?.isDraft,
        })}
      >
        <ProfilCard {...post!.author} />
        <PostToc />
      </div>
    </div>
  );
}
export default BlogContent;
