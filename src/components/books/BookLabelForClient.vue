<template>
  <div class="flex items-center">
    <div class="flex items-center flex-shrink-0">
      <div
        class="flex items-center rounded-6 mr-10 border-grey-580"
        :class="size"
      >
        <img class="m-auto w-18 h-18" :src="iconSRC" alt="icon">
      </div>
    </div>
    <div class="text-app-color truncate">
      <p class="truncate font-normal text-14" :title="title">{{ title }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  icon: string
  size?: string
}>(), {
  size: 'w-30 h-30'
})

const iconSRC = computed(() => {
  const icon = props.icon || 'default-phoenix'

  if (icon.includes('default-')) {
    return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.svg`
  }

  return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.png`
})
</script>
