'use client';

import React from 'react';
import Modal from '@/src/app/components/modal';
import Input from '@/src/app/components/InputGroup';
import { passwordMatch } from '@/src/app/(auth)/profile/action';
import { useFormState } from 'react-dom';

function Page() {
  const [errors, dispatch] = useFormState(
    (prevState: any, formData: FormData) => {
      return passwordMatch(prevState, formData);
    },
    undefined,
  );

  return (
    <form action={dispatch}>
      <Modal title="비밀번호 확인" onSubmit={true}>
        <Input
          id="password"
          type="password"
          name="password"
          required
          errors={errors?.fieldErrors.password}
          minLength={6}
          title="비밀번호를 입력하세요"
        />
      </Modal>
    </form>
  );
}

export default Page;
