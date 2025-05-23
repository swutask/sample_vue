import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

function nodeEqualsType ({ types, node }) {
  return (Array.isArray(types) && types.includes(node.type)) || node.type === types
}

export const TrailingNode = Extension.create({
  name: 'trailing_node',

  addOptions () {
    return {
      node: 'paragraph',
      notAfter: [
        'paragraph',
        'addTemplate'
      ]
    }
  },

  addProseMirrorPlugins () {
    const plugin = new PluginKey('trailing_node')
    const disabledNodes = Object.entries(this.editor.schema.nodes)
      .map(([, value]) => value)
      .filter(node => this.options.notAfter.includes(node.name))

    return [
      new Plugin({
        key: plugin,
        view: () => ({
          update: view => {
            const { state } = view
            const insertNodeAtEnd = plugin.getState(state)

            if (!insertNodeAtEnd) {
              return
            }

            const { doc, schema, tr } = state
            const type = schema.nodes[this.options.node]
            const transaction = tr.insert(doc.content.size, type.create())
            view.dispatch(transaction)
          }
        }),
        state: {
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild
            return !nodeEqualsType({ node: lastNode, types: disabledNodes })
          },
          apply: (tr, value) => {
            if (!tr.docChanged) {
              return value
            }

            const lastNode = tr.doc.lastChild
            return !nodeEqualsType({ node: lastNode, types: disabledNodes })
          }
        }
      })
    ]
  }
})
