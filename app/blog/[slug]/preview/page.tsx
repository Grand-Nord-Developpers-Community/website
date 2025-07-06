import { notFound } from "next/navigation";
import React from "react";
import { getBlogPostPreview } from "@/actions/blog.actions";
import { auth } from "@/lib/auth";
import BlogContent from "../../(common)/blogContent";
import HeadSectionBlog from "../../(common)/headSectionBlog";

export const revalidate = 60;
export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const post = await getBlogPostPreview(slug as string);
  const { user } = await auth();
  if (!post) {
    notFound();
  }

  const isUserAuthorized =
    user?.id === post.authorId ||
    user?.role === "admin" ||
    user?.role === "manager";

  if (!isUserAuthorized) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-white">
      <HeadSectionBlog post={post} user={user} />
      <BlogContent post={post} user={user} />
    </div>
  );
}
