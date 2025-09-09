import { getUserWithRolesAndDevices } from "@/actions/user.actions";
import { JobPayloads } from "../jobs";
import { db } from "@/lib/db";
import { forumPost } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendNotification } from "./(common)/notification";
import { baseUrl } from "@/emails/base-layout";
import { renderEmail } from "@/emails/mailer";
import { transporter } from "@/lib/connection";

export default async function whenForumCreated(
  data: JobPayloads["FORUM_CREATED"],
  via: boolean = true
) {
  const { forumId } = data;
  // Fetch admins
  if (!via) {
    console.log("via web ...");
  }
  if (via) {
    console.log("Via jobs");
  }
  const forum = await db.query.forumPost.findFirst({
    columns: {
      id: true,
      title: true,
      content: true,
    },
    where: eq(forumPost.id, forumId),
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
  if (!forum) {
    return;
  }
  //console.log(data);
  const users = await getUserWithRolesAndDevices(["admin", "user", "manager"]);
  // console.log(admins);
  for (const user of users) {
    if (user.id === forum.author.id) continue;
    if (user.devices.length > 0) {
      user.devices.map(async (device) => {
        await sendNotification({
          data: {
            title: "Une question à été posé !!!",
            body: `par ${forum?.author.name} : ${forum.content.slice(0, 15)} ....`,
            icon: `${forum?.author.image ?? `${baseUrl}/api/avatar?username=${forum?.author.username}`}`,
            url: `${baseUrl}/forum/${forum.id}`,
            //badge: "/badge.png",
            image: `${baseUrl}/opengraph-image.jpg`,
          },
          device,
        });
      });
    }
    if (!user.email) continue;
    const html = await renderEmail({
      type: "forum",
      props: {
        userName: user.name!,
        author: forum.author.name!,
        id: forum.id,
        title: forum.title,
      },
    });
    transporter.sendMail({
      from: '"Forum GNDC" <noreply@gndc.tech>',
      to: user.email,
      subject: "Nouvelle question",
      html,
    });
  }
  console.log(data);
}
