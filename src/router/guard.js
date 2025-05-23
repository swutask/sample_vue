import localStorageService from '@/core/local-storage'

/* Auth & Route Guard access control - to prevent user for navigation to not-allowed routes */
export default async (to, _, next) => {
  // set page title
  if (to.name !== 'Book' && to.name !== 'Share' && to.name !== 'TeamBook' && to.name !== 'TaskBoardTeam') {
    document.title = to.meta.title
  }

  const { token, socialLogin, logoutRedirect } = useAuth()

  if (to.name === 'CalendarSync' && to.query.status === 'success') {
    const { getTeam } = useTeam()

    const team = await getTeam()

    return next({ name: 'CalendarTeam', params: { team: team.name } })
  }

  if (to.path === '/') {
    if (token.value) {
      const { getTeam } = useTeam()
      const team = await getTeam()

      return next({ name: 'Today', params: { team: team.name } })
    } else {
      return next({ name: 'Login', params: { savedUrl: to.fullPath } })
    }
  }

  /* Setting token when we redirecting from old site */
  if (to.name === 'SocialAuthSuccess') {
    socialLogin()
    return next()
  }

  if (to.name !== 'Today' && to.name !== 'Book' && to.name !== 'TeamBook' && to.name !== 'Login') {
    localStorageService.removeItem('lastOpenedProject', 'guard')
  }

  /* removing the token from the localeStore when we go to the login page */
  if (to.name === 'Login' || (to.name === 'SignUp' && !to.query.oauth)) {
    const { resetSettings } = useSettings()

    logoutRedirect(next)
    resetSettings()
    return false
  }

  /* if there is no token in localStorage */
  if (!token && to.name !== 'SignUp' && to.name !== 'ResetPassword' && to.name !== 'PasswordRecover' && to.name !== 'SocialAuthFailed' && to.name !== 'Share' && to.name !== 'UIKit') {
    return next({ name: 'Login', params: { savedUrl: to.fullPath } })
  }

  if (to.name === 'AcceptCLientInvite') {
    await clientService.acceptInvite({
      signature: to.query.signature,
      email: to.query.email,
      teamId: +to.query.teamId
    })

    return next({ name: 'TeamBooks', params: { team: 'team' } })
  }

  next()
}
