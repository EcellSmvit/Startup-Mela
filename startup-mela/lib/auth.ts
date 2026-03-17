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

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "USER";

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

      // REMOVED: The database check for prisma.userDetails.findUnique
      // and the assignment of token.hasDetails

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.uniqueUserCode = token.uniqueUserCode as string;
        // REMOVED: session.user.hasDetails
      }

      return session;
    },
  },
});