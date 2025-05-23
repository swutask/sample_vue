import { h, TransitionGroup, ref, computed } from 'vue'

export default (_, context) => {
  const cachedStyles = ref({})

  const transition = computed(() => {
    const transitions = []

    Object.keys(cachedStyles.value).forEach((key) => {
      transitions.push(`${convertToCssProperty(key)} 200ms ease-in-out`)
    })

    return transitions.join(', ')
  })

  function enter (el, done) {
    // Because width and height may be 'auto',
    // first detect and cache the height
    detectAndCacheHeight(el)

    // The order of applying styles is important:
    // - 1. Set styles for state before transition
    // - 2. Force repaint
    // - 3. Add transition style
    // - 4. Set styles for state after transition
    // If the order is not right and you open any 2nd level submenu
    // for the first time, the transition will not work.
    setClosedHeight(el)
    hideOverflow(el)
    forceRepaint(el)
    setTransition(el)
    setOpenedHeight(el)

    // Call done() when the transition ends
    // to trigger the @after-enter event.
    setTimeout(done, 300)
  }

  function afterEnter (el) {
    // Clean up inline styles
    unsetOverflow(el)
    unsetTransition(el)
    unsetHeight(el)
    clearCachedHeight()
  }

  function leave (el, done) {
    // For some reason, @leave triggered when starting
    // from open state on page load. So for safety,
    // check if the height have been cached.
    detectAndCacheHeight(el)

    // The order of applying styles is less important
    // than in the enter phase, as long as we repaint
    // before setting the closed height.
    // But it is probably best to use the same
    // order as the enter phase.
    setOpenedHeight(el)
    hideOverflow(el)
    forceRepaint(el)
    setTransition(el)
    setClosedHeight(el)

    // Call done() when the transition ends
    // to trigger the @after-leave event.
    // This will also cause v-show
    // to reapply 'display: none'.
    setTimeout(done, 200)
  }

  function afterLeave (el) {
    // Clean up inline styles
    unsetOverflow(el)
    unsetTransition(el)
    unsetHeight(el)
    clearCachedHeight()
  }

  function detectAndCacheHeight (el) {
    // Cache actual height
    // only once to void invalid values when
    // triggering during a transition
    if (Object.keys(cachedStyles.value).length > 0) return

    const visibility = el.style.visibility
    const display = el.style.display

    // Trick to get the width and
    // height of a hidden element
    el.style.visibility = 'hidden'
    el.style.display = ''

    cachedStyles.value = detectRelevantHeight(el)

    // Restore any original styling
    el.style.visibility = visibility
    el.style.display = display
  }

  function clearCachedHeight () {
    cachedStyles.value = {}
  }

  function detectRelevantHeight (el) {
    // These properties will be transitioned
    return {
      height: el.offsetHeight + 'px',
      paddingTop: el.style.paddingTop || getCssValue(el, 'padding-top'),
      paddingBottom: el.style.paddingBottom || getCssValue(el, 'padding-bottom')
    }
  }

  function setTransition (el) {
    el.style.transition = transition.value
  }

  function unsetTransition (el) {
    el.style.transition = ''
  }

  function hideOverflow (el) {
    el.style.overflow = 'hidden'
  }

  function unsetOverflow (el) {
    el.style.overflow = ''
  }

  function setClosedHeight (el) {
    Object.keys(cachedStyles.value).forEach((key) => {
      el.style[key] = '0'
    })
  }

  function setOpenedHeight (el) {
    Object.keys(cachedStyles.value).forEach((key) => {
      el.style[key] = cachedStyles.value[key]
    })
  }

  function unsetHeight (el) {
    Object.keys(cachedStyles.value).forEach((key) => {
      el.style[key] = ''
    })
  }

  function forceRepaint (el) {
    return getComputedStyle(el).height
  }

  function getCssValue (el, style) {
    return getComputedStyle(el, null).getPropertyValue(style)
  }

  function convertToCssProperty (style) {
    const upperChars = style.match(/([A-Z])/g)

    if (!upperChars) {
      return style
    }

    for (let i = 0, n = upperChars.length; i < n; i++) {
      style = style.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase())
    }

    if (style.slice(0, 1) === '-') {
      style = style.slice(1)
    }

    return style
  }

  return h(
    TransitionGroup,
    {
      onEnter: enter,
      onAfterEnter: afterEnter,
      onLeave: leave,
      onAfterLeave: afterLeave
    },
    context.slots)
}
