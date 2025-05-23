<template>
  <div
    class="bg-black bg-opacity-70 rounded-full flex justify-center items-center"
    :class="[size === 'small' ? 'w-10 h-10' : 'w-20 h-20', size === 'small' ? '' : 'p-5']"
  >
    <div
      class="bg-primary rounded-full"
      :class="size === 'small' ? 'w-4 h-4' : 'w-8 h-8'"
    />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  size: 'small' | 'large'
}>()
</script>
