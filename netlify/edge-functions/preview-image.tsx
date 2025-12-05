import type { Config, Context } from "@netlify/edge-functions";
//@ts-ignore
import { generateOgImageResponse } from "./common.tsx";

export default async (request: Request, context: Context) => {
  const { origin } = new URL(request.url);
  const { slug } = context.params;
  console.log(origin)
  const post = await fetch(`${origin}/api/blog/${slug}`).then((res => res.json()));
  console.log("Post data:", post);
  if (!post) {
    return new Response("Not found", { status: 404 });
  } 
  const title = post.title;
  const date = new Date(post.createdAt).toLocaleDateString();
  const image = await generateOgImageResponse({
    request: request,
    title,
    date,
    author: {
      name: post.author?.name || "Unknown",
      username: post.author?.username || "Unknown",
      image: post.author?.image || "",
    },
  });

  return image;
};

export const config: Config = { path: "/preview-image/:slug" };
