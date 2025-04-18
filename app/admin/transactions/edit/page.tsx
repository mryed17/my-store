export default function TransactionForm() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Tambah / Edit Transaksi</h1>
      <form className="flex flex-col gap-4 max-w-md">
        <input type="text" placeholder="Nama Pembeli" className="border p-2" />
        <input type="text" placeholder="Produk" className="border p-2" />
        <input type="number" placeholder="Jumlah" className="border p-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </main>
  );
}
