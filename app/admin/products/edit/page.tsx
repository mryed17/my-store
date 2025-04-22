// app/admin/products/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    if (!productId) {
      alert("ID Produk tidak valid");
      router.push("/admin/products");
      return;
    }

    // Simulate fetching product data
    setTimeout(() => {
      setFormData({
        id: productId,
        name: "Laptop Asus TUF Gaming",
        category: "Elektronik",
        price: "12000000",
        stock: "5",
        description: "Laptop gaming dengan performa tinggi",
      });
      setLoading(false);
    }, 500);
  }, [productId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Produk berhasil diperbarui!");
      router.push("/admin/products");
    }, 1000);
  };

  if (loading) {
    return <div className="flex justify-center py-10">Memuat data produk...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="text-blue-600 hover:underline mr-4">
          &larr; Kembali
        </Link>
        <h1 className="text-2xl font-bold">Edit Produk: {formData.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
              ID Produk
            </label>
            <input
              type="text"
              id="id"
              value={formData.id}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
              disabled
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Produk
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Kategori
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Aksesoris">Aksesoris</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Harga (Rp)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                Stok
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Deskripsi Produk
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              rows={4}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Perbarui Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
