"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    setTimeout(() => {
      if (!email) {
        setError("Email harus diisi.");
      } else if (email !== "123") {
        setError("Email tidak ditemukan. Gunakan '123' untuk pengujian.");
      } else {
        setSuccess("Link reset password berhasil dikirim!");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-orange-400 to-orange-600">
      {error && (
        <div className="fixed top-5 z-50 w-auto bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          {error}
        </div>
      )}
      {success && (
        <div className="fixed top-5 z-50 w-auto bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          {success}
        </div>
      )}
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Bagian Kiri - Logo */}
        <div className="w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-6">
          <img src="/totong1.png" alt="Logo" className="h-60 w-90" />
        </div>

        {/* Bagian Kanan - Form Lupa Password */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold text-center text-neutral-900 mb-6">Lupa Password</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Masukkan email anda"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
                isLoading ? "bg-orange-400" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isLoading ? "Mengirim..." : "Kirim Link Reset"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/auth/login" className="text-orange-500 hover:underline">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
