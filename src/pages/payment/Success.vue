<template>
  <div class="min-h-full flex">
    <ConfettiMessage />

    <div class="max-w-[1440px] w-full p-15 mx-auto">
      <div class="max-w-[500px] mx-auto text-center h-full flex">
        <div class="m-auto">
          <i class="icon-check-circle text-green-500 text-50" />
          <p class="text-22 text-green-500 md:text-30 font-bold">Thank You</p>

          <p key="step2" class="mb-15 md:mb-40">Your payment is successfully done</p>

          <ButtonModule
            text="back to Home"
            :has-hover="true"
            class="text-brand text-18 p-5"
            prefix="icon-keyboard-arrow-left text-13"
            @click="goHome"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGtag } from 'vue-gtag-next'

const router = useRouter()

const { setConfettiMessage } = useGeneral()
const { event } = useGtag()
const { getTeam } = useTeam()
const { currentPlan, getCurrentPlan, getPlans } = usePlan()

let timer = null

onMounted(async () => {
  timer = setTimeout(() => {
    router.push({ name: 'Today', params: { team: 'team' } })
  }, 10000)

  await getTeam()
  await getPlans()
  await getCurrentPlan()

  const parsedName = currentPlan.value?.name.replace(/\s+(Monthly|Yearly)$/, '')

  setConfettiMessage(`You are now on the ${parsedName}!`)

  nextTick(() => {
    if (import.meta.env.VITE_APP_ENV === 'production') {
      event('conversion', { send_to: 'AW-16561328233/_9esCOix0a4ZEOmgh9k9' })
    }

    const label = currentPlan.value?.name?.toLowerCase().includes('monthly') ? 'monthly' : 'annually'

    if (label) {
      event('paid', {
        event_category: 'sign_up',
        event_label: label
      })
    }
  })
})

function goHome () {
  clearTimeout(timer)
  router.push({ name: 'Today', params: { team: 'team' } })
}
</script>
