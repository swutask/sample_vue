import { VueRenderer } from '@tiptap/vue-3'
import tippy, { sticky } from 'tippy.js'

import MentionList from '@/components/mention/MentionList.vue'
interface IAttrs {
  projectId?: number
  bookId?: number
  chatId?: number
  taskId?: number
  sendImmediately?: boolean
  editorClass?: string
  editorId?: string
  allowAllUsers?: boolean
  selectMention?: (data: any) => void
}

export default (attrs: IAttrs) => {
  const {
    projectId = null,
    bookId = null,
    chatId = null,
    taskId = null,
    sendImmediately = true,
    editorClass = 'editor',
    // editorId = 'editor',
    allowAllUsers = false,
    selectMention
  } = attrs

  const { members } = useTeam()
  const { books, bookMembers } = useBook()

  return {
    items: async ({ query }) => {
      const currBook = books.value.find(b => b.id === bookId)
      let otherMentions = []

      if (bookId) {
        const res = await searchService.searchMentions({
          query,
          bookId
        })
        otherMentions = res.data.result.reduce((accumulator, item) => {
          accumulator.push({
            uuid: window.crypto.randomUUID(),
            id: item._id,
            label: item._index,
            icon: item._source.icon,
            start: item._source.start,
            bookId: item._source.bookId,
            parentId: item._source.parentId,
            resolvedAt: item._source.resolvedAt,
            title: item._source.title || item._source.name
          })
          return accumulator
        }, [])
      }

      let users = !currBook ? [] : currBook?.shareWith || bookMembers.value

      if (allowAllUsers) {
        users = members.value
      }

      const mappedUsers = users.map((u) => ({
        ...u,
        label: 'users',
        title: u.firstName,
        lastName: u.lastName,
        projectId,
        chatId,
        taskId,
        bookId,
        sendImmediately
      })).filter(item => item?.title.toLowerCase().match(query.toLowerCase()) || item?.lastName?.toLowerCase().match(query.toLowerCase()))

      return [...mappedUsers, ...otherMentions]
    },

    render: () => {
      let component
      let popup

      return {
        onStart: props => {
          component = new VueRenderer(MentionList, {
            props: {
              ...props,
              selectMention
            },
            editor: props.editor
          })

          if (!props.clientRect) {
            return
          }

          // const el = document.getElementById(editorId)

          popup = tippy(`.${editorClass}`, {
            getReferenceClientRect: props.clientRect,
            // appendTo: () => el,
            appendTo: () => document.body,
            // strategy: 'fixed',
            content: component.element,
            sticky: true, // make sure position of tippy is updated when content changes
            plugins: [sticky],
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
            inertia: true,
            duration: [400, 200]
          })
        },

        onUpdate (props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect
          })
        },

        onKeyDown (props) {
          if (props.event.key === 'Escape') {
            popup[0].hide()

            return true
          }

          return component.ref?.onKeyDown(props)
        },

        onExit () {
          popup[0].destroy()
          // component.destroy()
        }
      }
    }
  }
}
