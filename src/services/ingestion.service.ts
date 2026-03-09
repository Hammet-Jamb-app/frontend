import { getToken } from "@/utils/token";
import { UploadResponse, JobStatusResponse } from "@/types/ingestion";
import { stringify } from "querystring";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const uploadCsv = async (
    subject: string,
    file: File,
    passage?: boolean
): Promise<UploadResponse> => {
    const token = getToken()

    const formData = new FormData()
    formData.append("subject", subject)
    formData.append("file", file)

    if (passage !== undefined) {
        formData.append("passage", String(passage))
    }

    const response = await fetch(`${API_URL}/ingestion/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },      
        body: formData,
    })
    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || "Upload failed")
    }

    return response.json()
}

export const getJobStatus = async (
    jobId: number
): Promise<JobStatusResponse> => {
    
    
    return fetch(
    `${API_URL}/ingestion/job/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  ).then(async (res) => {
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.detail || "Job check failed")
    }
    return res.json()
  })
}