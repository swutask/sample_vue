<template>
  <div class="w-full flex items-center justify-between relative">
    <div class="flex items-center truncate">
      <div v-if="item.label === 'complex-project'" class="mr-12 flex shrink-0">
        <img v-if="item.icon" class="w-18 h-18 m-auto" :src="`https://helloivy-icons.s3.eu-central-1.amazonaws.com/${item.icon}.png`" alt="icon">
        <img v-else-if="item.icon === null" class="w-18 h-18 m-auto" src="https://helloivy-icons.s3.eu-central-1.amazonaws.com/purple_circle.png" alt="icon">
        <img v-else class="w-18 h-18 m-auto" src="@/assets/images/planet.svg" alt="icon">
      </div>

      <div
        v-else
        class="mr-12 flex flex-shrink-0"
      >
        <i class="m-auto" :class="icon" />
      </div>

      <div class="leading-tight truncate">
        <div class="text-app-color truncate text-13">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: IMentionItem
}>()

const icons = {
  project: null,
  task: 'icon-task-board text-16',
  attachment: 'icon-attachment-file text-16'
}

const icon = computed(() => {
  const index = props.item.label?.split('-')[1]
  return icons[index]
})

</script>
