import { NextRequest } from "next/server";
import { generateOgImageResponse } from "../../og";
import { getForumPost } from "@/actions/forum.actions";
import { formatRelativeTime } from "@/lib/utils";
import { getUserProfileMeta } from "@/actions/user.actions";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const user = await getUserProfileMeta(username);
  if (!user) {
    return new Response("Not found", { status: 404 });
  }
  const date = formatRelativeTime(user.createdAt);
  const p = new URLSearchParams({
    templateId: "E0fh07i6JOACradERRWC8",
    "profil-34fe00kcv":
      user.image ||
      `${process.env.BASE_URL}/api/avatar?username=${user?.username}`,
    "name-i5n2gabp7": user?.name || "",
    "username-3zf3ntmy6": "@ " + user?.username,
    "bio-e8n7pme45": user?.bio || "Pas de bio !",
    "xp-g5uu8lpx0": `${user?.experiencePoints || 0} xp`,
    "streak-d6mamky2c": `${user.activity?.activity || 0} jours`,
    "questioncount-jwknfkx19": `${user.blogPosts.length} discussions`,
    "blogcount-qwco488oz": `${user.blogPosts.length} blogs`,
  });

  const url = `https://templify.woilasoft.com/api/v1/generate?${p.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TEMPLIFY_API_KEY}`,
    },
  });
  const blob = await response.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": "image/png",
    },
  });
  // return generateOgImageResponse({
  //   type: "user",
  //   title: "",
  //   date,
  //   replies: [],
  //   author: {
  //     name: user?.name || "Unknown",
  //     username: user?.username || "Unknown",
  //     image: user.image || "",
  //     bio: user.bio!,
  //   },
  //   stats: {
  //     blogs: user.blogPosts.length,
  //     forums: user.forumPosts.length,
  //     active_day: user.activity.totalDaysActive,
  //     xp: user.experiencePoints || 0,
  //   },
  // });
}
