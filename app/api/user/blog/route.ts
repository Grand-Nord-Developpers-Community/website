import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"
import {getUserBlogPosts} from "@/actions/blog.actions"

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await getUserBlogPosts(session?.user.id!);
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch forums" },
      { status: 500 },
    );
  }
}
