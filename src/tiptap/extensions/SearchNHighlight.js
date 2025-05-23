import { Extension } from '@tiptap/core'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { Plugin, PluginKey } from 'prosemirror-state'

const updateView = (state, dispatch) => dispatch(state.tr)

const regex = (s, disableRegex, caseSensitive) => {
  return RegExp(disableRegex ? s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') : s, caseSensitive ? 'gu' : 'gui')
}

function processSearches (doc, searchTerm, searchResultClass) {
  const decorations = []
  let textNodesWithPosition = []
  const results = []

  let index = 0

  if (!searchTerm) return { decorationsToReturn: DecorationSet.empty, results: [] }

  doc.descendants((node, pos) => {
    if (node.isText) {
      if (textNodesWithPosition[index]) {
        textNodesWithPosition[index] = {
          text: textNodesWithPosition[index].text + node.text,
          pos: textNodesWithPosition[index].pos
        }
      } else {
        textNodesWithPosition[index] = {
          text: `${node.text}`,
          pos
        }
      }
    } else {
      index += 1
    }
  })

  textNodesWithPosition = textNodesWithPosition.filter(Boolean)

  for (let i = 0; i < textNodesWithPosition.length; i += 1) {
    const { text, pos } = textNodesWithPosition[i]

    const matches = [...text.matchAll(searchTerm)]

    for (let j = 0; j < matches.length; j += 1) {
      const m = matches[j]

      if (m[0] === '') break

      if (m.index !== undefined) {
        results.push({
          from: pos + m.index,
          to: pos + m.index + m[0].length
        })
      }
    }
  }

  for (let i = 0; i < results.length; i += 1) {
    const r = results[i]
    decorations.push(Decoration.inline(r.from, r.to, { class: searchResultClass }))
  }

  return {
    decorationsToReturn: DecorationSet.create(doc, decorations),
    results
  }
}

export const SearchNHighlight = Extension.create({
  name: 'search',

  addOptions () {
    return {
      searchTerm: '',
      results: [],
      searchResultClass: 'search-result',
      caseSensitive: false,
      disableRegex: false
    }
  },

  addCommands () {
    return {
      setSearchTerm: (searchTerm) => ({ state, dispatch }) => {
        this.options.searchTerm = searchTerm
        this.options.results = []

        updateView(state, dispatch)

        return false
      }
    }
  },

  addProseMirrorPlugins () {
    const extensionThis = this.options

    return [
      new Plugin({
        key: new PluginKey('search'),
        state: {
          init () {
            return DecorationSet.empty
          },
          apply ({ doc, docChanged }) {
            const { searchTerm, searchResultClass, disableRegex, caseSensitive } = extensionThis

            if (docChanged || searchTerm) {
              const { decorationsToReturn, results } = processSearches(doc, regex(searchTerm, disableRegex, caseSensitive), searchResultClass)

              extensionThis.results = results

              return decorationsToReturn
            }
            return DecorationSet.empty
          }
        },
        props: {
          decorations (state) {
            return this.getState(state)
          }
        }
      })
    ]
  }
})
