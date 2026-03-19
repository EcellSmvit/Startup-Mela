import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    uniqueUserCode?: string;
    hasDetails?: boolean;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      uniqueUserCode?: string;
      hasDetails: boolean;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/signup",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isPublicRoute =
        pathname === "/" ||
        pathname === "/signup";

      if (!isLoggedIn) {
        return isPublicRoute;
      }
      if (isLoggedIn && (pathname === "/" || pathname === "/signup")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;