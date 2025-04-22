// auth/login/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulasi delay untuk loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validasi
    if (!email || !password) {
      setError("Email dan password harus diisi");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    // Jika validasi berhasil
    setIsLoading(false);
    console.log("Login berhasil");
    // Redirect atau lakukan login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Masuk ke Akun Anda</h1>
          <p className="text-gray-500 mt-2">Selamat datang kembali!</p>
        </div>

        {/* Error Message (Login_error) */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 rounded-lg flex items-start gap-3 border border-red-200">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">{error}</p>
              <p className="text-xs text-red-600 mt-1">Cek kembali email dan password Anda</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full px-3 py-2.5 rounded-lg border ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} shadow-sm placeholder-gray-400 focus:outline-none`}
                placeholder="email@contoh.com"
              />
              {error && (
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full px-3 py-2.5 rounded-lg border ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} shadow-sm placeholder-gray-400 focus:outline-none`}
                placeholder="••••••••"
              />
              {error && (
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Ingat saya
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Lupa password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2.5 px-4 rounded-lg border border-transparent shadow-sm text-sm font-medium text-white ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
