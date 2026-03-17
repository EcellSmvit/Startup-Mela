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
      hasDetails?: boolean;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/signup",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      const isLoggedIn = !!auth?.user
      const pathname = nextUrl.pathname

      const isPublicRoute =
        pathname === "/" ||
        pathname === "/signup"

      const isUserDetailsRoute = pathname.startsWith("/userdetails")

      if (!isLoggedIn) {
        return isPublicRoute
      }

      if (isLoggedIn && pathname === "/") {
        if (auth.user?.hasDetails) {
          return Response.redirect(new URL("/dashboard", nextUrl))
        } else {
          return Response.redirect(new URL("/userdetails", nextUrl))
        }
      }

      if (!auth.user?.hasDetails && !isUserDetailsRoute) {
        return Response.redirect(new URL("/userdetails", nextUrl))
      }

      if (auth.user?.hasDetails && isUserDetailsRoute) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
  },

  providers: [],
} satisfies NextAuthConfig;