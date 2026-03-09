"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

interface SidebarProps {
    role: "student" | "tutor" | "admin"
}

export default function Sidebar({ role }: SidebarProps) {
    const links = {
        student: [
            { href: "/student/dashboard", label: "Dashboard"},
            { href: "/student/tests", label: "Tests" },
        ],

        tutor: [
            { href: "/tutor/dashboard", label: "Dashboard"},
            { href: "/tutor/analytics", label: "Analytics" },
        ],
        admin: [
            { href: "/admin/review", label: "Review Questions"},
            { href: "/admin/upload", label: "Upload CSV" },
        ],
    }

    return (
        <div className="w-60 bg-gray-900 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6 capitalize">
                {role} Panel
            </h2>

            <div className="space-y-">
                {links[role].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="block hover:bg-gray-700 p-2 rounded"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}