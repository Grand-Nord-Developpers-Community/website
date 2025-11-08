import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"
import {getUserBlogPosts} from "@/actions/blog.actions"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id}= await params;
    const posts = await getUserBlogPosts(id);
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post blogs profile" },
      { status: 500 }
    );
  }
}
