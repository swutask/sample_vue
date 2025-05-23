<template>
  <teleport to="#main_section">
    <div
      class="fixed top-0 left-0 w-full h-full flex bg-[#0007] md:z-[115] z-[11000] text-app-color overflow-auto text-14 px-15"
      @click.self="close"
    >
      <div
        class="relative overflow-hidden mx-auto mb-auto mt-50 lg:mt-[135px] w-full max-w-[520px]
        rounded-10 pt-20 bg-primary shadow-limit"
      >
        <div
          class="bg-sidebar w-full h-[180px] border-b border-grey-500
          py-20 absolute top-0 flex justify-center items-center"
        >
          <AnimatedLogo class="w-[100px]" />
        </div>
        <div class="text-app-color mt-[180px] px-30">
          <p class="font-extrabold text-21 mb-8">{{ limitModalData.title }}</p>

          <p
            v-if="typeLimitModal === 'Special' || typeLimitModal === 'files'"
            class="text-dark-300 leading-[1.7]"
            v-html="limitModalData.description"
          />

          <p v-else class="max-w-[340px] text-grey-950 leading-[1.7]">
            Supercharge your productivity with unlimited tasks, reminders, increased storage, and more.
          </p>

          <div class="flex space-x-10 mt-20">
            <ButtonModule
              v-for="item in billOptions"
              :key="item.id"
              type="transparent"
              class="h-[34px] px-30 border-2"
              :class="activeState.id === item.id ? 'border-black' : ''"
              :text="item.buttonTitle"
              @click="activeState = item"
            />
          </div>

          <div class="flex space-x-50 mt-25">
            <div v-for="item in planTools" :key="item.title">
              <p class="font-bold mb-10">{{ item.title }}</p>

              <p v-for="benefit in item.benefits" :key="benefit" class="mb-8 flex items-center">
                <i :class="`icon-check-circle ${item.iconClass} text-15 mr-5`" />

                <span class="text-dark-300 text-14">{{ benefit }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="mt-28 border-t border-sidebar">
          <div class="flex justify-between flex-wrap items-center px-30 py-20">
            <div class="text-app-color text-14 mr-12 rounded-6 pointer">
              <div class="flex font-semibold">
                <span class="text-12 mt-3">$</span>

                <p class="text-37">{{ activeState.price }}</p>

                <span class="text-14 self-end text-grey-250 mx-2 font-normal mb-7 ml-7">per month ({{ activeState.priceText }})</span>
              </div>
            </div>
            <ButtonModule
              text="Upgrade to Pro"
              class="bg-black hover:bg-black/[0.8] rounded-8 px-27 py-15 font-semibold text-white text-14"
              @click="handleAction"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { bytesToSize, preventBodyScroll } from '@/core/helper-functions'

const stripeLoader = () => import(/* chunkName: Stripe */ '@stripe/stripe-js')

const { toggleSettingsModal } = useSettings()
const { setNotification, handleLoading } = useGeneral()
const { user } = useProfile()
const { team } = useTeam()
const route = useRoute()
const {
  showLimitModal,
  typeLimitModal,
  toggleLimitModal,
  limitModalData,
  proPlanMonthly,
  proPlan,
  freePlan,
  stats,
  plans,
  upgradeTeamPlan,
  getCurrentPlan
} = usePlan()

const billOptions = ref([
  {
    id: 0,
    key: 'Pro Plan Yearly',
    buttonTitle: 'Pay annually',
    priceText: 'billed annually',
    price: (+proPlan.value?.pricePerMonth).toFixed(0)
  },
  {
    id: 1,
    key: 'Pro Plan Monthly',
    buttonTitle: 'Pay monthly',
    priceText: 'billed monthly',
    price: (+proPlanMonthly.value?.pricePerMonth).toFixed(0)
  }
])

const activeState = ref(billOptions.value[0])

const planTools = computed(() => ({
  proPlan: {
    title: 'What you get with PRO',
    benefits: [
      'Unlimited tasks & spaces',
      `${bytesToSize(proPlan.value.maxSize)} storage space`,
      `Upload files up to ${bytesToSize(proPlan.value.singleFileSize)}`,
      'All features'
    ],
    iconClass: 'text-[#15cb54]'
  },
  freePlan: {
    title: 'Current (free) plan',
    benefits: [
      `${freePlan.value.maxTasks} tasks`,
      `${bytesToSize(freePlan.value.maxSize)} storage space`,
      `Upload files up to ${bytesToSize(freePlan.value.singleFileSize)}`,
      'No reminders'
    ],
    iconClass: 'text-grey-275'
  }
}))

const plan = computed(() => plans.value.find(p => p.name === activeState.value.key))

watch(() => showLimitModal.value, value => {
  if (value) toggleSettingsModal(false)
  preventBodyScroll(value)
})

function close () {
  toggleLimitModal({ show: false, type: typeLimitModal.value, description: '' })
}

async function handleAction () {
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
      handleLoading(false)
      getCurrentPlan()
        .finally(() => handleLoading(false))
    }
  })
}
</script>
