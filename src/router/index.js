import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import globalBeforeEachGuard from './guard'
// import { Userpilot } from 'userpilot'

export const routesWithoutHeader = [
  'Login',
  'SignUp',
  'UIKit',
  'ResetPassword',
  'PasswordRecover',
  'SocialAuthSuccess',
  'SocialAuthFailed',
  'PaymentSuccess',
  'PaymentChangeSuccess',
  'PaymentFailed',
  'PaymentChangeFailed',
  'Unauthorized',
  'CalendarSync'
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior () {
    // always scroll to top
    return { top: 0 }
  }
})

router.beforeEach(globalBeforeEachGuard)
// router.afterEach(() => {
//   Userpilot.reload()
// })

export default router
