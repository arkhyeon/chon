'use server';

import React from 'react';
import ProductForm from '@_admin/(product)/register-product/product-form';

export default async function Page() {
  return (
    <div>
      <ProductForm />
    </div>
  );
}
