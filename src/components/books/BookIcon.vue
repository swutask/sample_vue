<template>
  <Icons
    :iconHeight="57"
    :optionalCoefficient="-10"
    class="flex-shrink-0 no-drag"
    :disableModalToggle="disabled"
    @setIcon="setIcon"
  >
    <div
      class="flex rounded-10 cursor-pointer border-grey-450"
      :class="[
        {'border': hasBorder},
        size,
        customStyling
      ]"
    >
      <!-- id 'overviewBookIcon' used for dynamicBackground in the Overview -->
      <img id="overviewBookIcon" ref="imgRef" class="m-auto" :class="iconSize" :src="iconSRC" alt="icon">
    </div>
  </Icons>
</template>

<script setup lang="ts">
import Icons from '@/components/projects/Icons.vue'

const props = withDefaults(defineProps<{
  book: IBook
  disabled?: boolean
  size?: string
  iconSize?: string
  hasBorder?: boolean
  withDynamicBg?: boolean
  isCreateSpace?: boolean
  isHeaderIcon?: boolean
  customStyling?: string
}>(), {
  size: 'w-40 h-40',
  iconSize: 'w-2/3 h-2/3',
  hasBorder: true
})
const emit = defineEmits(['updateDynamicBg', 'updateIcon'])

const { editBook } = useBook()

const imgRef = ref(null)

const iconSRC = computed(() => {
  const icon = props.book?.icon || 'default-phoenix'

  if (icon.includes('default-')) {
    return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.svg`
  }

  return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.png`
})

function setIcon (icon: string) {
  if (props.disabled) return
  if (props.isCreateSpace) return emit('updateIcon', icon)

  editBook({
    id: props.book.id,
    icon
  }, !props.isHeaderIcon)
  if (props.withDynamicBg) {
    setTimeout(() => emit('updateDynamicBg'), 300)
  }
}
</script>
