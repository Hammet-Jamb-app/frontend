"use client"

import { useEffect, useState } from "react"
import { getTutorSummary } from "@/services/analytics.service"
import { TutorSummaryResponse } from "@/types/analytics"

export default function TutorDashboard() {
  const [summary, setSummary] = useState<TutorSummaryResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getTutorSummary()
        setSummary(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>
  if (!summary) return <div className="p-8">No data</div>

  return (
    <div className="p-8 space-y-8">

      {/* Page Title */}
      <h1 className="text-2xl font-bold">
        Tutor Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Total Topics Tracked
          </p>
          <p className="text-3xl font-bold mt-2">
            {summary.total_topics_tracked}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Topics Needing Attention
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {summary.topics_needing_attention}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Weakest Topic
          </p>

          {summary.weakest_topic ? (
            <div className="mt-2">
              <p className="font-semibold">
                {summary.weakest_topic.subject}
              </p>
              <p className="text-sm text-gray-600">
                {summary.weakest_topic.topic}
              </p>
              <p className="text-red-600 font-bold mt-1">
                {summary.weakest_topic.weakness_percentage}%
              </p>
            </div>
          ) : (
            <p className="mt-2">N/A</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">
            Strongest Topic
          </p>

          {summary.strongest_topic ? (
            <div className="mt-2">
              <p className="font-semibold">
                {summary.strongest_topic.subject}
              </p>
              <p className="text-sm text-gray-600">
                {summary.strongest_topic.topic}
              </p>
              <p className="text-green-600 font-bold mt-1">
                {summary.strongest_topic.weakness_percentage}%
              </p>
            </div>
          ) : (
            <p className="mt-2">N/A</p>
          )}
        </div>

      </div>

      {/* Insight Panel */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Performance Insight
        </h2>

        <p className="text-gray-600 text-sm">
          Topics where more than the threshold percentage of students
          perform poorly will appear in the analytics page.
          Focus revision sessions on these weak areas.
        </p>
      </div>

    </div>
  )
}