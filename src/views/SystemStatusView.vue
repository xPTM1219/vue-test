<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { SystemApi } from '@/api/auth'
import SystemStatus from '@/components/system-status/SystemStatus.vue'

const authStore = useAuthStore()
const isLoading = ref(true)

// Fetch system status on component mount
onMounted(async () => {
  await fetchSystemStatus()
})

const fetchSystemStatus = async () => {
  isLoading.value = true
  try {
    const response = await SystemApi.getSystemStatus()
    if (response.success && response.data) {
      // Data is loaded in the component
    }
  } catch (error) {
    console.error('Error fetching system status:', error)
  } finally {
    isLoading.value = false
  }
}

// Check permissions on mount
if (!authStore.isAuthenticated) {
  authStore.checkPermissions()
}
</script>

<template>
  <div class="system-status-view">
    <SystemStatus />
  </div>
</template>

<style scoped>
.system-status-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>