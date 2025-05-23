<template>
  <div class="progress">
    <svg class="progress-circle" :width="`${wrapperSize}px`" :height="`${wrapperSize}px`" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-circle-back" :cx="wrapperSize / 2" :cy="wrapperSize / 2" :r="radius" />
      <circle ref="progressRef" class="progress-circle-prog text-basic" :cx="wrapperSize / 2" :cy="wrapperSize / 2" :r="radius" />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  total: number
  current: number
  radius?: number
  wrapperSize?: number
}>(), {
  radius: 20,
  wrapperSize: 100
})

const progressRef = ref(null)

watch(() => props.current, () => {
  start()
})

onMounted(() => {
  nextTick(() => {
    start()
  })
})

function start () {
  const circumference = 2 * Math.PI * props.radius

  const progressPercentage = props.current / props.total * 100 // Replace with your progress value (0-100)

  const visibleStroke = (progressPercentage / 100) * circumference

  const remainingStroke = circumference - visibleStroke

  progressRef.value.style.strokeDasharray = `${visibleStroke} ${remainingStroke}`
}

</script>

<style lang="scss">
.progress-circle {
  transform: rotate(-90deg);
}

.progress-circle-back {
  fill: none;
  stroke: #aaaaaa;
  stroke-width: 2px;
}

.progress-circle-prog {
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
  stroke-dasharray: 0 999;
  stroke-dashoffset: 0px;
  transition: stroke-dasharray 0.7s linear 0s;
}

.inner-icon {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
