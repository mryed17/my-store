"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 shadow-md bg-orange-400">
      <Link href="./dashboard">Dashboard</Link>
      <Link href="./products">Product</Link>
      <Link href="./transactions">Transaksi</Link>
      <Link href="./tata-kelola">Tata Kelola</Link>
    </nav>
  );
}
