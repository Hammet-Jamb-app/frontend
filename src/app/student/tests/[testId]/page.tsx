"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getTestById, submitTest } from "@/services/test.service"
import { FullTest } from "@/types/test"
import { formatBold } from "@/utils/formatText" 

export default function TakeTestPage() {
  const { testId } = useParams()
  const router = useRouter()

  const [test, setTest] = useState<FullTest | null>(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [submitting, setSubmitting] = useState(false)

  // Fetch test
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await getTestById(testId as string)
        setTest(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [testId])

  // Initialize timer
  useEffect(() => {
    if (test) {
      setTimeLeft(test.duration * 60)
    }
  }, [test])

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  // Auto submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && test) {
      handleSubmit()
    }
  }, [timeLeft])

  const selectAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }))
  }

  const handleSubmit = async () => {
    if (!test || submitting) return

    setSubmitting(true)

    try {
      const result = await submitTest(test.id, answers)

      localStorage.setItem(
        "last_test_result",
        JSON.stringify(result)
      )

      router.push(`/student/tests/${test.id}/result`)
    } catch (err) {
      console.error(err)
      setSubmitting(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (!test) return <div className="p-8">Test not found</div>

  const currentQuestion = test.questions[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === test.questions.length - 1

  const minutes = Math.floor(timeLeft / 60)
  const seconds = (timeLeft % 60).toString().padStart(2, "0")

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">
            {test.subject}
          </h1>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="font-semibold">
              Time Left: {minutes}:{seconds}
            </span>
          </div>
        </div>

        {/* Question Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {test.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-9 h-9 rounded-full text-sm font-medium ${
                index === currentIndex
                  ? "bg-blue-600 text-white"
                  : answers[q.id]
                  ? "bg-green-500 text-white"
                  : "bg-slate-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-6">
          <p className="text-sm text-slate-500 mb-2">
            Question {currentIndex + 1} of {test.questions.length}
          </p>

          {currentQuestion.instruction && (
            <div className="mb-4 p-3 bg-slate-100 rounded">
              <p className="text-sm text-slate-500">
                {currentQuestion.instruction}
              </p>
            </div>
          )}

          <p className="font-medium mb-4">
            {formatBold(currentQuestion.question_text)}
          </p>

          {currentQuestion.passage && (
            <div className="mb-4 p-3 bg-slate-300 rounded">
              <p className="text-sm">
                {currentQuestion.passage}
              </p>
            </div>
          )}

          <div className="space-y-2">
            {Object.entries(currentQuestion.options).map(([key, value]) => {

              return (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={value}
                    checked={answers[currentQuestion.id] === value}
                    onChange={() =>
                    selectAnswer(currentQuestion.id, value)
                    }
                  />
                  <span>
                    {key}. {value}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            disabled={isFirst}
            onClick={() =>
              setCurrentIndex((prev) => prev - 1)
            }
            className="px-4 py-2 rounded bg-slate-300 disabled:opacity-50"
          >
            Previous
          </button>

          {!isLast ? (
            <button
              onClick={() =>
                setCurrentIndex((prev) => prev + 1)
              }
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}