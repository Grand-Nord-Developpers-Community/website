import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export const runtime = "edge";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id") || "global";

  if (!type) {
    return new NextResponse("type is required", { status: 400 });
  }

  const dateRange = 90; // Fetch last 90 days of data
  const today = new Date();

  let pageViewsByDate: { date: string; mobile: number; desktop: number }[] = [];

  for (let i = 0; i < dateRange; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const mobileViews =
      (await redis.get<number>(`pageviews:${type}:${id}:${dateStr}:mobile`)) ??
      0;
    const desktopViews =
      (await redis.get<number>(`pageviews:${type}:${id}:${dateStr}:desktop`)) ??
      0;

    pageViewsByDate.push({
      date: dateStr,
      mobile: mobileViews,
      desktop: desktopViews,
    });
  }

  return NextResponse.json(pageViewsByDate.reverse()); // Reverse to keep chronological order
}
