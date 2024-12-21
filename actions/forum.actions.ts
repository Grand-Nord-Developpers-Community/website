'use server'
import {auth} from "@/auth"
import { db } from '@/lib/db'
import { forumPost, forumReply, user } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
export async function createForumPost(title: string, content: string) {
  const session= await auth()
  //@ts-ignore
  const id=session?.user.id??"";
  await db.insert(forumPost).values({
    title,
    content,
    authorId:id
  })

  revalidatePath('/forum')
  revalidatePath('/user/dashboard')
  return {
    sucess:true
  }
}

export async function getUserForumPosts(userId: string) {
  try{
      const posts = await db.select({
      id: forumPost.id,
      title: forumPost.title,
      content:forumPost.content,
      createdAt: forumPost.createdAt,
    })
    .from(forumPost)
    .where(eq(forumPost.authorId, userId))
    .orderBy(desc(forumPost.createdAt))
    //.limit(5)  // Limit to the 5 most recent posts

    return posts
  }catch(e){
    console.log("Error : "+e)
    return undefined
  }
  
}

export async function getForumPosts() {
  try{
  const res= db.query.forumPost.findMany({
    orderBy: [desc(forumPost.createdAt)],
    with: {
      author: true,
      //votes: true,
    },
  })
  return res
   }catch(e){
    console.log("Error : "+e)
    return undefined
  }
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
  await db.delete(forumPost).where(eq(forumPost.id, id))

  // Revalidate relevant paths
  revalidatePath("/user/dashboard");
  revalidatePath("/forum");
  revalidatePath("/");

  return {
    sucess:true,
    message:"forum supprimé avec succèss"
  }

}
export async function getForumPost(id: string) {
  const post = await db.query.forumPost.findFirst({
    where: eq(forumPost.id, id),
    with: {
      author: {
        columns:{
          email:true,
          name: true,
          image: true,
          bio: true,
          role:true,
          createdAt:true,
          experiencePoints:true,
        }
      },
      replies: {
        with: {
          author: true,
          //votes: true,
        },
      },
      //votes: true,
    },
  })
  if (!post) {
    throw new Error('Forum post not found')
  }
  return post
}

export async function addForumReply(postId: string, content: string, authorId: string) {
  await db.insert(forumReply).values({
    content,
    postId,
    authorId,
  })
  revalidatePath(`/forum/${postId}`)
}

// export async function addForumVote(postId: string, userId: string, voteType: 'upvote' | 'downvote', replyId?: string) {
//   await db.insert(forumVote).values({
//     postId,
//     userId,
//     voteType,
//     replyId,
//   })
  
//   if (voteType === 'upvote') {
//     const votedContent = replyId 
//       ? await db.query.forumReply.findFirst({ where: eq(forumReply.id, replyId), with: { author: true } })
//       : await db.query.forumPost.findFirst({ where: eq(forumPost.id, postId), with: { author: true } })
    
//     if (votedContent) {
//       await db.update(user)
//         .set({ experiencePoints: user?.experiencePoints||0 + 1 })
//         .where(eq(user.id, votedContent.author.id))
//     }
//   }
  
//   revalidatePath(`/forum/${postId}`)
// }
