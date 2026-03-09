"use client"

import { useState, useEffect } from "react"
import { uploadCsv, getJobStatus } from "@/services/ingestion.service"
import { IngestionStatus } from "@/types/ingestion"

export default function AdminUploadPage() {
    const [subject, setSubject] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [passage, setPassage] = useState(false)
    const [jobId, setJobId] = useState<number | null>(null)
    const [status, setStatus] = useState<IngestionStatus | null>(null)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState("")

    const handleUpload = async () => {
        if (!file || !subject) {
            setError("Subject and file required")
            return
        }

        try {
            const response = await uploadCsv(
                subject,
                file,
                subject === "English" ? passage : undefined
            )

            setJobId(response.job_id)
            setStatus(response.status)
            setError("")
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Poll job status
    useEffect(() => {
        if (!jobId) return

        const interval = setInterval(async () => {
            try {
                const job = await getJobStatus(jobId)
                setStatus(job.status)

                if (
                    job.status === "COMPLETED" || job.status === "FAILED"
                ) {
                    setResult(job)
                    clearInterval(interval)
                }
            } catch (err) {
                console.error(err) 
                clearInterval(interval)
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [jobId])

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">
                Upload CSV Questions
            </h1>

            <div className="space-y-4 max-w-md">
                <input
                    type="text"
                    placeholder="Subject"
                    className="border p-2 w-full"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                {subject === "English" && (
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={passage}
                            onChange={(e) => setPassage(e.target.checked)}
                        />
                        Is Passage
                    </label>
                )}

                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />

                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                <button
                    onClick={handleUpload}
                    className="bg-blue-600 text white px-4 py-2 rounded"
                >
                    Upload
                </button>
            </div>

            {status && (
                <div className="mt-6 border p-4 rounded">
                    <p>Status: {status}</p>

                    {result && result.status === "COMPLETED" && (
                        <div className="mt-2 text-sm">
                            <p>Inserted: {result.inserted}</p>
                            <p>Skipped: {result.skipped}</p>
                        </div>
                    )}

                    {result && result.status === "FAILED" && (
                        <p className="text-red-600">
                            Error: {result.error}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}