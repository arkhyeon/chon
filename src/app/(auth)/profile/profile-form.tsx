'use client';

import { profileStore } from '@/src/app/(auth)/profile/store';
import Link from 'next/link';

export default function ProfileForm() {
  const { user } = profileStore();
  if (user.uid === 0) return null;

  return (
    <div className="flex-1 rounded-lg bg-green-400 px-6 pb-4 pt-8">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
      <div className="flex-col">
        <label>아이디</label>
        <p>{user.id}</p>
        <label>이름</label>
        <p>{user.username}</p>
        <label>이메일</label>
        <p>{user.email}</p>
        <label>주소</label>
        <p>{user.address}</p>
        <label>가입일</label>
        <p>{user.createdAt.toLocaleString()}</p>
        <Link
          href="/profile/passwordcheck"
          className="inline-block rounded-lg bg-white px-6 py-3 text-center text-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          수정
        </Link>
      </div>
    </div>
  );
}
