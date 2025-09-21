import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});
// Create a new ratelimiter, that allows 5 requests per 30 seconds
export const ratelimiter =
  process.env.IS_RATE_LIMIT_ENABLED === "false"
    ? undefined
    : new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(5, "30 s"),
      });
