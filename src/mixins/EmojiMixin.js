import { VueRenderer } from '@tiptap/vue-3'
import tippy, { sticky } from 'tippy.js'
import emojis from '@/core/emojis'

import EmojiList from './EmojiList.vue'

export default ({
  editorClass = 'editor',
  editorId = 'editor'
} = {}) => {
  return {
    items: ({ query }) => {
      const items = Object.values(emojis)

      return items.filter(item => item.name.toLowerCase().match(query.toLowerCase())).splice(0, 50)
    },

    render: () => {
      let component
      let popup

      return {
        onStart: props => {
          component = new VueRenderer(EmojiList, {
            props,
            editor: props.editor
          })

          if (!props.clientRect) {
            return
          }

          const el = document.getElementById(editorId)

          popup = tippy(`.${editorClass}`, {
            getReferenceClientRect: props.clientRect,
            appendTo: () => el,
            content: component.element,
            sticky: true, // make sure position of tippy is updated when content changes
            plugins: [sticky],
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
            inertia: true,
            duration: [400, 200]
          })
        },

        onUpdate (props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect
          })
        },

        onKeyDown (props) {
          if (props.event.key === 'Escape') {
            popup[0].hide()

            return true
          }

          return component.ref?.onKeyDown(props)
        },

        onExit () {
          popup[0].destroy()
          component.destroy()
        }
      }
    }
  }
}
