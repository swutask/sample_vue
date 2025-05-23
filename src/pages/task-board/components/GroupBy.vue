<template>
  <div class="flex justify-between items-center mt-6 md:mt-0">
    <p class="flex items-center text-13">
      <i class="icon-group text-17 mr-7" />
      Group by
    </p>

    <DropdownModule
      class="text-app-color h-full flex items-center"
      :width="170"
      zIndex="z-9999"
      background="bg-primary dark:bg-grey-110"
      :isTeleported="false"
    >
      <template #button="{isOpen}">
        <ButtonModule
          :has-hover="true"
          borderWidth="1"
          :class="btnWidth"
          class="flex justify-between space-x-7 p-8 border border-grey-850 rounded-7 hover:bg-menu-hover !opacity-100"
        >
          <p class="text-13">{{ groupedBy }}</p>
          <i class="icon-keyboard-arrow-down arrow-class" :class="{ 'expanded': isOpen }" />
        </ButtonModule>
      </template>

      <div class="py-10">
        <div
          v-for="option in options"
          :key="option.id"
          class="text-app-color py-5 text-13 px-16 hover:bg-menu-hover cursor-pointer"
          :class="[isSelected(option.id)]"
          @click="selectOption(option.id)"
        >
          {{ option.label }}
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
import { groupByData } from '@/pages/task-board/tasks-utils'

const props = defineProps<{
  modelValue: {
    filters: IFilters
    doRequest: boolean
  }
  isToday?: boolean
  btnWidth?: string
}>()

const emit = defineEmits(['update:modelValue'])
const route = useRoute()

const groupedBy = computed(() => {
  return groupByData.find(e => e.id === props.modelValue.filters.groupBy).label
})

const options = computed(() => {
  if (route.params.id) {
    return groupByData.filter(i => i.label !== 'Space')
  }

  return groupByData
})

function selectOption (option: string) {
  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      groupBy: option
    },
    doRequest: false
  })
}

function isSelected (option: string) {
  return option === props.modelValue.filters.groupBy ? 'bg-grey-50' : ''
}
</script>
