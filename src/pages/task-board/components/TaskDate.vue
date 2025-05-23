<template>
  <div v-clickOutside="close" class="no-drag md:relative" :class="[{'pointer-events-none': disabled}, textColor]">
    <div ref="buttonRef" class="flex items-center" @click="toggleShow">
      <slot>
        <div
          v-if="(taskDates?.groupDates && (isCreateNewTask || isTaskList || isSubTask || !isTaskBoardModal) && currentDate)"
          class="flex items-center flex-shrink-0"
          :class="labelClasses"
        >
          <p class="text-grey-1000 font-medium" :class="{ 'text-12': isTaskList }">{{ hasTaskRrule ? preparedDate : taskDates?.dates }}</p>
          <i v-if="hasTaskRrule" class="icon-recurring ml-3 text-grey-1000" />
          <i
            v-if="!disabled && currentDate && isSubTask"
            :class="{ 'md:group-hover:block': !disabled }"
            class="icon-close-smooth text-16 md:hidden ml-10"
            @click.stop="dayclick(null)"
          />
        </div>

        <div v-if="(isTaskList || isCreateNewTask || (isSubTask && isTaskBoardModal)) && !currentDate" class="flex">
          <ButtonModule
            :prefix="`icon-add-date p-3 text-grey-11 hover:text-grey-950
             md:hover:bg-menu-hover md:hover:opacity-100 rounded-8 cursor-pointer ${iconSize}`"
            tooltipText="Due date"
            tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
            teleportTooltip
            tooltipBottom
          />
        </div>

        <div v-if="isTaskBoardModal && !isSubTask" class="flex group">
          <ButtonModule
            :prefix="`icon-add-date mr-8 ${iconSize}`"
            :classes="`${classes} ${!isAddTaskWindow ? 'text-[12.5px]' : ''}`"
            :class="[
              currentDate && !isAddTaskWindow ? 'attribute hover:bg-primary bg-primary text-dark-200' : 'attribute attribute-empty'
            ]"
          >
            {{ preparedDate }}
            <i
              v-if="!disabled && currentDate"
              :class="{ 'md:group-hover:block': !disabled }"
              class="icon-close-smooth text-16 md:hidden ml-10"
              @click.stop="dayclick(null)"
            />
          </ButtonModule>
        </div>

        <div
          v-if="currentDate && !taskDates?.groupDates && !isTaskBoardModal"
          class="group flex items-center flex-shrink-0 anim-color text-11 leading-tight cursor-pointer rounded-16"
          :class="[btnClasses]"
        >
          <p
            class="font-medium"
            :class="{
              'text-error': isPastDate && !isCompleted,
              'opacity-40': isCompleted && isPastDate,
              'text-grey-1000': !isPastDate || (!isCompleted && !isPastDate)
            }"
          >
            {{ taskRrule ? preparedDate : prepareDate(currentDate) }}
          </p>

          <i
            v-if="!disabled && !hideDeleteButton"
            :class="{ 'md:group-hover:block': !disabled }"
            class="icon-close-smooth text-16 md:hidden ml-10"
            @click.stop="dayclick(null)"
          />
        </div>

        <ButtonModule
          v-if="hasTaskRrule && isTaskBoardModal"
          prefix="icon-recurring ml-3 text-grey-1000"
          tooltipText="Recurring"
          teleportTooltip
          tooltipTop
        />
        <div
          v-else-if="!currentDate && !taskDates?.groupDates && !isTaskList && !disabled && !isSubTask && !isTaskBoardModal && !isTaskCard"
          class="flex items-center justify-center px-12 py-6 h-30 text-12 rounded-[16px] border
         hover:border-brand hover:shadow-brand-05 anim-color text-app-color leading-tight cursor-pointer"
          :class="show ? 'border-transparent shadow-grey-700-05 bg-grey-200' : 'border-grey-1400 shadow-grey-1400-05'"
        >
          {{ title }}
        </div>
      </slot>
    </div>

    <component
      :is="isTeleported ? AppTeleport : 'div'"
      v-if="show"
      :positionDirection="positionDirection ? positionDirection : (isTaskCard || isCreateNewTask) ? 'left' : 'right'"
      :contentHeight="300"
      :referenceRef="buttonRef"
    >
      <div
        class="due-date pb-10 absolute z-100 md:w-auto rounded-10 shadow-dropdown px-5 flex flex-col bg-primary"
        :class="[position, isTaskCard ? 'w-auto' : 'w-[95%]']"
      >
        <VDatePicker
          ref="vDatePickerRef"
          v-model="dateRange"
          :trim-weeks="true"
          :select-attribute="rangeAttributes"
          :drag-attribute="rangeAttributes"
          :first-day-of-week="firstDayOfWeek"
          :attributes="calendarAttrs"
          :initialPage="initialPage"
          :popover="false"
          :isDark="{ selector: ':root', darkClass: 'dark' }"
          :masks="{ input: 'MMM DD, YYYY' }"
          class="md:min-w-[276px] min-w-[95%]"
          locale="en-US"
          :isRange="isStartDateEnabled"
          @dayclick="onDayClick"
          @drag="onDrag"
          @popoverWillHide="onHide"
          @popoverWillShow="willShow"
        >
          <template #default="{ inputValue, inputEvents }">
            <div v-if="showInputs && show" :class="{'flex justify-between text-13 space-x-7 mt-10 px-5 mb-1': !hasTaskRrule }">
              <input
                v-if="!hasTaskRrule && isStartDateEnabled"
                ref="startDateRef"
                :inputmode="isLargeScreen ? 'text' : 'none'"
                class="rounded-8 bg-menu-hover p-5 max-w-[130px] outline-none shadow-none border-2"
                placeholder="Start date"
                type="text"
                :value="inputValue.start === 'Jan 01, 1970' ? todayDate : inputValue.start"
                :class="isFocusedStartDate ? 'shadow-grey-event' : 'border-transparent shadow-none'"
                v-on="inputEvents.start"
                @focus="isFocusedStartDate = true"
                @blur="isFocusedStartDate = false"
              >

              <input
                v-if="!hasTaskRrule && isStartDateEnabled"
                :inputmode="isLargeScreen ? 'text' : 'none'"
                class="rounded-8 bg-menu-hover p-5 outline-none shadow-none border-2"
                placeholder="Due date"
                type="text"
                :value="(inputValue.end === 'Jan 01, 1970' ? todayDate : inputValue.end)"
                :class="[
                  isFocusedEndDate ? 'shadow-grey-event' : 'border-transparent shadow-none',
                  isStartDateEnabled ? 'max-w-[130px]' : 'w-full'
                ]"
                v-on="inputEvents.end"
                @focus="isFocusedEndDate = true"
                @blur="isFocusedEndDate = false"
              >
            </div>
          </template>

          <template #footer>
            <div
              class="flex w-full items-center space-x-5 px-16"
              :class="showRecurringDropdown || hasTaskRrule ? 'flex-col' : ''"
            >
              <div
                v-if="(isStartEqualEnd || dateRange.end === null) && !isSubTask"
                class="flex items-center w-full md:justify-center gap-8 border-b"
                :class="{'border-t py-10 border-grey-500 mb-5': showRecurringDropdown || hasTaskRrule}"
              >
                <template v-if="showRecurringDropdown || hasTaskRrule">
                  <p class="text-14">Frequency:</p>

                  <TaskDateRecurring
                    class="m-5"
                    :modelValue="taskRrule"
                    :isBiWeekly="checkBiWeekly(taskDates?.rrule)"
                    @update:modelValue="toggleRecurring"
                  />
                </template>

                <ButtonModule
                  v-if="hasTaskRrule"
                  prefix="icon-delete text-16"
                  tooltipText="Remove recurring"
                  teleportTooltip
                  tooltipTop
                  class="md:px-5 px-9 md:h-27 h-34 transition duration-50 rounded-4 hover:bg-menu-hover ml-auto"
                  :class="[
                    showRecurringDropdown || hasTaskRrule
                      ? 'text-brand-blue'
                      : 'text-app-color']"
                  @click="toggleRecurring(null, null)"
                />

                <ButtonModule
                  v-else
                  prefix="icon-recurring text-15"
                  :tooltipText="hasTaskRrule ? '' : 'Add recurring'"
                  teleportTooltip
                  tooltipTop
                  class="md:px-5 px-9 md:h-27 h-34 transition duration-50 rounded-4 hover:bg-menu-hover ml-auto"
                  :class="[
                    showRecurringDropdown || hasTaskRrule
                      ? 'text-brand-blue'
                      : 'text-app-color']"
                  @click="toggleRecurringDropdown"
                />
              </div>

              <div
                class="flex gap-[6px]"
                :class="(isStartEqualEnd || dateRange.end === null) && !isSubTask ? '' : 'ml-9'"
              >
                <ButtonModule
                  v-for="dateButton in specificButtons"
                  :key="dateButton"
                  :text="dateButton"
                  :class="(isStartEqualEnd || dateRange.end === null) && !isSubTask ? '' : 'py-6'"
                  class="text-13 md:px-7 px-10 rounded-4
                  md:hover:bg-menu-hover/[0.06] bg-menu-hover/[0.03] capitalize md:h-27 h-34"
                  @click="specificButtonClick(dateButton)"
                />

                <ButtonModule
                  :text="isStartDateEnabled ? 'No start date' : 'Add start date'"
                  class="text-13 md:px-6 px-10 rounded-4 md:hover:bg-menu-hover/[0.06] bg-menu-hover/[0.03] md:h-27 h-34"
                  @click="toggleStartDate"
                />
              </div>
            </div>
          </template>
        </VDatePicker>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { formatDate, prepareDate } from '@/core/helper-functions'
import { parseDate } from '@/plugins/filters'
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { calendarAttrsForTaskRule } from '@/pages/task-board/tasks-utils'
import dayjs from 'dayjs'
import AppTeleport from '@/components/shared/AppTeleport.vue'
type TSpecificButton = 'today' | 'tomorrow'

const props = withDefaults(defineProps<{
  isCompleted?: boolean
  currentDate: Date | string | null
  disabled?: boolean
  hideEvent?: boolean
  isStartDate?: boolean
  hideDeleteButton?: boolean
  title?: string
  position?: string
  taskDates?: any
  isTaskList?: boolean
  isSubTask?: boolean
  isCreateNewTask?: boolean
  btnClasses?: string
  isTaskBoardModal?: boolean
  iconSize?: string
  borderRadius?: string
  paddings?: string
  textColor?: string
  opacity?: string
  fontSize?: string
  isAddTaskWindow?: boolean
  isTaskCard?: boolean
  isNewTaskModal?: boolean
  labelClasses?: string
  isTeleported?: boolean
  positionDirection?: string
}>(), {
  isCompleted: false,
  iconSize: 'text-20',
  hasEvent: false,
  disabled: false,
  hideEvent: false,
  isStartDate: false,
  hideDeleteButton: false,
  title: 'Due date',
  position: 'left-0',
  isTaskList: false,
  isSubTask: false,
  isCreateNewTask: false,
  btnClasses: 'py-6 h-30',
  isTaskBoardModal: false,
  borderRadius: 'rounded-4',
  paddings: 'px-5 py-3',
  textColor: 'text-app-color',
  opacity: 'opacity-30',
  fontSize: 'text-15',
  labelClasses: 'border border-grey-1400 shadow-grey-1400-05 md:hover:border-black md:hover:shadow-black-05 anim-color px-8 py-3 text-11 rounded-[16px] leading-tight cursor-pointer'
})

const { isMobile } = useGeneral()

const vDatePickerRef = ref()
const startDateRef = ref()
const buttonRef = ref()
const initialDate = ref(null)

const isFocusedStartDate = ref(false)
const isFocusedEndDate = ref(false)
const showRecurringDropdown = ref(false)
const { calendarFirstDay } = useSettings()
const { isLargeScreen } = useGeneral()
const dragStart = ref(false)
const isStartDateEnabled = ref(false)

const specificButtons = ['today', 'tomorrow'] as TSpecificButton[]

const emit = defineEmits(['toggleBothDates', 'toggleShow'])

const show = ref(false)

const taskRrule = ref(null as number | null)

const firstDayOfWeek = computed(() => calendarFirstDay.value ? 1 : 2)

const preparedDate = computed(() => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const isEndNull = props.taskDates?.end === null
  const dateToUse = hasTaskRrule.value
    ? rrulestr(props.taskDates.rrule).after(now, true)
    : dateRange.value.start

  return isEndNull ? props.title : prepareDate(dateToUse, hasTaskRrule.value ? dateToUse : dateRange.value.end)
})

const classes = computed(() => {
  const bgStyles = props.isAddTaskWindow

  return `${bgStyles} ${props.paddings} ${props.borderRadius} ${props.fontSize}`
})

const hasTaskRrule = computed(() => taskRrule.value !== null)

const checkBiWeekly = (rruleString) => {
  if (!rruleString) return false
  const isBiWeekly = rruleString.includes('FREQ=WEEKLY') && rruleString.includes('INTERVAL=2')
  return isBiWeekly
}

watch(() => props.taskDates, (value) => {
  if (value?.rrule === null) {
    taskRrule.value = null
  }
  if (value?.rrule) {
    const a = rrulestr(value?.rrule, { forceset: true }) as RRuleSet
    const b = a.rrules()[0].options.freq
    taskRrule.value = value?.rrule ? b : null
  }
}, { deep: true, immediate: true })

const isStartEqualEnd = computed(() => dayjs(dateRange.value.start).isSame(dateRange.value.end, 'day'))

const rruleLimits = computed(() => {
  if (!dateRange.value.start && !dateRange.value.end) return {}

  const startYear = new Date(dateRange.value.start).getFullYear()
  const startMonth = new Date(dateRange.value.start).getMonth()
  const startDay = new Date(dateRange.value.start).getDate()

  return {
    3: new Date(startYear, startMonth + 3, startDay),
    2: new Date(startYear + 1, startMonth, startDay),
    1: new Date(startYear + 1, startMonth, startDay),
    0: new Date(startYear + 10, startMonth, startDay)
  }
})

const calendarAttrs = computed(() => {
  if (hasTaskRrule.value) {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const rrule = rrulestr(props.taskDates.rrule)

    const recurringDates = rrule.between(now, rruleLimits.value[taskRrule.value])
    const pastDates = rrule.between(new Date(dateRange.value.start), now)
    const exdates = (rrulestr(props.taskDates.rrule, { forceset: true }) as RRuleSet).exdates()

    return calendarAttrsForTaskRule(recurringDates, pastDates, exdates)
  } else {
    const todayStylesValue = todayStyles.value
    const endDate = dateRange.value.end

    return [
      {
        key: 'today',
        highlight: {
          class: 'bg-grey-150 rounded-6 dark:bg-primary',
          contentClass: `${todayStylesValue} anim-color !font-semibold`,
          contentStyle: { fontWeight: '700 !important' }
        },
        dates: new Date()
      },
      isStartDateEnabled.value
        ? {}
        : {
          key: 'dates',
          highlight: {
            contentClass: 'hover:!bg-black',
            class: 'hover:!bg-black',
            start: {
              contentClass: 'text-white !bg-black',
              class: 'bg-black !rounded-6 anim-color'
            },
            base: {
              style: { backgroundColor: '#000000', opacity: '0.09' },
              contentClass: '!text-dark-100'
            },
            end: {
              contentClass: 'text-white !bg-black',
              class: 'bg-black !rounded-6 anim-color'
            }
          },
          dates: endDate ? new Date(dayjs(endDate).startOf('day') as any) : null
        }
    ]
  }
})

const initialPage = computed(() => ({
  month: new Date(props.taskDates?.start || new Date()).getUTCMonth() + 1,
  year: new Date(props.taskDates?.start || new Date()).getFullYear()
}))

const todayDate = computed(() => parseDate(new Date(), 'MMM D, YYYY'))

const dateRange = computed({
  get: () => {
    return {
      start: props.taskDates?.start || props.taskDates?.end,
      end: props.taskDates?.end
    }
  },
  set: value => {
    const start = isStartDateEnabled.value ? formatDate(value.start) : formatDate(value)
    const end = isStartDateEnabled.value ? formatDate(value.end) : formatDate(value)

    if (taskRrule.value) {
      const rruleSet = new RRuleSet()

      // TODO: fix ts (remove any)
      rruleSet.rrule(new RRule({ freq: taskRrule.value, dtstart: value as any }))

      if (value) {
        emit('toggleBothDates', {
          start: formatDate(value),
          end: formatDate(value),
          rrule: rruleSet.toString()
        })
      }
    } else {
      if (value) {
        const preventUpdate = formatDate(new Date(-1)) === end

        if (!preventUpdate) {
          emit('toggleBothDates', { start, end, rrule: null })
        }
      }
    }

    if (!showRecurringDropdown.value) {
      toggleShow()
    }
    dragStart.value = false
  }
})

const rangeAttributes = computed(() => {
  let pastDates = []

  if (hasTaskRrule.value) {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const rrule = rrulestr(props.taskDates.rrule)

    pastDates = rrule.between(new Date(dateRange.value.start), now)
  }

  return hasTaskRrule.value && !dragStart.value
    ? {
      highlight: {
        contentClass: 'hover:!bg-black',
        class: 'hover:!bg-black',
        start: {
          contentClass: 'text-white',
          class: 'bg-black !rounded-6 anim-color'
        }
      },
      popover: pastDates.length ? { label: 'Past date' } : false
    }
    : {
      highlight: {
        contentClass: 'hover:!bg-black',
        class: 'hover:!bg-black',
        start: {
          contentClass: 'text-white !bg-black',
          class: 'bg-black !rounded-6 anim-color'
        },
        base: {
          style: { backgroundColor: '#000000', opacity: '0.09' },
          contentClass: '!text-dark-100'
        },
        end: {
          contentClass: 'text-white !bg-black',
          class: 'bg-black !rounded-6 anim-color'
        }
      }
    }
})

const isPastDate = computed(() => {
  const today = new Date()
  const curDate = new Date(props.currentDate)

  return curDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)
})

const today = new Date().toDateString()
const todayStyles = ref('')

const showInputs = ref(true)

watch(() => dateRange.value, (value) => {
  todayStyles.value = !isTodayInRange(new Date(value.start), new Date(value.end))
    ? formatDate(value.start) === formatDate(today) || formatDate(value.end) === formatDate(today)
      ? 'text-white bg-black'
      : 'text-app-color bg-red-seashell !hover:bg-menu-hover !rounded-5'
    : 'text-app-color'
}, { immediate: true })

function onHide () {
  if (!isStartEqualEnd.value) {
    isStartDateEnabled.value = false
  }
  showRecurringDropdown.value = false
  showInputs.value = false
}

function toggleStartDate () {
  isStartDateEnabled.value = !isStartDateEnabled.value

  if (!isStartDateEnabled.value && !isStartEqualEnd.value && dateRange.value.end) {
    emit('toggleBothDates', {
      start: dateRange.value.end,
      end: dateRange.value.end,
      rrule: null
    })
  }

  isFocusedStartDate.value = true
  isFocusedEndDate.value = false
}

function willShow () {
  showInputs.value = true
  isFocusedEndDate.value = !isStartDateEnabled.value
  isStartDateEnabled.value = !!dateRange.value.end && !isStartEqualEnd.value
}

function onDrag (date) {
  dragStart.value = true
  isFocusedStartDate.value = formatDate(new Date(initialDate.value)) > formatDate(new Date(date.start))
  isFocusedEndDate.value = new Date(initialDate.value) < new Date(date.end)

  if (new Date(date.start).getTime() === new Date(date.end).getTime()) {
    isFocusedStartDate.value = false
    isFocusedEndDate.value = true
  }
}

function onDayClick (e) {
  isFocusedStartDate.value = false
  isFocusedEndDate.value = true

  initialDate.value = e.id

  todayStyles.value = formatDate(new Date(initialDate.value)) === formatDate(today) ? 'text-white' : 'text-app-color'
}

function specificButtonClick (type: 'today' | 'tomorrow') {
  const tomorrow = formatDate(dayjs().add(1, 'day'))

  initialDate.value = type === 'today' ? formatDate(new Date()) : tomorrow

  emit('toggleBothDates', {
    start: initialDate.value,
    end: initialDate.value,
    rrule: null
  })

  isFocusedStartDate.value = true
  isFocusedEndDate.value = true

  todayStyles.value = type === 'today' ? 'text-white' : 'text-app-color'

  toggleShow()
}

function toggleShow () {
  if (props.disabled) return
  show.value = !show.value
  willShow()
  emit('toggleShow', show.value)

  if (show.value) {
    nextTick(() => {
      isFocusedStartDate.value = false
      isFocusedEndDate.value = false
      vDatePickerRef.value.togglePopover()

      if (!isMobile.value) {
        focus()
      }
    })
  }
}

function close () {
  show.value = false
  showRecurringDropdown.value = false
  emit('toggleShow', show.value)
}

function dayclick (value) {
  emit('toggleBothDates', {
    start: null,
    end: value?.id || null,
    rrule: null
  })

  if (!value) {
    todayStyles.value = 'text-app-color'
  }
  // setTimeout(() => close(), 100)
}

function toggleRecurringDropdown () {
  if (!taskRrule.value) {
    showRecurringDropdown.value = !showRecurringDropdown?.value
  }
}

function isTodayInRange (startDate: Date, endDate: Date): boolean {
  const today = new Date().setHours(0, 0, 0, 0)
  const start = startDate.setHours(0, 0, 0, 0)
  const end = endDate.setHours(0, 0, 0, 0)

  return today > start && today < end
}

function toggleRecurring (value, text = null) {
  if (!value && value !== 0 && isStartEqualEnd.value) {
    emit('toggleBothDates', {
      start: formatDate(dateRange.value.start),
      end: formatDate(dateRange.value.end),
      rrule: value
    })

    return
  }
  const rruleSet = new RRuleSet()

  const hasDate = !!dateRange.value.end
  const interval = text === 'Bi-Weekly' ? 2 : undefined
  rruleSet.rrule(new RRule({ freq: value, interval, dtstart: hasDate ? new Date(dateRange.value.end) : new Date() }))

  emit('toggleBothDates', {
    start: formatDate(hasDate ? dateRange.value.start : new Date()),
    end: formatDate(hasDate ? dateRange.value.end : new Date()),
    rrule: rruleSet.toString()
  })
}

function focus () {
  startDateRef.value?.focus()
}

defineExpose({
  show
})
</script>
