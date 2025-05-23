<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <p class="flex items-center text-13">
        <i class="icon-double-arrow text-19 mr-6 -ml-1" />
        Sort by
      </p>

      <DropdownModule
        class="text-app-color h-full flex items-center"
        :width="170"
        zIndex="z-9999"
        background="bg-primary dark:bg-grey-110"
        :isTeleported="false"
      >
        <template #button="{isOpen}">
          <div class="flex items-center space-x-5" :class="btnWidth">
            <ButtonModule
              :has-hover="true"
              borderWidth="1"
              class="flex grow justify-between space-x-7 px-8 py-8 border border-grey-850 rounded-7 hover:bg-menu-hover !opacity-100"
            >
              <p class="text-13 truncate max-w-[68px]">{{ modelValue.filters.sortedBy }}</p>
              <i class="icon-keyboard-arrow-down arrow-class" :class="{ 'expanded': isOpen }" />
            </ButtonModule>

            <ButtonModule
              v-if="modelValue.filters.sortedBy !== 'Manual'"
              :has-hover="true"
              :tooltipText="sortedDirection === 'ASC' ? 'Sort descending' : 'Sort ascending'"
              tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
              teleportTooltip
              tooltipBottom
              borderWidth="1"
              class="p-8 border border-grey-850 rounded-7 hover:bg-menu-hover !opacity-100"
              @click.stop="changeDirection"
            >
              <i class="icon-sorting-desc" :class="{ 'rotate-180': sortedDirection === 'DESC' }" />
            </ButtonModule>
          </div>
        </template>

        <div class="py-10">
          <div
            v-for="option in options"
            :key="option"
            class="text-app-color py-5 text-13 px-16 hover:bg-menu-hover cursor-pointer"
            :class="[isSelected(option)]"
            @click="selectOption(option)"
          >
            {{ option }}
          </div>
        </div>
      </DropdownModule>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sortByMap, sortByMapForToday } from '@/pages/task-board/tasks-utils'

const props = defineProps<{
  modelValue: {
    filters: IFilters
    doRequest: boolean
  }
  isToday: boolean
  btnWidth?: string
}>()

const emit = defineEmits(['update:modelValue'])

const options = ref(props.isToday ? sortByMapForToday : sortByMap)
const sortedDirection = ref(props.modelValue.filters.sortedDirection || 'ASC')

function selectOption (option: string) {
  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      sortedBy: option
    },
    doRequest: true
  })
}

function changeDirection () {
  sortedDirection.value = sortedDirection.value === 'DESC' ? 'ASC' : 'DESC'

  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      sortedDirection: sortedDirection.value
    },
    doRequest: true
  })
}

function isSelected (option: string) {
  return option === props.modelValue.filters.sortedBy ? 'bg-grey-50' : ''
}
</script>
