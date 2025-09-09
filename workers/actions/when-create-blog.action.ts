import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { blogPost, rolesTable, userTable as user } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { transporter } from "@/lib/connection";
import { renderEmail } from "@/emails/mailer";
import { baseUrl } from "@/emails/base-layout";
import { sendNotification } from "./(common)/notification";
import { getUserWithRoleAndDevices } from "@/actions/user.actions";

export default async function whenBlogCreated(
  data: JobPayloads["BLOG_CREATED"],
  via: boolean = true
) {
  const { slug } = data;
  // Fetch admins
  if (!via) {
    console.log("via web ...");
  }
  if (via) {
    console.log("Via jobs");
  }

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
  if (!blog) {
    return;
  }
  //console.log(data);
  const admins = await getUserWithRoleAndDevices("admin");
  // console.log(admins);
  for (const admin of admins) {
    if (admin.devices.length > 0) {
      admin.devices.map(async (device) => {
        if (via) {
          await sendNotification({
            data: {
              title: "Blog publier en attente !!",
              body: `${admin.name}, ${blog?.author.name} vient de soumettre un blog`,
              icon: `${blog?.author.image ?? `/api/avatar?username=${blog?.author.username}`}`,
              url: `${baseUrl}/blog/${slug}/preview`,
              //badge: "/badge.png",
              image: "/opengraph-image.jpg",
            },
            device,
          });
        }
      });
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
    transporter.sendMail({
      from: '"Blog GNDC | Pending" <noreply@gndc.tech>',
      to: admin.email,
      subject: "Nouveau blog",
      html,
    });
  }
}
