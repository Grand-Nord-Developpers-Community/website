"use server";

import { createPasswordResetToken } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import {
  passwordResetTokenValidator,
  resetPasswordValidator,
} from "@/lib/validators/auth-validator";
import { sendPasswordResetToken } from "./mails";
import {
  PasswordResetTokenTable,
  passwordResetTokenTable,
  userTable,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isWithinExpirationDate } from "oslo";
import { lucia } from "@/lib/auth";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const passwordResetToken = action(
  passwordResetTokenValidator,
  async ({ email }) => {
    //@ts-ignore
    const user = await db.query.userTable.findFirst({
      //@ts-ignore
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user || !user.email_verified) {
      throw new Error("Invalid email");
    }

    const verificationToken = await createPasswordResetToken(user.id);
    const verificationLink = `${process.env.BASE_URL}/auth/reset-password?token=${verificationToken}`;

    await sendPasswordResetToken({
      email,
      verificationLink,
      firstname: user.username ?? user.email?.split("@")[0]!,
    });

    return {
      email,
      status: "success",
    };
  }
);

export const resetPassword = action(
  resetPasswordValidator,
  async ({ token, password }) => {
    let verificationToken: PasswordResetTokenTable | undefined;
    await db.transaction(async (tx) => {
      verificationToken = await tx.query.passwordResetTokenTable.findFirst({
        where: (passwordResetTokenTable, { eq }) =>
          eq(passwordResetTokenTable.id, token),
      });
      if (verificationToken) {
        await tx
          .delete(passwordResetTokenTable)
          .where(eq(passwordResetTokenTable.id, token));
      }
    });

    if (
      !verificationToken ||
      !isWithinExpirationDate(verificationToken.expires_at)
    ) {
      throw new Error("Invalid or expired token");
    }

    await lucia.invalidateUserSessions(verificationToken.user_id);
    const hashedPassword = await new Argon2id().hash(password);
    await db
      .update(userTable)
      .set({
        password: hashedPassword,
      })
      .where(eq(userTable.id, verificationToken.user_id));

    const session = await lucia.createSession(verificationToken.user_id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie);
    return redirect("/protected");
  }
);
