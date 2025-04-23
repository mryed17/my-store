"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    const checkoutItems = localStorage.getItem("checkoutItems");
    if (checkoutItems) {
      const items = JSON.parse(checkoutItems);
      setCartItems(Array.isArray(items) ? items : [items]);
    }
    setLoading(false);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingFee = 15000;
  const serviceFee = 15000;
  const total = subtotal + shippingFee + serviceFee;

  const handlePayment = () => {
    if (!paymentMethod) {
      setShowErrorModal(true);
      return;
    }

    localStorage.removeItem("checkoutItems");
    setShowSuccessModal(true);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-700">Memuat data pesanan...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-700 mb-4">Tidak ada item untuk dibayar</p>
          <Link
            href="./shop"
            className="bg-orange-500 text-white py-2 px-4 rounded inline-block hover:bg-orange-600 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pembayaran</h1>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="font-bold mb-4 border-b pb-2">Item yang Dibeli</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x Rp {item.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </p>
                {item.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    Rp {(item.originalPrice * item.quantity).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-100 p-6 rounded-lg mb-6">
        <h2 className="font-bold mb-4">SUMMARY</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal Produk ({cartItems.length} item)</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal Pengiriman</span>
            <span>Rp {shippingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Layanan</span>
            <span>Rp {serviceFee.toLocaleString()}</span>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-between font-bold text-red-600 text-lg">
            <span>Total Pembayaran</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <h2 className="text-center text-lg font-medium mb-4">
        Pilih Metode Pembayaran
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 pb-2 border-b">E-Wallet</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded cursor-pointer hover:bg-green-100 transition-colors">
              <input
                type="radio"
                name="payment"
                value="OVO"
                checked={paymentMethod === "OVO"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-medium">OVO</span>
            </label>
            <label className="flex items-center gap-3 bg-yellow-50 px-4 py-3 rounded cursor-pointer hover:bg-yellow-100 transition-colors">
              <input
                type="radio"
                name="payment"
                value="DANA"
                checked={paymentMethod === "DANA"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-medium">DANA</span>
            </label>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 pb-2 border-b">Bank Transfer</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 px-4 py-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="payment"
                value="BRI"
                checked={paymentMethod === "BRI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-medium">Bank BRI</span>
            </label>
            <label className="flex items-center gap-3 px-4 py-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="payment"
                value="BCA"
                checked={paymentMethod === "BCA"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-medium">Bank BCA</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="./shop"
          className="flex-1 py-2 border border-gray-300 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
        >
          Kembali
        </Link>
        <Button
          onClick={handlePayment}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Bayar Sekarang
        </Button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] px-8 py-6 w-[90%] max-w-md text-center shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pembayaran Berhasil
            </h2>
            <p className="text-gray-700 mb-6">
              Terima kasih telah melakukan pembayaran. Pesanan Anda sedang
              diproses.
            </p>
            <Link href="./shop">
              <Button className="bg-orange-500 text-white text-lg font-semibold px-6 py-2 rounded-[12px] hover:bg-orange-600 w-full">
                Oke
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] px-8 py-6 w-[90%] max-w-md text-center shadow-lg border border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Metode Belum Dipilih
            </h2>
            <p className="text-gray-700 mb-6">
              Silakan pilih metode pembayaran terlebih dahulu sebelum
              melanjutkan.
            </p>
            <Button
              onClick={() => setShowErrorModal(false)}
              className="bg-red-500 text-white text-lg font-semibold px-6 py-2 rounded-[12px] hover:bg-red-600 w-full"
            >
              Oke, Mengerti
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

