'use server';
import { User } from '@prisma/client';
import prisma from '@/src/lib/db';

export async function getUserList(query: string): Promise<User[]> {
  try {
    return await prisma.user.findMany({
      where: { id: { contains: query } },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('Failed to fetch getUserList:', e);
    throw new Error('Failed to fetch getUserList.');
  }
}

export async function setUserPoint(uid: number, point: number) {
  try {
    await prisma.user.update({ where: { uid }, data: { point } });
  } catch (e) {
    console.error('Failed to fetch setUserPoint:', e);
    throw new Error('Failed to fetch setUserPoint.');
  }
}

export async function deleteUser(selectedRowIds: number[]) {
  await prisma.user.deleteMany({ where: { uid: { in: selectedRowIds } } });
}
