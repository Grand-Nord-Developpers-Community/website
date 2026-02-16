import { z } from "zod";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { desc, eq, sql, count, and, asc } from "drizzle-orm";

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
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
      }),
    },
    async ({ page, pageSize, query, sortOrder }: any) => {
      const q = query;
      // @ts-ignore
      const results = await db.query.userTable.findMany({
        limit: pageSize,
        offset: page * pageSize,
        orderBy: [sortOrder === "asc" ? asc(userTable.createdAt) : desc(userTable.createdAt)],
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

  // Get Leaderboard
  server.registerTool(
    "get_leaderboard",
    {
      description: "Get the user leaderboard sorted by experience points",
      inputSchema: z.object({
        page: z.number().default(0),
        pageSize: z.number().default(10),
      }),
    },
    async ({ page, pageSize }: any) => {
      // @ts-ignore
      const results = await db.query.userTable.findMany({
        limit: pageSize,
        offset: page * pageSize,
        orderBy: [desc(userTable.experiencePoints), desc(userTable.createdAt), desc(userTable.id)],
        columns: {
          id: true,
          name: true,
          username: true,
          experiencePoints: true,
          image: true,
        },
      });

      // Add rank to the results (based on page/offset)
      const resultsWithRank = results.map((user, index) => ({
        ...user,
        rank: page * pageSize + index + 1,
      }));

      return {
        content: [
          { type: "text", text: JSON.stringify(resultsWithRank, null, 2) },
        ],
      };
    },
  );

  // Get User Rank
  server.registerTool(
    "get_user_rank",
    {
      description: "Get the rank of a specific user based on experience points",
      inputSchema: z.object({
        username: z.string().describe("The username of the user"),
      }),
    },
    async ({ username }: any) => {
      const user = await db.query.userTable.findFirst({
        where: eq(userTable.username, username),
        columns: {
          id: true,
          username: true,
          experiencePoints: true,
        },
      });

      if (!user) {
        throw new Error(`User with username '${username}' not found.`);
      }

      const rankResult = await db
        .select({ count: count() })
        .from(userTable)
        .where(sql`${userTable.experiencePoints} > ${user.experiencePoints || 0}`);

      const rank = rankResult[0].count + 1;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                username: user.username,
                experiencePoints: user.experiencePoints,
                rank: rank,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
};
