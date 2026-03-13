import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    uniqueUserCode?: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
      uniqueUserCode?: string;
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
      const isPublicRoute = ["/login", "/signup", "/"].includes(nextUrl.pathname);

      if (isApiAuthRoute) return true;

      if (isAdminRoute) {
        if (isLoggedIn && auth.user.role === 'ADMIN') return true;
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return false;
      }

      if (!isPublicRoute && !isLoggedIn) {
        return false; 
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;  
        token.role = user.role ?? "USER";
        token.uniqueUserCode = user.uniqueUserCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string; 
        session.user.role = token.role as string;
        session.user.uniqueUserCode = token.uniqueUserCode as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;