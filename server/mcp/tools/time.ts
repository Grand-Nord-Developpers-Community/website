import { z } from "zod";

export const registerTimeTools = (server: any) => {
  server.registerTool(
    "get_current_time_and_date",
    {
      description: "Get the current time and date",
      inputSchema: z.object({
        timezone: z.string().optional().describe("The timezone to get the time for (e.g 'Africa/Doula')"),
      }),
    },
    async ({ timezone }: { timezone?: string }) => {
      const date = new Date();
      const timeString = timezone 
        ? date.toLocaleString("fr-FR", { timeZone: timezone??'Africa/Douala' }) 
        : date.toISOString();

      return {
        content: [{ type: "text", text: timeString }],
      };
    },
  );
};
