import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('@/views/LogsView.vue')
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import('@/views/SummaryView.vue')
  },
  {
    path: '/system',
    name: 'SystemStatus',
    component: () => import('@/views/SystemStatusView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/UnauthorizedView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // If user is not authenticated and trying to access protected routes
  if (!authStore.isAuthenticated && to.name !== 'Login' && to.name !== 'Unauthorized') {
    await authStore.checkPermissions()
    
    if (authStore.isAuthenticated) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
