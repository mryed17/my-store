"use client";
import { useState } from "react";
import { Send, Phone, MapPin, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ nama: "", email: "", pesan: "" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 animate-fade-in">
        Hubungi Kami
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Informasi Kontak */}
        <div className="bg-orange-100 p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-6 text-orange-600">
            Informasi Kontak
          </h2>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 hover:text-orange-600 transition-colors duration-300">
              <div className="bg-orange-200 p-3 rounded-full">
                <Phone className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-medium">Telepon</h3>
                <p>+62 812-3456-7890</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 hover:text-orange-600 transition-colors duration-300">
              <div className="bg-orange-200 p-3 rounded-full">
                <Mail className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p>info@tokokami.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 hover:text-orange-600 transition-colors duration-300">
              <div className="bg-orange-200 p-3 rounded-full">
                <MapPin className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-medium">Alamat</h3>
                <p>Jl. Belanja Indah No. 123, Jakarta Selatan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Kontak */}
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-orange-600">
            Kirim Pesan
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300"
                placeholder="Masukkan email Anda"
              />
            </div>

            <div>
              <label htmlFor="pesan" className="block text-sm font-medium mb-1">
                Pesan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                value={formData.pesan}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300"
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              <Send size={18} />
              Kirim Pesan
            </button>
          </form>

          {isSubmitted && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md animate-bounce">
              Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi
              Anda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
