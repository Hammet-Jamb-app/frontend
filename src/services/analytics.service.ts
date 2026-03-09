import { apiRequest } from "./api";
import {
    TutorAnalyticsResponse,
    TutorSummaryResponse,
} from '@/types/analytics'

export const getTutorAnalytics = async (): Promise<TutorAnalyticsResponse> => {
    return apiRequest("/analytics/me")
}

export const getTutorSummary = async (): Promise<TutorSummaryResponse> => {
    return apiRequest("/analytics/me/summary")
}