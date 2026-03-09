"use client"

import { useState } from "react"
import { loginUser } from "@/services/auth.service"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { decodeToken } from "@/utils/token"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await loginUser(email, password)
            login(data.access_token)

            const decoded = decodeToken(data.access_token)
            if (!decoded) return

            if (decoded.role === "student") router.push("/student/dashboard")
            if (decoded.role === "tutor") router.push("/tutor/dashboard")
            if (decoded.role === "admin") router.push("/admin/review")
        } catch (err: any) {
            setError(err.message)    
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-xl font-bold mb-">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    )
}