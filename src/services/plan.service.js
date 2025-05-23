import $axios from '@/core/api-config'

class PlanService {
  getCurrentPlan () {
    return $axios.get('/api/payment')
  }

  getPlans () {
    return $axios.get('/api/payment/plans')
  }

  upgradePlan ({ planId, userId }) {
    return $axios.get(`/api/payment/stripe/session/${planId}/${userId}`)
  }

  upgradePaymentMethod () {
    return $axios.get('/api/payment/stripe/change-payment-details')
  }

  upgradeTeamPlan ({ planId, userId, teamId, expire, signature }) {
    const query = expire && signature ? `&expire=${expire}&signature=${signature}` : ''
    return $axios.get(`/api/payment/stripe/session/${planId}/${userId}?teamId=${teamId}${query}`)
  }

  invoices () {
    return $axios.get('/api/payment/stripe/invoices')
  }

  stats () {
    return $axios.get('/api/stats')
  }

  cancelSubscription () {
    return $axios.delete('/api/payment/stripe')
  }

  extendSubscription () {
    return $axios.post('/api/payment/subscriptions/extend')
  }
}

export const planService = new PlanService()
