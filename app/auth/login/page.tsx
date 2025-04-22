// auth/login/page.tsx
"use client"; // Diperukan karena menggunakan useState dan event handler
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulasi error: Email atau password kosong
    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }

    // Simulasi error: Password terlalu pendek
    if (password.length < 6) {
      setError("Password harus minimal 6 karakter!");
      return;
    }

    // Jika validasi berhasil, reset error
    setError(null);
    console.log("Login berhasil"); // Ganti dengan logika login sesungguhnya
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        
        {/* Tampilkan error jika ada */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center justify-between">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Lupa Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Belum punya akun? </span>
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Registrasi
          </Link>
        </div>
      </div>
    </div>
  );
}
