import { notFound } from "next/navigation";
import React from "react";
import { getBlogPostPreview } from "@/actions/blog.actions";
import BlogContent from "../../(common)/blogContent";
import HeadSectionBlog from "../../(common)/headSectionBlog";
import { withAuth } from "@/lib/withAuth";

export const revalidate = 60;
export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const post = await getBlogPostPreview(slug as string);
  const { user } = await withAuth();
  if (!post) {
    notFound();
  }
  const role = await user.role;
  const isUserAuthorized =
    user.id === post.authorId || role === "admin" || role === "manager";

  if (!isUserAuthorized) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-background">
      <HeadSectionBlog post={post} user={user} />
      <BlogContent post={post} user={user} />
    </div>
  );
}
