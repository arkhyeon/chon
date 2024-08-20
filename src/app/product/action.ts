'use server';
import { Prisma, Product } from '@prisma/client';
import prisma from '@/src/lib/db';
import { notFound } from 'next/navigation';

type InitialProducts = Prisma.PromiseReturnType<typeof getProductList>;

export async function getProductList(): Promise<Product[]> {
  try {
    return await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Failed to fetch getProductList:', error);
    throw new Error('Failed to fetch getProductList.');
  }
}

export async function getProductOne(id: number): Promise<Product> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (product === null) {
      return notFound();
    }

    return product;
  } catch (e) {
    return notFound();
  }
}
