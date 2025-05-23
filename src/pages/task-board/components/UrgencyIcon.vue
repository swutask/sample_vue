<template>
  <div class="flex items-center space-x-15 cursor-pointer text-14">
    <div
      class="flex"
      :style="{width: `${iconSize}px`, height: `${iconSize}px`}"
    >
      <img class="w-full h-full" :src="src" :alt="text">
    </div>

    <slot name="text">
      <span v-if="text" :class="fontSize">{{ text }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string
  type: number
  iconSize?: number
  fontSize?: string
}>(), {
  iconSize: 14,
  fontSize: 'text-13'
})

const src = computed(() => {
  const href = new URL(`/src/assets/images/urgency-${props.type}.svg`, import.meta.url).href

  return href
})

</script>
