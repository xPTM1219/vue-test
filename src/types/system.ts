// src/types/system.ts

export interface EngineStatus {
  id: string
  name: string
  status: 'running' | 'stopped' | 'error'
  uptime: number
  lastHeartbeat: Date
  memoryUsage: number
  cpuUsage: number
}

export interface ClusterStatus {
  nodes: NodeInfo[]
  members: MemberInfo[]
  size: number
  status: 'healthy' | 'degraded' | 'unhealthy'
}

export interface NodeInfo {
  nodeId: string
  host: string
  port: number
  status: 'online' | 'offline'
  lastSeen: Date
}

export interface MemberInfo {
  memberId: string
  address: string
  status: 'active' | 'passive' | 'removed'
  role: 'primary' | 'replica'
}

export interface SystemStatusResponse {
  success: boolean
  data?: {
    engines: EngineStatus[]
    cluster: ClusterStatus
    lastUpdated: Date
  }
  message?: string
  error?: string
}