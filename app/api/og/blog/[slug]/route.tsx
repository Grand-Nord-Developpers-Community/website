import { getBlogPostMeta } from "@/actions/blog.actions";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getBlogPostMeta(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  const title = post.title;
  const date = new Date(post.createdAt).toLocaleDateString();
  const info = `${post.author?.name} · ${date}`;
  const p = new URLSearchParams({
    templateId: "9YHljRfNdYNVcE3g6__2M",
    "title-cc9u6372x": title,
    "info-597lg2ba0": info,
    "avatar-o3isduwh6":
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
  //   title,
  //   date,
  //   author: {
  //     name: post.author?.name || "Unknown",
  //     username: post.author?.username || "Unknown",
  //     image: post.author?.image || "",
  //   },
  // });
}
