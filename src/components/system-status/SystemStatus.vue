<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SystemApi } from '@/api/auth'
import type { EngineStatus, ClusterStatus } from '@/types/system'

const engines = ref<EngineStatus[]>([])
const cluster = ref<ClusterStatus | null>(null)
const isLoading = ref(true)
const lastUpdated = ref<Date | null>(null)

// Fetch system status on component mount
onMounted(async () => {
  await fetchSystemStatus()
})

const fetchSystemStatus = async () => {
  isLoading.value = true
  try {
    const response = await SystemApi.getSystemStatus()
    if (response.success && response.data) {
      engines.value = response.data.engines || []
      cluster.value = response.data.cluster || null
      lastUpdated.value = response.data.lastUpdated || new Date()
    }
  } catch (error) {
    console.error('Error fetching system status:', error)
  } finally {
    isLoading.value = false
  }
}

const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`
  }
  return `${hours}h ${minutes}m`
}

const formatMemory = (bytes: number): string => {
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(2)} MB`
}

const formatCpu = (percent: number): string => {
  return `${percent.toFixed(1)}%`
}

// Helper function to get engine status class
const getEngineStatusClass = (status: string): string => {
  return status.toLowerCase() as any
}

// Helper function to format date
const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

// Helper function to get cluster status class
const getClusterStatusClass = (status: string): string => {
  return status.toLowerCase() as any
}

// Helper function to get node status class
const getNodeStatusClass = (status: string): string => {
  return status.toLowerCase() as any
}

// Helper function to get member role class
const getMemberRoleClass = (role: string): string => {
  return role.toLowerCase() as any
}
</script>

<template>
  <div class="system-status-container">
    <h1>System Status</h1>
    
    <div v-if="isLoading" class="loading-state">
      <span>Loading system status...</span>
    </div>

    <div v-else class="status-content">
      <div class="section">
        <h2>Engines Status</h2>
        
        <div v-if="engines.length === 0" class="no-data">
          <span>No engines found</span>
        </div>

        <div v-for="engine in engines" :key="engine.id" class="engine-card">
          <div class="engine-header">
            <h3>{{ engine.name }}</h3>
            <span :class="['status-badge', getEngineStatusClass(engine.status)]">
              {{ engine.status }}
            </span>
          </div>
          
          <div class="engine-details">
            <div class="detail-item">
              <span class="label">Uptime:</span>
              <span class="value">{{ formatUptime(engine.uptime) }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">Memory Usage:</span>
              <span class="value">{{ formatMemory(engine.memoryUsage) }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">CPU Usage:</span>
              <span class="value">{{ formatCpu(engine.cpuUsage) }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">Last Heartbeat:</span>
              <span class="value">{{ formatDate(engine.lastHeartbeat.toString()) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Cluster Status</h2>
        
        <div v-if="cluster" class="cluster-info">
          <div class="cluster-header">
            <span :class="['cluster-status', getClusterStatusClass(cluster.status)]">
              {{ cluster.status }}
            </span>
            <span>{{ cluster.size }} nodes</span>
          </div>
          
          <div class="nodes-grid">
            <div v-for="node in cluster.nodes" :key="node.nodeId" class="node-card">
              <div class="node-status">
                <span :class="['node-badge', getNodeStatusClass(node.status)]">
                  {{ node.status }}
                </span>
              </div>
              
              <div class="node-info">
                <span>{{ node.host}}:{{ node.port }}</span>
                <small>Last seen: {{ formatDate(node.lastSeen.toString()) }}</small>
              </div>
            </div>
          </div>

          <div class="members-section">
            <h3>Cluster Members</h3>
            <div v-for="member in cluster.members" :key="member.memberId" class="member-card">
              <span>{{ member.address }}</span>
              <span :class="['member-role', getMemberRoleClass(member.role)]">
                {{ member.role }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="no-data">
          <span>Cluster information not available</span>
        </div>
      </div>

      <div class="last-updated">
        Last updated: {{ formatDate(lastUpdated?.toString()) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-status-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  color: #34495e;
  margin-bottom: 15px;
}

.loading-state, .no-data {
  text-align: center;
  padding: 40px;
  color: #666;
}

.status-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.engine-card {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

.engine-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.engine-header h3 {
  margin: 0;
  color: #2c3e50;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 500;
}

.status-badge.running {
  background-color: #2ecc71;
  color: white;
}

.status-badge.stopped {
  background-color: #95a5a6;
  color: white;
}

.status-badge.error {
  background-color: #e74c3c;
  color: white;
}

.engine-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
}

.label {
  color: #666;
}

.value {
  color: #333;
  font-weight: 500;
}

.cluster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.cluster-status {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: 500;
}

.cluster-status.healthy {
  background-color: #2ecc71;
  color: white;
}

.cluster-status.degraded {
  background-color: #f39c12;
  color: white;
}

.cluster-status.unhealthy {
  background-color: #e74c3c;
  color: white;
}

.nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.node-card {
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  text-align: center;
}

.node-status {
  margin-bottom: 5px;
}

.node-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8em;
}

.node-badge.online {
  background-color: #2ecc71;
  color: white;
}

.node-badge.offline {
  background-color: #95a5a6;
  color: white;
}

.node-info {
  font-size: 0.85em;
  color: #666;
}

.members-section h3 {
  margin-bottom: 10px;
  font-size: 1em;
}

.member-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 5px;
}

.member-role {
  font-size: 0.8em;
  padding: 2px 8px;
  border-radius: 10px;
}

.member-role.primary {
  background-color: #3498db;
  color: white;
}

.member-role.replica {
  background-color: #95a5a6;
  color: white;
}

.last-updated {
  text-align: center;
  padding: 10px;
  color: #666;
  font-size: 0.9em;
}
</style>