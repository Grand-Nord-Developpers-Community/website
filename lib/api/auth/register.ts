"use server";

import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { InferInsertModel } from "drizzle-orm";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { z } from "zod";
import { sendEmailVerificationCode } from "./mails";
import { useRateLimiting } from "@/lib/utils.server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});
export const register = action(registerSchema, async ({ email, password }) => {
  // check if user exists
  //await useRateLimiting();

  const existingUser = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const userId = generateId(15);
  let values: InferInsertModel<typeof userTable> = {
    email,
    id: userId,
    password: undefined,
  };
  // create user
  if (password) {
    const hashedPassword = await new Argon2id().hash(password);
    values = {
      ...values,
      password: hashedPassword,
      email_verified: false,
    };
  }
  await db.insert(userTable).values(values);

  // send magic link
  /*await sendEmailVerificationCode({
    email,
    userId: userId,
  });*/
  
  //redirect(`/auth/verify-email?email=${email}`);
  
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie);
  console.log(session)
  redirect("/");

});
