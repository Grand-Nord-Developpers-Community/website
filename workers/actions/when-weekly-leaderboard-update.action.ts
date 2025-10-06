import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { userTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { sendNotification } from "./(common)/notification";
import { renderEmail } from "@/emails/mailer";
import { transporter } from "@/lib/connection";
import { baseUrl } from "@/emails/base-layout";
import { logger } from "@trigger.dev/sdk";
import { sendBotMsg } from "./(common)/send-bot-message";

export default async function whenWeeklyLeaderBoard(
  data: JobPayloads["WEEKLY_LEADERBOARD"],
  via: boolean = true
) {
  logger.log("data", { data });

  const users = await db.query.userTable.findMany({
    columns: {
      name: true,
      username: true,
      image: true,
      id: true,
      experiencePoints: true,
      email: true,
      createdAt: true,
    },
    orderBy: [desc(userTable.experiencePoints)],
    where: eq(userTable.isCompletedProfile, true),
    with: {
      devices: true,
      activity: true,
      blogPosts: { columns: { id: true } },
    },
  });
  logger.log("users", { users });

  let rank = 1;

  for (const user of users) {
    if (user.devices.length > 0) {
      await Promise.all(
        user.devices.map(async (device) => {
          sendNotification({
            data: {
              title: "Leaderboard Hebdomadaire🏆",
              body: `${user.name}, vous avez gagnez en tout ${user.experiencePoints} XP`,
              icon: `${user.image ?? `/api/avatar?username=${user.username}`}`,
              url: `${baseUrl}/leaderboard`,
              //badge: "/badge.png",
              image: "/badge.png",
            },
            device,
          });
        })
      );
    }
    logger.log("email", { email: user.email });
    if (!user.email) continue;
    const html = await renderEmail({
      type: "leaderboard",
      props: {
        name: user.name!,
        rank,
        tops: users.slice(0, 5).map((u, i) => {
          return { name: u.name!, xp: u.experiencePoints! };
        }),
        username: user.username!,
        xp: user.experiencePoints!,
      },
    });
    logger.log("mail", { content: html });
    try {
      const result = await transporter.sendMail({
        from: '"Leaderboard GNDC " <noreply@gndc.tech>',
        to: user.email,
        subject: "Nouveau classement",
        html,
      });
      logger.log("result", { result });
    } catch (error) {
      logger.log("erreur", { error });
    }
    rank += 1;
  }

  let message = "*Leaderboard Hebdomadaire 🏆:*\n\n";
  let count = 1;

  for (const [_, user] of Object.entries(users.slice(0, 5))) {
    message += `${count}. *${user.name?.trimEnd()}*\n`;
    message += `   - xp: ${user.experiencePoints}\n`;
    message += `   - profil: ${baseUrl}/user/${user.username}\n\n`;
    count++;
  }
  message += `\Voir plus: ${baseUrl}/leaderboard`;
  await sendBotMsg({
    msg: message,
    tagAll: false,
  });
  const profil =
    users[0].image ||
    `${baseUrl}/api/avatar?username=${users[0].username}&size=559`;
  await sendBotMsg({
    msg: `Le king de la GNDC : *${users[0].name?.trimEnd()}* avec :\n\n
      - xp : *${users[0].experiencePoints}*\n
      - activité : *${users[0].activity.totalDaysActive}* jours\n
      - blog publier : *${users[0].blogPosts.length}*`,
    tagAll: false,
    option: {
      leaderboard: true,
      profil,
    },
  });
  console.log(data);
}
