import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MY-STORE
        </Link>
        <div className="space-x-4">
          <Link href="/produk" className="hover:text-gray-300">
            Produk
          </Link>
          <Link href="/admin/dashboard" className="hover:text-gray-300">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}