import $axios from '@/core/api-config'
import { stringifyParams } from '@/core/helper-functions'

class PerspectiveService {
  getPerspectives () {
    return $axios.get('/api/filters')
  }

  createPerspective (data: ICreatePerspective) {
    return $axios.post('/api/filters', {
      name: data.name,
      bookId: data.bookId,
      taskFilter: JSON.stringify(data.taskFilter)
    })
  }

  updatePerspectives (data: IUpdatePerspective) {
    return $axios.patch('/api/filters', {
      id: data.id,
      name: data.name,
      taskFilter: JSON.stringify(data.taskFilter)
    }, {
      params: stringifyParams(
        {
          bookId: data.bookId
        }
      )
    })
  }

  deletePerspective (filterId: number) {
    return $axios.delete(`/api/filters/${filterId}`)
  }
}

export const perspectiveService = new PerspectiveService()
