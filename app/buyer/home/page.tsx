"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      image: "/banner1.jpg",
      title: "Diskon Besar-Besaran!",
      description: "Nikmati promo hingga 70% untuk produk pilihan.",
    },
    {
      image: "/banner2.png",
      title: "Belanja Hemat",
      description: "Produk berkualitas dengan harga terjangkau.",
    },
    {
      image: "/banner3.png",
      title: "Pengiriman Cepat",
      description: "Belanja sekarang, barang cepat sampai ke rumah Anda.",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "SmartWatch T3",
      price: "Rp 899.000",
      image: "/product/elektronik/SmartWatch T3.png",
      category: "Elektronik",
    },
    {
      id: 2,
      name: "Blender Multifungsi",
      price: "Rp 450.000",
      image: "/product/peralatan dapur/Blender Multifungsi.png",
      category: "Peralatan Dapur",
    },
    {
      id: 3,
      name: "Sepatu Lari Pro",
      price: "Rp 750.000",
      image: "/product/olaraga/Sepatu Lari Pro.png",
      category: "Olahraga",
    },
    {
      id: 4,
      name: "Set Panci Premium",
      price: "Rp 1.200.000",
      image: "/product/peralatan dapur/Set Panci Premium.png",
      category: "Peralatan Dapur",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-orange-400 text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Selamat Datang di ToTong
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Tempat belanja serba ada yang siap memenuhi segala kebutuhan Anda.
              Kami hadir untuk memberikan pengalaman belanja yang mudah, cepat,
              dan menyenangkan.
            </p>
            <Link href="./shop">
              <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-medium text-lg">
                Mulai Belanja
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 md:opacity-30">
          <svg width="300" height="300" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="white" />
            <circle cx="100" cy="100" r="60" fill="orange" />
            <circle cx="100" cy="100" r="40" fill="white" />
          </svg>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-orange-500 text-3xl font-bold text-center mb-8">
            Promo Spesial
          </h2>
          <div className="relative h-64 md:h-80 overflow-hidden rounded-xl shadow-lg">
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentBanner ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-full h-full relative">
                  <div className="relative z-20 text-white p-8 md:p-12 max-w-md">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {banner.title}
                    </h3>
                    <p className="text-lg">{banner.description}</p>
                  </div>
                  <div className="absolute inset-0 z-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentBanner ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-orange-500 text-3xl font-bold text-center mb-2">
            Produk Unggulan
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Pilihan terbaik dari berbagai kategori
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition"
              >
                <div className="relative h-48 w-full bg-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-lg mt-2">{product.name}</h3>
                  <p className="text-gray-700 font-medium mt-1">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="./shop">
              <button className="bg-orange-400 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-orange-500 transition">
                Lihat Semua Produk
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Store Benefits */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-orange-500 text-3xl font-bold text-center mb-12">
            Kenapa Belanja di ToTong?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center hover:-translate-y-1 transition">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600">
                Barang sampai dalam waktu 1-3 hari kerja untuk seluruh Indonesia
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:-translate-y-1 transition">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Produk Berkualitas</h3>
              <p className="text-gray-600">
                Semua produk kami melalui proses kontrol kualitas yang ketat
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:-translate-y-1 transition">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pembayaran Aman</h3>
              <p className="text-gray-600">
                Berbagai metode pembayaran dengan keamanan bertaraf
                internasional
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
