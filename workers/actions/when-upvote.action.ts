import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { and, eq, inArray } from "drizzle-orm";
import { postComment, userTable } from "@/lib/db/schema";
import { sendNotification } from "./(common)/notification";
import { ScoringPoints } from "@/constants/scoring";
import { baseUrl } from "@/emails/base-layout";

export default async function whenVoted(
  data: JobPayloads["UPVOTED"],
  via: boolean = true
) {
  const { commentId, userId, targetUserId } = data;
  // Fetch admins
  if (!via) {
    console.log("via web ...");
  }
  if (via) {
    console.log("Via jobs");
  }
  const users = await db.query.userTable.findMany({
    columns: {
      name: true,
      username: true,
      image: true,
      id: true,
    },
    where: inArray(userTable.id, [userId, targetUserId]),
    with: {
      devices: true,
    },
  });
  if (!users || users.length < 2) {
    return;
  }

  const author = users.filter((u) => u.id === targetUserId)[0];
  const user = users.filter((u) => u.id === userId)[0];
  const comment = await db.query.postComment.findFirst({
    columns: {
      id: true,
      content: true,
    },
    where: and(
      eq(postComment.id, commentId),
      eq(postComment.authorId, targetUserId)
    ),
    with: {
      post: true,
      blog: true,
    },
  });
  if (!comment) {
    return;
  }

  if (author.devices.length > 0) {
    author.devices.map(async (device) => {
      await sendNotification({
        data: {
          title: `Votre commentaire : ${comment.content.slice(0, 6)}... à été upvoter `,
          body: `par ${user?.name} : vous avez réçu +${ScoringPoints["UPVOTED_COMMENT"]} XP`,
          icon: `${user.image ?? `/api/avatar?username=${user?.username}`}`,
          url: `${baseUrl}/${comment.blog ? `blog/${comment.blog.slug}` : `forum/${comment.post?.id}`}`,
          //badge: "/badge.png",
          image: `/api/og/${comment.blog ? `blog/${comment.blog.slug}` : `forum/${comment.post?.id}`}`,
        },
        device,
      });
    });
  }

  console.log(data);
}
