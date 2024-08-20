'use client';
import React from 'react';
import {
  PiEyeBold,
  PiShoppingBagBold,
  PiShoppingCartSimpleBold,
  PiUserPlusBold,
} from 'react-icons/pi';
import bb, { line } from 'billboard.js';
import BillboardJS from '@billboard.js/react';
import 'billboard.js/dist/billboard.css';
import { MdOutlineInventory2 } from 'react-icons/md';
import { GoThumbsup } from 'react-icons/go';
import { TbMailCheck } from 'react-icons/tb';

function Page() {
  line();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <div className="rounded-sm border bg-green-500 p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600">
            <PiEyeBold size="28" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black dark:text-white">3.456K</h4>
              <span className="font-medium">Total Views</span>
            </div>
            <span className="flex items-center gap-1 font-medium">0.43% ↑</span>
          </div>
        </div>
        <div className="rounded-sm border bg-green-500 p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600">
            <PiShoppingCartSimpleBold size="26" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black dark:text-white">$45,6K</h4>
              <span className="font-medium">Total Profit</span>
            </div>
            <span className="flex items-center gap-1 font-medium">0.43% ↑</span>
          </div>
        </div>
        <div className="rounded-sm border bg-green-500 p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600">
            <PiShoppingBagBold size="26" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black dark:text-white">1557</h4>
              <span className="font-medium">Total Product</span>
            </div>
            <span className="flex items-center gap-1 font-medium">0.43% ↑</span>
          </div>
        </div>
        <div className="rounded-sm border bg-green-500 p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600">
            <PiUserPlusBold size="26" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="font-bold text-black dark:text-white">1800</h4>
              <span className="font-medium">Total Users</span>
            </div>
            <span className="flex items-center gap-1 font-medium">0.43% ↑</span>
          </div>
        </div>
      </div>
      <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <div className="rounded-sm border bg-green-500 p-6 md:col-span-2">
          <BillboardJS
            bb={bb}
            options={{
              data: {
                x: 'x',
                columns: [
                  [
                    'x',
                    '2013-01-01',
                    '2013-01-02',
                    '2013-01-03',
                    '2013-01-04',
                    '2013-01-05',
                    '2013-01-06',
                  ],
                  ['data1', 30, 200, 180, 300, 250, 550],
                  ['data2', 20, 240, 160, 400, 350, 560],
                ],
                type: 'line', // for ESM specify as: line()
              },
              axis: { x: { type: 'timeseries', tick: { format: '%Y-%m-%d' } } },
              bindto: '#timeseriesChart',
            }}
            style={{ width: '100%' }}
            className={'bb my-classname'}
          />
        </div>
        <div className="bg-green-500 p-6 md:col-span-2 xl:col-span-1">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-5 py-1.5">
              <img
                src={product.image}
                alt={product.name}
                className="relative h-14 w-14"
              />
              <div className="flex flex-1 flex-col justify-center">
                <h2 className="font-medium text-black dark:text-white">
                  {product.name}
                </h2>
                <div className="mt-2 flex items-center justify-between xl:justify-start xl:gap-8">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {product.price}
                  </p>
                  <span className="flex items-center gap-1 text-sm text-gray-700">
                    <GoThumbsup /> {product.likes}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-700">
                    <MdOutlineInventory2 /> {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-6 grid grid-cols-1 gap-4 bg-green-500 p-4">
        {qnaList.map((qna) => (
          <div key={qna.id} className="rounded-md bg-green-600 p-4 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{qna.title}</h2>
              <div className="flex items-center space-x-4 text-gray-500">
                <span>{qna.author}</span>
                <span>{qna.date}</span>
                <span>{qna.answered ? <TbMailCheck size="22" /> : null}</span>
              </div>
            </div>
            <p className="text-gray-700">{qna.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;

const products = [
  {
    id: 1,
    image: 'http://192.168.10.17:8080/CLM22/resources/img/logo_bg.png', // 이미지 경로는 실제 이미지 파일 경로로 변경하세요.
    name: 'SQLCanvas CLM30',
    price: '₩ 10,000',
    likes: 120,
    stock: 30,
  },
  {
    id: 2,
    image: 'http://192.168.10.26:8080/Trans4.7/image/header/top_icon_on_06.png',
    name: 'SQLCanvas Trans4.7 POST',
    price: '₩ 20,000',
    likes: 80,
    stock: 20,
  },
  {
    id: 3,
    image: 'http://192.168.10.17:8080/CLM22/resources/img/logo_bg.png', // 이미지 경로는 실제 이미지 파일 경로로 변경하세요.
    name: 'SQLCanvas CLM30',
    price: '₩ 10,000',
    likes: 120,
    stock: 30,
  },
  {
    id: 4,
    image: 'http://192.168.10.17:8080/CLM22/resources/img/logo_bg.png', // 이미지 경로는 실제 이미지 파일 경로로 변경하세요.
    name: 'SQLCanvas CLM30',
    price: '₩ 10,000',
    likes: 120,
    stock: 30,
  },
  {
    id: 5,
    image: 'http://192.168.10.17:8080/CLM22/resources/img/logo_bg.png', // 이미지 경로는 실제 이미지 파일 경로로 변경하세요.
    name: 'SQLCanvas CLM30',
    price: '₩ 10,000',
    likes: 120,
    stock: 30,
  },
];

const qnaList = [
  {
    id: 1,
    title: '첫 번째 질문입니다.',
    author: '작성자1',
    date: '2023-01-01',
    answered: true,
    content: '이것은 첫 번째 질문의 본문 내용입니다.',
  },
  {
    id: 2,
    title: '두 번째 질문입니다.',
    author: '작성자2',
    date: '2023-01-02',
    answered: false,
    content: '이것은 두 번째 질문의 본문 내용입니다.',
  },
  {
    id: 3,
    title: '두 번째 질문입니다.',
    author: '작성자2',
    date: '2023-01-02',
    answered: false,
    content: '이것은 두 번째 질문의 본문 내용입니다.',
  },
  {
    id: 4,
    title: '두 번째 질문입니다.',
    author: '작성자2',
    date: '2023-01-02',
    answered: false,
    content: '이것은 두 번째 질문의 본문 내용입니다.',
  },
  {
    id: 5,
    title: '두 번째 질문입니다.',
    author: '작성자2',
    date: '2023-01-02',
    answered: false,
    content: '이것은 두 번째 질문의 본문 내용입니다.',
  },
];
