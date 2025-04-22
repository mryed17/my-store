// app/admin/transactions/add/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function AddTransactionPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: "",
    productId: "",
    quantity: "1",
    status: "pending",
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => {
      setProducts([
        { id: "P001", name: "Laptop Asus TUF Gaming", price: 12000000, stock: 5 },
        { id: "P002", name: "Samsung Galaxy S21", price: 9000000, stock: 10 },
        { id: "P003", name: "Logitech MX Master 3", price: 1200000, stock: 15 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "productId") {
      const product = products.find(p => p.id === value) || null;
      setSelectedProduct(product);
    }
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * parseInt(formData.quantity || "0");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      alert("Silakan pilih produk");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Transaksi berhasil ditambahkan!");
      router.push("/admin/transactions");
    }, 1000);
  };

  if (loading) {
    return <div className="flex justify-center py-10">Memuat data produk...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/transactions" className="text-blue-600 hover:underline mr-4">
          &larr; Kembali
        </Link>
        <h1 className="text-2xl font-bold">Tambah Transaksi Baru</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
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
                max={selectedProduct?.stock || 1}
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
          
          {selectedProduct && (
            <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-semibold mb-2">Detail Transaksi</h3>
              <div className="flex justify-between mb-1">
                <span>Produk:</span>
                <span>{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Harga Satuan:</span>
                <span>Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
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
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Transaksi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
