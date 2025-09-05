'use client';

import { useEffect, useState } from 'react';
// import { Database } from '@/types/supabase';

// type Product = Database['public']['Tables']['product']['Row'];

type Product = {
  id: string;
  name: string;
  price: number;
  cost: number;
  attachments: string | null;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
 
  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiZEBkLmRkIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU3MDYyNTgwLCJleHAiOjE3NTcwNjYxODB9.cSrtBQ7rCt54QxLoJrx-JoDCq6XasJbawolrBLPlMXE';
    fetch('/api/product', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.data.products));
  }, []);

  return (
    // opacity-0
    <div className="flex-1 flex flex-col gap-20 px-3 animate-fade-in">
      <main className="flex-1 flex flex-col gap-6">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Cost</th>
              <th className="border border-gray-200 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.cost}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
