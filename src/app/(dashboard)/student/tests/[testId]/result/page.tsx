"use client"

import { useEffect, useState } from "react"
import { TestResult } from "@/types/test"

export default function ResultPage() {
    const [result, setResult] = useState<TestResult | null>(null)
    
    useEffect(() => {
        const stored = localStorage.getItem("last_test_result")
        if (stored) {
            setResult(JSON.parse(stored))
        }
    }, [])

    if (!result) return <div className="p-8">No result found</div>

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">
                Score: {result.score}
            </h1>

            <h2 className="text-xl font-semibold mb-">
                Topic Breakdown
            </h2>

            <div className="space-y-4">
                {Object.entries(result.topic_breakdown).map(
                    ([topic, stats]) => (
                        <div key={topic} className="border p-4 rounded">
                            <h3 className="font-medium">{topic}</h3>
                            <p>Correct: {stats.correct}</p>
                            <p>Incorrect: {stats.incorrect}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}