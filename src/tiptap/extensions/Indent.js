import { Mark, mergeAttributes } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state'
import { getMarkAttrs } from '@/tiptap/utils/getAttrs'

export const Indent = Mark.create({
  name: 'indent',
  inclusive: false,

  addAttributes () {
    return {
      indent: {
        default: 0
      }
    }
  },
  parseHTML () {
    return [
      {
        tag: 'span[type="indent"]'
      }
    ]
  },
  renderHTML ({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { type: 'indent', style: 'display: inline-block' }), 0]
  },
  addCommands () {
    return {
      setIndent: attributes => ({ commands, state }) => {
        const getMark = getMarkAttrs(state, 'indent')
        let indent = 0

        if (Object.keys(getMark).length !== 0) {
          indent = parseInt(getMark.indent) + attributes
          if (indent >= 7) {
            indent = 7
          }
          if (indent <= 0) {
            indent = 0
          }
        } else {
          indent = 1
        }

        return commands.setMark('indent', { indent })
      },
      setSelectionContent: () => ({ state, dispatch }) => {
        const { selection } = state
        const positionStart = selection.$cursor ? selection.$cursor.start() : selection.$from.pos
        const positionEnd = selection.$cursor ? selection.$cursor.end() : selection.$to.pos

        const newSelection = TextSelection.create(state.doc, positionStart, positionEnd)
        const tr = state.tr.setSelection(newSelection)
        dispatch(tr)
      },
      setCursorAtEnd: () => ({ state, dispatch }) => {
        // Don't dispatch this command if the selection is empty
        if (state.selection.empty) return false

        // Subtract one so that it falls within the current node
        const endPos = state.selection.$to.after() - 1
        const selection = new TextSelection(state.doc.resolve(endPos))
        const transaction = state.tr.setSelection(selection)

        if (dispatch) dispatch(transaction.scrollIntoView())

        return true
      }
    }
  },
  addKeyboardShortcuts () {
    return {
      Tab: () => {
        const { state } = this.editor
        let nodes = []

        state.doc.nodesBetween(state.selection.from, state.selection.to, (node) => {
          nodes = [...nodes, node]
        })

        if (nodes.reverse().some(item => item.type.name === 'title')) {
          this.editor.chain().focus().enter().focus().run()
          return true
        }

        const deniedTypeName = ['bulletList', 'listItem', 'todo_list', 'todo_item']
        const isDenied = nodes.reverse().some(nodeItem => deniedTypeName.includes(nodeItem.type.name))

        if (isDenied) return true

        this.editor
          .chain()
          .focus()
          .setSelectionContent()
          .setIndent(1)
          .setCursorAtEnd()
          .run()
        return true
      },
      'Shift-Tab': () => {
        this.editor.chain()
          .focus()
          .setSelectionContent()
          .setIndent(-1)
          .setCursorAtEnd()
          .run()
        return true
      }
    }
  }
})
