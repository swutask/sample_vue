import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ListItemComponent from './ListItemComponent.vue'

export const ListItem = Node.create({
  name: 'listItem',

  addNodeView () {
    return VueNodeViewRenderer(ListItemComponent)
  },

  content: '(paragraph|bulletList)+',
  draggable: true,

  parseHTML () {
    return [
      {
        tag: 'li[data-type="listItem"]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['li', mergeAttributes(HTMLAttributes, { 'data-type': 'listItem' }), 0]
  },

  addKeyboardShortcuts () {
    return {
      Enter: () => this.editor.commands.splitListItem('listItem'),
      Tab: () => this.editor.commands.sinkListItem('listItem'),
      'Shift-Tab': () => this.editor.commands.liftListItem('listItem')
    }
  }
})
