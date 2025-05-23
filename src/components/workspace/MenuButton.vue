<template>
  <ButtonModule
    class="toolbar-btn relative anim-color flex justify-center"
    :tooltipText="tooltipText"
    tooltipPosition="bottom-37 left-1/2 -translate-x-1/2 z-20"
    :tooltipClasses="tooltipClasses"
  >
    <div
      class="rounded-5 hover:bg-grey-450 min-w-[30px] min-h-[30px] flex items-center justify-center px-7 py-5"
      :class="classes"
    >
      <slot />
    </div>
  </ButtonModule>
</template>

<script setup lang="ts">
const props = defineProps<{
  tooltipText?: string
  tooltipClasses?: string
  isActive?: boolean
}>()

const classes = computed(() => {
  const prefix = props.isActive ? '' : 'md:hover:'

  return `${prefix}bg-hover-book ${prefix}text-dark-default`
})
</script>
