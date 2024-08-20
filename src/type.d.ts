import { JWT } from 'next-auth/jwt';
import NextAuth, { type DefaultSession } from 'next-auth';
declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}
declare module 'next-auth' {
  export interface User extends DefaultUser {
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}
