<template>
  <div class="flex justify-between items-center">
    <p class="flex items-center text-13">
      <i class="icon-check-in-square text-17 mr-7" />
      Show completed
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
          class="flex justify-between group space-x-7 p-8 border border-grey-850 rounded-7 hover:bg-menu-hover !opacity-100"
        >
          <p class="text-13">{{ btnText }}</p>
          <div class="flex items-center h-16">
            <i
              v-if="modelValue.filters.showCompletedFilter.label !== 'None'"
              class="icon-close-smooth hidden cursor-pointer group-hover:block cross-class"
              @click.stop="toggleShowCompletedFilter({
                label: 'None',
                val: 3
              })"
            />
            <i class="icon-keyboard-arrow-down arrow-class" :class="{ 'expanded': isOpen }" />
          </div>
        </ButtonModule>
      </template>

      <div class="select-none py-10">
        <div
          v-for="option in options"
          :key="option.label"
          class="text-app-color text-13 py-5 px-16 hover:bg-menu-hover cursor-pointer"
          :class="isSelected(option.label)"
          @click="toggleShowCompletedFilter(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    filters: IFilters
    doRequest: boolean
  }
  btnWidth?: string
}>()

const emit = defineEmits(['toggle', 'update:modelValue'])

const options = ref([
  {
    label: 'All',
    val: 0
  },
  {
    label: 'From today',
    val: 1
  },
  {
    label: 'From last 7 days',
    val: 2
  },
  {
    label: 'None',
    val: 3
  }])

const btnText = computed(() => {
  return props.modelValue.filters.showCompletedFilter?.label ? props.modelValue.filters.showCompletedFilter?.label : 'None'
})
function toggleShowCompletedFilter (value: IShowCompletedFilter) {
  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      showCompletedFilter: value
    },
    doRequest: true
  })
  emit('toggle', value)
}

function isSelected (option: string) {
  return option === props.modelValue.filters.showCompletedFilter.label ? 'bg-grey-50' : ''
}
</script>
