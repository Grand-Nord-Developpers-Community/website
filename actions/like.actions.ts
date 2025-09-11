"use server";

import { db } from "@/lib/db";
import { blogPost, userLike } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { addUserXP, removeUserXP } from "./scoring.action";
import { addJob } from "./qeues.action";
import { notificationQueue } from "@/workers";

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

    // Find the blog author (they’re the one rewarded)
    const post = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, postId),
      columns: { authorId: true },
    });

    if (!post?.authorId) {
      return {
        success: false,
        error: "An error occurred while processing your request",
      };
    }

    if (userLikeStatus) {
      if (isLiked === null) {
        // Remove like/dislike
        await db.delete(userLike).where(eq(userLike.id, userLikeStatus.id));

        if (userLikeStatus.isLike) {
          await removeUserXP(post.authorId, "LIKE_RECEIVED");
        }
      } else {
        // Update like/dislike
        await db
          .update(userLike)
          .set({ isLike: isLiked })
          .where(eq(userLike.id, userLikeStatus.id));

        // If toggling: only act on LIKE -> XP
        if (isLiked && !userLikeStatus.isLike) {
          await addUserXP(post.authorId, "LIKE_RECEIVED");
        } else if (!isLiked && userLikeStatus.isLike) {
          await removeUserXP(post.authorId, "LIKE_RECEIVED");
        }
      }
    } else if (isLiked !== null) {
      // Insert new record
      await db.insert(userLike).values({ postId, userId, isLike: isLiked });

      if (isLiked) {
        await addUserXP(post.authorId, "LIKE_RECEIVED");
        notificationQueue.add("BLOG_LIKED", { blogId: postId, userId });
      }
    }

    // Revalidate paths
    revalidatePath(`/blog`);
    revalidatePath(`/`);
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

// export async function likeDislikePost(
//   postId: string,
//   userId: string,
//   isLiked: boolean | null
// ) {
//   try {
//     const userLikeStatus = await isUserLikedPost(postId, userId);

//     if (userLikeStatus) {
//       // If user already liked/disliked, update or remove
//       if (isLiked === null) {
//         // Remove like/dislike
//         await db.delete(userLike).where(eq(userLike.id, userLikeStatus.id));
//       } else {
//         // Update like/dislike
//         await db
//           .update(userLike)
//           .set({ isLike: isLiked })
//           .where(eq(userLike.id, userLikeStatus.id));
//       }
//     } else if (isLiked !== null) {
//       // If no prior like/dislike, insert new record
//       await db.insert(userLike).values({ postId, userId, isLike: isLiked });
//     }

//     // Revalidate paths
//     //revalidatePath(`/blog/${postId}`);
//     revalidatePath(`/blog`);
//     revalidatePath(`/`);
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
