"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="flex items-center space-x-2">
        {/* Ganti src ini dengan logo asli Anda */}
        <Image src="/logo.png" alt="AdaAja Logo" width={30} height={30} />
        <span className="font-bold text-lg">ToTong</span>
      </div>
      <div className="space-x-6 text-sm">
        <Link href="/admin/dashboard" className="hover:underline">
          Beranda
        </Link>
        <Link href="/admin/products" className="hover:underline">
          Produk
        </Link>
        <Link href="/admin/transactions" className="hover:underline">
          Transaksi
        </Link>
      </div>
    </nav>
  );
}
