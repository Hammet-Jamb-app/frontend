import { apiRequest } from "./api";
import { TestSummary, FullTest, TestResult } from "@/types/test";

export const getAllTests = async (): Promise<TestSummary[]> => {
    return apiRequest("/tests/all")
}

export const getTestById = async(id: string): Promise<FullTest> => {
    return apiRequest(`/tests/take_test/${id}`)
}

export const submitTest = async (
    testId: string,
    responses: Record<string, string>
): Promise<TestResult> => {
    return apiRequest(`/tests/${testId}/submit`, {
        method: "POST",
        body: JSON.stringify({ responses }),
    })
}