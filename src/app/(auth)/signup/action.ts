'use server';
import prisma from '@/src/lib/db';
import { PASSWORD_MIN_LENGTH } from '@/src/lib/constants';
import { RefinementCtx, z } from 'zod';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import UserWhereUniqueInput = Prisma.UserWhereUniqueInput;

const checkUsername = (username: string) => !username.includes('관리자');

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueField = async (
  field: 'id' | 'email' | 'username',
  value: string,
  ctx: RefinementCtx,
  message: string,
) => {
  let where: UserWhereUniqueInput;

  if (field === 'id') {
    where = { id: value };
  } else if (field === 'email') {
    where = { email: value };
  } else if (field === 'username') {
    where = { username: value };
  } else {
    throw new Error('Invalid field');
  }

  const user = await prisma.user.findUnique({ where, select: { id: true } });

  if (user) {
    ctx.addIssue({ code: 'custom', message, path: [field], fatal: true });
    return z.NEVER;
  }
};

const createSchema = z
  .object({
    id: z
      .string({
        invalid_type_error: '한글/영문으로 작성해 주세요.',
        required_error: '아이디를 작성해 주세요.',
      })
      .toLowerCase()
      .trim(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    username: z
      .string({
        invalid_type_error: '한글/영문으로 작성해 주세요.',
        required_error: '이름을 작성해 주세요.',
      })
      .toLowerCase()
      .trim()
      .refine(checkUsername, '관리자 아이디는 사용할 수 없습니다.'),
    email: z.string().email().toLowerCase(),
    address: z.string(),
    addressDetail: z.string(),
  })
  .superRefine(async (data, ctx) => {
    await Promise.all([
      checkUniqueField('id', data.id, ctx, '이미 존재하는 아이디입니다.'),
      checkUniqueField(
        'username',
        data.username,
        ctx,
        '이미 존재하는 이름입니다.',
      ),
      checkUniqueField('email', data.email, ctx, '이미 존재하는 이메일입니다.'),
    ]);
  })
  .refine(checkPasswords, {
    message: '비밀번호와 비밀번호 확인이 서로 다릅니다.',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    id: formData.get('id'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    address: formData.get('address'),
    addressDetail: formData.get('addressDetail'),
  };
  const result = await createSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const password = await bcrypt.hash(result.data.password, 12);
    await prisma.user.create({
      data: {
        id: result.data.id,
        username: result.data.username,
        email: result.data.email,
        password: password,
        address: result.data.address,
        addressDetail: result.data.addressDetail,
      },
    });
    redirect('/login');
  }
}

const updateSchema = z
  .object({
    id: z
      .string({
        invalid_type_error: '한글/영문으로 작성해 주세요.',
        required_error: '아이디를 작성해 주세요.',
      })
      .toLowerCase()
      .trim(),
    password: z.string().min(PASSWORD_MIN_LENGTH).or(z.string().length(0)),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .or(z.string().length(0)),
    username: z
      .string({
        invalid_type_error: '한글/영문으로 작성해 주세요.',
        required_error: '이름을 작성해 주세요.',
      })
      .toLowerCase()
      .trim()
      .refine(checkUsername, '관리자 아이디는 사용할 수 없습니다.'),
    email: z.string().email().toLowerCase(),
    address: z.string(),
    addressDetail: z.string(),
    user: z.object({ username: z.string(), email: z.string() }),
  })
  .refine(checkPasswords, {
    message: '비밀번호와 비밀번호 확인이 서로 다릅니다.',
    path: ['confirm_password'],
  })
  .superRefine(async (data, ctx) => {
    console.log(data);
    console.log(ctx);
    if (data.username !== data.user.username) {
      await checkUniqueField(
        'username',
        data.username,
        ctx,
        '이미 존재하는 이름입니다.',
      );
    }
    if (data.email !== data.user.email) {
      await checkUniqueField(
        'email',
        data.email,
        ctx,
        '이미 존재하는 이메일입니다.',
      );
    }
  });

export async function updateAccount(
  prevState: any,
  formData: FormData,
  user: User,
) {
  const data = {
    id: formData.get('id'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    address: formData.get('address'),
    addressDetail: formData.get('addressDetail'),
    user: user,
  };

  const result = await updateSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const updateData: any = {
    username: result.data.username,
    email: result.data.email,
    address: result.data.address,
    addressDetail: result.data.addressDetail,
    updatedAt: new Date(),
  };

  if (result.data.password) {
    updateData.password = await bcrypt.hash(result.data.password, 12);
  }

  await prisma.user.update({ where: { id: result.data.id }, data: updateData });
  redirect('/profile');
}
