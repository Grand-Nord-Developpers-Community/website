"use server";

import { db } from "@/lib/db";
import { userLike } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function isUserLikedPost(postId: string, userId: string) {
  const result = await db
    .select()
    .from(userLike)
    .where(and(eq(userLike.postId, postId), eq(userLike.userId, userId)));

  return result[0] || null;
}

export async function likeDislikePost(
  postId: string,
  userId: string,
  isLiked: boolean | null
) {
  try {
    const userLikeStatus = await isUserLikedPost(postId, userId);

    if (userLikeStatus) {
      // If user already liked/disliked, update or remove
      if (isLiked === null) {
        // Remove like/dislike
        await db.delete(userLike).where(eq(userLike.id, userLikeStatus.id));
      } else {
        // Update like/dislike
        await db
          .update(userLike)
          .set({ isLike: isLiked })
          .where(eq(userLike.id, userLikeStatus.id));
      }
    } else if (isLiked !== null) {
      // If no prior like/dislike, insert new record
      await db.insert(userLike).values({ postId, userId, isLike: isLiked });
    }

    // Revalidate paths
    revalidatePath(`/blog/${postId}`);
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
