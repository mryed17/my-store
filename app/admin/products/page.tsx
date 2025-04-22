// app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => {
      setProducts([
        { id: "P001", name: "Laptop Asus TUF Gaming", price: 12000000, stock: 5, category: "Elektronik" },
        { id: "P002", name: "Samsung Galaxy S21", price: 9000000, stock: 10, category: "Smartphone" },
        { id: "P003", name: "Logitech MX Master 3", price: 1200000, stock: 15, category: "Aksesoris" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      // Delete product logic would go here
      setProducts(products.filter(product => product.id !== id));
      alert("Produk berhasil dihapus");
    }
  };

  if (loading) {
    return <div className="flex justify-center py-10">Memuat data produk...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        <Link 
          href="/admin/products/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Nama Produk</th>
              <th className="py-2 px-4 text-left">Kategori</th>
              <th className="py-2 px-4 text-right">Harga</th>
              <th className="py-2 px-4 text-right">Stok</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4 text-right">
                  Rp {product.price.toLocaleString('id-ID')}
                </td>
                <td className="py-2 px-4 text-right">{product.stock}</td>
                <td className="py-2 px-4">
                  <div className="flex justify-center space-x-2">
                    <Link 
                      href={`/admin/products/edit?id=${product.id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
