<template>
  <div v-if="book || googleEvent" class="flex items-center">
    <div class="flex items-center flex-shrink-0">
      <ButtonModule
        class="flex items-center rounded-6 border-grey-580"
        tooltipTop
        teleportTooltip
        :tooltipClasses="weekPlanner ? 'text-11 px-10 py-7 rounded-8 z-9999' : 'text-13 px-10 py-7 rounded-8 z-9999'"
        :tooltipText="showTooltip ? (googleEvent ? 'Google Calendar event' : book?.title) : ''"
        :class="[
          margin,
          !googleEvent && customStyle.iconHover,
          showTitle ? hasBorder ? 'border mr-8' : 'md:mr-8' : '',
          size
        ]"
      >
        <template #wrapper>
          <img
            class="m-auto" :class="[googleEvent ? 'w-3/4 h-3/4' : customStyle.defaultIcon]"
            :src="googleEvent ? googleCalendarIcon : iconSRC"
          >
        </template>
      </ButtonModule>
    </div>
    <div v-if="showTitle" ref="bookLabelTitleRef" class="text-app-color truncate md:max-w-[400px] max-w-[145px]">
      <p class="truncate font-normal" :title="book?.title" :class="customStyle.fontSize">{{ book?.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import googleCalendarIcon from '@/assets/images/googleCalendar.svg'

const props = withDefaults(defineProps<{
  showTooltip?: boolean
  bookId?: number
  showSubTitle?: boolean
  showTitle?: boolean
  size?: string
  hasBorder?: boolean
  hasBg?: boolean
  weekPlanner?: boolean
  margin?: string
  customStyle?: {
    fontSize?: string
    defaultIcon?: string
    iconHover?: string
  }
  googleEvent?: boolean
}>(), {
  bookId: null,
  showSubTitle: false,
  showTitle: true,
  size: 'w-30 h-30',
  hasBorder: true,
  hasBg: true,
  customStyle: () => ({
    fontSize: 'text-14 font-medium',
    defaultIcon: 'w-2/3 h-2/3',
    iconHover: 'bg-primary'
  })
})

const { books } = useBook()

const bookLabelTitleRef = ref(null)
const labelWidth = ref(null)

const book = computed(() => books.value.find(b => b.id === props.bookId))

const iconSRC = computed(() => {
  const icon = book.value?.icon || 'default-phoenix'

  if (icon.includes('default-')) {
    return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.svg`
  }

  return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.png`
})

watch(bookLabelTitleRef, () => {
  const label = bookLabelTitleRef.value?.getBoundingClientRect()
  labelWidth.value = label?.width
}, { immediate: true })

defineExpose({
  labelWidth
})
</script>
