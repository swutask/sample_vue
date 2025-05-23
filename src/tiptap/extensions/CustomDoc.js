import { Node } from '@tiptap/core'

export const CustomDoc = Node.create({
  name: 'doc',
  topNode: true,
  content: 'title block+'
})
