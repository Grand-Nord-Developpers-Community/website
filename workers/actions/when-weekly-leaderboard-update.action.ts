import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { userTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { sendNotification } from "./(common)/notification";
import { renderEmail } from "@/emails/mailer";
import { transporter } from "@/lib/connection";
import { baseUrl } from "@/emails/base-layout";
import { logger } from "@trigger.dev/sdk";

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
    transporter.sendMail({
      from: '"Leaderboard GNDC " <noreply@gndc.tech>',
      to: user.email,
      subject: "Nouveau classement",
      html,
    });
    rank += 1;
  }
  console.log(data);
}
