<template>
  <div v-if="!!unreadCount">
    <span
      :class="[showCount ? 'w-15 h-15' : 'w-11 h-11 border-2 border-white', unreadCount > 9 ? 'text-9' : 'text-10']"
      class="flex items-center justify-center rounded-full z-100 bg-error text-white font-medium"
    >
      <span v-if="showCount">{{ computedUnreadCount }}</span>
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  unreadCount?: number
  showCount?: boolean
}>()

const computedUnreadCount = computed(() => props.unreadCount > 9 ? '9+' : props.unreadCount)
</script>
