export interface ReviewQuestion {
    id: string
    subject: string
    topic: string
    question_text: string
    options: Record<string, string>
    correct_answer: string
    ai_answer: string
    ai_explanation: string
    confidence_score: string
}