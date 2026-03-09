export type IngestionStatus = 
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"

export interface UploadResponse {
    job_id: number
    status: IngestionStatus
}

export interface JobStatusResponse {
    status: IngestionStatus
    inserted: number | null
    skipped: number | null
    error: string | null
}