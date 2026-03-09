"use client"

import { useState } from "react"
import {
  uploadCsv,
  getJobStatus,
} from "@/services/ingestion.service"
import { JobStatusResponse } from "@/types/ingestion"

export default function AdminIngestionPage() {
  const [subject, setSubject] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [jobId, setJobId] = useState<number | null>(null)
  const [jobStatus, setJobStatus] =
    useState<JobStatusResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file || !subject) return

    try {
      setLoading(true)
      const response = await uploadCsv(subject, file)
      setJobId(response.job_id)
      pollStatus(response.job_id)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const pollStatus = (id: number) => {
    const interval = setInterval(async () => {
      try {
        const status = await getJobStatus(id)
        setJobStatus(status)

        if (
          status.status === "COMPLETED" ||
          status.status === "FAILED"
        ) {
          clearInterval(interval)
        }
      } catch (err) {
        console.error(err)
        clearInterval(interval)
      }
    }, 3000)
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">
        Upload JAMB Questions (CSV)
      </h1>

      <div className="space-y-4 border p-6 rounded shadow">
        <input
          type="text"
          placeholder="Subject"
          className="border p-2 w-full"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>

      {jobId && (
        <div className="border p-6 rounded shadow">
          <h2 className="font-semibold mb-2">
            Job ID: {jobId}
          </h2>

          {jobStatus ? (
            <div className="space-y-2">
              <p>Status: {jobStatus.status}</p>
              <p>Inserted: {jobStatus.inserted}</p>
              <p>Skipped: {jobStatus.skipped}</p>
              {jobStatus.error && (
                <p className="text-red-600">
                  Error: {jobStatus.error}
                </p>
              )}
            </div>
          ) : (
            <p>Processing...</p>
          )}
        </div>
      )}
    </div>
  )
}