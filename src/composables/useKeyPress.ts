export function useKeyPress (key: string, callback: () => void) {
  function handleKeyPress (event: KeyboardEvent) {
    if (event.key === key) {
      callback()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
}
