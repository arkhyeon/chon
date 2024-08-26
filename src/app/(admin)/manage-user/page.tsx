import React from 'react';
import UserGrid from '@_admin/manage-user/userGrid';
import { getUserList } from '@_admin/manage-user/action';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  const userList = await getUserList(query);
  return (
    <div className="h-full w-full">
      <UserGrid userList={userList} />
    </div>
  );
}
