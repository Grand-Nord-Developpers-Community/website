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
  }
);

export const loginWithGithub = async () => {
  // https://arctic.js.org/guides/oauth2-pkce
  const state = generateState();

  const url = await github.createAuthorizationURL(state, {
    scopes: ["user:email"],
  });
  cookies().set("github_oauth_state", state, {
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

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookies().set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  redirect(url.toString());
};

export const loginWithPassword = action(
  loginValidator,
  async ({ email, withoutRedirect, password, code }) => {
    //await useRateLimiting();
    // check if user exists
    //@ts-ignore
    const existingUser = await db.query.userTable.findFirst({
      //@ts-ignore
      where: (user, { eq }) => eq(user.email, email),
    });
    if (!existingUser) {
      throw new Error("Invalid email");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (!existingUser.password) {
      throw new Error("User does not have a password");
    }
    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password
    );
    if (!validPassword) {
      throw new Error("Invalid email or password");
    }

    /*if (!existingUser.email_verified) {
      await sendEmailVerificationCode({
        email,
        userId: existingUser.id,
      });
      if (withoutRedirect) return;
      return {
        redirectUrl: `/auth/verify-email?email=${email}`,
      };
      // redirect(`/auth/verify-email?email=${email}`);
    }

    if (existingUser.two_factor_secret) {
      if (code) {
        const validOTP = await new TOTPController().verify(
          code.join(""),
          decodeHex(existingUser.two_factor_secret)
        );

        if (!validOTP) throw new Error("Invalid code");
        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie);
        return {
          redirectUrl: `/protected`,
        };
        // redirect("/protected");
      }
      return {
        isTwoFactor: true,
      };
    }*/

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie);
    console.log(session);
    if (withoutRedirect) return;
    return {
      redirectUrl: existingUser.isCompletedProfile ? `/user` : "/account",
    };
    // redirect("/protected");
  }
);
