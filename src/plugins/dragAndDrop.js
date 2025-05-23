import { polyfill } from 'mobile-drag-drop'
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour'

export default {
  install: (app) => {
    app.mixin({
      created () {
        polyfill({
          dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
          holdToDrag: 300
        })

        document.addEventListener('dragenter', (event) => event.preventDefault())
        window.addEventListener('touchmove', () => undefined, { passive: false })
      }
    })
  }
}
