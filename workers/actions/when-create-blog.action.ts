import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { blogPost, rolesTable, userTable as user } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { transporter } from "@/lib/connection";
import { renderEmail } from "@/emails/mailer";
import { baseUrl } from "@/emails/base-layout";
import { sendNotification } from "./(common)/notification";
import { getUserWithRoleAndDevices } from "@/actions/user.actions";
import { logger } from "@trigger.dev/sdk";
import { sendBotMsg } from "./(common)/send-bot-message";

export default async function whenBlogCreated(
  data: JobPayloads["BLOG_CREATED"],
  via: boolean = true
) {
  const { slug } = data;
  logger.log("data", { data });

  const blog = await db.query.blogPost.findFirst({
    columns: {
      id: true,
      title: true,
    },
    where: and(eq(blogPost.slug, slug), eq(blogPost.isDraft, true)),
    with: {
      author: {
        columns: {
          id: true,
          image: true,
          name: true,
          username: true,
        },
      },
    },
  });
  logger.log("blog", { blog });

  if (!blog) {
    return;
  }
  //console.log(data);
  const admins = await getUserWithRoleAndDevices("admin");
  logger.log("admins", { admins });

  // console.log(admins);
  for (const admin of admins) {
    if (admin.id === blog.author.id) continue;
    if (admin.devices.length > 0) {
      await Promise.all(
        admin.devices.map(async (device) => {
          sendNotification({
            data: {
              title: "Blog publier en attente !!",
              body: `${admin.name}, ${blog?.author.name} vient de soumettre un blog`,
              icon: `${blog?.author.image ?? `${baseUrl}/api/avatar?username=${blog?.author.username}`}`,
              url: `${baseUrl}/blog/${slug}/preview`,
              //badge: "/badge.png",
              image: `${baseUrl}/api/og/blog/${slug}`,
            },
            device,
          });
        })
      );
    }
    if (!admin.email) continue;
    const html = await renderEmail({
      type: "newBlog",
      props: {
        adminName: admin.name!,
        author: blog.author.name!,
        slug,
        title: blog.title,
      },
    });
    await transporter.sendMail({
      from: '"Blog GNDC | En attente de validation" <noreply@gndc.tech>',
      to: admin.email,
      subject: "Nouveau blog",
      html,
    });
  }
  // await sendBotMsg({
  //   msg: `Blog publier en attente !!\n ${blog?.author.name} vient de soumettre un blog \n\nconsulter : ${baseUrl}/blog/${slug}/preview`,
  //   targetAdmin: true,
  // });
}
