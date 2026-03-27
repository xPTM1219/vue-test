<script setup lang="ts">
import { ref, computed } from 'vue'
import type { LogEntry } from '@/types/logs'
import { LogApi } from '@/api/auth'

const props = defineProps({
  logs: {
    type: Array as () => LogEntry[],
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh'])

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

// Helper function to get level class
const getLevelClass = (level: string): string => {
  return level.toLowerCase() as any
}

// Helper function to truncate text
const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Filter logs based on user permissions
const filteredLogs = computed(() => {
  return props.logs.filter(log => {
    // Admins can see everything
    const isAdmin = log.permissions.includes('admin') || log.permissions.includes('view_all')
    if (isAdmin) return true
    
    // For regular users, check if they have permission to view this log
    return log.permissions.some((perm: string) => perm.startsWith('view_'))
  })
})

const refreshLogs = async () => {
  try {
    await LogApi.getLogs()
    emit('refresh')
  } catch (error) {
    console.error('Error refreshing logs:', error)
  }
}
</script>

<template>
  <div class="logs-table-container">
    <div v-if="isLoading" class="loading-state">
      <span>Loading logs...</span>
    </div>

    <table v-else class="logs-table">
      <thead>
        <tr>
          <th>Log ID</th>
          <th>Timestamp</th>
          <th>Level</th>
          <th>Message</th>
          <th>Source</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in filteredLogs" :key="log.id" class="log-row">
          <td class="log-id">{{ log.logId }}</td>
          <td class="timestamp">{{ formatDate(log.timestamp.toString()) }}</td>
          <td class="level">
            <span :class="['level-badge', getLevelClass(log.level)]">
              {{ log.level }}
            </span>
          </td>
          <td class="message">{{ truncate(log.message, 100) }}</td>
          <td class="source">{{ log.source }}</td>
          <td class="actions">
            <a :href="log.url" target="_blank" class="view-link">View</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="filteredLogs.length === 0" class="no-data">
      <span>No logs found</span>
    </div>
  </div>
</template>

<style scoped>
.logs-table-container {
  width: 100%;
  overflow-x: auto;
}

.loading-state, .no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

.logs-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.logs-table th,
.logs-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.logs-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.log-row:hover {
  background-color: #f9f9f9;
}

.log-id {
  font-family: monospace;
  color: #666;
}

.timestamp {
  color: #666;
  font-size: 0.9em;
}

.level-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 500;
}

.level-badge.error {
  background-color: #e74c3c;
  color: white;
}

.level-badge.warn {
  background-color: #f39c12;
  color: white;
}

.level-badge.info {
  background-color: #3498db;
  color: white;
}

.level-badge.debug {
  background-color: #95a5a6;
  color: white;
}

.message {
  color: #333;
}

.source {
  color: #666;
  font-size: 0.9em;
}

.view-link {
  color: #3498db;
  text-decoration: none;
}

.view-link:hover {
  text-decoration: underline;
}
</style>