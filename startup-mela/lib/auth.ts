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
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "USER";
        const details = await prisma.userDetails.findUnique({
          where: { userId: user.id },
        });

        token.hasDetails = !!details;
        let uniqueCode = (user as { uniqueUserCode?: string }).uniqueUserCode;

        if (!uniqueCode) {
          uniqueCode = `SM-${randomBytes(3).toString("hex").toUpperCase()}`;

          await prisma.user.update({
            where: { id: user.id },
            data: { uniqueUserCode: uniqueCode },
          });
        }

        token.uniqueUserCode = uniqueCode;
      }
      if (trigger === "update") {
        const details = await prisma.userDetails.findUnique({
          where: { userId: token.id as string },
        });

        token.hasDetails = !!details;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.uniqueUserCode = token.uniqueUserCode as string;
        session.user.hasDetails = token.hasDetails as boolean;
      }

      return session;
    },
  },
});