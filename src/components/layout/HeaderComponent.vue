<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { AuthApi } from '@/api/auth'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const isLoading = ref(true)

const logout = async () => {
  try {
    await AuthApi.logout()
    authStore.clearUserPermissions()
    // In a real app, we would redirect to login page
    console.log('Logged out successfully')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

onMounted(async () => {
  try {
    // Check permissions on component mount
    const response = await AuthApi.checkPermissions()
    if (response.success && response.data) {
      authStore.setUserPermissions(response.data)
    }
  } catch (error) {
    console.error('Error checking permissions:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading" class="loading">Loading...</div>
  <div v-else class="header">
    <h1>Job Management System</h1>
    <nav class="nav-menu">
      <RouterLink to="/" class="nav-item">Dashboard</RouterLink>
      <RouterLink to="/jobs" class="nav-item">Jobs</RouterLink>
      <RouterLink to="/logs" class="nav-item">Logs</RouterLink>
      <RouterLink to="/summary" class="nav-item">Job Summary</RouterLink>
      <RouterLink to="/system" class="nav-item">System Status</RouterLink>
    </nav>
    
    <div v-if="authStore.isAuthenticated" class="user-info">
      <span>Logged in as: {{ authStore.userRole }}</span>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #34495e;
}

.nav-item.router-link-exact-active {
  background-color: #3498db;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 18px;
}
</style>