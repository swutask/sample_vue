import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TaskItemComponent from './TaskItemComponent.vue'

export const TaskItem = Node.create({
  name: 'todo_item',

  addNodeView () {
    return VueNodeViewRenderer(TaskItemComponent)
  },

  content: '(paragraph|todo_list)+',
  draggable: true,

  addAttributes () {
    return {
      done: {
        default: false,
        parseHTML: element => element.getAttribute('data-done') === 'true',
        renderHTML: attributes => ({
          'data-done': attributes.done
        })
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'li[data-type="todo_item"]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['li', mergeAttributes(HTMLAttributes, { 'data-type': 'todo_item' }), 0]
  },

  addKeyboardShortcuts () {
    return {
      Enter: () => this.editor.commands.splitListItem('todo_item'),
      Tab: () => this.editor.commands.sinkListItem('todo_item'),
      'Shift-Tab': () => this.editor.commands.liftListItem('todo_item')
    }
  }
})
