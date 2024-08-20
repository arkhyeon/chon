'use client';
import { useLayoutEffect } from 'react';
import { getUserOne } from '@/src/app/(auth)/profile/action';
import { setProfileUser } from '@/src/app/(auth)/profile/store';

export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const fetchUser = async () => {
      const user = await getUserOne();
      setProfileUser(user);
    };
    void fetchUser();
  }, []);

  return <>{children}</>;
}
