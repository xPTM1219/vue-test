// src/types/logs.ts

export interface LogEntry {
  id: string
  logId: string
  timestamp: Date
  level: 'error' | 'warn' | 'info' | 'debug'
  message: string
  source: string
  url: string
  permissions: string[]
}

export interface LogResponse {
  success: boolean
  data?: LogEntry[]
  total?: number
  page?: number
  pageSize?: number
  message?: string
  error?: string
}

export interface LogFilter {
  level?: string
  source?: string
  minTimestamp?: Date
  maxTimestamp?: Date
  search?: string
}