"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "../components/container";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const items = JSON.parse(storedCart);
        setCartItems(items);
        calculateTotal(items);
      }
    };

    loadCart();

    // Setup event listener for cart updates from other components
    window.addEventListener("cartUpdated", loadCart);

    // Clean up event listener
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
    calculateTotal(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
    calculateTotal(updatedItems);
  };

  const handleCheckout = () => {
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    router.push("./payment");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <Container>
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center my-8">
            <p className="text-gray-500 mb-4">Keranjang belanja Anda kosong</p>
            <Link
              href="./shop"
              className="bg-orange-500 text-white py-2 px-4 rounded inline-block hover:bg-orange-600 transition-colors"
            >
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="my-4">
            <div className="bg-white rounded-t p-4 border-b hidden md:grid md:grid-cols-12 font-medium text-gray-600">
              <div className="md:col-span-1"></div>
              <div className="md:col-span-5">Produk</div>
              <div className="md:col-span-2 text-center">Kuantitas</div>
              <div className="md:col-span-3 text-right">Harga</div>
              <div className="md:col-span-1"></div>
            </div>

            <div className="bg-white rounded-b shadow-sm divide-y">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                  </div>
                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex items-center border rounded-md">
                      <Button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 border-r"
                        variant="ghost"
                      >
                        -
                      </Button>
                      <span className="px-4 py-2 min-w-10 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 border-l"
                        variant="ghost"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="md:col-span-3 text-right">
                    <div className="text-lg font-bold">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </div>
                    {item.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">
                        Rp{" "}
                        {(item.originalPrice * item.quantity).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-orange-500 hover:text-red-600 transition-colors"
                      aria-label="Hapus item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-8 px-4">
              <div className="px-4 flex items-center justify-between">
                <Link
                  href="./shop"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mb-4"
                >
                  Kembali
                </Link>
              </div>
              <div className="w-full md:w-96 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between mb-4 items-center">
                  <span className="text-lg font-medium text-gray-600">
                    Total Produk:
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded w-full font-bold text-lg transition-colors"
                >
                  Beli Sekarang
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
