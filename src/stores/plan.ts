import { defineStore } from 'pinia'
import { planService } from '@/services'
import { bytesToSize } from '@/core/helper-functions'

const usePlanStore = defineStore('plan', () => {
  const subscription = ref<ISubscription>(null)
  const trialPeriod = ref(7)
  const annualPlanDiscount = ref(25)
  const plans = ref<IPlan[]>([])
  const stats = ref<IStats>(null)
  const showLimitModal = ref(false)
  const typeLimitModal = ref('Projects')
  const invoices = ref<IInvoice[]>(null)
  const limitModalData = ref({
    title: 'Upgrade to Pro',
    description: 'Supercharge your productivity with unlimited tasks and endless storage'
  })
  const showPlansInfoModal = ref(false)

  const trialPlan = computed(() => plans.value.find(item => item.name === 'Trial Plan'))

  const freePlan = computed(() => plans.value.find(item => item.name === 'Free Plan'))

  const proPlan = computed(() => plans.value.find(item => item.name === 'Personal Pro Plan Yearly'))

  const proPlanMonthly = computed(() => plans.value.find(item => item.name === 'Personal Pro Plan Monthly'))

  const proOldPlan = computed(() => plans.value.find(item => item.name === 'Pro Plan Yearly'))

  const proOldPlanMonthly = computed(() => plans.value.find(item => item.name === 'Pro Plan Monthly'))

  const teamProPlanMonthly = computed(() => plans.value.find(item => item.name === 'Team Plan Monthly'))

  const teamProPlan = computed(() => plans.value.find(item => item.name === 'Team Plan Yearly'))

  const isTrialPlan = computed(() => subscription.value?.planId === trialPlan.value?.id)

  const isFreePlan = computed(() => subscription.value?.planId === freePlan.value?.id)

  const isTeamPlan = computed(() => subscription.value?.planId === teamProPlan.value?.id ||
    subscription.value?.planId === teamProPlanMonthly.value?.id)

  const isPersonalPlan = computed(() => subscription.value?.planId === proPlanMonthly.value?.id ||
    subscription.value?.planId === proPlan.value?.id)

  const isOldProPlan = computed(() => subscription.value?.planId === proOldPlan.value?.id ||
    subscription.value?.planId === proOldPlanMonthly.value?.id)

  const hasPayedPlan = computed(() => isPersonalPlan.value || isTeamPlan.value ||
    isOldProPlan.value)

  const isCancelledSubscription = computed(() => subscription.value?.isCancelled)

  const isTrialOver = computed(() => {
    if (!isTrialPlan.value) return false

    const subscriptionExpireAt = new Date(subscription.value?.expireAt).getTime()

    return new Date().getTime() > subscriptionExpireAt
  })

  const remainingTrialDays = computed(() => {
    const diffMs = new Date(subscription.value?.expireAt).getTime() - new Date().getTime()
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24)) // Convert ms to days
  })

  const showTrialBanner = computed(() => {
    return isTrialPlan.value && remainingTrialDays.value <= 3 && remainingTrialDays.value > 0
  })

  const isExpired = computed(() => {
    if (!subscription.value?.expireAt) return false

    return new Date(subscription.value.expireAt) <= new Date()
  })

  const currentPlan = computed(() => plans.value.find(item => item.id === subscription.value?.planId))

  const allowAddBook = computed(() => {
    const plan = currentPlan.value

    return (plan?.maxBooks === -1 && !isExpired.value) || stats.value?.books < plan?.maxBooks
  })

  const allowAddProject = computed(() => {
    const plan = currentPlan.value

    return (plan?.maxProjects === -1 && !isExpired.value) || stats.value?.projects < plan?.maxProjects
  })

  const allowAddMembers = computed(() => {
    return (currentPlan.value?.maxMembers === -1 && !isExpired.value) || stats.value?.members < currentPlan.value?.maxMembers
  })

  const allowAddClients = computed(() => {
    return (currentPlan.value?.maxClients === -1 && !isExpired.value) || stats.value?.clients < currentPlan.value?.maxClients
  })

  const allowAddTasks = computed(() => {
    return (currentPlan.value?.maxTasks === -1 && !isExpired.value) || stats.value?.tasks < currentPlan.value?.maxTasks
  })

  function checkLimits (size: number) {
    if ((!allowAddSingleFile(size) || !allowAddAttachments(size)) && isFreePlan.value) {
      toggleLimitModal({
        show: true,
        type: 'files',
        description: !allowAddSingleFile(size)
          ? `File upload limit reached. Free plan users can only upload files up to
              <span class="font-semibold underline">${bytesToSize(+freePlan.value?.singleFileSize)}</span>.
              Upgrade now to increase your limit to
              <span class="font-semibold underline">${bytesToSize(+proPlan.value?.singleFileSize)}</span>.`
          : `You've reached the limit of
              <span class="font-semibold underline">${bytesToSize(+freePlan.value?.maxSize)}</span> storage space.`
      })

      return true
    }
  }

  function togglePlansInfoModal (value) {
    showPlansInfoModal.value = value
  }

  function allowAddAttachments (value: number): boolean {
    const plan = currentPlan.value

    return (+plan?.maxSize === -1 && !isExpired.value) || stats.value?.size + value < +plan?.maxSize
  }

  function allowAddSingleFile (value: number): boolean {
    const plan = currentPlan.value

    return (+plan?.singleFileSize === -1 && !isExpired.value) || value < +plan?.singleFileSize
  }

  function setInvoices (value: IInvoice[]) {
    invoices.value = value
  }

  function toggleLimitModal (value: { show: boolean; type?: string; description?: string; title?: string }) {
    showLimitModal.value = value.show
    typeLimitModal.value = value.type
    limitModalData.value.title = value?.title || 'Upgrade to Pro'
    limitModalData.value.description = value?.description || 'Supercharge your productivity with unlimited tasks and endless storage'
  }

  async function getCurrentPlan () {
    return planService.getCurrentPlan().then(({ data }) => {
      subscription.value = data
      return data
    })
  }

  async function getPlans () {
    // const { handleLoading } = useGeneral()
    // handleLoading(true)
    return planService.getPlans().then(({ data }) => {
      plans.value = data.plans
      return data.plans
    })
  }

  async function upgradePlan ({ planId, userId }: { planId: number; userId: number }) {
    const { handleLoading } = useGeneral()
    handleLoading(true)
    return planService.upgradePlan({ planId, userId })
      .then(({ data }) => {
        return data.id
      })
  }

  async function upgradeTeamPlan (
    { planId, userId, teamId, expire, signature }: { planId: number; userId: number; teamId: number; expire?: string; signature?: string }
  ) {
    const { handleLoading } = useGeneral()
    handleLoading(true)
    return planService.upgradeTeamPlan({ planId, userId, teamId, expire, signature })
      .then(({ data }) => {
        return data.id
      })
  }

  async function getInvoices () {
    const { handleLoading } = useGeneral()
    handleLoading(true)
    planService.invoices().then(({ data }) => {
      setInvoices(data.invoices)
    })
  }

  async function getStats () {
    const { setActiveTasks } = useMixpanel()
    return planService.stats().then(({ data }) => {
      stats.value = data

      setActiveTasks()
    })
  }

  async function cancelSubscription () {
    try {
      await planService.cancelSubscription()
      subscription.value.isCancelled = true
    } catch (error) {
      console.log(error)
    }
  }

  return {
    trialPeriod,
    isTrialOver,
    trialPlan,
    isTrialPlan,
    isCancelledSubscription,
    proPlan,
    proPlanMonthly,
    isFreePlan,
    freePlan,

    subscription,
    plans,
    stats,
    showLimitModal,
    typeLimitModal,
    invoices,
    limitModalData,
    isExpired,
    currentPlan,
    allowAddBook,
    allowAddProject,
    allowAddMembers,
    allowAddClients,
    allowAddTasks,
    annualPlanDiscount,
    showPlansInfoModal,
    showTrialBanner,
    remainingTrialDays,
    isTeamPlan,
    isPersonalPlan,
    hasPayedPlan,
    teamProPlan,
    setInvoices,
    toggleLimitModal,
    getCurrentPlan,
    getPlans,
    upgradePlan,
    upgradeTeamPlan,
    getInvoices,
    getStats,
    cancelSubscription,
    checkLimits,
    togglePlansInfoModal
  }
})

export function usePlan () {
  const store = usePlanStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
