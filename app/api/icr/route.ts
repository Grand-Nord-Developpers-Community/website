import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import type { pageTrackerType } from "@/components/ReportView";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export const runtime = "edge";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  let id: string | undefined = body.id;
  let type: pageTrackerType = body.type;

  if (!type) {
    return new NextResponse("type is required", { status: 400 });
  }
  if (!id && type !== "app") {
    return new NextResponse("id is required for this type", { status: 400 });
  }

  // Detect device type
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
  const deviceType = isMobile ? "mobile" : "desktop";
  const today = new Date().toISOString().split("T")[0];
  const ip = req.ip;
  if (ip) {
    // Hash the IP for privacy
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Deduplicate views for 24 hours
    const isNew = await redis.set(
      ["deduplicate", hash, type, id ?? "global"].join(":"),
      true,
      {
        nx: true,
        ex: 24 * 60 * 60,
      }
    );

    // if (!isNew) {
    //   return new NextResponse(null, { status: 202 });
    // }
  }
  try {
    switch (type) {
      case "blog":
        await redis.incr(["pageviews", "blog", id].join(":"));
        break;
      case "forum":
        await redis.incr(["pageviews", "forum", id].join(":"));
        break;
      case "event":
        await redis.incr(["pageviews", "event", id].join(":"));
        break;
      case "app":
        await Promise.all([
          redis.incr(["pageviews", "app", "global"].join(":")),
          redis.incr(["pageviews", "app", "device", deviceType].join(":")),
          redis.incr(
            ["pageviews", "app", "device", deviceType, today].join(":")
          ),
        ]);
        break;
      default:
        return new NextResponse("type not found", { status: 400 });
    }
  } catch (error) {
    console.error("Redis increment failed:", error);
  }

  return new NextResponse(null, { status: 202 });
}
