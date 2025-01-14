import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "@/lib/db";
import { oauthAccountTable, userTable } from "@/lib/db/schema";
import { github } from "@/lib/auth/providers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "User-Agent": "lucia-drizzle",
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();
    console.log({ githubUser });

    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const emails = await emailsResponse.json();
    console.log({ emails });

    const primaryEmail = emails.find((email: Email) => email.primary) ?? null;
    if (!primaryEmail) {
      return new Response("No primary email address", {
        status: 400,
      });
    }
    if (!primaryEmail.verified) {
      return new Response("Unverified email", {
        status: 400,
      });
    }
    //@ts-ignore
    const existingUser = await db.query.userTable.findFirst({
      //@ts-ignore
      where: (user, { eq }) => eq(user.email, primaryEmail.email),
    });
    const existingAccount = await db.query.oauthAccountTable.findFirst({
      where: (user, { eq, and }) =>
        and(
          eq(user.provider_id, "github"),
          eq(user.provider_user_id, githubUser.id.toString())
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
        provider_id: "github",
        provider_user_id: githubUser.id.toString(),
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
        name: githubUser.name,
        email: githubUser.email||primaryEmail.email,
        image:githubUser.avatar_url,
        bio: githubUser.bio,
        githubLink:githubUser.html_url,
        twitterLink:githubUser.twitter_username?`https://twitter.com/${githubUser.twitter_username}`:"",
        websiteLink:githubUser.blog?githubUser.blog:""
      });
      await tx.insert(oauthAccountTable).values({
        provider_id: "github",
        provider_user_id: githubUser.id.toString(),
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
    console.log(e)
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}
