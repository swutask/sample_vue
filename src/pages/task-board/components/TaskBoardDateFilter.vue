<template>
  <div class="flex justify-between items-center">
    <p class="text-13">Due Date</p>

    <div v-clickOutside="close" class="relative" :class="btnWidth">
      <div
        class="flex items-center text-13 cursor-pointer"
        :class="btnWidth"
        @click="showDropdown"
      >
        <ButtonModule
          class="flex justify-between p-8 opacity-100 ease-in-out transition-transform rounded-4 group"
          :class="[classes, btnWidth]"
          borderWidth="border"
        >
          <div class="flex items-start max-w-[70%]" :class="[props.modelValue.filters.dateFilter?.length > 1 ? 'group-hover:max-w-[51%]' : '']">
            <p class="truncate text-13" :class="buttonText !== 'Add filter' ? 'text-dark-default' : 'text-grey-250'">{{ buttonText }}</p>
          </div>

          <div class="flex items-center">
            <p class="px-2 mr-4 text-12">{{ buttonCounter }}</p>

            <i
              v-if="modelValue.filters.dateFilter.length"
              class="icon-close-smooth hidden cursor-pointer group-hover:block cross-class"
              @click.stop="toggle(null)"
            />

            <i class="icon-keyboard-arrow-down arrow-class" :class="{ 'expanded': show }" />
          </div>
        </ButtonModule>
      </div>

      <InfoDropdown
        v-if="show"
        classes="right-0 top-30 w-[170px] rounded-10 z-100 pb-1 !py-10"
      >
        <div
          v-for="(value, key) in getDueDateOptions()"
          :key="key"
          class="flex items-center cursor-pointer tracking-small px-11 py-5 hover:bg-menu-hover"
          :class="[{ 'bg-grey-200': isSelected(key) }]"
        >
          <CheckboxModule
            :model-value="isSelected(key)"
            class="text-14 mr-5"
            :label="key"
            @update:modelValue="toggle(key, value, isSelected(key))"
          />
        </div>
      </InfoDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDueDateOptions } from '@/core/helper-functions'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
  modelValue: {
    filters: IFilters
    doRequest: boolean
  }
  btnWidth?: string
}>()

const emits = defineEmits(['showDropdown', 'toggle', 'update:modelValue'])

const show = ref(false)

const buttonText = computed(() => props.modelValue.filters.dateFilter?.length
  ? props.modelValue.filters.dateFilter[0]?.text
  : 'Add filter')
const buttonCounter = computed(() => props.modelValue.filters.dateFilter?.length > 1
  ? `+${props.modelValue.filters.dateFilter.length - 1}`
  : '')
const classes = computed(() => {
  const prefix = show.value ? '' : 'hover:'
  return `${prefix}bg-menu-hover text-app-color border-grey-850 rounded-6 anim-color-200 md:border`
})

function isSelected (range: string) {
  return props.modelValue.filters.dateFilter?.some(item => item.text === range)
}

function showDropdown () {
  show.value = !show.value
}

function close () {
  show.value = false
}

function toggle (key: string, value?: any, selected?: boolean) {
  let selectedDate = cloneDeep(props.modelValue.filters.dateFilter)

  if (key) {
    if (selected) {
      selectedDate = selectedDate?.filter(item => item.text !== key)
    } else {
      selectedDate.push({ option: value, text: key })
    }
  } else {
    selectedDate = []
  }
  emits('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      dateFilter: selectedDate
    },
    doRequest: true
  })
}
</script>
