'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createAccount, updateAccount } from '@/src/app/(auth)/signup/action';
import Input from '@/src/app/components/InputGroup';
import { User } from '@prisma/client';

export default function SingUpForm({ user }: { user?: User }) {
  const isEdit = user !== undefined;
  const [errors, dispatch] = useFormState(
    (prevState: any, formData: FormData) => {
      if (isEdit) {
        return updateAccount(prevState, formData, user);
      }
      return createAccount(prevState, formData);
    },
    null,
  );

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-green-800 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="flex-col">
          <label htmlFor="id">아이디</label>
          <Input
            id="id"
            name="id"
            required
            errors={errors?.fieldErrors.id}
            readOnly={isEdit}
            defaultValue={user?.id}
          />
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type="password"
            name="password"
            required={!isEdit}
            minLength={6}
            errors={errors?.fieldErrors.password}
          />
          <label htmlFor="confirm_password">비밀번호 확인</label>
          <Input
            id="confirm_password"
            type="password"
            name="confirm_password"
            required={!isEdit}
            minLength={6}
            errors={errors?.fieldErrors.confirm_password}
          />
          <label htmlFor="username">이름</label>
          <Input
            id="username"
            type="username"
            name="username"
            errors={errors?.fieldErrors.username}
            defaultValue={user?.username}
          />
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            errors={errors?.fieldErrors.email}
            defaultValue={user?.email}
          />
          <label htmlFor="address">주소</label>
          <Input
            id="address"
            name="address"
            required
            errors={errors?.fieldErrors.address}
            defaultValue={user?.address}
          />
          <label htmlFor="addressDetail">상세주소</label>
          <Input
            id="addressDetail"
            name="addressDetail"
            required
            errors={errors?.fieldErrors.addressDetail}
            defaultValue={user?.addressDetail}
          />
        </div>
        <LoginButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-4 w-full bg-green-400 hover:bg-green-600"
      aria-disabled={pending}
    >
      {pending ? <>하는중~~~~~~</> : <>Sign Up &gt;</>}
    </button>
  );
}
