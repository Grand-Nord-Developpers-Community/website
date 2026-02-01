"use server";

import { lucia } from "@/lib/auth";
import { github, google } from "@/lib/auth/providers";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { useRateLimiting } from "@/lib/utils.server";
import { loginValidator } from "@/lib/validators/auth-validator";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeHex } from "oslo/encoding";
import { TOTPController } from "oslo/otp";
import { Argon2id } from "oslo/password";
import { sendEmailVerificationCode } from "./mails";
import { z } from "zod";

export const loginWithMagicLink = action(
  loginValidator,
  async ({ email, withoutRedirect }) => {
    await useRateLimiting();
    // check if user exists
    //@ts-ignore
    const existingUser = await db.query.userTable.findFirst({
      //@ts-ignore
      where: (user, { eq }) => eq(user.email, email),
    });
    if (!existingUser) {
      throw new Error("Invalid email");
    }
    // send magic link
    await sendEmailVerificationCode({
      email,
      userId: existingUser.id,
    });
    if (withoutRedirect) return;
    return {
      redirectUrl: `/auth/verify-email?email=${email}`,
    };
    // redirect(`/auth/verify-email?email=${email}`);
  },
);

export const loginWithGithub = async () => {
  // https://arctic.js.org/guides/oauth2-pkce
  const state = generateState();

  const url = await github.createAuthorizationURL(state, {
    scopes: ["user:email"],
  });
  (await cookies()).set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  redirect(url.toString());
};

export const loginWithGoogle = async () => {
  // https://arctic.js.org/guides/oauth2-pkce
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  (await cookies()).set("google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  (await cookies()).set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  redirect(url.toString());
};

export const loginWithPassword = async (
  formData: z.infer<typeof loginValidator>,
) => {
  try {
    console.log(formData);
    const { email, withoutRedirect, password } = loginValidator.parse(formData);

    console.log(email);
    //await useRateLimiting();
    // check if user exists
    //@ts-ignore
    const existingUser = await db.query.userTable.findFirst({
      //@ts-ignore
      where: (user, { eq }) => eq(user.email, email),
    });
    if (!existingUser) {
      return { serverError: "Invalid email" };
    }
    if (!password) {
      return { serverError: "Password is required" };
    }
    if (!existingUser.password) {
      return { serverError: "User does not have a password" };
    }
    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password,
    );
    if (!validPassword) {
      return { serverError: "Invalid email or password" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(sessionCookie);
    console.log(session);
    if (withoutRedirect) return { data: { redirectUrl: null } };
    return {
      data: {
        redirectUrl: existingUser.isCompletedProfile ? `/user` : "/account",
      },
    };
  } catch (error: any) {
    return {
      serverError: error.message || "An unexpected error occurred",
    };
  }
};
