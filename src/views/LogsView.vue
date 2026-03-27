<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { LogApi } from '@/api/auth'
import LogsTable from '@/components/logs/LogsTable.vue'
import RefreshControl from '@/components/common/RefreshControl.vue'

const authStore = useAuthStore()
const logs = ref<any[]>([])
const isLoading = ref(true)
const refreshTime = ref(60)
const refreshInterval = ref<number | null>(null)

// Fetch logs on component mount
onMounted(async () => {
  await fetchLogs()
  startRefreshInterval()
})

const fetchLogs = async () => {
  isLoading.value = true
  try {
    const response = await LogApi.getLogs({ page: 1, pageSize: 50 })
    if (response.success && response.data) {
      logs.value = response.data
    }
  } catch (error) {
    console.error('Error fetching logs:', error)
  } finally {
    isLoading.value = false
  }
}

const startRefreshInterval = () => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
  
  refreshInterval.value = window.setInterval(() => {
    fetchLogs()
  }, refreshTime.value * 1000)
}

const handleRefresh = async () => {
  await fetchLogs()
}

// Check permissions on mount
if (!authStore.isAuthenticated) {
  authStore.checkPermissions()
}
</script>

<template>
  <div class="logs-container">
    <h1>System Logs</h1>
    
    <RefreshControl 
      :refresh-time="refreshTime"
      :min-refresh-time="30"
      @refresh="handleRefresh"
    />
    
    <LogsTable 
      :logs="logs"
      :is-loading="isLoading"
      @refresh="handleRefresh"
    />
  </div>
</template>

<style scoped>
.logs-container {
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>