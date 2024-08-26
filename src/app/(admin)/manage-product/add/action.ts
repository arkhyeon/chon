'use server';
import prisma from '@/src/lib/db';
import { RefinementCtx, z } from 'zod';
import { redirect } from 'next/navigation';
import { Product } from '@prisma/client';

const checkUniqueField = async (
  field: 'name',
  value: string,
  ctx: RefinementCtx,
  message: string,
) => {
  const product = await prisma.product.findUnique({
    where: { name: value },
    select: { name: true },
  });

  if (product) {
    ctx.addIssue({ code: 'custom', message, path: [field], fatal: true });
    return z.NEVER;
  }
};

const createSchema = z
  .object({
    name: z.string({ required_error: '아이디를 작성해 주세요.' }),
    description: z.string(),
    price: z.coerce.number({ required_error: '가격을 작성해 주세요.' }),
    imageUrl: z.string(),
    stock: z.coerce.number({ required_error: '재고를 작성해 주세요.' }),
    prevState: z.object({ name: z.string() }).optional(),
  })
  .superRefine(async (data, ctx) => {
    if (data.prevState !== undefined && data.prevState.name !== data.name) {
      await checkUniqueField(
        'name',
        data.name,
        ctx,
        '이미 등록된 제품명입니다.',
      );
    }
  });

export async function createProduct(
  prevState: any,
  formData: FormData,
  content: string,
) {
  const form = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    stock: formData.get('stock'),
  };

  const { success, error, data } = await createSchema.spa(form);

  if (!success) {
    return error.flatten();
  } else {
    await prisma.product.create({ data: { ...data, introduction: content } });
    redirect('/manage-product');
  }
}

export async function updateProduct(
  prevState: any,
  formData: FormData,
  product: Product,
  content: string,
) {
  const form = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    stock: formData.get('stock'),
  };

  const { success, error, data } = await createSchema.safeParseAsync({
    ...form,
    prevState: product,
  });
  if (!success) {
    return error.flatten();
  }
  const { name, description, price, imageUrl, stock } = data;

  await prisma.product.update({
    where: { id: product.id },
    data: { name, description, price, imageUrl, stock, introduction: content },
  });
  redirect('/manage-product');
}

export async function deleteProductAction(selectedRowIds: number[]) {
  await prisma.product.deleteMany({ where: { id: { in: selectedRowIds } } });
}
