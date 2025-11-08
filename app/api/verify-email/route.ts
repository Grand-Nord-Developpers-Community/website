import { verifyVerificationCode } from "@/lib/api/auth/verify-email";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) redirect("/auth/verify-email");
  try {
    const validCode = await verifyVerificationCode(token);

    if (!validCode) {
      throw new Error("Invalid code");
    }

    await db
      .update(userTable)
      .set({
        email_verified: true,
      })
      .where(eq(userTable.id, validCode.user_id));

    const session = await lucia.createSession(validCode.user_id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(sessionCookie);
    return NextResponse.redirect(new URL("/protected", request.url));
  } catch (error) {
    console.log("Failed to verify email");
    return NextResponse.redirect(new URL("/auth/verify-email", request.url));
  }
}
