import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"
import {getUserProfile} from "@/actions/user.actions"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ id });
  /*try {
    const profile = await getUserProfile(session?.user.id!);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }*/
}
