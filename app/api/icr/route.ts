import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import type { pageTrackerType } from "@/components/ReportView";
const redis = Redis.fromEnv();
export const runtime = "edge";

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  let id: string | undefined = undefined;
  let type: pageTrackerType = body.type;
  if ("id" in body) {
    id = body.id;
  }
  if (!id) {
    return new NextResponse("id not found", { status: 400 });
  }
  if (!type) {
    return new NextResponse("type not undefined", { status: 400 });
  }
  const ip = req.ip;
  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each id
    const isNew = await redis.set(["deduplicate", hash, id].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      new NextResponse(null, { status: 202 });
    }
  }
  switch (type) {
    case "blog":
      await redis.incr(["pageviews", "blogs", id].join(":"));
      break;
    case "forum":
      await redis.incr(["pageviews", "forums", id].join(":"));
      break;
    default:
      return new NextResponse("type not found", { status: 400 });
  }

  return new NextResponse(null, { status: 202 });
}
