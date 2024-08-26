'use server';
import { User } from '@prisma/client';
import prisma from '@/src/lib/db';
import { notFound, redirect, RedirectType } from 'next/navigation';
import { auth } from '@/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@/src/lib/constants';

export async function getUserOne(): Promise<User> {
  const session = await auth();

  if (!session?.user?.id) {
    console.log('session not found');
    return notFound();
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (user === null) {
      return notFound();
    }
    return user;
  } catch (e) {
    return notFound();
  }
}

const isPasswordMatch = async ({ password }: { password: string }) => {
  const user = await getUserOne();
  return await bcrypt.compare(password, user.password);
};

const formSchema = z
  .object({
    password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(isPasswordMatch, {
    message: '잘못된 비밀번호입니다.',
    path: ['password'],
  });

export async function passwordMatch(prevState: any, formData: FormData) {
  const result = await formSchema.spa({ password: formData.get('password') });

  if (result.success) {
    redirect('edit');
  } else {
    return result.error.flatten();
  }
}
