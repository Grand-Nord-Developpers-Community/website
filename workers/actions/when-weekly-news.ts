import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { blogPost, userTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { sendNotification } from "./(common)/notification";
import { renderEmail } from "@/emails/mailer";
import { transporter } from "@/lib/connection";
import { baseUrl } from "@/emails/base-layout";
import { logger } from "@trigger.dev/sdk";
import { findNewestBlogPost } from "@/actions/user.actions";

export default async function whenWeeklyNews(
  data: JobPayloads["WEEKLY_DIGEST_BLOG"],
  via: boolean = true
) {
  logger.log("data", { data });
  const { date } = data;
  const blogs = await findNewestBlogPost();
  logger.log("blogs", { blogs });
  if (!blogs || blogs.length < 2) {
    return;
  }
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

  for (const user of users) {
    if (user.devices.length > 0) {
      await Promise.all(
        user.devices.map(async (device) => {
          sendNotification({
            data: {
              title: `Newsletter - Semaine ${date.toLocaleDateString("fr-FR", {
                dateStyle: "medium",
              })} `,
              body: `Quelque nouvelles actualités dans les news`,
              icon: `${user.image ?? `/api/avatar?username=${user.username}`}`,
              url: `${baseUrl}/blog`,
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
      type: "digest-blog",
      props: {
        articles: blogs.slice(1),
        highlightedPost: blogs[0],
        weekNumber: date,
      },
    });
    await transporter.sendMail({
      from: '"GNDC News Digest" <noreply@gndc.tech>',
      to: user.email,
      subject: `Newsletter - Semaine ${date.toLocaleDateString("fr-FR", {
        dateStyle: "medium",
      })} `,
      html,
    });
  }
  console.log(data);
}
