import { findParentNodeClosestToPos } from '@tiptap/core'
import { CellSelection } from '@_ueberdosis/prosemirror-tables'

export function createTable (schema, rowsCount, colsCount, withHeaderRow, cellContent) {
  const types = getTableNodeTypes(schema)
  const headerCells = []
  const cells = []

  for (let index = 0; index < colsCount; index += 1) {
    const cell = createCell(types.cell, cellContent)

    if (cell) {
      cells.push(cell)
    }

    if (withHeaderRow) {
      const headerCell = createCell(types.header_cell, cellContent)

      if (headerCell) {
        headerCells.push(headerCell)
      }
    }
  }

  const rows = []

  for (let index = 0; index < rowsCount; index += 1) {
    rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells))
  }

  return types.table.createChecked(null, rows)
}

export function createCell (cellType, cellContent) {
  if (cellContent) {
    return cellType.createChecked(null, cellContent)
  }

  return cellType.createAndFill()
}

export const deleteTableWhenAllCellsSelected = ({ editor }) => {
  const { selection } = editor.state

  if (!isCellSelection(selection)) {
    return false
  }

  let cellCount = 0
  const table = findParentNodeClosestToPos(selection.ranges[0].$from, node => {
    return node.type.name === 'table'
  })

  table?.node.descendants(node => {
    if (node.type.name === 'table') {
      return false
    }

    if (['tableCell', 'tableHeader'].includes(node.type.name)) {
      cellCount += 1
    }
  })

  const allCellsSelected = cellCount === selection.ranges.length

  if (!allCellsSelected) {
    return false
  }

  editor.commands.deleteTable()

  return true
}

export function getTableNodeTypes (schema) {
  if (schema.cached.tableNodeTypes) {
    return schema.cached.tableNodeTypes
  }

  const roles = {}

  Object.keys(schema.nodes).forEach(type => {
    const nodeType = schema.nodes[type]

    if (nodeType.spec.tableRole) {
      roles[nodeType.spec.tableRole] = nodeType
    }
  })

  schema.cached.tableNodeTypes = roles

  return roles
}

export function isCellSelection (value) {
  return value instanceof CellSelection
}
