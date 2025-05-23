import $axios from '@/core/api-config'

class ProfileService {
  profile () {
    return $axios.get('/api/profile')
  }

  update (data) {
    return $axios.post('/api/profile', data)
  }

  delete (isRestore) {
    return $axios.delete('/api/profile', { data: { isRestore } })
  }

  restore (user) {
    return $axios.post('/api/profile/restore', { email: user.email, password: user.password })
  }

  uploadAvatar (file) {
    const { token } = useAuth()

    const headers = {
      'Content-Type': 'multipart/form-data',
      auth: token.value
    }

    return $axios.post('/api/profile/avatar', file, headers)
  }

  updateOnboarding (data) { // DEPRECATED
    return $axios.post('/api/profile/onboarding', data)
  }

  getQuickThoughts () {
    return $axios.get('/api/profile/quick-thoughts')
  }

  updateQuickThoughts (text) {
    return $axios.put('/api/profile/quick-thoughts', { text })
  }
}

export const profileService = new ProfileService()
