"use client"

import { useEffect, useState } from "react"
import { getTutorAnalytics } from "@/services/analytics.service"
import {
    TutorAnalyticsResponse,
    TopicNeedingAttention,
} from "@/types/analytics"

export default function TutorAnalyticsPage() {
    const [data, setData] = useState<TutorAnalyticsResponse | null>(null)
    const [loading, setLoading]  = useState(true)

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await getTutorAnalytics()
                setData(res)
            } catch(err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [])

    if (loading) return <div className="p-8">Loading...</div>
    if (!data) return <div className="p-8">No data</div>

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">
                Topics Needing Attention
            </h1>

            <p className="mb-4 text-sm text-gray-600">
                Showing topics where at least {data.threshold} students are below 50% accuracy
            </p>

            {data.topics_needing_attention.length === 0 ? (
                <p>No weak topics currently.</p>
            ) : (
                <div className="space-y-4">
                    {data.topics_needing_attention.map(
                        (topic: TopicNeedingAttention) => (
                            <div
                                key={`${topic.subject}-${topic.topic}`}
                                className="border p-4 rounded shadow"
                            >
                                <h2 className="font-semibold">
                                    {topic.subject} - {topic.topic}
                                </h2>

                                <div className="mt-2 text-sm">
                                    <p>
                                        Weak Students: {topic.weak_students} /{" "}
                                        {topic.total_students}
                                    </p>
                                    <p>
                                        Weakness %: {topic.weakness_percentage}%
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}