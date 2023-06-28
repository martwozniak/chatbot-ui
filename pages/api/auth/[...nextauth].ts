import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { randomBytes, randomUUID } from "crypto";
import { setTokenCookie } from "@/utils/app/tokenCookies";

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter<boolean>,
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
        
    ],
    secret: process.env.SECRET as string,
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt",
      
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
      
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
        
        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
          return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
      },       
    jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    //async encode() {},
    //async decode() {},
    },
    callbacks: {
        async jwt({ token, account, user }) {
          if (account) {
            token.accessToken = account.access_token
            token.id = user?.id
          }
          return token
        },
        async session({session, token}) {
            session.user.id = token.id
            session.user.accessToken = token;
            return session 
        },
      }      
})