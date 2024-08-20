import React from 'react'
import { getProductOne } from '@/src/app/product/action'
import { unstable_cache as nextCache, revalidateTag } from 'next/cache'

const getCachedProduct = nextCache(getProductOne, ['product-detail'], {
  tags: ['post-detail'],
  revalidate: 60,
})

export default async function ProductDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)
  const product = await getCachedProduct(id)
  return <div>{product.name}</div>
}
