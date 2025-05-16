import { Produk } from '@/lib/generated/prisma'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'


export default async function ProdukPage() {
  const products: Produk[] = await prisma.produk.findMany()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Katalog Produk</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id_produk}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            {product.foto && (
              <div className="relative h-48">
                <Image
                  src={product.foto}
                  alt={product.nama_produk}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.nama_produk}</h2>
              <p className="text-gray-600 mt-2">
                Rp {product.harga.toLocaleString('id-ID')}
              </p>
              {product.deskripsi && (
                <p className="text-gray-500 mt-2">{product.deskripsi}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
