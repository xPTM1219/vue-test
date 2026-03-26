// src/types/jobs.ts

export interface Job {
  id: string
  username: string
  jobId: string
  status: string
  startTime: Date
  endTime: Date | null
  results: string
  logs: string[]
  createdAt: Date
  updatedAt: Date
  userId: string
  groupId: string
  permissions: string[]
}

export interface JobResponse {
  success: boolean
  data?: Job[]
  total?: number
  page?: number
  pageSize?: number
  message?: string
  error?: string
}

export interface JobFilter {
  status?: string
  username?: string
  minStartTime?: Date
  maxStartTime?: Date
  search?: string
}

export interface JobSummary {
  totalJobs: number
  completed: number
  failed: number
  running: number
  pending: number
  lastUpdated: Date
}