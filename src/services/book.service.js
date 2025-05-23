import $axios from '@/core/api-config'
import icons from '@/core/icons'

class BookService {
  getBooks () {
    return $axios.get('/api/books/')
  }

  getBookProjects (id) {
    return $axios.get(`/api/books/${id}/projects`)
  }

  getBookById (id) {
    return $axios.get(`/api/books/book/${id}`)
  }

  getDeleted () {
    return $axios.get('/api/books/deleted')
  }

  create (data, isTeam = false) {
    const randomIcon = isTeam ? icons.getRandomColorIcon() : icons.getBookIcon()
    data.icon = data.icon || randomIcon
    return $axios.post('/api/books/', data)
  }

  createSection (title) {
    return $axios.post('/api/books/section', { title, icon: 'default-phoenix' })
  }

  duplicateBook (id) {
    return $axios.post(`/api/books/duplicate/${id}`)
  }

  delete (id) {
    return $axios.delete(`/api/books/${id}`, { data: { permanent: false } })
  }

  permanentDelete (id) {
    return $axios.delete(`/api/books/${id}`, { data: { permanent: true } })
  }

  update (value) {
    return $axios.put(`/api/books/${value.id}`, {
      title: value.title,
      subTitle: value.subTitle,
      color: value.color,
      icon: value.icon,
      favorite: value.favorite,
      archivedAt: value.archivedAt,
      bookFolderId: value.bookFolderId
    })
  }

  restore (id) {
    return $axios.post(`/api/books/restore/${id}`)
  }

  order (ids) {
    return $axios.post('/api/books/order/', { ids })
  }

  mentionMember (payload) {
    return $axios.post(`/api/books/mention/${payload.memberId}/${payload.bookId}`,
      { message: payload.message?.slice(0, 255) },
      {
        params: {
          projectId: payload.projectId,
          chatId: payload.chatId,
          commentId: payload.commentId,
          taskId: payload.taskId
        }
      })
  }

  createFolder (payload) {
    return $axios.post('api/books/folders', payload)
  }

  updateFolder (folderId, payload) {
    return $axios.patch(`api/books/folders/${folderId}`, payload)
  }

  deleteFolder (folderId, permanent) {
    return $axios.delete(`api/books/folders/${folderId}`, { data: { permanent } })
  }

  restoreFolder (folderId) {
    return $axios.post(`api/books/folders/${folderId}/restore`)
  }

  getChats () {
    return $axios.get('api/books/chats')
  }
}

export const bookService = new BookService()
