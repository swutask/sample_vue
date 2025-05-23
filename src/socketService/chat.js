import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default () => {
  const { user } = useProfile()
  const {
    setMessage,
    handleDeleteMessage,
    handleUpdateMessage,
    addThreadMessage,
    deleteThreadMessage,
    updateThreadMessage,
    getUnreadMessageCount,
    privateChats
  } = useChat()
  const { bookChats } = useBook()
  const { tasks, handleUpdateTask } = useTask()
  const route = useRoute()

  const isTaskBoard = computed(() => route.name === 'TaskBoard' || route.name === 'TaskBoardTeam')

  function addMessage (parsedData) {
    const message = parsedData.payload.message

    if (isTaskBoard.value) {
      const task = tasks.value.find(t => t.chat?.id === message.chatId)

      if (task) {
        let messages = task.chat.messages || []

        if (messages.some(m => m.id === message.id)) {
          messages = messages.map(item => {
            if (item.id === message.id) return message
            return item
          })
        } else {
          messages.push(message)
        }

        handleUpdateTask({
          ...task,
          id: task.id,
          chat: {
            ...task.chat,
            messages
          }
        })
      }
    }

    if (message.user.id !== user.value.id) {
      setMessage(message)

      getUnreadMessageCount()
    }

    const isBookChat = bookChats.value.find((e) => e.id === message.chatId)

    const isPrivateChat = privateChats.value.find((e) => e.privateChat.chatId === message.chatId)

    if (isBookChat && message.user.id !== user.value.id) {
      bookChats.value = bookChats.value.map((e) => {
        return {
          ...e,
          unreadMessageCount: e.book.id === isBookChat.book.id ? (+e.unreadMessageCount + 1) : e.unreadMessageCount
        }
      })
    }

    if (isPrivateChat && message.user.id !== user.value.id) {
      privateChats.value = privateChats.value.map((e) => {
        return {
          ...e,
          privateChat: e.privateChat.chatId === isPrivateChat.privateChat.chatId
            ? { ...e.privateChat, unreadMessageCount: (+e.privateChat.unreadMessageCount) + 1 }
            : e.privateChat
        }
      })
    }
  }

  function deleteMessage (parsedData) {
    handleDeleteMessage(parsedData.payload.value)

    if (isTaskBoard.value) {
      const task = tasks.value.find(t => t.chat?.id === parsedData.payload.value.chatId)

      if (task) {
        handleUpdateTask({
          ...task,
          id: task.id,
          chat: {
            ...task.chat,
            messages: task.chat.messages?.filter(item => item.id !== parsedData.payload.value.id)
          }
        })
      }
    }
  }

  function updateMessage (parsedData) {
    handleUpdateMessage(parsedData.payload.value)
  }

  function initChat (parsedData) {
    if (parsedData.payload.message?.threadId) {
      if (parsedData.payload.type === 'addMessage') {
        addThreadMessage(parsedData.payload.message)
      } else if (parsedData.payload.type === 'deleteMessage') {
        deleteThreadMessage(parsedData.payload.message)
      } else if (parsedData.payload.type === 'updateMessage') {
        updateThreadMessage(parsedData.payload.message)
      }
    } else {
      if (parsedData.payload.type === 'addMessage') {
        addMessage(parsedData)
      } else if (parsedData.payload.type === 'deleteMessage') {
        deleteMessage(parsedData)
      } else if (parsedData.payload.type === 'updateMessage') {
        updateMessage(parsedData)
      }
    }
  }
  return {
    initChat
  }
}
