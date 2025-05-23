<template>
  <div class="flex justify-between items-center">
    <p class="text-13">Priority</p>

    <div v-clickOutside="close" class="relative">
      <div
        class="flex items-center text-14 cursor-pointer"
        @click="showDropdown"
      >
        <ButtonModule
          class="p-8 opacity-100 ease-in-out transition-transform rounded-4 flex justify-between group"
          :class="[classes, btnWidth]"
          borderWidth="border"
        >
          <div v-if="modelValue.filters.urgencyFilter?.length" class="flex">
            <UrgencyIcon v-for="icon in modelValue.filters.urgencyFilter" :key="icon.type" :type="icon.type" class="w-14 h-16 mx-2" />
          </div>

          <div v-else class="flex items-center text-13 text-grey-250">
            Add filter
          </div>

          <div class="flex items-center">
            <i
              v-if="modelValue.filters.urgencyFilter.length"
              class="icon-close-smooth hidden cursor-pointer group-hover:block cross-class"
              @click.stop="toggle(null)"
            />

            <i class="icon-keyboard-arrow-down ml-auto arrow-class" :class="{ 'expanded': show }" />
          </div>
        </ButtonModule>
      </div>

      <InfoDropdown
        v-if="show"
        classes="right-0 top-30 w-[170px] rounded-10 !py-10"
      >
        <div
          v-for="urgency in urgencyData" :key="urgency.type"
          class="flex items-center cursor-pointer tracking-small px-17 py-5 hover:bg-menu-hover"
          :class="[{ 'bg-grey-200': isSelected(urgency)}]"
        >
          <UrgencyIcon
            :key="urgency.type"
            :text="urgency.text"
            :type="urgency.type"
            fontSize="text-13"
            class="w-full"
            @click="toggle(urgency, isSelected(urgency))"
          />
        </div>
      </InfoDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
  modelValue: {
    filters: IFilters
    doRequest: boolean
  }
  btnWidth?: string
}>()
interface ILocalUrgency {
  type: number
  text: string
}

const emit = defineEmits(['showDropdown', 'toggle', 'update:modelValue'])

const urgencyData = [
  { type: 1, text: 'Low priority' },
  { type: 2, text: 'Medium priority' },
  { type: 3, text: 'High priority' },
  { type: 4, text: 'Urgent' }
]
const show = ref(false)

const isSelected = computed(() => (urgency: ILocalUrgency) => props.modelValue.filters.urgencyFilter?.some(item => item.type === urgency.type))

const classes = computed(() => {
  const prefix = show.value ? '' : 'hover:'
  return `${prefix}bg-menu-hover text-app-color border-grey-850 rounded-6 anim-color-200 md:border`
})

function showDropdown () {
  show.value = !show.value
}

function close () {
  show.value = false
}

function toggle (urgency: ILocalUrgency | null, selected?: boolean) {
  let selectedUrgency = cloneDeep(props.modelValue.filters.urgencyFilter)
  if (urgency) {
    if (selected) {
      selectedUrgency = selectedUrgency.filter(item => item.type !== urgency.type)
    } else {
      selectedUrgency = [...selectedUrgency, urgency]
    }
  } else {
    selectedUrgency = []
  }
  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      urgencyFilter: selectedUrgency
    },
    doRequest: true
  })
}
</script>
