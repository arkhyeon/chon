import React from 'react';
import Link from 'next/link';

function Sidebar() {
  return (
    <div className="h-full w-64 bg-green-800 shadow-md">
      <div className="border-b px-6 py-5.5 text-xl font-bold">TailAdmin</div>
      <ul>
        <Link href="/dashboard">
          <li className="cursor-pointer p-4 hover:bg-green-200">대시보드</li>
        </Link>
        <Link href="/manage-product">
          <li className="cursor-pointer p-4 hover:bg-green-200">상품 관리</li>
        </Link>
        <Link href="/manage-user">
          <li className="cursor-pointer p-4 hover:bg-green-200">사용자 관리</li>
        </Link>
        <li className="cursor-pointer p-4 hover:bg-green-200">Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
