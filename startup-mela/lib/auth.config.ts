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
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
      const isPublicRoute = ["/signup", "/"].includes(nextUrl.pathname);
      const isUserDetailsRoute = nextUrl.pathname.startsWith("/userdetails");

      if (isApiAuthRoute) return true;

      if (isAdminRoute) {
        if (isLoggedIn && auth.user.role === 'ADMIN') return true;
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return false;
      }

      if (!isPublicRoute && !isLoggedIn) return false; 

      // Force users to complete details if they haven't yet
      if (isLoggedIn && !auth.user.hasDetails && !isUserDetailsRoute && !isPublicRoute) {
        return Response.redirect(new URL("/userdetails", nextUrl));
      }

      // Prevent users who have details from going back to the userdetails form
      if (isLoggedIn && auth.user.hasDetails && isUserDetailsRoute) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Providers are defined in lib/auth.ts
} satisfies NextAuthConfig;