import { notFound } from "next/navigation";
import React from "react";
import {
  getBlogPost,
  getBlogPostMeta,
  getBlogPosts,
} from "@/actions/blog.actions";
import { ReportView } from "@/components/ReportView";
import { Redis } from "@upstash/redis";
import BlogContent from "../../(common)/blogContent";
import HeadSectionBlog from "../../(common)/headSectionBlog";
import { auth } from "@/lib/auth";
import { fetchPageViews } from "@/actions/utils.actions";

//export const revalidate = 60;
export async function generateMetadata({ params }:{ params: Promise<{ slug: string }>}) {
  const { slug } = await params;

  const post = await getBlogPostMeta(slug);
  if (!post) return {};

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/blog/${slug}`;
  const description = post.description;
  const ogImage = `/api/og/blog/${slug}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}
export default async function Page({ params }:{ params: Promise<{ slug: string }>}){
  const { slug } = await params;
  const post = await getBlogPost(slug as string);
  
  // Handle non-existent post first
  if (!post) {
    notFound();
  }

  const { user } = await auth();
  let views: Record<string, number> = {};
  try {
    views = await fetchPageViews(post.slug, "blog");
  } catch (error) {
    console.error("Failed to fetch views from Redis:", error);
  }

  const likes = post.likes.filter((l) => l.isLike === true).length;
  return (
    <div className="min-h-screen bg-background">
      <ReportView id={slug} type="blog" />
      <HeadSectionBlog
        post={post}
        views={views[post.slug]}
        likes={likes}
        user={user}
      />
      <BlogContent post={post} user={user} likes={likes} />
    </div>
  );
}
