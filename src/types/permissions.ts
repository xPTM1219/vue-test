// src/types/permissions.ts

export interface UserPermissions {
  role: string
  permissions: string[]
  userId: string
  groupId: string
}

export interface PermissionResponse {
  success: boolean
  data?: UserPermissions
  message?: string
}