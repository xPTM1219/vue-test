// src/api/auth.ts

import { api, ApiEndpoints } from './api'
import type { AxiosResponse } from 'axios'
import type { UserPermissions, PermissionResponse } from '@/types/permissions'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export const AuthApi = {
  async checkPermissions(): Promise<PermissionResponse> {
    return api.get<UserPermissions>(ApiEndpoints.AUTH.CHECK_PERMISSIONS)
  },

  async login(credentials: { username: string; password: string }): Promise<PermissionResponse> {
    return api.post<UserPermissions>(ApiEndpoints.AUTH.LOGIN, credentials)
  },

  async logout(): Promise<PermissionResponse> {
    return api.post<any>(ApiEndpoints.AUTH.LOGOUT)
  },
}

export const JobApi = {
  async getJobs(params?: any): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.JOBS.LIST, params)
  },

  async getJobDetails(id: string): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.JOBS.DETAILS.replace(':id', id))
  },

  async refreshJobs(refreshTime: number): Promise<ApiResponse<any>> {
    return api.post<any>(ApiEndpoints.JOBS.REFRESH, { refreshTime })
  },
}

export const LogApi = {
  async getLogs(params?: any): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.LOGS.LIST, params)
  },

  async getLogDetails(id: string): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.LOGS.DETAILS.replace(':id', id))
  },
}

export const SystemApi = {
  async getSystemStatus(): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.SYSTEM.STATUS)
  },

  async getEnginesStatus(): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.SYSTEM.ENGINES)
  },

  async getClusterStatus(): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.SYSTEM.CLUSTER)
  },
}

export const SummaryApi = {
  async getJobSummary(): Promise<ApiResponse<any>> {
    return api.get<any>(ApiEndpoints.SUMMARY.JOB_SUMMARY)
  },
}