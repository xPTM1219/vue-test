// src/api/api.ts

import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { UserPermissions } from '@/types/permissions'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ApiService {
  private instance: AxiosInstance
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api'
    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private handleResponse(response: AxiosResponse): ApiResponse<any> {
    if (response.data && response.data.success !== undefined) {
      return response.data
    }
    return {
      success: response.status >= 200 && response.status < 300,
      data: response.data,
      message: response.statusText,
    }
  }

  public async get<T>(endpoint: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get(endpoint, { params })
      return this.handleResponse(response)
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  public async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post(endpoint, data)
      return this.handleResponse(response)
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  public async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put(endpoint, data)
      return this.handleResponse(response)
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete(endpoint)
      return this.handleResponse(response)
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }
}

export const api = new ApiService()

export const ApiEndpoints = {
  AUTH: {
    CHECK_PERMISSIONS: '/auth/check-permissions',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  JOBS: {
    LIST: '/jobs',
    DETAILS: '/jobs/:id',
    REFRESH: '/jobs/refresh',
  },
  LOGS: {
    LIST: '/logs',
    DETAILS: '/logs/:id',
  },
  SYSTEM: {
    STATUS: '/system/status',
    ENGINES: '/system/engines',
    CLUSTER: '/system/cluster',
  },
  SUMMARY: {
    JOB_SUMMARY: '/summary/jobs',
  },
}