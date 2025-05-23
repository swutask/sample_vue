import { Node, nodeInputRule } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageComponent from './ImageComponent.vue'

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

const setAttr = (attrs, name, value) => {
  const result = {}
  for (const prop in attrs) result[prop] = attrs[prop]
  result[name] = value
  return result
}

export const Image = Node.create({
  name: 'image',

  addNodeView () {
    return VueNodeViewRenderer(ImageComponent)
  },

  addOptions () {
    return {
      uploadFunc: null,
      HTMLAttributes: {}
    }
  },

  inline: true,
  // content: 'inline*',
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
        default: 'width: 350px'
      },
      class: {
        default: ''
      },
      percent: {
        default: -1
      },
      imageLink: {
        default: null
      },
      imageComment: {
        default: null
      },
      isChatEditor: {
        default: false
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'span[type="image"]',
        getAttrs: dom => ({
          style: dom.getAttribute('style'),
          src: dom.getAttribute('src'),
          id: dom.getAttribute('id'),
          percent: dom.getAttribute('percent'),
          class: dom.getAttribute('class'),
          imageLink: dom.getAttribute('imageLink'),
          imageComment: dom.getAttribute('imageComment'),
          imageAlign: dom.getAttribute('imageAlign'),
          isChatEditor: dom.getAttribute('isChatEditor')
        })
      }
    ]
  },

  renderHTML ({ node }) {
    const chatAttrs = {
      style: 'max-width: 98%; display: inline-block;  position: relative; vertical-align: text-bottom;',
      id: node.attrs.id,
      src: node.attrs.src,
      class: node.attrs.class,
      percent: node.attrs.percent
    }
    const nodeAttrs = node.attrs.isChatEditor ? chatAttrs : node.attrs

    const image = node.attrs.isChatEditor
      ? ['a', { href: node.attrs.src, target: '_blank' }, ['img', chatAttrs]]
      : ['img', node.attrs]

    return [
      'span', { type: 'image', ...nodeAttrs, contenteditable: 'false' },
      ['span', { contenteditable: 'false' }],
      ['span', { contenteditable: 'false' }],
      ['span', { contenteditable: 'false' }],
      image
    ]
  },

  addCommands () {
    return {
      setImage: (options) => ({ tr, dispatch }) => {
        const { selection } = tr

        const node = this.type.create({
          id: options.id,
          percent: options.percent || 3,
          src: options.url
        })

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      },

      deleteImage: (pos) => ({ state, dispatch, tr }) => {
        const node = state.doc.nodeAt(pos)

        if (node?.type.name === 'image' || node?.type.name === 'file') {
          dispatch(tr.delete(pos, pos + 1))
          return true
        }

        return false
      },

      setImageBoxShadow: (value, pos) => ({ state, dispatch }) => {
        const node = state.doc.nodeAt(pos)

        if (node.type.name === 'image') {
          if (dispatch) {
            if (value) {
              dispatch(state.tr.setNodeMarkup(pos, null, setAttr(node.attrs, 'class', 'shadow-smooth')))
            } else {
              dispatch(state.tr.setNodeMarkup(pos, null, setAttr(node.attrs, 'class', '')))
            }
          }
          return true
        }
        return false
      },

      addLink: (value, pos) => ({ state, dispatch }) => {
        const node = state.doc.nodeAt(pos)

        if (node.type.name === 'image') {
          if (dispatch) {
            if (value) {
              dispatch(state.tr.setNodeMarkup(pos, null, setAttr(node.attrs, 'imageLink', value)))
            } else {
              dispatch(state.tr.setNodeMarkup(pos, null, setAttr(node.attrs, 'imageLink', value)))
            }
          }
          return true
        }
        return false
      },

      addImageComment: ({ value, pos }) => ({ state, dispatch }) => {
        const node = state.doc.nodeAt(pos)

        if (node.type.name === 'image') {
          if (dispatch) {
            if (value) {
              dispatch(state.tr.setNodeMarkup(pos, null, setAttr(node.attrs, 'imageComment', value)))
            } else {
              dispatch(state.tr.setNodeMarkup(pos, null, setAttr(node.attrs, 'imageComment', value)))
            }
          }
          return true
        }
        return false
      }
    }
  },

  addInputRules () {
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type,
        getAttributes: match => {
          const [, alt, src, title] = match

          return { src, alt, title }
        }
      })
    ]
  },

  addProseMirrorPlugins () {
    const upload = this.options.uploadFunc
    const { editor } = this
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            click (_, event) {
              return event.preventDefault()
            },
            async paste (view, event) {
              const items = (event.clipboardData || event.originalEvent.clipboardData).items

              if (!upload) return

              const attachments = []
              const { schema } = editor.state

              items.forEach(async item => {
                const file = item.getAsFile()
                if (!file) return // Return here, otherwise copying texts won't possible anymore

                event.preventDefault()
                attachments.push(file)
              })

              if (attachments.length > 0) {
                const result = await upload(attachments)

                result.forEach(item => {
                  const isImage = (/image/i).test(item.mimeType)
                  let node = null

                  if (isImage) {
                    node = schema.nodes.image.create({
                      src: item.url,
                      id: item.id
                    })
                  } else {
                    node = schema.nodes.file.create({
                      src: item.url,
                      id: item.id,
                      name: item.name,
                      size: item.size
                    })
                  }

                  if (node) {
                    const transaction = editor.state.tr.replaceSelectionWith(node)
                    view.dispatch(transaction)
                  }
                })
              }
            },
            drop (view, event) {
              const hasFiles = event.dataTransfer?.files?.length

              if (!hasFiles) return
              event.preventDefault()

              const attachments = Array.from(event.dataTransfer.files)

              const { schema } = editor.state
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })

              upload(attachments).then((result) => {
                result.forEach(item => {
                  const isImage = (/image/i).test(item.mimeType)

                  if (isImage) {
                    const node = schema.nodes.image.create({
                      src: item.url,
                      id: item.id
                    })
                    const transaction = editor.state.tr.insert(coordinates.pos, node)
                    view.dispatch(transaction)
                  } else {
                    const node = schema.nodes.file.create({
                      src: item.url,
                      id: item.id,
                      name: item.name,
                      size: item.size
                    })

                    const transaction = editor.state.tr.insert(coordinates.pos, node)
                    view.dispatch(transaction)
                  }
                })
              })
            }
          }
        }
      })
    ]
  }
})
