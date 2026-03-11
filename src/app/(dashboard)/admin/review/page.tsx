"use client"
import { useEffect, useState } from "react"
import { getPendingReviews, approveReview, rejectReview } from "@/services/review.service"
import { ReviewQuestion } from "@/types/review"

export default function AdminReviewPage() {
    const [questions, setQuestions] = useState<ReviewQuestion[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const data = await getPendingReviews()
            setQuestions(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (id: string) => {
        try {
            await approveReview(id)
            setQuestions((prev) =>
                prev.filter((q) => q.id !== id)
            )
        } catch (err) {
            console.error(err)
        }
    }

    const handleReject = async (id: string) => {
        try {
            await rejectReview(id)
            setQuestions((prev) =>
                prev.filter((q) => q.id !== id)
        )
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <div className="p-8">Loading...</div>

    if (questions.length === 0)
        return <div className="p-8">No pending reviews.</div>


    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">
                Review AI Generated Questions
            </h1>

            {questions.map((q) => (
                <div
                    key={q.id}
                    className="border rounded p-6 shadow space-y-4"
                >
                    <div>
                        <p className="text-sm text-gray-500">
                            {q.subject} - {q.topic}
                        </p>
                        <p className="font-semibold mt-2">
                            {q.question_text}
                        </p>
                    </div>

                    <div className="space-y-2">
                        {Object.entries(q.options).map(
                            ([key, value]) => (
                                <p
                                    key={key}
                                    className={`${
                                        key === q.correct_answer
                                            ? "text-green-600 font-medium" 
                                            : ""
                                    }`}
                                >
                                    {key}. {value}
                                </p>
                            )
                        )}
                    </div>

                    <div className="bg-gray-100 p-4 rounded text-sm">
                        <p>
                            <strong>AI Answer:</strong> {q.ai_answer}
                        </p>
                        <p className="mt-2">
                            <strong>Explanation:</strong>{" "}
                            {q.ai_explanation}
                        </p>
                        <p className="mt-2">
                            <strong>Confidence:</strong>{" "}
                            {q.confidence_score}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => handleApprove(q.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Approve
                        </button>
                    
                        <button
                            onClick={() => handleReject(q.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}