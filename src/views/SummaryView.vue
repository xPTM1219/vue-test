<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { SummaryApi } from '@/api/auth'
import JobSummaryChart from '@/components/job-summary/JobSummaryChart.vue'

const authStore = useAuthStore()
const jobData = ref<any>({
  totalJobs: 0,
  completed: 0,
  failed: 0,
  running: 0,
  pending: 0
})
const isLoading = ref(true)

// Fetch job summary on component mount
onMounted(async () => {
  await fetchJobSummary()
})

const fetchJobSummary = async () => {
  isLoading.value = true
  try {
    const response = await SummaryApi.getJobSummary()
    if (response.success && response.data) {
      jobData.value = response.data
    }
  } catch (error) {
    console.error('Error fetching job summary:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="summary-container">
    <h1>Job Summary</h1>
    
    <div v-if="isLoading" class="loading-state">
      <span>Loading job summary...</span>
    </div>

    <div v-else class="summary-content">
      <div class="chart-section">
        <JobSummaryChart :job-data="jobData" />
      </div>
      
      <div class="stats-section">
        <div class="stat-card">
          <h3>Total Jobs</h3>
          <p class="stat-value">{{ jobData.totalJobs }}</p>
        </div>
        
        <div class="stat-card success">
          <h3>Completed</h3>
          <p class="stat-value">{{ jobData.completed }}</p>
        </div>
        
        <div class="stat-card failed">
          <h3>Failed</h3>
          <p class="stat-value">{{ jobData.failed }}</p>
        </div>
        
        <div class="stat-card running">
          <h3>Running</h3>
          <p class="stat-value">{{ jobData.running }}</p>
        </div>
        
        <div class="stat-card pending">
          <h3>Pending</h3>
          <p class="stat-value">{{ jobData.pending }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.summary-content {
  display: flex;
  gap: 30px;
}

.chart-section {
  flex: 1;
}

.stats-section {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.stat-card {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: white;
}

.stat-card h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  opacity: 0.9;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
}

.stat-card.success {
  background-color: #2ecc71;
}

.stat-card.failed {
  background-color: #e74c3c;
}

.stat-card.running {
  background-color: #f39c12;
}

.stat-card.pending {
  background-color: #95a5a6;
}
</style>