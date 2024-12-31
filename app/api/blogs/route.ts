import { NextResponse } from "next/server";
import {getBlogPosts} from "@/actions/blog.actions"

export async function GET() {
  try {
    const blogs = await getBlogPosts();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
