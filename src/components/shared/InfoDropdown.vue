<template>
  <div v-clickOutside="close">
    <div
      class="absolute cursor-default flex flex-col pt-8 text-app-color z-100 shadow-dropdown mt-8 bg-primary"
      :class="[classes, width]"
    >
      <p v-if="title" class="" :class="titleClasses">{{ title }}</p>

      <slot />

      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  width?: string
  classes?: string | string[]
  titleClasses?: string
}>(), {
  width: 'w-[180px]',
  classes: '-right-5 max-h-[190px] rounded-4',
  titleClasses: 'px-12 font-medium text-15 mb-6'
})

const emit = defineEmits(['showDropdown'])

function close () {
  emit('showDropdown', false)
}
</script>
