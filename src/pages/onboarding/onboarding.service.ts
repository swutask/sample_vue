import $axios from '@/core/api-config'

class OnboardingService {
  getOnboarding () {
    return $axios.get('/api/profile/onboarding-task-settings')
  }

  updateOnboarding (onboarding: Partial<IOnboardingScheme>) {
    return $axios.patch('/api/profile/onboarding-task-settings', onboarding)
  }
}

export const onboardingService = new OnboardingService()
