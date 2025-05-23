<template>
  <div class="flex items-center font-semibold">
    <span class="md:shadow-short-cut p-1 px-8" :class="classes">{{ first }}</span>
    <span class="opacity-50 p-1 px-8">+</span>
    <span class="md:shadow-short-cut p-1 px-8" :class="classes">{{ second }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  first: string
  second: string
  classes?: string
}>(), {
  classes: 'rounded-4 opacity-50'
})
</script>
