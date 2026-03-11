"use client"

import { useEffect, useState } from "react"
import { getStudentAttempts } from "@/services/student.service"
import { StudentAttempt } from "@/types/student"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

export default function StudentDashboard() {

  const [attempts, setAttempts] = useState<StudentAttempt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchAttempts = async () => {
      try {
        const data = await getStudentAttempts()
        setAttempts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAttempts()

  }, [])

  if (loading) {
    return (
      <PageContainer>
        <PageHeader
          title="Student Dashboard"
          description="Loading your results..."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>

      <PageHeader
        title="Student Dashboard"
        description="Your past test performance."
      />

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b">

            <tr>

              <th className="px-6 py-3 text-left text-gray-600">
                Subject
              </th>

              <th className="px-6 py-3 text-left text-gray-600">
                Score
              </th>

              <th className="px-6 py-3 text-left text-gray-600">
                Attempt
              </th>

            </tr>

          </thead>

          <tbody>

            {attempts.map((attempt, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {attempt.subject}
                </td>

                <td className="px-6 py-4">
                  {attempt.score}%
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {attempt.started_at}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {attempts.length === 0 && (
          <div className="p-6 text-gray-500 text-sm">
            No tests taken yet.
          </div>
        )}

      </div>

    </PageContainer>
  )
}