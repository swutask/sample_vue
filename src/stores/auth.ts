import { defineStore } from 'pinia'
import type { NavigationGuardNext } from 'vue-router'
import localStorageService from '@/core/local-storage'
import { authService, profileService, teamsService } from '@/services'
import router from '@/router'

const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorageService.getItem('ComplexToken') || '')
  const showWelcomeModalValue = ref(false)
  const signupRequests = ref(0) // TODO: delete, no needed anymore
  const onboardingLoader = ref(false)

  function setToken (value: string) {
    token.value = value
    localStorageService.setItem('ComplexToken', value)
  }

  function removeToken () {
    token.value = ''
    localStorageService.removeItem('ComplexToken')
  }

  function showWelcomeModal (value: boolean) {
    showWelcomeModalValue.value = value
  }

  function setRequestCount (value: number) {
    signupRequests.value = value === 0 ? 0 : signupRequests.value + 1
  }

  function showOnboardingLoader (value: boolean) {
    onboardingLoader.value = value
  }

  async function signIn (user: ILoginState) {
    const { handleLoading } = useGeneral()
    const { getProfile } = useProfile()

    try {
      handleLoading(true)
      const { data } = await authService.login(user)
      setToken(data.token)
      const profile = await getProfile()

      const loginData = localStorageService.getItem('login-sessions') || {}

      if (!loginData[profile.id]) {
        loginData[profile.id] = 1
      } else {
        loginData[profile.id]++
      }

      localStorageService.setItem('login-sessions', loginData)

      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function socialLogin () {
    const res = await authService.socialLogin()

    if (res?.data?.token) setToken(res.data.token)

    const result = await teamsService.getTeam()

    if (result.data.team) {
      router.push({ name: 'Today', params: { team: result.data.team.link } })
    } else {
      router.push({ name: 'SignUp', query: { oauth: 'true' } })
    }
  }

  function logoutRedirect (next: NavigationGuardNext) {
    const { changeActiveState } = useSettings()
    const { setTemplates } = useTemplate()
    const { removeTeam } = useTeam()
    const { setInvoices } = usePlan()

    setInvoices(null)
    removeToken()
    removeTeam()
    changeActiveState('Account')
    setTemplates([])
    next()
  }

  function restoreAccount (user: ILoginState) {
    const { handleLoading } = useGeneral()
    handleLoading(true)
    return profileService.restore(user).then(({ data }) => {
      setToken(data.token)
    }).catch(({ data }) => Promise.reject(data))
  }

  return {
    token,
    showWelcomeModalValue,
    signupRequests,
    onboardingLoader,
    setToken,
    removeToken,
    showWelcomeModal,
    setRequestCount,
    showOnboardingLoader,
    signIn,
    socialLogin,
    logoutRedirect,
    restoreAccount
  }
})

export function useAuth () {
  const store = useAuthStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
