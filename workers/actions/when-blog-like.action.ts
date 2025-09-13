import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { blogPost, userTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { baseUrl } from "@/emails/base-layout";
import { sendNotification } from "./(common)/notification";
import { logger } from "@trigger.dev/sdk";

export default async function whenBlogLiked(
  data: JobPayloads["BLOG_LIKED"],
  via: boolean = true
) {
  const { blogId, userId } = data;
  logger.log("data", { data });
  const user = await db.query.userTable.findFirst({
    columns: {
      name: true,
      image: true,
      username: true,
    },
    where: eq(userTable.id, userId),
  });
  const blog = await db.query.blogPost.findFirst({
    columns: {
      id: true,
      title: true,
      slug: true,
    },
    where: eq(blogPost.id, blogId),
    with: {
      author: {
        columns: {
          id: true,
          image: true,
          name: true,
          username: true,
        },
        with: {
          devices: true,
        },
      },
    },
  });
  logger.log("blog", { blog });
  logger.log("user", { user });
  if (!blog || !user) {
    return;
  }
  const author = blog.author;

  if (author.devices.length > 0) {
    logger.log("user", { user });
    await Promise.all(
      author.devices.map(async (device) => {
        sendNotification({
          data: {
            title: `Votre Blog : ${blog.title.slice(0, 6)}... à été liker `,
            body: `par ${user.name}`,
            icon: `${user.image ?? `${baseUrl}/api/avatar?username=${user?.username}`}`,
            url: `${baseUrl}/blog/${blog.slug}`,
            //badge: "/badge.png",
            image: `${baseUrl}/api/og/blog/${blog.slug}`,
          },
          device,
        });
      })
    );
  }
}
