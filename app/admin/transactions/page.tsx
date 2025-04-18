"use client";

import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const router = useRouter();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>
      <button
        onClick={() => router.push("/admin/transactions/edit")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Tambah Transaksi
      </button>
      <ul>
        <li className="border p-2 mb-2 flex justify-between">
          #TX001 - John Doe - Produk A
          <div>
            <button className="mr-2 text-blue-500">Edit</button>
            <button className="text-red-500">Hapus</button>
          </div>
        </li>
      </ul>
    </main>
  );
}
