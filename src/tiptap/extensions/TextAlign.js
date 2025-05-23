import { Extension } from '@tiptap/core'

export const TextAlign = Extension.create({
  name: 'textAlign',

  addOptions () {
    return {
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'left'
    }
  },

  addGlobalAttributes () {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            renderHTML: attributes => ({
              style: `text-align: ${attributes.textAlign}`
            }),
            parseHTML: element => ({
              textAlign: element.style.textAlign || this.options.defaultAlignment
            })
          }
        }
      }
    ]
  },

  addCommands () {
    return {
      /**
       * Set the text align attribute
       */
      setTextAlign: (alignment) => ({ commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false
        }

        return this.options.types.every(type => commands.updateNodeAttributes(type, { textAlign: alignment }))
      },
      /**
       * Unset the text align attribute
       */
      unsetTextAlign: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetNodeAttributes(type, 'textAlign'))
      }
    }
  },

  addKeyboardShortcuts () {
    return {
      'Mod-Shift-l': () => this.editor.commands.setTextAlign('left'),
      'Mod-Shift-e': () => this.editor.commands.setTextAlign('center'),
      'Mod-Shift-r': () => this.editor.commands.setTextAlign('right'),
      'Mod-Shift-j': () => this.editor.commands.setTextAlign('justify')
    }
  }
})
