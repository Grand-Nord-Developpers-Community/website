"use server";

import { db } from "@/lib/db";
import { forumPost, postComment, userVote } from "@/lib/db/schema";
import { and, eq, isNull, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { addUserXP, removeUserXP } from "./scoring.action";
import { addJob } from "./qeues.action";
import { notificationQueue } from "@/workers";

export async function isuserVotedPost({
  postId,
  userId,
  commentId,
}: {
  postId: string | null;
  userId: string;
  commentId: string | null;
}) {
  const fieldSelect = commentId ? userVote.commentId : userVote.postId;
  const valueField = commentId ? commentId : postId;
  const result = await db
    .select()
    .from(userVote)
    .where(
      and(
        eq(userVote.userId, userId),
        commentId
          ? eq(userVote.commentId, commentId)
          : eq(userVote.postId, postId!)
      )
    );
  // .where(
  //   and(
  //     eq(fieldSelect, valueField!),
  //     postId ? isNull(userVote.commentId) : not(isNull(userVote.commentId))
  //   )
  // );

  return result[0] || null;
}

type Props = {
  postId?: string | null;
  commentId?: string | null;
  userId: string;
  isUpvote: boolean | null;
};

export async function upVotePost({
  postId = null,
  commentId = null,
  userId,
  isUpvote,
}: Props) {
  try {
    const userVoteStatus = await isuserVotedPost({ postId, userId, commentId });

    // Figure out who should receive XP (author of post/comment)
    let targetUserId: string | null = null;
    if (postId) {
      const post = await db.query.forumPost.findFirst({
        where: eq(forumPost.id, postId),
        columns: { id: true, authorId: true },
        with: {
          replies: {
            where: eq(postComment.id, commentId!),
            columns: {
              authorId: true,
              content: true,
            },
          },
        },
      });
      // console.log(post?.replies[0].authorId);
      // console.log(post?.replies[0].content);
      targetUserId = post?.replies?.[0]?.authorId ?? post?.authorId ?? null;
    } else if (commentId) {
      const comment = await db.query.postComment.findFirst({
        where: eq(postComment.id, commentId),
        columns: { authorId: true },
      });
      targetUserId = comment?.authorId ?? null;
    }

    if (!targetUserId) {
      // throw new Error("Target user not found for XP update");
      return {
        success: false,
        message: "Target user not found for XP update",
        error: "Target user not found for XP update",
      };
    }

    if (userVoteStatus) {
      if (isUpvote === null) {
        // Remove vote
        await db.delete(userVote).where(eq(userVote.id, userVoteStatus.id));

        if (userVoteStatus.isUpvote) {
          await removeUserXP(targetUserId, "UPVOTED_COMMENT");
        }
      } else if (userVoteStatus.isUpvote === isUpvote) {
        // Same vote → remove
        await db.delete(userVote).where(eq(userVote.id, userVoteStatus.id));

        if (isUpvote) {
          await removeUserXP(targetUserId, "UPVOTED_COMMENT");
        }
      } else {
        // Toggle vote
        await db
          .update(userVote)
          .set({ isUpvote })
          .where(eq(userVote.id, userVoteStatus.id));

        if (isUpvote) {
          await addUserXP(targetUserId, "UPVOTED_COMMENT");
        } else if (userVoteStatus.isUpvote) {
          await removeUserXP(targetUserId, "UPVOTED_COMMENT");
        }
      }
    } else if (isUpvote !== null) {
      // New vote
      const insertData = commentId
        ? { commentId, userId, isUpvote }
        : { postId, userId, isUpvote };

      const res = await db.insert(userVote).values(insertData).returning();

      if (isUpvote) {
        await addUserXP(targetUserId, "UPVOTED_COMMENT");
        notificationQueue.add("UPVOTED", {
          commentId: res[0].commentId!,
          targetUserId,
          userId,
        });
      }
    }

    revalidatePath(`/forum`);
    revalidatePath(`/blog`);
    revalidatePath(`/user/dashboard`);

    return { success: true };
  } catch (error) {
    console.error("Error handling vote:", error);
    return { success: false, error: "Vote failed" };
  }
}
// export async function upVotePost({
//   postId = null,
//   commentId = null,
//   userId,
//   isUpvote,
// }: Props) {
//   try {
//     const userVoteStatus = await isuserVotedPost({ postId, userId, commentId });

//     if (userVoteStatus) {

//       if (isUpvote === null) {
//         // User wants to remove their vote - DELETE the vote record
//         await db.delete(userVote).where(eq(userVote.id, userVoteStatus.id));
//       } else if (userVoteStatus.isUpvote === isUpvote) {
//         // Remove like/dislike
//         await db.delete(userVote).where(eq(userVote.id, userVoteStatus.id));
//       } else {
//         // Update like/dislike
//         await db
//           .update(userVote)
//           .set({ isUpvote: isUpvote! })
//           .where(eq(userVote.id, userVoteStatus.id));

//       }
//     } else if (isUpvote !== null) {
//       const insertData = commentId
//         ? { commentId, userId, isUpvote }
//         : { postId, userId, isUpvote };

//       await db.insert(userVote).values(insertData);
//       //await db.insert(userVote).values({ postId, commentId, userId, isUpvote });
//     }

//     // Revalidate paths
//     //revalidatePath(`/forum/${postId}`);
//     revalidatePath(`/forum`);
//     revalidatePath(`/blog`);
//     revalidatePath(`/user/dashboard`);

//     return { success: true };
//   } catch (error) {
//     console.error("Error handling like/dislike:", error);
//     return {
//       success: false,
//       error: "An error occurred while processing your request",
//     };
//   }
// }
