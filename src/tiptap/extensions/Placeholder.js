import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const Placeholder = Extension.create({
  name: 'sub_title_placeholder',

  addOptions () {
    return {
      showOnlyWhenEditable: true,
      showOnlyCurrent: false
    }
  },

  addProseMirrorPlugins () {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor
            const active = isEditable || !this.options.showOnlyWhenEditable
            const { anchor } = selection
            const decorations = []
            const isEditorEmptyForSubTitle = doc.textContent.length === 0 && doc.content.childCount <= 1

            if (!active) {
              return false
            }

            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= (pos + node.nodeSize)
              const thirdNodeIsEmpty = node.content.size === 0 && doc.content.childCount === 3 && doc.content.content[2].content.size === 0

              const isNodeEmpty = node.content.size === 0
              const subsequentNodesHaveContent = doc.content.content.some((item, index) => index > 0 && item.content.size > 0)

              const isNodeEmptyForSubTitle = (node.content.size === 0 && doc.content.childCount <= 2) || thirdNodeIsEmpty

              if ((hasAnchor || !this.options.showOnlyCurrent) && isNodeEmpty) {
                const classes = ['is-empty']

                if (isNodeEmptyForSubTitle && doc.content.childCount < 2 && !isFocused) {
                  classes.push('is-empty-sub-title')
                }

                if (!subsequentNodesHaveContent || (isEditorEmptyForSubTitle && !isFocused) || doc.content.content.some(item => item.type.name === 'addTemplate')) {
                  classes.push('is-editor-empty-sub-title')
                }

                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(' ')
                })
                decorations.push(decoration)
              }

              return false
            })

            return DecorationSet.create(doc, decorations)
          }
        }
      })
    ]
  }
})
