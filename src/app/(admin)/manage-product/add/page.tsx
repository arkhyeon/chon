'use server';

import React from 'react';
import ProductForm from '@_admin/manage-product/add/product-form';

export default async function Page() {
  return (
    <div>
      <ProductForm />
    </div>
  );
}
