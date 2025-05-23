<template>
  <div class="flex flex-col w-full items-center justify-center h-full bg-primary">
    <LogoModule class="flex justify-center my-20 pointer-events-none" alwaysDefault />

    <div v-if="loaded" class="pt-30 pb-20 px-30 mb-50 max-w-[1000px] w-full bg-primary border border-grey-425 rounded-10">
      <div class="flex flex-col items-center text-app-color">
        <p v-if="isSubscriptionExpired" class="text-20 md:text-26 font-bold">Your subscription is expired</p>
        <p v-if="isTrialPlan && !isSubscriptionExpired" class="text-20 md:text-26 font-bold">Your {{ trialPeriod }}-day trial is over</p>
        <p v-else class="text-20 md:text-26 font-bold">Your PRO plan has been expired</p>

        <div class="text-center mt-7 mb-40 space-y-20 text-grey-20 text-14">
          <span>Please upgrade if you want to keep using Complex.</span>
        </div>

        <Switcher
          v-model="billMonthly"
          class="text-13 font-medium"
          width="145px"
          :tabs="[
            { name: 'Bill monthly', key: 'bill-monthly' },
            { name: 'Bill annually', key: 'bill-annually' }
          ]"
        />

        <div class="flex justify-center">
          <TeamsPlan
            v-for="(item, index) in teamPlansData"
            :key="item.title + index + billMonthly.index"
            :billMonthly="billMonthly.index"
            :planInfo="item"
            titleFontSize="text-21"
            class="mt-30 md:mt-20 mb-30 mx-15"
          />
        </div>

        <span class="text-12 md:text-13 text-grey-20">After upgrading you will have instant access to your workspace again.</span>
      </div>
    </div>
    <div class="fixed bottom-15 right-20 flex items-center">
      <ButtonModule
        v-if="subscription?.extendable && isTrialPlan"
        text="Extend my free trial by another 3 days"
        type="transparent"
        class="mr-10"
        @click="extend"
      />

      <ButtonModule type="transparent">
        <router-link to="/login">
          Log out
        </router-link>
      </ButtonModule>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isSubscriptionExpired?: boolean
}>()

const router = useRouter()

const { isTeamAccount, team, getTeam } = useTeam()
const { getProfile } = useProfile()
const { handleLoading } = useGeneral()
const { isTrialOver, isExpired, isTrialPlan, trialPeriod, subscription, getCurrentPlan, getPlans, getStats } = usePlan()

const billMonthly = ref<ISwitcherModelValue>({ index: 0, key: 'bill-monthly' })

const loaded = ref(false)

const teamPlansData = computed<IPlanInfo[]>(() => {
  const plans: IPlanInfo[] = [
    {
      title: 'Pro',
      key: 'Pro',
      name: billMonthly.value.index === 0 ? 'Pro Plan Monthly' : 'Pro Plan Yearly',
      keys: ['Pro Plan Monthly', 'Pro Plan Yearly'],
      description: 'Stay organized, whether at work or at home.',
      tools: ['All features', 'Unlimited tasks', 'Unlimited notes', 'Unlimited guests', '50MB file upload size', '500GB storage space'],
      blockedTools: []
    }
  ]

  return plans
})

onMounted(async () => {
  handleLoading(true)
  await getProfile()
  await getTeam()

  await Promise.all([
    getPlans(),
    getCurrentPlan(),
    getStats()
  ])

  handleLoading(false)

  if (isTeamAccount.value && !isTrialOver.value && !isExpired.value) {
    return goToHome()
  }

  loaded.value = true
})

function goToHome () {
  router.push({ name: 'Today', params: { team: team.value.name } })
}

async function extend () {
  if (!subscription.value.extendable) return

  try {
    await planService.extendSubscription()
    goToHome()
  } catch (error) {
    console.log(error)
  }
}
</script>
