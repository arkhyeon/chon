import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';
import prisma from '@/src/lib/db';

async function getUser(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    Boolean(user);
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const formSchema = z.object({
  id: z.string({ required_error: '아이디를 입력해 주세요.' }),
  password: z.string({ required_error: '비밀번호를 입력해 주세요.' }),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = await formSchema.spa(credentials);

        if (result.success) {
          const { id, password } = result.data;
          const user = await getUser(id);

          if (!user) {
            throw new Error('아이디를 확인해 주세요.');
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          } else {
            throw new Error('비밀번호를 확인해 주세요.');
          }
        }
        console.log('Invalid credentials');
        throw new Error('서버 오류로 로그인을 진행할 수 없습니다.');
      },
    }),
  ],
});
