"use server";

import { db } from "@/lib/db";
import { blogPost, blogComment } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { blogPublishSchema } from "@/schemas/blog-schema";
type blogValueProps = {
  title: string;
  description: string;
  preview: string;
  previewHash: string;
  content: string;
  authorId: string;
};
// Blog actions
export async function createBlogPost({
  title,
  description,
  preview,
  previewHash,
  content,
  authorId,
}: blogValueProps) {
  blogPublishSchema.parse({
    title,
    description,
    preview,
    previewHash,
    content,
  });
  const slug = slugify(title);
  const slugTitle = await db.query.blogPost.findFirst({
    where: eq(blogPost.slug, slug),
    columns: {
      id: true,
    },
  });
  if (slugTitle) {
    return {
      success: false,
      message: "Un blog avec ce même titre à été publié",
      revalidate: "title",
    };
  }
  const req = await db.insert(blogPost).values({
    title,
    description,
    preview,
    previewHash,
    content,
    slug,
    authorId,
  });

  if (!req) {
    return {
      success: false,
      message: "Un problème est survenue",
    };
  }

  revalidatePath("/blog");
  revalidatePath("/user/dashboard");
  
  return {
    success: true,
    message: "votre blog a été publié avec sucèss !!",
  };
}

export async function getBlogPosts() {
  try{
    const posts = await db.query.blogPost.findMany({
        orderBy: [desc(blogPost.createdAt)],
        with: {
          author: {
            columns: {
              email: true,
              name: true,
              image: true,
            },
          },
        },
        columns: {
          content: false,
          id: false,
        },
      });
    return posts
  }catch(e){
    console.log(e)
    throw('Error '+e)
  }
   
}

export async function getUserBlogPosts(userId: string) {
  const posts = await db
    .select({
      id: blogPost.id,
      title: blogPost.title,
      description: blogPost.description,
      createdAt: blogPost.createdAt,
      slug:blogPost.slug
    })
    .from(blogPost)
    .where(eq(blogPost.authorId, userId))
    .orderBy(desc(blogPost.createdAt));
  return posts;
}

export async function getBlogPost(slug: string) {
  try {
    const post = await db.query.blogPost.findFirst({
      where: eq(blogPost.slug, slug),
      with: {
        author: {
          columns: {
            email: true,
            name: true,
            image: true,
            bio: true,
            role:true,
            createdAt:true,
            experiencePoints:true,
          },
        }
      },
    });
    return post;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function deleteBlog(id: string) {
  // Fetch blog to check if exists and get role
  const blogToDelete = await db.query.blogPost.findFirst({
    where: eq(blogPost.id, id),
  });

  if (!blogToDelete) {
    throw new Error("Blog introuvable !!");
  }

  // Perform the deletion
  await db.delete(blogPost).where(eq(blogPost.id, id))

  // Revalidate relevant paths
  revalidatePath("/user/dashboard");
  revalidatePath("/blog");
  revalidatePath("/");

  return {
    sucess:true,
    message:"Blog supprimé avec succèss"
  }

}
export async function addBlogComment(
  postId: string,
  content: string,
  authorId: string,
) {
  await db.insert(blogComment).values({
    content,
    postId,
    authorId,
  });
  revalidatePath(`/blog/${postId}`);
}

// export async function addBlogReaction(postId: string, userId: string, type: string) {
//   await db.insert(blogReaction).values({
//     postId,
//     userId,
//     type,
//   })
//   revalidatePath(`/blog/${postId}`)
// }
