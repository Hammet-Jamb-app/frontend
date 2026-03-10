"use client"

import Sidebar from "@/components/ui/Sidebar"
import { useAuth } from "@/context/AuthContext"
import { LogOut } from "lucide-react"

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role, logout } = useAuth()

  if (!role) return null

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Area */}
      <div className="flex flex-1 flex-col">

        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">

          {/* Left Side */}
          <div className="flex items-center gap-3">

            <h2 className="text-lg font-semibold capitalize">
              {role} Dashboard
            </h2>

            <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600 capitalize">
              {role}
            </span>

          </div>

          {/* Right Side */}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-black transition"
          >
            <LogOut size={16} />
            Logout
          </button>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  )
}