import { NextResponse } from "next/server";
import { getBlogPosts } from "@/actions/blog.actions";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const blogs = await getBlogPosts();
    return NextResponse.json(blogs);
  } catch (error) {
    console.log("impossible de charger les blogs");
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
