<template>
  <DropdownModule
    ref="dropdownRef"
    :width="300"
    class="anim-opacity"
    :dropdownClasses="isMobile ? '!w-full' : ''"
    top-position="30px"
    :isTeleported="false"
    buttonOpacity="50"
    background="bg-primary dark:bg-grey-110"
    positionMenu="right-[110px]"
    preventCloseOnClick
    @close="onClose"
    @input="$emit('toggle', $event)"
  >
    <template #button>
      <ButtonModule class="px-10 rounded-6 md:py-7 py-8 hover:bg-menu-hover w-full">
        <template #wrapper>
          <div class="flex items-center w-full">
            <i class="icon-bell mr-8" />

            <div class="flex justify-between w-full text-13">Custom date & time</div>
          </div>
        </template>
      </ButtonModule>
    </template>

    <div class="flex">
      <VDatePicker
        v-model="date"
        mode="dateTime"
        :selectAttribute="rangeAttributes"
        :attributes="attributes"
        :first-day-of-week="firstDayOfWeek"
        class="md:w-[300px] reset-date-time-picker w-full"
        :minDate="new Date()"
        @update:modelValue="onSelectDate"
      />
    </div>
  </DropdownModule>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(isToday)

const props = defineProps<{
  modelValue?: string
}>()

const emits = defineEmits(['update:modelValue', 'toggle', 'toggleBoth'])
const { isMobile } = useGeneral()
const { calendarFirstDay } = useSettings()

const date = ref(props.modelValue ? new Date(props.modelValue) : new Date())

const dropdownRef = ref()

const firstDayOfWeek = computed(() => calendarFirstDay.value ? 1 : 2)

const rangeAttributes = ref({
  highlight: {
    contentClass: '!text-white hover:!bg-black',
    class: 'bg-black !rounded-6 anim-color',
    contentStyle: { fontWeight: '600 !important' }
  }
})

const attributes = computed(() => ([
  {
    key: 'today',
    highlight: {
      class: 'bg-transparent',
      contentClass: 'text-app-color bg-red-seashell !hover:bg-menu-hover !rounded-5 anim-color !font-semibold',
      contentStyle: { fontWeight: '600 !important' }
    },
    dates: new Date()
  }, {
    key: 'dates',
    highlight: {
      contentClass: '!text-white hover:!bg-black !font-medium',
      class: 'bg-black !rounded-6 anim-color !font-medium'
    },
    dates: new Date(date.value)
  }
]))

function onSelectDate () {
  if (isMobile.value) return

  const selectedDate = dayjs(date.value)

  const newDate = selectedDate.isToday()
    ? selectedDate
    : !props.modelValue ? selectedDate.hour(8).minute(0).second(0) : selectedDate

  emits('update:modelValue', newDate)
}

function onClose () {
  const now = dayjs()
  const selectedDate = dayjs(date.value)

  if (isMobile.value && dropdownRef.value.isDropdownVisible && !now.isSame(selectedDate, 'minute')) {
    const newDate = selectedDate.isToday()
      ? selectedDate
      : !props.modelValue ? selectedDate.hour(8).minute(0).second(0) : selectedDate
    emits('update:modelValue', newDate)
  }

  if (dropdownRef.value.isDropdownVisible) {
    emits('toggleBoth')
  }

  if (!isMobile.value && !dropdownRef.value.isDropdownVisible) {
    emits('toggle', false)
  }
}
</script>

<style lang="scss">
.reset-date-time-picker {
  .vc-time-picker {
    flex-direction: row !important;
    justify-content: space-around !important;
    align-items: center !important;
  }

  .vc-time-select-group {
    margin-top: 0 !important;
  }

  .vc-time-header {
    margin-top: 2px !important;
  }

  .vc-time-month {
    color: #3c42ec;
  }

  .vc-time-day {
    color: #3c42ec;
  }

  .vc-time-select-group .vc-base-icon,
  .vc-time-year,
  .vc-time-weekday {
    color: #0f172a !important;
  }

  .vc-disabled {
    pointer-events: none !important;
    color: rgb(var(--color-grey-d7d7d7)) !important;
    &:hover {
      background: none !important;
    }
  }

  .vc-popover-content-wrapper{
    .vc-popover-caret {
      display: none !important;
    }
  }

  .vc-base-select > select {
    font-size: 14px !important;
  }
}
</style>
