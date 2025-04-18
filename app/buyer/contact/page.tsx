// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hubungi Kami</h1>
      <form className="flex flex-col gap-4 max-w-md">
        <input type="text" placeholder="Nama" className="border p-2" />
        <input type="email" placeholder="Email" className="border p-2" />
        <textarea placeholder="Pesan" className="border p-2" rows={4} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Kirim
        </button>
      </form>
    </main>
  );
}
