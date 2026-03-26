// src/store/auth.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserPermissions } from '@/types/permissions'
import { AuthApi } from '@/api/auth'

interface AuthState {
  isAuthenticated: boolean
  userPermissions: UserPermissions | null
  userRole: string | null
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref<boolean>(false)
  const userPermissions = ref<UserPermissions | null>(null)
  const userRole = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const setUserPermissions = (permissions: UserPermissions) => {
    userPermissions.value = permissions
    isAuthenticated.value = true
    userRole.value = permissions.role
    error.value = null
  }

  const clearUserPermissions = () => {
    userPermissions.value = null
    isAuthenticated.value = false
    userRole.value = null
    error.value = null
  }

  const hasPermission = (permission: string): boolean => {
    if (!userPermissions.value) return false
    return userPermissions.value.permissions.includes(permission)
  }

  const checkPermissions = async (): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    try {
      const response = await AuthApi.checkPermissions()
      if (response.success && response.data) {
        setUserPermissions(response.data)
        return true
      }
      return false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    try {
      const response = await AuthApi.login(credentials)
      if (response.success && response.data) {
        setUserPermissions(response.data)
        return true
      }
      error.value = response.message || 'Login failed'
      return false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    try {
      const response = await AuthApi.logout()
      if (response.success) {
        clearUserPermissions()
        return true
      }
      error.value = response.message || 'Logout failed'
      return false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isAuthenticated,
    userPermissions,
    userRole,
    isLoading,
    error,
    setUserPermissions,
    clearUserPermissions,
    hasPermission,
    checkPermissions,
    login,
    logout
  }
})