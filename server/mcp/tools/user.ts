import { z } from "zod";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const registerUserTools = (server: any) => {
  // List Users
  server.registerTool(
    "list_users",
    {
      description: "List users",
      inputSchema: z.object({
        page: z.number().default(0),
        pageSize: z.number().default(10),
        query: z.string().optional(),
      }),
    },
    async ({ page, pageSize, query }: any) => {
      const q = query;
      // @ts-ignore
      const results = await db.query.userTable.findMany({
        limit: pageSize,
        offset: page * pageSize,
        orderBy: [desc(userTable.createdAt)],
        // @ts-ignore
        where: (users, { like, or }) => {
          if (q)
            return or(
              like(users.name, `%${q}%`),
              like(users.username, `%${q}%`),
            );
        },
        columns: {
          id: true,
          name: true,
          username: true,
          email: true,
          role_id: true,
          createdAt: true,
        },
        with: {
          role: { columns: { name: true } },
        },
      });

      const baseUrl = process.env.BASE_URL || "http://localhost:3000";
      const resultsWithUrl = results.map((user) => ({
        ...user,
        url: `${baseUrl}/user/${user.username}`,
      }));

      return {
        content: [
          { type: "text", text: JSON.stringify(resultsWithUrl, null, 2) },
        ],
      };
    },
  );
};
