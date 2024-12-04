import { NextResponse } from "next/server";
import {auth} from "@/auth"
import {getUserProfile} from "@/actions/user.actions"

export async function GET(request: Request,
  { params }: { params: { id: string } }) {
  return NextResponse.json({id:params.id});
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
