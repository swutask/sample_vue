import {
  Mark,
  markPasteRule,
  mergeAttributes
} from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const pasteRegex = /((?:https?:\/\/)?(?:www\.)?\w+\.\w+(?:\.\w+)?(?:\/\S*)?)/gi

export const pasteRegexExact = /^((?:https?:\/\/)?(?:www\.)?\w+\.\w+(?:\.\w+)?(?:\/\S*)?)/gi

export const Link = Mark.create({
  name: 'link',

  priority: 1000,

  inclusive: false,

  addOptions () {
    return {
      openOnClick: true,
      linkOnPaste: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
        class: 'hover:underline transition-all duration-200'
      }
    }
  },

  addAttributes () {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      }
    }
  },

  parseHTML () {
    return [
      { tag: 'a[href]' }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands () {
    return {
      setLink: attributes => ({ commands }) => {
        return commands.setMark('link', attributes)
      },
      toggleLink: attributes => ({ commands }) => {
        return commands.toggleMark('link', attributes)
      },
      unsetLink: () => ({ commands }) => {
        return commands.unsetMark('link')
      }
    }
  },

  addPasteRules () {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
        getAttributes: match => ({ href: match[0] })
      })
    ]
  },

  addProseMirrorPlugins () {
    const plugins = []

    if (this.options.openOnClick) {
      plugins.push(
        new Plugin({
          key: new PluginKey('handleClickLink'),
          props: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handleClick: (view, pos, event) => {
              const link = (event.target)?.closest('a')
              const href = event?.target?.href
              const target = event?.target?.target

              if (link && href && target) {
                window.open(href, target)

                return true
              }

              return false
            }
          }
        })
      )
    }

    if (this.options.linkOnPaste) {
      plugins.push(
        new Plugin({
          key: new PluginKey('handlePasteLink'),
          props: {
            handlePaste: (view, _, slice) => {
              const { state } = view
              const { selection } = state
              const { empty } = selection

              if (empty) {
                return false
              }

              let textContent = ''

              slice.content.forEach(node => {
                textContent += node.textContent
              })

              if (!textContent || !textContent.match(pasteRegexExact)) {
                return false
              }

              this.editor.commands.setMark(this.type, {
                href: textContent
              })

              return true
            }
          }
        })
      )
    }

    return plugins
  }
})
