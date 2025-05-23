<template>
  <div class="flex justify-between items-center text-13">
    <div v-clickOutside="close" class="relative">
      <div
        class="flex items-center cursor-pointer"
        @click="toggleDropdown"
      >
        <ButtonModule
          class="px-12 py-9 opacity-100 ease-in-out transition-transform rounded-4 select-none flex justify-between group"
          :class="[classes, btnWidth]"
          borderWidth="border"
        >
          <div v-if="selectedRecurring !== null" class="flex mr-10">
            <p>{{ computedTitle }}</p>
          </div>

          <div v-else class="flex mr-10">
            <p>Select recurring</p>
          </div>

          <div class="flex items-center">
            <i class="icon-keyboard-arrow-down ml-auto text-12 text-dark-300" :class="{ 'expanded': show }" />
          </div>
        </ButtonModule>
      </div>

      <InfoDropdown
        v-if="show"
        classes="right-0 top-30 w-[130px] rounded-10 !py-0"
      >
        <div class="p-7">
          <div
            v-for="(recurring) in recurringData" v-show="recurring.type === null ? selectedRecurring : true"
            :key="recurring.type"
            class="flex items-center cursor-pointer rounded-6 tracking-small px-17 py-8 hover:bg-menu-hover"
            @click="select(recurring.type, isSelected(recurring), recurring.text)"
          >
            <p class="w-full text-14">{{ recurring.text }}</p>
          </div>
        </div>
      </InfoDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { recurringData } from '@/pages/task-board/tasks-utils'

const props = defineProps<{
  modelValue: number | null
  btnWidth?: string
  isBiWeekly?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const biWeekly = ref(false)

interface ILocalRecurring{
  type: number
  text: string
  icon?: string
}

const selectedRecurring = ref(recurringData.find(e => e.type === props.modelValue)?.type || null)

watch(() => props.modelValue, (value) => {
  selectedRecurring.value = value
})

const computedTitle = computed(() => {
  if (biWeekly.value || props.isBiWeekly) {
    return 'Bi-Weekly'
  }
  const selected = recurringData.find(e => e.type === selectedRecurring.value)?.text
  return selected
})

const show = ref(false)

const isSelected = computed(() => (recurring: ILocalRecurring) => selectedRecurring.value === recurring.type)

const classes = computed(() => {
  const prefix = show.value ? '' : 'hover:'
  return `${prefix}bg-menu-hover text-app-color border-grey-850 rounded-6 anim-color-200 md:border`
})

function toggleDropdown () {
  show.value = !show.value
}

function close () {
  show.value = false
}
function select (recurring: number | null, selected?: boolean, text?: string) {
  biWeekly.value = text === 'Bi-Weekly'

  if (recurring && !selected) {
    selectedRecurring.value = recurring
  }
  close()
  emit('update:modelValue', recurring, text)
}
</script>
