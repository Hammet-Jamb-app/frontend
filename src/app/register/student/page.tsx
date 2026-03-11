"use client"

import { useEffect, useState } from "react"
import { registerStudent } from "@/services/auth.service"
import { useSearchParams } from "next/navigation"
import { validatePassword } from "@/utils/password"

export default function StudentRegisterPage() {
  const searchParams = useSearchParams()
  const inviteToken = searchParams.get("invite")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!inviteToken) {
      setError("Invalid invite link")
      return
    }

    const passwordError = validatePassword(password)

    if (passwordError) {
      setError(passwordError)
      return 
    }

    setLoading(true)
    setError("")

    try {
      await registerStudent(
        email,
        password,
        inviteToken
      )
      setSuccess("Registration successful. Check your email for verification link")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!inviteToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Invalid invite link
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">
          Register Student
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-sm">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}