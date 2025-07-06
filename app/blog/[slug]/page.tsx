import { notFound } from "next/navigation";
import React from "react";
import { getBlogPost } from "@/actions/blog.actions";
import { ReportView } from "@/components/ReportView";
import { Redis } from "@upstash/redis";
import BlogContent from "../(common)/blogContent";
import HeadSectionBlog from "../(common)/headSectionBlog";
import { auth } from "@/lib/auth";

const redis = Redis.fromEnv();
export const revalidate = 60;
export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const post = await getBlogPost(slug as string);
  const { user } = await auth();
  let views = 0;
  try {
    views =
      (await redis.get<number>(["pageviews", "blogs", slug].join(":"))) ?? 0;
  } catch (error) {
    console.error("Failed to fetch views from Redis:", error);
  }

  if (!post) {
    notFound();
  }
  const likes = post.likes.filter((l) => l.isLike === true).length;
  return (
    <div className="min-h-screen bg-white">
      <ReportView id={slug} type="blog" />
      <HeadSectionBlog post={post} views={views} likes={likes} user={user} />
      <BlogContent post={post} user={user} likes={likes} />
    </div>
  );
}
