export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold p-4 bg-gray-800 text-white">Admin Panel</h1>
      <div className="p-4">{children}</div>
    </div>
  )
}