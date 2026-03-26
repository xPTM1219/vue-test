<script setup lang="ts">
// FooterComponent.vue
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <span>Job Management System - © 2026</span>
      <span class="refresh-time">Refresh: 60s</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.refresh-time {
  font-size: 0.9em;
  color: #bdc3c7;
}
</style>