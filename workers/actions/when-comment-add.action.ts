import { db } from "@/lib/db";
import { JobPayloads } from "../jobs";
import { blogPost, forumPost, postComment, userTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { sendNotification } from "./(common)/notification";
import { baseUrl } from "@/emails/base-layout";

export default async function whenCommentAdded(
  data: JobPayloads["COMMENT_ADDED"],
  via: boolean = true
) {
  const { commentAuthorId, comment } = data;

  if (!via) {
    console.log("via web ...");
  }
  if (via) {
    console.log("Via jobs");
  }

  const user = await db.query.userTable.findFirst({
    columns: {
      name: true,
      image: true,
      username: true,
    },
    where: eq(userTable.id, commentAuthorId),
  });

  if (!user) {
    return;
  }
  //notify the post creator
  const post = comment.blogId;
  let slug = "";
  if (post) {
    const blog = await db.query.blogPost.findFirst({
      columns: {
        id: true,
        title: true,
        slug: true,
      },
      where: eq(blogPost.id, post),
      with: {
        author: {
          columns: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
          with: {
            devices: true,
          },
        },
      },
    });

    if (blog) {
      slug = blog.slug;
      blog.author.devices.map(async (device) => {
        await sendNotification({
          data: {
            title: `Votre Blog : ${blog.title.slice(0, 6)}... à été commenter `,
            body: `par ${user?.name} : ${comment.content.slice(0, 6)}...`,
            icon: `${user?.image ?? `/api/avatar?username=${user?.username}`}`,
            url: `${baseUrl}/blog/${blog.slug}`,
            //badge: "/badge.png",
            image: `/api/og/blog/${blog.slug}`,
          },
          device,
        });
      });
    }
  }

  //if it is forum
  const forumId = comment.postId;
  if (forumId) {
    const forum = await db.query.forumPost.findFirst({
      columns: {
        id: true,
        title: true,
      },
      where: eq(forumPost.id, forumId),
      with: {
        author: {
          columns: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
          with: {
            devices: true,
          },
        },
      },
    });

    if (forum) {
      forum.author.devices.map(async (device) => {
        await sendNotification({
          data: {
            title: `Votre Forum : ${forum.title.slice(0, 6)}... à été répondu `,
            body: `par ${user?.name} : ${comment.content.slice(0, 6)}...`,
            icon: `${user?.image ?? `/api/avatar?username=${user?.username}`}`,
            url: `${baseUrl}/forum/${forum.id}`,
            //badge: "/badge.png",
            image: `/api/og/forum/${forum.id}`,
          },
          device,
        });
      });
    }
  }

  //notify the reply author other if it is a reply
  const commentAuthor = comment.parentId;
  if (commentAuthor) {
    const commentR = await db.query.postComment.findFirst({
      columns: {
        id: true,
        content: true,
      },
      where: eq(postComment.parentId, commentAuthor),
      with: {
        author: {
          columns: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
          with: {
            devices: true,
          },
        },
      },
    });
    if (commentR) {
      const author = commentR.author;
      if (author.devices.length > 0) {
        author.devices.map(async (device) => {
          await sendNotification({
            data: {
              title: `Votre commentaire : ${comment.content.slice(0, 6)}... à été répondu `,
              body: `par ${user?.name} : ${comment.content.slice(0, 6)}...`,
              icon: `${user.image ?? `/api/avatar?username=${user?.username}`}`,
              url: `${baseUrl}/${slug ? `blog/${slug}` : `forum/${comment.postId}`}`,
              //badge: "/badge.png",
              image: `/api/og/${slug ? `blog/${slug}` : `forum/${comment.postId}`}`,
            },
            device,
          });
        });
      }
    }
  }

  console.log(data);
}
