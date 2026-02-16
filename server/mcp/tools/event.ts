import { z } from "zod";
import { db } from "@/lib/db";
import { event } from "@/lib/db/schema";
import { desc, asc } from "drizzle-orm";

export const registerEventTools = (server: any) => {
  // List Events
  server.registerTool(
    "list_events",
    {
      description: "List upcoming events with pagination and search",
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
      const results = await db.query.event.findMany({
        limit: pageSize,
        offset: page * pageSize,
        orderBy: [sortOrder === "asc" ? asc(event.createdAt) : desc(event.createdAt)],
        // @ts-ignore
        where: (events, { and, like, or, gte }) => {
          const conds = [];
          
          // Filter by search query
          if (q) {
            conds.push(
              or(
                like(events.title, `%${q}%`),
                like(events.description, `%${q}%`),
                like(events.location, `%${q}%`)
              ),
            );
          }
          
          // Only show future events or recent ones? 
          // Let's not restrict by date strictly unless requested, 
          // but ordering by datetime makes sense.
          
          return and(...conds);
        },
        with: {
          creator: {
            columns: { username: true, name: true, image: true },
          },
        },
      });

      const baseUrl = process.env.BASE_URL || "http://localhost:3000";
      // Construct a URL if there's a specific event page, e.g. /events/:id
      const resultsWithUrl = results.map((evt) => ({
        ...evt,
        url: `${baseUrl}/events/${evt.id}`,
      }));

      return {
        content: [
          { type: "text", text: JSON.stringify(resultsWithUrl, null, 2) },
        ],
      };
    },
  );
};
