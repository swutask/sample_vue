<template>
  <div class="flex items-start space-x-7">
    <div
      v-for="avatar in avatars.slice(sliceIndex, count)"
      :key="avatar.url"
      class="rounded-full flex-shrink-0 flex "
      :title="avatar.name"
      :style="`width: ${size}px; height: ${size}px`"
    >
      <img
        class="avatar rounded-full object-cover w-full h-full"
        :src="avatar.url"
        alt="avatar"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  count: number
  sliceIndex: number
  size: number
}>(), {
  count: 3,
  sliceIndex: 0,
  size: 30
})

const avatars = computed(() => {
  return [
    {
      url: '/images/avatar-1.png',
      name: 'Diana Felton'
    },
    {
      url: '/images/avatar-2.png',
      name: 'Tom Binder'
    },
    {
      url: '/images/avatar-3.png',
      name: 'Patrick Robinson'
    }
  ]
})
</script>
