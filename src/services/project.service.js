import $axios from '@/core/api-config'

class ProjectService {
  getProjectById (id) {
    return $axios.get(`/api/projects/project/${id}`)
  }

  getAll () {
    return $axios.get('/api/projects/')
  }

  getDeleted () {
    return $axios.get('/api/projects/deleted')
  }

  add (data) {
    return $axios.post('/api/projects/', data)
  }

  delete (id) {
    return $axios.delete(`/api/projects/${id}`, { data: { permanent: false } })
  }

  permanentDelete (id) {
    return $axios.delete(`/api/projects/${id}`, { data: { permanent: true } })
  }

  edit (id, data) {
    return $axios.put(`/api/projects/${id}`, data)
  }

  editSharedProject (projectId, shareId, data) {
    return $axios.put(`/api/projects/${projectId}/${shareId}`, data)
  }

  restore (id) {
    return $axios.post(`/api/projects/restore/${id}`)
  }

  getSharedProject (projectId, shareId) {
    return $axios.get(`api/projects/${projectId}/${shareId}`)
  }

  getShareByProjectId (id) {
    return $axios.get(`api/share/project/${id}`)
  }

  getShare (id) {
    return $axios.get(`/api/share/${id}`)
  }

  postShare (data) {
    return $axios.post(`/api/share/${data.projectId}`, data)
  }

  send (data) {
    return $axios.post('/api/projects/email', data)
  }

  sendShared (data) {
    return $axios.post('/api/projects/email/share', data)
  }

  order (ids) {
    return $axios.post('/api/projects/order/', { ids })
  }

  exportDocx (id, html) {
    return $axios.post(`/api/projects/export/docx/${id}`, { html })
  }

  exportPdf (id, html) {
    return $axios.post(`/api/projects/export/pdf/${id}`, { html }, { responseType: 'blob' })
  }

  exportSharedProjectAsPdf (id, shareId, html) {
    return $axios.post(`/api/projects/export/pdf/${id}/${shareId}`, { html }, { responseType: 'blob' })
  }

  exportSharedProjectAsDocx (id, shareId, html) {
    return $axios.post(`/api/projects/export/docx/${id}/${shareId}`, { html })
  }

  getSize (id) {
    return $axios.get(`/api/projects/size/${id}`)
  }

  getSizeOfSharedProject (id, shareId) {
    return $axios.get(`/api/projects/size/${id}/${shareId}`)
  }
}

export const projectService = new ProjectService()
