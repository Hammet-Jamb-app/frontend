import Sidebar from "@/components/ui/Sidebar"
import Header from "@/components/ui/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  )
}