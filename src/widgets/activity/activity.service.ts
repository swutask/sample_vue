import $axios from '@/core/api-config'

const defaultLimit = 50

class ActivityService {
  getTaskActivities (taskId: number, limit = defaultLimit) {
    return $axios.get(`/api/tasks/${taskId}/activities?limit=${limit}`)
  }

  clearInboxActivity (type: 'public' | 'private') {
    return $axios.delete(`api/inboxes/activities?type=${type}`)
  }

  deleteNotifications () {
    return $axios.delete('api/notifications/')
  }

  getBookActivities (bookId: number, limit = defaultLimit) {
    return $axios.get(`/api/books/${bookId}/activities?limit=${limit}`)
  }

  getInboxActivities (type: string, limit = defaultLimit) {
    return $axios.get(`api/inboxes/activities?limit=${limit}&type=${type}`)
  }

  deleteInbox (inboxActivityId: number) {
    return $axios.delete(`api/inboxes/activities/${inboxActivityId}`)
  }

  updateInboxNotificationsStatus ({ status = 'read', inboxActivityIds }) {
    return $axios.patch('api/inboxes/activities', { status, inboxActivityIds })
  }
}

export const activityService = new ActivityService()
