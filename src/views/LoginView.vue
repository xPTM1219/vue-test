<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { AuthApi } from '@/api/auth'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Please enter both username and password'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const response = await AuthApi.login({ username: username.value, password: password.value })
    
    if (response.success && response.data) {
      authStore.setUserPermissions(response.data)
      // Redirect to home page after successful login
      window.location.href = '/'
    } else {
      error.value = response.message || 'Login failed'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Login</h1>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            :disabled="isLoading"
          />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" :disabled="isLoading" class="login-btn">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="login-hint">
        This is a demo application. Use any credentials to test the login functionality.
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ecf0f1;
}

.login-card {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  margin: 0 0 30px 0;
  color: #2c3e50;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: 500;
  color: #34495e;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

.error-message {
  background-color: #fdeaea;
  color: #e74c3c;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.login-btn {
  margin-top: 10px;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #2980b9;
}

.login-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.login-hint {
  margin-top: 20px;
  text-align: center;
  color: #7f8c8d;
  font-size: 13px;
}
</style>