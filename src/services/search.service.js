import $axios from '@/core/api-config'

class SearchService {
  search ({ query, modelNames }) {
    return $axios.get('/api/search', {
      params: {
        query,
        modelNames: modelNames.join(',')
      }
    })
  }

  searchMentions ({ query, bookId }) {
    return $axios.get(`/api/search/mentions/book/${bookId}`, {
      params: {
        query
      }
    })
  }
}

export const searchService = new SearchService()
