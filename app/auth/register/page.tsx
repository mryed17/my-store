// auth/register/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulasi error: Field kosong
    if (!name || !email || !password) {
      setError("Semua field harus diisi!");
      return;
    }

    // Simulasi error: Password terlalu pendek
    if (password.length < 8) {
      setError("Password harus minimal 8 karakter!");
      return;
    }

    // Simulasi error: Email tidak valid
    if (!email.includes("@")) {
      setError("Email tidak valid!");
      return;
    }

    // Jika validasi berhasil, reset error
    setError(null);
    console.log("Registrasi berhasil"); // Ganti dengan logika registrasi sesungguhnya
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Registrasi</h1>
        
        {/* Tampilkan error jika ada */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Daftar
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Sudah punya akun? </span>
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
