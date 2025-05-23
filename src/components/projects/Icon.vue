<template>
  <div class="w-32 h-32 flex rounded-4 cursor-pointer relative z-20 hover:bg-grey-400 group">
    <span
      class="whitespace-nowrap absolute z-10 shadow px-5 rounded-4 text-10 bottom-30
      font-medium opacity-0 group-hover:opacity-100 bg-backdrop text-white"
      :class="hasRightTooltipPosition"
    >
      {{ icon }}
    </span>
    <img
      ref="iconRef"
      class="w-23 h-23 m-auto"
      src="https://helloivy-icons.s3.eu-central-1.amazonaws.com/white-large-square.png"
      :alt="icon"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  index: number
  chunkSize: number
  hasRightTooltipPosition: string
}>()

const emit = defineEmits(['updateChunkSize'])

const iconRef = ref(null)

const observer = new IntersectionObserver(([entry], observer) => {
  if (entry && entry.isIntersecting) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    entry.target.src = `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${props.icon}.png`
    if (props.index > 35) {
      emit('updateChunkSize', props.chunkSize + 1)
    }
    observer.unobserve(entry.target)
  }
}, { root: document.getElementById('icons') })

onMounted(() => {
  observer.observe(iconRef.value)
})

onUnmounted(() => {
  observer.disconnect()
})
</script>
