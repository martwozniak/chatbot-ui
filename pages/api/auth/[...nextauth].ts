import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { signJwtAccessToken } from "@/utils/lib/jwt";

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
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt'
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
        async session({ session, user, token }) {
            // I skipped the line below coz it gave me a TypeError
            //session.accessToken = token.accessToken;
            session = {
                ...session,
                user: {
                    id: user.id,
                    ...session.user
                }
            }
            return session
          },
      }      
})