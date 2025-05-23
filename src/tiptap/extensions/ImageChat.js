import { Node } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

export const ImageChat = Node.create({
  name: 'imageChat',

  addOptions () {
    return {
      uploadFunc: null,
      HTMLAttributes: {}
    }
  },

  inline: true,
  content: 'inline*',
  group: 'inline',
  draggable: true,
  selectable: false,
  marks: '',

  addAttributes () {
    return {
      src: {
        default: null
      },
      id: {
        default: null
      },
      style: {
        default: 'display: inline-block; max-width: 100%; border-radius: 8px'
      },
      class: {
        default: 'img_chat rounded-8'
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'span[type="imageChat"]',
        getAttrs: dom => ({
          style: dom.getAttribute('style'),
          src: dom.getAttribute('src'),
          class: dom.getAttribute('class')
        })
      }
    ]
  },

  renderHTML ({ node }) {
    return [
      'span', { type: 'imageChat', ...node.attrs, contenteditable: 'false' },
      ['a', { href: node.attrs.src, target: '_blank' }, ['img', node.attrs]]
    ]
  },

  addCommands () {
    return {
      setImageChat: (options) => ({ tr, dispatch }) => {
        const { selection } = tr

        const node = this.type.create({
          id: options.id,
          src: options.url
        })

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      }
    }
  },

  addProseMirrorPlugins () {
    const upload = this.options.uploadFunc

    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            click (_, event) {
              return event.preventDefault()
            },
            paste (_, event) {
              if (!upload) return

              const items = (event.clipboardData || event.originalEvent.clipboardData).items

              const files = []

              items.forEach(async item => {
                const file = item.getAsFile()
                if (file) {
                  files.push(file)
                }
              })

              upload(files)
            },
            drop (_, event) {
              if (!upload) return

              const hasFiles = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length

              if (!hasFiles) return

              const attachments = Array.from(event.dataTransfer.files)

              event.preventDefault()
              upload(attachments)
            }
          }
        }
      })
    ]
  }
})
