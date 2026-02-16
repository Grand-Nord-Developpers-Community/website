import { NextRequest, NextResponse } from "next/server";
import { getUsersListByRank } from "@/actions/user.actions";

export interface LeaderboardType {
  users: User[];
  hasMore: boolean;
}

export interface User {
  image: null;
  name: string;
  email: string;
  experiencePoints: number;
  createdAt: Date;
  username: string;
}
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Fetch limit + 1 items to check if there are more
    const usersWithExtra = await getUsersListByRank(offset, limit, limit + 1);

    const hasMore = usersWithExtra ? usersWithExtra.length > limit : false;
    const users = hasMore ? usersWithExtra!.slice(0, limit) : (usersWithExtra || []);

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
