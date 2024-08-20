'use client';

import { profileStore } from '@/src/app/(auth)/profile/store';
import SingUpForm from '@/src/app/(auth)/ui/signup-form';

export default function Page() {
  const { user } = profileStore();

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className="mb-3 bg-green-600 text-2xl">Edit Your Profile</h1>
      <SingUpForm user={user} />
    </div>
  );
}
