<template>
  <div class="w-full max-w-[275px] text-app-color">
    <div
      class="w-full px-24 py-15 rounded-10 relative overflow-hidden"
      :class="isFreePlan ? 'border border-grey-700' : 'border-2 border-dark-500'"
    >
      <div>
        <img :src="iconSrc" :alt="planInfo.icon" class="object-cover h-32 mb-18">
        <p class="font-semibold leading-none mb-5 text-19">{{ planInfo.title }}</p>
        <p class="text-13 h-39 text-grey-975">{{ planInfo.description }}</p>
        <div v-if="price" class="flex mt-25">
          <div class="text-32 font-semibold leading-none h-[45.5px]">
            <span>{{ price }}</span>
          </div>
          <div class="ml-15 text-13">
            <p class="font-bold leading-none">per user/month</p>
            <p class="text-grey-275">billed {{ billedAt }}</p>
          </div>
        </div>

        <div v-if="false" class="flex flex-col mt-25">
          <p class="text-23 font-bold leading-none whitespace-nowrap">Custom pricing</p>
          <p class="text-grey-275">Contact us</p>
        </div>
      </div>

      <p class="text-14 font-semibold mt-10">{{ planInfo.subDescription }}</p>

      <div>
        <div>
          <div v-for="tools in planInfo.tools" :key="tools" class="flex mt-9">
            <i class="icon-check text-green-10 text-20 font-bold mr-9 ml-3" />
            <p class="text-14">{{ tools }}</p>
          </div>

          <div v-for="tool in planInfo.blockedTools" v-show="planInfo?.blockedTools" :key="tool" class="flex mt-9">
            <i class="ml-2 icon-close text-grey-575 text-14 font-bold mr-8" />
            <p class="text-14 opacity-40">{{ tool }}</p>
          </div>
        </div>
      </div>

      <div class="bg-grey-f5f5f5 absolute z-1 left-0 border-t border-grey-500 h-full w-full mt-10" />

      <div class="text-center pt-25 z-2 relative">
        <button
          class="rounded-10 py-9 font-semibold anim-color text-white w-full"
          :disabled="btnTitle === 'Your current plan' || (isTrialPlan && !isTrialOver && planInfo.key === 'Free')"
          :class="[btnTitle === 'Your current plan' ?
                     'px-26 bg-black border-grey-light dark:bg-sidebar dark:border-sidebar opacity-[0.6]' :
                     planInfo.key === 'Enterprise' ? 'bg-dark-400 text-white hover:bg-dark-1000 px-[55px]' :
                     'px-[55px] hover:bg-dark-500 dark:hover:bg-dark-600 hover:text-white bg-black text-dark-100',
                   freePlanButtonStyles]"
          @click="handleAction"
        >
          {{ btnTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stripeLoader = () => import(/* chunkName: Stripe */ '@stripe/stripe-js')

const props = defineProps<{
  billMonthly: number
  planInfo: IPlanInfo
  titleFontSize?: string
  isTrialModal?: boolean
}>()

const route = useRoute()

const { user } = useProfile()
const { handleLoading, setNotification, setConfettiMessage } = useGeneral()
const { team } = useTeam()
const { isDarkMode } = useTheme()
const {
  isExpired,
  plans,
  currentPlan,
  stats,
  isTrialPlan,
  isTrialOver,
  upgradeTeamPlan,
  getCurrentPlan,
  togglePlansInfoModal
} = usePlan()
const { toggleSettingsModal } = useSettings()

const isFreePlan = computed(() => props.planInfo.key === 'Free Plan')

const billedAt = computed(() => props.billMonthly === 0 ? 'monthly' : 'annually')

const plan = computed(() => plans.value.find(p => p.name === props.planInfo.name))

function parsePrice (value) {
  const hasFloat = parseFloat(value) % 1 !== 0

  const minimumFractionDigits = hasFloat ? 2 : 0

  const currencyFormatter = new Intl.NumberFormat('en', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits,
    maximumFractionDigits: 2
  })

  return isFreePlan.value ? '$0' : currencyFormatter.format(value)
}

const iconSrc = computed(() => {
  const href = new URL(`/src/assets/images/plans/${props.planInfo.icon}.png`, import.meta.url).href

  return href
})

const price = computed(() => parsePrice(plan.value?.pricePerMonth))

const btnTitle = computed(() => {
  if (props.planInfo.key === 'Enterprise') {
    return 'Let\'s talk'
  }
  if (currentPlan.value.name === props.planInfo.name) {
    return isExpired.value ? 'Renew' : 'Your current plan'
  }
  if (props.isTrialModal) {
    return 'Select plan'
  } else {
    return 'Upgrade'
  }
})

const freePlanButtonStyles = computed(() => (
  isFreePlan.value && btnTitle.value !== 'Your current plan'
    ? `${isDarkMode.value ? '!text-white' : '!text-black'} hover:text-black hover:bg-grey-200 dark:hover:bg-dark-600 dark:hover:text-white dark:bg-black bg-white`
    : ''
))

async function handleAction () {
  if (props.planInfo.key === 'Enterprise') {
    window.location.href = 'mailto:hey@complex.so?subject=Enterprise plan'
    return
  }

  try {
    validatePlan()
    await upgrade()
  } catch (error) {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: error
    })
  }
}

function validatePlan () {
  const localStats = { ...stats.value }
  delete localStats.success

  const statPlanColumnMap = {
    clients: 'maxClients',
    projects: 'maxProjects',
    books: 'maxBooks',
    size: 'maxSize',
    members: 'maxMembers',
    tasks: 'maxTasks'
  }

  Object.entries(localStats).forEach(([statName, statValue]) => {
    const planColumnName = statPlanColumnMap[statName]

    const planValue = plan.value[planColumnName]

    if (planValue && planValue !== -1 && statValue > planValue) {
      throw new Error(`Your workspace has too many team ${statName} to select this plan`)
    }
  })
}

async function upgrade () {
  const { loadStripe } = await stripeLoader()

  const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE)

  upgradeTeamPlan({
    planId: plan.value.id,
    userId: user.value.id,
    teamId: team.value.id,
    expire: route.query.expire as string || null,
    signature: route.query.signature as string || null
  }).then(res => {
    handleLoading(true)

    if (res) {
      stripe.redirectToCheckout({ sessionId: res })
        .catch(() => handleLoading(false))
    } else {
      const newPlan = plans.value.find(p => p.id === plan.value.id).name

      togglePlansInfoModal(false)
      toggleSettingsModal(false)

      setConfettiMessage(`You are now on ${newPlan}!`)
      handleLoading(false)
      getCurrentPlan()
        .finally(() => handleLoading(false))
    }
  })
}

defineExpose({
  upgrade
})
</script>
