import $axios from '@/core/api-config'

class TemplateService {
  getAll (type: TActiveState) {
    return $axios.get(`/api/templates/?type=${type.toLowerCase()}`)
  }

  add (formData) {
    return $axios.post('/api/templates/', formData)
  }

  delete (id: number) {
    return $axios.delete(`/api/templates/${id}`)
  }

  update ({ id, title, isShared }) {
    return $axios.put(`/api/templates/${id}`, { title, isShared })
  }

  order (ids: number[]) {
    return $axios.post('/api/templates/order/', { ids })
  }

  paste ({ projectId, templateId }) {
    return $axios.post('/api/templates/paste/', { projectId, templateId })
  }
}

export const templateService = new TemplateService()
