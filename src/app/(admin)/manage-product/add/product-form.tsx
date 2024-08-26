'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Input from '@/src/app/components/InputGroup';
import {
  createProduct,
  updateProduct,
} from '@_admin/(product)/manage-product/add/action';
import { Product } from '@prisma/client';
import Tiptap from '@/src/ui/tiptap/tiptap';
import { useState } from 'react';

export default function ProductForm({ product }: { product?: Product }) {
  const [content, setContent] = useState(product?.introduction ?? '');
  const isEdit = product !== undefined;
  const [errors, dispatch] = useFormState(
    (prevState: any, formData: FormData) => {
      if (isEdit) {
        return updateProduct(prevState, formData, product, content);
      }
      return createProduct(prevState, formData, content);
    },
    null,
  );

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-green-800 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please product to continue.</h1>
        <div className="flex-col">
          <label htmlFor="name">상품명</label>
          <Input
            id="name"
            name="name"
            required
            errors={errors?.fieldErrors.name}
            defaultValue={product?.name}
          />
          <label htmlFor="description">설명</label>
          <Input
            id="description"
            name="description"
            defaultValue={product?.description}
          />
          <label htmlFor="price">가격</label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            errors={errors?.fieldErrors.price}
            defaultValue={product?.price}
          />
          <label htmlFor="imageUrl">이미지</label>
          <Input
            id="imageUrl"
            name="imageUrl"
            defaultValue={product?.imageUrl}
          />
          <label htmlFor="introduction">글</label>
          <section className="flex w-full overflow-auto rounded-lg border-2 border-black">
            <Tiptap content={content} setContent={setContent} />
          </section>
          <label htmlFor="stock">재고</label>
          <Input
            id="stock"
            name="stock"
            errors={errors?.fieldErrors.stock}
            defaultValue={product?.stock}
            type="number"
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
      {pending ? <>하는중~~~~~~</> : <>제품 등록</>}
    </button>
  );
}
