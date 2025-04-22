// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";

interface DashboardData {
  totalProducts: number;
  totalTransactions: number;
  revenue: number;
  recentTransactions: {
    id: string;
    date: string;
    productName: string;
    amount: number;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalProducts: 0,
    totalTransactions: 0,
    revenue: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    setTimeout(() => {
      setData({
        totalProducts: 25,
        totalTransactions: 156,
        revenue: 15600000,
        recentTransactions: [
          { id: "TR001", date: "2025-04-20", productName: "Laptop Asus", amount: 12000000 },
          { id: "TR002", date: "2025-04-19", productName: "Smartphone Samsung", amount: 3600000 },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="flex justify-center py-10">Memuat data...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Total Produk</h2>
          <p className="text-3xl font-bold">{data.totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Total Transaksi</h2>
          <p className="text-3xl font-bold">{data.totalTransactions}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Total Pendapatan</h2>
          <p className="text-3xl font-bold">
            Rp {data.revenue.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Transaksi Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Tanggal</th>
                <th className="py-2 px-4 text-left">Produk</th>
                <th className="py-2 px-4 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {data.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t">
                  <td className="py-2 px-4">{transaction.id}</td>
                  <td className="py-2 px-4">{transaction.date}</td>
                  <td className="py-2 px-4">{transaction.productName}</td>
                  <td className="py-2 px-4 text-right">
                    Rp {transaction.amount.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
