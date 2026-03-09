import { apiRequest } from "./api";
import { ReviewQuestion } from "@/types/review";

export const getPendingReviews = async (): Promise<ReviewQuestion[]> => {
    return apiRequest("/review/pending")
}

export const approveReview = async(id: string): Promise<void> => {
    return apiRequest(`/review/approve/${id}`, {
        method: "POST",
    })
}

export const rejectReview = async(id: string): Promise<void> => {
    return apiRequest(`/review/reject/${id}`, {
        method: "POST",
    })
}