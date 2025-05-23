import $axios from '@/core/api-config'

class SettingsService {
  getSettings () {
    return $axios.get('/api/settings')
  }

  update (data) {
    return $axios.put('/api/settings/', data)
  }
}

export const settingsService = new SettingsService()
