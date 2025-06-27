"use server";

import { db } from "@/lib/db";
import { userVote } from "@/lib/db/schema";
import { and, eq, isNull, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

    if (userVoteStatus) {
      // If user already liked/disliked, update or remove
      if (userVoteStatus.isUpvote === isUpvote) {
        // Remove like/dislike
        await db.delete(userVote).where(eq(userVote.id, userVoteStatus.id));
      } else {
        // Update like/dislike
        await db
          .update(userVote)
          .set({ isUpvote: isUpvote! })
          .where(eq(userVote.id, userVoteStatus.id));
      }
    } else if (isUpvote !== null) {
      const insertData = commentId
        ? { commentId, userId, isUpvote }
        : { postId, userId, isUpvote };

      await db.insert(userVote).values(insertData);
      //await db.insert(userVote).values({ postId, commentId, userId, isUpvote });
    }

    // Revalidate paths
    //revalidatePath(`/forum/${postId}`);
    revalidatePath(`/forum`);
    revalidatePath(`/blog`);
    revalidatePath(`/user/dashboard`);

    return { success: true };
  } catch (error) {
    console.error("Error handling like/dislike:", error);
    return {
      success: false,
      error: "An error occurred while processing your request",
    };
  }
}
