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
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
      const isPublicRoute = ["/signup", "/"].includes(nextUrl.pathname);
      const isUserDetailsRoute = nextUrl.pathname.startsWith("/userdetails");

      if (isApiAuthRoute) return true;

      if (!isLoggedIn) {
        return isPublicRoute;
      }

      // If logged in but no details, force them to userdetails unless they are already there
      if (!auth.user.hasDetails && !isUserDetailsRoute) {
        return Response.redirect(new URL("/userdetails", nextUrl));
      }

      // If logged in and has details, don't let them go back to userdetails
      if (auth.user.hasDetails && isUserDetailsRoute) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;