<template>
  <img class="w-full" :src="src" :alt="image">
</template>

<script setup lang="ts">
const props = defineProps<{ image: string }>()

const src = computed(() => {
  const href = new URL(`/src/assets/images/settings/${props.image}.svg`, import.meta.url).href

  return href
})
</script>
