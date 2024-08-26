import React from 'react';
import { getProductList } from '@/src/app/product/action';
import ProductGrid from '@_admin/manage-product/productGrid';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  const productList = await getProductList(query);

  return (
    <div className="h-full w-full">
      <ProductGrid productList={productList} />
    </div>
  );
}
