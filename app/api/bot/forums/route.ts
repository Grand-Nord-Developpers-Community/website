import { getPaginatedForums } from "@/actions/forum.actions";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
type ForumPostResponse = {
  title: string;
  createdAt: Date;
  textContent: string;
  author: {
    name: string | null;
  };
  replies: {
    id: string;
  }[];
};
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const withAns = searchParams.get("withAnswer");
    const forums = await getPaginatedForums(
      0,
      5,
      undefined,
      withAns ? withAns.toLowerCase() === "true" : undefined
    );
    return NextResponse.json(forums);
  } catch (error) {
    console.log("impossible de charger les blogs");
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
