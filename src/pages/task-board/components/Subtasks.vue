<template>
  <div
    class="flex items-center shrink-0"
    :class="{ 'rounded-full': isModal }"
  >
    <div class="mr-5" :style="{ width: size + 'px', height: size + 'px' }">
      <svg class="circle shrink-0 mr-5 opacity-80" :width="size" :height="size" :viewBox="'0 0 ' + size + ' ' + size">
        <circle :cx="center" :cy="center" :r="radius" fill="none" :stroke="stroke" :stroke-width="strokeWidth" />
        <circle
          :cx="center" :cy="center" :r="radius" fill="none" stroke="#15cb54" :stroke-width="strokeWidth" :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
    </div>

    <p v-if="allSubtasks" class="leading-none" :class="fontSize">
      {{ completedSubTasks }}/{{ allSubtasks }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  task: ITask
  isModal?: boolean
  fontSize?: string
  radius?: number
  stroke?: string
}>(), {
  isModal: false,
  fontSize: 'text-11',
  radius: 6,
  stroke: '#E4E4E4'
})

const strokeWidth = 2
const radius = ref(props.radius)

const allSubtasks = computed(() => {
  return props.task?.subTask.length
})

const completedSubTasks = computed(() => {
  return props.task?.subTask.filter(i => i.completedAt).length
})

const center = computed(() => {
  return strokeWidth / 2 + radius.value
})

const size = computed(() => {
  return strokeWidth + radius.value * 2
})

const dashArray = computed(() => {
  return Math.PI * (radius.value * 2)
})

const dashOffset = computed(() => {
  const percent = allSubtasks.value ? completedSubTasks.value / allSubtasks.value * 100 : 0
  return dashArray.value * (1 - percent / 100)
})

</script>

<style lang="scss" scoped>
.circle{
  transform-origin: center;
  transform: rotate(-90deg);
}
</style>
