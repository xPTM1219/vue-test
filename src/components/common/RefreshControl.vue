// src/components/common/RefreshControl.vue

<script setup lang="ts">
import { ref, watch } from 'vue'
import { JobApi } from '@/api/auth'

const props = defineProps({
  refreshTime: {
    type: Number,
    default: 60
  },
  minRefreshTime: {
    type: Number,
    default: 30
  }
})

const emit = defineEmits(['refresh'])
const currentRefreshTime = ref(props.refreshTime)
const isEditing = ref(false)

const saveRefreshTime = () => {
  if (currentRefreshTime.value < props.minRefreshTime) {
    currentRefreshTime.value = props.minRefreshTime
  }
  emit('refresh', currentRefreshTime.value)
}

const startRefreshInterval = (time: number) => {
  const interval = setInterval(() => {
    emit('refresh')
  }, time * 1000)

  return interval
}

watch(() => props.refreshTime, (newVal) => {
  currentRefreshTime.value = newVal
})

defineExpose({
  currentRefreshTime,
  saveRefreshTime,
  startRefreshInterval
})
</script>

<template>
  <div class="refresh-control">
    <div v-if="!isEditing" class="refresh-display">
      <span>Refresh every: </span>
      <strong>{{ currentRefreshTime }}s</strong>
      <button @click="isEditing = true" class="edit-btn">Edit</button>
    </div>
    
    <div v-else class="refresh-edit">
      <input
        v-model.number="currentRefreshTime"
        type="number"
        min="{{ props.minRefreshTime }}"
        @keyup.enter="saveRefreshTime"
        @blur="saveRefreshTime"
        class="refresh-input"
      />
      <button @click="isEditing = false" class="save-btn">Save</button>
      <button @click="isEditing = false" class="cancel-btn">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.refresh-control {
  margin: 10px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.refresh-display {
  display: flex;
  align-items: center;
  gap: 10px;
}

.edit-btn, .save-btn, .cancel-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.save-btn {
  background-color: #2ecc71;
  color: white;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.refresh-input {
  padding: 5px;
  width: 60px;
  text-align: center;
}

.refresh-edit {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>