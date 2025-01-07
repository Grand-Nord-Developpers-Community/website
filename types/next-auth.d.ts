import NextAuth, { DefaultSession } from 'next-auth';
import {DefaultJWT} from "@auth/core/jwt";
declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: UserSession;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}


declare module "next-auth" {

    // Extend session to hold the access_token
    interface Session {
        access_token: string 
    }

    // Extend token to hold the access_token before it gets put into session
    interface JWT {
        access_token: string & DefaultJWT
    }
}
