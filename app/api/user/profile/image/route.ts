import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"
import {getUserProfileImage} from "@/actions/user.actions"

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profileImage = await getUserProfileImage(session?.user.id!);
    return NextResponse.json(profileImage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}
