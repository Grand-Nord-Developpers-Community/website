import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"
import {getUserForumPosts} from "@/actions/forum.actions"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id}= await params;
    const forums = await getUserForumPosts(id);
    return NextResponse.json({ forums });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post blogs profile" },
      { status: 500 }
    );
  }
}
