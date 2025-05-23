export default function () {
  const disabledScroll = ref(false)
  const wrapperRef = ref(null)
  const hasScroll = ref(false)

  function dragScroll () {
    let isDown = false
    let startX
    let scrollLeft

    wrapperRef.value.addEventListener('mousedown', (e) => {
      if (e.path?.some(item => item.className?.includes('prevent-drag-scroll'))) return

      isDown = true
      startX = e.pageX - wrapperRef.value.offsetLeft
      scrollLeft = wrapperRef.value.scrollLeft
    })

    wrapperRef.value.addEventListener('mouseup', () => {
      isDown = false
    })

    wrapperRef.value.addEventListener('mousemove', (e) => {
      if (!isDown || disabledScroll.value) return

      e.preventDefault()
      const x = e.pageX - wrapperRef.value.offsetLeft
      const walk = (x - startX) * 3 // scroll-fast
      wrapperRef.value.scrollLeft = scrollLeft - walk
    })
  }

  function checkCursor () {
    hasScroll.value = wrapperRef.value.scrollWidth > wrapperRef.value.clientWidth
  }

  return {
    // data
    hasScroll,
    disabledScroll,
    // refs
    wrapperRef,
    // computed
    dragScroll,
    // function
    checkCursor
  }
}
