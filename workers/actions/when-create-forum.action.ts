import { getUserWithRolesAndDevices } from "@/actions/user.actions";
import { JobPayloads } from "../jobs";
import { db } from "@/lib/db";
import { forumPost } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendNotification } from "./(common)/notification";
import { baseUrl } from "@/emails/base-layout";
import { renderEmail } from "@/emails/mailer";
import { transporter } from "@/lib/connection";
import { console } from "inspector";
import { logger } from "@trigger.dev/sdk";
import { sendBotMsg } from "./(common)/send-bot-message";

export default async function whenForumCreated(
  data: JobPayloads["FORUM_CREATED"],
  via: boolean = true
) {
  const { forumId } = data;
  // Fetch admins
  logger.log("data", { data });

  try {
    const forum = await db.query.forumPost.findFirst({
      columns: {
        id: true,
        title: true,
        textContent: true,
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
    logger.log("forum", { forum });

    if (!forum) {
      return;
    }
    logger.log("forum", forum);
    //console.log(data);
    const users = await getUserWithRolesAndDevices([
      "admin",
      "user",
      "manager",
    ]);
    logger.log("admin", { users });
    // console.log(admins);
    for (const user of users) {
      //if (user.id === forum.author.id) continue;
      if (user.devices.length > 0) {
        await Promise.all(
          user.devices.map(async (device) => {
            sendNotification({
              data: {
                title: "Une question à été posé !!!",
                body: `par ${forum?.author.name} : ${forum.textContent.slice(0, 15)} ....`,
                icon: `${forum?.author.image ?? `${baseUrl}/api/avatar?username=${forum?.author.username}`}`,
                url: `${baseUrl}/forum/${forum.id}`,
                //badge: "/badge.png",
                image: `${baseUrl}/api/og/forum/${forum.id}`,
              },
              device,
            });
          })
        );
      }
      if (!user.email) continue;
      const html = await renderEmail({
        type: "forum",
        props: {
          userName: user.name!,
          author: forum.author.name!,
          id: forum.id,
          title: forum.title,
          textContent: forum.textContent,
        },
      });
      const res = await transporter.sendMail({
        from: '"Forum GNDC" <noreply@gndc.tech>',
        to: user.email,
        subject: "Nouvelle question",
        html,
      });
      logger.log("email", { res });
    }
    const res = await sendBotMsg({
      msg: `Une question a été posé par *${forum?.author.name?.trimEnd()}* :\n ${forum.textContent.slice(0, 15)} ... ,\n\nconsulter : ${baseUrl}/forum/${forum.id}`,
      tagAll: false,
    });
    logger.log("send to whatsapp", { res });
  } catch (error) {
    logger.log("erreur : ", { error });
  }
}
