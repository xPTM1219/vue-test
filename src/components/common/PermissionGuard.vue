// src/components/common/PermissionGuard.vue

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  requiredPermissions: {
    type: Array as () => string[],
    default: () => []
  }
})

const authStore = useAuthStore()
const router = useRouter()
const isChecking = ref(true)

const checkPermissions = () => {
  if (!props.requiredPermissions.length) return true

  if (!authStore.isAuthenticated) {
    // Redirect to login if not authenticated
    router.push('/login')
    return false
  }

  // Check if user has all required permissions
  return props.requiredPermissions.every(permission => {
    return authStore.hasPermission(permission)
  })
}

const checkAndRedirect = async () => {
  isChecking.value = true
  try {
    // First check if we have permissions
    const hasPermissions = checkPermissions()

    if (!hasPermissions) {
      // If not, redirect to unauthorized page
      router.push('/unauthorized')
      return false
    }
    return true
  } finally {
    isChecking.value = false
  }
}

onMounted(async () => {
  await checkAndRedirect()
})

defineExpose({
  checkPermissions
})
</script>

<template>
  <slot v-if="!isChecking"></slot>
</template>