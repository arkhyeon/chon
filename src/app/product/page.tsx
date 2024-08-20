import { signOut } from '@/auth';
import ProductList from '@/src/app/product/productList';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'ProductList' };

export default async function productPage() {
  return (
    <div>
      <ProductList />
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
