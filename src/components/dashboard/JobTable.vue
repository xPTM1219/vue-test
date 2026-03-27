<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Job } from '@/types/jobs'
import { JobApi } from '@/api/auth'

const props = defineProps({
  jobs: {
    type: Array as () => Job[],
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

// Helper function to get status class
const getStatusClass = (status: string): string => {
  return status.toLowerCase() as any
}

// Helper function to truncate text
const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Filter jobs based on user permissions
const filteredJobs = computed(() => {
  return props.jobs.filter(job => {
    // Admins can see everything
    // Customers can only see their own jobs
    const isAdmin = job.permissions.includes('admin') || job.permissions.includes('view_all')
    if (isAdmin) return true
    
    // For regular users, check if they have permission to view this job
    return job.permissions.some(perm => perm.startsWith('view_'))
  })
})

const refreshJobs = async () => {
  try {
    await JobApi.refreshJobs(60)
    emit('refresh')
  } catch (error) {
    console.error('Error refreshing jobs:', error)
  }
}
</script>

<template>
  <div class="job-table-container">
    <div v-if="isLoading" class="loading-state">
      <span>Loading jobs...</span>
    </div>

    <table v-else class="job-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Job ID</th>
          <th>Date & Time</th>
          <th>Status</th>
          <th>Results</th>
          <th>Logs</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in filteredJobs" :key="job.id" class="job-row">
          <td class="username">{{ job.username }}</td>
          <td class="job-id">{{ job.jobId }}</td>
          <td class="datetime">
            {{ formatDate(job.startTime.toString()) }}
          </td>
          <td class="status">
            <span :class="['status-badge', getStatusClass(job.status)]">
              {{ job.status }}
            </span>
          </td>
          <td class="results">{{ truncate(job.results, 50) }}</td>
          <td class="logs">
            <a :href="job.logs[0]" target="_blank" class="log-link">View Logs</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="filteredJobs.length === 0" class="no-data">
      <span>No jobs found</span>
    </div>
  </div>
</template>

<style scoped>
.job-table-container {
  width: 100%;
  overflow-x: auto;
}

.loading-state, .no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

.job-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.job-table th,
.job-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.job-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.job-row:hover {
  background-color: #f9f9f9;
}

.username {
  font-weight: 500;
  color: #2c3e50;
}

.job-id {
  font-family: monospace;
  color: #666;
}

.datetime {
  color: #666;
  font-size: 0.9em;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 500;
}

.status-badge.completed {
  background-color: #2ecc71;
  color: white;
}

.status-badge.failed {
  background-color: #e74c3c;
  color: white;
}

.status-badge.running {
  background-color: #f39c12;
  color: white;
}

.status-badge.pending {
  background-color: #95a5a6;
  color: white;
}

.log-link {
  color: #3498db;
  text-decoration: none;
}

.log-link:hover {
  text-decoration: underline;
}
</style>