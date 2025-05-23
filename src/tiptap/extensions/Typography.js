import { Extension, textInputRule } from '@tiptap/core'

export const leftArrow = textInputRule({
  find: /<-$/,
  replace: '←'
})

export const rightArrow = textInputRule({
  find: /->$/,
  replace: '→'
})

export const Typography = Extension.create({
  name: 'typography',

  addInputRules () {
    const rules = []

    if (this.options.leftArrow !== false) {
      rules.push(leftArrow)
    }

    if (this.options.rightArrow !== false) {
      rules.push(rightArrow)
    }

    return rules
  }
})
