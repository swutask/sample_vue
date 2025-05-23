export function useTheme () {
  const { settings } = useSettings()

  const themeOptions = [
    { id: 1, name: 'Dark', value: 'dark' },
    { id: 2, name: 'Light', value: 'light' }
  ]

  const isDarkMode = computed(() => settings.value.theme === 'dark')

  function updateTheme (type: 'dark' | 'light' | null = null) {
    const newTheme = type ?? (settings.value.theme === 'dark' ? 'light' : 'dark')

    if (settings.value.theme !== newTheme) {
      settings.value.theme = newTheme
      settingsService.update({ theme: newTheme })
    }

    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return {
    isDarkMode,
    themeOptions,
    updateTheme
  }
}
