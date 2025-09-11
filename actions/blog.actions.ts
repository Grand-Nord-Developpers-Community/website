"use server";

import { db } from "@/lib/db";
import { blogPost } from "@/lib/db/schema";
import { eq, desc, and, count, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { blogPublishSchema } from "@/schemas/blog-schema";
import { auth } from "@/lib/auth";
import { addUserXP } from "./scoring.action";
import { addJob } from "./qeues.action";
import { notificationQueue } from "@/workers";

type blogValueProps = {
  id?: string;
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
  if (!slug) {
    return {
      success: false,
      message: "le titre de ce blog est invalide",
      revalidate: "title",
    };
  }
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
  const req = await db
    .insert(blogPost)
    .values({
      title,
      description,
      preview,
      previewHash,
      content,
      slug,
      authorId,
    })
    .returning();

  if (!req) {
    return {
      success: false,
      message: "Un problème est survenue",
    };
  }

  revalidatePath("/blog");
  revalidatePath("/user/dashboard");
  notificationQueue.add("BLOG_CREATED", { slug });
  return {
    success: true,
    message: "votre blog a été publié avec sucèss !!",
  };
}

export async function getBlogPosts() {
  try {
    const posts = await db.query.blogPost.findMany({
      orderBy: [desc(blogPost.createdAt)],
      where: eq(blogPost.isDraft, false),
      with: {
        author: {
          columns: {
            email: true,
            name: true,
            image: true,
            username: true,
          },
        },
        replies: {
          columns: {
            id: true,
          },
          with: {
            votes: true,
          },
        },
        likes: {
          columns: {
            isLike: true,
          },
        },
      },
      columns: {
        content: false,
        id: false,
      },
    });
    return posts;
  } catch (e) {
    console.log(e);
    throw "Error " + e;
  }
}

export async function getBlogPostsPaginated(page: number, pageSize: number) {
  const offset = page * pageSize;
  try {
    const posts = await db.query.blogPost.findMany({
      orderBy: [desc(blogPost.createdAt)],
      limit: pageSize,
      offset: offset,
      with: {
        author: {
          columns: {
            id: true,
            email: true,
            name: true,
            image: true,
            username: true,
          },
        },
        // replies: {
        //   columns: {
        //     id: true,
        //   },
        //   with: {
        //     votes: true,
        //   },
        // },
        // likes: {
        //   columns: {
        //     isLike: true,
        //   },
        // },
      },
      columns: {
        content: false,
      },
    });
    return posts;
  } catch (e) {
    console.log(e);
    return [];
    //throw "Error " + e;
  }
}

export async function getTotalBlogPosts() {
  try {
    const blogs = await db.select({ count: count() }).from(blogPost);
    return blogs[0].count;
  } catch (e) {
    console.log("Error : " + e);
    return 0;
  }
}
export async function getUserBlogPosts(userId: string) {
  const posts = await db.query.blogPost.findMany({
    orderBy: [desc(blogPost.createdAt)],
    where: eq(blogPost.authorId, userId),
    columns: {
      title: true,
      description: true,
      createdAt: true,
      isDraft: true,
      slug: true,
      id: true,
      content: true,
      like: true,
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
      likes: {
        columns: {
          isLike: true,
        },
      },
    },
  });
  return posts;
}
export async function getBlogPostPreview(slug: string) {
  try {
    const post = await db.query.blogPost.findFirst({
      where: and(eq(blogPost.slug, slug), eq(blogPost.isDraft, true)),
      with: {
        author: {
          columns: {
            email: true,
            name: true,
            image: true,
            bio: true,
            createdAt: true,
            experiencePoints: true,
            username: true,
          },
          with: {
            role: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });
    return post;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function updateBlogPost({
  id,
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
  const post = await db.query.blogPost.findFirst({
    where: eq(blogPost.id, id!),
    columns: {
      slug: true,
    },
    with: {
      author: {
        columns: {
          id: true,
        },
      },
    },
  });
  if (!post || post.author.id !== authorId) {
    return {
      success: false,
      message: "Un problème est survenue",
    };
  }
  if (post?.slug === slug && post?.author.id !== authorId) {
    return {
      success: false,
      message: "Un blog avec ce même titre à été publié",
      revalidate: "title",
    };
  }
  const res = await db
    .update(blogPost)
    .set({
      title,
      description,
      preview,
      previewHash,
      content,
      slug,
      isDraft: true,
    })
    .where(eq(blogPost.slug, post.slug))
    .returning();
  if (!res[0]) {
    return {
      success: false,
      message: "Un problème est survenue",
    };
  } else {
    revalidatePath("/blog");
    revalidatePath("/user/dashboard");
    return {
      success: true,
      message: "votre blog a été modifié avec sucèss !!",
    };
  }
}

export async function getBlogPostEdit(slug: string) {
  try {
    const { user } = await auth();
    if (!user) {
      return undefined;
    }
    const post = await db.query.blogPost.findFirst({
      where: and(eq(blogPost.slug, slug), eq(blogPost.authorId, user?.id!)),
    });
    return post;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
export async function getBlogPost(slug: string) {
  try {
    const post = await db.query.blogPost.findFirst({
      where: and(eq(blogPost.slug, slug), eq(blogPost.isDraft, false)),
      columns: {
        title: true,
        description: true,
        preview: true,
        previewHash: true,
        createdAt: true,
        id: true,
        slug: true,
        isDraft: true,
        authorId: true,
        content: true,
      },
      with: {
        author: {
          columns: {
            email: true,
            name: true,
            image: true,
            bio: true,
            createdAt: true,
            experiencePoints: true,
            username: true,
          },
          with: {
            role: {
              columns: {
                name: true,
              },
            },
          },
        },
        likes: {
          columns: {
            isLike: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function getBlogPostMeta(slug: string) {
  return db.query.blogPost.findFirst({
    where: and(eq(blogPost.slug, slug), eq(blogPost.isDraft, false)),
    columns: {
      title: true,
      description: true,
      preview: true,
      previewHash: true,
      createdAt: true,
      id: true,
      slug: true,
      isDraft: true,
      authorId: true,
    },
    with: {
      author: {
        columns: {
          email: true,
          name: true,
          image: true,
          bio: true,
          createdAt: true,
          experiencePoints: true,
          username: true,
        },
        with: {
          role: {
            columns: {
              name: true,
            },
          },
        },
      },
      likes: {
        columns: {
          isLike: true,
        },
      },
    },
  });
}

export async function getMoreBlogPosts(id: string, limit: number) {
  const posts = await db.query.blogPost.findMany({
    orderBy: [desc(blogPost.createdAt)],
    where: and(eq(blogPost.isDraft, false), not(eq(blogPost.id, id))),
    limit,
    with: {
      author: true,
      likes: true,
      replies: {
        columns: {
          id: true,
        },
        with: {
          votes: true,
        },
      },
    },
  });
  return posts;
}
export async function updateBlogVisibility({
  id,
  isDraft,
}: {
  id: string;
  isDraft: boolean;
}) {
  const post = await db.query.blogPost.findFirst({
    where: eq(blogPost.id, id!),
    columns: {
      id: true,
      isDraft: true,
    },
    with: {
      author: {
        columns: {
          id: true,
        },
      },
    },
  });
  if (!post) {
    return {
      success: false,
      message: "Un problème est survenue",
    };
  }

  const res = await db
    .update(blogPost)
    .set({
      isDraft: isDraft,
    })
    .where(eq(blogPost.id, post.id))
    .returning();
  if (!res[0]) {
    return {
      success: false,
      message: "Un problème est survenue",
    };
  } else {
    revalidatePath("/blog");
    revalidatePath("/user/dashboard");
    revalidatePath("/admin");
    if (!isDraft) {
      addUserXP(post.author.id, "ADD_BLOG");
    }
    return {
      success: true,
      message: "votre blog a été modifié avec sucèss !!",
    };
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
  await db.delete(blogPost).where(eq(blogPost.id, id));

  // Revalidate relevant paths
  revalidatePath("/user/dashboard");
  revalidatePath("/blog");
  revalidatePath("/");

  return {
    sucess: true,
    message: "Blog supprimé avec succèss",
  };
}
