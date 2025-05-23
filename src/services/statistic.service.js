import $axios from '@/core/api-config'

class StatisticService {
  getStatistic ({ limit, page, orderColumn, orderDirection }) {
    return $axios.get(`api/statistic?limit=${limit}&page=${page}&orderColumn=${orderColumn}&orderDirection=${orderDirection}`)
  }
}

export const statisticService = new StatisticService()
