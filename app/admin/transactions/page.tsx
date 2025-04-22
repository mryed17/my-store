// app/admin/transactions/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Transaction {
  id: string;
  date: string;
  customerName: string;
  productName: string;
  quantity: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching transactions
    setTimeout(() => {
      setTransactions([
        { 
          id: "TR001", 
          date: "2025-04-20", 
          customerName: "Budi Santoso", 
          productName: "Laptop Asus TUF Gaming", 
          quantity: 1, 
          total: 12000000, 
          status: "completed" 
        },
        { 
          id: "TR002", 
          date: "2025-04-19", 
          customerName: "Ani Wijaya", 
          productName: "Samsung Galaxy S21", 
          quantity: 1, 
          total: 9000000, 
          status: "pending" 
        },
        { 
          id: "TR003", 
          date: "2025-04-18", 
          customerName: "Dedi Kurniawan", 
          productName: "Logitech MX Master 3", 
          quantity: 2, 
          total: 2400000, 
          status: "completed" 
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      // Delete transaction logic would go here
      setTransactions(transactions.filter(transaction => transaction.id !== id));
      alert("Transaksi berhasil dihapus");
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "pending":
        return "Menunggu";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="flex justify-center py-10">Memuat data transaksi...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
        <Link 
          href="/admin/transactions/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Transaksi
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Tanggal</th>
              <th className="py-2 px-4 text-left">Pembeli</th>
              <th className="py-2 px-4 text-left">Produk</th>
              <th className="py-2 px-4 text-right">Jumlah</th>
              <th className="py-2 px-4 text-right">Total</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t">
                <td className="py-2 px-4">{transaction.id}</td>
                <td className="py-2 px-4">{transaction.date}</td>
                <td className="py-2 px-4">{transaction.customerName}</td>
                <td className="py-2 px-4">{transaction.productName}</td>
                <td className="py-2 px-4 text-right">{transaction.quantity}</td>
                <td className="py-2 px-4 text-right">
                  Rp {transaction.total.toLocaleString('id-ID')}
                </td>
                <td className="py-2 px-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(transaction.status)}`}>
                    {getStatusLabel(transaction.status)}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex justify-center space-x-2">
                    <Link 
                      href={`/admin/transactions/edit?id=${transaction.id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(transaction.id)}
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
