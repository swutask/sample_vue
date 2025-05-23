export function useHomePageHotKeys () {
  const { toggleSearch } = useGeneral()
  const { toggleNewTaskModal } = useTask()
  const { toggleSettingsModal, changeActiveState } = useSettings()

  function hotKeys (event: KeyboardEvent) {
    // alt / option
    if (event.altKey) {
    // alt + 0 / option + 0 - open shortcuts
      if (event.keyCode === 48) {
        changeActiveState('Keyboard')
        toggleSettingsModal(true)
        toggleSearch(false)
      }

      // alc + c - create task
      if (event.keyCode === 67) {
        event.preventDefault()
        toggleNewTaskModal(true)
        toggleSettingsModal(false)
      }
    }

    // ctrl / cmd
    if (event.ctrlKey || event.metaKey) {
    // ctrl + k - search modal
      if (event.keyCode === 75) {
        event.preventDefault()
        toggleSearch(true)
        toggleSettingsModal(false)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', hotKeys)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', hotKeys)
  })
}
