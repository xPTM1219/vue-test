import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Create and register Pinia store BEFORE using router or mounting app
const pinia = createPinia()
app.use(pinia)

// Register router AFTER Pinia is initialized
app.use(router)

app.mount('#app')
