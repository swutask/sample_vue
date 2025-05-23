import { Node, mergeAttributes } from '@tiptap/core'
import router from '@/router'

export const LocalLink = Node.create({
  name: 'localLink',

  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  addAttributes () {
    return {
      label: {
        default: null
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'button.localLink',
        getAttrs: node => {
          return { label: node.innerText }
        }
      }
    ]
  },

  renderHTML ({ node, HTMLAttributes }) {
    return ['button', mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes,
      { class: 'localLink' }
    ), node.attrs.label]
  },

  addNodeView () {
    return ({ node }) => {
      const dom = document.createElement('button')

      const { togglePlansInfoModal } = usePlan()

      dom.classList.add('localLink')

      const open = () => {
        if (router.currentRoute.value.name !== 'Share') {
          togglePlansInfoModal(true)
        }
      }

      dom.addEventListener('click', open)

      dom.innerHTML = node.attrs.label

      return {
        dom,
        destroy () {
          dom.removeEventListener('click', open)
        }
      }
    }
  }
})
