"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Header() {
    const { logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    return (
        <div className="h-16 border-b flex items-center justify-end px-6">
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    )
}