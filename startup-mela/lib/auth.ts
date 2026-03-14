import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { authConfig } from "./auth.config";
import { randomBytes } from "crypto";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // 1. Add callbacks to log specific steps in the console
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SIGNIN_ATTEMPT:", { email: user.email, provider: account?.provider });
      return true;
    },
    async session({ session, token }) {
      console.log("SESSION_CALLBACK:", { user: session.user?.email });
      return session;
    },
  },
  // 2. Enable debug mode for detailed logs
  debug: true, 
  events: {
    async createUser({ user }) {
      try {
        const uniqueUserCode = `US${randomBytes(3).toString("hex").toUpperCase()}`;
        await prisma.user.update({
          where: { id: user.id },
          data: { uniqueUserCode },
        });
        console.log("USER_CREATED_SUCCESS:", user.id);
      } catch (error) {
        // 3. Catch and log database errors specifically
        console.error("USER_CREATION_EVENT_ERROR:", error);
      }
    },
  },
});