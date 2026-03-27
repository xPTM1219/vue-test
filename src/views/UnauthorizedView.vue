<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.clearUserPermissions()
  // Redirect to login page
  window.location.href = '/login'
}
</script>

<template>
  <div class="unauthorized-container">
    <div class="unauthorized-card">
      <h1>Access Denied</h1>
      
      <p>You do not have permission to access this page.</p>
      
      <div class="error-icon">🚫</div>
      
      <button @click="handleLogout" class="logout-btn">
        Go to Login
      </button>
    </div>
  </div>
</template>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ecf0f1;
}

.unauthorized-card {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
}

h1 {
  margin: 0 0 15px 0;
  color: #e74c3c;
}

p {
  color: #666;
  margin-bottom: 20px;
}

.error-icon {
  font-size: 80px;
  margin: 20px 0;
}

.logout-btn {
  padding: 12px 30px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>