import React from 'react'
import { getProductList } from '@/src/app/product/action'
import Link from 'next/link'

export default async function ProductList() {
  const productList = await getProductList()
  return (
    <div>
      {productList.map((pl) => (
        <Link href={`/product/${pl.id}`} className="flex gap-5" key={pl.id}>
          <div key={pl.id}>{pl.name}</div>
        </Link>
      ))}
    </div>
  )
}
