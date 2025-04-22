// auth/login/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi validasi
    setTimeout(() => {
      if (!email || !password) {
        setError("Email dan password harus diisi");
        setIsLoading(false);
        return;
      }

      if (email !== "123" || password !== "123") {
        setError("Email dan password harus bernilai '123'");
        setIsLoading(false);
        return;
      }

      // Jika validasi berhasil
      setError(null);
      setIsLoading(false);
      console.log("Login berhasil");
      // Redirect atau proses login
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        
        {/* Error State */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
              placeholder="Masukkan email anda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
              placeholder="Masukkan password anda"
            />
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="text-center">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Lupa Password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Belum Punya Akun? </span>
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
