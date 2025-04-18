"use client";

import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
  const router = useRouter();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <button
        onClick={() => router.push("/admin/products/edit")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Tambah Produk
      </button>
      <div>
        <ul>
          <li className="border p-2 mb-2 flex justify-between">
            Produk A
            <div>
              <button className="mr-2 text-blue-500">Edit</button>
              <button className="text-red-500">Hapus</button>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
