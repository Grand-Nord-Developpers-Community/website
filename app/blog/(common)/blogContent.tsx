import type { Post } from "@/types";
import PostSharing from "../(common)/PostSharing";
import PostToc from "../(common)/PostToc";
import TiptapRenderer from "@/components/TiptapRenderer/ServerRenderer";
import ProfilCard from "@/components/cards/hoverCardUserInfo";
import clsx from "clsx";
import BlogLikeCard from "@/components/blogLikeCard";
import type { SessionUser } from "@/lib/db/schema";
import CommentSection from "@/components/comment-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
            <Avatar className="h-10 w-10 bg-gray-50">
              <AvatarImage
                src={
                  post!.author.image ??
                  `/api/avatar?username=${post!.author.username}`
                }
                alt={post!.author.name!}
              />
              <AvatarFallback>
                {post!.author?.name!.slice(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
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
