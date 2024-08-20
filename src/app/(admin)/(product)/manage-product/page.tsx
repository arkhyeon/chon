import React from 'react';
import { getProductList } from '@/src/app/product/action';
import ProductGrid from '@/src/app/(admin)/(product)/manage-product/productGrid';

export default async function Page() {
  const productList = await getProductList();

  return (
    <div className="h-full w-full">
      <ProductGrid productList={productList} />
    </div>
  );
}
