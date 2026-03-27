<script setup lang="ts">
import { ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  jobData: {
    type: Object as () => {
      totalJobs: number
      completed: number
      failed: number
      running: number
      pending: number
    },
    default: null
  }
})

const chartRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

watch(() => props.jobData, () => {
  if (props.jobData && chartRef.value) {
    createChart()
  }
}, { immediate: true })

const createChart = () => {
  if (!chartRef.value || !chartInstance) return

  const ctx = chartRef.value.getContext('2d')
  
  // Destroy existing chart if it exists
  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart('pie',{
    type: 'pie',
    data: {
      labels: ['Completed', 'Failed', 'Running', 'Pending'],
      datasets: [{
        data: [
          props.jobData.completed,
          props.jobData.failed,
          props.jobData.running,
          props.jobData.pending
        ],
        backgroundColor: [
          '#2ecc71',
          '#e74c3c',
          '#f39c12',
          '#95a5a6'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        title: {
          display: true,
          text: 'Job Status Distribution',
          font: {
            size: 16
          }
        }
      }
    }
  })
}
</script>

<template>
  <canvas ref="chartRef" width="400" height="400"></canvas>
</template>

<style scoped>
canvas {
  max-width: 100%;
}
</style>