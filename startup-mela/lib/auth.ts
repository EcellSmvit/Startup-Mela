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
      checks: ['pkce', 'state'],
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.uniqueUserCode = token.uniqueUserCode as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  debug: false,
  events: {
    async createUser({ user }) {
      try {
        const uniqueUserCode = `US${randomBytes(3).toString("hex").toUpperCase()}`;
        await prisma.user.update({
          where: { id: user.id },
          data: { uniqueUserCode },
        });
      } catch (error) {
        console.error("Error creating user with unique code:", error);
      }
    },
  },
});