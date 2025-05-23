<template>
  <div class="flex" :class="[{ 'pointer-events-none': disabled }, textColor]">
    <DropdownModule
      ref="dropdownRef"
      :width="315"
      :isAutoMenuPosition="isAutoMenuPosition"
      background="bg-primary dark:bg-grey-110"
      :zIndex="isCreate ? 'z-[10001]' : 'z-[1000]'"
      :allowFullScreen="isMobile"
      :allowHalfScreen="isMobile"
      :isTeleported="isTeleported"
      :dropdownClasses="dropdownClasses"
      :positionDirection="positionDirection"
      :preventCloseOnClick="isOpenedDateTimePicker && isMobile"
      :disabled="isDisabled"
      :closeOnClick="!isMobile && !isOpenedDateTimePicker ? true : (!isOpenedDateTimePicker && isMobile)"
      class="cursor-default rounded-8 w-full"
      :positionMenu="positionMenu ? 'right' : 'left'"
      top-position="100%"
      @click="onClick"
    >
      <template #button="{ isOpen }">
        <slot name="button" :isOpen="isOpen">
          <ButtonModule
            v-if="!disabled && isModal"
            class="group"
            :prefix="`icon-alarm text-16 mr-8 ${modelValue?.length > 0 && isModal ? 'text-app-color' : 'text-grey-950'}`"
            :classes="`${paddings} ${modelValue?.length ? 'attribute' : 'attribute attribute-empty'}`"
          >
            <div
              class="flex items-center rounded-8 text-[12.5px]"
              :class="fontSize"
            >
              <div class="flex items-center" :class="modelValue?.length > 0 && isModal ? 'text-app-color' : 'text-grey-950'">
                <span>{{ reminderText }}</span>

                <div
                  v-if="isDisabled && !modelValue?.length"
                  class="bg-[#DEFBF4] dark:bg-primary rounded-4 ml-3 mt-1 border border-grey-700
                  text-9 px-4 py-2 font-bold items-center justify-center flex"
                >
                  PRO
                </div>

                <i
                  v-if="modelValue?.length"
                  class="icon-close-smooth text-app-color text-16 cursor-pointer md:hidden"
                  :class="{ 'md:group-hover:block': modelValue?.length, '!block': isOpen }"
                  @click.stop="deleteReminders"
                />
              </div>
            </div>
          </ButtonModule>
        </slot>
      </template>

      <div class="p-7 md:mt-0 mt-35">
        <ButtonModule
          v-for="reminder in remindersData"
          :key="reminder.name"
          :class="{
            'mb-8': reminder.hasDivider,
            'pointer-events-none opacity-50': !reminder.isDueDateOption && isFreePlan
          }"
          class="px-10 py-8 hover:bg-menu-hover rounded-6 w-full"
          @click="toggleReminder(reminder.value)"
        >
          <template #wrapper>
            <div class="w-full">
              <div class="flex items-center w-full">
                <i :class="reminder.icon" class="mr-8" />

                <div class="flex justify-between w-full md:text-13 text-14">
                  <p>{{ reminder.name }}</p>
                  <p class="font-semibold">{{ reminder.preview }}</p>
                </div>
              </div>

              <div v-if="reminder.hasDivider" class="absolute left-0 h-1 w-full bg-grey-500 mb-8 mt-10" />
            </div>
          </template>
        </ButtonModule>

        <div
          v-if="hasDueDate && isFreePlan"
          :class="dayBeforeDueDateIsInPast ? 'md:top-[30px] top-[66px]' : 'md:top-[60px] top-[105px]'"
          class="absolute z-[100] cursor-pointer left-0 h-[-webkit-fill-available]
            flex items-center justify-center mt-10 w-full md:p-6 p-5"
          @click="showReminderUpgradeModal = true"
        >
          <div class="bg-grey-500 bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center h-full w-full rounded-6">
            <span
              class="bg-[#DEFBF4] dark:bg-primary border-2 border-dark-500 rounded-8 text-14 font-semibold flex items-center
               justify-center px-16 py-9"
            >
              Upgrade to PRO
            </span>
          </div>
        </div>

        <ReminderDateTimePicker
          :modelValue="task.reminders?.[0]?.remindAt"
          :class="{'opacity-50': isFreePlan }"
          @update:modelValue="toggleReminder"
          @toggle="toggleDateTimePicker"
          @toggleBoth="closeDropdown"
        />
      </div>
    </DropdownModule>

    <ReminderUpgradeModal v-if="showReminderUpgradeModal" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)

interface IReminderOption {
  name: string
  preview: string
  value: string
  icon: string
  hasDivider?: boolean
  isDueDateOption?: boolean
}

const props = withDefaults(defineProps<{
  task: ITask
  modelValue?: Partial<ITaskReminder>[]
  disabled?: boolean
  isModal?: boolean
  isCreate?: boolean
  paddings?: string
  textColor?: string
  opacity?: string
  fontSize?: string
  positionMenu?: string
  title?: string
  isAutoMenuPosition?: boolean
  isTeleported?: boolean
  dropdownClasses?: string
  positionDirection?: string
}>(), {
  disabled: false,
  isModal: false,
  isCreate: false,
  paddings: 'px-5 py-3',
  textColor: 'text-dark-800',
  opacity: 'opacity-30',
  fontSize: 'text-15',
  title: 'Reminders'
})

const emit = defineEmits(['update:modelValue', 'update:remindAt'])

const isOpenedDateTimePicker = ref(false)
const dropdownRef = ref()

const { isMobile } = useGeneral()
const { isFreePlan } = usePlan()
const { createReminder, updateReminder, deleteReminder, showReminderUpgradeModal } = useReminder()

const isOpened = computed(() => dropdownRef.value?.isDropdownVisible)

function closeDropdown () {
  if (isOpened.value) {
    dropdownRef.value?.blur()
  }
}

const hasDueDate = computed(() => props.task?.endDate !== null && dayjs(props.task?.endDate).isAfter(dayjs()))
const dayBeforeDueDate = computed(() => dayjs(props.task.endDate || new Date()).subtract(1, 'day').hour(8).minute(0).second(0))
const dayBeforeDueDateIsInPast = computed(() => dayjs().isAfter(dayBeforeDueDate.value))

const remindersData = computed<IReminderOption[]>(() => {
  const reminders: IReminderOption[] = [
    {
      name: 'In 2 hours',
      preview: dayjs().add(2, 'hour').format('hh:mm A'),
      value: dayjs().add(2, 'hour').second(0).toISOString(),
      icon: 'icon-clock'
    },
    {
      name: 'In 4 hours',
      preview: dayjs().add(4, 'hour').format('hh:mm A'),
      value: dayjs().add(4, 'hour').second(0).toISOString(),
      icon: 'icon-clock'
    },
    {
      name: 'Tomorrow morning',
      preview: `${dayjs().add(1, 'day').format('dddd')} 8 AM`,
      value: dayjs().add(1, 'day').hour(8).minute(0).second(0).toISOString(),
      icon: 'icon-alarm'
    },
    {
      name: 'Tomorrow afternoon',
      preview: `${dayjs().add(1, 'day').format('dddd')} 3 PM`,
      value: dayjs().add(1, 'day').hour(15).minute(0).second(0).toISOString(),
      icon: 'icon-alarm'
    },
    {
      name: 'Upcoming Monday',
      preview: `${dayjs().day(8).format('ddd')} 8 AM`,
      value: dayjs().day(8).hour(8).minute(0).second(0).toISOString(),
      icon: 'icon-alarm'
    }
  ]

  if (hasDueDate.value) {
    reminders.unshift({
      name: 'On due date',
      preview: dayjs(props.task.endDate || new Date()).hour(8).format('DD MMM, hh:mm A'),
      value: dayjs(props.task.endDate || new Date()).hour(8).minute(0).second(0)?.toISOString(),
      icon: 'icon-clock',
      hasDivider: dayBeforeDueDateIsInPast.value,
      isDueDateOption: true
    })

    if (!dayBeforeDueDateIsInPast.value) {
      reminders.splice(1, 0, {
        name: 'Day before due date',
        preview: dayjs(props.task.endDate || new Date()).subtract(1, 'day').hour(8).format('DD MMM, hh:mm A'),
        value: dayBeforeDueDate.value?.toISOString(),
        icon: 'icon-clock',
        hasDivider: true,
        isDueDateOption: true
      })
    }
  }

  return reminders
})

const isDisabled = computed(() => !hasDueDate.value && isFreePlan.value)

const reminderText = computed(() => {
  if (!props.modelValue?.length) {
    return props.title
  }

  const currentDate = dayjs()
  const remindAt = dayjs(props.modelValue?.[0]?.remindAt)

  const isToday = remindAt.isSame(currentDate, 'day')
  const isNextWeekOrLater = remindAt.isAfter(currentDate, 'week')

  // Format the reminder string
  let formattedReminder
  if (isToday) {
    formattedReminder = `Today ${remindAt.format('hh:mm A')}`
  } else if (isNextWeekOrLater) {
    formattedReminder = `${remindAt.format('D MMM, ddd hh:mm A')}`
  } else {
    formattedReminder = remindAt.format('dddd hh:mm A')
  }

  return formattedReminder
})

function deleteReminders () {
  if (props.isCreate) {
    emit('update:modelValue', [])
    emit('update:remindAt', null)
  } else {
    deleteReminder(props.modelValue?.[0]?.id)
  }
}

function toggleReminder (date: string) {
  if (isMobile.value) {
    isOpenedDateTimePicker.value = false
  }

  if (props.isCreate) {
    emit('update:modelValue', props.task.reminders)
    emit('update:remindAt', date)

    return
  }

  if (props.modelValue?.length === 0 || props.task.reminders?.length === 0) {
    createReminder({ date, taskId: props.task.id }, props.task)

    emit('update:modelValue', props.task.reminders)
  } else {
    updateReminder(props.task.reminders?.[0]?.id, { date, taskId: props.task.id })
  }
}

function toggleDateTimePicker (value: boolean) {
  isOpenedDateTimePicker.value = value
}

function onClick () {
  if (isDisabled.value) {
    showReminderUpgradeModal.value = true
  }
}

function close () {
  dropdownRef.value.close()
}

defineExpose({
  isOpened,
  close
})
</script>
