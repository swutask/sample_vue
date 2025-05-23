import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'

export const TaskList = Node.create({
  name: 'todo_list',

  group: 'block list',

  content: 'todo_item+',

  parseHTML () {
    return [
      {
        tag: 'ul[data-type="todo_list"]',
        priority: 51
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['ul', mergeAttributes(HTMLAttributes, { 'data-type': 'todo_list', class: 'todo_list' }), 0]
  },

  addCommands () {
    return {
      toggleTaskList: () => ({ commands }) => {
        return commands.toggleList('todo_list', 'todo_item')
      }
    }
  },

  addInputRules () {
    return [
      wrappingInputRule({
        find: /^(?:\[\])$/,
        type: this.type
      })
    ]
  }
})
