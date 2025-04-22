// app/admin/transactions/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface TransactionData {
  id: string;
  date: string;
  customerName: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  status: "pending" | "completed" | "cancelled";
}

export default function EditTransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<TransactionData>({
    id: "",
    date: "",
    customerName: "",
    productId: "",
    productName: "",
    productPrice: 0,
    quantity: 0,
    status: "pending"
  });

  useEffect(() => {
    if (!transactionId) {
      alert("ID Transaksi tidak valid");
      router.push("/admin/transactions");
      return;
    }

    // Simulate fetching transaction data and products
    Promise.all([
      new Promise<TransactionData>((resolve) => {
        setTimeout(() => {
          resolve({
            id: transactionId,
            date: "2025-04-20",
            customerName: "Budi Santoso",
            productId: "P001",
            productName: "Laptop Asus TUF Gaming",
            productPrice: 12000000,
            quantity: 1,
            status: "completed"
          });
        }, 300);
      }),
      new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: "P001", name: "Laptop Asus TUF Gaming", price: 12000000, stock: 5 },
            { id: "P002", name: "Samsung Galaxy S21", price: 9000000, stock: 10 },
            { id: "P003", name: "Logitech MX Master 3", price: 1200000, stock: 15 },
          ]);
        }, 300);
      })
    ]).then(([transactionData, productsData]) => {
      setFormData(transactionData);
      setProducts(productsData);
      setLoading(false);
    });
  }, [transactionId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "productId") {
      const product = products.find(p => p.id === value);
      if (product) {
        setFormData(prev => ({
          ...prev,
          productId: product.id,
          productName: product.name,
          productPrice: product.price
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateTotal = () => {
    return formData.productPrice * formData.quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Transaksi berhasil diperbarui!");
      router.push("/admin/transactions");
    }, 1000);
  };

  if (loading) {
    return <div className="flex justify-center py-10">Memuat data transaksi...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/transactions" className="text-blue-600 hover:underline mr-4">
          &larr; Kembali
        </Link>
        <h1 className="text-2xl font-bold">Edit Transaksi: {formData.id}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                ID Transaksi
              </label>
              <input
                type="text"
                id="id"
                value={formData.id}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Tanggal
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
              Nama Pembeli
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">
              Produk
            </label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Pilih Produk</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - Rp {product.price.toLocaleString('id-ID')} (Stok: {product.stock})
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                Jumlah
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="pending">Menunggu</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h3 className="font-semibold mb-2">Detail Transaksi</h3>
            <div className="flex justify-between mb-1">
              <span>Produk:</span>
              <span>{formData.productName}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Harga Satuan:</span>
              <span>Rp {formData.productPrice.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Jumlah:</span>
              <span>{formData.quantity}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Perbarui Transaksi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
