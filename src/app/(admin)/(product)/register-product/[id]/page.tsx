import React from 'react';
import { getProductOne } from '@/src/app/product/action';
import ProductForm from '@_admin/(product)/register-product/product-form';

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductOne(Number(params.id));
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}
