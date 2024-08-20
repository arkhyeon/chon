'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const seedDatabase = async () => {
    await fetch('/api/seed', {
      method: 'POST',
    });
    await fetchUsers();
  };

  return (
    <div>
      <Head>
        <title>My Green E-commerce Site</title>
        <meta name="description" content="Green themed e-commerce site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-green-900 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <h1 className="text-3xl font-bold">Green</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-green-300">
              Home
            </Link>
            <Link href="product" className="hover:text-green-300">
              Shop
            </Link>
            <Link href="/" className="hover:text-green-300">
              About
            </Link>
            <Link href="profile" className="hover:text-green-300">
              My page
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-green-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-green-900">
                Featured Products
              </h2>
              <p className="mt-4 text-green-600">
                Check out our latest products!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <img
                  src="/images/product1.jpg"
                  alt="Product 1"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-900">
                    Product 1
                  </h3>
                  <p className="text-green-600">$19.99</p>
                  <button className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <img
                  src="/images/product2.jpg"
                  alt="Product 2"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-900">
                    Product 2
                  </h3>
                  <p className="text-green-600">$29.99</p>
                  <button className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <img
                  src="/images/product3.jpg"
                  alt="Product 3"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-900">
                    Product 3
                  </h3>
                  <p className="text-green-600">$39.99</p>
                  <button className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-900 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Green E-commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
