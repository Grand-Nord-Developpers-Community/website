import NextAuth, { User, Session } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { compare } from "bcrypt-ts";
import { getUser } from "./db/queries";
interface ExtendedSession extends Session {
  user: User;
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        let users = await getUser(email);
        if (users.length === 0) return null;
        let passwordsMatch = await compare(password, users[0].password!);
        if (passwordsMatch) return users[0] as any;
      },
    }),
    GitHub,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
