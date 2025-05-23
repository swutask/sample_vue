import localStorageService from '@/core/local-storage'

const useSettingsStore = defineStore('settings', () => {
  const settings = ref({
    columnWidth: 'Normal',
    fontFamily: 'Inter',
    fontSize: 'Large',
    mode: 'Paperless',
    theme: 'light',
    bookView: 'Card',
    lineHeight: '1.6',
    taskOrdering: true
  })
  const dateFormat = ref(localStorageService.getItem('dateFormat') || { id: 1, name: 'DD.MM.YYYY' })
  const defaultProjectIcon = ref(localStorageService.getItem('default-icon') || 'purple_circle')
  const showHeader = ref(true)
  const showBackButton = ref(true)
  const showSettingsModal = ref(false)
  const activeState = ref('Account')
  const showAside = ref(false)
  const isGrammarCheck = ref(localStorageService.getItem('grammarCheck'))
  const isAutoSwitchingThemeEnable = ref(localStorageService.getItem('auto-switching-theme'))
  const calendarFirstDay = ref(localStorageService.getItem('calendar-first-day'))
  const calendarTimeFormat = ref(localStorageService.getItem('calendar-time-format'))

  function updateSettings (value) {
    settings.value = value
  }

  function toggleCalendarFirstDay (value) {
    calendarFirstDay.value = value

    localStorageService.setItem('calendar-first-day', value)
  }

  function changeTimeFormat (value) {
    calendarTimeFormat.value = value

    localStorageService.setItem('calendar-time-format', value)
  }

  function resetSettings () {
    settings.value = {
      columnWidth: 'Normal',
      fontFamily: 'Inter',
      fontSize: 'Large',
      mode: 'Paperless',
      theme: 'light',
      bookView: 'Card',
      lineHeight: '1.6',
      taskOrdering: true
    }
    activeState.value = 'Account'
  }

  function updateHeader (value) {
    showHeader.value = value
  }

  function updateBackButton (value) {
    showBackButton.value = value
  }

  function toggleSettingsModal (value) {
    showSettingsModal.value = value
  }

  function changeActiveState (value) {
    activeState.value = value
  }

  function toggleAside (value) {
    showAside.value = value
  }

  function updateGrammarCheck (value) {
    localStorageService.setItem('grammarCheck', value)
    isGrammarCheck.value = value
  }

  function updateDateFormat (value) {
    localStorageService.setItem('dateFormat', value)
    dateFormat.value = value
  }

  function updateAutoSwitchingTheme (value) {
    localStorageService.setItem('auto-switching-theme', value)
    isAutoSwitchingThemeEnable.value = value
  }

  function updateDefaultIcon (value) {
    localStorageService.setItem('default-icon', value)
    defaultProjectIcon.value = value
  }

  function getSettings () {
    const { isScreenTaskView } = useTask()

    settingsService.getSettings().then(({ data }) => {
      settings.value = data.settings
      isScreenTaskView.value = data.settings.taskFullScreen
    })
  }

  return {
    settings,
    dateFormat,
    defaultProjectIcon,
    showHeader,
    showBackButton,
    showSettingsModal,
    activeState,
    showAside,
    isGrammarCheck,
    isAutoSwitchingThemeEnable,
    calendarFirstDay,
    calendarTimeFormat,
    updateSettings,
    toggleCalendarFirstDay,
    changeTimeFormat,
    resetSettings,
    updateHeader,
    updateBackButton,
    toggleSettingsModal,
    changeActiveState,
    toggleAside,
    updateGrammarCheck,
    updateDateFormat,
    updateAutoSwitchingTheme,
    updateDefaultIcon,
    getSettings
  }
})

export function useSettings () {
  const store = useSettingsStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
