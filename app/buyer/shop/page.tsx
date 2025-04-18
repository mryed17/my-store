// app/shop/page.tsx
export default function ShopPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Semua Produk</h1>
      <input
        type="text"
        placeholder="Cari produk..."
        className="border p-2 mb-4 w-full"
      />
      <div>[Daftar produk akan ditampilkan di sini]</div>
    </main>
  );
}
