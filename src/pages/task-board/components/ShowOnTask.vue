<template>
  <div class="flex flex-col mt-30">
    <p class="text-15 font-semibold mb-4">Show on task</p>

    <div class="flex flex-wrap items-center max-w-full">
      <div
        v-for="label of route.name === 'Today' ? itemsToShow.slice(0, 4) : itemsToShow"
        :key="label.name"
        class="border-[1.5px] text-11 px-10 py-3 mr-5 mt-10 rounded-5 cursor-pointer select-none"
        :style="{'max-width': `${getMaxWidth(label.key)}px`}"
        :class="[{'bg-grey-200 border-dark-500 text-dark-500 font-medium' : label.selected},
                 {'bg-primary font-base border-grey-950 text-grey-950' : !label.selected}]"
        @click="selectLabel(label)"
      >
        {{ label.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initialFiltersForTasks } from '@/pages/task-board/tasks-utils'

const props = defineProps<{
  modelValue: {
    filters: IFilters
    doRequest: boolean
  }
  isToday: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const route = useRoute()

const itemsToShow = computed(() => (props.modelValue.filters.showOnTask
  .filter((e: IShowOnTaskFilter) => !initialFiltersForTasks.showOnTask.find(b => b.key === e.key)?.isHidden)
))

function getMaxWidth (key: string) {
  return initialFiltersForTasks.showOnTask.find(e => e.key === key).width
}

function selectLabel (label: IShowOnTaskFilter) {
  const selectedLabels = props.modelValue.filters.showOnTask.map((item) => label.key === item.key ? { ...item, selected: !item.selected } : item)

  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      showOnTask: selectedLabels
    },
    doRequest: false
  })
}
</script>
