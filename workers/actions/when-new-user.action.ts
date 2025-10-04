import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { eq } from "drizzle-orm";
import { userTable } from "@/lib/db/schema";
import { sendNotification } from "./(common)/notification";
import { baseUrl } from "@/emails/base-layout";
import { renderEmail } from "@/emails/mailer";
import { transporter } from "@/lib/connection";
import { logger } from "@trigger.dev/sdk";
import { sendBotMsg } from "./(common)/send-bot-message";

export default async function whenNewUser(
  data: JobPayloads["USER_NEW"],
  via: boolean = true
) {
  const { userId } = data;
  logger.log("data", { data });

  const user = await db.query.userTable.findFirst({
    columns: {
      name: true,
      username: true,
      image: true,
      id: true,
      email: true,
    },
    where: eq(userTable.id, userId),
    with: {
      devices: true,
    },
  });
  logger.log("user", { user });

  if (!user) {
    return;
  }
  if (user.devices.length > 0) {
    await Promise.all(
      user.devices.map(async (device) => {
        sendNotification({
          data: {
            title: `Bienvenue GNDC 🚀 `,
            body: `🎉 Bienvenue à board ${user.name}, tu as rejoint avec succès la GNDC.`,
            icon: `${user.image ?? `${baseUrl}/api/avatar?username=${user?.username}`}`,
            url: `${baseUrl}/user/${user.username}`,
            //badge: "/badge.png",
            image: ``,
          },
          device,
        });
      })
    );
  }
  if (user.email) {
    const html = await renderEmail({
      type: "joined",
      props: {
        name: user.name!,
      },
    });
    await transporter.sendMail({
      from: '"GNDC TEAM" <noreply@gndc.tech>',
      to: user.email,
      subject: "Bienvenue GNDC 🚀",
      html,
    });
  }
  await sendBotMsg({
    msg: `New GNDC User 🚀\n Bienvenue : *${user.name}*\n\nprofil : ${baseUrl}/user/${user.username}`,
  });
  console.log(data);
}
