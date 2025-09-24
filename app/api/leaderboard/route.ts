import { NextRequest, NextResponse } from "next/server";
import { getUsersListByRank } from "@/actions/user.actions";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");

    const users = await getUsersListByRank(offset, limit);

    // Check if there are more users by fetching one extra
    const nextBatch = await getUsersListByRank(offset + 1, limit);
    const hasMore = nextBatch && nextBatch.length > 0;

    return NextResponse.json({
      users,
      hasMore,
      nextCursor: hasMore ? offset + 1 : undefined,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
