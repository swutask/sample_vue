import $axios from '@/core/api-config'

class ChatService {
  addMessage ({ chatId, bookId, text, projectId, taskId, attachmentIds, replyId, resolvedAt, threadId }) {
    const bookQuery = bookId ? `?bookId=${bookId}` : ''
    return $axios.post(`/api/chats/message/${chatId}${bookQuery}`, { text, projectId, taskId, attachmentIds, replyId, resolvedAt, threadId })
  }

  getReactions () {
    return $axios.get('/api/reactions')
  }

  getMessages ({ chatId, bookId = null, page, limit = 50, threadId = null }) {
    return $axios.get(`/api/chats/messages/${chatId}`, {
      params: {
        bookId,
        page,
        limit,
        threadId
      }
    })
  }

  updateMessage ({ id, chatId, bookId, text, replyId, resolvedAt, attachmentIds, attachments }: IUpdateMessage) {
    const bookQuery = bookId ? `?bookId=${bookId}` : ''
    return $axios.put(`/api/chats/updateMessage/${id}/${chatId}${bookQuery}`, { text, replyId, resolvedAt, attachmentIds, attachments })
  }

  deleteMessage ({ id, chatId, bookId }) {
    const bookQuery = bookId ? `?bookId=${bookId}` : ''
    return $axios.delete(`/api/chats/deleteMessage/${id}/${chatId}${bookQuery}`)
  }

  deleteAttachments (ids: number[]) {
    return $axios.delete(`/api/attachments/files?ids=${ids}`)
  }

  updateMessageStatus (chatId: number) {
    return $axios.put(`/api/chats/status/${chatId}`)
  }

  updateMutedAt ({ chatId, mutedAt }) {
    return $axios.put(`/api/chats/mute/${chatId}`, { mutedAt })
  }

  getPrivateChats () {
    return $axios.get('api/chats/private')
  }

  createPrivateChat (memberId) {
    return $axios.post('api/chats/private', { memberId })
  }

  addChatReaction ({ messageId, reactionId }) {
    return $axios.post(`api/chats/messages/${messageId}/reactions/${reactionId}`)
  }

  deleteChatReaction ({ messageId, reactionId }) {
    return $axios.delete(`api/chats/messages/${messageId}/reactions/${reactionId}`)
  }

  search (text: string, chatId: number) {
    return $axios.get(`/api/search/chat/${chatId}?query=${text}`)
  }

  createAnnotation (payload: IAnnotationPayload, attachmentId: number, chatId: number) {
    return $axios.post(`/api/attachments/${attachmentId}/chats/${chatId}/messages/annotations`, payload)
  }

  updateAnnotation (payload: IUpdateAnnotation, annotationId: number) {
    return $axios.patch(`/api/attachments/annotations/${annotationId}`, payload)
  }

  resolveMessage (messageId: number) {
    return $axios.post(`/api/chats/messages/${messageId}/resolve`)
  }

  unresolveMessage (messageId: number) {
    return $axios.delete(`/api/chats/messages/${messageId}/resolve`)
  }

  getUnreadCount () {
    return $axios.get('/api/chats/messages/unread-count')
  }
}

export const chatService = new ChatService()
