const useChatStore = defineStore('chat', () => {
  const messages = ref({})
  const countMessages = ref({})
  const hasUnreadMessages = ref(false)
  const unreadMessageCount = ref(0)
  const chatMutedAt = ref(null)
  const messageReactions = ref([])
  const threadMessages = ref<IMessage[]>([])
  const threadReactions = ref<IReaction[]>([])
  const hoveredAnnotation = ref<IHoveredAnnotation>(null)
  const newAnnotation = ref(null as IAnnotationPayload | null)
  const privateChats = ref<IPrivateChat[]>([])
  const reactions = ref<IReaction[]>([])

  async function getReactions () {
    const { data } = await chatService.getReactions()
    reactions.value = data.reactions
  }

  function setNewAnnotationCoordinates (x: number, y: number) {
    newAnnotation.value = { x, y, text: newAnnotation.value ? newAnnotation.value.text : '' }
  }

  function setHoveredAnnotation (value: number | null, pointHover: boolean) {
    hoveredAnnotation.value = { id: value, pointHover }
  }

  async function getThread (threadId: number, chatId: number) {
    try {
      const { data } = await chatService.getMessages({ threadId, chatId, page: 0 })
      threadMessages.value = [...threadMessages.value, ...data.messages]
      threadReactions.value = [...threadReactions.value, ...data.reactions]
    } catch (e) {
      console.log(e)
    }
  }

  function deleteThreadMessage (event: number) {
    threadMessages.value = threadMessages.value.filter((item) => item.id !== event)
  }

  function updateThreadMessage (event) {
    threadMessages.value = threadMessages.value.map(threadMessage => {
      if (threadMessage.id === event.id) {
        return {
          ...threadMessage,
          text: event.text,
          attachments: event.attachments
        }
      }
      return threadMessage
    })
  }

  function handleAddMessage (value: {id: number; message: IMessage}) {
    messages.value[value.message.chatId] = messages.value[value.message.chatId]?.map((item) => item.id === value.id ? value.message : item)
  }

  function addThreadMessage (event: IMessage) {
    threadMessages.value.unshift(event)
  }

  function setMessage (value: IMessage) {
    const localMessages = messages.value[value.chatId] || []

    localMessages.push(value)

    messages.value[value.chatId] = localMessages

    if (value.messageStatus?.status === 'unread') {
      hasUnreadMessages.value = true
    }
  }

  function setMessages (value) {
    if (value.messages.some(item => item.messageStatus?.status === 'unread')) {
      hasUnreadMessages.value = true
    }
    messages.value[value.messages?.[0]?.chatId] = value.messages.reverse()

    countMessages.value[value.messages?.[0]?.chatId] = value.count

    messageReactions.value = value.reactions
  }

  function updateMessageSendStatus ({ oldId, newId, chatId }) {
    const localMessages = messages.value[chatId] || []

    const message = localMessages.find(item => item.id === oldId)

    if (message) {
      message.id = newId
    }
  }

  function updateChatMutedAt (value) {
    chatMutedAt.value = value
  }

  async function updateAnnotation (message, value: IUpdateAnnotation, annotationId: number) {
    await chatService.updateAnnotation(value, annotationId)
    handleUpdateMessage(message)

    return { id: annotationId }
  }

  async function resolveMessage (message, messageId: number) {
    const toggleCondition = message.annotation ? !message.annotation.resolvedAt : !message.resolvedAt
    const toggleResolveMessage = toggleCondition
      ? chatService.unresolveMessage(messageId)
      : chatService.resolveMessage(messageId)

    await toggleResolveMessage

    handleUpdateMessage(message)

    return { id: messageId }
  }

  function handleUpdateMessage (value) {
    messages.value[value.chatId] = messages.value[value.chatId]?.map(item => {
      if (item.id === value.id) {
        return {
          ...item,
          ...value
        }
      }
      return item
    }) || []
  }

  function handleDeleteMessage (value) {
    messages.value[value.chatId] = messages.value[value.chatId]?.filter((item: IMessage) => item.id !== value.id)
  }

  async function addMessage ({ chatId, bookId, text, projectId, id, taskId, attachmentIds, attachments, replyId, resolvedAt, threadId }) {
    const { data } = await chatService.addMessage({ chatId, bookId, text, projectId, taskId, attachmentIds, replyId, resolvedAt, threadId })

    handleAddMessage({
      id,
      message: {
        ...data,
        attachments
      }
    })
    return data
  }

  function searchInChat (text: string, chatId: number) {
    return chatService.search(text, chatId)
  }

  function getMessages ({ chatId, bookId = null, page = 0 }) {
    return chatService.getMessages({ chatId, bookId, page })
      .then(({ data }) => setMessages(data))
  }

  function fetchMessages ({ chatId, bookId, page = 0 }) {
    return chatService.getMessages({ chatId, bookId, page })
      .then(({ data }) => {
        const localMessages = messages.value[chatId] || []

        localMessages.unshift(...data.messages.reverse())

        messages.value[chatId] = localMessages

        return data.messages
      })
  }

  async function updateMessage (value: IUpdateMessage) {
    handleUpdateMessage(value)
    await chatService.updateMessage(value)

    return { id: value.id }
  }

  async function deleteMessage ({ chatId, bookId, id }) {
    await chatService.deleteMessage({ chatId, bookId, id })
    handleDeleteMessage({ id, chatId })
  }

  function updateMessageStatus (chatId: number) {
    chatService.updateMessageStatus(chatId)
      .then(() => (hasUnreadMessages.value = false))
  }

  function handleToggleReaction ({ messageId, reactionId, userId, user, isSelected }) {
    if (isSelected) {
      const index = messageReactions.value.findIndex(item => item.userId === userId && item.messageId === messageId)
      messageReactions.value.splice(index, 1)
    } else {
      const reactions = messageReactions.value

      reactions.push({
        messageId,
        id: Math.random(),
        reactionId,
        user,
        userId
      })
      messageReactions.value = reactions
    }
  }

  function handleToggleThreadReaction ({ messageId, reactionId, userId, user, isSelected }) {
    if (isSelected) {
      const index = threadReactions.value.findIndex(item => item.userId === userId && item.messageId === messageId)
      threadReactions.value.splice(index, 1)
    } else {
      const reactions = threadReactions.value
      reactions.push({
        messageId,
        id: Math.random(),
        reactionId,
        user,
        userId
      })

      threadReactions.value = reactions
    }
  }

  function toggleChatReaction ({ messageId, reactionId, userId, user, isSelected }) {
    handleToggleReaction({ messageId, reactionId, userId, user, isSelected })

    if (isSelected) {
      chatService.deleteChatReaction({ messageId, reactionId })
    } else {
      chatService.addChatReaction({ messageId, reactionId })
    }
  }

  function toggleThreadReaction ({ messageId, reactionId, userId, user, isSelected }) {
    handleToggleThreadReaction({ messageId, reactionId, userId, user, isSelected })

    if (isSelected) {
      chatService.deleteChatReaction({ messageId, reactionId })
    } else {
      chatService.addChatReaction({ messageId, reactionId })
    }
  }

  async function createAnnotation (payload: IAnnotationPayload, attachmentId: number, chatId: number) {
    await chatService.createAnnotation(payload, attachmentId, chatId)
      .then(({ data }) => setMessage(data.messages))
  }

  function getUnreadMessageCount () {
    chatService.getUnreadCount()
      .then(({ data }) => {
        unreadMessageCount.value = data.unreadCount
      }).catch((err) => {
        console.log(err)
      })
  }

  async function getPrivateChats () {
    const { data } = await chatService.getPrivateChats()
    privateChats.value = data.privateChats
      .sort((a, b) => a.opponent.profile.firstName.localeCompare(b.opponent.profile.firstName))
    return data
  }

  async function addPrivateChat (userId: number) {
    const { data }: {data: IPrivateChat} = await chatService.createPrivateChat(userId)

    privateChats.value.push(data)
    return data
  }

  return {
    messages,
    countMessages,
    hasUnreadMessages,
    chatMutedAt,
    messageReactions,
    threadMessages,
    newAnnotation,
    hoveredAnnotation,
    unreadMessageCount,
    privateChats,
    reactions,

    addMessage,
    setMessage,
    setMessages,
    getMessages,
    fetchMessages,
    updateMessage,
    deleteMessage,
    handleAddMessage,
    updateChatMutedAt,
    toggleChatReaction,
    toggleThreadReaction,
    handleDeleteMessage,
    updateMessageStatus,
    handleUpdateMessage,
    handleToggleReaction,
    updateMessageSendStatus,
    searchInChat,
    getThread,
    addThreadMessage,
    updateThreadMessage,
    deleteThreadMessage,
    createAnnotation,
    setHoveredAnnotation,
    updateAnnotation,
    setNewAnnotationCoordinates,
    resolveMessage,
    getUnreadMessageCount,
    getPrivateChats,
    addPrivateChat,
    threadReactions,
    getReactions
  }
})

export function useChat () {
  const store = useChatStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
