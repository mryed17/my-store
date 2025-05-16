import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export default async function AdminDashboard() {
  const [products, transactions] = await Promise.all([
    prisma.produk.findMany(),
    prisma.transaksi.findMany({
      include: {
        produk: true
      },
      orderBy: {
        tanggal: 'desc'
      }
    }),
  ])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Analytics Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Produk</h3>
          {/* <p className="text-2xl">{analytics.totalProducts}</p> */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Revenue</h3>
          {/* <p className="text-2xl">${analytics.totalRevenue}</p> */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Produk Terlaris</h3>
          {/* <p className="text-2xl">{analytics.bestSellingProduct}</p> */}
        </div>
      </div>

      {/* Products Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Katalog Produk</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID Produk</th>
                <th className="py-2 px-4 border">Nama Produk</th>
                <th className="py-2 px-4 border">Harga</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product : any) => {
                return (
                  <tr key={product.id_produk}>
                    <td className="py-2 px-4 border">{product.id_produk}</td>
                    <td className="py-2 px-4 border">{product.nama_produk}</td>
                    <td className="py-2 px-4 border">${product.harga}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transactions Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Riwayat Transaksi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID Transaksi</th>
                <th className="py-2 px-4 border">Produk</th>
                <th className="py-2 px-4 border">Pembeli</th>
                <th className="py-2 px-4 border">Tanggal</th>
                <th className="py-2 px-4 border">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction : any) => {
                return (
                  <tr key={transaction.id_transaksi}>
                    <td className="py-2 px-4 border">{transaction.id_transaksi}</td>
                    <td className="py-2 px-4 border">{transaction.produk.nama_produk}</td>
                    <td className="py-2 px-4 border">{transaction.nama_pembeli}</td>
                    <td className="py-2 px-4 border">
                      {transaction.tanggal.toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border">${transaction.total_harga}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

async function getAnalyticsData() {
  const [totalProducts, totalRevenue, productSales] = await Promise.all([
    prisma.produk.count(),
    prisma.transaksi.aggregate({
      _sum: {
        total_harga: true
      }
    }),
    prisma.transaksi.groupBy({
      by: ['id_produk'],
      _count: {
        id_produk: true
      },
      orderBy: {
        _count: {
          id_produk: 'desc'
        }
      },
      take: 1
    })
  ])

  const bestSellingProductId = productSales[0]?.id_produk
  const bestSellingProduct = bestSellingProductId 
    ? (await prisma.produk.findUnique({
        where: { id_produk: bestSellingProductId }
      }))?.nama_produk || 'N/A'
    : 'N/A'

  return {
    totalProducts,
    totalRevenue: totalRevenue._sum.total_harga || 0,
    bestSellingProduct
  }
}