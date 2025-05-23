<template>
  <div class="h-full flex flex-col overflow-auto">
    <div
      class="h-full max-w-[320px] mx-auto md:mx-0 md:max-w-full
             md:pl-[100px] pt-31 text-app-color"
    >
      <div class="flex items-center md:hidden" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <p class="text-35 md:text-21 font-bold">Preferences</p>

      <p class="font-bold mt-30 my-5">Mode</p>
      <SelectModule
        :model-value="settings.theme"
        class="text-14 w-[200px] rounded-4"
        :options="themeOptions"
        @update:modelValue="updateTheme($event.value)"
      >
        <template #selected>
          <span class="capitalize">{{ settings.theme }}</span>
        </template>
      </SelectModule>

      <p class="font-bold mt-30 my-5">Tasks</p>
      <CheckboxModule
        :model-value="isScreenTaskView"
        label="Open tasks in full-screen view by default"
        @update:modelValue="toggleDefaultTasksModal"
      />

      <p class="font-bold mt-30 my-5">Calendar</p>
      <CheckboxModule
        :model-value="calendarFirstDay"
        label="Enable Sunday as a first day"
        @update:modelValue="handleCalendarFirstDay"
      />

      <!-- <CheckboxModule
        :model-value="allowSendToGoogle"
        label="Send events to google calendar"
        @update:modelValue="toggleGoogleEvents"
      /> -->

      <CheckboxModule
        :model-value="calendarTimeFormat"
        label="Change time format to military time (eg. 23:30)"
        @update:modelValue="changeTimeFormat"
      />

      <p class="font-bold mt-30 my-5">Date format</p>
      <SelectModule
        :model-value="dateFormat"
        class="text-14 w-[200px] rounded-4"
        :options="options"
        @update:modelValue="updateFormat"
      />

      <p v-if="!isClient" class="font-bold mt-30 my-5">Checkboxes</p>
      <CheckboxModule
        v-if="!isClient"
        :model-value="settings.taskOrdering"
        label="Auto-fold completed checkboxes"
        @update:modelValue="toggleAutoFold"
      />

      <p class="font-bold mt-30 my-5">Grammar check</p>
      <CheckboxModule
        :model-value="isGrammarCheck"
        label="Grammar check (browser default)"
        @update:modelValue="toggleGrammarCheck"
      />

      <!-- Default icon for new projects -->
      <div v-if="!isClient" class="hidden mt-30 pb-30 w-full">
        <p class="text-17 font-bold">Default icon for new notes</p>
        <div
          class="flex items-center justify-center h-[105px] w-[140px] rounded-6 cursor-pointer mt-20 bg-grey-450"
          @click.stop="openIconsComponent"
        >
          <Icons
            ref="iconsRef"
            class="cursor-pointer"
            :optionalTop="50"
            :optionalCoefficient="isMobile ? 50 : 0 "
            @setIcon="setIcon"
            @click.stop
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['back'])

const {
  settings,
  dateFormat,
  isGrammarCheck,
  calendarFirstDay,
  calendarTimeFormat,
  updateSettings,
  updateDateFormat,
  updateDefaultIcon,
  updateGrammarCheck,
  toggleCalendarFirstDay,
  changeTimeFormat
} = useSettings()
const { updateTheme, themeOptions } = useTheme()
// const { toggleGoogleEvents, allowSendToGoogle } = useGoogleCalendar()
const { isClient } = useProfile()
const { isScreenTaskView } = useTask()

const isMobile = useGeneral()

const options = [
  { id: 1, name: 'DD.MM.YYYY' },
  { id: 2, name: 'DD-MM-YYYY' },
  { id: 3, name: 'MM/DD/YYYY' },
  { id: 4, name: 'MM.DD.YYYY' },
  { id: 5, name: 'YYYY/MM/DD' }
]

const iconsRef = ref(null)

const back = () => {
  emit('back')
}

const toggleGrammarCheck = () => {
  updateGrammarCheck(!isGrammarCheck.value)
}

const toggleAutoFold = (value) => {
  const design = { ...settings.value }
  design.taskOrdering = value

  updateSettings(design)
  settingsService.update({ taskOrdering: value })
}

const toggleDefaultTasksModal = (value) => {
  try {
    settingsService.update({ taskFullScreen: value })
    isScreenTaskView.value = value
  } catch (e) {
    console.log(e)
  }
}

const updateFormat = (format) => {
  updateDateFormat(format)
}

const openIconsComponent = () => {
  setTimeout(() => {
    iconsRef.value.toggleModal()
  }, 0)
}

const setIcon = (iconName) => {
  updateDefaultIcon(iconName)
}

const handleCalendarFirstDay = (value) => {
  toggleCalendarFirstDay(value)
}
</script>
