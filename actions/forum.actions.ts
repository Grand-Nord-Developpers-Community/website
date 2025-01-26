"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  ForumReply,
  forumPost,
  forumReply,
  userTable as user,
} from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Redis } from "@upstash/redis";
//import { columns } from "@/app/admin/employee/_components/employee-tables/columns";

const redis = Redis.fromEnv();

interface replyProps {
  postId: string;
  parentId: string | null;
  content: string;
}
export async function addForumReply({ postId, parentId, content }: replyProps) {
  const session = await auth();
  if (!session || !session.user) {
    return { notLoggedIn: true, error: "You must be logged in to reply" };
  }

  if (!content || !postId) {
    return { error: "Missing required fields" };
  }

  try {
    const insertedReply = await db
      .insert(forumReply)
      .values({
        content,
        postId,
        parentId,
        authorId: session.user.id,
      })
      .returning({ id: forumReply.id }); // Return the `id` of the inserted comment

    if (!insertedReply[0]) {
      throw new Error("Failed to insert the reply");
    }

    const data = await db.query.forumReply.findFirst({
      where: eq(forumReply.id, insertedReply[0].id), // Use the ID of the inserted reply
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            image: true,
            username: true,
            experiencePoints: true,
          },
        },
      },
    });
    console.log(data);
    revalidatePath(`/forum/${postId}`);
    return { success: true, result: data };
  } catch (error) {
    console.error("Error adding forum reply:", error);
    return { error: "Failed to add reply" };
  }
}

export async function createForumPost(
  title: string,
  content: string,
  textContent: string
) {
  const session = await auth();
  //@ts-ignore
  const id = session?.user.id ?? "";
  await db.insert(forumPost).values({
    title,
    content,
    authorId: id,
    textContent,
  });

  revalidatePath("/forum");
  revalidatePath("/user/dashboard");
  return {
    sucess: true,
  };
}

export async function getUserForumPosts(userId: string) {
  try {
    const posts = await db
      .select({
        id: forumPost.id,
        title: forumPost.title,
        content: forumPost.content,
        createdAt: forumPost.createdAt,
      })
      .from(forumPost)
      .where(eq(forumPost.authorId, userId))
      .orderBy(desc(forumPost.createdAt));
    //.limit(5)  // Limit to the 5 most recent posts

    return posts;
  } catch (e) {
    console.log("Error : " + e);
    return undefined;
  }
}

export async function getForumPosts() {
  const res = db.query.forumPost.findMany({
    orderBy: [desc(forumPost.createdAt)],
    columns: {
      score: true,
      textContent: true,
      title: true,
      content: true,
      createdAt: true,
      id: true,
    },
    with: {
      replies: true,
      author: {
        columns: {
          name: true,
          image: true,
          username: true,
        },
      },
    },
  });
  return res;
}
// Function to recursively build the reply tree
// function buildReplyTree(
//   replies: ForumReply[],
//   parentId: string | null = null
// ): any[] {
//   return replies
//     .filter((reply) => reply.parentId === parentId)
//     .map((reply) => ({
//       id: reply.id,
//       content: reply.content,
//       authorName: reply.author.name || "Anonymous",
//       createdAt: reply.createdAt.toISOString(),
//       replies: buildReplyTree(replies, reply.id),
//     }));
// }

// async function getForumPostWithReplies(postId: string) {
//   const post = await db.query.forumPost.findFirst({
//     where: eq(forumPost.id, postId),
//     with: {
//       author: true,
//       replies: {
//         with: {
//           author: true,
//         },
//       },
//     },
//   });

//   if (!post) {
//     return null;
//   }
//   return {
//     id: post.id,
//     title: post.title,
//     content: post.content,
//     authorName: post.author.name || "Anonymous",
//     createdAt: post.createdAt.toISOString(),
//     replies: buildReplyTree(post.replies),
//   };
// }
export async function deleteForum(id: string) {
  // Fetch blog to check if exists and get role
  const forumToDelete = await db.query.forumPost.findFirst({
    where: eq(forumPost.id, id),
  });

  if (!forumToDelete) {
    throw new Error("Forum introuvable !!");
  }

  // Perform the deletion
  await db.delete(forumPost).where(eq(forumPost.id, id));
  const pageKey = ["pageviews", "forums", id].join(":");
  await redis.del(pageKey);

  // Revalidate relevant paths
  revalidatePath("/user/dashboard");
  revalidatePath("/forum");
  revalidatePath("/");

  return {
    sucess: true,
    message: "forum supprimé avec succèss",
  };
}
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
  replies: ReplyWithAuthor[];
}

export async function getPostReplies(
  postId: string
): Promise<ReplyWithAuthor[]> {
  const replies = await db
    .select({
      id: forumReply.id,
      content: forumReply.content,
      createdAt: forumReply.createdAt,
      parentId: forumReply.parentId,
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      authorUsername: user.username,
      authorExperience: user.experiencePoints,
      score: forumReply.score,
    })
    .from(forumReply)
    .leftJoin(user, eq(forumReply.authorId, user.id))
    .where(eq(forumReply.postId, postId))
    .orderBy(desc(forumReply.createdAt));

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
  //console.log(JSON.stringify(topLevelReplies));
  return topLevelReplies;
}

export async function getForumPost(id: string) {
  const post = await db.query.forumPost.findFirst({
    where: eq(forumPost.id, id),
    with: {
      author: {
        columns: {
          username: true,
          //email: true,
          name: true,
          image: true,
          //bio: true,
          role: true,
          createdAt: true,
          experiencePoints: true,
        },
      },
    },
  });

  if (!post) {
    throw new Error("Forum post not found");
  }
  return post;
}
