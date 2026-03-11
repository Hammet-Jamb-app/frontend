"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { saveToken } from "@/utils/token"

export default function VerifyEmailPage() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")

  const [status, setStatus] = useState("Verifying your email...")

  useEffect(() => {

    if (!token) {
      setStatus("Invalid verification link")
      return
    }

    const verify = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify/${token}`
        )

        if (!res.ok) {
          throw new Error()
        }

        const data = await res.json()

        saveToken(data.access_token)

        setStatus("Email verified. Redirecting...")

        const payload = JSON.parse(
          atob(data.access_token.split(".")[1])
        )

        if (payload.role === "student") {
          router.push("/student/dashboard")
        }

        if (payload.role === "tutor") {
          router.push("/tutor/dashboard")
        }

        if (payload.role === "admin") {
          router.push("/admin/review")
        }

      } catch {
        setStatus("Verification failed or link expired")
      }

    }

    verify()

  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white border rounded-xl shadow-sm p-8 text-center max-w-md">

        <h1 className="text-xl font-semibold mb-4">
          Email Verification
        </h1>

        <p className="text-gray-600">
          {status}
        </p>

      </div>

    </div>
  )
}