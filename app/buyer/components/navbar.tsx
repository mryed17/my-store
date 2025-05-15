"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-orange-400">
      <div className="logo w-25 h-8 relative">
        <Image
          src="/totong2.png"
          alt="Company Logo"
          fill
          className="object-contain rounded-full"
        />
      </div>

      <div className="flex gap-6 text-white">
        <Link href="./home">Home</Link>
        <Link href="./shop">Shop</Link>
        <Link href="./about">About</Link>
        <Link href="./contact">Contact</Link>
      </div>
    </nav>
  );
}
