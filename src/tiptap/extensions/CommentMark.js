import { Mark } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

const getCommentNode = (node, cb) => {
  if (!node || node.classList.contains('ProseMirror')) return

  if (node.getAttribute('commentid')) {
    cb(node)
  } else {
    getCommentNode(node.parentNode, cb)
  }
}

export const CommentMark = Mark.create({
  name: 'commentMark',
  inclusive: false,

  addAttributes () {
    return {
      id: {
        default: null,
        parseHTML: element => ({ id: element.getAttribute('commentid') }),
        renderHTML: attrs => attrs.commentid ? { id: attrs.commentid } : {}
      },
      commentid: {
        default: null,
        parseHTML: element => ({ commentid: element.getAttribute('commentid') }),
        renderHTML: attrs => attrs.commentid ? { commentid: attrs.commentid } : {}
      },
      comments: {
        default: null,
        parseHTML: element => ({ comments: element.getAttribute('comments') }),
        renderHTML: attrs => attrs.comments ? { comments: attrs.comments } : {}
      }
    }
  },

  parseHTML () {
    return [
      {
        priority: 51,
        tag: 'span[comments]',
        getAttrs: dom => ({
          id: dom.getAttribute('id'),
          comments: dom.getAttribute('comments'),
          commentid: dom.getAttribute('commentid')
        })
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['span', {
      id: HTMLAttributes.id,
      comments: HTMLAttributes.comments,
      commentid: HTMLAttributes.commentid,
      class: 'comment'
    }, 0]
  },

  addCommands () {
    return {
      addComment: attributes => ({ commands }) => {
        commands.setMark('commentMark', attributes)
      },

      updateComment: ({ from, to, attrs }) => ({ commands }) => {
        commands.setTextSelection({ from, to })
        commands.unsetMark('commentMark')
        commands.setMark('commentMark', attrs)
      },

      removeComment: ({ from, to } = {}) => ({ commands }) => {
        if (from && to) commands.setTextSelection({ from, to })
        commands.unsetMark('commentMark')
      }
    }
  },

  addProseMirrorPlugins () {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            mouseover (_, event) {
              const mark = event.target

              if (mark?.getAttribute('commentid')) {
                const id = mark.getAttribute('commentid')
                const node = document.querySelector(`span[contentid='${id}']`)

                node.children[0].style.opacity = 1

                const removeOpacity = () => {
                  node.children[0].style.removeProperty('opacity')
                  mark.removeEventListener('mouseleave', removeOpacity)
                }

                mark.addEventListener('mouseleave', removeOpacity)
              }
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          handleClickOn: (view, pos, node, nodePos, event) => {
            view.dispatch(view.state.tr.scrollIntoView())

            const mark = event.target

            getCommentNode(mark, el => {
              if (el?.getAttribute('commentid')) {
                event.stopPropagation()

                const id = el.getAttribute('commentid')
                const node = document.querySelector(`span[contentid='${id}']`)

                if (node && typeof node.click === 'function') {
                  setTimeout(() => {
                    node.click()
                  }, 10)
                  return false
                }
              }
            })

            return false
          }
        }
      })
    ]
  }
})
