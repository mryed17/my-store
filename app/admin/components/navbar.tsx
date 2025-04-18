"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 shadow-md bg-orange-400">
      <Link href="./home">Home</Link>
      <Link href="./about">About</Link>
      <Link href="./shop">Shop</Link>
      <Link href="./contact">Contact</Link>
    </nav>
  );
}
