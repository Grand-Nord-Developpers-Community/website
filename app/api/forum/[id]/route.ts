import { getBlogPost, getBlogPostMeta } from "@/actions/blog.actions";
import { getForumPost } from "@/actions/forum.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const forum = await getForumPost(id);
  if (!forum) {
    return new Response("Not found", { status: 404 });
  }
  const title = forum.title;
  const date = new Date(forum.createdAt).toLocaleDateString();
  return NextResponse.json({
    title,
    date,
    replies: forum?.replies || [],
    author: {
      name: forum.author?.name || "Unknown",
      username: forum.author?.username || "Unknown",
      image: forum.author?.image || "",
    },
  });
}
