import { VueMaskDirective } from 'v-mask'

const mask = {
  beforeMount: VueMaskDirective.bind,
  updated: VueMaskDirective.componentUpdated,
  unmounted: VueMaskDirective.unbind
}

export default {
  install: (app) => {
    app.directive('clickOutside', {
      beforeMount (el, binding) {
        el.__clickOutside = e => {
          const clickedOnExemptElement = e.target.closest('.no-click-outside')

          if (!(el === e.target || el.contains(e.target)) && !clickedOnExemptElement) {
            binding.value()
            e.stopPropagation()
          }
        }
        el.__esc = e => {
          if (e.key === 'Escape') binding.value()
        }
        document.body.addEventListener('click', el.__clickOutside)
        document.body.addEventListener('keyup', el.__esc)
      },
      unmounted (el) {
        document.body.removeEventListener('click', el.__clickOutside)
        document.body.removeEventListener('keyup', el.__esc)
        el.__clickOutside = null
        el.__esc = null
      }
    })

    app.directive('closeOnPressEsc', {
      beforeMount (el, binding) {
        el.__esc = e => {
          if (e.key === 'Escape') binding.value()
        }
        document.body.addEventListener('keyup', el.__esc)
      },
      unmounted (el) {
        document.body.removeEventListener('keyup', el.__esc)
        el.__esc = null
      }
    })

    app.directive('hover', {
      beforeMount (el, binding) {
        el.addEventListener('mouseover', () => binding.value(true))
        el.addEventListener('mouseleave', () => binding.value(false))
      },
      unmounted (el, binding) {
        el.removeEventListener('mouseover', () => binding.value(true))
        el.removeEventListener('mouseleave', () => binding.value(false))
      }
    })

    app.directive('mask', mask)

    app.directive('focus', {
      mounted (el, binding) {
        if (binding.value) {
          setTimeout(() => {
            el.focus()
          }, 10)
        }
      }
    })
  }
}
