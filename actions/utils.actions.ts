import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

/**
 * Fetch page views for a single ID or an array of IDs from Redis.
 * @param ids - A single ID (string) or an array of IDs (string[]).
 * @param type - The type of the pageviews (e.g., "forums", "blogs").
 * @returns A record of views where the key is the ID and the value is the view count.
 */
export async function fetchPageViews(
  ids: string | string[],
  type: string
): Promise<Record<string, number>> {
  const idArray = Array.isArray(ids) ? ids : [ids];
  let views: Record<string, number> = {};

  try {
    // Generate Redis keys for the provided IDs
    const keys = idArray.map((id) => ["pageviews", type, id].join(":"));

    if (keys.length === 0) {
      return views;
    }

    // Fetch values from Redis
    const values = await redis.mget<number[]>(...keys);

    // Map Redis values to a record with IDs as keys
    views = values.reduce(
      (acc, value, index) => {
        acc[idArray[index]] = value ?? 0;
        return acc;
      },
      {} as Record<string, number>
    );
    return views;
  } catch (error) {
    console.error("Error fetching page views from Redis:", error);
  }

  return views;
}
