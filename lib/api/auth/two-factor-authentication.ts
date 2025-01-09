"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import {
  enableTwoFactorAuthValidator
} from "@/lib/validators/auth-validator";
import { eq } from "drizzle-orm";
import { decodeHex } from "oslo/encoding";
import { TOTPController } from "oslo/otp";

export const enableTwoFactorAuth = action(
  enableTwoFactorAuthValidator,
  async ({ code, secret }) => {
    const { user } = await auth();
    if (!user) throw new Error("Unauthorized");

    const validOTP = await new TOTPController().verify(code, decodeHex(secret));
    if (!validOTP) throw new Error("Invalid code");
    await db
      .update(userTable)
      .set({
        two_factor_secret: secret,
      })
      .where(eq(userTable.id, user.id));
    return {
      success: true,
    };
  }
);

export const disableTwoFactorAuth = async () => {
  const { user } = await auth();
  if (!user) throw new Error("Unauthorized");
  await db
    .update(userTable)
    .set({
      two_factor_secret: null,
    })
    .where(eq(userTable.id, user.id));
  return {
    success: true,
  };
};
