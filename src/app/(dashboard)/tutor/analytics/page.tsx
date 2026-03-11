"use client"

import { useEffect, useState } from "react"
import { getTutorAnalytics } from "@/services/analytics.service"
import { TutorAnalyticsResponse } from "@/types/analytics"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

export default function TutorAnalyticsPage() {

  const [data, setData] = useState<TutorAnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getTutorAnalytics()
        setData(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <PageContainer>
        <PageHeader
          title="Topic Analytics"
          description="Loading analytics..."
        />
      </PageContainer>
    )
  }

  const topics = data?.topics_needing_attention || []

  return (
    <PageContainer>

      <PageHeader
        title="Topic Analytics"
        description="Topics where students are performing below the threshold."
      />

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b">

            <tr className="text-left">

              <th className="px-6 py-3 font-medium text-gray-600">
                Subject
              </th>

              <th className="px-6 py-3 font-medium text-gray-600">
                Topic
              </th>

              <th className="px-6 py-3 font-medium text-gray-600">
                Weak Students
              </th>

              <th className="px-6 py-3 font-medium text-gray-600">
                Total Students
              </th>

              <th className="px-6 py-3 font-medium text-gray-600">
                Weakness %
              </th>

            </tr>

          </thead>

          <tbody>

            {topics.map((topic, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {topic.subject}
                </td>

                <td className="px-6 py-4">
                  {topic.topic}
                </td>

                <td className="px-6 py-4">
                  {topic.weak_students}
                </td>

                <td className="px-6 py-4">
                  {topic.total_students}
                </td>

                <td className="px-6 py-4 font-semibold text-red-600">
                  {topic.weakness_percentage}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {topics.length === 0 && (
          <div className="p-6 text-sm text-gray-500">
            No weak topics detected.
          </div>
        )}

      </div>

    </PageContainer>
  )
}