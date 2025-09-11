import { Queue, Worker } from "bullmq";
import { connection } from "@/lib/connection";
import type { JobPayloads } from "./jobs";
import { handlers } from "./handler";

export const notificationQueue = new Queue("notification-queue", {
  connection,
});
notificationQueue.add(
  "WEEKLY_LEADERBOARD",
  {},
  {
    repeat: {
      pattern: "0 9 * * 1",
    },
  }
);
// const worker = new Worker(
//   "notification-queue",
//   async (job) => {
//     const handler = handlers[job.name as keyof JobPayloads];
//     await handler(job.data);
//   },
//   { connection, concurrency: 10 }
// );

// export default worker;

// import { connection, transporter } from "@/lib/connection";
// import { db } from "@/lib/db";
// import { Worker } from "bullmq";
// import IORedis from "ioredis";
// import nodemailer from "nodemailer";
// import { rolesTable, userTable as user } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";
// import webpush, { CustomPushSubscription } from "@/server/webpush";

// // Worker to consume jobs
// const worker = new Worker(
//   "admin-mail-queue",
//   async (job) => {
//     console.log("Processing job:", job.id, job.name);
//     console.log(job.data);
//     //const { blogId, title, content } = job.data;

//     // Fetch admins
//     const admins = await db.query.userTable.findMany({
//       columns: {
//         name: true,
//         email: true,
//       },
//       where: eq(
//         user.role_id,
//         db
//           .select({ id: rolesTable.id })
//           .from(rolesTable)
//           .where(eq(rolesTable.name, "admin"))
//       ),
//       with: {
//         devices: true,
//         role: {
//           columns: {
//             name: true,
//             id: true,
//           },
//         },
//       },
//     });

//     console.log(admins);

//   },
//   { connection }
// );
// export default worker;

// for (const admin of admins) {
//   if (admin.devices.length > 0) {
//     const devices = admin.devices.map(async (f) => {
//       const d = f.pushSubscription as CustomPushSubscription;
//       const res = await webpush.sendNotification(
//         d,
//         JSON.stringify({
//           title: "🆕 New Blog Post Published",
//           body: "un nouveau utilisateur GNDC ",
//           icon: "http://localhost:3000/api/avatar?username=elsahou",
//           url: "https://gndc.tech/blog/${blogId}",
//           badge: "/badge.png",
//           image: "/badge.png",
//         })
//       );
//     });
//   }
//   if (!admin.email) continue;

//   await transporter.sendMail({
//     from: '"GNDC Blog" <noreply@gndc.tech>',
//     to: admin.email,
//     subject: "🆕 New Blog Post Published",
//     html: `
//       <h2>New Blog Post</h2>
//       <p><strong>${title}</strong></p>
//       <p>${content.slice(0, 150)}...</p>
//       <a href="https://gndc.tech/blog/${blogId}">👉 Read Full Post</a>
//     `,
//   });
// }

// return { sent: admins.length };
