import { GitHub, Google } from "arctic";

//console.log("set up providers", { url: process.env.BASE_URL });

// https://arctic.js.org/guides/oauth2
export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  { redirectURI: `${process.env.BASE_URL}/api/login/github/callback` }
);

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.BASE_URL}/api/login/google/callback`
);
