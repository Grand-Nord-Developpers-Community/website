import { NextRequest } from "next/server";
import { generateOgImageResponse } from "../../og";
import { getForumPost } from "@/actions/forum.actions";
import { formatRelativeTime } from "@/lib/utils";
import { getUserProfileMeta } from "@/actions/user.actions";
export async function GET(request: NextRequest, { params }: { params: any }) {
  const user = await getUserProfileMeta(params.username);
  if (!user) {
    return new Response("Not found", { status: 404 });
  }
  const date = formatRelativeTime(user.createdAt);
  return generateOgImageResponse({
    type: "user",
    title: "",
    date,
    replies: [],
    author: {
      name: user?.name || "Unknown",
      username: user?.username || "Unknown",
      image: user.image || "",
      bio: user.bio!,
    },
    stats: {
      blogs: user.blogPosts.length,
      forums: user.forumPosts.length,
      active_day: user.activity.totalDaysActive,
      xp: user.experiencePoints || 0,
    },
  });
}
