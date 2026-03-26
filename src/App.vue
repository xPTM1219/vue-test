<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

// Check permissions on app load
if (!authStore.isAuthenticated) {
  // In a real app, we would redirect to login or fetch permissions
  console.log('Checking permissions on app load')
}
</script>

<template>
  <div class="app-container">
    <HeaderComponent></HeaderComponent>
    
    <main class="main-content">
      <RouterView></RouterView>
    </main>
    
    <FooterComponent></FooterComponent>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
