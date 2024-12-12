import { NextResponse } from "next/server";
import {auth} from "@/auth"
import {getUserForumPosts} from "@/actions/forum.actions"

export async function GET(request: Request,
  { params }: { params: { id: string } }) {
  try {
    const forums = await getUserForumPosts(params.id);
    return NextResponse.json({forums});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post blogs profile" },
      { status: 500 },
    );
  }
}
