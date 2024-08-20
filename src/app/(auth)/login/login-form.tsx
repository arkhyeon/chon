'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/src/app/(auth)/login/action';
import Input from '@/src/app/components/input';
import Link from 'next/link';

export default function LoginForm() {
  const [errors, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-green-800 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label htmlFor="id">아이디</label>
            <div className="relative">
              <Input id="id" name="id" required />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password">비밀번호</label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                name="password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errors && (
            <>
              X<p className="text-sm text-red-500">{errors}</p>
            </>
          )}
        </div>
        <Link href="signup">회원가입</Link>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4 w-full" aria-disabled={pending}>
      Log in &gt;
    </button>
  );
}
