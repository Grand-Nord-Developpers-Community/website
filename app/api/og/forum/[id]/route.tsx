import { NextRequest } from "next/server";
import { getForumPost } from "@/actions/forum.actions";
import { formatRelativeTime } from "@/lib/utils";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await getForumPost(id);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  const title = post.title;
  const date = formatRelativeTime(post.createdAt);
  const replyCount = post?.replies?.length || 0;
  //separate with middle point.
  // middle point caracter : -
  const info = `${post.author?.name} · ${date} · ${replyCount} Réponses`;
  const p = new URLSearchParams({
    templateId: "pRI2JFTodCaRF8X0CWZiK",
    "title-2ap9bealt": title,
    "info-detyxynbk": info,
    "avatar-ez6qlhfv8":
      post.author?.image ||
      `${process.env.BASE_URL}/api/avatar?username=${post.author?.username}`,
  });

  const url = `https://templify.woilasoft.com/api/v1/generate?${p.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TEMPLIFY_API_KEY}`,
    },
  });
  const blob = await response.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": "image/png",
    },
  });
  // return generateOgImageResponse({
  //   type: "forum",
  //   title,
  //   date,
  //   replies: post?.replies || [],
  //   author: {
  //     name: post.author?.name || "Unknown",
  //     username: post.author?.username || "Unknown",
  //     image: post.author?.image || "",
  //   },
  // });
}
