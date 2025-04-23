"use client";

import { useState, useEffect } from "react";

type Transaction = {
  id: string;
  orderId: string;
  customerName: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setTransactions([
          {
            id: "1",
            orderId: "ORD-001",
            customerName: "John Doe",
            date: "2023-05-15",
            amount: 12000000,
            status: "completed",
          },
          {
            id: "2",
            orderId: "ORD-002",
            customerName: "Jane Smith",
            date: "2023-05-16",
            amount: 9000000,
            status: "pending",
          },
          {
            id: "3",
            orderId: "ORD-003",
            customerName: "Robert Johnson",
            date: "2023-05-17",
            amount: 1200000,
            status: "completed",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTransaction) return;

    if (currentTransaction.id) {
      setTransactions(
        transactions.map((t) =>
          t.id === currentTransaction.id ? currentTransaction : t
        )
      );
    } else {
      const newTransaction = {
        ...currentTransaction,
        id: Date.now().toString(),
      };
      setTransactions([...transactions, newTransaction]);
    }

    setIsModalOpen(false);
    setCurrentTransaction(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
        <button
          onClick={() => {
            setCurrentTransaction({
              id: "",
              orderId: "",
              customerName: "",
              date: new Date().toISOString().split("T")[0],
              amount: 0,
              status: "pending",
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Transaksi
        </button>
      </div>

      {isLoading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Nama Pelanggan</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{transaction.orderId}</td>
                  <td className="py-2 px-4 border-b">
                    {transaction.customerName}
                  </td>
                  <td className="py-2 px-4 border-b">{transaction.date}</td>
                  <td className="py-2 px-4 border-b">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status === "completed"
                        ? "Selesai"
                        : transaction.status === "pending"
                        ? "Pending"
                        : "Dibatalkan"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => {
                        setCurrentTransaction(transaction);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && currentTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentTransaction.id ? "Edit Transaksi" : "Tambah Transaksi"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Order ID</label>
                <input
                  type="text"
                  value={currentTransaction.orderId}
                  onChange={(e) =>
                    setCurrentTransaction({
                      ...currentTransaction,
                      orderId: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  value={currentTransaction.customerName}
                  onChange={(e) =>
                    setCurrentTransaction({
                      ...currentTransaction,
                      customerName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tanggal</label>
                <input
                  type="date"
                  value={currentTransaction.date}
                  onChange={(e) =>
                    setCurrentTransaction({
                      ...currentTransaction,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Jumlah</label>
                <input
                  type="number"
                  value={currentTransaction.amount}
                  onChange={(e) =>
                    setCurrentTransaction({
                      ...currentTransaction,
                      amount: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  value={currentTransaction.status}
                  onChange={(e) =>
                    setCurrentTransaction({
                      ...currentTransaction,
                      status: e.target.value as Transaction["status"],
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentTransaction(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
