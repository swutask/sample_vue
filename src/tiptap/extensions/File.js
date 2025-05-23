import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import FileComponent from './FileComponent.vue'

export const File = Node.create({
  name: 'file',

  addNodeView () {
    return VueNodeViewRenderer(FileComponent)
  },

  group: 'block',
  draggable: true,
  selectable: false,
  marks: '',
  atom: true,

  addAttributes () {
    return {
      src: {
        default: null
      },
      id: {
        default: null
      },
      name: {
        default: null
      },
      size: {
        default: null
      },
      percent: {
        default: 1
      },
      projectId: {
        default: null
      },
      taskId: {
        default: null
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'vue-component'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['vue-component', mergeAttributes(HTMLAttributes)]
  },

  addCommands () {
    return {
      setFile: ({ id, url, name, size, projectId = null, taskId = null }) => ({ tr, dispatch }) => {
        const { selection } = tr

        const node = this.type.create({
          id,
          src: url,
          name,
          size,
          projectId,
          taskId
        })

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      }
    }
  }
})
