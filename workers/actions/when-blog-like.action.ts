import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { blogPost, userTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { baseUrl } from "@/emails/base-layout";
import { sendNotification } from "./(common)/notification";

export default async function whenBlogLiked(
  data: JobPayloads["BLOG_LIKED"],
  via: boolean = true
) {
  const { blogId, userId } = data;
  // Fetch admins
  if (!via) {
    console.log("via web ...");
  }
  if (via) {
    console.log("Via jobs");
  }
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
    where: and(eq(blogPost.id, blogId)),
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
  if (!blog || !user) {
    return;
  }
  const author = blog.author;

  if (author.devices.length > 0) {
    author.devices.map(async (device) => {
      if (via) {
        await sendNotification({
          data: {
            title: `Votre Blog : ${blog.title.slice(0, 6)}... à été liker `,
            body: `par ${user.name}`,
            icon: `${user.image ?? `/api/avatar?username=${user?.username}`}`,
            url: `${baseUrl}/blog/${blog.slug}`,
            //badge: "/badge.png",
            image: `/api/og/blog/${blog.slug}`,
          },
          device,
        });
      }
    });
  }

  console.log(data);
}
