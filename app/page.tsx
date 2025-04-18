import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: 'url("/bg.png")' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-20">
        {/* Kiri - Logo dan Tagline */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="relative w-84 h-64">
            <Image src="/totong1.png" alt="Logo Totong" fill priority />
          </div>
          <div className="lg:text-center md:text-left">
            <h1 className="text-white text-lg font-semibold">
              PILIHAN LENGKAP, HARGA MANTAP
            </h1>
            <h2 className="text-orange-700 text-xl font-bold mt-2">
              DOMPET TETAP SELAMAT!
            </h2>
          </div>
        </div>

        {/* Kanan - Tombol Login & Registrasi */}
        <div className="flex flex-col gap-4">
          <Link href="/auth/login">
            <button className="w-[200px] h-[50px] bg-white text-orange-600 font-semibold rounded-xl shadow-md hover:scale-105 transition">
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="w-[200px] h-[50px] bg-white text-orange-600 font-semibold rounded-xl shadow-md hover:scale-105 transition">
              Registrasi
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
