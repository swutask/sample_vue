import $axios from '@/core/api-config'
import { stringifyParams } from '@/core/helper-functions'

class TaskService {
  getAll (data: IGetTask) {
    return $axios.get('/api/tasks/all', {
      params: stringifyParams(data)
    })
  }

  getCalendarTasks () {
    return $axios.get('api/tasks/google-calendar-events')
  }

  updateFilters (payload: IFilters, bookId?: number) {
    return $axios.patch('/api/filters', {
      taskFilter: JSON.stringify(payload)
    }, {
      params: stringifyParams(
        {
          bookId
        }
      )
    })
  }

  getFilters () {
    return $axios.get('/api/filters')
  }

  getTaskById (id: number) {
    return $axios.get(`/api/tasks/${id}`)
  }

  create (data: ICreateTask) {
    return $axios.post(`/api/tasks/task/${data.bookId}`, data)
  }

  complete ({ id, bookId }) {
    return $axios.post(`/api/tasks/complete/${id}/${bookId}`)
  }

  assignMember ({ id, bookId, memberIds }) {
    const memberIdsQuery = memberIds.join(',')
    return $axios.post(`/api/tasks/assign/${id}/${bookId}`, { memberId: memberIdsQuery })
  }

  unassignMember ({ id, bookId, memberIds }) {
    const memberIdsQuery = memberIds.join(',')
    return $axios.delete(`/api/tasks/assign/${id}/${bookId}?memberIds=${memberIdsQuery}`)
  }

  duplicate ({ id, bookId }) {
    return $axios.post(`/api/tasks/duplicate/${id}/${bookId}`)
  }

  delete ({ id, bookId }) {
    return $axios.delete(`/api/tasks/task/${id}/${bookId}`)
  }

  update ({
    id, title, subTitle, additionalInfo, isUrgent, isCompleted,
    taskRowId, projectId, bookId, endDate, startDate, urgentStatus, rrule, storyPoints
  }) {
    return $axios.put(`/api/tasks/task/${id}/${bookId}`, {
      title,
      subTitle,
      additionalInfo,
      isUrgent,
      isCompleted,
      taskRowId,
      projectId,
      endDate,
      startDate,
      urgentStatus,
      rrule,
      storyPoints
    })
  }

  updatePreview ({ id, bookId, imageId, showInModal, showInCard }: IUpdatePreview) {
    return $axios.put(`/api/tasks/preview-image/${id}/${bookId}`, { showInModal, showInCard, imageId })
  }

  order ({ ids, bookId }) {
    return $axios.post(`/api/tasks/order/task/${bookId}`, { ids })
  }

  homeOrder (ids: number[]) {
    return $axios.post('/api/tasks/home-order', { ids })
  }

  getTaskTags (bookIds: number[]) {
    const booksQuery = bookIds.join(',')
    return $axios.get(`/api/tasks/tags?books=${booksQuery}`)
  }

  toggleTaskTag ({ tagId, taskId, bookId }) {
    return $axios.post(`/api/tasks/tag/${tagId}/${taskId}/${bookId}`)
  }

  deleteTaskTags ({ taskId, bookId, tagIds }: { taskId: number; bookId: number; tagIds: number[]}) {
    const tagIdsQuery = tagIds.join(',')
    return $axios.delete(`api/tasks/tag/${taskId}/${bookId}?tagIds=${tagIdsQuery}`)
  }

  updateTaskTag ({ name, id, bookId }) {
    return $axios.put(`/api/tasks/tag/${id}/${bookId}`, { name })
  }

  changeBook ({ taskId, oldBookId, newBookId }) {
    return $axios.post(`api/tasks/move-to/${taskId}/${oldBookId}`, { newBookId })
  }

  getRows ({ bookId }) {
    return $axios.get(`/api/tasks/rows/${bookId}`)
  }

  createRow ({ title, color, bookId }) {
    return $axios.post(`/api/tasks/row/${bookId}`, { title, color })
  }

  deleteRow ({ id, bookId }) {
    return $axios.delete(`/api/tasks/row/${id}/${bookId}`)
  }

  clearCompleted ({ taskIds, bookId }) {
    const taskId = taskIds ? `?taskIds=${taskIds.join(',')}` : ''
    return $axios.delete(`/api/tasks/books/${bookId}${taskId}`)
  }

  updateRow ({ id, title, color, bookId }) {
    return $axios.put(`/api/tasks/row/${id}/${bookId}`, { title, color })
  }

  orderRow ({ ids, bookId }) {
    return $axios.post(`/api/tasks/order/row/${bookId}`, { ids })
  }

  subscribe (taskId: number) {
    return $axios.post(`/api/tasks/${taskId}/subscription`)
  }

  unsubscribe (taskId: number) {
    return $axios.delete(`/api/tasks/${taskId}/subscription`)
  }

  undoMoveTo (taskId: number) {
    return $axios.delete(`/api/tasks/${taskId}/move-to`)
  }
}

export const taskService = new TaskService()
