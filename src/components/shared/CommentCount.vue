<template>
  <ButtonModule
    :tooltipText="tooltipText"
    teleportTooltip
    :tooltipTop="!tooltipBottom"
    :tooltipBottom="tooltipBottom"
    tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
    :class="customStyling"
  >
    <template #wrapper>
      <div :class="wrapperStyling">
        <i :class="`icon-chat ${iconStyling}`" />
        <p :class="countStyling">{{ countMessages }}</p>
      </div>
    </template>
  </ButtonModule>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  tooltipText?: string
  countMessages: number
  customStyling?: string
  wrapperStyling?: string
  iconStyling?: string
  countStyling?: string
  tooltipBottom?: boolean
}>(), {
  tooltipText: 'Comments',
  tooltipBottom: false,
  countStyling: 'leading-none text-12 mb-1',
  iconStyling: 'text-13  mt-1 mr-2',
  wrapperStyling: 'flex items-center p-5 text-white rounded-7 bg-black/[0.6]',
  customStyling: 'absolute top-7'
})
</script>
