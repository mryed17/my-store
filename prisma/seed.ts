import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Hapus data existing
  await prisma.transaksi.deleteMany()
  await prisma.produk.deleteMany()

  // Buat produk
  const products = await prisma.produk.createMany({
    data: [
      {
        nama_produk: 'Laptop Gaming',
        harga: 1200,
        stok: 10,
        foto: '/images/laptop.jpg',
        deskripsi: 'Laptop gaming dengan GPU high-end'
      },
      {
        nama_produk: 'Smartphone Flagship',
        harga: 999,
        stok: 15,
        foto: '/images/phone.jpg',
        deskripsi: 'Smartphone dengan kamera terbaik'
      },
      {
        nama_produk: 'Headphone Wireless',
        harga: 199,
        stok: 30,
        foto: '/images/headphone.jpg',
        deskripsi: 'Headphone dengan noise cancellation'
      },
      {
        nama_produk: 'Smart Watch',
        harga: 249,
        stok: 20,
        foto: '/images/watch.jpg',
        deskripsi: 'Smartwatch dengan health monitoring'
      },
      {
        nama_produk: 'Tablet',
        harga: 499,
        stok: 12,
        foto: '/images/tablet.jpg',
        deskripsi: 'Tablet dengan layar AMOLED'
      }
    ]
  })

  // Buat transaksi
  const transactions = await prisma.transaksi.createMany({
    data: [
      {
        id_produk: (await prisma.produk.findFirst({ where: { nama_produk: 'Laptop Gaming' } }))!.id_produk,
        nama_pembeli: 'John Doe',
        total_harga: 1200
      },
      {
        id_produk: (await prisma.produk.findFirst({ where: { nama_produk: 'Smartphone Flagship' } }))!.id_produk,
        nama_pembeli: 'Jane Smith',
        total_harga: 999
      },
      {
        id_produk: (await prisma.produk.findFirst({ where: { nama_produk: 'Headphone Wireless' } }))!.id_produk,
        nama_pembeli: 'Bob Johnson',
        total_harga: 199
      },
      {
        id_produk: (await prisma.produk.findFirst({ where: { nama_produk: 'Smart Watch' } }))!.id_produk,
        nama_pembeli: 'Alice Brown',
        total_harga: 249
      },
      {
        id_produk: (await prisma.produk.findFirst({ where: { nama_produk: 'Tablet' } }))!.id_produk,
        nama_pembeli: 'Charlie Wilson',
        total_harga: 499
      }
    ]
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })