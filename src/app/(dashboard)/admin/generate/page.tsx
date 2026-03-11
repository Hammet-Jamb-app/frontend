"use client"

import { useState } from "react"
import { generateTest } from "@/services/generate.service"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

export default function GenerateTestPage() {

  const [subject, setSubject] = useState("")
  const [questionCount, setQuestionCount] = useState(40)
  const [duration, setDuration] = useState(30)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleGenerate = async () => {

    setLoading(true)
    setMessage("")

    try {

      const res = await generateTest(
        subject,
        questionCount,
        duration
      )

      setMessage(`Test created: ${res.id}`)

    } catch {
      setMessage("Failed to generate test")
    }

    setLoading(false)

  }

  return (
    <PageContainer>

      <PageHeader
        title="Generate Test"
        description="Create a new practice test for students."
      />

      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4 max-w-md">

        <input
          type="text"
          placeholder="Subject"
          className="w-full border p-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of Questions"
          className="w-full border p-2 rounded"
          value={questionCount}
          onChange={(e) =>
            setQuestionCount(Number(e.target.value))
          }
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          className="w-full border p-2 rounded"
          value={duration}
          onChange={(e) =>
            setDuration(Number(e.target.value))
          }
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Test"}
        </button>

        {message && (
          <p className="text-sm text-gray-600">
            {message}
          </p>
        )}

      </div>

    </PageContainer>
  )
}