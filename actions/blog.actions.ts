'use server'

import { db } from '@/lib/db'
import { blogPost, blogComment } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'

// Blog actions
export async function createBlogPost(title: string, content: string, authorId: string) {
  const slug = slugify(title)
  await db.insert(blogPost).values({
    title,
    content,
    slug,
    authorId,
  })
  revalidatePath('/blog')
}

export async function getBlogPosts() {
  return db.query.blogPost.findMany({
    orderBy: [desc(blogPost.createdAt)],
    with: {
      author: true,
    },
  })
}

export async function getBlogPost(slug: string) {
  const post = await db.query.blogPost.findFirst({
    where: eq(blogPost.slug, slug),
    with: {
      author: true,
      comments: {
        with: {
          author: true,
        },
      },
      reactions: true,
    },
  })
  if (!post) {
    throw new Error('Blog post not found')
  }
  return post
}

export async function addBlogComment(postId: string, content: string, authorId: string) {
  await db.insert(blogComment).values({
    content,
    postId,
    authorId,
  })
  revalidatePath(`/blog/${postId}`)
}

// export async function addBlogReaction(postId: string, userId: string, type: string) {
//   await db.insert(blogReaction).values({
//     postId,
//     userId,
//     type,
//   })
//   revalidatePath(`/blog/${postId}`)
// }
