<template>
  <teleport to="#main_section">
    <TransitionExpand>
      <div ref="contentRef" class="absolute" :style="`${position}; width: ${width}px;`">
        <slot />
      </div>
    </TransitionExpand>
  </teleport>
</template>
<script setup lang="ts">
import TransitionExpand from '@/components/shared/TransitionExpand'

const props = withDefaults(defineProps<{
  // general
  contentHeight?: number
  positionLeft?: number | null
  positionDirection?: string
  referenceRef?: HTMLElement
  width?: number
  isAutoMenuPosition?: boolean
}>(), {
  width: 290,
  contentHeight: 0,
  positionDirection: 'right',
  isAutoMenuPosition: true
})

const position = ref(`top: 0px; left: ${props.positionLeft || 0}px`)
const contentRef = ref()

onMounted(() => {
  setPosition()
})

function setPosition () {
  const rect = props.referenceRef?.getBoundingClientRect()

  let left = props.positionLeft || rect.left + rect.width - props.width

  if (props.positionDirection === 'left') {
    left = props.positionLeft || rect.left
  }

  if (left < 10) left = 10

  const gap = 15

  if (window.innerHeight < (rect.bottom + props.contentHeight + gap)) {
    position.value = `bottom: ${window.innerHeight + props.contentHeight + rect.height - rect.top}px; left: ${left}px`
  } else {
    position.value = `top: ${rect.bottom}px; left: ${left}px`
  }
}
</script>
