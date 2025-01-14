import { lucia } from "@/lib/auth";
import { google } from "@/lib/auth/providers";
import { db } from "@/lib/db";
import { oauthAccountTable, userTable } from "@/lib/db/schema";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier =
    cookies().get("google_oauth_code_verifier")?.value ?? null;

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }
  console.log("passed state check");

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    console.log({ tokens });

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await googleUserResponse.json();
    console.log({ googleUser });

    if (!googleUser.email_verified) {
      return new Response("Email should be verified", {
        status: 400,
      });
    }
    //@ts-ignore
    const existingUser = await db.query.userTable.findFirst({
      //@ts-ignore
      where: (user, { eq }) => eq(user.email, googleUser.email),
    });
    console.log({ existingUser });

    const existingAccount = await db.query.oauthAccountTable.findFirst({
      where: (user, { eq, and }) =>
        and(
          eq(user.provider_id, "google"),
          eq(user.provider_user_id, googleUser.sub.toString())
        ),
    });
    console.log({ existingAccount });

    if (existingAccount) {
      console.log("existing account");

      const session = await lucia.createSession(existingAccount.user_id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: existingUser?.isCompletedProfile?"/user/dashboard":"/account/complete",
        },
      });
    }
    if (existingUser && !existingAccount) {
      console.log("existing user but no account");
      await db.insert(oauthAccountTable).values({
        provider_id: "google",
        provider_user_id: googleUser.sub.toString(),
        user_id: existingUser.id,
      });
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: existingUser?.isCompletedProfile?"/user/dashboard":"/account/complete",
        },
      });
    }
    console.log("new user");

    const userId = generateId(15);

    await db.transaction(async (tx) => {
      await tx.insert(userTable).values({
        id: userId,
        name: googleUser.name,
        email: googleUser.email,
        image:googleUser.picture
      });
      await tx.insert(oauthAccountTable).values({
        provider_id: "google",
        provider_user_id: googleUser.sub.toString(),
        user_id: userId,
      });
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: existingUser?.isCompletedProfile?"/user/dashboard":"/account/complete",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      console.log(e.message);

      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
