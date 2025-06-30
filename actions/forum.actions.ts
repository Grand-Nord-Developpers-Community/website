"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { forumPost } from "@/lib/db/schema";
import { eq, desc, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Redis } from "@upstash/redis";
//import { columns } from "@/app/admin/employee/_components/employee-tables/columns";

const redis = Redis.fromEnv();

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

export async function getTotalForumPosts() {
  try {
    const forums = await db.select({ count: count() }).from(forumPost);
    return forums[0].count;
  } catch (e) {
    console.log("Error : " + e);
    return 0;
  }
}

export async function getUserForumPosts(userId: string) {
  try {
    const posts = await db.query.forumPost.findMany({
      orderBy: [desc(forumPost.createdAt)],
      where: eq(forumPost.authorId, userId),
      columns: {
        score: true,
        textContent: true,
        title: true,
        content: true,
        createdAt: true,
        id: true,
      },
      with: {
        replies: {
          columns: {
            id: true,
          },
          with: {
            votes: true,
          },
        },
        votes: {
          columns: {
            id: true,
            isUpvote: true,
          },
        },
      },
    });
    // const posts = await db
    //   .select({
    //     id: forumPost.id,
    //     title: forumPost.title,
    //     content: forumPost.content,
    //     createdAt: forumPost.createdAt,
    //   })
    //   .from(forumPost)
    //   .where(eq(forumPost.authorId, userId))
    //   .orderBy(desc(forumPost.createdAt));
    //.limit(5)  // Limit to the 5 most recent posts

    return posts;
  } catch (e) {
    console.log("Error : " + e);
    return undefined;
  }
}

export async function updateForumPost(
  id: string,
  title: string,
  content: string,
  textContent: string
) {
  const forumPostToUpdate = await db.query.forumPost.findFirst({
    where: eq(forumPost.id, id),
  });

  if (!forumPostToUpdate) {
    throw new Error("Forum post not found");
  }
  const res = await db
    .update(forumPost)
    .set({
      title,
      content,
      textContent,
    })
    .where(eq(forumPost.id, id))
    .returning();
  if (!res[0]) {
    throw new Error("Forum post not found");
  }
  revalidatePath("/user/dashboard");
  revalidatePath("/forum");
  revalidatePath("/");
  return {
    sucess: true,
    message: "forum modifié avec succèss",
  };
}

export async function getForumPosts() {
  const res = await db.query.forumPost.findMany({
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
      replies: {
        columns: {
          id: true,
        },
        with: {
          votes: true,
        },
      },
      author: {
        columns: {
          name: true,
          image: true,
          username: true,
        },
      },
      votes: {
        columns: {
          id: true,
          isUpvote: true,
        },
      },
    },
  });
  return res;
}

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
  try {
    await redis.del(pageKey);
  } catch (error) {
    console.error("Redis deletion failed:", error);
  }

  // Revalidate relevant paths
  revalidatePath("/user/dashboard");
  revalidatePath("/forum");
  revalidatePath("/");

  return {
    sucess: true,
    message: "forum supprimé avec succèss",
  };
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
      votes: {
        columns: {
          userId: true,
          isUpvote: true,
          commentId: true,
        },
      },
    },
  });

  if (!post) {
    return undefined;
    //throw new Error("Forum post not found");
  }
  return post;
}
