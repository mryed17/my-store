"use client";
// Hapus Link jika tidak digunakan, atau gunakan jika memang dibutuhkan
import Link from "next/link";
import { useState } from "react"; // Hapus useEffect jika tidak digunakan
import { useRouter } from "next/navigation";
import Image from "next/image"; // Tambahkan import Image

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();

  const showPopup = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Hilangkan setelah 3 detik
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      showPopup("Semua field harus diisi.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showPopup("Password dan Konfirmasi Password harus sama.", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showPopup("Registrasi berhasil! Mengarahkan ke login...", "success");

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-orange-400 to-orange-600 relative">
      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toastMessage}
        </div>
      )}

      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Kiri - Logo */}
        <div className="w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-6">
          <Image src="/totong1.png" alt="Logo" width={90} height={60} />
        </div>

        {/* Kanan - Form Registrasi */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold text-center text-neutral-900 mb-6">
            Registrasi
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Masukkan Nama Lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Masukkan Email"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Masukkan Password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Ulangi Password"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
                  isLoading
                    ? "bg-orange-400"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {isLoading ? "Memproses..." : "Daftar"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-500">Sudah punya akun? </span>
            <Link
              href="/auth/login"
              className="text-orange-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
