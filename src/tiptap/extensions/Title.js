import { Node } from '@tiptap/core'

export const Title = Node.create({
  name: 'title',

  content: 'inline*',

  parseHTML () {
    return [
      {
        tag: 'h1.title'
      }
    ]
  },

  renderHTML () {
    return ['h1', { class: 'title' }, 0]
  }
})
