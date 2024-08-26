'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();
  const [isProductMenuOpen, setProductMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isPaymentMenuOpen, setPaymentMenuOpen] = useState(false);
  const [isQnAMenuOpen, setQnAMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname.includes('/manage-user')) {
      setUserMenuOpen(true);
    }
    if (pathname.includes('/manage-product')) {
      setProductMenuOpen(true);
    }
    if (pathname.includes('/manage-payment')) {
      setPaymentMenuOpen(true);
    }
  }, [pathname]);

  return (
    <div className="h-full w-64 bg-green-800 shadow-md">
      <div className="border-b px-6 py-5.5 text-xl font-bold">TailAdmin</div>
      <ul>
        <Link href="/dashboard">
          <li
            className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/dashboard' ? 'bg-green-300' : ''}`}
          >
            대시보드
          </li>
        </Link>
        <li
          className="cursor-pointer p-4 hover:bg-green-200"
          onClick={() => setProductMenuOpen(!isProductMenuOpen)}
        >
          상품 관리
        </li>
        {isProductMenuOpen && (
          <ul className="pl-8">
            <Link href="/manage-product">
              <li
                className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/manage-product' ? 'bg-green-300' : ''}`}
              >
                전체 상품
              </li>
            </Link>
            <Link href="/manage-product/add">
              <li
                className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/manage-product/add' ? 'bg-green-300' : ''}`}
              >
                상품 추가
              </li>
            </Link>
          </ul>
        )}
        <li
          className="cursor-pointer p-4 hover:bg-green-200"
          onClick={() => setUserMenuOpen(!isUserMenuOpen)}
        >
          사용자 관리
        </li>
        {isUserMenuOpen && (
          <ul className="pl-8">
            <Link href="/manage-user">
              <li
                className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/manage-user' ? 'bg-green-300' : ''}`}
              >
                전체 사용자 보기
              </li>
            </Link>
            <Link href="/manage-user/add">
              <li
                className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/manage-user/add' ? 'bg-green-300' : ''}`}
              >
                사용자 추가
              </li>
            </Link>
          </ul>
        )}
        <li
          className="cursor-pointer p-4 hover:bg-green-200"
          onClick={() => setPaymentMenuOpen(!isPaymentMenuOpen)}
        >
          결제 관리
        </li>
        {isPaymentMenuOpen && (
          <ul className="pl-8">
            <Link href="/manage-payment?createSdt=2024-08-01&createEdt=2024-09-05">
              <li
                className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/manage-payment' ? 'bg-green-300' : ''}`}
              >
                결제 목록
              </li>
            </Link>
            <Link href="/manage-user/add">
              <li
                className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/manage-user/add' ? 'bg-green-300' : ''}`}
              >
                사용자 추가
              </li>
            </Link>
          </ul>
        )}
        <li
          className="cursor-pointer p-4 hover:bg-green-200"
          onClick={() => setQnAMenuOpen(!isQnAMenuOpen)}
        >
          Q&A 관리
        </li>
        {isQnAMenuOpen && (
          <ul className="pl-8">
            <Link href="/manage-qna">
              <li
                className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/manage-qna' ? 'bg-green-300' : ''}`}
              >
                Q&A 목록
              </li>
            </Link>
          </ul>
        )}
        <li
          className={`cursor-pointer p-4 hover:bg-green-200 ${pathname === '/setting' ? 'bg-green-300' : ''}`}
        >
          Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
