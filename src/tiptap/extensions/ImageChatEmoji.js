import { Node } from '@tiptap/core'

export const ImageChatEmoji = Node.create({
  name: 'imageChatEmoji',

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
      style: {
        default: 'display: inline-block; max-width: 24px'
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'span[type="image-chat-emoji"]',
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
      'span', { type: 'image-chat-emoji', ...node.attrs, contenteditable: 'false' },
      ['img', node.attrs]
    ]
  },

  addCommands () {
    return {
      setImageChatEmoji: (options) => ({ tr, dispatch }) => {
        const { selection } = tr

        const node = this.type.create({
          src: options.url
        })

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      }
    }
  }
})
