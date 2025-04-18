// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tentang Kami</h1>
      <p>Kami adalah toko yang menyediakan berbagai produk berkualitas.</p>
      <p className="mt-2 font-semibold">Tim Pengelola:</p>
      <ul className="list-disc ml-6">
        <li>Jane Doe - CEO</li>
        <li>John Smith - Manager</li>
      </ul>
    </main>
  );
}
