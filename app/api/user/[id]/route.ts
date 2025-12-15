import { getUserProfileMeta } from "@/actions/user.actions";
import { formatRelativeTime } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getUserProfileMeta(id);
  if (!user) {
    return new Response("Not found", { status: 404 });
  }
  const date = formatRelativeTime(user.createdAt);
  return NextResponse.json({
    date,
    replies: [],
    author: {
      name: user?.name || "Unknown",
      username: user?.username || "Unknown",
      image: user.image || "",
      bio: user.bio || "",
    },
    stats: {
      blogs: user.blogPosts.length,
      forums: user.forumPosts.length,
      active_day: user.activity.totalDaysActive,
      xp: user.experiencePoints || 0,
    },
  });
}
