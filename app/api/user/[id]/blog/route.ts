import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"
import {getUserBlogPosts} from "@/actions/blog.actions"

export async function GET(request: Request,
  { params }: { params: { id: string } }) {
  try {
    const posts = await getUserBlogPosts(params.id);
    return NextResponse.json({posts});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post blogs profile" },
      { status: 500 },
    );
  }
}
