import { z } from "zod";
import { db } from "@/lib/db";
import { blogPost } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { marked } from "marked";
import { updateBlogVisibility } from "@/actions/blog.actions";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export const registerBlogTools = (server: any) => {
  // List Blogs
  server.registerTool(
    "list_blogs",
    {
      description: "List blog posts with pagination and search",
      inputSchema: z.object({
        page: z.number().default(0),
        pageSize: z.number().default(10),
        query: z.string().optional(),
        isDraft: z.boolean().default(false),
      }),
    },
    async ({ page, pageSize, query, isDraft }: any) => {
      const q = query;
      // @ts-ignore
      const results = await db.query.blogPost.findMany({
        limit: pageSize,
        offset: page * pageSize,
        orderBy: [desc(blogPost.createdAt)],
        // @ts-ignore
        where: (blogs, { and, eq, like, or }) => {
          const conds = [];
          if (q)
            conds.push(
              or(
                like(blogs.title, `%${q}%`),
                like(blogs.description, `%${q}%`),
              ),
            );
          conds.push(eq(blogs.isDraft, isDraft));
          return and(...conds);
        },
        with: {
          author: {
            columns: { username: true, name: true, email: true },
          },
        },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      };
    },
  );

  // Create Blog
  server.registerTool(
    "create_blog",
    {
      description: "Create a new blog post",
      inputSchema: z.object({
        title: z.string(),
        description: z.string(),
        content: z
          .string()
          .describe("the mardown format content of the blog"),
        preview: z.string(),
        previewHash: z.string().default(""),
        tags: z.string().optional(),
      }),
    },
    async (args: any, extra: any) => {
      const userId = extra.authInfo?.extra?.userId as string | undefined;
      const permissions = extra.authInfo?.extra?.permissions as
        | string[]
        | undefined;
      if (!permissions?.includes("bot:write")) {
        throw new Error(
          "Forbidden: Insufficient permissions to create a blog post.",
        );
      }
      if (!userId) {
        throw new Error(
          "Unauthorized: No user context found. Please provide a valid API Token.",
        );
      }

      const { title, description, content, preview, previewHash, tags } =
        args;
      const slug = slugify(title);

      const existing = await db.query.blogPost.findFirst({
        where: eq(blogPost.slug, slug),
      });
      if (existing) throw new Error("A blog with this title already exists.");

      const render = await marked(content);
      const result = await db
        .insert(blogPost)
        .values({
          title,
          description,
          content: render,
          preview,
          previewHash,
          tags: tags || null,
          authorId: userId,
          slug,
        })
        .returning();

      return {
        content: [{ type: "text", text: JSON.stringify(result[0], null, 2) }],
      };
    },
  );

  // Toggle Blog Visibility
  server.registerTool(
    "toggle_blog_visibility",
    {
      description: "Toggle the visibility (draft status) of a blog post",
      inputSchema: z.object({
        id: z.string().describe("The UUID of the blog post"),
        isDraft: z
          .boolean()
          .describe("Set to true to make it a draft, false to publish"),
      }),
    },
    async ({ id, isDraft }: any, extra: any) => {
      //const userId = authContext.getStore();
      const userId = extra.authInfo?.extra?.userId as string | undefined;
      
      if (!userId) throw new Error("Unauthorized");

      // We use the existing server action to benefit from XP and trigger side-effects
      const result = await updateBlogVisibility({ id, isDraft });

      if (!result.success) {
        throw new Error(result.message || "Failed to update blog visibility");
      }

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );
};
