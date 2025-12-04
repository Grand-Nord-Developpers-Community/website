import type { Config, Context } from "@netlify/edge-functions";
import { generateOgImageResponse } from "./common";
import { getBlogPostMeta } from "@/actions/blog.actions";
export default async (request: Request, context: Context) => {
  const { slug } = context.params;
  const post = await getBlogPostMeta(slug);
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
