/**
 * @file api-config provides promise-based HTTP abstraction with extended error
 */
import router from '@/router'
import axios from 'axios'

let count = 0

const $axios = axios.create({
  // setup root url for all http requests
  baseURL: import.meta.env.VITE_APP_API,
  // customized XMLHttpRequest wrapper library
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// global request interceptor
$axios.interceptors.request.use((config) => {
  count++
  const { teamId } = useTeam()
  const { token } = useAuth()

  // intercept url for auth
  if (token.value) {
    config.headers.auth = token.value
    config.headers.Accept = 'application/json'
  }

  if (teamId.value) {
    config.headers.team = teamId.value
  }
  return config
})

// global response interceptor
$axios.interceptors.response.use(
  response => {
    const { handleLoading } = useGeneral()
    const { setRequestCount } = useAuth()

    count--

    setRequestCount()

    setTimeout(() => {
      if (count <= 0) handleLoading(false)
    }, 500)
    return response
  },
  error => {
    const { handleLoading, toggleBookLoading, setNotification } = useGeneral()

    count = 0

    const { isTrialPlan } = usePlan()

    handleLoading(false)
    toggleBookLoading(false)

    let message = error.response?.data?.error?.message || error
    const code = error.response?.data?.error?.code
    // exception for Unauthorized

    if (code === 13) {
      if (isTrialPlan.value) {
        router.push({ name: 'TrialOver' })
        return
      } else {
        router.push({ name: 'SubscriptionExpired' })
        return
      }
    }

    if (error.response?.status === 401 && router.currentRoute.value.name !== 'Share') {
      message = 'Your authorization token got expired'
      const url = window.location.search ? window.location.pathname + window.location.search : window.location.pathname

      router.push({ name: 'Unauthorized', params: { savedUrl: url } })
      return Promise.reject(error.response)
    }

    if (!code) {
      message = message === 'Permission denied' ? 'Permission denied' : 'Something went wrong, please try again later'
    }

    if (code !== 6 && code !== 0) {
      setNotification({
        message,
        color: 'error',
        uuid: window.crypto.randomUUID()
      })
    }

    return Promise.reject(error.response)
  }
)

export default $axios
