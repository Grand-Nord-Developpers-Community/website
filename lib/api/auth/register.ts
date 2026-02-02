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
import { registerValidator } from "@/lib/validators/auth-validator";
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});
// export const register = action(registerSchema, async ({ email, password }) => {
export const register = async (data:z.infer<typeof registerValidator>) => {
  // check if user exists
  //await useRateLimiting();
 console.log(data)
 const {email,password}=registerValidator.parse(data)

  const existingUser = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  if (existingUser) {
   return {serverError:"Email already exists"};
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
  const res = await db.insert(userTable).values(values).returning();

  // send magic link
  /*await sendEmailVerificationCode({
    email,
    userId: userId,
  });*/

  //redirect(`/auth/verify-email?email=${email}`);

  const session = await lucia.createSession(res[0].id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie);
  //console.log(session)
  return {
    data: {
      redirectUrl: "/account/complete",
    },
  };

}
