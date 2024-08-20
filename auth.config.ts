import type { NextAuthConfig } from 'next-auth';
import { User } from '@prisma/client';

const adminRoute = ['/dashboard'];
const authRoute = ['/management', '/user', '/profile'];
const loginRoute = ['/login', '/signup'];

export const authConfig = {
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoginRoute = loginRoute.includes(nextUrl.pathname);
      const isAuthRoute = authRoute.includes(nextUrl.pathname);
      const isAdminRoute = adminRoute.includes(nextUrl.pathname);
      if (auth !== null) {
        const isAdmin = auth.user.role === 'ADMIN';
        if (isLoginRoute) {
          return Response.redirect(new URL('/', nextUrl));
        }
        if (isAdminRoute && !isAdmin) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      return !(isAuthRoute || isAdminRoute);
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session?.user) {
        if (token.sub != null) {
          session.user.id = token.sub;
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig;
