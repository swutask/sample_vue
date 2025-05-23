import $axios from '@/core/api-config'

class InboxService {
  getAll () {
    return $axios.get('/api/notifications')
  }

  getByBookId ({ bookId, limit, page }) {
    return $axios.get(`/api/notifications/latest-activity/${bookId}?limit=${limit}&page=${page}`)
  }

  update ({ ids }) {
    return $axios.put('/api/notifications/', { ids })
  }

  delete ({ id }) {
    return $axios.delete(`/api/notifications/${id}`)
  }

  getInboxes () {
    return $axios.get('api/inboxes')
  }

  updateInboxNotifications (payload) {
    return $axios.patch('api/inboxes', payload)
  }
}

export const inboxService = new InboxService()
