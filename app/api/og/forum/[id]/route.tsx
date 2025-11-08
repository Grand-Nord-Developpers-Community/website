import { NextRequest } from "next/server";
import { generateOgImageResponse } from "../../og";
import { getForumPost } from "@/actions/forum.actions";
import { formatRelativeTime } from "@/lib/utils";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await getForumPost(id);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  const title = post.title;
  const date = formatRelativeTime(post.createdAt);
  return generateOgImageResponse({
    type: "forum",
    title,
    date,
    replies: post?.replies || [],
    author: {
      name: post.author?.name || "Unknown",
      username: post.author?.username || "Unknown",
      image: post.author?.image || "",
    },
  });
}
