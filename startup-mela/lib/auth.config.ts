import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    uniqueUserCode?: string;
    // REMOVED: hasDetails
  }

  interface Session {
    user: {
      id: string;
      role: string;
      uniqueUserCode?: string;
      // REMOVED: hasDetails
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

      // Logic for logged-in users
      if (isLoggedIn && (pathname === "/" || pathname === "/signup")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;