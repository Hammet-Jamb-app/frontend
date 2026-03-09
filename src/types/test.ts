export interface TestSummary {
    id: string
    subject: string
    duration_minutes: number
}

export interface Question {
    id: string
    instruction?:string,
    question_text: string
    options: Record<string, string>
    passage?: string
}

export interface FullTest {
    id: string
    subject: string
    duration: number
    questions: Question[]
}

export interface TestResult {
    score: number
    topic_breakdown: Record<
        string,
        {
            correct: number
            incorrect: number
        }
    >
}