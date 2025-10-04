import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { blogPost, rolesTable, userTable as user } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { transporter } from "@/lib/connection";
import { renderEmail } from "@/emails/mailer";
import { baseUrl } from "@/emails/base-layout";
import { sendNotification } from "./(common)/notification";
import {
  getUserWithRoleAndDevices,
  getUserWithRolesAndDevices,
} from "@/actions/user.actions";
import { auth, logger } from "@trigger.dev/sdk";
import { sendBotMsg } from "./(common)/send-bot-message";

export default async function whenBlogValidated(
  data: JobPayloads["VALIDATED_BLOG"],
  via: boolean = true
) {
  const { blogId } = data;
  logger.log("data", { data });

  const blog = await db.query.blogPost.findFirst({
    columns: {
      id: true,
      title: true,
      slug: true,
      preview: true,
      description: true,
    },
    where: and(eq(blogPost.id, blogId), eq(blogPost.isDraft, true)),
    with: {
      author: {
        columns: {
          id: true,
          image: true,
          name: true,
          email: true,
          username: true,
        },
        with: {
          devices: true,
        },
      },
    },
  });
  logger.log("blog", { blog });

  if (!blog) {
    return;
  }

  const author = blog.author;
  //seding user information :
  await Promise.all(
    author.devices.map(async (device) => {
      sendNotification({
        data: {
          title: `📖 Nouveau blog: ${blog.title}`,
          body: `${blog.author.name}, votre blog a été validé et disponible en publique `,
          icon: `${blog?.author.image ?? `${baseUrl}/api/avatar?username=${blog?.author.username}`}`,
          url: `${baseUrl}/blog/${blog.slug}`,
          //badge: "/badge.png",
          image: `${baseUrl}/api/og/blog/${blog.slug}`,
        },
        device,
      });
    })
  );
  if (author.email) {
    const html = await renderEmail({
      type: "validated",
      props: {
        author: author.name!,
        title: blog.title,
        url: `${baseUrl}/blog/${blog.slug}`,
      },
    });
  }
  //console.log(data);
  const users = await getUserWithRolesAndDevices(["admin", "manager", "user"]);
  logger.log("users", { users });

  // console.log(admins);
  for (const user of users) {
    if (user.id === blog.author.id) continue;
    if (user.devices.length > 0) {
      await Promise.all(
        user.devices.map(async (device) => {
          sendNotification({
            data: {
              title: `📖 Nouveau blog: ${blog.title}`,
              body: `${blog.author.name}, vient de soumettre un blog `,
              icon: `${blog?.author.image ?? `${baseUrl}/api/avatar?username=${blog?.author.username}`}`,
              url: `${baseUrl}/blog/${blog.slug}`,
              //badge: "/badge.png",
              image: `${baseUrl}/api/og/blog/${blog.slug}`,
            },
            device,
          });
        })
      );
    }
    if (!user.email) continue;
    const html = await renderEmail({
      type: "blogPublished",
      props: {
        author: author.name!,
        preview: blog.preview,
        url: `${baseUrl}/blog/${blog.slug}`,
        title: blog.title,
        description: blog.description,
        userName: author.username!,
      },
    });
    await transporter.sendMail({
      from: '"GNDC Blog" <noreply@gndc.tech>',
      to: user.email,
      subject: `📖 Nouveau blog: ${blog.title}`,
      html,
    });
  }

  await sendBotMsg({
    msg: `📖 Nouveau blog: *${blog.title}* \n _${blog.author.name}_, vient de soumettre un blog \n\nconsulter : ${baseUrl}/blog/${blog.slug}`,
    tagAll: true,
  });
}
