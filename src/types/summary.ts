// src/types/summary.ts

export interface JobSummary {
  totalJobs: number
  completed: number
  failed: number
  running: number
  pending: number
  lastUpdated: Date
  jobDetails: JobDetail[]
}

export interface JobDetail {
  jobId: string
  username: string
  status: string
  startTime: Date
  endTime: Date | null
  duration: number
  successRate: number
}

export interface SummaryResponse {
  success: boolean
  data?: JobSummary
  message?: string
  error?: string
}