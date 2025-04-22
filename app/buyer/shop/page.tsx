"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Shop() {
  // Product categories
  const categories = [
    "Semua",
    "Elektronik",
    "Peralatan Dapur",
    "Fashion",
    "Olahraga",
    "Kesehatan",
    "Makanan & Minuman",
  ];

  // Products data
  const products = [
    {
      id: "prod001",
      name: "SmartWatch T3",
      price: 899000,
      discount: 999000,
      image: "/product/elektronik/SmartWatch T3.png",
      category: "Elektronik",
      rating: 4.5,
      description:
        "Smartwatch canggih dengan berbagai fitur kesehatan dan kebugaran.",
      stock: 15,
      sold: 45,
    },
    {
      id: "prod002",
      name: "Blender Multifungsi",
      price: 450000,
      discount: null,
      image: "/product/peralatan dapur/Blender Multifungsi.png",
      category: "Peralatan Dapur",
      rating: 4.8,
      description:
        "Blender serba guna dengan 5 kecepatan dan pisau stainless steel.",
      stock: 20,
      sold: 32,
    },
    {
      id: "prod003",
      name: "Sepatu Lari Pro",
      price: 750000,
      discount: 950000,
      image: "/product/olaraga/Sepatu Lari Pro.png",
      category: "Olahraga",
      rating: 4.7,
      description:
        "Sepatu lari dengan teknologi sol yang nyaman untuk jarak jauh.",
      stock: 8,
      sold: 63,
    },
    {
      id: "prod004",
      name: "Set Panci Premium",
      price: 1200000,
      discount: null,
      image: "/product/peralatan dapur/Set Panci Premium.png",
      category: "Peralatan Dapur",
      rating: 4.9,
      description:
        "Set 5 panci anti lengket dengan pegangan silikon tahan panas.",
      stock: 12,
      sold: 28,
    },
    {
      id: "prod005",
      name: "Speaker Bluetooth Mini",
      price: 320000,
      discount: 380000,
      image: "/product/elektronik/speaker bluetooth mini.png",
      category: "Elektronik",
      rating: 4.3,
      description: "Speaker bluetooth portabel dengan baterai tahan 12 jam.",
      stock: 25,
      sold: 71,
    },
    {
      id: "prod006",
      name: "Vitamin C 1000mg",
      price: 85000,
      discount: null,
      image: "/product/kesehatan/vitamin c 1000mg.png",
      category: "Kesehatan",
      rating: 4.6,
      description:
        "Vitamin C dosis tinggi untuk meningkatkan daya tahan tubuh.",
      stock: 50,
      sold: 124,
    },
    {
      id: "prod007",
      name: "Kemeja Kerja Formal",
      price: 275000,
      discount: 350000,
      image: "/product/fashion/kemeja kerja formal.png",
      category: "Fashion",
      rating: 4.4,
      description:
        "Kemeja formal dengan bahan katun premium nyaman untuk aktivitas kerja.",
      stock: 18,
      sold: 42,
    },
    {
      id: "prod008",
      name: "Kopi Arabica Premium",
      price: 120000,
      discount: null,
      image: "/product/makanan&minuman/kopi arabica premium.png",
      category: "Makanan & Minuman",
      rating: 4.8,
      description:
        "Biji kopi arabica pilihan dari dataran tinggi dengan rasa khas.",
      stock: 30,
      sold: 87,
    },
    {
      id: "prod009",
      name: "Alat Fitness Portable",
      price: 520000,
      discount: 650000,
      image: "/product/olaraga/alat fitness portable.png",
      category: "Olahraga",
      rating: 4.2,
      description:
        "Set alat fitness yang bisa digunakan di rumah dengan mudah.",
      stock: 15,
      sold: 38,
    },
    {
      id: "prod010",
      name: "Minyak Zaitun Extra Virgin",
      price: 180000,
      discount: null,
      image: "/product/makanan&minuman/minyak zaitun extra virgin.png",
      category: "Makanan & Minuman",
      rating: 4.7,
      description: "Minyak zaitun murni kualitas terbaik untuk memasak sehat.",
      stock: 40,
      sold: 56,
    },
    {
      id: "prod011",
      name: "Tablet 10 Inch",
      price: 2500000,
      discount: 2800000,
      image: "/product/elektronik/tablet 10 inch.png",
      category: "Elektronik",
      rating: 4.5,
      description:
        "Tablet dengan layar 10 inch resolusi tinggi dan performa cepat.",
      stock: 10,
      sold: 25,
    },
    {
      id: "prod012",
      name: "Celana Jeans Premium",
      price: 350000,
      discount: null,
      image: "/product/fashion/celana jeans premium.png",
      category: "Fashion",
      rating: 4.6,
      description: "Celana jeans dengan bahan nyaman dan jahitan berkualitas.",
      stock: 22,
      sold: 49,
    },
  ];

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortOption, setSortOption] = useState("popular");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); // Menambahkan state untuk keranjang

  // Loading effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter products based on search, category, and sort
  useEffect(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "Semua") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "popular":
        result.sort((a, b) => b.sold - a.sold);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortOption]);

  // Format price to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan Search dan Keranjang */}
      <section className="py-4 bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Search Bar dan Keranjang */}
            <div className="flex items-center w-full max-w-xl mx-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Keranjang */}
              <div className="ml-4 relative">
                <Link href="/cart">
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Categories dibawah search bar */}
          <div className="mt-4 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-orange-400 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Sort - hanya tampil di layar kecil */}
          <div className="mt-4 md:hidden">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="popular">Paling Populer</option>
              <option value="newest">Terbaru</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            // Loading State
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            // Products Grid
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {Math.round(
                            (1 - product.price / product.discount) * 100
                          )}
                          % OFF
                        </div>
                      )}
                      {product.stock < 10 && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Stok Terbatas
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-medium text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <div className="ml-auto flex items-center text-sm text-yellow-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {product.rating}
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <div className="mt-1">
                        <span className="font-bold text-lg text-orange-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.discount && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {formatPrice(product.discount)}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Terjual {product.sold} | Stok {product.stock}
                      </div>

                      {/* Tombol beli dan keranjang (seperti contoh gambar) */}
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Beli Sekarang: ${product.name}`);
                          }}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Beli
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setCartCount(cartCount + 1);
                          }}
                          className="w-12 h-10 flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-100 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            // No Products Found
            <div className="text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-gray-500 mb-4">
                Coba kata kunci lain atau ubah filter pencarian Anda
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Semua");
                  setSortOption("popular");
                }}
                className="bg-orange-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-500 transition"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
