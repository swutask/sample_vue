import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

let debounce = null

export const Scroll = Extension.create({
  name: 'scroll_handler',

  addProseMirrorPlugins () {
    return [
      new Plugin({
        props: {
          scrollThreshold: { bottom: 80 },
          scrollMargin: { bottom: 80 },

          handleKeyDown () {
            const { setUpdatedAt } = useProject()
            clearTimeout(debounce)

            debounce = setTimeout(() => {
              setUpdatedAt()
            }, 400)

            return false
          }
        }
      })
    ]
  }
})
