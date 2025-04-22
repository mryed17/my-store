// app/admin/transactions/add/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function AddTransactionPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: "",
    productId: "",
    quantity: "1",
    status: "pending",
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => {
      setProducts([
        { id: "P001", name: "Laptop Asus TUF Gaming", price: 12000000, stock: 5 },
        { id: "P002", name: "Samsung Galaxy S21", price: 9000000, stock: 10 },
        { id: "P003", name: "Logitech MX Master 3", price: 1200000, stock: 15 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
