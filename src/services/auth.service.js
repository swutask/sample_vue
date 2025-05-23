import $axios from '@/core/api-config'

class AuthService {
  register (payload) {
    return $axios.post('/api/auth/register', payload)
  }

  login (payload) {
    return $axios.post('/api/auth/login', payload)
  }

  logout () {
    return $axios.get('/api/auth/logout')
  }

  passwordRecover (email) {
    return $axios.post('/api/auth/recover', { email })
  }

  passwordReset (payload) {
    return $axios.post('/api/auth/reset', payload)
  }

  passwordUpdate (value) {
    return $axios.post('/api/auth/password', value)
  }

  socialLogin () {
    return $axios.get('/api/auth/oauth', {
      withCredentials: true
    })
  }
}

export const authService = new AuthService()
