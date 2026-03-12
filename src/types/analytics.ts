export interface TopicNeedingAttention {
    subject: string
    topic: string
    weak_students: number
    total_students: number
    weakness_percentage: number
}

export interface TutorAnalyticsResponse {
    threshold: number
    topics_needing_attention: TopicNeedingAttention[]
}

export interface TopicSummary {
  subject: string
  topic: string
  weakness_percentage: number
}

export interface TutorSummaryResponse {
  total_topics_tracked: number
  topics_needing_attention: number
  weakest_topic: TopicSummary | null
  strongest_topic: TopicSummary | null
  invite_link: string
}