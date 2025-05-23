import { Node, nodeInputRule } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import emojis from '@/core/emojis'
import { PluginKey } from 'prosemirror-state'

const EMOJI_REGEXP = /:([\w-]+):$/

export const Emoji = Node.create({
  name: 'emoji',

  addOptions () {
    return {
      HTMLAttributes: {},
      renderLabel ({ node }) {
        return `${node.attrs.data}`
      },
      suggestion: {
        char: ':',
        pluginKey: new PluginKey('emoji'),
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter
          const overrideSpace = nodeAfter?.text?.startsWith(' ')

          if (overrideSpace) {
            range.to += 1
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props
              },
              {
                type: 'text',
                text: ' '
              }
            ])
            .run()

          window.getSelection()?.collapseToEnd()
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from)
          const type = state.schema.nodes[this.name]
          const allow = !!$from.parent.type.contentMatch.matchType(type)

          return allow
        }
      }
    }
  },

  addAttributes () {
    return {
      data: {
        default: null
      }
    }
  },

  inline: true,
  selectable: false,
  group: 'inline',

  parseHTML () {
    return [
      {
        tag: 'span[type="emoji"]',
        getAttrs: dom => ({
          data: dom.getAttribute('data')
        })
      }
    ]
  },

  renderHTML ({ node }) {
    return ['span', { type: 'emoji', data: node.attrs.data }, `${node.attrs.data}`]
  },

  addInputRules () {
    return [
      nodeInputRule(
        {
          find: EMOJI_REGEXP,
          type: this.type,
          getAttributes: match => {
            const emoji = Object.keys(emojis).includes(match[1].toLowerCase()) ? emojis[match[1].toLowerCase()] : undefined

            return emoji ? { data: emoji.char } : null
          }
        }
      )
    ]
  },

  addKeyboardShortcuts () {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isMention = false
        const { selection } = state
        const { empty, anchor } = selection

        if (!empty) {
          return false
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isMention = true
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

            return false
          }
        })

        return isMention
      })
    }
  },

  addProseMirrorPlugins () {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ]
  }
})
