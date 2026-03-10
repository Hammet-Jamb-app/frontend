"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Upload,
  ClipboardCheck
} from "lucide-react"

interface SidebarProps {
  role: "student" | "tutor" | "admin"
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const links = {
    student: [
      {
        href: "/student/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard
      },
      {
        href: "/student/tests",
        label: "Tests",
        icon: BookOpen
      }
    ],

    tutor: [
      {
        href: "/tutor/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard
      },
      {
        href: "/tutor/analytics",
        label: "Analytics",
        icon: BarChart3
      }
    ],

    admin: [
      {
        href: "/admin/review",
        label: "Review Queue",
        icon: ClipboardCheck
      },
      {
        href: "/admin/upload",
        label: "Upload Questions",
        icon: Upload
      }
    ]
  }

  return (
    <aside className="w-64 bg-white border-r flex flex-col">

      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-lg font-semibold tracking-tight">
          Hammet
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">

        {links[role].map((link) => {

          const Icon = link.icon
          const active = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3
                px-3 py-2 rounded-lg
                text-sm font-medium
                transition

                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >

              <Icon size={18} />

              {link.label}

            </Link>
          )
        })}

      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs text-gray-400">
        Hammet Labs
      </div>

    </aside>
  )
}