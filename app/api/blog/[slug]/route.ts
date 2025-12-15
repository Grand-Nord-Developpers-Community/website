import { getBlogPost, getBlogPostMeta } from "@/actions/blog.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getBlogPostMeta(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  const title = post.title;
  const date = new Date(post.createdAt).toLocaleDateString();
  return NextResponse.json(
    {
      title,
      date,
      author: post.author,
    }
  );
}
