import { getToken } from "@/utils/token"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function generateTest(
  subject: string,
  questionCount: number,
  duration: number
) {

  const res = await fetch(
    `${API_URL}/tests/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        subject,
        question_count: questionCount,
        duration_minutes: duration
      })
    }
  )

  if (!res.ok) {
    throw new Error("Failed to generate test")
  }

  return res.json()
}