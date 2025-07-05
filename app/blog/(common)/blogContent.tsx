import type { Post } from "@/components/blogContent";
import PostSharing from "../(common)/PostSharing";
import PostToc from "../(common)/PostToc";
import TiptapRenderer from "@/components/TiptapRenderer/ServerRenderer";
import ProfilCard from "@/components/cards/hoverCardUserInfo";
import clsx from "clsx";
import BlogLikeCard from "@/components/blogLikeCard";
import type { SessionUser } from "@/lib/db/schema";
import CommentSection from "@/components/comment-section";

function BlogContent({
  post,
  user,
  likes = 0,
}: {
  post: Post;
  user: SessionUser | null;
  likes?: number;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,36px)_minmax(auto,1fr)_minmax(auto,320px)] px-4 gap-6 lg:gap-12 py-12",
        {
          "md:!pl-3 lg:!grid-cols-[minmax(auto,1fr)_minmax(auto,320px)]":
            post?.isDraft,
        }
      )}
    >
      {/* Content */}
      {!post?.isDraft && <PostSharing />}
      <div
        className={clsx("order-2 min-w-full", {
          "order-1": post?.isDraft,
        })}
      >
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
