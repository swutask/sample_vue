import { Extension } from '@tiptap/core'
import { yCursorPlugin } from 'y-prosemirror'

const awarenessStatesToArray = (states) => {
  return Array.from(states.entries()).map(([key, value]) => {
    return {
      clientId: key,
      ...value.user
    }
  })
}

const defaultOnUpdate = () => null

export const CollaborationCursor = Extension.create({
  name: 'collaborationCursor',

  addOptions () {
    return {
      provider: null,
      user: {
        name: null,
        color: '#000000',
        userColor: 'aquamarine',
        avatar: null
      },
      render: user => {
        const cursor = document.createElement('span')
        const color = user.userColor

        cursor.classList.add('collaboration-cursor__caret')

        const label = document.createElement('div')
        const labelGradient = document.createElement('span')
        const avatar = document.createElement('img')
        const labelInitials = document.createElement('span')

        labelGradient.classList.add('collaboration-cursor__label-gradient')
        labelInitials.classList.add('collaboration-cursor__label-initials')
        avatar.classList.add('collaboration-cursor__avatar')
        avatar.setAttribute('src', user.avatar)

        labelGradient.setAttribute('style', `background: ${color}`)

        labelInitials.insertBefore(document.createTextNode(user.name.slice(0, 1)), null)

        label.classList.add('collaboration-cursor__label')

        if (user.avatar) {
          labelGradient.insertBefore(avatar, null)
        } else {
          labelGradient.insertBefore(labelInitials, null)
        }

        label.insertBefore(labelGradient, null)
        label.insertBefore(document.createTextNode(user.name), null)
        cursor.insertBefore(label, null)

        return cursor
      },
      onUpdate: defaultOnUpdate
    }
  },

  onCreate () {
    if (this.options.onUpdate !== defaultOnUpdate) {
      console.warn('[tiptap warn]: DEPRECATED: The "onUpdate" option is deprecated. Please use `editor.storage.collaborationCursor.users` instead. Read more: https://tiptap.dev/api/extensions/collaboration-cursor')
    }
  },

  addStorage () {
    return {
      users: []
    }
  },

  addCommands () {
    return {
      updateUser: attributes => () => {
        this.options.user = attributes

        this.options.provider.awareness.setLocalStateField('user', this.options.user)

        return true
      },
      user: attributes => ({ editor }) => {
        console.warn('[tiptap warn]: DEPRECATED: The "user" command is deprecated. Please use "updateUser" instead. Read more: https://tiptap.dev/api/extensions/collaboration-cursor')

        return editor.commands.updateUser(attributes)
      }
    }
  },

  addProseMirrorPlugins () {
    return [
      yCursorPlugin(
        (() => {
          this.options.provider.awareness.setLocalStateField('user', this.options.user)

          this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states)

          this.options.provider.awareness.on('update', () => {
            this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states)
          })

          return this.options.provider.awareness
        })(), { cursorBuilder: this.options.render }
      )
    ]
  }
})
