import $axios from '@/core/api-config'

class FeatureFlagService {
  getFeatureFlags () {
    return $axios.get('/api/feature-flags')
  }

  createFeatureFlag (name: string, active: boolean) {
    return $axios.post('/api/feature-flags', {
      name,
      active
    })
  }

  updateFeatureFlag (id: number, active: boolean) {
    return $axios.put(`/api/feature-flags/${id}`, { active })
  }

  deleteFeatureFlag (id: number) {
    return $axios.delete(`/api/feature-flags/${id}`)
  }
}

export const featureFlagService = new FeatureFlagService()
