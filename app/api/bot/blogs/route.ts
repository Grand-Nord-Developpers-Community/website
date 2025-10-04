import { getBlogPostsPaginated } from "@/actions/blog.actions";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
type BlogPostResponse = {
  title: string;
  description: string;
  id: string;
  createdAt: Date;
  like: number | null;
  slug: string;
  author: {
    id: string;
    name: string | null;
  };
};
export async function GET(req: NextRequest) {
  try {
    const blogs = await getBlogPostsPaginated(0, 5);
    return NextResponse.json(blogs);
  } catch (error) {
    console.log("impossible de charger les blogs");
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
