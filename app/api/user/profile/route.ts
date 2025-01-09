import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"
import {getUserProfile} from "@/actions/user.actions"

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await getUserProfile(session?.user.id!);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}
