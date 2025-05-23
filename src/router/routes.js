export default [
  {
    path: '/:domain/share/:shareId',
    name: 'Share',
    component: () => import('@/pages/Share.vue')
  },
  {
    path: '/ui-kit',
    name: 'UIKit',
    component: () => import('@/pages/UIKit.vue'),
    meta: { title: 'UIKit - complex' }
  },
  {
    path: '/social-auth/success',
    name: 'SocialAuthSuccess'
  },
  {
    path: '/social-auth/failed',
    name: 'SocialAuthFailed',
    component: () => import('@/pages/auth/FailedLogin.vue'),
    meta: { title: 'Auth Failed - complex' }
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: () => import('@/pages/payment/Success.vue'),
    meta: { title: 'Payment Success - complex' }
  },
  {
    path: '/payment/failed',
    name: 'PaymentFailed',
    component: () => import('@/pages/payment/Failed.vue'),
    meta: { title: 'Payment Failed - complex' }
  },
  {
    path: '/payment/change/success',
    name: 'PaymentChangeSuccess',
    component: () => import('@/pages/payment/ChangeSuccess.vue'),
    meta: { title: 'Success - complex' }
  },
  {
    path: '/payment/change/failed',
    name: 'PaymentChangeFailed',
    component: () => import('@/pages/payment/Failed.vue'),
    meta: { title: 'Failed - complex' }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/pages/auth/SignUpMain.vue'),
    meta: { title: 'Sign up - complex' }
  },
  {
    path: '/accept-client-invite',
    name: 'AcceptCLientInvite'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: { title: 'Login - complex' }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/pages/auth/Unauthorized.vue'),
    meta: { title: 'Unauthorized - complex' }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/pages/auth/ResetPassword.vue'),
    meta: { title: 'Reset Password - complex' }
  },
  {
    path: '/password-recover',
    name: 'PasswordRecover',
    component: () => import('@/pages/auth/PasswordRecover.vue'),
    meta: { title: 'Password Recover - complex' }
  },
  {
    path: '/trial-over',
    name: 'TrialOver',
    component: () => import('@/pages/trial-over/TrialOver.vue'),
    meta: { title: 'Trial is over - complex' }
  },
  {
    path: '/subscription-expired',
    name: 'SubscriptionExpired',
    component: () => import('@/pages/trial-over/SubscriptionExpired.vue'),
    meta: { title: 'Subscription expired - complex' }
  },
  {
    path: '/:team/overview',
    name: 'Today',
    component: () => import('@/pages/today/Today.vue'),
    meta: { title: 'Overview - complex' }
  },
  {
    path: '/:team/space/:id',
    name: 'TeamBook',
    component: () => import('@/pages/book/Book.vue')
  },
  {
    path: '/:team/task-board/:id',
    name: 'TaskBoardTeam',
    component: () => import('@/pages/task-board/TaskBoard.vue')
  },
  {
    path: '/:team/feature-flags',
    name: 'FeatureFlags',
    component: () => import('@/pages/feature-flag/FeatureFlags.vue'),
    meta: { title: 'FeatureFlags - complex' }
  },
  {
    path: '/:team/calendar',
    name: 'CalendarTeam',
    component: () => import('@/pages/Calendar.vue'),
    meta: { title: 'Calendar - complex' }
  },
  {
    path: '/:team/week-planner',
    name: 'WeekPlanner',
    component: () => import('@/pages/week-planner/WeekPlanner.vue'),
    meta: { title: 'Week planner - complex' }
  },
  {
    path: '/:team/chat',
    name: 'Chat',
    component: () => import('@/pages/chat/Chat.vue'),
    meta: { title: 'Chat - complex' }
  },
  {
    path: '/:team/members',
    name: 'TeamMembers',
    component: () => import('@/pages/TeamMembers.vue'),
    meta: { title: 'Team Members - complex' }
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/pages/Statistic.vue'),
    meta: { title: 'Statistic - complex' }
  },
  {
    path: '/google-calendar',
    name: 'CalendarSync',
    component: () => import('@/pages/google-calendar/CalendarSync.vue'),
    meta: { title: 'Google Sync - complex' }
  },
  {
    path: '/:team/onboarding',
    name: 'Onboarding',
    component: () => import('@/pages/onboarding/Onboarding.vue'),
    meta: { title: 'Onboarding - complex' }
  },
  {
    path: '/:team/spaces',
    name: 'TeamBooks',
    component: () => import('@/pages/book/TeamBooksPage.vue'),
    meta: { title: 'Spaces - complex' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Today',
      params: {
        team: 'team'
      }
    }
  }
]
