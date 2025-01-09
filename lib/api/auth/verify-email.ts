"use server";

import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { emailVerificationCodeTable, userTable } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";
import { z } from "zod";

const verifyEmailSchema = z.object({
  code: z.string(),
});
export const verifyEmail = action(verifyEmailSchema, async ({ code }) => {
  const validCode = await verifyVerificationCode(code);

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
  cookies().set(sessionCookie);

  return redirect("/protected");
});

export async function verifyVerificationCode(code: string) {
  const data = await db.transaction(async (tx) => {
    const databaseCode = await tx.query.emailVerificationCodeTable.findFirst({
      where: (emailVerificationCode, { eq }) =>
        eq(emailVerificationCode.code, code),
    });

    if (!databaseCode || !databaseCode.id) {
      return false;
    }
    await db
      .delete(emailVerificationCodeTable)
      .where(eq(emailVerificationCodeTable.id, databaseCode.id));
    if (!isWithinExpirationDate(databaseCode.expires_at)) {
      return false;
    }
    return databaseCode;
  });
  return data;
}
