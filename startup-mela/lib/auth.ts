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
  events: {
    async createUser({ user }) {
      const uniqueUserCode = `US${randomBytes(3).toString("hex").toUpperCase()}`;
      await prisma.user.update({
        where: { id: user.id },
        data: { uniqueUserCode },
      });
    },
  },
}); 