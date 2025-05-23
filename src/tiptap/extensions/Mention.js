import { Node } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { PluginKey } from 'prosemirror-state'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import MentionComponent from './MentionComponent.vue'

export const MentionPluginKey = new PluginKey('mention')

export const Mention = Node.create({
  name: 'mention',

  addOptions () {
    return {
      HTMLAttributes: {},
      renderLabel ({ options, node }) {
        return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`
      },
      suggestion: {
        char: '@',
        allowSpaces: false,
        pluginKey: MentionPluginKey,
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
      },
      mentionClass: 'mention'
    }
  },

  addAttributes () {
    return {
      id: {
        default: null
      },
      href: {
        default: null
      },
      title: {
        default: null
      },
      lastName: {
        default: ''
      },
      avatar: {
        default: ''
      },
      label: {
        default: null
      },
      color: {
        default: null
      }
    }
  },

  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  parseHTML () {
    return [
      {
        tag: 'button.mention',
        getAttrs: dom => {
          const id = dom.getAttribute('id')
          const color = dom.getAttribute('color')
          const label = dom.getAttribute('label')
          const href = dom.getAttribute('href')
          const title = dom.getAttribute('title')
          const lastName = dom.getAttribute('lastName')
          const avatar = dom.getAttribute('avatar')
          return { href, title, id, color, label, lastName, avatar }
        }
      }
    ]
  },

  renderHTML ({ node }) {
    return [
      'button',
      {
        class: this.options.mentionClass,
        id: node.attrs.id,
        label: node.attrs.label,
        color: node.attrs.color,
        href: node.attrs.href,
        title: node.attrs.title,
        lastName: node.attrs.lastName,
        avatar: node.attrs.avatar
      },
      `${this.options.suggestion?.char}${node.attrs.title}`
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
  },

  addNodeView () {
    return VueNodeViewRenderer(MentionComponent)
  }
})
