import { callOrReturn, getExtensionField, mergeAttributes, Node } from '@tiptap/core'
import { DecorationSet, Decoration } from 'prosemirror-view'
import { Plugin, TextSelection } from 'prosemirror-state'

import {
  tableEditing,
  columnResizing,
  goToNextCell,
  addColumnBefore,
  addColumnAfter,
  deleteColumn,
  addRowBefore,
  addRowAfter,
  deleteRow,
  deleteTable,
  mergeCells,
  splitCell,
  toggleHeader,
  CellSelection,
  toggleHeaderCell,
  setCellAttr,
  fixTables
} from '@_ueberdosis/prosemirror-tables'

import { createTable, deleteTableWhenAllCellsSelected } from './TableUtils'

import { TableView } from './TableView'

const setAttr = (attrs, name, value) => {
  const result = {}
  for (const prop in attrs) result[prop] = attrs[prop]
  result[name] = value
  return result
}

export const Table = Node.create({
  name: 'table',

  addOptions () {
    return {
      HTMLAttributes: {},
      handleWidth: 5,
      cellMinWidth: 25,
      View: TableView,
      lastColumnResizable: true,
      allowTableNodeSelection: false
    }
  },

  content: 'tableRow+',
  tableRole: 'table',
  isolating: true,
  group: 'block',

  parseHTML () {
    return [{
      tag: 'table',
      getAttrs: dom => {
        return { class: dom.getAttribute('class') }
      }
    }]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), ['tbody', 0]]
  },

  addCommands () {
    return {
      insertTable: ({ rows = 3, cols = 3, withHeaderRow = true } = {}) => ({ tr, dispatch, editor }) => {
        const node = createTable(editor.schema, rows, cols, withHeaderRow)

        if (dispatch) {
          const offset = tr.selection.anchor + 1

          tr.replaceSelectionWith(node)
            .scrollIntoView()
            .setSelection(TextSelection.near(tr.doc.resolve(offset)))
        }

        return true
      },
      addColumnBefore: () => ({ state, dispatch }) => addColumnBefore(state, dispatch),
      addColumnAfter: () => ({ state, dispatch }) => addColumnAfter(state, dispatch),
      deleteColumn: () => ({ state, dispatch }) => deleteColumn(state, dispatch),
      addRowBefore: () => ({ state, dispatch }) => addRowBefore(state, dispatch),
      addRowAfter: () => ({ state, dispatch }) => addRowAfter(state, dispatch),
      deleteRow: () => ({ state, dispatch }) => deleteRow(state, dispatch),
      deleteTable: () => ({ state, dispatch }) => deleteTable(state, dispatch),
      mergeCells: () => ({ state, dispatch }) => mergeCells(state, dispatch),
      splitCell: () => ({ state, dispatch }) => splitCell(state, dispatch),
      toggleHeaderColumn: () => ({ state, dispatch }) => toggleHeader('column')(state, dispatch),
      toggleHeaderRow: () => ({ state, dispatch }) => toggleHeader('row')(state, dispatch),
      toggleHeaderCell: () => ({ state, dispatch }) => toggleHeaderCell(state, dispatch),
      mergeOrSplit: () => ({ state, dispatch }) => {
        if (mergeCells(state, dispatch)) {
          return true
        }

        return splitCell(state, dispatch)
      },
      setCellAttribute: (name, value) => ({ state, dispatch }) => {
        return setCellAttr(name, value)(state, dispatch)
      },
      goToNextCell: () => ({ state, dispatch }) => goToNextCell(1)(state, dispatch),
      goToPreviousCell: () => ({ state, dispatch }) => goToNextCell(-1)(state, dispatch),
      fixTables: () => ({ state, dispatch }) => {
        if (dispatch) {
          fixTables(state)
        }

        return true
      },
      setCellSelection: position => ({ tr, dispatch }) => {
        if (dispatch) {
          const selection = CellSelection.create(tr.doc, position.anchorCell, position.headCell)

          tr.setSelection(selection)
        }

        return true
      },
      toggleTableVisibility: (value) => ({ state, dispatch }) => {
        const $pos = state.selection.$anchor

        for (let d = $pos.depth; d > 0; d--) {
          const node = $pos.node(d)

          if (node.type.spec.tableRole === 'table') {
            if (dispatch) {
              if (value) {
                dispatch(state.tr.setNodeMarkup($pos.before(d), null, setAttr(node.attrs, 'class', 'visible-off')))
              } else {
                dispatch(state.tr.setNodeMarkup($pos.before(d), null, setAttr(node.attrs, 'class', '')))
              }
            }
            return true
          }
        }
        return false
      }
    }
  },

  addKeyboardShortcuts () {
    return {
      Tab: () => {
        if (this.editor.commands.goToNextCell()) return true
        if (!this.editor.can().addRowAfter()) return false

        return this.editor.chain().addRowAfter().goToNextCell().run()
      },
      'Shift-Tab': () => this.editor.commands.goToPreviousCell(),
      Backspace: deleteTableWhenAllCellsSelected,
      'Mod-Backspace': deleteTableWhenAllCellsSelected,
      Delete: deleteTableWhenAllCellsSelected,
      'Mod-Delete': deleteTableWhenAllCellsSelected
    }
  },

  addProseMirrorPlugins () {
    return [
      ...([columnResizing({
        handleWidth: this.options.handleWidth,
        cellMinWidth: this.options.cellMinWidth,
        View: this.options.View,
        lastColumnResizable: this.options.lastColumnResizable
      })]),

      tableEditing({ allowTableNodeSelection: this.options.allowTableNodeSelection }),

      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const { setTableActive } = useProject()
            const { isEditable, isFocused } = this.editor
            const active = isEditable || !this.options.showOnlyWhenEditable
            const { anchor } = selection
            const decorations = []

            if (!active || !isFocused) {
              return false
            }

            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= (pos + node.nodeSize)

              if (hasAnchor && !node.isText && node.type.spec.tableRole === 'table') {
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: 'activeTable'
                })
                setTableActive(Math.random())
                decorations.push(decoration)
              }

              return false
            })

            if (!anchor || selection.$anchor.node(1)?.type.spec.tableRole !== 'table') {
              setTableActive(false)
            }

            return DecorationSet.create(doc, decorations)
          }
        }
      })
    ]
  },

  extendNodeSchema (extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    }

    return {
      tableRole: callOrReturn(getExtensionField(extension, 'tableRole', context))
    }
  }
})
