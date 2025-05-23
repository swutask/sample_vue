import $axios from '@/core/api-config'

class CollaborationService {
  getJWTForProject (id: number, bookId: number) {
    return $axios.get(`/api/collaborations/book/${bookId}/project/${id}`)
  }

  getJWTForSharedProject (id: number, shareId: string) {
    return $axios.get(`/api/collaborations/share/${shareId}/project/${id}`)
  }

  getJWTForTask (id: number, bookId: number) {
    return $axios.get(`/api/collaborations/book/${bookId}/task/${id}`)
  }
}

export const collaborationService = new CollaborationService()
