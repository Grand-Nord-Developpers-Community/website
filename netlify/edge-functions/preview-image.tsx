import type { Config, Context } from "@netlify/edge-functions";
//@ts-ignore
import { generateOgImageResponse } from "./assets/common.tsx";

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

  console.log("Generated image response:", image);
  if (!image) {
    return new Response("Failed to generate image", { status: 500 });
  }

  console.log("Returning image response");
  image.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  image.headers.set("Content-Type", "image/png");

  // Set CORS headers
  image.headers.set("Access-Control-Allow-Origin", "*");
  image.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  image.headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Set security headers
  image.headers.set("X-Content-Type-Options", "nosniff");
  image.headers.set("X-Frame-Options", "DENY");
  image.headers.set("X-XSS-Protection", "1; mode=block");

  console.log("Image response headers:", image.headers);

  // Return the generated image response
  console.log("Returning image response with headers:", image.headers);
  console.log("Image response status:", image.status);
  console.log("Image response status text:", image.statusText);

  return image;
};

export const config: Config = { path: "/preview-image/:slug" };
