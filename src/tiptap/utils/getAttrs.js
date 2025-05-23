export const getMarkAttrs = (state, type) => {
  const { from, to } = state.selection
  let marks = []

  state.doc.nodesBetween(from, to, node => {
    marks = [...marks, ...node.marks]
  })

  const mark = marks.find(markItem => markItem.type.name === type)

  if (mark) {
    return mark.attrs
  }

  return {}
}

export const getNodeAttrs = (state, type) => {
  const { from, to } = state.selection
  let nodes = []

  state.doc.nodesBetween(from, to, node => {
    nodes = [...nodes, node]
  })

  const node = nodes.reverse().find(nodeItem => type.includes(nodeItem.type.name))

  if (node) {
    return node.attrs
  }

  return {}
}
