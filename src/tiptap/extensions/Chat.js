import { Node } from '@tiptap/core'
import { detectMob } from '@/core/helper-functions'

export const ChatDocument = Node.create({
  name: 'doc',
  topNode: true,
  content: 'block+',

  addKeyboardShortcuts () {
    return {
      Enter: () => {
        const isMobile = detectMob()
        if (!isMobile && typeof this.options.enterHandler === 'function') return this.options.enterHandler()
      }
    }
  }
})
