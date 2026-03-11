import { getToken } from "@/utils/token"
import { StudentAttempt } from "@/types/student"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getStudentAttempts(): Promise<StudentAttempt[]> {

  const res = await fetch(
    `${API_URL}/analytics/student/attempts`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch attempts")
  }

  return res.json()
}