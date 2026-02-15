import { z } from "zod";
import { db } from "@/lib/db";
import { forumPost } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const registerForumTools = (server: any) => {
  // List Forums
  server.registerTool(
    "list_forums",
    {
      description: "List forum posts",
      inputSchema: z.object({
        page: z.number().default(0),
        pageSize: z.number().default(10),
        query: z.string().optional(),
      }),
    },
    async ({ page, pageSize, query }: any) => {
      const q = query;
      // @ts-ignore
      const results = await db.query.forumPost.findMany({
        limit: pageSize,
        offset: page * pageSize,
        orderBy: [desc(forumPost.createdAt)],
        // @ts-ignore
        where: (forums, { like, or }) => {
          if (q)
            return or(
              like(forums.title, `%${q}%`),
              like(forums.textContent, `%${q}%`),
            );
        },
        with: {
          author: { columns: { username: true, name: true } },
        },
      });

      const baseUrl = process.env.BASE_URL || "http://localhost:3000";
      const resultsWithUrl = results.map((forum) => ({
        ...forum,
        url: `${baseUrl}/forum/${forum.id}`,
      }));

      return {
        content: [{ type: "text", text: JSON.stringify(resultsWithUrl, null, 2) }],
      };
    },
  );

  // Create Forum
  server.registerTool(
    "create_forum",
    {
      description: "Create a new forum post",
      inputSchema: z.object({
        title: z.string(),
        content: z.string(),
        textContent: z.string(),
      }),
    },
    async ({ title, content, textContent }: any, extra: any) => {
      const userId = extra.authInfo?.extra?.userId as string | undefined
      const permissions = extra.authInfo?.extra?.permissions as string[]|undefined
      
      if(!permissions?.includes("bot:write")){
        throw new Error("Forbidden: Insufficient permissions to create a blog post.");
      }
      if (!userId) throw new Error("Unauthorized");

      const result = await db
        .insert(forumPost)
        .values({
          title,
          content,
          textContent,
          authorId: userId,
        })
        .returning();
      return {
        content: [{ type: "text", text: JSON.stringify(result[0], null, 2) }],
      };
    },
  );
};
