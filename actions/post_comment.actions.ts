"use server";
import { postComment, userTable as user, userVote } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { eq, desc, or, inArray, and, not, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notEqual } from "assert";

export interface ReplyWithAuthor {
  id: string;
  content: string;
  createdAt: Date;
  score: number;
  parentId: string | null;
  author: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    exp: number;
  };
  votes: {
    userId: string;
    isUpvote: boolean;
  }[];
  replies: ReplyWithAuthor[];
}
interface replyProps {
  postId?: string | null;
  blogId?: string | null;
  parentId: string | null;
  content: string;
}

export async function addpostComment({
  postId = null,
  blogId = null,
  parentId,
  content,
}: replyProps) {
  const session = await auth();
  if (!session || !session.user) {
    return { notLoggedIn: true, error: "You must be logged in to reply" };
  }

  if (!content || (!postId && !blogId)) {
    return { error: "Missing required fields" };
  }

  try {
    const insertedReply = await db
      .insert(postComment)
      .values({
        content,
        postId,
        blogId,
        parentId,
        authorId: session.user.id,
      })
      .returning({ id: postComment.id }); // Return the `id` of the inserted comment

    if (!insertedReply[0]) {
      throw new Error("Failed to insert the reply");
    }
    const data = await db
      .select({
        id: postComment.id,
        content: postComment.content,
        score: postComment.score,
        authorId: postComment.authorId,
        createdAt: postComment.createdAt,
        updatedAt: postComment.updatedAt,
        postId: postComment.postId,
        blogId: postComment.blogId,
        parentId: postComment.parentId,
        author: {
          id: user.id,
          name: user.name,
          username: user.username,
          image: user.image,
          experiencePoints: user.experiencePoints,
        },
      })
      .from(postComment)
      .leftJoin(user, eq(postComment.authorId, user.id))
      .where(eq(postComment.id, insertedReply[0].id))
      .limit(1);

    if (!data[0]) {
      throw new Error(`Comment with ID ${insertedReply[0].id} not found.`);
    }
    console.log(data);
    revalidatePath(`/forum/${postId}`);
    return { success: true, result: data[0] };
  } catch (error) {
    console.error("Error adding forum reply:", error);
    return { error: "Failed to add reply" };
  }
}

interface PropsReply {
  postId?: string | null;
  blogId?: string | null;
}
export async function getPostReplies({
  postId = null,
  blogId = null,
}: PropsReply): Promise<ReplyWithAuthor[]> {
  if (!postId && !blogId) {
    throw new Error("PostId or blogId should be defined !!");
  }

  const fieldToFilter = postId ? postComment.postId : postComment.blogId;
  const valueToFilter = postId || blogId;

  const replies = await db
    .select({
      id: postComment.id,
      content: postComment.content,
      createdAt: postComment.createdAt,
      parentId: postComment.parentId,
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      authorUsername: user.username,
      authorExperience: user.experiencePoints,
      score: postComment.score,
    })
    .from(postComment)
    .leftJoin(user, eq(postComment.authorId, user.id))
    .where(eq(fieldToFilter, valueToFilter!))
    .orderBy(desc(postComment.createdAt));
  // Extract comment IDs
  const commentIds = replies.map((r) => r.id);

  if (commentIds.length === 0) return []; // Avoid unnecessary vote query if no comments
  const votes = await db
    .select({
      commentId: userVote.commentId,
      userId: userVote.userId,
      isUpvote: userVote.isUpvote,
    })
    .from(userVote)
    .where(
      and(
        inArray(userVote.commentId, commentIds),
        not(isNull(userVote.commentId))
      )
    );

  const voteMap = new Map<string, { userId: string; isUpvote: boolean }[]>();

  votes.forEach((vote) => {
    if (!voteMap.has(vote.commentId!)) {
      voteMap.set(vote.commentId!, []);
    }
    voteMap.get(vote.commentId!)!.push({
      userId: vote.userId,
      isUpvote: vote.isUpvote,
    });
  });

  //console.table(replies);
  const replyMap = new Map<string, ReplyWithAuthor>();

  replies.forEach((reply) => {
    replyMap.set(reply.id, {
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt,
      score: reply?.score!,
      parentId: reply.parentId,
      author: {
        id: reply.authorId!,
        name: reply.authorName,
        image: reply.authorImage,
        username: reply.authorUsername,
        exp: reply.authorExperience || 0,
      },
      votes: voteMap.get(reply.id) || [],
      replies: [],
    });
  });

  const topLevelReplies: ReplyWithAuthor[] = [];

  replies.forEach((reply) => {
    const replyWithAuthor = replyMap.get(reply.id)!;
    if (reply.parentId) {
      const parentReply = replyMap.get(reply.parentId);
      if (parentReply) {
        parentReply.replies.push(replyWithAuthor);
      }
    } else {
      topLevelReplies.push(replyWithAuthor);
    }
  });
  console.log(JSON.stringify(votes));
  return topLevelReplies;
}

export async function deletePostComment(commentId: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be logged in to update a comment");
  }

  // Fetch blog to check if exists and get role
  const commentToDelete = await db.query.postComment.findFirst({
    where: eq(postComment.id, commentId),
  });

  if (!commentToDelete) {
    throw new Error("Commentaire introuvable !!");
  }

  // Perform the deletion
  await db.delete(postComment).where(eq(postComment.id, commentId));

  return {
    sucess: true,
    message: "forum supprimé avec succèss",
  };
}

export async function updatePostComment(commentId: string, content: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be logged in to update a comment");
  }

  const commentToUpdate = await db.query.postComment.findFirst({
    where: eq(postComment.id, commentId),
  });

  if (!commentToUpdate) {
    throw new Error("Comment not found");
  }

  if (commentToUpdate.authorId !== session.user.id) {
    throw new Error("You are not the author of this comment");
  }

  const data = await db
    .update(postComment)
    .set({ content: content, updatedAt: new Date() })
    .where(eq(postComment.id, commentId))
    .returning({
      content: postComment.content,
      updatedAt: postComment.updatedAt,
    });

  if (!data[0]) {
    throw new Error("Comment not updated");
  }
  return {
    success: true,
    result: data[0],
  };
}
