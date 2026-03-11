"use client"

import { useEffect, useState } from "react"
import { getAllTests } from "@/services/test.service"
import { TestSummary } from "@/types/test"
import { useRouter } from "next/navigation"

export default function TestListPage() {
    const [tests, setTests] = useState<TestSummary[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const data = await getAllTests()
                setTests(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchTests()
    }, [])

    if (loading) return <div className="p-8">Loading</div>

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Available Tests</h1>

            <div className="grid gap-4">
                {tests.map((test) => (
                    <div
                        key={test.id}
                        className="border p-4 rounded shadow hover: bg-gray-50 cursor-pointer"
                        onClick={() => router.push(`/student/tests/${test.id}`)}
                    >
                        <h2 className="font-semibold">{test.subject}</h2>
                        <p>Duration: {test.duration_minutes} mins</p>
                    </div>
                ))}
            </div>
        </div>
    )
}