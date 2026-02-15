import { z } from "zod";

export const registerUnsplashTools = (server: any) => {
  // Search Images (Unsplash)
  server.registerTool(
    "search_images",
    {
      description: "Search for images using Unsplash API",
      inputSchema: z.object({
        query: z.string().describe("The search query for images"),
        page: z.number().default(1).describe("Page number"),
        perPage: z.number().default(10).describe("Number of items per page"),
      }),
    },
    async ({ query, page, perPage }: any) => {
      const accessKey = process.env.UNSPLASH_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Unsplash Access Key is not configured.");
      }

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query,
        )}&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Unsplash API Error: ${response.statusText}`);
      }

      const data = await response.json();

      // Simplify the output
      const images = data.results.map((img: any) => ({
        id: img.id,
        description: img.description || img.alt_description,
        url: img.urls.regular,
        thumbnail: img.urls.small,
        author: img.user.name,
        authorLink: img.user.links.html,
      }));

      return {
        content: [{ type: "text", text: JSON.stringify(images, null, 2) }],
      };
    },
  );
};
