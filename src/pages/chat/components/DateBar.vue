<template>
  <div
    class="flex items-center justify-center sticky z-20 pt-5"
    :class="showDateBar ? topPosition : 'top-[-40px]'"
  >
    <div
      class="px-13 py-5 rounded-full max-w-[200px] bg-grey-150 z-10 border border-grey-700"
    >
      <p class="text-12 font-semibold">
        {{ getTime }}
      </p>
    </div>
  </div>

  <div class="bg-grey-150 w-full h-1 -mt-13 mb-10" />
</template>

<script lang="ts" setup>
import { parseDate, daySuffix } from '@/plugins/filters'

const props = withDefaults(defineProps<{
  date: string | Date
  topPosition?: string
  showDateBar: boolean
}>(), {
  topPosition: 'top-30'
})

const getTime = computed(() => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const createdAtItem = new Date(props.date)

  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const yesterdayDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())
  const createdAtDate = new Date(createdAtItem.getFullYear(), createdAtItem.getMonth(), createdAtItem.getDate())

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = days[createdAtItem.getDay()]

  if (createdAtDate.getTime() === currentDate.getTime()) {
    return 'Today'
  }

  if (createdAtDate.getTime() === yesterdayDate.getTime()) {
    return 'Yesterday'
  }

  if (createdAtItem.getFullYear() === today.getFullYear()) {
    return `${dayName}, ${parseDate(createdAtItem, 'MMM')} ${daySuffix(createdAtItem.getDate())}`
  } else {
    return parseDate(createdAtItem, 'MMM D, YYYY')
  }
})
</script>
