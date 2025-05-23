import $axios from '@/core/api-config'
import { stringifyParams } from '@/core/helper-functions'

const createQuery = ({ projectId, taskId }) => {
  return projectId
    ? `projectId=${projectId}`
    : taskId
      ? `taskId=${taskId}`
      : ''
}

class AttachmentService {
  updateStatus (attachmentId, statusId) {
    return $axios.patch(`/api/attachments/${attachmentId}`, { status: statusId })
  }

  upload ({ projectId, taskId, data, bookId, isTaskThumbnail = false, showInCard = false, showInModal = false }) {
    const query = createQuery({ projectId, taskId })
    const { token } = useAuth()
    let bookIdQuery = bookId ? `bookId=${bookId}` : ''

    if (taskId && isTaskThumbnail) bookIdQuery += `&isTaskThumbnail=${isTaskThumbnail}&showInCard=${showInCard}&showInModal=${showInModal}`

    const headers = {
      'Content-Type': 'multipart/form-data',
      auth: token.value
    }

    return $axios.post(`/api/attachments/upload?${query}&${bookIdQuery}`, data, headers)
  }

  uploadShared (projectId, shareId, data, bookId) {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    const bookIdQuery = bookId ? `?bookId=${bookId}` : ''

    return $axios.post(`/api/attachments/share/${projectId}/${shareId}${bookIdQuery}`, data, headers)
  }

  createFile ({ projectId, taskId, bookId, files, showInFileManager = true } = {}) {
    const bookIdQuery = bookId ? `bookId=${bookId}` : ''
    const query = createQuery({ projectId, taskId })

    return $axios.post(`/api/attachments/file?${query}&${bookIdQuery}`, { files, showInFileManager })
  }

  createFileShared ({ projectId, shareId, name, mimeType, size, bookId }) {
    const bookIdQuery = bookId ? `?bookId=${bookId}` : ''
    return $axios.post(`/api/attachments/file/share/${projectId}/${shareId}${bookIdQuery}`, { name, mimeType, size })
  }

  updateFile ({ projectId, taskId, url, id, bookId, key }) {
    return $axios.put(`/api/attachments/file/${id}`,
      {
        url,
        keyForGettingExternalVersionId: key
      },
      {
        params: {
          bookId,
          projectId,
          taskId
        }
      })
  }

  updateFileShared ({ projectId, shareId, url, id, bookId }) {
    return $axios.put(`/api/attachments/file/share/${id}/${projectId}/${shareId}`,
      {
        url,
        keyForGettingExternalVersionId: key
      },
      {
        params: {
          bookId
        }
      }
    )
  }

  deleteOrRestore ({ projectId, taskId, ids }) {
    const query = createQuery({ projectId, taskId })

    return $axios.post(`/api/attachments/delete-restore?${query}`, { ids })
  }

  deleteTaskThumbnail ({ taskId, id }) {
    return $axios.post(`/api/attachments/delete-task-thumbnail?taskId=${taskId}`, { id })
  }

  proxy (url) {
    return $axios.get(`/api/attachments/proxy?url=${url}&responseType=blob`, { responseType: 'blob' })
  }

  getFile ({ id, projectId, taskId }) {
    return $axios.get(`/api/attachments/file/${id}`,
      { params: stringifyParams({ projectId, taskId }) })
  }

  getShareFile ({ id, projectId, shareId }) {
    return $axios.get(`/api/attachments/file/${id}/${projectId}/${shareId}`)
  }

  getFilesForManager ({ bookIds, limit, search = '' }) {
    const filters = { books: bookIds, limit, search }
    return $axios.get('/api/attachments/files', { params: stringifyParams(filters) })
  }

  updateName ({ name, id }) {
    return $axios.put(`/api/attachments/update-name/${id}`, { name })
  }

  deleteFromManager (id) {
    return $axios.delete(`/api/attachments/delete-file/${id}`)
  }

  deleteCompletely (id) {
    return $axios.delete(`/api/attachments/files?ids=${id}&permanent=true`)
  }

  setNewVersion ({ name, size, originalId }) {
    return $axios.post('/api/attachments/versions', { name, size, originalId })
  }

  order (attachmentIds) {
    return $axios.put('/api/attachments/orders', { attachmentIds })
  }
}

export const attachmentService = new AttachmentService()
