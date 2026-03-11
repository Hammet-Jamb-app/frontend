"use client"

import { useState } from "react"
import { registerTutor } from "@/services/auth.service"
import { validatePassword } from "@/utils/password"

export default function TutorRegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [inviteLink, setInviteLink] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        
        const passwordError = validatePassword(password)

        if (passwordError) {
            setError(passwordError)
            setLoading(false)
            return 
        }

        setLoading(true)
        setError("")

        try {
            const res = await registerTutor(
                email, password
            )
            setInviteLink(res.invite_link || "")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow w-96 space-y-4"
            >
                <h2 className="text-xl font-bold">
                    Register Tutor
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    {loading ? "Creating..." : "Register"}
                </button>

                {inviteLink && (
                    <div className="mt-4 text-sm bg-gray-100 p-3 rounded">
                        <p className="font-medium">
                            Invite Link:
                        </p>
                        <p className="break-all text-blue-600">
                            {inviteLink}
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}