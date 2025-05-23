
<template>
  <div
    class="resize-wrapper flex items-center absolute p-5 rounded-4"
    :class="resizePositionBottom ? 'resize-wrapper-bottom' : 'resize-wrapper-top'"
  >
    <i
      class="icon-resize -ml-5 -rotate-45 text-17 text-grey-300"
      @click.stop
      @mousedown.prevent="onMouseDown"
      @touchstart.prevent.stop.passive="touchStart"
      @touchend.prevent.stop="touchEnd"
      @touchmove.passive.stop="touchMove"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  element: HTMLElement
  width?: number
  height?: number
  resizePositionBottom?: boolean
}>()
const emit = defineEmits(['resize', 'save'])

const clientX = ref(0)
const clientY = ref(0)
const initWidth = ref(0)
const initHeight = ref(0)

const sizes = reactive({
  width: props.width,
  height: props.height
})

function resize (e: MouseEvent) {
  const rect = props.element.getBoundingClientRect()
  const currWidth = initWidth.value + e.clientX - clientX.value
  const innerWidth = window.innerWidth

  sizes.width = innerWidth - rect.left <= currWidth ? innerWidth - rect.left : currWidth
  sizes.height = props.resizePositionBottom ? initHeight.value + e.clientY - clientY.value : initHeight.value - e.clientY + clientY.value
  emit('resize', sizes)
}

function setDefaultValues (e: MouseEvent) {
  const rect = props.element.getBoundingClientRect()
  initWidth.value = rect.width
  initHeight.value = rect.height
  clientX.value = e.clientX
  clientY.value = e.clientY
}

// touch
function touchStart (e) {
  const touch = e.touches[0]
  setDefaultValues(touch)
}

function touchMove (e) {
  const touch = e.touches[0]
  resize(touch)
}

function touchEnd () {
  emit('save', sizes)
}

// mouse
function onMouseDown (e: MouseEvent) {
  setDefaultValues(e)

  const onMouseMove = (e: MouseEvent) => {
    resize(e)
  }

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    emit('save', sizes)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<style scoped lang="scss">
.resize-wrapper {
  cursor: row-resize;
  right: -2px;
}

.resize-wrapper-bottom {
  transform: rotate(45deg);
  bottom: -4px;
}

.resize-wrapper-top {
  transform: rotate(-45deg);
  top: -5px;
}
</style>
