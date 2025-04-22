"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError("Email dan password harus diisi");
        setIsLoading(false);
        return;
      }

      if (email === "admin" && password === "admin123") {
        setError(null);
        setIsLoading(false);
        router.push("/admin");
        return;
      }

      if (email === "customer" && password === "123") {
        setError(null);
        setIsLoading(false);
        router.push("/buyer");
        return;
      }

      setError("Email atau password tidak cocok");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-orange-400 to-orange-600">
      {/* Popup Error */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-6 py-2 rounded shadow-md animate-bounce-in">
            {error}
          </div>
        </div>
      )}

      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Kiri - Logo */}
        <div className="w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-6">
          <img src="/totong1.png" alt="Logo" className="h-60 w-90" />
        </div>

        {/* Kanan - Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold text-center text-neutral-900 mb-6">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Masukkan email anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none pr-10"
                  placeholder="Masukkan password anda"
                />
              </div>
            </div>

            <div className="text-right">
              <Link href="/auth/forgot-passwaord" className="text-sm text-orange-500 hover:underline">
                Lupa Password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
                  isLoading ? "bg-orange-400" : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-500">Belum Punya Akun? </span>
            <Link href="/auth/register" className="text-orange-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
